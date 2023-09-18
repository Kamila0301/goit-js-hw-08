import throttle from 'lodash.throttle';

let formData = {};
const form = document.querySelector('.feedback-form');
const LS = localStorage;

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));

form.addEventListener('input', function (event) {
  formData[event.target.name] = event.target.value;
  LS.setItem('formData', JSON.stringify(formData));
});

populateMessageOutput();

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.target.elements;

  if (email.value === '' || message.value.trim() === '') {
    return alert('Please fill in all the fields!');
  }

  const text = {
    email: email.value,
    message: message.value,
  };
  console.log(text);
  event.target.reset();
  LS.removeItem(STORAGE_KEY);
}

function onTextInput(event) {
  LS.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateMessageOutput() {
  const savedMessage = LS.getItem(STORAGE_KEY);
  if (LS.getItem('formData')) {
    formData = JSON.parse(LS.getItem('formData'));
    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
}
