var $body = markallen.$body
  , $window = markallen.$window
  , $continueSection = $(".continue-section")
  , $continueBtn = $continueSection.find(".continue-btn")
  , $sections = $(".main-section")
  , $fadeables = $(".section-header, .section-content")
  , scrollDuration = 1600
  , fadeDuration = 400
  , panelSnap
  , lastScrollTop = $window.scrollTop()
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
  $continueSection.addClass("gone");
}

fadeInContinueSection = function () {
  $continueSection.removeClass("gone");
}

$continueBtn.click(function (e) {
  e.preventDefault();
  fadeOut();
  fadeOutContinueSection();
});

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

$window.on("scroll", function () {
  var scrollTop = $window.scrollTop()
    , delta = scrollTop - lastScrollTop
    ;

  if (scrollTop <= 0) {
    $body.trigger("panelsnap:finish");
  }

  if (Math.abs(delta) < 12) {
    return;
  }

  lastScrollTop = scrollTop

  fadeOutContinueSection();
});

panelSnap = $body.panelSnap({
  slideSpeed: scrollDuration
});

fadeIn();
fadeInContinueSection();
