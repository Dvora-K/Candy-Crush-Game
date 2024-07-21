function checkExists(e) {
  let email = document.getElementById("email").value;
  let psw = document.getElementById("psw").value;
  let data = localStorage.getItem(`${email}`);
  let value = JSON.parse(data);
  if (data) {
    sessionStorage.setItem('currentUser', email);
    if (!psw || !email) {
      alert("Plesae insert all required details");
      e.preventDefault();
    }
    else if (psw != value.psw) {
      alert("not valid details");
      e.preventDefault();
    }
    else
      window.location = "../html/User-HomePage.html";
  }
  else
    alert("not valid details");
}
