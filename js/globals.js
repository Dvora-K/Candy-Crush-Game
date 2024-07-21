let levels = [6, 9, 12];
let colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
let currentUser = sessionStorage.getItem("currentUser");
let userData = localStorage.getItem(`${currentUser}`);
let Data = JSON.parse(userData);
