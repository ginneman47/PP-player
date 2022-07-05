//variables initialization
var index=0;
var isPlaying = false;

var songChangePath="songs/shotsfired.mp3";
var songsNameList=["le castle vania - Shots Fired" , "Don Omar Danzo Kuduro - remix" , "Legend-Tevvez" , "Hey there Delilah - xQc remix", "Assassins Creed - Forli theme", "The vekkars Flashbang dance" , "Magic In The air - Magic System" ,"After Dark - slowed and reverb","Otnicka Gustavo remix","Killaheadz - Lettin go"];
var songsFilePath=[ "songs/shotsfired.mp3","songs/Don omar remix.mp3", "songs/Legend-Tevvez.mp3" , "songs/xqc Hey_There_Delilah_Remix.mp3", "songs/forli theme.mp3", "songs/flashbang dance.mp3" , "songs/magicsystem.mp3","songs/afterdark.mp3","songs/gustavo remix.mp3","songs/lettin go.mp3"];
var songsBannerPath=["images/le castle vania shots fired.jpg" , "images/danza kuduro.png" , "images/tevvez legend.png", "images/hey there delilah.png" , "images/salvation forli.png" , "images/flashbang dance.png" , "images/magic in the air.png","images/after dark.png","images/otnicka gustavo remix.png","images/killaheadz lettin go.png"];

var navGif = document.querySelector(".catJam");
navGif.style.opacity = "0";
var mainSongName = document.querySelector(".song-name");
var mainImage = document.querySelector(".current-image");
var minutes = document.querySelector(".minutes");
var seconds = document.querySelector(".seconds");
var myTrackBar = document.querySelector("#mytrackbar");
var mainAudio = new Audio(songChangePath);
var mainPlayButton = document.querySelector(".play-button");
var prevSong = document.querySelector(".backwards");
var nextSong = document.querySelector(".forwards");

//icon icon change variables
var playButton = document.querySelector(".fa-circle-play");


//setting up the songs list songs names and images- (will set duration and artist name later later)
var songsNameChange = document.querySelectorAll(".song-name-text");
var songsImageChange = document.querySelectorAll(".songs-bar-image-banner");

//songsListButtons
var playIconList = document.querySelectorAll("#play-icon");



for(var i=0; i<songsNameList.length; i++){
  songsNameChange[i].textContent =songsNameList[i];
  songsImageChange[i].setAttribute("src",songsBannerPath[i]);
}

//adding eventListeners for main play button
mainPlayButton.addEventListener("click",function (){
          if(isPlaying === false){
            mainAudio.play();
            isPlaying=true;
            playButton.classList.remove("fa-circle-play");
            playButton.classList.add("fa-circle-pause");
            navGif.style.opacity ="1";
            navGif.style.transition ="opacity 0.4s";
          }
          else{
            mainAudio.pause();
            isPlaying = false;
            playButton.classList.remove("fa-circle-pause");
            playButton.classList.add("fa-circle-play");
            navGif.style.opacity = "0";
            navGif.style.transition ="opacity 0.4s";
          }
});

//updation mytrackbar by adding timeupdate event listener to myAudio
mainAudio.addEventListener("timeupdate",function(){
var currTime = parseFloat(this.currentTime);
var currTime2 = parseInt(this.currentTime);
var totalTime = parseFloat(this.duration);
myTrackBar.value = (currTime/totalTime)*100;
var minutesNow = Math.floor(currTime2/60);
var secondsNow = currTime2%60;
minutes.textContent = minutesNow;
if(secondsNow<10){
  seconds.textContent = "0"+secondsNow;
}
else{
  seconds.textContent = secondsNow;
}

 });

 //adding click event listener to mytrackbar
 myTrackBar.addEventListener("click",function (){
   mainAudio.currentTime = (this.value * mainAudio.duration)/100;
 });

//adding eventlisteners to previous and next buttons
prevSong.addEventListener("click",function (){
  navGif.style.opacity = "0";
  navGif.style.transition ="opacity 0.4s";
  if(index<0){
    return;

  }
  else{

  index =index-1;
  isPlaying = false;
  playButton.classList.remove("fa-circle-pause");
  playButton.classList.add("fa-circle-play");
  mainSongName.innerText = songsNameList[index];
  mainImage.setAttribute("src",songsBannerPath[index]);
  mainAudio.currentTime =0;
  setTrackBar();
  mainAudio.src = songsFilePath[index];
  }
});

nextSong.addEventListener("click",function (){
  navGif.style.opacity = "0";
  navGif.style.transition ="opacity 0.4s";
  index =index+1;
  if(index>9){
    return ;
  }
  else{
  isPlaying = false;
  playButton.classList.remove("fa-circle-pause");
  playButton.classList.add("fa-circle-play");
  mainSongName.innerText = songsNameList[index];
  mainImage.setAttribute("src",songsBannerPath[index]);
  mainAudio.currentTime =0;
  setTrackBar();
  mainAudio.src = songsFilePath[index];
}
});

//adding eventListeners to songslist playbuttons
for(var i=0; i< playIconList.length ; i++){
  playIconList[i].innerHTML =i+1;

  playIconList[i].addEventListener("click", function (){
     var newPath = this.innerHTML;
     var newIndex = parseInt(newPath);
     index= newIndex-1;
     mainSongName.textContent = songsNameList[newIndex-1];
     mainImage.setAttribute("src",songsBannerPath[newIndex-1]);

     songChangePath=songsFilePath[newIndex-1];
     playButton.classList.remove("fa-circle-pause");
     playButton.classList.add("fa-circle-play");
     mainAudio.currentTime=0;
     mainAudio.src= songChangePath;
     isPlaying = true;
  });
}

function setTrackBar(){
  myTrackBar.value=0;
}
