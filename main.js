



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
  return Math.trunc((matches/attempts)*100)+"%";
}
