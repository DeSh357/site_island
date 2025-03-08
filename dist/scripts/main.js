$(document).ready(function () {
    let wow = new WOW({
        boxClass:     'wow',
        animateClass: 'animate__animated',
        offset:       200,
        mobile:       true,
        live:         true
    })
    wow.init();

    new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        width: '100%',
        height: '100%',
    }).mount();

    new Splide('.splide.splide2', {
        type: 'loop',
        perPage: 1,
        width: '100%',
        height: '100%',
    }).mount();

    new Splide('.splide.splide3', {
        type: 'loop',
        perPage: 1,
        width: '100%',
        height: '100%',
    }).mount();

    const phoneInput = document.getElementById('phone');
    const maskOptions = {
        mask: '+{7}(000) 000-00-00'
    };
    const mask = IMask(phoneInput, maskOptions);

    let name = $(".form-input.name");
    let phone = $(".form-input.phone");
    let radioInputs = $(".radio-inputs input[type=radio]");
    let count = $(".day-count");
    let sliderCount = 7;
    let programImages = $(".program .slide-images");
    let commentImages = $(".comments .slide-images");
    let commentCount = 1;

    $(".menu-item").click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        if ($.browser.safari) {
            $('body').animate({ scrollTop: destination }, 1100); //1100 - скорость
        } else {
            $('html').animate({ scrollTop: destination }, 1100);
        }
        return false;
    })

    let gallerySlide = $(".gallery-slide-photo");
    for (let i = 0; i < gallerySlide.length; i++) {
        gallerySlide.eq(i).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            image: {
                verticalFit: true
            },
        });
    }

    $(".play").click(function () {
        $(".image").animate({ opacity: 0 },)
        setTimeout(function () {
            $(".image").hide()
        }, 600)
    })

    $(".burger > a").click(function () {
        $(".sub-menu").css("display", 'flex');
    })

    $(".sub-menu li a").click(function () {
        $(".sub-menu").hide();
    })

    $(".program-next").click(function () {
        let current = parseInt(count.text());
        count.text(current % sliderCount + 1);
        let nextImage = 'url(\"../images/slide' + (current % sliderCount + 1) + '.png\")';
        programImages.css('background-image', nextImage);

    })

    $(".program-prev").click(function () {
        let current = parseInt(count.text());
        let prevImage;
        if (current === 1) {
            count.text(sliderCount);
            prevImage = 'url(\"../images/slide' + sliderCount + '.png\")';
        } else {
            count.text(current - 1);
            prevImage = 'url(\"../images/slide' + (current - 1) + '.png\")';
        }
        programImages.css('background-image', prevImage);
    })

    $(".comments .splide__arrow--next").click(function () {
        let current = commentCount;
        commentCount = current % 5 + 1;
        let nextImage = 'url(\"../images/comment' + (current % 5 + 1) + '.png\")';
        commentImages.css('background-image', nextImage);
    })

    $(".comments .splide__arrow--prev").click(function () {
        let current = commentCount;
        let prevImage;
        if (current === 1) {
            commentCount = 5;
            prevImage = 'url(\"../images/comment' + 5 + '.png\")';
        } else {
            commentCount--;
            prevImage = 'url(\"../images/comment' + (current - 1) + '.png\")';
        }
        commentImages.css('background-image', prevImage);
    })

    $(".form-btn").click(function () {
        let hasError = false;
        $(".error-input").hide();
        $(".form-input").css("border-color", 'white');
        let peopleCount;
        radioInputs.each(function() {
            if ($(this).prop("checked")) {
                peopleCount = $(this).val();
            }
        });

        let valueName = name.val();
        let valuePhone = phone.val();

        if (!valueName) {
            name.next().show();
            name.css('border-color', "#e78209")
            hasError = true;
        }
        if (!valuePhone) {
            phone.next().show();
            phone.css('border-color', "#e78209")
            hasError = true;
        }
        if (hasError) {
            return false;
        }

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: valueName, phone: valuePhone, count: peopleCount}
        })
            .done(function( msg ) {
                if (msg.success === 1) {
                    $(".form-main").addClass("animate__animated animate__fadeOutRight");
                    setTimeout(function () {
                        $(".form-main").hide();
                        $(".form-complete").css("display", "flex").addClass("animate__animated animate__fadeInLeftBig");
                    }, 700);

                } else {
                    alert("Ошибка! Кажется вы ввели неверные данные(");
                }
            });
    })

})

