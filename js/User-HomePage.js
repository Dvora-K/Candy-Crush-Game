let uName = sessionStorage.getItem("currentUser");
let InfoString = localStorage.getItem(`${uName}`);
let userInfo = JSON.parse(InfoString);
document.getElementById("userName").innerText = userInfo.name;


function restart() {
  userInfo.lastLevel = 6;
  let info = JSON.stringify(userInfo);
  localStorage.setItem(`${uName}`, info);
}
function view(butName) {
  let i, tabcontent;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(`${butName}`).style.display = "flex";

  if (butName == "details") {
    document.getElementById("fname").innerHTML = Data.name;
    document.getElementById("email").innerHTML = sessionStorage.currentUser;
    document.getElementById("psw").innerHTML = Data.psw;
  }
  if (butName == "goals") {
    document.getElementById("count").innerHTML = Data.times;
    document.getElementById("highScore").innerText = userInfo.highestScore;
    document.getElementById("winner").innerHTML = Data.winner;
  }
}

