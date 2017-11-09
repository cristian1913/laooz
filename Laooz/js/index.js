$(document).ready(function() {

  $(window).scroll(function() {

    var scroll = $(this).scrollTop(),
      header = $("header"),
      detay = $(".detay");

    if (scroll > 90) {
      header.css({
        "height": "60px",
        "background": "#f5f7fa"
      });

      $(".logo").css({
        "line-height": "60px",
        "color": "black"
      });

      detay.css({
        "position": "fixed",
        "top": "8px",
        "left": "calc(100vw - (850px)/2)",
        "background": "none",
        "border": "none"
      });

      $("ul").slideUp();
    } else {
      header.css({
        "height": "90px",
        "background": "#021c1e"
      });

      $(".logo").css({
        "line-height": "90px",
        "color": "#6fb98f"
      });

      detay.css({
        "position": "inherit",
        "background": "#f5f7fa",
        "border": "1px solid #aaa"
      });

      $("ul").slideDown();
    }
  });

});

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
