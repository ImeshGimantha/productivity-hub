'use strict';

function displayCalender() {
    const calender = document.getElementById("calender-body");
    calender.innerHTML = '';

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = new Date(year, month, 1);
    let firstDay = date.getDay();;
    let lastDate = new Date(year, month+1, 0);
    let day = 1;

    // create table
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
}
displayCalender();