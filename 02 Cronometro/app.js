const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

let stopwatchInterval;
let runningTime = 0;

const playPause = () => {
  const isPaused = !playPauseButton.classList.contains('running')
  if (isPaused) {
    playPauseButton.classList.add('running');
    start()
  } else {
    playPauseButton.classList.remove('running');
    pause()
  }
}

const start = () => {
  secondsSphere.style.animation = 'rotacion 60s linear infinite';
  secondsSphere.style.animationPlayState = 'running'
  let startTime = Date.now() - runningTime;
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = calculateTime(runningTime)
  }, 1000)
}

const calculateTime = runningTime => {
  const totalSeconds = Math.floor(runningTime / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)

  const displaySeconds = (totalSeconds % 60).toString().padStart(2, '0')
  const displayMinutes = totalMinutes.toString().padStart(2, '0')

  return `${displayMinutes}:${displaySeconds}`
}

const pause = () => {
  secondsSphere.style.animationPlayState = 'paused'
  clearInterval(stopwatchInterval)
}

const stop = () => {
  secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)'
  secondsSphere.style.animation = 'none'
  playPauseButton.classList.remove('running');
  runningTime = 0
  clearInterval(stopwatchInterval)
  stopwatch.textContent = '00:00'
}

