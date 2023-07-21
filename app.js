var song = document.querySelector(".song"); //selecting audio song
var playButton = document.querySelector(".play"); //selecting play button
var replay = document.querySelector(".replay"); //selecting replay button
var video = document.querySelector(".video-container video"); //selecting video

var timeselect = document.querySelectorAll(".time-select-container button"); //selecting all buttons to select time
var soundSelect = document.querySelectorAll(".sound-picker-container button"); //selecting all buttons to select sound
var outline = document.querySelector(".moving-outline circle"); //for progress
var timeDisplay = document.querySelector(".time-display"); //selecting div to display time

//default time for meditation and time display change
let fakeDuration = 600; //default timer is 10 mins
timeDisplay.innerText = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;
//styling moving outline
//code to make all appear as if not even played
var outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//a function to select time
timeselect.forEach((time) => {
  time.addEventListener("click", function () {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.innerText = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

//a function to select sound
soundSelect.forEach((sound) => {
  sound.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound"); //setting sound to what is selected
    video.src = this.getAttribute("data-video"); //setting video to what is selected
    checkPlaying(song); //by having this function here as soon as we click the mode the timer starts
  });
});

//a need a function to checkPlaying
playButton.addEventListener("click", function () {
  checkPlaying(song); //calling check playing function
});

replay.addEventListener("click", function () {
  restartSong(song);
});

function checkPlaying(song) {
  if (song.paused) {
    song.play(); //play function starts playing the current audio or video
    video.play();
    playButton.src = "./svg/pause.svg";
  } else {
    song.pause(); //pause function pauses the current audio or video
    video.pause();
    playButton.src = "./svg/play.svg";
  }
}

function restartSong(song) {
  let currentTime = song.currentTime;
  song.currentTime = 0;
  console.log("ciao");
}

//a function to check progress
song.ontimeupdate = function () {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.innerText = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  //to avoid going in negative
  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    playButton.src = "./svg/play.svg";
    video.pause();
  }
};
