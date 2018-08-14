import React from 'react';

export const timeStrings = (product) => {
    let createdAt = new Date(product.createdAt);
    let currentDate = new Date();
    let endDate = new Date(createdAt.setDate(createdAt.getDate() + product.duration));

    let timeLeft = new Date(endDate - currentDate);

    let days;
    let hours;
    let minutes;
    let seconds;

    timeLeft.toUTCString().slice(5, 7)[0] === "0" ? days = timeLeft.toUTCString().slice(6, 7) : days = timeLeft.toUTCString().slice(5, 7);
    timeLeft.toUTCString().slice(17, 19)[0] === "0" ? hours = timeLeft.toUTCString().slice(18, 19) : hours = timeLeft.toUTCString().slice(17, 19);
    timeLeft.toUTCString().slice(20, 22)[0] === "0" ? minutes = timeLeft.toUTCString().slice(21, 22) : minutes = timeLeft.toUTCString().slice(20, 22);
    timeLeft.toUTCString().slice(23, 25)[0] === "0" ? seconds = timeLeft.toUTCString().slice(24, 25) : seconds = timeLeft.toUTCString().slice(23, 25);

    return { days, hours, minutes, seconds };
};
export const timeLeft = (timeStrings) => {
    let keys = Object.keys(timeStrings);
    let timeLeft = [];
    let listItem;

    for (let i = 0; i < keys.length; i++) {
        if (timeStrings[keys[i]] === "0") continue;
        if (timeLeft.length === 2) continue;
        listItem = timeStrings[keys[i]] + keys[i].slice(0, 1);
        timeLeft.push(listItem);
    }

    return (
        <ul className="product-show-time-string">
            <li className="product-show-time-left">Time left:</li>
            <li>{timeLeft.join(" ")}</li>
        </ul>
    );
};

export const endTime = (product) => {
    let createdAt = new Date(product.createdAt);
    let currentDate = new Date();
    let endDate = new Date(createdAt.setDate(createdAt.getDate() + product.duration));

    // Make sure to come back and finish this

};