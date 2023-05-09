let date = new Date(),
hr = document.querySelector("#hr"),
min = document.querySelector("#min"),
sec = document.querySelector("#sec"),
digHr = document.querySelector("#digHr"),
digMin = document.querySelector("#digMin"),
setAlarmBtn = document.querySelector("button"),
setContainer = document.querySelector(".setContainer"),
alarmTime = 0, isAlarmSet = false,
alarmSound = new Audio("./sounds/sound.mp3");

setInterval(() => {
    date = new Date();
    let secV = date.getSeconds(),
    minV = date.getMinutes(),
    hrV = date.getHours(),
    ampm = "AM";
    
    sec.style.transform= `rotateZ(${secV * 6}deg)`;
    min.style.transform= `rotateZ(${minV * 6}deg)`;
    hr.style.transform= `rotateZ(${(hrV * 30) + Math.round(minV/ 2)}deg)`;
    
    if (hrV >= 12){
        hrV -= 12;
        ampm = "PM";
    }
        
    if (hrV === 0)
        hrV = 12;

    if (hrV < 10)
        hrV = "0" + hrV;
    if (minV < 10)
        minV = "0" + minV;

    digHr.innerHTML= hrV + ": ";
    digMin.innerHTML= minV;

    if (alarmTime == `${hrV}: ${minV} ${ampm}`){
        alarmSound.play();
        alarmSound.loop = true;
    }
}, 1000);


let selectMenu = document.querySelectorAll("select");

for (let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i: i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i: i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm(){
    if (isAlarmSet){
        alarmTime = "";
        alarmSound.pause();
        setContainer.classList.remove("disable");
        setAlarmBtn.innerText= "Set Alarm";
        setAlarmBtn.classList.remove("inactive");
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}: ${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);

    if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM/ PM")){
        alert("Select correct format of time!");
    }
    isAlarmSet = true;
    setContainer.classList.add("disable");
    setAlarmBtn.innerText= "Clear Alarm";
    setAlarmBtn.classList.add("inactive");

    alarmTime = time;
}
setAlarmBtn.addEventListener("click", setAlarm);
