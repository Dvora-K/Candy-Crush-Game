function checkLevel() {
    let currentSize = Data.lastLevel;

    if (currentSize == 12)//last level
    {
        alert("you have reached the highest level!")
    }
    else {
        Data.lastLevel = currentSize + 3;
       let updateData=JSON.stringify(Data);
       localStorage.setItem(`${currentUser}`,updateData);
    }
}
