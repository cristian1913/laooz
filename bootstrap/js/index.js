var $item = $('.carousel .item'); 
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});

$('.carousel').carousel({
  interval: 6000,
  pause: "false"
});

$(document).ready(function () {
  $(".gallery-img").click(function(){
    var t = $(this).attr("src");
    $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
    $("#myModal").modal();
  });
}); 

$(document).ready(function(){
  
  // Lift card and show stats on Mouseover
  $('#product-card').hover(function(){
      $(this).addClass('animate');
      $('div.carouselNext, div.carouselPrev').addClass('visible');      
     }, function(){
      $(this).removeClass('animate');     
      $('div.carouselNext, div.carouselPrev').removeClass('visible');
  }); 
  
  // Flip card to the back side
  $('#view_details').click(function(){    
    $('div.carouselNext, div.carouselPrev').removeClass('visible');
    $('#product-card').addClass('flip-10');
    setTimeout(function(){
      $('#product-card').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
        $('#product-front, #product-front div.shadow').hide();      
      });
    }, 50);
    
    setTimeout(function(){
      $('#product-card').removeClass('flip90').addClass('flip190');
      $('#product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
      setTimeout(function(){        
        $('#product-card').removeClass('flip190').addClass('flip180').find('div.shadow').hide();            
        setTimeout(function(){
          $('#product-card').css('transition', '100ms ease-out');     
          $('#cx, #cy').addClass('s1');
          setTimeout(function(){$('#cx, #cy').addClass('s2');}, 100);
          setTimeout(function(){$('#cx, #cy').addClass('s3');}, 200);       
          $('div.carouselNext, div.carouselPrev').addClass('visible');        
        }, 100);
      }, 100);      
    }, 150);      
  });     
  
  // Flip card back to the front side
  $('#flip-back').click(function(){   
    
    $('#product-card').removeClass('flip180').addClass('flip190');
    setTimeout(function(){
      $('#product-card').removeClass('flip190').addClass('flip90');
  
      $('#product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
        $('#product-back, #product-back div.shadow').hide();
        $('#product-front, #product-front div.shadow').show();
      });
    }, 50);
    
    setTimeout(function(){
      $('#product-card').removeClass('flip90').addClass('flip-10');
      $('#product-front div.shadow').show().fadeTo( 100 , 0);
      setTimeout(function(){            
        $('#product-front div.shadow').hide();
        $('#product-card').removeClass('flip-10').css('transition', '100ms ease-out');    
        $('#cx, #cy').removeClass('s1 s2 s3');      
      }, 100);      
    }, 150);      
    
  }); 

  
  /* ----  Image Gallery Carousel   ---- */
  
  var carousel = $('#carousel ul');
  var carouselSlideWidth = 335;
  var carouselWidth = 0;  
  var isAnimating = false;
  
  // building the width of the casousel
  $('#carousel li').each(function(){
    carouselWidth += carouselSlideWidth;
  });
  $(carousel).css('width', carouselWidth);
  
  // Load Next Image
  $('div.carouselNext').on('click', function(){
    var currentLeft = Math.abs(parseInt($(carousel).css("left")));
    var newLeft = currentLeft + carouselSlideWidth;
    if(newLeft == carouselWidth || isAnimating === true){return;}
    $('#carousel ul').css({'left': "-" + newLeft + "px",
                 "transition": "300ms ease-out"
               });
    isAnimating = true;
    setTimeout(function(){isAnimating = false;}, 300);      
  });
  
  // Load Previous Image
  $('div.carouselPrev').on('click', function(){
    var currentLeft = Math.abs(parseInt($(carousel).css("left")));
    var newLeft = currentLeft - carouselSlideWidth;
    if(newLeft < 0  || isAnimating === true){return;}
    $('#carousel ul').css({'left': "-" + newLeft + "px",
                 "transition": "300ms ease-out"
               });
      isAnimating = true;
    setTimeout(function(){isAnimating = false;}, 300);      
  });
});






$(document).ready(function(){
// invoke the carousel
    $('#myCarousel').carousel({
      interval:6000
    });

// scroll slides on mouse scroll 
$('#myCarousel').bind('mousewheel DOMMouseScroll', function(e){

        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            $(this).carousel('prev');
      
      
        }
        else{
            $(this).carousel('next');
      
        }
    });

//scroll slides on swipe for touch enabled devices 

  $("#myCarousel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
      $(this).one("touchmove", function(event){

        var yMove = event.originalEvent.touches[0].pageY;
        if( Math.floor(yClick - yMove) > 1 ){
            $(".carousel").carousel('next');
        }
        else if( Math.floor(yClick - yMove) < -1 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});
    
});
//animated  carousel start
$(document).ready(function(){

//to add  start animation on load for first slide 
$(function(){
    $.fn.extend({
      animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass(animationName);
        });
      }
    });
       $('.item1.active img').animateCss('slideInDown');
       $('.item1.active h2').animateCss('zoomIn');
       $('.item1.active p').animateCss('fadeIn');
       
});
  
//to start animation on  mousescroll , click and swipe


 
     $("#myCarousel").on('slide.bs.carousel', function () {
    $.fn.extend({
      animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass(animationName);
        });
      }
    });
  
// add animation type  from animate.css on the element which you want to animate

    $('.item1 img').animateCss('slideInDown');
    $('.item1 h2').animateCss('zoomIn');
    $('.item1 p').animateCss('fadeIn');
    
    $('.item2 img').animateCss('zoomIn');
    $('.item2 h2').animateCss('swing');
    $('.item2 p').animateCss('fadeIn');
    
    $('.item3 img').animateCss('fadeInLeft');
    $('.item3 h2').animateCss('fadeInDown');
    $('.item3 p').animateCss('fadeIn');
    });
});









