import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const LS = localStorage;

let formData = {};
let STORAGE_KEY = 'feedback-form-state';


form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));



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
  formData[event.target.name] = event.target.value;
  LS.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateMessageOutput() {
  const savedMessage = LS.getItem(STORAGE_KEY);
  if (LS.getItem(STORAGE_KEY)) {
    formData = JSON.parse(LS.getItem(STORAGE_KEY));
    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
};
