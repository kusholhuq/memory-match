



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
  var clicked = event.target;
  clicked.classList.add("hidden");
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
      if(matches===maxMatches){
        var modal = document.querySelector(".modal");
        modal.classList.remove("hidden");
      }
    }
    else{

      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        main.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++;
        displayStats();
      }, 1500);

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

document.querySelector("#modalButton").addEventListener("click", resetGame);

//shuffle feature

var shufflebutton = document.querySelector("#shuffleButton");
shufflebutton.addEventListener("click", shuffle)

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

    var cardHolder = document.createElement("div");
    cardHolder.classList.add("col-2");
    cardHolder.classList.add("card");
    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.classList.add(cardArrayCopy[randomNumber]);
    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardHolder.appendChild(cardFront);
    cardHolder.appendChild(cardBack);
    main.appendChild(cardHolder);

    cardArrayCopy.splice(randomNumber, 1);


  }
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();

  document.querySelector(".modal").classList.add("hidden");
}
