const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};

let intervalId = null;

makesDisabledBtn(refs.btnStopEl);

refs.btnStartEl.addEventListener('click', () => {
  intervalId = setInterval(changeColor, 1000);
  makesDisabledBtn(refs.btnStartEl);
  removeDisabledBtn(refs.btnStopEl);
});

refs.btnStopEl.addEventListener('click', () => {
  clearInterval(intervalId);
  removeDisabledBtn(refs.btnStartEl);
  makesDisabledBtn(refs.btnStopEl);
});

function changeColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function makesDisabledBtn(refsBtn) {
  refsBtn.setAttribute('disabled', true);
}

function removeDisabledBtn(refsBtn) {
  refsBtn.removeAttribute('disabled');
}
