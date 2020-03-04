var main = document.getElementById("gameCards");
main.addEventListener("click", handleClick);

function handleClick(event){
  console.log(event);
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var clicked = event.target;
  clicked.classList.add("hidden");


}
