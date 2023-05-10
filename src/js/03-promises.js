// const form = document.querySelector('.form');

// form.addEventListener('submit', onSubmit);

// function onSubmit(event) {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   const delay = Number(formData.get('delay'));
//   const step = Number(formData.get('step'));
//   const amount = Number(formData.get('amount'));

//   let position = 1;

//   for (let i = 0; i < amount; i++) {
//     createPromise(position, delay)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });

//     position++;
//     delay += step;
//   }
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
    
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

import Notiflix from 'notiflix';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(this.delay.value);
  const step = Number(this.step.value);
  const amount = Number(this.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onResolve).catch(onReject);
    delay += step;
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function onResolve(value) {
  Notiflix.Notify.success(value);
}

function onReject(error) {
  Notiflix.Notify.failure(error);
}