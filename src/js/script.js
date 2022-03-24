jQuery(function($) {

    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
    $(document).on('click', 'a[href*="#"]', function() {
        let time = 400;
        let header = $('header').innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $('html,body').animate({ scrollTop: targetY }, time, 'swing');
        return false;
    });

    // ドロワーメニュー
    $(function() {
        $('.js-hamburger').click(function() {
            $(this).toggleClass('active')

            if ($(this).hasClass('active')) {
                $('.js-globalMenuSp').addClass('active')
            } else {
                $('.js-globalMenuSp').removeClass('active')
            }
        })
    })

    // ページ内リンクに飛ぶ時にリンククリックしたらハンバーガーメニューが閉じるように
    $('#menu a[href]').on('click', function(event) {
        $('.js-hamburger').trigger('click')
    });

    // 背景をクリックしたらハンバーガーメニューを閉じる
    $('.drawer-menu__background').on('click', function(event) {
        $('.js-hamburger').trigger('click')
    });

    // PCサイズにしたときにドロワーメニューを閉じる
    $(window).resize(function() {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.js-hamburger').removeClass('active')
            $('.js-globalMenuSp').removeClass('active')
        }
    });


    // ---------------
    // GSAP
    // ---------------

    window.addEventListener('load', revealAnim);

    function revealAnim() {
        const TLTOP = gsap.timeline();

        // メインビューのアニメーション
        TLTOP
            .from('.mv__main', {
                autoAlpha: 0,
                y: 50,
                delay: 0.2,
            })
            .from('.mv__lead', {
                autoAlpha: 0,
                y: 50,
            }, '-=0.2')
            .from('.header__logo', {
                autoAlpha: 0,
                y: 50,
            }, '-=0.2')
            .from('.header__btn', {
                autoAlpha: 0,
                y: 50,
            }, '<')
            .from('.header__item', {
                autoAlpha: 0,
                y: 50,
                duration: 0.4,
                stagger: 0.1,
            }, '-=0.2')
    };

    gsap.from('.problem__item', {
        autoAlpha: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".problem__items",
            start: "top 80%",
        }
    });

    $(".title--left .title__en").css("width", 0);
    $(".js-fade").css("opacity", 0);

    ScrollTrigger.batch(".title--left .title__en", {
        onEnter: (elements, triggers) => {
            gsap.set(elements, {
                width: 0,
            });
            gsap.to(elements, {
                width: '100%',
                duration: 1,
            });
        },
        start: "top 80%",
        once: true,
    });


    ScrollTrigger.batch(".js-fade", {
        onEnter: (elements, triggers) => {
            gsap.set(elements, {
                autoAlpha: 0,
                y: 50,
            });
            gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
            });
        },
        start: "top 80%",
        once: true,
    });
});