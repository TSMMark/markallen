var $body = markallen.$body
  , $window = markallen.$window
  , $continueSection = $(".continue-section")
  , $continueBtn = $continueSection.find(".continue-btn")
  , $sections = $(".main-section")
  , $fadeables = $(".section-header, .section-content")
  , scrollDuration = 1600
  , fadeDuration = 400
  , panelSnap
  , lastScrollTop
  ;

var fadeOut
  , fadeIn
  , fadeOutContinueSection
  , fadeInContinueSection
  ;

fadeOut = function () {
  $fadeables.stop(true, true).fadeOut(fadeDuration);
}

fadeIn = function () {
  $fadeables.stop(true, true).fadeIn(fadeDuration);
}

fadeOutContinueSection = function () {
  $continueSection.
    stop(true, true).
    animate({bottom: "-200px", opacity: 0}, fadeDuration);
}

fadeInContinueSection = function () {
  $continueSection.
    stop(true, true).
    animate({bottom: "0px", opacity: 1}, fadeDuration * 4);
}

$continueBtn.click(function (e) {
  e.preventDefault();
  fadeOut();
  fadeOutContinueSection();
});

panelSnap = $body.panelSnap({
  slideSpeed: scrollDuration
});

// $body.on("panelsnap:finish", function (event) {
$body.on("panelsnap:finish", function (event) {
  fadeIn();
  setTimeout(function () {
    fadeInContinueSection();
  }, 10);
});

$continueBtn.on("click", function (event) {
  event.preventDefault();
  panelSnap.snapTo("next");
});

$window.on("scrollstart", function () {
  var scrollTop = $window.scrollTop();

  if (Math.abs(lastScrollTop - scrollTop) < 10) {
    return;
  }

  lastScrollTop = scrollTop

  fadeOutContinueSection();
});

fadeIn();
fadeInContinueSection();
