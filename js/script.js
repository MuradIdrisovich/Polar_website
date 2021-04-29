// $(document).ready(function(){

//   $('.carousel__inner').slick({
//     // dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     // centerMode: true,
//     // variableWidth: true
//     prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
//     nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
//     responsive: [
//       {
//         breakpoint: 1100,
//         settings: {
//           arrows: false,
//           // slidesToShow: 2,
//           speed: 300,
//           // slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       }]
//   });
// });


const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  mouseDrag: true,
  nav: false,
  controls: false,
  responsive: [
    {
        breakpoint: 992,
        settings: {
            dots: true,
            arrows: false
        }
    }
]
  // controlsText: [
  //   '<img src="icons/left.png">',
  //   '<img src="icons/right.png">'
  // ]
});

document.querySelector('.prev').onclick = function () {
  slider.goTo('prev');
};
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});


$(document).ready(function(){

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // $('.catalog__item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog__item__face').eq(i).toggleClass('catalog__item__face_active');
  //     $('.catalog__item__back').eq(i).toggleClass('catalog__item__back_active');
  //   })
  // })

  // $('.catalog__item__goback').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog__item__face').eq(i).toggleClass('catalog__item__face_active');
  //     $('.catalog__item__back').eq(i).toggleClass('catalog__item__back_active');
  //   })
  // })

  function myToggler(myClass) {
    $(myClass).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__item__face').eq(i).toggleClass('catalog__item__face_active');
        $('.catalog__item__back').eq(i).toggleClass('catalog__item__back_active');
      })
    })
  }

  myToggler('.catalog__item__link');
  myToggler('.catalog__item__goback');

  // Modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  // $('.catalog__item__button').on('click', function(){
  //   $('.overlay, #order').fadeIn();
  // })

  $('.catalog__item__button').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__subheader').text($('.catalog__item__header').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  })

  // $('#consultation form').validate();
  // $('#order form').validate();
  // $('#consultation-form ').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 2
  //     },
  //     phone: 'required',
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages: {
  //     name: {
  //       required: 'Введите имя',
  //       minlength: jQuery.validator.format("Требуется мин. {0} символов")
  //     },

  //     phone: 'Введите номер телефона',
  //     email: {
  //       required: "Введите почтовый адрес",
  //       email: "Ваш адрес должен быть в в формате name@gmail.com"
  //     }
  //   }
  // });

  function validateForm(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'Введите имя',
          minlength: jQuery.validator.format("Требуется мин. {0} символов")
        },
  
        phone: 'Введите номер телефона',
        email: {
          required: "Введите почтовый адрес",
          email: "Ваш адрес должен быть в в формате name@gmail.com"
        }
      }
    });
  };

  validateForm('#consultation form');
  validateForm('#order form');
  validateForm('#consultation-form');

  $("input[name=phone]").mask("+7(999) 999-9999");

  // Smooth scroll and pageup

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });


  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"0px"});
    return false;
  });

  // openServer test 

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function(){
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false; 
  });
   
  

}); 

new WOW().init();

