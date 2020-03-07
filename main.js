



var main = document.getElementById("gameCards");
main.addEventListener("click", handleClick);
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;


function handleClick(event){
  console.log(event);
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var clicked = event.target.parentElement;
  clicked.classList.add("card-revealed");
  if (!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;

  }
  else{
    secondCardClicked = event.target;
    event.currentTarget.removeEventListener("click", handleClick);
    secondCardClasses = secondCardClicked.previousElementSibling.className;

    if(firstCardClasses === secondCardClasses){

      main.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      displayStats();
      matchSound();
      if(matches===maxMatches){
        var modal = document.querySelector(".modal");
        modal.classList.remove("hidden");
      }
    }
    else{

      setTimeout(function () {
        firstCardClicked.parentElement.classList.remove("card-revealed");
        secondCardClicked.parentElement.classList.remove("card-revealed");
        main.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++;
        displayStats();
      }, 800);

    }
  }


}

function displayStats(){
  document.querySelector("#gamesPlayed").textContent = gamesPlayed;

  document.querySelector("#attempts").textContent = attempts;

  document.querySelector("#accuracy").textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
  if(!attempts){
    return "0%";
  }
  return Math.trunc((matches/attempts)*100)+"%";
}

function resetGame(){
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  document.querySelector(".modal").classList.add("hidden");
}

function resetCards(){
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var i=0 ; i<hiddenCards.length ; i++){
    hiddenCards[i].classList.remove("hidden");
  }
}

document.querySelector("#modalButton").addEventListener("click", shuffle);

//shuffle feature




var originalCardArray = [
  "js-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo",
  "css-logo",
  "js-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo",
  "css-logo"
]

function destroyChildren(element){
 while (element.firstChild){
   element.removeChild(element.firstChild);
 }
}

function shuffle(){
  destroyChildren(main);
  var cardArrayCopy = [].concat(originalCardArray);
  for(var k = 0; k<originalCardArray.length; k++){

    var randomNumber = Math.floor(Math.random()*(cardArrayCopy.length));

    var flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");


    var cardHolder = document.createElement("div");
    cardHolder.classList.add("col-2");
    cardHolder.classList.add("card");
    cardHolder.classList.add("flip-card-inner");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.classList.add(cardArrayCopy[randomNumber]);

    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");


    cardHolder.appendChild(cardFront);
    cardHolder.appendChild(cardBack);
    flipCard.appendChild(cardHolder);
    main.appendChild(flipCard);

    cardArrayCopy.splice(randomNumber, 1);


  }
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();

  document.querySelector(".modal").classList.add("hidden");
}

window.addEventListener('DOMContentLoaded', shuffle);


//Sound stuff

//make the sound object
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}

var matchSoundArray = [
  "assets/sounds/combobreak-online-audio-converter_06FGwjv.mp3",
  "assets/sounds/wow_17.mp3",
  "assets/sounds/pig-stick-ft_FMMZeJh.mp3",
  "assets/sounds/tuturu_1.mp3",
  "assets/sounds/sugoi-sugoi.mp3"
];
var gameOverSound ="assets/sounds/tmph3o88c10.mp3";
var kagebunshin = "assets/sounds/katon.mp3";
var combo = "assets/sounds/anime-wow-sound-effect.mp3";


function matchSound(){
  var luckyNumber = Math.floor(Math.random() * (matchSoundArray.length));
  mySound = new sound(matchSoundArray[luckyNumber]);
  mySound.play();
}


//timer stuff

var timerCounter = 60;
var myInterval = setInterval(innerTimer, 1000);
function innerTimer (){
  document.getElementById("timer").textContent=--timerCounter;
  if(timerCounter<=0){
    clearInterval(myInterval);
  }


}
