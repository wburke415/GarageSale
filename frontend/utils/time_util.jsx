import React from 'react';

export const timeStrings = (product) => {
    let currentDate = new Date();
    let endDate = new Date(product.endsAt);

    let timeLeft = new Date(endDate - currentDate);

    if (currentDate > endDate) return 'Ended';

    let days;
    let hours;
    let minutes;
    let seconds;

    timeLeft.toUTCString().slice(5, 7)[0] === "0" ? days = timeLeft.toUTCString().slice(6, 7) : days = timeLeft.toUTCString().slice(5, 7);
    days = parseInt(days) - 1;    

    timeLeft.toUTCString().slice(17, 19)[0] === "0" ? hours = timeLeft.toUTCString().slice(18, 19) : hours = timeLeft.toUTCString().slice(17, 19);
    timeLeft.toUTCString().slice(20, 22)[0] === "0" ? minutes = timeLeft.toUTCString().slice(21, 22) : minutes = timeLeft.toUTCString().slice(20, 22);
    timeLeft.toUTCString().slice(23, 25)[0] === "0" ? seconds = timeLeft.toUTCString().slice(24, 25) : seconds = timeLeft.toUTCString().slice(23, 25);

    return { days, hours, minutes, seconds };
};
export const timeLeft = (timeStrings) => {

  if (timeStrings === "Ended") return <span className="product-show-time-string">Ended</span>

    let keys = Object.keys(timeStrings);
    let timeLeft = [];
    let listItem;

    for (let i = 0; i < keys.length; i++) {
        if (timeStrings[keys[i]] == 0) continue;
        if (timeLeft.length === 2) continue;
        listItem = timeStrings[keys[i]] + keys[i].slice(0, 1);
        timeLeft.push(listItem);
    }

    return (
        <ul className="product-show-time-string">
            <li className="product-show-time-left">Time left:</li>
            <span>{timeLeft.join(" ")}</span>
        </ul>
    );
};

export const endTime = (product) => {
    let currentDate = new Date();
    let endDate = new Date(product.endsAt);

    let day; 

    if (currentDate.getDate() === endDate.getDate()) {
        day = 'Today';
    } else if ((currentDate.getDate() + 7) < endDate) {
        day = endDate.toLocaleString().slice(0, 4);
    }
    else {
        day = endDate.toUTCString().slice(0, 3);
    }
    
    let time = endDate.toLocaleTimeString();

    return <span className="item-end-time">({day} {time})</span>;
};