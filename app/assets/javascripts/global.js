var $window = $(window)
  , $document = $(document)
  , $body = $("body:first")
  , $mainContent = $("#main-content:first")
  ;

window.markallen = {
  "$window": $window,
  "$document": $document,
  "$body": $body,
  "$mainContent": $mainContent
}

markallen.scrollTo = function($el, speed, options) {
  if (speed === undefined) {
    speed = 400;
  }
  if (options === undefined) {
    options = {};
  }

  $window.one("mousedown DOMMouseScroll mousewheel keyup", function (e) {
    $body.stop(true, false);
    options.onInterrupt && options.onInterrupt(e);
  });

  return $body.animate({
    scrollTop: $($el).offset().top,
    complete: options.onComplete
  }, speed, options.easing);
}
