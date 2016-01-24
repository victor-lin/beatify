/*function playFile(obj) {
  var sound = document.getElementById('sound');
  var reader = new FileReader();
  reader.onload = (function(audio) {return function(e) {audio.src = e.target.result;};})(sound);
  reader.addEventListener('load', function() {
    document.getElementById("sound").play()
  });
  reader.readAsDataURL(obj.files[0]);
}*/

document.getElementById("audio").onchange = function(e) {
	ID3.loadTags(document.getElementById("audio").value, function() {
    var tags = ID3.getAllTags("https://drive.google.com/file/d/0B2t97SMQIY-mc05LS2FoVXVLUE0/view?usp=sharing");
    alert(tags.comment + " - " + tags.track + ", " + tags.lyrics);
},
{tags: ["comment", "track", "lyrics"]});
}

/*function getAlbumArt (url)
{
    var file = url;

    function callback() 
    {
        var pic = ID3.getTag(file, "picture");
        var artist = ID3.getTag(file, "artist");
        var title = ID3.getTag(file, "title");
        var album = ID3.getTag(file, "album");

        console.log(artist);

    };

    ID3.loadTags(url, callback, ["picture", "artist", "title", "album"]);
}*/

function getTags(){

var file="https://drive.google.com/file/d/0B2t97SMQIY-mc05LS2FoVXVLUE0/view?usp=sharing";

	var result = {};

	ID3.loadTags(file.name, function() {

		var tags = ID3.getAllTags(file.name);

		result.artist = tags.artist || "Unknown Artist";
		result.title = tags.title || "Unknown";
		result.album = tags.album || "";


	}, {
		tags: ["artist", "title", "album", "picture"],
		dataReader: FileAPIReader(file)
	});

}