(function(){
//one page scroll
    var sections = $('.section'),
    display  = $('.maincontent'),
    inScroll = false;

    var md = new MobileDetect(window.navigator.userAgent),
        ismobile = md.mobile();
    var performTransition = function(sectionEq) {

        if(!inScroll) {
            inScroll = true;
            var position = (sectionEq * -100) + '%';
            display.css({
                'transform':'translateY (' + position + ')',
                '-webkit-transform':'translateY(' + position + ')'
            });
            sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

            setTimeout(function(){
                inScroll = false;
                $('.fixed-menu__item').eq(sectionEq).addClass('active')
                .siblings().removeClass('active');
            }, 1300);
        }
        
    };

    var defineSections = function(sections){
        var activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    };
    var scrollTosection = function(direction){
        var section = defineSections(sections);

        if(direction == 'up' && section.nextSection.length){
            performTransition(section.nextSection.index());
        }

        if(direction == 'down' && section.prevSection.length){
            performTransition(section.prevSection.index());
        }
    };

    $('.wrapper').on({
        wheel: function(e){
            var deltaY = e.originalEvent.deltaY;
            var direction = deltaY > 0 ? 'up':'down';
            scrollTosection(direction);
        },
        touchmove: function(e) {
            e.preventDefault();
        }
    });

//one page scroll для телефонов
    if(ismobile){
        $(window).swipe({
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                scrollTosection(direction);
            }
        });
    }
    
//для кнопок
    $(document).on('keydown', function(e){
        var section = defineSections(sections);

        switch(e.keyCode) {
            case 40: //вверх
                if(section.nextSection.length) {
                    performTransition(section.nextSection.index());
                }
                break;
            case 38: //вниз
                if(section.prevSection.length) {
                    performTransition(section.prevSection.index());
                }
                break;
        }
    });

//nav menu
    $('[data-scroll-to]').on('click', function(e){
        e.preventDefault();
        var elem = $(e.target);
        var sectionNum = parseInt(elem.attr('data-scroll-to'));
        performTransition(sectionNum);
        $('.hamburger__menu').slideUp(300);
    });

})();

$(function(){

//section hero
    $('.hamburger-menu-link').on('click', function(e){
        e.preventDefault();
        $('.hamburger__menu').slideDown(300);
    });

    $('.hamburger-menu__close').on('click', function(e){
        e.preventDefault();
        $('.hamburger__menu').slideUp(300);
    });

//section burger
    $('.img__top').on('click', function(){
        $('.burger__products').toggle();
    });

//section team
    $('.team-acco__title').on('click', function(e){
        e.preventDefault();
        var elem = $(e.target).closest('.team-acco__item');
        elem.toggleClass('active').siblings().removeClass('active');
    });

//section menu
    $('.title__acco').on('click', function(e){
        e.preventDefault();
        var elem = $(e.target).closest('.menu-acco__item');
        elem.toggleClass('active').siblings().removeClass('active');
    });

    $('.menu-acco__closed').on('click', function(e){
        e.preventDefault();
        $(e.target).closest('.menu-acco__item').removeClass('active');
    });

//section review
    $('.reviews__btn').on('click', function(e){
        e.preventDefault();

        var elem = $(e.target),
            target = elem.closest('.reviews__item').index();

        $('.full-review').show();
        $('.full-review__item').eq(target).show().siblings().hide();
    });

    $('.full-review__close').on('click', function(e){
        e.preventDefault();
        $('.full-review').hide();
    });

//section order form
    var submitForm = function(e) {
        e.preventDefault();

        var form = $(e.target),
            url  = form.attr('action'),
            data = form.serialize();

        var request = $.ajax({
            type: 'POST',
            url: url,
            data: data
        });

        request.done(function() {
            $('#success').show();
        });
        request.fail(function() {
            $('#error').show();
        });
    };

    $('#order__form').on('submit', submitForm);

    $('.status-popup__close').on('click', function(e){
        e.preventDefault();
        $('.status-popup').hide();
    })

});
$(function(){
//slider
    $('.burger-slider').bxSlider({
        responsive: false,
        pager:false,
    });
});