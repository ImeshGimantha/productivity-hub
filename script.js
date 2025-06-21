'use strict';

function displayCalender() {
    const calenders = document.querySelectorAll('#calender-body');

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let firstDate = new Date(year, month, 1);
    let firstDay = firstDate.getDay();
    let lastDate = new Date(year, month+1, 0);
    
    calenders.forEach(calender => {
        let day = 1;
        for (let i=0; i<6; i++) {
            let row = document.createElement('tr');
            for (let j=0; j<=6; j++) {
                let cell = document.createElement('td');
                if (day == 1 && j < firstDay) {
                    cell.textContent = '';
                } else if (day > lastDate.getDate()) {
                    cell.textContent = '';
                } else {
                    cell.textContent = day;
                    day++;
                }
                row.appendChild(cell);
            }
            calender.appendChild(row);
            if (day > lastDate.getDate()) {
                break;
            }
        }
    });
}
displayCalender();

async function getWeather() {
    const CITY = 'Galle';
    const API_KEY = "9e6157e604b643f5b5b74840251806";
    const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`;

    try {
        const res = await fetch(URL);
        const data = await res.json();

        let cityNames = document.querySelectorAll("#city-name");
        let temperatures = document.querySelectorAll("#temperature");

        cityNames.forEach(cityName => {
            cityName.innerHTML = `${data.location.name}, ${data.location.country}`;
        });
        temperatures.forEach(temperature => {
            temperature.innerHTML = `${data.current.temp_c}°C <img src="https:${data.current.condition.icon}">`;
        });

    } catch (err) {
        console.log("Error: Could not fetch weather data.", err);
    }
}
getWeather();

// sidebar section activities
let home = document.getElementById("home-section");
let mainHome = document.getElementById("main-home-section");
let todo = document.getElementById("todo-section");
let timer = document.getElementById("timer-section");
let note = document.getElementById("note-section");
let calender = document.getElementById("calender-section");
let weather = document.getElementById("weather-section");

mainHome.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    mainHome.classList.add("active-tab");
    getDisplay();
    home.classList.remove("hidden");
    home.setAttribute('active', 'true');
});

todo.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    todo.classList.add("active-tab");
    getDisplay();
    document.querySelector(".todo-section").classList.remove("hidden");
    document.querySelector(".todo-section").setAttribute('active', 'true');
});

timer.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    getDisplay();
    timer.classList.add("active-tab");
    document.querySelector(".timer-section").classList.remove("hidden");
    document.querySelector(".timer-section").setAttribute('active', 'true')
});

note.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    getDisplay();
    note.classList.add("active-tab");
    document.querySelector(".note-section").classList.remove("hidden");
    document.querySelector(".note-section").setAttribute('active', 'true')
});

calender.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    getDisplay();
    calender.classList.add("active-tab");
    document.querySelector(".calender-section").classList.remove("hidden");
    document.querySelector(".calender-section").setAttribute('active', 'true')
});

weather.addEventListener('click', event => {
    event.preventDefault();
    getActiveTab();
    getDisplay();
    weather.classList.add("active-tab");
    document.querySelector(".weather-section").classList.remove("hidden");
    document.querySelector(".weather-section").setAttribute('active', 'true')
});

// display screen
function getDisplay() {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        let status = screen.getAttribute('active');
        if (status == 'true') {
            screen.classList.add('hidden');
            screen.setAttribute('active', 'false');
        }
    });
}

// find active tab
function getActiveTab() {
    try {
        let tab = document.querySelector(".nav-list .active-tab");
        tab.classList.remove("active-tab");
    }
    catch (error) {
        console.log(error.message);
    }
}

// to do list
let todo_list = [];
function addToDo() {
    let todo = document.querySelector(".todo-section #add-input");
    
    todo_list.push(todo.value);
    displayToDo();
}
document.querySelector('.todo-section #save-btn').onclick = addToDo;

document.querySelector('.home-section .todo-list #add-btn').onclick = () => {
    let todoHome = document.querySelector(".home-section .todo-list #add-input");
    todo_list.push(todoHome.value);
    displayToDo();
};

function displayToDo() {
    let checkAreaHome = document.querySelector('.home-section .todo-list div');
    let checkArea = document.getElementById('checkbox-area');
    checkArea.innerHTML = "";
    checkAreaHome.innerHTML = "";
    todo_list.forEach((todo, index) => {
        checkArea.innerHTML += `<input type="checkbox" class="checkbox" id="checkbox${index + 1}">
            <label for="checkbox${index+1}">${todo}</label><br>
        `;
        checkAreaHome.innerHTML += `<input type="checkbox" class="checkbox" id="checkbox${index + 1}">
            <label for="checkbox${index+1}">${todo}</label><br>
        `;
    });
}


// pomodoro timer
function setTimer() {
    let startBtn = document.querySelector(".timer-section #start-btn");
    let cancelBtn = document.querySelector(".timer-section #cancel-btn");
    let time = document.querySelector('.timer-section #time');
    let minutes = 25;
    let seconds = 0;
    let timer;

    startBtn.style.display = "none";
    cancelBtn.style.display = 'block';
    time.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timer = setInterval(() => {
        if (seconds == 0) {
            minutes--;
            seconds = 60;
        }
        seconds--;
        time.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    cancelBtn.onclick = () => {
        clearInterval(timer);
        startBtn.style.display = "block";
        cancelBtn.style.display = "none";
    };
}
document.querySelector(".timer-section #start-btn").onclick = setTimer;

// note-section
function addNote() {
    let noteArea = document.querySelector('.note-section .note-body');
    const noteBody = document.querySelector('.note-section #note-area');
    
    let clone = document.getElementById('note-card').content.cloneNode(true);
    clone.querySelector('p').textContent = noteBody.value;
    noteArea.appendChild(clone);
}
document.querySelector('.note-section #add-textarea-btn').onclick = addNote;