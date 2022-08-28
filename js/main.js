$(document).ready(function () {

    var menuBtn = $(".menu-btn"),
        menu = $(".menu-list"),
        menuLinks = $(".menu-link,.footer-link"),
        btnAnchorLinks = $('.btn-anchor'),
        header = $('.header-wrap'),
        lastId,
        headerHeight = header.outerHeight(),
        getConsultForm = $('#get-consult-form'),
        popupMessage = $('.popup-message')

    /* функция отвечает за удаление ошибок валидации и отображение попапа */
    getConsultForm.on("submit", function (event) {
        event.preventDefault();
        $('.get-consult-label').removeClass('error');
        let form = $(this);
        var data = $(this).serialize();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: data,
            error: function (error) {
                showPopupMessage();
                form.find('.input').val('');
            }
        });
    });

    function showPopupMessage() {
        popupMessage.addClass('model-open');
    }

    $('.close-message, .bg-overlay').click(function () {
        $('.custom-model-main').removeClass('model-open');
    });

    /* функции отвечают за плавный скролл */
    var scrollItems = menuLinks.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    menuBtn.on("click", function () {
        $(this).toggleClass("btn-active")
        menu.toggleClass("active");
        if (window.innerWidth <= 1100) {
            $('.menu-item').removeClass("menu-item-active");
        }
    });


    function anchorLinkClick(context) {
        var href = context.attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - headerHeight + 3;

        $("html, body").stop().animate({
            scrollTop: offsetTop
        }, 850);
    }

    menuLinks.on('click', function (e) {
        e.preventDefault();
        anchorLinkClick($(this));
        if (window.innerWidth <= 1100) {
            menu.toggleClass("active");
            $('.menu-btn').removeClass('btn-active');
        }
    });

    btnAnchorLinks.on('click', function (e) {
        e.preventDefault();
        anchorLinkClick($(this));
    });

    $(window).scroll(function () {
        var endScroll = $(window).scrollTop() + $(window).height() >= $(document).height();
        var fromTop = $(this).scrollTop() + headerHeight;

        var current = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        current = current[current.length - 1];
        var id = current && current.length ? current[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuLinks
                .parent().removeClass("menu-item-active")
                .end().filter('[href="#' + id + '"]').parent().addClass("menu-item-active");
        }

    });

    /* функция отвечает за слайдер с отзывами */
    $('.reviews-mob').slick({
        infinite: false,
        slidesToShow: 1.24,
        slidesToScroll: 1
    });

    let reviewsMasonry = new Masonry('.reviews-content', {
        itemSelector: '.reviews-item',
        horizontalOrder: true,
        gutter: 20,
        fitWidth: true,
        columnWidth: '.reviews-size',
    });

    /* функция отвечает за отображения списка в блоке "Этапы работы" */
    $('.stages-item').on('click', function (e) {
        if ($(this).hasClass('show')) {
            $(this).removeClass('show');
            $(this).addClass('hide');
        } else {
            $(this).removeClass('hide');
            $(this).addClass('show');
        }
    });
    if (screen.width < 681) {
        $('.services-item').on('click', function (e) {
            if ($(this).hasClass('show-service')) {
                $(this).removeClass('show-service');
                $(this).addClass('hide-service');
            } else {
                $(this).removeClass('hide-service');
                $(this).addClass('show-service');
            }
        });
    }
    if (screen.width < 1025) {
        $('.btn-small').on('click', (function () {
            $(this).addClass('hover-small');
            setTimeout("jQuery('.btn-small').removeClass('hover-small')", 500);
        }));
        $('.btn-big').on('click', (function () {
            $(this).addClass('hover-big');
            setTimeout("jQuery('.btn-big').removeClass('hover-big')", 500);
        }));
    }
});
