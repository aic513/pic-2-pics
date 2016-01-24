(function(global, $) {
    var setItemDescriptionPosition = function() {
        $('.products-item-content-description').each(function(index, item) {
            var $item = $(item);

            (function(item) {
                item.css({
                    'position':'absolute',
                    'maxWidth': item.closest('.products-item-content').width()
                });

                item.css({
                    'left': (item.closest('.products-item-content').outerWidth() - item.outerWidth()) / 2
                });

                item.css({
                    'top': (item.closest('.products-item-content').height() - item.height()) / 2  - item.closest('.products-item-content').find('.products-item-content-title').outerHeight()
                });
            })($item);
        });
    };

    var init = function () {
        var vph = $(window).height(),
            slidingMenuWidth = ($(document).width() > 800 ? 800 : ($(document).width() * 0.75));
        $('.full-page').height(vph);
        $('.header-main-content').outerHeight(vph - $('.header-main-menu').outerHeight(true) - $('.header-footer-menu').outerHeight(true));

        makeMeCenter();
        setItemDescriptionPosition();
        scroller();
    };

    var getRandomElements = function (arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len;
        }
        return result;
    };

    var zeroPad = function (num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };

    var emoji = function (emojiPerTime) {
        emojiPerTime = emojiPerTime || 3;
        var emojiCounter = { first: 1, last: 39},
            emojiIcons = [];

        for (var i = emojiCounter.first; i <= emojiCounter.last; i++) {
            emojiIcons.push('./images/emoji/{i}.png'.replace('{i}', zeroPad(i, 4)));
        }

        $('.emoji-trigger').hover(function() {
            var randomElements = getRandomElements(emojiIcons, emojiPerTime),
                images = [];

            for (var i = 0; i < emojiPerTime; i++) {
                var $container = $('.emoji-container'),
                    $div = $('<div>').css({
                        'width': (Math.floor(Math.random() * 100) + 50),
                        'position': 'absolute',
                        'top': (Math.floor(Math.random() * $container.height()) + 20),
                        'left': (Math.floor(Math.random() * $container.width()) - 50),
                        'zIndex': 0
                    }).attr('class', 'emoji-triggered'),
                    $img = $('<img>').attr('src', randomElements[i]).addClass('full-width-image');

                images.push($div.append($img).appendTo('.emoji-container'));
            }
        }, function() {
            $('.emoji-triggered').remove();
        });
    };

    var fancybox = function() {
        $('.modal-form').fancybox({
            padding: 0,
            width: '390px'
        });
    };

    var makeMeCenter = function() {
        var $centerMe = $('.-center-me'),
            $centerMeTo = $('.-center-me-to');

        $centerMe.hide();
        $centerMeTo.css({
            'position': 'relative'
        });

        $centerMe.css({
            'position': 'absolute',
            'top': ($centerMeTo.outerHeight() - $centerMe.height()) / 2  + $centerMeTo.find('div').first().outerHeight() / 2,
            'left': ($centerMeTo.outerWidth() - $centerMe.outerWidth()) / 2
        }).show();
    };

    var scroller = function() {
        $('.scroller').slimScroll({
            height: $('.scroller-wrapper').height()
        });
    };

    var menuTrigger = function () {
        var $menuTrigger = $('.menu-trigger');

        $menuTrigger.hover(function(e) {
            e.preventDefault();
            $('.menu-triggered').hide();
            $(this).parent().find('.menu-triggered').show();
            makeMeCenter();
        });
    };

    var slidingMenu = function() {
        $('.sliding-menu-link').click(function(event) {
            var content = $(this).parent().find('.sliding-menu-content'),
                width = ($(document).width() > 800 ? 800 : ($(document).width() * 0.75));

            event.preventDefault();

            if ($('.sliding-menu.-active').length > 0) {
                $('.sliding-menu.-active').hide('slide', { direction: 'right' }, 500, function () {
                    setTimeout(function() {
                        $('.sliding-menu').addClass('-active').css({ 'width': width }).find('.inner').delay(400).html(content.html());
                        $('.sliding-menu').show('slide', { direction: 'right' }, 800);
                    }, 100);
                });
            } else {
                setTimeout(function() {
                    $('.sliding-menu').addClass('-active').css({ 'width': width }).find('.inner').delay(400).html(content.html());
                    $('.sliding-menu').show('slide', { direction: 'right' }, 800);
                }, 100);
            }
        });
    };

    $(document).ready(function () {
        $('body').show();
        $(window).resize(init);
    });

    $(window).on('load', function() {
        init();
        fancybox();
        emoji();
        menuTrigger();
        slidingMenu();
    });
})(window, jQuery);