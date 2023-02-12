export const validateForm = (schema, fields) => {
    fields.forEach((field) => {
        field.errorSpan.innerHTML = "";
        let indexToRemove = undefined;
        schema.forEach((item, ind) => {
            if (item === field.fieldHTMLElem.name) {
                if (validateField(field)) {
                    indexToRemove = ind;
                }
            }
        });
        if (indexToRemove)
            schema.splice(indexToRemove, 1);
    });
    if (!schema.length) {
        return true;
    }
    else {
        return false;
    }
};
export const validateField = (field) => {
    field.errorSpan.innerHTML = "";
    const { fieldHTMLElem, errorSpan, validation: { minSymbols, maxSymbols, minNum, maxNum, regEx, isAlreadyExists, }, } = field;
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
    if (maxNum) {
        if (+fieldHTMLElem.value > maxNum) {
            isValid = false;
            errorSpan.innerHTML = `${errorSpan.innerText}</br> *The number must be less then ${maxNum}`;
        }
    }
    if (regEx) {
        if (!fieldHTMLElem.value.match(regEx)) {
            isValid = false;
            errorSpan.innerHTML = `${errorSpan.innerText}</br> *The input must match the following regular expression: ${regEx}`;
        }
    }
    if (isAlreadyExists) {
        const usersJSON = localStorage.getItem("users");
        const users = typeof usersJSON === "string" ? JSON.parse(usersJSON) : undefined;
        switch (isAlreadyExists) {
            case "login":
                users?.forEach((user) => {
                    if (user.login === fieldHTMLElem.value) {
                        isValid = false;
                        errorSpan.innerHTML = `${errorSpan.innerText}</br> *There is account with this login alredy`;
                    }
                });
                break;
            case "mail":
                users?.forEach((user) => {
                    if (user.mail === fieldHTMLElem.value) {
                        isValid = false;
                        errorSpan.innerHTML = `${errorSpan.innerText}</br> *There is account with this mail alredy`;
                    }
                });
                break;
            default:
                break;
        }
    }
    return isValid;
};
