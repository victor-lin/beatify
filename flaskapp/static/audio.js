// Create the audio context
//var context = new AudioContext();

// If you're using Safari, you'll need to use this line instead
var context = new webkitAudioContext();


var request = new XMLHttpRequest();
 
request.open('GET', 'static/tmp/Hotline_Bling.mp3', true);
request.responseType = 'arraybuffer';
 
request.onload = function () {
    var undecodedAudio = request.response;
 
    context.decodeAudioData(undecodedAudio, function (buffer) {
        // The contents of our mp3 is now an AudioBuffer
        console.log(buffer);
    });
};
 
request.send();

// Function to identify peaks
function getPeaksAtThreshold(data, threshold) {
  var peaksArray = [];
  var length = data.length;
  for(var i = 0; i < length;) {
    if (data[i] > threshold) {
      peaksArray.push(i);
      // Skip forward ~ 1/4s to get past this peak.
      i += 10000;
    }
    i++;
  }
  return peaksArray;
}