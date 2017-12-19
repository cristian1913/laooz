// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});

/**********************/
/*	Client carousel   */
/**********************/
$('.carousel-client').bxSlider({
  auto: true,
    slideWidth: 234,
    minSlides: 2,
    maxSlides: 5,
    controls: false
});


$(function() {

  var w = $(window).width(),
    h = $(window).height();
  //$('section').width(w);
  $('section').height(h);
  $('menu .container').height(h - 60);
  $('body').prepend('<div id="overlay">');

  $('#menu').click(function() {$('html').addClass('active');});
  $('#close-menu').click(function() {$('html').removeClass('active');});
  $('#overlay').click(function() {$('html').removeClass('active');});
  $(window).resize(function() {
    var w = $(window).width(),
      h = $(window).height();
    //$('section').width(w);
    $('section').height(h);
    $('menu .container').height(h - 60);
  });

});


/* Demo purposes only */
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);

/* Demo purposes only */
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);