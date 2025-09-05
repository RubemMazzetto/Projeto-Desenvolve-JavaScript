const calculateTimeRemaining = (futureDate) => {
  const now = new Date();
  const target = new Date(futureDate);

  if (isNaN(target.getTime())) {
    throw new Error("Data futura inválida");
  }
  if (target <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const diffMs = target - now; // Diferença em milissegundos
  const secondsTotal = Math.floor(diffMs / 1000);
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return { days, hours, minutes, seconds, isExpired: false };
};

const formatTimeRemaining = ({ days, hours, minutes, seconds }) => {
  return `${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
};

const updateTimer = (futureDate, intervalId) => {
  try {
    const timeRemaining = calculateTimeRemaining(futureDate);
    if (timeRemaining.isExpired) {
      console.log("O temporizador expirou!");
      clearInterval(intervalId);
      return false;
    }
    console.clear();
    console.log(`Tempo restante: ${formatTimeRemaining(timeRemaining)}`);
    return true;
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    clearInterval(intervalId);
    return false;
  }
};

const startCountdown = (futureDate) => {
  const intervalId = setInterval(() => {
    if (!updateTimer(futureDate, intervalId)) {
      clearInterval(intervalId);
    }
  }, 1000);
};

export { calculateTimeRemaining, updateTimer, startCountdown };