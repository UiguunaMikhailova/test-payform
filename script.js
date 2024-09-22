const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('.tab-list__button');
const tabPanels = Array.from(tabs.querySelectorAll('.tab-panel'));
const checkboxElement = document.getElementById('checkbox');
const popupElement = document.getElementById('popup');

tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);

function handleTabClick(event) {
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  tabButtons.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  });

  event.currentTarget.setAttribute('aria-selected', true);

  const { id } = event.currentTarget;

  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute('aria-labelledby') === id
  );

  tabPanel.hidden = false;
}

function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.match(/.{1,4}/g)?.join(' ') || value;
  input.value = value;
}

function validateCardNumber(input) {
  const value = input.value.replace(/\D/g, '');
  if (value.length !== 16) {
    input.setCustomValidity('Validation failed');
  } else {
    input.setCustomValidity('');
  }
}

function validateCVV(input) {
  const value = input.value.replace(/\D/g, '');
  if (value.length !== 3) {
    input.setCustomValidity('Validation failed');
  } else {
    input.setCustomValidity('');
  }
}

function validateExpiryDate(monthInput, yearInput) {
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  const currentYear = new Date().getFullYear() % 100; // Последние 2 цифры текущего года
  const currentMonth = new Date().getMonth() + 1; // Месяц начинается с 0

  let errorMessage = '';

  if (
    !/^\d{1,2}$/.test(month) ||
    monthNum < 1 ||
    monthNum > 12 ||
    !/^\d{2}$/.test(year) ||
    yearNum < currentYear ||
    (yearNum === currentYear && monthNum < currentMonth)
  ) {
    errorMessage = 'Validation failed';
  }

  if (errorMessage) {
    monthInput.setCustomValidity(errorMessage);
    yearInput.setCustomValidity(errorMessage);
  } else {
    monthInput.setCustomValidity(errorMessage);
    yearInput.setCustomValidity(errorMessage);
  }
}

function validateCardHolderName(input) {
  const value = input.value.trim();
  const nameRegex = /^[A-Za-zА-Яа-я\s]+$/;
  if (value.length === 0) {
    input.setCustomValidity('Validation failed');
  } else if (!nameRegex.test(value)) {
    input.setCustomValidity('Validation failed');
  } else {
    input.setCustomValidity('');
  }
}

function blockNumbers(event) {
  if (/\d/.test(event.key)) {
    event.preventDefault();
  }
}

function blockLetters(event) {
  if (/[a-zA-Z]/.test(event.key)) {
    event.preventDefault();
  }
}

function validateTerms(checkbox) {
  if (!checkbox.checked) {
    checkbox.setCustomValidity('Validation failed');
  } else {
    checkbox.setCustomValidity('');
  }
}

function markAsTouched(input) {
  input.classList.add('touched');
}

function handleSubmit(event) {
  const form = event.target;
  const inputs = form.querySelectorAll('input');

  let isValid = true;
  inputs.forEach((input) => {
    input.classList.add('touched');
    if (!input.checkValidity()) {
      isValid = false;
    }
  });

  const terms = checkboxElement;
  validateTerms(terms);

  if (!isValid || !terms.checkValidity()) {
    event.preventDefault();
  }
}

function openPopup(event) {
  event.preventDefault();
  popupElement.style.display = 'flex';
}

function closePopup() {
  popupElement.style.display = 'none';
}

function closePopupOutside(event) {
  if (event.target === popupElement) {
    closePopup();
  }
}
