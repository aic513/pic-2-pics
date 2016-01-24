jQuery(function($){

	"use strict";

	/*---------------------------------------------------------------------------------*/
	/*  Global Values
	/*---------------------------------------------------------------------------------*/

	var $window = $(window),
		$body = $('body'),
		$logo = $('.ss-logo'),
		$cover = $('.ss-cover-wrap-bg'),
		$share_screen = $('.ss-share-screen'),
		viewport_width = $window.width(),
		viewport_height = $window.height(),
		is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		is_safari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

	// Update necessary global vars
    function update_viewport_vars() {
		viewport_width = $(window).width();
		viewport_height = $(window).height();
	}
	var _update_viewport_vars = _.throttle(update_viewport_vars, 100);
	$window.resize(_update_viewport_vars);


	/*---------------------------------------------------------------------------------*/
	/* 	Revolution Slider
	/*---------------------------------------------------------------------------------*/

	// Change slide bg to transparent on mobiles - Home 1
	function home1_revslider() {
		if ( viewport_width < 480 ) {
			$('#home-slider-1 .tp-bgimg').addClass('home-slider-tweak');
			$('#home-slider-1 .tp-bgimg').attr('src','');
		}
		
	}
	var _home1_revslider = _.throttle(home1_revslider, 100);
	$window.resize(_home1_revslider);
	_home1_revslider();

	// Change slide bg to transparent on mobiles - Home 8
	// function home1_revslider() {
	// 	if ( viewport_width < 480 ) {
	// 		$('#home-slider-8 .tp-bgimg').addClass('home-slider-tweak');
	// 		$('#home-slider-8 .tp-bgimg').attr('src','');
	// 	}
		
	// }
	// var _home1_revslider = _.throttle(home1_revslider, 100);
	// $window.resize(_home1_revslider);
	// _home1_revslider();


	/*---------------------------------------------------------------------------------*/
	/* 	Cover Screen
	/*---------------------------------------------------------------------------------*/

	if ( $('.ss-cover-wrap-bg').length > 0 ) {

		var is_cover_animating = false,
			is_cover_gone = false,
			animate_logic = 0,
			timeout = 0,
			array = [0,1];

		$window.on('scroll touchmove mousewheel', function(e) {

			var x = $window.scrollTop();
			array[0] = array[1];
			array[1] = x;
			if ( x > 0 ) {

				if ( is_cover_gone ) {

				} else {

					if ( is_cover_animating ) {
						$('html, body').animate({
						    scrollTop: 0
						}, 0);
					} else {

						is_cover_animating = true;
						disableScroll();
						clearTimeout(timeout);

						TweenLite.to( $cover.children(), 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 0.95 }, ease: Power4.easeOut, delay: 0 });
						TweenLite.to( $cover, 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 1, y: -1000 }, ease: Power4.easeOut, delay: 0.3,
							onComplete: function() {
								is_cover_animating = false;
								is_cover_gone = true;
								$body.addClass('ss-cover-gone');
								enableScroll();

							},
						});

						TweenLite.to( $('.ss-main-content-wrap'), 0, { css: { opacity: 0, y: 60, scale: 0.95, rotationX: 0.001}, ease: Power4.easeOut, delay: 0 });
						TweenLite.to( $('.ss-main-content-wrap'), 0.4, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0.4 });
						TweenLite.to( $('.ss-main-content-wrap'), 0.4, { css: { scale: 1, rotationX: 0 }, ease: Power4.easeOut, delay: 0.8 });

						$('html, body').animate({
						    scrollTop: 0
						}, 0);
						
					}

				}
				
			} else if ( x == 0 && is_cover_gone && array[1] < array[0] ) {
				TweenLite.to( $cover, 0.4, { css: { y: 0 }, ease: Power4.easeOut, delay: 0,
					onComplete: function() {
						is_cover_gone = false;
						$body.removeClass('ss-cover-gone');
						timeout = setTimeout( function() {
							jQuery('.rev_slider_wrapper > div').revredraw();

						}, 900);
						$cover.css('transform', '');
						
						// $('.ss-cover-img .rev_slider_wrapper').find('.slotholder').each( function() {
						// 	$(this).css('transform', 'translateY(0)');
						// });
					},
				});
				TweenLite.to( $cover.children(), 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 1 }, ease: Power4.easeOut, delay: 0.3 });
				
			}

		});

	}

	/*---------------------------------------------------------------------------------*/
	/* 	Subscribe Box
	/*---------------------------------------------------------------------------------*/

	setTimeout( function() {
		if ( viewport_width > 768 ) {
			TweenLite.to( $('.ss-subbox'), 0.9, { css: { opacity: 1, display: 'block' }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-subbox-inner'), 0, { css: { opacity: 0, y: 60 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-subbox-inner'), 0.6, { css: { opacity: 1, y: 0}, ease: Power4.easeOut, delay: 0 });
		}
	}, 15000);

	$(document).mouseup(function (e) {
	    var container = $('.ss-subbox-inner');
	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
    		TweenLite.to( $('.ss-subbox-inner'), 0.6, { css: { opacity: 0, y: -60 }, ease: Power4.easeOut, delay: 0 });
	        TweenLite.to( $('.ss-subbox'), 0.9, { css: { opacity: 0, display: 'none' }, ease: Power4.easeOut, delay: 0 });
	    }
	});

	$('.ss-subbox-close').on('click', function(e) {
		e.preventDefault();
		TweenLite.to( $('.ss-subbox-inner'), 0.6, { css: { opacity: 0, y: -60 }, ease: Power4.easeOut, delay: 0 });
        TweenLite.to( $('.ss-subbox'), 0.9, { css: { opacity: 0, display: 'none' }, ease: Power4.easeOut, delay: 0 });
	});



	/*---------------------------------------------------------------------------------*/
	/* 	Main Navigation
	/*---------------------------------------------------------------------------------*/

	// Menu Button
	$('.ss-menu-button, .p2p-open-menu').on('click', function(e) {
		e.preventDefault();
		TweenLite.to( $('.ss-main-header'), 0.2, { css: { opacity: 0 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.to( $(this), 0.2, { css: { opacity: 0 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.set(".ss-main-nav-cover", {perspective: 800});
		TweenLite.set(".ss-main-nav-cover", {transformStyle: "preserve-3d"});
		if ( is_safari ) {
			TweenLite.to( $('.ss-main-nav-cover'), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0, { css: { opacity: 0, y: 60 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover'), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0.6, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
		} else {
			TweenLite.to( $('.ss-main-nav-cover'), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0, { css: { opacity: 0, rotationX: -15, scale: 0.9, y: 60 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover'), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0.6, { css: { opacity: 1, rotationX: 0, scale: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
		}
	});

	$('.ss-menu-button-close').on('click', function(e) {
		e.preventDefault();
		TweenLite.to( $('.ss-main-header'), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.to( $('.ss-menu-button'), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
        TweenLite.to( $('.p2p-open-menu'), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.set(".ss-main-nav-cover", {perspective: 800});
		TweenLite.set(".ss-main-nav-cover", {perspective: 800});
		TweenLite.set(".ss-main-nav-cover", {transformStyle: "preserve-3d"});
		if ( is_safari ) {
			TweenLite.to( $('.ss-main-nav-cover'), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0.6, { css: { opacity: 0, y: 0 }, ease: Power4.easeOut, delay: 0 });
		} else {
			TweenLite.to( $('.ss-main-nav-cover'), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-nav-cover-inner'), 0.6, { css: { opacity: 0, rotationX: 0.1, scale: 0.95, y: 0 }, ease: Power4.easeOut, delay: 0 });
		}
		
	});

	$('.ss-main-nav li').on('mouseenter', function() {
		
		if ( !$(this).hasClass('ss-hover') ) {
			var $submenu = $(this).children('.sub-menu'),
				submenu_height = $submenu.height();

			$submenu.css('height', '0px');
			$(this).addClass('ss-hover');
			$submenu.animate( {
				height: submenu_height + 'px',
			},'600','easeOutExpo');

			var $elem = $submenu.find('li');
			TweenLite.to( $elem, 0, { css: { opacity: 0, y: 15 }, ease: Expo.easeOut, delay: 0 });
			TweenLite.to( $elem, 0.6, { css: { opacity: 1, y: 0 }, ease: Expo.easeOut, delay: 0.3 });
		}

	});

	$('.ss-main-nav').on('mouseleave', function() {
		
		var $submenu = $(this).find('.sub-menu'),
			$this = $(this);

		$submenu.animate( {
			height: '0',
		}, '400', 'easeOutExpo', function() {
			$submenu.css('height','');
			$submenu.parent().removeClass('ss-hover');
		});
		
	});


	/*---------------------------------------------------------------------------------*/
	/* 	Search Button
	/*---------------------------------------------------------------------------------*/

	$('.ss-search-button').on('click', function(e) {
		e.preventDefault();
        TweenLite.to( $('.ss-menu-button'), 0.2, { css: { opacity: 0 }, ease: Power4.easeOut, delay: 0 });
        TweenLite.to( $('.p2p-open-menu'), 0.2, { css: { opacity: 0 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.set(".ss-main-search-cover", {perspective: 800});
		TweenLite.set(".ss-main-search-cover", {transformStyle: "preserve-3d"});
		if ( is_safari ) {
			TweenLite.to( $('.ss-main-search-cover'), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0, { css: { opacity: 0, y: 60 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover'), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0.6, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
		} else {
			TweenLite.to( $('.ss-main-search-cover'), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0, { css: { opacity: 0, rotationX: -15, scale: 0.9, y: 60 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover'), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0.6, { css: { opacity: 1, rotationX: 0, scale: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
		}
		
	});

	$('.ss-search-button-close').on('click', function(e) {
		e.preventDefault();
		TweenLite.to( $('.ss-menu-button'), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
        TweenLite.to( $('.p2p-open-menu'), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
		TweenLite.set(".ss-main-search-cover", {perspective: 800});
		TweenLite.set(".ss-main-search-cover", {perspective: 800});
		TweenLite.set(".ss-main-search-cover", {transformStyle: "preserve-3d"});
		if ( is_safari ) {
			TweenLite.to( $('.ss-main-search-cover'), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0.6, { css: { opacity: 0, y: 0 }, ease: Power4.easeOut, delay: 0 });
		} else {
			TweenLite.to( $('.ss-main-search-cover'), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
			TweenLite.to( $('.ss-main-search-cover-inner'), 0.6, { css: { opacity: 0, rotationX: 0.1, scale: 0.95, y: 0 }, ease: Power4.easeOut, delay: 0 });
		}
		
	});

	
	
	/*---------------------------------------------------------------------------------*/
	/* 	Portfolio Masonry
	/*---------------------------------------------------------------------------------*/

	// Isotope Masonry
	var porfolio_loader = imagesLoaded( $('.ss-pm-wrap') );
	porfolio_loader.on('always', function (instance) {

		// Init Isotope
		var $pm_wrap = $('.ss-pm').isotope({
			resizable: false,
			transitionDuration: '0.4s',
			itemSelector: '.ss-pm-tile',
			// percentPosition: true,
	        masonry: {
	        	columnWidth: 1,
	        	gutter: 0,
				layoutMode: 'masonry',
	        },
	    });

		// Relayout Isotope
		setTimeout( function() {
			$('.ss-pm').isotope('layout');
		}, 100);




		// Filter Bar
		$('.ss-pm-filterbar a').on('click', function (e) {
			e.preventDefault();
	        $pm_wrap.isotope({ filter: '' });
	        var filterValue = $(this).attr('data-filter');
	        $(this).siblings('.ss-active').removeClass('ss-active');
	        $(this).addClass('ss-active');
	        $pm_wrap.isotope({ filter: '.' + filterValue });
	        $pm_wrap.isotope('layout');
	    });

		// Reveal Elements
        setTimeout( function() {
			var reveal_index = 0,
	        $reveal_elements = $('.ss-pm').find('.ss-pm-tile'),
	        reveal_elements_size = $reveal_elements.size();
	        var interval = setInterval( function() {
	            var $elem = $reveal_elements.eq(reveal_index);
	            TweenLite.to( $elem, 0, { css: { scale: 1, y: 60, opacity: 0 }, ease: Power3.easeOut, delay: 0 } );
	            TweenLite.to( $elem, 0.6, { css: { scale: 1, y: 0, opacity: 1, rotationX: 0.001 }, ease: Power2.easeOut, delay: 0 } );
	            if ( ++reveal_index > reveal_elements_size ) clearInterval(interval);
	        }, 50);
    	}, 200);
	    
	});


	// Portfolio Masonry Hover
	$('.ss-pm-tile-inner').on( 'mouseenter', function(e) {
		e.stopPropagation();
		var $title = $(this).find('.ss-pm-tile-title'),
			$subtitle = $(this).find('.ss-pm-tile-subtitle-inner');
		cp_effect($title, 'open', 0.4, 25);
		TweenLite.to( $subtitle, 0, { css: { y: -20, opacity: 0 }, ease: Power3.easeOut, delay: 0 } );
		TweenLite.to( $subtitle, 0.4, { css: { y: 0, opacity: 1 }, ease: Power3.easeOut, delay: 0.4 } );
	});
	$('.ss-pm-tile-inner').on( 'mouseleave', function(e) {
		e.stopPropagation();
		var $title = $(this).find('.ss-pm-tile-title'),
			$subtitle = $(this).find('.ss-pm-tile-subtitle-inner');
		cp_effect($title, 'close', 0.4, 25);
		TweenLite.to( $subtitle, 0.2, { css: { y: -20, opacity: 1 }, ease: Power3.easeIn, delay: 0 } );
	});


	/*---------------------------------------------------------------------------------*/
	/* 	Portfolio Box
	/*---------------------------------------------------------------------------------*/

	

	function update_portfolio_box() {

		// Portfolio Box Loader
		$('.ss-portfolio-box-wrap').each( function() {
			var $this = $(this);
			var porfolio_box_loader = imagesLoaded( $this );
			porfolio_box_loader.on('always', function (instance) {
				var img_height = $this.find('.ss-portfolio-box-fig').children('img').height();
				$this.find('.ss-portfolio-box-content').css('height', img_height + 'px');
			});
		});

		if (viewport_width > 768 ) {
			$('.ss-portfolio-box-fig').css('height', function() {
				return $(this).parent().siblings('.ss-portfolio-box-content').height() + 'px';
			});
		}

	}
	update_portfolio_box();
	var _update_portfolio_box = _.throttle(update_portfolio_box, 100);
	$window.resize(_update_portfolio_box);


	/*---------------------------------------------------------------------------------*/
	/* 	Content Roller
	/*---------------------------------------------------------------------------------*/

	$('.ss-cr-wrap').each( function(index) {

		var $this = $(this),
			$frame = $this.find('.ss-cr-frame'),
			$slidee = $this.find('.ss-cr-slidee'),
			content_roller_sly = [];

		if ( viewport_width > 768 ) {
			$slidee.find('.ss-cr-tile').css('width', function() {
				return $(this).closest('.ss-cr-wrap').width() / 2 + 'px';
			});
		} else if ( viewport_width < 768 ) {
			$slidee.find('.ss-cr-tile').css('width', function() {
				return $(this).closest('.ss-cr-wrap').width() + 'px';
			});
		}
		

		var sly_options = {
			scrollBar : $this.find('.ss-cr-scrollbar'),
			horizontal: 1,
			scrollBy: 0,
			dragHandle: 1,
			dynamicHandle: 0,
			itemNav: 0,
			clickBar: 1,
			speed: 600,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing:  1,
			swingSpeed: 0.1,
			elasticBounds: 0,
			cycleBy: null,
			cycleInterval: 4000
		};

		var iso_options = {
			resizable: false,
			transitionDuration: '0.4s',
			itemSelector: '.ss-cr-tile',
	        layoutMode: 'fitColumns',
		}

		var content_roller = imagesLoaded( $this );
		content_roller.on('always', function (instance) {

			// Init Isotope
			var $slidee_iso = $slidee.isotope(iso_options);
		    content_roller_sly[index] = new Sly( $frame, sly_options).init();

		    // Update Sly on Window Resize
			var _update_content_roller = _.throttle(function() {
				if ( viewport_width > 768 ) {
					$slidee.find('.ss-cr-tile').css('width', function() {
						return $(this).closest('.ss-cr-wrap').width() / 2 + 'px';
					});
				} else if ( viewport_width < 768 ) {
					$slidee.find('.ss-cr-tile').css('width', function() {
						return $(this).closest('.ss-cr-wrap').width() + 'px';
					});
				}
				content_roller_sly[index].destroy().init();
				$slidee.isotope('layout');
				content_roller_sly[index].reload();
			}, 300);
			$window.resize(_update_content_roller);
			_update_content_roller();

		});

	});
	

	/*---------------------------------------------------------------------------------*/
	/* 	Featured Category
	/*---------------------------------------------------------------------------------*/

	$('.ss-featured-cat').find('.ss-featured-cat-title').each( function() {
		cp_effect( $(this), 'open', 0.1, 1);
	});
	$('.ss-featured-cat').on( 'mouseenter', function() {
		var $title = $(this).find('.ss-featured-cat-title'),
			$subtitle = $(this).find('.ss-featured-cat-subtitle').children(),
			$img = $(this).find('.ss-featured-cat-fig').children();
		cp_effect($title, 'close', 0.2, 10);
		TweenLite.to( $subtitle, 0.4, { css: { y: -20, opacity: 0 }, ease: Power3.easeOut, delay: 0.2 } );

	});

	$('.ss-featured-cat').on( 'mouseleave', function() {
		var $title = $(this).find('.ss-featured-cat-title'),
			$subtitle = $(this).find('.ss-featured-cat-subtitle').children();
		cp_effect($title, 'open', 0.3, 10);
		TweenLite.to( $subtitle, 0, { css: { y: -20, opacity: 0 }, ease: Power3.easeOut, delay: 0 } );
		TweenLite.to( $subtitle, 0.4, { css: { y: 0, opacity: 1 }, ease: Power3.easeOut, delay: 0.2 } );
	});


	/*---------------------------------------------------------------------------------*/
	/* 	Shop Single
	/*---------------------------------------------------------------------------------*/

    $(".ss-shop-single-slider").royalSlider({
    	// autoScaleSlider: true,
        imageScaleMode: 'fill',
        controlNavigation: 'thumbnails',
        thumbs: {
	      firstMargin: false,
	      spacing: 10
	    }
    });

    $(".woocommerce-tabs .tabs li a").on('click', function(e) {
    	e.preventDefault();
    	$(this).closest('.tabs').children('li').removeClass('active');
    	$(this).parent().addClass('active');
    	var href = $(this).attr('href'),
    		id = href.substr(1);
    	$(this).closest('.woocommerce-tabs').find('.panel').hide();
    	$(this).closest('.woocommerce-tabs').find('#' + id).show();
    });

    $('.button-qty.desc-qty').on('click', function() {
    	var value = parseInt($(this).siblings('input').val(), 10);
    	if ( value == 1 || value == 0 ) {
    		$(this).siblings('input').val(0);
    	} else {
    		$(this).siblings('input').val(--value);
    	}
    	
    });
    $('.button-qty.inc-qty').on('click', function() {
    	var value = parseInt($(this).siblings('input').val(), 10);
    	$(this).siblings('input').val(++value);
    });


    /*---------------------------------------------------------------------------------*/
	/* 	Blog
	/*---------------------------------------------------------------------------------*/

	// Blog Slider
	$(".ss-blog-slider").royalSlider({
    	loop: true,
        autoHeight: true,
        imageScaleMode: 'fill',
        imageAlignCenter: false,
        usePreloader: true,
    });

    // Sharing
	$('.ss-share-button').on('click',  function(e) {
		e.preventDefault();
		TweenLite.to( $share_screen, 0.6, { css: { 'opacity': '1', y: '0', 'display': 'block' }, ease: Expo.easeOut, delay: 0 } );
		TweenLite.from( $('.ss-share-screen-title'), 0.6, { css: { 'opacity': '0', y: '-10' }, ease: Expo.easeOut, delay: 0.2 } );
		TweenLite.from( $('.ss-share-screen-services'), 0.6, { css: { 'opacity': '0', y: '10' }, ease: Expo.easeOut, delay: 0.2 } );
	});
	$('.ss-share-screen-close').on('click',  function(e) {
		e.preventDefault();
		TweenLite.to( $share_screen, 0.6, { css: { 'opacity': '0', y: '-30', 'display': 'none' }, ease: Expo.easeOut, delay: 0 } );
	});
	$('.ss-share-screen-close').on('mouseenter', function() {
		$(this).addClass( function() {
			return $(this).attr('data-effect');
		});
	}, function() {
		$(this).removeClass( function() {
			return $(this).attr('data-effect');
		});
	});

	// Update height of sharing screen
    function update_share_screen() {
		$share_screen.css( 'height', $(window).height() );
	}
	update_share_screen();
	var _update_share_screen = _.throttle(update_share_screen, 100);
	$window.resize(_update_share_screen);

	// Simple Blog Animate
	$('.ss-blog-simple-wrap .ss-blog-item').waypoint( function(direction) {
		TweenLite.to( $(this), 0, { css: { 'opacity': '0', y: '30px' }, ease: Expo.easeOut, delay: 0 } );
		TweenLite.to( $(this), 1.2, { css: { 'opacity': '1', y: '0' }, ease: Expo.easeOut, delay: 0 } );
	}, { offset: "85%", triggerOnce: true });

	// Heading Animate
	$('.ss-heading').waypoint( function(direction) {
		$(this).addClass('ss-active');
	}, { offset: "85%", triggerOnce: true });

	// $('.ss-banner-section-inner2 h1').waypoint( function(direction) {
	// 	cp_effect($(this), 'open', 0.6, 50);
	// }, { offset: "85%", triggerOnce: true });
	

	$('.ss-subbox-input').each( function() {
		var placeholder = $(this).attr('placeholder');
		$(this).val(placeholder);
	});
	$('.ss-subbox-input').on('focus', function() {
		$(this).val('');
	});
	$('.ss-subbox-input').on('focusout', function() {
		var placeholder = $(this).attr('placeholder');
		$(this).val(placeholder);
	});
	



	// Init Controller
 //    var scrollMagicController = new ScrollMagic.Controller();

 //    // Tweens
 //    var tl = new TimelineLite();
 //    tl.to('.ss-pm-tile:odd', 0.3, {y: '+=' + 10});
	// tl.to('.ss-pm-tile:odd', 0.3, {y: '+=' + 10}, "+=0.1");
	// tl.to('.ss-pm-tile:odd', 0.3, {y: '+=' + 10}, "+=0.1");

	// var tween = TweenMax.to('.ss-pm-tile:odd', 0.3, {
	//     y: '-=' + 30,
	//     delay: 0
	// });

	// var scene = new ScrollMagic.Scene({
	//     triggerElement: '#scene',
	//     // duration: 300,
	//     offset: 100,
	// })
	// .setTween(tween)
	// .addTo(scrollMagicController).addIndicators();

	// var scene2 = new ScrollMagic.Scene({
	//     triggerElement: '#scene',
	//     // duration: 300,
	//     offset: 150,
	// })
	// .setTween(tween)
	// .addTo(scrollMagicController).addIndicators();

	// var scene3 = new ScrollMagic.Scene({
	//     triggerElement: '#scene',
	//     // duration: 300,
	//     offset: 200,
	// })
	// .setTween(tween)
	// .addTo(scrollMagicController).addIndicators();


	/*---------------------------------------------------------------------------------*/
	/* 	Special Compress Effect (MAGIC!)
	/*---------------------------------------------------------------------------------*/

	function cp_effect(elem, dir, effect_speed, interval_speed) {
		
		var $elem = $(elem),
			dir = dir || 'open',
			effect_speed = effect_speed || 0.4,
			interval_speed = interval_speed || 100,
			is_called_before = $elem.hasClass('ss-cp-effect-called') ? true : false ;

		// CSS
		$elem.addClass('ss-cp-effect');
		if ( dir == 'open') {
			$elem.css('opacity', 0);
		} else {
			$elem.addClass('ss-cp-effect-close');
		}

		// Set wrapper width
		$elem.css('width', $elem.width() + 'px' );

		// If func was not called on elem before
		if ( !is_called_before ) {

			// Clone nodes
			$elem.wrapInner( "<div class='ss-cp-effect-txt-1'></div>");
			var $clone = $elem.find('.ss-cp-effect-txt-1').clone().attr('class','ss-cp-effect-txt-2');
				$elem.append($clone);

			// Lettering
			$elem.children().lettering();
			$elem.find('span').each(function(index, el) {
				if ( $.trim( $(this).text() )  == "" ) {
					$(this).css('width', '10px');
				}
			});

			$elem.css('height', function() {
				return $(this).find('.ss-cp-effect-txt-1').height() + 'px';
			});

			$elem.addClass('ss-cp-effect-called');

		}

		// Positioning
		var $txt_1 = $elem.find('.ss-cp-effect-txt-1'),
			$txt_2 = $elem.find('.ss-cp-effect-txt-2'),
			$txt_1_height = $txt_1.height(),
			$txt_2_height = $txt_2.height();

		

		if ( !is_called_before ) {
			$txt_1.css('height', $txt_1_height / 2 + 'px' );
			$txt_2.css('height', $txt_2_height / 2 + 'px' );
		} else {
			$txt_1.css('height', $txt_1_height + 'px' );
			$txt_2.css('height', $txt_2_height + 'px' );
		}
		
		$txt_2.css('top', $txt_2.height() + 'px');
		TweenLite.to( $txt_2.children(), 0, {css: { y: -$txt_2.height() }} );
		TweenLite.to( $txt_1.children(), 0, {css: { y: 0 }} );



		// Processing
		var txt_length = $txt_1.text().length,
			random_num = [];

		for (var i = 0; i <= txt_length; i++) {
	    	random_num[i] = i;
	  	}
		random_num.sort( function () { // Randomize the random_num
		  return Math.random() - 0.5;
		});

		// Magic!
		var $anim_elements = $txt_1.find('span'),
			interval_index = 0;

		$elem.css('opacity', 1);
		if ( dir == 'open') {
			$elem.find('span').css('opacity', 0);
		}

		TweenMax.killChildTweensOf( $txt_1[0] );
		TweenMax.killChildTweensOf( $txt_2[0] );
		
		var interval = setInterval( function() {

			var anim_index = random_num.pop(),
				$txt_1_node = $anim_elements.eq(anim_index),
				$txt_2_node = $anim_elements.parent().next().children().eq(anim_index);

			if ( dir == 'open') {
				
				TweenLite.to( $txt_1_node, 0, { css: { y: '+=' + 30, opacity: 0 }, ease: Expo.easeOut, delay: 0 });
				TweenLite.to( $txt_2_node, 0, { css: { y: '+=' + -30, opacity: 0 }, ease: Expo.easeOut, delay: 0 });
				TweenLite.to( $txt_1_node, effect_speed, { css: {  opacity: 1, y: 0 }, ease: Expo.easeOut, delay: 0 });
				TweenLite.to( $txt_2_node, effect_speed, { css: {  opacity: 1, y: -$txt_2.height() }, ease: Expo.easeOut, delay: 0 });

			} else {
				TweenLite.to( $txt_1_node, effect_speed , { css: { y: '+=' + 30,  opacity: 0 }, ease: Power2.easeIn, delay: 0 });
				TweenLite.to( $txt_2_node, effect_speed, { css: { y: '+=' + -30, opacity: 0 }, ease: Power2.easeIn, delay: 0 });
			}
			
			if ( ++interval_index > txt_length ) clearInterval(interval);
		}, interval_speed);

		is_called_before = true;

	}


	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	FontFaceOnload("Montserrat", {
	    success: function() {

	    	setTimeout( function() {
	    		$('.ss-cp-effect-waypoint').waypoint( function(direction) {
					cp_effect(this, 'open');
				}, { offset: "85%", triggerOnce: true });
				cp_effect($('.ss-pm-tile-title')[0], 'open');
	    	}, 500);
	    	
	    	
	    },
	    error: function() {
	    	console.log('Font load error!');
	    },
	    timeout: 5000,
	});


	// Helpers

	var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;  
	}

	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	}

	function disableScroll() {
	  if (window.addEventListener) // older FF
	      window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}

	function enableScroll() {
	    if (window.removeEventListener)
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
	    window.onmousewheel = document.onmousewheel = null; 
	    window.onwheel = null; 
	    window.ontouchmove = null;  
	    document.onkeydown = null;  
	}



});

$(window).load( function() {


});