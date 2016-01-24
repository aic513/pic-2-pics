var Site = (function($){

	var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		is_safari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

	var Animation = {
		topBlock : function(){
			var o = this;
			var is_cover_animating = false,
				is_cover_gone = false,
				animate_logic = 0,
				array = [0,1];

			$(window).on('scroll touchmove mousewheel', function(e) {

				var x = $(window).scrollTop();
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
							o.disableScroll();

							TweenLite.to( $("#top").children(), 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 0.95 }, ease: Power4.easeOut, delay: 0 });
							TweenLite.to( $("#top"), 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 1, y: -1000 }, ease: Power4.easeOut, delay: 0.3,
								onComplete: function() {
									is_cover_animating = false;
									is_cover_gone = true;
									$("body").addClass('ss-cover-gone');
									o.enableScroll();
								}
							});

							TweenLite.to( $('#content'), 0, { css: { opacity: 0, y: 60, scale: 0.95, rotationX: 0.001}, ease: Power4.easeOut, delay: 0 });
							TweenLite.to( $('#content'), 0.4, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0.4 });
							TweenLite.to( $('#content'), 0.4, { css: { scale: 1, rotationX: 0 }, ease: Power4.easeOut, delay: 0.8 });

							$('html, body').animate({
							    scrollTop: 0
							}, 0);
							
						}

					}
					
				} else if ( x == 0 && is_cover_gone && array[1] < array[0] ) {
					TweenLite.to( $("#top"), 0.4, { css: { y: 0 }, ease: Power4.easeOut, delay: 0,
						onComplete: function() {
							is_cover_gone = false;
							$("body").removeClass('ss-cover-gone');
							$("#top").css('transform', '');
						},
					});
					TweenLite.to( $("#top").children(), 0.4, { css: { opacity: 1, rotationX: 0.01, scale: 1 }, ease: Power4.easeOut, delay: 0.3 });
					
				}

			});
		},

		navBlock : function(){
			$('[data-open="nav"]').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr("data-target");

				TweenLite.to( $(".intro .menu"), 0.2, { css: { opacity: 0 }, ease: Power4.easeOut, delay: 0 });
				TweenLite.set(target, {perspective: 800});
				TweenLite.set(target, {transformStyle: "preserve-3d"});
				if ( is_safari ) {
					TweenLite.to( $(target), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0, { css: { opacity: 0, y: 60 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0.6, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
				} else {
					TweenLite.to( $(target), 0, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0, { css: { opacity: 0, rotationX: -15, scale: 0.9, y: 60 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target), 0.6, { css: { display: 'block', opacity: 1 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0.6, { css: { opacity: 1, rotationX: 0, scale: 1, y: 0 }, ease: Power4.easeOut, delay: 0 });
				}
			});

			$('[data-close="nav"]').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr("data-target");

				TweenLite.to( $(".intro .menu"), 0.2, { css: { opacity: 1 }, ease: Power4.easeOut, delay: 0 });
				TweenLite.set(target, {perspective: 800});
				TweenLite.set(target, {transformStyle: "preserve-3d"});
				if ( is_safari ) {
					TweenLite.to( $(target), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0.6, { css: { opacity: 0, y: 0 }, ease: Power4.easeOut, delay: 0 });
				} else {
					TweenLite.to( $(target), 0.6, { css: { display: 'none', opacity: 0 }, ease: Power4.easeOut, delay: 0 });
					TweenLite.to( $(target+" .main_wrap"), 0.6, { css: { opacity: 0, rotationX: 0.1, scale: 0.95, y: 0 }, ease: Power4.easeOut, delay: 0 });
				}
				
			});
		},

		menuBlock : function(){
			$('.menu_list li').on('mouseenter', function() {
				if ( !$(this).hasClass('hover') ) {
					var $submenu = $(this).children('ul'),
						submenu_height = $submenu.height();

					$submenu.css('height', '0px');
					$(this).addClass('hover');
					$submenu.animate( {
						height: submenu_height + 'px',
					},'600','easeOutExpo');

					var $elem = $submenu.find('li');
					TweenLite.to( $elem, 0, { css: { opacity: 0, y: 15 }, ease: Expo.easeOut, delay: 0 });
					TweenLite.to( $elem, 0.6, { css: { opacity: 1, y: 0 }, ease: Expo.easeOut, delay: 0.3 });
				}
			});

			$('.menu_list').on('mouseleave', function() {
				var $submenu = $(this).find('ul'),
					$this = $(this);

				$submenu.animate( {
					height: '0',
				}, '400', 'easeOutExpo', function() {
					$submenu.css('height','');
					$submenu.parent().removeClass('hover');
				});
			});
		},

		topLineBlock : function(){
			var o = this;
			$(".top_line .call > a").on("click", function(e){
				e.preventDefault();
				$block = $(this).next("div");
				$block.fadeIn(200, function(){ 
					$block.toggleClass("opened"); 
				});
				$("<div class='backdrop'></div>")
				.prependTo($(this).parent().parent())
				.css({
					position: "fixed",
					top: 0, left: 0,
					width: "100%", height: "100%",
					zIndex: 1001,
					background: "transparent"
				});
				o.backdropHandler();
			});
		},

		backdropHandler : function(){
			$(".backdrop").on("click", function(e){
				$(".top_line .call > div").fadeOut(200, function(){ 
					$(".top_line .call > div").removeClass("opened"); 
				});
				$(this).remove();
			});
		},

		tilesBlock : function(){
			$(".about_wrap .about").on("mouseenter", function(e){
				var that = this,
					$parent = $(that),
					$layer = {
						wrap : $(that).children(".layer"),
						heading : $(that).children(".layer").find("h3"),
						desc : $(that).children(".layer").find("p")
					},
					$hover = {
						wrap : $(that).children(".layer_hover"),
						photo : $(that).children(".layer_hover").find(".photo"),
						name : $(that).children(".layer_hover").children("span"),
						desc : $(that).children(".layer_hover").find("p")
					};

				// Animating main layer
				TweenLite.to( $layer.heading, 0.2, { css: { opacity: 0, y: -10 }, ease: Power4.easeOut, delay: 0 });
				TweenLite.to( $layer.desc, 0.2, { css: { opacity: 0, y: 10 }, ease: Power4.easeOut, delay: 0 } );

				// Prepare hover layer
				TweenLite.set( $hover.wrap, {scale: 0.95});
				if ($hover.photo.hasClass("to_right")) {
					TweenLite.set( $hover.photo, {opacity: 0, top: -25, right: -25, height: 50, width: 50});
				} else {
					TweenLite.set( $hover.photo, {opacity: 0, top: -25, left: -25, height: 50, width: 50});
				}
				TweenLite.set( $hover.name, {opacity: 0, y: -10});
				TweenLite.set( $hover.desc, {opacity: 0, y: 10});

				// Animating hover layer
				TweenLite.to( $hover.wrap, 0.3, { css: { scale: 1, opacity: 1 }, ease: Power4.easeOut, delay: 0 } );
				if ($hover.photo.hasClass("to_right")) {
					TweenLite.to( $hover.photo, 0.3, { css: { opacity: 1, top: -50, right: -50, height: 100, width: 100 }, ease: Power4.easeOut, delay: 0 } );
				} else {
					TweenLite.to( $hover.photo, 0.3, { css: { opacity: 1, top: -50, left: -50, height: 100, width: 100 }, ease: Power4.easeOut, delay: 0 } );
				}
				TweenLite.to( $hover.name, 0.2, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0 } );
				TweenLite.to( $hover.desc, 0.2, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0 } );
			});

			$(".about_wrap .about").on("mouseleave", function(e){
				var that = this,
					$parent = $(that),
					$layer = {
						wrap : $(that).children(".layer"),
						heading : $(that).children(".layer").find("h3"),
						desc : $(that).children(".layer").find("p")
					},
					$hover = {
						wrap : $(that).children(".layer_hover"),
						photo : $(that).children(".layer_hover").find(".photo"),
						name : $(that).children(".layer_hover").children("span"),
						desc : $(that).children(".layer_hover").find("p")
					};

				TweenLite.to( $hover.name, 0.2, { css: { opacity: 0, y: -10 }, ease: Power4.easeOut, delay: 0 } );
				TweenLite.to( $hover.desc, 0.2, { css: { opacity: 0, y: 10 }, ease: Power4.easeOut, delay: 0 } );
				TweenLite.to( $hover.wrap, 0.3, { css: { scale: 0.95, opacity: 0 }, ease: Power4.easeOut, delay: 0 } );
				if ($hover.photo.hasClass("to_right")) {
					TweenLite.to( $hover.photo, 0.3, { css: { opacity: 0, top: -25, right: -25, height: 50, width: 50 }, ease: Power4.easeOut, delay: 0 } );
				} else {
					TweenLite.to( $hover.photo, 0.3, { css: { opacity: 0, top: -25, left: -25, height: 50, width: 50 }, ease: Power4.easeOut, delay: 0 } );
				}

				// Animating main layer
				TweenLite.to( $layer.heading, 0.3, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0.1 });
				TweenLite.to( $layer.desc, 0.3, { css: { opacity: 1, y: 0 }, ease: Power4.easeOut, delay: 0.1 } );
			});
		},


		// Helpers
		keys : {37: 1, 38: 1, 39: 1, 40: 1},

		preventDefault : function (e) {
		  e = e || window.event;
		  if (e.preventDefault)
		      e.preventDefault();
		  e.returnValue = false;  
		},

		preventDefaultForScrollKeys : function (e) {
		    if (this.keys[e.keyCode]) {
		        preventDefault(e);
		        return false;
		    }
		},

		disableScroll : function () {
		  if (window.addEventListener) // older FF
		      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		  window.onwheel = this.preventDefault; // modern standard
		  window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
		  window.ontouchmove  = this.preventDefault; // mobile
		  document.onkeydown  = this.preventDefaultForScrollKeys;
		},

		enableScroll : function () {
		    if (window.removeEventListener)
		        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
		    window.onmousewheel = document.onmousewheel = null; 
		    window.onwheel = null; 
		    window.ontouchmove = null;  
		    document.onkeydown = null;  
		}
	}


	// Initializer
	this.init = function(){
		Animation.topBlock();
		Animation.navBlock();
		Animation.menuBlock();
		Animation.topLineBlock();
		Animation.tilesBlock();
	}();

	return {};
})(jQuery);