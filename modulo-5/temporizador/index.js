import { startCountdown } from "./src/countdownTimer.js";

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);

startCountdown(futureDate);