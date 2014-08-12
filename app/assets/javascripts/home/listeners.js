var $body = markallen.$body
  , $continueBtns = $(".continue-btn")
  , $sections = $(".main-section")
  , $fadeables = $sections.find(".section-header, .continue-section, .section-content")
  , scrollDuration = 1600
  , fadeDuration = 400
  ;

var fadeOut
  , fadeIn
  ;

fadeOut = function () {
  $fadeables.stop(true, false).fadeOut(fadeDuration);
}

fadeIn = function () {
  $fadeables.stop(true, false).fadeIn(fadeDuration);
}

$continueBtns.click(function (e) {
  e.preventDefault();
  fadeOut();
  setTimeout(fadeIn, scrollDuration / 1.5)
});

$body.panelSnap({
  slideSpeed: scrollDuration,
  $menu: $sections,
  menuSelector: ".continue-btn"
});
