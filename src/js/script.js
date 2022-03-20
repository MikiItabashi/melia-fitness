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

    // $(".js-left").css("opacity", 0);
    var textWrap = document.querySelectorAll('.campaign__title');
    textWrap.forEach((t) => (
        t.innerHTML = t.textContent.replace(/\S/g, '<span>$&</span>')
    ));

    gsap.fromTo('.campaign__title span', {
        opacity: 0,
    }, {
        opacity: 1,
        stagger: 0.1,
    });
});