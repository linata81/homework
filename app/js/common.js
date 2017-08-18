(function(){

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

})();