
var main = {
    initialize:
        function(){
            new WOW().init();
            $(".dropdown-toggle-js").dropdown();
            $(".dropdown-toggle").dropdown();

            $("a.fancyimage").fancybox();

            $(".scrollup").unbind().click(function(e){
                $('html, body').animate({scrollTop:0},1000);
            });
            $(window).scroll(function() {

                if ($(this).scrollTop()>200) $('.scrollup').fadeIn();
                else $('.scrollup').fadeOut();

            });
        }
}


$(document).ready(function(){
    main.initialize();
});