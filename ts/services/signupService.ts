import PAGES from "../models/pageModel.js";
import User from "../models/userModel.js";
import { onChangePage } from "../routes/router.js";
import { field } from "../types.js";
import {
  SIGNUP_FORM_CANCEL_BTN,
  SIGNUP_FORM_LOGIN,
  SIGNUP_FORM_MAIL,
  SIGNUP_FORM_NAME,
  SIGNUP_FORM_PASSWORD,
  SIGNUP_FORM_SUBMIT_BTN,
  SIGNUP_LOGIN_ERROR_SPAN,
  SIGNUP_MAIL_ERROR_SPAN,
  SIGNUP_NAME_ERROR_SPAN,
  SIGNUP_PASSWORD_ERROR_SPAN,
} from "./domService.js";
import { validateField, validateForm } from "./formValidationService.js";
import { startUserPage } from "./userPage.js";

export const startSignupPage = () => {
  onChangePage(PAGES.SIGNUP_PAGE);

  const schema = ["name", "login", "mail", "password"];

  const formFields: field[] = [
    {
      fieldHTMLElem: SIGNUP_FORM_NAME,
      errorSpan: SIGNUP_NAME_ERROR_SPAN,
      validation: {
        minSymbols: 1,
        maxSymbols: 20,
        minNum: undefined,
        maxNum: undefined,
        regEx: /^[a-zA-Z]+$/g,
        isAlreadyExists: undefined,
      },
    },
    {
      fieldHTMLElem: SIGNUP_FORM_LOGIN,
      errorSpan: SIGNUP_LOGIN_ERROR_SPAN,
      validation: {
        minSymbols: 1,
        maxSymbols: 40,
        minNum: undefined,
        maxNum: undefined,
        regEx: undefined,
        isAlreadyExists: "login",
      },
    },
    {
      fieldHTMLElem: SIGNUP_FORM_MAIL,
      errorSpan: SIGNUP_MAIL_ERROR_SPAN,
      validation: {
        minSymbols: 1,
        maxSymbols: 50,
        minNum: undefined,
        maxNum: undefined,
        regEx: /^.+@.+\..{2,}$/g,
        isAlreadyExists: "mail",
      },
    },
    {
      fieldHTMLElem: SIGNUP_FORM_PASSWORD,
      errorSpan: SIGNUP_PASSWORD_ERROR_SPAN,
      validation: {
        minSymbols: undefined,
        maxSymbols: undefined,
        minNum: undefined,
        maxNum: undefined,
        regEx:
          /(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20}/g,
        isAlreadyExists: undefined,
      },
    },
  ];

  formFields.forEach((field) => {
    field.fieldHTMLElem.removeEventListener("input", () => {
      validateField(field);
    });
    field.fieldHTMLElem.addEventListener("input", () => {
      validateField(field);
    });
  });

  SIGNUP_FORM_SUBMIT_BTN.removeEventListener("click", () => {
    submitBtnFunc(schema, formFields);
  });
  SIGNUP_FORM_SUBMIT_BTN.addEventListener("click", () => {
    submitBtnFunc(schema, formFields);
  });

  SIGNUP_FORM_CANCEL_BTN.removeEventListener("click", () =>
    cancelBtnFunc(formFields)
  );
  SIGNUP_FORM_CANCEL_BTN.addEventListener("click", () =>
    cancelBtnFunc(formFields)
  );
};

const cancelBtnFunc = (formFields: field[]) => {
  onChangePage(PAGES.LOGIN_PAGE);
  cleanFormFields(formFields);
};

const submitBtnFunc = (schema: string[], formFields: field[]) => {
  if (validateForm(schema, formFields)) {
    const usersJSON = localStorage.getItem("users");
    const users: User[] | undefined =
      typeof usersJSON === "string" ? JSON.parse(usersJSON) : undefined;
    const newUser = new User(
      {
        userName: SIGNUP_FORM_NAME.value,
        login: SIGNUP_FORM_LOGIN.value,
        password: SIGNUP_FORM_PASSWORD.value,
        mail: SIGNUP_FORM_MAIL.value,
        chats: [],
        photo: "",
        contacts: [],
      },
      users
    );
    users?.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    cleanFormFields(formFields);
    data.CURRENT_USER.user = newUser;
    startUserPage();
  }
};

const cleanFormFields = (formFields: field[]) => {
  formFields.forEach((field) => {
    field.fieldHTMLElem.value = "";
    field.errorSpan.innerHTML = "";
  });
};
