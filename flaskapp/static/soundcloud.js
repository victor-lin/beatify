function loadIt(url){
	xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send();
	return xhttp.responseText;
};


function test() {
    var title = document.getElementById("songTitle").text;

    var songs = loadIt("http://api.soundcloud.com/tracks.json?client_id=8ff288b79b9728b8171a991a955e5c89&q="+title+ "&format=json");

    var ass = JSON.parse(songs);

    for(var i=0; i<ass.length; i++){
    	console.log(ass[i].title);
    }
}

