import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datetimePickerEl: document.querySelector('input#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let chackedTime = null;
let setIntervalID = null;
refs.startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= options.defaultDate) {
      refs.startBtnEl.disabled = false;
      chackedTime = selectedDates[0];
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(refs.datetimePickerEl, options);
refs.startBtnEl.addEventListener('click', onClicStartBtn);

function onClicStartBtn() {
  refs.datetimePickerEl.disabled = true;
  refs.startBtnEl.disabled = true;
  setIntervalID = setInterval(timeCalculate, 1000);
}

function timeCalculate() {
  let TimForConvertMs = chackedTime - Date.now();
  if (TimForConvertMs <= 0) {
    clearInterval(setIntervalID);
    return;
  }
  let time = convertMs(TimForConvertMs);
  updateMurkup(time);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return value.toString().padStart(2, 0);
}

function updateMurkup(timeObj) {
  const { days, hours, minutes, seconds } = timeObj;

  refs.daysEl.textContent = addZero(days);
  refs.hoursEl.textContent = addZero(hours);
  refs.minutesEl.textContent = addZero(hours);
  refs.secondsEl.textContent = addZero(seconds);
}
