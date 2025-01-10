import { setTimeUp, setSaleStatus, getSaleStatus } from './utils.js';

const startDate = new Date("2025-01-10T12:00:00"); // 21 Dec 2024, 6:00 PM
export const endDate = new Date("2025-01-18T23:59:59"); 

// Get the total duration in milliseconds
// const duration = endDate - startDate;

function startCountdown() {

    // console.log(startDate.getUTCDate(), endDate.getUTCDate())
    const now = new Date();
    const timeLeft = endDate - now;

    //check if start date is passed or not
    if(now < startDate){
        document.getElementById("countdown").textContent = "Sale not Started Yet";
        clearInterval(timerInterval);
        setSaleStatus(false);
        document.getElementsByClassName('pay-now')[0].style.display = "none"
        setTimeUp(true);
        return;
    }

    // Check if the countdown has finished
    if (timeLeft <= 0) {
        // console.log(document.getElementById("countdown"))
        document.getElementById("countdown").textContent = "Time's up!";
        clearInterval(timerInterval);
        setSaleStatus(false);
        document.getElementsByClassName('pay-now')[0].style.display = "block"
        setTimeUp(true);
        return;
    }
    document.getElementsByClassName('pay-now')[0].style.display = "block"
    setSaleStatus(true);
    setTimeUp(false);

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById("countdown").textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


const timerInterval = setInterval(startCountdown, 1000);