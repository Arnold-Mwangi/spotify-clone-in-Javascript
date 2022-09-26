var songs=["songs/1da Banton - No Wahala (Official Video).mp3", "songs/Davido, Focalistic - Champion Sound (Official Video).mp3", 
"songs/Goya Menor & Nektunez – Ameno Amapiano Remix (You Wanna Bamba) _Official Video_.mp3", "songs/FAVE - My baby bad my baby good (Baby Riddim) (Lyrics).mp3","songs/BURUKLYN BOYZ - DRILL FR 4 (REMIX) ft. CENTRAL CEE, GAZO, WAKADINALI, DUTCHAVELLI, LUCIANO, NATTY.mp3","songs/Omah Lay - Lo Lo (Official Video).mp3","songs/Patoranking - Abule (Official Video).mp3","songs/OXLADE - AWAY.mp3", "songs/Timaya - Cold Outside feat. Buju (Official Video).mp3"];
var titles =["1da Banton - No Wahala (Official Video)", "Davido, Focalistic - Champion Sound (Official Video)",
"Goya Menor & Nektunez – Ameno Amapiano Remix (You Wanna Bamba) _Official Video_", "FAVE - My baby bad my baby good (Baby Riddim) (Lyrics)","BURUKLYN BOYZ - DRILL FR 4 (REMIX) ft. CENTRAL CEE, GAZO, WAKADINALI, DUTCHAVELLI, LUCIANO, NATTY", "Omah Lay - Lo Lo (Official Video)","Patoranking - Abule (Official Video)","OXLADE - AWAY","Timaya - Cold Outside feat. Buju (Official Video)"];
var thumbnails = ["thumbnail/no wahala.PNG", "thumbnail/Davido focalist.PNG","thumbnail/Goya Menor.PNG", "thumbnail/Fave my Baby.PNG", "thumbnail/Brookyn Boyz Drill.PNG", "thumbnail/Lo lo Omalay.PNG", "thumbnail/Patoranking Abule.PNG", "thumbnail/oxlade Away.PNG", "thumbnail/cold timaya.PNG"];
var songTitle= document.getElementById("songTitle");
 var song = new Audio();
 var currentSong=0;
 songTitle.textContext= titles[currentSong];
 
 var seekBar=document.getElementById("seekBar");
 let mouseDownOnSlider = false;
 song.addEventListener("loadeddata", ()=> {
    seekBar.value=0;
 });
 song.addEventListener("timeupdate", () => {
    if(!mouseDownOnSlider){
        seekBar.value = song.currentTime/song.duration * 100;
    }
 });
 seekBar.addEventListener("change", () => {
    const pct = seekBar.value/100;
    song.currentTime = (song.duration || 0) * pct;
 });
 seekBar.addEventListener("mousedown", () =>{
    mouseDownOnSlider=true;
 });
 seekBar.addEventListener("mouseup", () =>{
    mouseDownOnSlider=false;
 });

 //play song
 function playSong(){
    song.src=songs[currentSong];
    songTitle.textContent=titles[currentSong];
    
    song.play();
    $("#play img").attr("src", "/thumbnail/pause.png");
    //go to next
    song.addEventListener('ended', ()=>{
        currentSong++;
       
        if(currentSong === songs.length -1){
            currentSong = 0;
            return;

        }
        playSong();
        $("#play img").attr("src", "/thumbnail/pause.png");
    });
  
 }
 //play||pause song
 function playOrPauseSong(){
    if(song.paused){
        song.play();
        $("#play img").attr("src", "/thumbnail/pause.png");

    }
    else{
       
        song.pause();
        $("#play img").attr("src", "/thumbnail/play.png");


    }
   
 }
 //jump to next song
 function next(){
    currentSong++;
    if(currentSong > songs.length-1){
        currentSong=0;

    }
    playSong();
    $("#player1 img").attr("src", thumbnails[currentSong]);
    songTitlePosition();
 }
///previous songs
function previous(){
    currentSong--;
    if(currentSong <= songs.length ){
        currentSong=songs.length - 1;
    }
    playSong();
    $("#play img").attr("src", "/thumbnail/pause.png");
    $("#player1 img").attr("src", thumbnails[currentSong]);
    $("#bg img").attr("src", thumbnails[currentSong]);
}

// display songs
var text="";
titles.forEach(displaySongs);
document.getElementById("song-list").innerHTML=text;

function displaySongs(value, index, array){   
    text ="<p class='songlist'> <div >" + text + "<button id='play' class='next' onclick='next()'>Play</button>" + value + "</p>" + "<div><br>";
}
//play song on load
function onload(){
    next();
    playSong();
    song.play();
}
//volume slider
let slider=document.getElementById("volume");
slider.min = 0;
slider.max = 100
slider.oninput = function(){
    song.volume = slider.value/100
}
//song title position
function songTitlePosition(){
const position = document.querySelector(".songTitle");
position.style="transform:translate(0%);";
}