import Notiflix from 'notiflix';

let formEl = document.querySelector('.form');

let formAmount = null;
let formdDelay = null;
let formsStep = null;

formEl.addEventListener('submit', getFormData);
formEl.addEventListener('submit', event => {
  event.preventDefault;

  for (let i = 0; i < formAmount; i++) {
    createPromise(1 + i, formdDelay + i * formsStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function getFormData(event) {
  event.preventDefault();
  const formData = new FormData(formEl);

  formAmount = Number(formData.get('amount'));
  formdDelay = Number(formData.get('delay'));
  formsStep = Number(formData.get('step'));
}
