var Site = (function($){

	var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		is_safari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);


	var Scrolling = {
		init : function(){
			$("#fullpage").fullpage({
				verticalCentered : false,
				scrollOverflow: true,

				onLeave: function(index, nextIndex, direction){
					// Top block
					if (nextIndex > 1) {
						$("#heading").addClass("solid");
					} else {
						$("#heading").removeClass("solid");
					}

					// Fixed button
					if (nextIndex == 3) {
						$("#get_model_btn").addClass("orange");
					} else {
						$("#get_model_btn").removeClass("orange");
					}
				},
		        afterLoad: function(anchorLink, index){},
		        afterRender: function(){},
		        afterResize: function(){},
		        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
			});
		}
	};


	var Animation = {
		tilesBlock : function(){
			$(".about_block.recall").on("mouseenter", function(e){
				var that = this,
					$parent = $(that),
					$layer = {
						wrap : $(that).children(".layer"),
						photo : $(that).children(".layer").find(".photo"),
						text : $(that).children(".layer").find("div"),
						name : $(that).children(".layer").find(".name")
					};

				TweenLite.set( $layer.wrap, {scale: 0.95});
				TweenLite.to( $layer.wrap, 0.3, { css: { scale: 1, opacity: 1 }, ease: Power4.easeOut, delay: 0 } );
			});

			$(".about_block.recall").on("mouseleave", function(e){
				var that = this,
					$parent = $(that),
					$layer = {
						wrap : $(that).children(".layer"),
						photo : $(that).children(".layer").find(".photo"),
						text : $(that).children(".layer").find("div"),
						name : $(that).children(".layer").find(".name")
					};

				TweenLite.to( $layer.wrap, 0.3, { css: { scale: 0.95, opacity: 0 }, ease: Power4.easeOut, delay: 0 } );
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
		}
	};


	// Initializer
	this.init = function(){
		Scrolling.init();
		Animation.topLineBlock();
		Animation.tilesBlock();
	}();

	// Public API
	return {};

})(jQuery);