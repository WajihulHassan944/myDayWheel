    /* ==========================================================================
           LOADER SPIN LOADING PAGE
           ========================================================================== */

    $(window).load(function() {
        $(".spinner").delay(500).fadeOut();
        $("#loader-wrapper").delay(350).fadeOut("fast");
    });


    /* ==========================================================================
    OWL Slider Gallery
    ========================================================================== */

    $(document).ready(function() {
        'use strict';
        var owl = $("#owl-demo-1");

        owl.owlCarousel({
            items: 7, //10 items above 1000px browser width
            itemsDesktop: [1000, 7], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 4], // betweem 900px and 601px
            itemsTablet: [600, 3], //2 items between 600 and 0
            itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
            autoPlay: 3500,
            slideSpeed: 300,
            lazyLoad: false,
            stopOnHover: true,
            pagination: false
        });

        var owl = $("#owl-demo-2");

        owl.owlCarousel({
            autoPlay: 3500, //Set AutoPlay to 3 seconds
            items: 5,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [600, 3],
            // itemsMobile : true,
            itemsMobile: [290, 2],
            responsive: true,
            navigation: false,
            pagination: false,
            lazyLoad: false

        });

        /* ==========================================================================
        OWL Slider Gallery
        ========================================================================== */
        var owl = $("#owl-demo-3");

        owl.owlCarousel({
            navigation: false,
            singleItem: true,
            pagination: true,
            transitionStyle: "fade"
            // transitionStyle : "godown"
        });
        var owl = $("#owl-demo-4");

        owl.owlCarousel({
            navigation: false,
            singleItem: true,
            pagination: true,
            transitionStyle: "fade"
            // transitionStyle: "godown"
            // transitionStyle : "godown"
        });

    });
    var owl = $("#owl-demo-5");

    owl.owlCarousel({
        navigation: false,
        singleItem: true,
        pagination: true,
        transitionStyle: "fade"
        // transitionStyle : "godown"
    });


    /* ==========================================================================
       Responsive YOUTUBE AND VIMEO Video Fitvids script
       ========================================================================== */
    fluidvids.init({
        selector: ['iframe'],
        players: ['www.youtube.com', 'player.vimeo.com']
    });


    /* 
       BOOTSTRAP SNIPPETS
       ========================================================================== */
    $('a').tooltip('hide');

    $(".note__close").click(function(e) {
        e.preventDefault();
        $(this).parent()
            .animate({
                opacity: 0
            }, 250, function() {
                $(this)
                    .animate({
                        marginBottom: 0
                    }, 250)
                    .children()
                    .animate({
                        padding: 0
                    }, 250)
                    .wrapInner("<div />")
                    .children()
                    .slideUp(250, function() {
                        $(this).closest(".note").remove();
                    });
            });
    });

    /* 
       TABS
       ========================================================================== */



    $(document).ready(function() {

        (function($) {
            "use strict";
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

            $('.tab ul.tabs li a').click(function(g) {
                var tab = $(this).closest('.tab'),
                    index = $(this).closest('li').index();

                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');

                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

                g.preventDefault();
            });
        })(jQuery);
    });

    /* 
       Accordion and toggles
       ========================================================================== */

    (function($) {
        "use strict";
        $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

        $('.accordion a').click(function(j) {
            var dropDown = $(this).closest('li').find('p');

            $(this).closest('.accordion').find('p').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('active');
                $(this).addClass('active');
            }

            dropDown.stop(false, true).slideToggle();

            j.preventDefault();
        });
    })(jQuery);

    /* 
       Animated Skills progress
       ========================================================================== */
    $(function() {
        "use strict";
        $('progress').each(function() {
            var max = $(this).val();
            $(this).val(0).animate({
                value: max
            }, {
                duration: 2000,
                easing: 'easeOutCirc'
            });
        });
    });

    /* 
       Animated skills Pie
       ========================================================================== */

    $('.percentage').easyPieChart({
        animate: 1900,
        lineWidth: 7,
        onStep: function(value) {
            this.$el.find('span').text(Math.round(value));
        },
        onStop: function(value, to) {
            this.$el.find('span').text(Math.round(to));
        }
    });
    /* ==========================================================================
       NIVO LIGHTBOX
       ========================================================================== */
    $(document).ready(function() {

        $('a').nivoLightbox({
            effect: 'fadeScale',
        });

    });


    /* ==========================================================================
     WOW.JS AND ANIMATE.CSS
     ========================================================================== */
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        // live:         true        // act on asynchronously loaded content (default is true)
    });
    wow.init();


    // To test the @id toggling on password inputs in browsers that don’t support changing an input’s @type dynamically (e.g. Firefox 3.6 or IE), uncomment this:
    // $.fn.hide = function() { return this; }
    // Then uncomment the last rule in the <style> element (in the <head>).

    /* ==========================================================================
       TEXT ROTATER
       ========================================================================== */

    $('#slider-text').liquidSlider({
        autoSlide: true,
        autoSlideInterval: 3500,
        autoSlideControls: true,
        forceAutoSlide: true,
        dynamicArrows: false,

        slideEaseFunction: 'animate.css',
        slideEaseFunctionFallback: 'swing',
        slideEaseDuration: 400,
        heightEaseDuration: 400,
        continuous: true,
        // fadeInDuration: 500,
        // fadeOutDuration: 500,
        animateIn: "flipInX",
        animateOut: "flipOutX"
        // responsive: true,
        // firstPanelToLoad:1,
        // minHeight: 100,
        // autoHeight: true,
        // pauseOnHover: true


    });


    /* ==========================================================================
       FORM VALIDATION JQUERY
       ========================================================================== */
    // Custom validation messages
    // Set msg on 'data-validation-msg' input attribute
    // -------------------------------------------------
    $('document').ready(function() {
        $('.form-input').blur(function() {
            if ($(this).val().length > 1) {
                $(this).addClass("valid");
                $(this).removeClass("error");
            } else if ($(this).val().length == "") {
                $(this).addClass("error");
                $(this).removeClass("valid");
            }
        });

        // Submit button validation
        $('.button').click(function() {
            $('.form-input').each(function() {
                if ($(this).val().length > 1) {
                    $(this).addClass("valid");
                    $(this).removeClass("error");
                    $("h2").remove();
                } else if ($(this).val().length == "") {
                    $(this).addClass("error");
                    $(this).removeClass("valid");
                    $("#defaultForm").append("<h2>Please Correct Errors</h2>");
                    var seen = {};
                    $('h2').each(function() {
                        var txt = $(this).text();
                        if (seen[txt])
                            $(this).remove();
                        else
                            seen[txt] = true;
                    });
                } //end of if    
            });
        }); // end of button click

        // Clear form fields
        $('.reset').click(function() {
            $('input:text').val('');
            $("h2").remove();
        });
    }); // End of document

    /* ==========================================================================
       MILESTONE COUNDDOWN TIMER
       ========================================================================== */

    (function($) {
        $.fn.countTo = function(options) {
            options = options || {};

            return $(this).each(function() {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0, // the number the element should start at
            to: 0, // the number the element should end at
            speed: 2500, // how long it should take to count between the target numbers
            refreshInterval: 20, // how often the element should be updated
            decimals: 0, // the number of decimal places to show
            formatter: formatter, // handler for formatting the value before rendering
            onUpdate: null, // callback method for every time the element is updated
            onComplete: null // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    jQuery(function($) {
        // custom formatting example
        function ReplaceNumberWithCommas(yourNumbers) {
            //Seperates the components of the number
            var components = yourNumber.toString().split(".");
            //Comma-fies the first part
            components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            //Combines the two sections
            return components.join(".");
        }

        // start all the timers
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('yourNumbers') || {});
            $this.countTo(options);
        }
    });

    /* ==========================================================================
       SMOOTH SCROLL
       ========================================================================== */

    $(function() {

        var $window = $(window); //Window object

        var scrollTime = .6; //Scroll time
        var scrollDistance = 400; //Distance. Use smaller value for shorter scroll and greater value for longer scroll

        $window.on("mousewheel DOMMouseScroll", function(event) {

            //event.preventDefault();

            var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to($window, scrollTime, {
                scrollTo: {
                    y: finalScroll,
                    autoKill: true
                },
                ease: Power1.easeOut, //For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
                autoKill: false,
                overwrite: 5
            });
        });

    });
    /* ==========================================================================
       SMOOTH PAGE USE THE SCRIPT TO NAVIGATE YOUR LINK
       ========================================================================== */

    $(function() {

        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    /* ==========================================================================
       FLEX SLIDER
       ========================================================================== */
    $(window).load(function() {  
        $('.flexslider').flexslider({    
            easing: "swing",
            animation: "bounce",
            slideshowSpeed: 7000,
            animationSpeed: 600,
            // startAt: 0,
            animationLoop: false,
            slideshow: false,
            useCSS: true,
            touch: true,
            pauseOnHover: true
            // initDelay: 10
              
        });
    });


    /* ==========================================================================
       FIXED NAV
       ========================================================================== */

    jQuery(document).ready(function($) {
        // browser window scroll (in pixels) after which the "menu" link is shown
        var offset = -10;

        var navigationContainer = $('#cd-nav'),
            mainNavigation = navigationContainer.find('#cd-main-nav ul');

        //hide or show the "menu" link
        checkMenu();
        $(window).scroll(function() {
            checkMenu();
        });

        //open or close the menu clicking on the bottom "menu" link
        $('.cd-nav-trigger').on('click', function() {
            $(this).toggleClass('menu-is-open');
            //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
            mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
        });

        // Close menu when we select the list item in menu
        $('#cd-main-nav a').on('click', function() {
            $('#cd-nav a').removeClass('menu-is-open');
            $('#cd-main-nav ul').removeClass('is-visible')
        });


        function checkMenu() {
            if ($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
                navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    mainNavigation.addClass('has-transitions');
                });
            } else if ($(window).scrollTop() <= offset) {
                //check if the menu is open when scrolling up
                if (mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
                    //close the menu with animation
                    mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                        //wait for the menu to be closed and do the rest
                        mainNavigation.removeClass('is-visible is-hidden has-transitions');
                        navigationContainer.removeClass('is-fixed');
                        $('.cd-nav-trigger').removeClass('menu-is-open');
                    });
                    //check if the menu is open when scrolling up - fallback if transitions are not supported
                } else if (mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
                    mainNavigation.removeClass('is-visible has-transitions');
                    navigationContainer.removeClass('is-fixed');
                    $('.cd-nav-trigger').removeClass('menu-is-open');
                    //scrolling up with menu closed
                } else {
                    navigationContainer.removeClass('is-fixed');
                    mainNavigation.removeClass('has-transitions');
                }
            }
        }
    });


    /* menu navigation links */
    $('.daywheel-page-link').click(function() {
        window.location.href = './dashboard.php';
    });
    $('.home-page-link').click(function() {
        window.location.href = './index.php';
    });