$(document).ready(function() {
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 1) {
      $("#sp-header").addClass("menu-fixed");
    } else {
      $("#sp-header").removeClass("menu-fixed");
    }
  });
});

/*
Javascript Document
Author: Jacob Scott
Created: 11-12-15
Modified: 11-14-15
*/

var TSN_DELAY = 6; // transition delay in seconds
var TSN_DURATION = 0.5; // transition duration in seconds
var ADD_CONTROLS = true; // add arrow controls
var ADD_INDICATOR = true; // add slide indicator
var AUTO_TSN = true; // auto transition
var SCREEN_WIDTH_BREAKPOINT= 960;
var SLIDE_HEIGHT = 380; // default slide height for screens greater than SCREEN_WIDTH_BREAKPOINT

$(document).ready(function () {
	var slideCount = $('.slide').length;
	var translate = 0;
	var currentSlide = 1;
	var slideWidth = $('.slide-window').width();
	var slideHeight = $('.slide').height();
	var currentDelay = TSN_DELAY + TSN_DURATION;
	var tsnDuration = TSN_DURATION;

	// Selector variables
	var slideIndicator = $('.slide-indicator');
	var slideWindow = $('.slide-window');
	var indicatorDot = $('.slide-indicator > .indicatorDot');
	var slideStrip = $('.slide-strip');
	var slide = $('.slide');

	// Set slide width
	setForScreenWidth();

	// Set slide strip width
	setSlideStripWidth();

	// Set slide strip height
	setHeight();

	// Add Controls
	if (ADD_CONTROLS == true) {
		$('.slider-control').css('display','block');
		sliderCtrlPosition();
	}

	// Add Indicator
	if (ADD_INDICATOR == true) {
		addIndicator();
		positionIndicator();
		changeIndicator(1);
	}

	// Adapt to window resizeing
	$(window).resize(function() {
		slideWidth = slideWindow.width();

		// Reset the slide width
		setForScreenWidth();

		// Reset the slide strip width
		setSlideStripWidth();

		// Set slide strip height
		setHeight();

		if (ADD_CONTROLS == true) {
			// Reposition the slider controls
			sliderCtrlPosition();
		}

		if (ADD_INDICATOR == true) {
			// Reposition the indicator
			positionIndicator();
		}

		// Reset slideshow
		slideStrip.css('transform','translateX(' + 0 + 'px)');
		slideStrip.css('-webkit-transform','translateX(' + 0 + 'px)');
		slideStrip.css('-moz-transform','translateX(' + 0 + 'px)');
		slideStrip.css('-o-transform','translateX(' + 0 + 'px)');
		slideStrip.css('-ms-transform','translateX(' + 0 + 'px)');

		// Move indicator to first slide
		changeIndicator(1);

	});

	// Automatic slide transition
	setInterval(function() {
		// Check if auto transition is still active;
		if (AUTO_TSN == true) {
			// Check if next slide is out of range
			if (currentSlide < slideCount) {
				tsnSlideNext(currentSlide + 1);
			}
			else {
				// Return to slide 1
				tsnSlideNext(1);
			}
		}

		// Log interval change
		console.log('Interval Reached');

	}, (TSN_DELAY + tsnDuration) * 1000);

	// Manual slide transition
	$('#next-slide').click(function() {
		AUTO_TSN = false;
		if (currentSlide < slideCount) {tsnSlideNext(currentSlide + 1);}
		else {tsnSlideNext(1);}
	});
	$('#previous-slide').click(function() {
		AUTO_TSN = false;
		if (currentSlide > 1) {tsnSlidePrevious(currentSlide - 1);}
		else {tsnSlidePrevious(slideCount);}
	});

	// Indicator Click
	$('.slide-indicator > .indicatorDot').click(function() {
		var dotIndex = $('.slide-indicator > .indicatorDot').index(this);

		// Deactivate automatic transition
		AUTO_TSN = false;

		if (dotIndex + 1 > currentSlide) {
			tsnSlideNext(dotIndex + 1);
		}
		else {
			tsnSlidePrevious(dotIndex + 1);
		}

		// log dot index
		console.log('DotNumber: ' + dotIndex);
	});

	/* FUNCTION DEFINITIONS */

	function addIndicator() {
		var indicatorWidth;
		// Add indicator dots to indicator div
		for (var i = 0; i < slideCount; i++) {
			$('.slide-indicator').append('<i title="Slide ' + (i + 1) + '" class="fa fa-circle indicatorDot"></i>');
		}

		// Set indicator width
		indicatorWidth = slideIndicator.width();
		slideIndicator.css('width',indicatorWidth + 'px');

		positionIndicator();
		changeIndicator(1);
	}
	function positionIndicator() {
		// Get dimension variables
		var sliderWindowW = slideWindow.width();
		var sliderWindowH = slideWindow.height();
		var i = slideWindow.offset();
		var sliderWindowY = i.top;
		var posY;
		var posX;
		var indicatorW = slideIndicator.width();

		// Calculate indicator position;
		posX = (sliderWindowW * 0.5) - (indicatorW * 0.5);
		posY = (sliderWindowY + sliderWindowH - 48);

		// Set indicator position
		slideIndicator.css('left', posX + 'px');
		slideIndicator.css('top', posY + 'px');
	}
	function changeIndicator(dotNumber) {
		// Compensate for over count
		if (dotNumber == slideCount + 1) {dotNumber = 1;}
		else if (dotNumber == 0) {dotNumber = slideCount;}

		// Change indicator dot classes
		$('.slide-indicator > .indicatorDot').removeClass('activeSlide');
		$('.slide-indicator > .indicatorDot').eq(dotNumber - 1).addClass('activeSlide');
	}

	// Set slideshow equal to screen width
	function setForScreenWidth() {
	// Get width of screen/window
	var screenWidth = $(window).innerWidth();

	// Set .slide and .slide-window width to screenWidth
	slide.css('width',screenWidth + 'px');
	slideWindow.css('width',screenWidth + 'px');
}

	// Set the width of the .slider-strip
	function setSlideStripWidth() {
		// Get slide width
		slideWidth = slide.width();

		// Get number of slides
		slideCount = slide.length;

		// Calculate and set width of slide strip
		slideStrip.css('width',(slideWidth * slideCount) + 'px');
	}

	// Slide transition
	function tsnSlideNext(gotoSlide) {
		// If next slide number is greater than slide count
		if (gotoSlide  == 1) {
			// Transition delay is multiplied by slide count
			tsnDuration = (TSN_DURATION * 0.5) * slideCount;

			// Set transition delay
			slideStrip.css('transition-duration',tsnDuration + 's');
		}
		else {
			// Reset duration and delay
			tsnDuration = TSN_DURATION;

			slide.css('visible','hidden');

			// Set transition delay
			slideStrip.css('transition-duration',TSN_DURATION + 's');
		}

		// Set translateX for slide-strip
		translate = slideWidth * (gotoSlide - 1);
		slideStrip.css('transform','translateX(' + -translate + 'px)');
		slideStrip.css('-webkit-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-moz-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-o-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-ms-transform','translateX(' + -translate + 'px)');

		// Log slide info
		console.log('Current Slide: ' + gotoSlide + '; Slide Count: ' + slideCount);

		// Current slide is gotoSlide
		currentSlide = gotoSlide;

		// Change indicator
		changeIndicator(currentSlide);
	}
	function tsnSlidePrevious(gotoSlide) {
		// If next slide number is greater than slide count
		if (gotoSlide  == slideCount) {
			// Transition delay is multiplied by slide count
			tsnDuration = (TSN_DURATION * 0.5) * slideCount;

			// Set transition delay
			slideStrip.css('transition-duration',tsnDuration + 's');

			slide.css('visible','visible');
		}
		else {
			// Reset duration and delay
			tsnDuration = TSN_DURATION;

			slide.css('visible','hidden');

			// Set transition delay
			slideStrip.css('transition-duration',TSN_DURATION + 's');
		}

		// Set translateX for slide-strip
		translate = slideWidth * (gotoSlide - 1);
		slideStrip.css('transform','translateX(' + -translate + 'px)');
		slideStrip.css('-webkit-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-moz-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-o-transform','translateX(' + -translate + 'px)');
		slideStrip.css('-ms-transform','translateX(' + -translate + 'px)');

		// Log slide info
		console.log('Current Slide: ' + gotoSlide + '; Slide Count: ' + slideCount);

		// Current slide is gotoSlide
		currentSlide = gotoSlide;

		// Change indicator
		changeIndicator(currentSlide);
	}

	// Set slide-strip height
	function setHeight() {

		// Check for narrow screens
		if ($(window).innerWidth() < SCREEN_WIDTH_BREAKPOINT){
			// Get screen height
			var screenHeight = $(window).innerHeight();

			// Set slide height equal to screenHeight
			slide.css('height',screenHeight + 'px');
		}
		else {
			// Set slide height equal to SLIDE_HEIGHT
			slide.css('height',SLIDE_HEIGHT + 'px');
		}

		// Get slide height
		slideHeight = slide.height();

		// Set .slide-window and .slide-strip height equal to .slide height
		slideStrip.css('height',slideHeight + 'px');
		slideWindow.css('height',slideHeight + 'px');
	}

	// Set position of controls
	function sliderCtrlPosition() {
		// Get dimension variables
		var sliderWindowW = slideWindow.width();
		var sliderWindowH = slideWindow.height();
		var i = slideWindow.offset();
		var sliderWindowY = i.top;
		var controlH = $('.slide-control').height();
		var controlW = $('.slide-control').width();
		var posY;
		var posPrevX;
		var posNextX;
		var controlMargin = 32;

		// Check for narrow screens
		if ($(window).innerWidth() < SCREEN_WIDTH_BREAKPOINT){
			// Decrease controlMargin
			controlMargin = 8;
		}
		else {
			// Set slide height equal to SLIDE_HEIGHT
			slide.css('height',SLIDE_HEIGHT + 'px');
		}

		// Calculate vertical position
		posY = sliderWindowY + ((sliderWindowH * 0.5) - (controlH * 0.5));

		// Set vertical position
		$('.slide-control').css('top', posY + 'px');

		// Calculate Horizontal for #next-slide
		posNextX = sliderWindowW - controlW - controlMargin;

		// Set horizontal position for #next-slide;
		$('#next-slide').css('left', posNextX + 'px');

		// Calculate Horizontal for #previous-slide
		posPrevX = controlMargin;

		// Set horizontal position for #previous-slide;
		$('#previous-slide').css('left', posPrevX + 'px');


	}

});
