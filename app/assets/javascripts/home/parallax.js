var $window = markallen.$window
  , $body = markallen.$body
  , framesCount = 80
  , frameEveryPx = 30
  , $images = []
  , $currentImage
  , currentframe
  ;

var _onScroll
  , getFramePath
  , cssURI
  , preloadImages
  , applyBackground
  ;

preloadImages = function () {
  var i
    , imgClass = "bg-img"
    , url;

  for(i = 0; i < framesCount; i += 1) {
    url = getFramePath(i);
    $images.push($("<img />").
      attr({
        "src": url,
        "id": "bg-img-" + i,
        "class": imgClass
      }).
      appendTo($body));
  }
}

getFramePath = function (i) {
  return "/assets/bg/bg_" + (i + 1) + ".png";
}

cssURI = function (uri) {
  return "url(\"" + uri + "\")";
}

applyBackground = function (i) {
  if (i === currentframe) {
    return;
  }
  currentframe = i;

  $currentImage && $currentImage.removeClass("visible");

  $currentImage = $images[i];
  $currentImage.addClass("visible");
}

_onScroll = function () {
  var scrollTop = $window.scrollTop()
    , frameOffset = parseInt(scrollTop / frameEveryPx)
    , currentFrameNumber = (frameOffset + framesCount) % framesCount
    ;

  applyBackground(currentFrameNumber)
}

preloadImages();

$window.scroll(_onScroll);
_onScroll();
