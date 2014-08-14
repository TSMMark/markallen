var $window = markallen.$window
  , $document = markallen.$document
  , $body = markallen.$body
  , framesCount = 80
  , frameEveryPx = 24
  , $images = []
  , $currentImage
  , currentframe
  , invertFrames = true
  , loadedImagesCount = 0
  , $progressSection = $("#progress-section")
  , $progressBar = $progressSection.find("#progress-bar")
  ;

var _onScroll
  , getFramePath
  , cssURI
  , preloadImages
  , applyBackground
  , progress
  , imageLoaded
  , hideLoader
  , updateProgressBar
  ;

hideLoader = function () {
  $progressSection.fadeOut(800);
  $(".main-section, .bg-img, .continue-section").fadeIn(800);
}

updateProgressBar = function (percentageLoaded) {
  $progressBar.css({width: percentageLoaded + "%"});
}

imageLoaded = function () {
  loadedImagesCount += 1;
  progress();
}

progress = function () {
  var percentageLoaded = parseFloat(loadedImagesCount) / parseFloat(framesCount) * 100.0
    , complete = loadedImagesCount === framesCount
    ;

  console.log(percentageLoaded, complete);
  updateProgressBar(percentageLoaded);
  if (complete) {
    hideLoader();
  }
}

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
      appendTo($body).
      on("load", imageLoaded));
  }
}

getFramePath = function (i) {
  return "/assets/bg/bg_" + (i + 1) + ".png";
}

cssURI = function (uri) {
  return "url(\"" + uri + "\")";
}

applyBackground = function (i) {
  if (invertFrames) {
    i = framesCount - i - 1;
  }
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
