import { field } from "../types";

export const validateForm = (
  schema: string[],
  fields: field[],
  submitBtn: HTMLInputElement | HTMLButtonElement,
  cancelBtn: HTMLInputElement | HTMLButtonElement
) => {
  fields.forEach((field) => {
    validateField(field);
  });
};

const validateField = (field: field) => {
  const {
    fieldHTMLElem,
    errorSpan,
    validation: { minSymbols, maxSymbols, minNum, maxNum, regEx },
  } = field;
  let isValid = true;

  if (minSymbols) {
    if (fieldHTMLElem.value.length < minSymbols) {
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The field must contain at least ${minSymbols} characters`;
    }
  }

  if (maxSymbols) {
    if (fieldHTMLElem.value.length > maxSymbols) {
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The field must contain less then ${maxSymbols} characters`;
    }
  }

  if (minNum) {
    if (+fieldHTMLElem.value < minNum) {
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The number must be more then ${minNum}`;
    }
  }

  if (minNum) {
    if (+fieldHTMLElem.value < minNum) {
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The number must be more then ${minNum}`;
    }
  }

  if (maxNum) {
    if (+fieldHTMLElem.value > maxNum) {
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The number must be less then ${maxNum}`;
    }
  }

  if (regEx) {
    if (!fieldHTMLElem.value.match(regEx)) {
      //regexModels???
      isValid = false;
      errorSpan.innerHTML = `${errorSpan.innerText}</br> *The input must match the following regular expression: ${regEx}`;
    }
  }
};
