export const MyTimer = {
  startCountdown: (minutes, seconds, hours, callback) => {
    hours = hours || 0;
    minutes = minutes || 0;
	minutes = minutes + hours * 60;
    seconds = seconds || 0;
    seconds = seconds + minutes * 60;

    let interval = null;

    function countdown() {
      callback(seconds);
      seconds ++;
    }

    interval = setInterval(function () {
      countdown();
    }, 1000);

    countdown();
    return interval;
  },

  pauseCountdown: (intervalId) => {
    clearInterval(intervalId);
  },

  stopCountdown: (intervalId) => {
    clearInterval(intervalId);
  },

  remainingTime: (seconds) => {
    return {
      mm: (seconds / 60) | 0,
      ss: seconds % 60 | 0,
      hh: (seconds / 3600) | 0,
      running: seconds > 0,
    };
  },
};
