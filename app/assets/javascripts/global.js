window.markallen = {
  "$window": $(window),
  "$body": $("body:first"),
  "$mainContent": $("#main-content:first")
}

markallen.scrollTo = function($el, speed) {
  if (speed === undefined) {
    speed = 400;
  }
  return $("html, body").animate({
    scrollTop: $($el).offset().top
  }, speed);
}
