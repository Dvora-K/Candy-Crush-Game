function insertUserData() {
    let email = document.getElementById("email").value;
    if (localStorage.getItem(`${email}`) == null) {
        let fname = document.getElementById("fname").value;
        let psw = document.getElementById("psw").value;
        let emailRegex = /\S+@\S+\.\S+/;
        if (!email || !fname || !psw) {
            alert("please insert all the details")
            return;
        }
        else if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        else if (psw.length < 8) {
            alert("password must be at least 8 digits");
            e.preventDefault();
        }
        let details = {
            name: fname,
            psw: psw,
            highestScore: 0,
            lastLevel: 6,
            times: 0,
            winner: 0
        };
        let value = JSON.stringify(details);
        localStorage.setItem(`${email}`, value);
        window.location = "../html/log-in.html";
    }
    else
        alert("your user-name already exists! please log in")

}