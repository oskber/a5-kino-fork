const passwordField = document.querySelector('#passwordField');
const min8 = document.getElementById('min8');
const smallerLetter = document.getElementById('smallerLetter');
const capitalLetter = document.getElementById('capitalLetter');
const numbers = document.getElementById('numbers');
const specialChar = document.getElementById('specialChar');

function checkCondition(element, regex) {
  if (regex.test(passwordField.value)) {
    element.classList.add('text-green-400');
    element.classList.remove('text-red-400');
    element
      .querySelector('.fa-circle-exclamation')
      ?.classList.add('fa-circle-check');
    element
      .querySelector('.fa-circle-check')
      ?.classList.remove('fa-circle-exclamation');
  } else {
    element.classList.add('text-red-400');
    element.classList.remove('text-green-400');
    element
      .querySelector('.fa-circle-check')
      ?.classList.add('fa-circle-exclamation');
    element
      .querySelector('.fa-circle-exclamation')
      ?.classList.remove('fa-circle-check');
  }
}

passwordField.addEventListener('input', function () {
  checkCondition(min8, /^.{8,}$/);
  checkCondition(smallerLetter, /[a-z]/);
  checkCondition(capitalLetter, /[A-Z]/);
  checkCondition(numbers, /\d/);
  checkCondition(specialChar, /[!@#\$%^&*]/);
  
});