import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';
import {displayHomeScreen} from './channels.js';
import { reenableBackgroundDisableModalMode } from './multiuser.js';


//simple email regex obtained from https://daily-dev-tips.com/posts/vanilla-javascript-email-validation/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const none = 'none';
const visible = 'block';
const loginFormName = "login-form";
const registerFormName = "register-form";
const loginEmailField = "email-login";
const registerEmailField = "email-register";
const loginPasswordField = "password-login";
const registerPasswordFieldName = "password-register";
const registerPasswordConfirmFieldName = "password-register-confirm";
const registerNameField = "name-register";
const registerButtonOnLoginFormName = "login-form-register-button";
const loginButtonOnRegisterFormName = "register-form-login-button";
const registerButtonOnRegisterFormName = "register-form-register-button";
const loginButtonOnLoginFormName = "login-form-login-button";
const errorPopupName = "error-popup"
const errorPopupCloseName = "error-popup-close-button";
const errorPopupXName = "error-popup-x-button";
const errorPopupMessageName = "error-popup-message";
const loginErrorMessage = "Wrong email or password"
const emailFailRegexCheckMessage = "Email may be invalid";
const passwordsNotMatchingMessage = "Passwords don't match";
const invalidNameMessage = "Invalid name";
const blankPasswordsMessage = "Enter a password";
const successfulRegisterMessage = "Registration successful!";
const alreadyRegisteredMessage = "Email already registered!";

//Error popup and login and register forms
const errorPopup = document.getElementById(errorPopupName);
const loginForm = document.getElementById(loginFormName);
const registerForm = document.getElementById(registerFormName);

function fadeOut() {
    errorPopup.style.display = none;
}

export function showPopup(errorMessage) {
    errorPopup.style.display = visible;
    errorPopupMessage.innerText = errorMessage;
    reenableBackgroundDisableModalMode();
}

export function isValidEmail(email) {
    return emailRegex.test(String(email).toLowerCase());
}

const errorPopupCloseButton = document.getElementById(errorPopupCloseName);
errorPopupCloseButton.addEventListener('click', fadeOut);

const errorPopupXButton = document.getElementById(errorPopupXName);
errorPopupXButton.addEventListener('click', fadeOut);

const errorPopupMessage = document.getElementById(errorPopupMessageName);

//hide login form if you want to register

const loginFormRegisterButton = document.getElementById(registerButtonOnLoginFormName);
loginFormRegisterButton.addEventListener('click', () => {
    loginForm.style.display = none;
    registerForm.style.display = visible;
});

//hide register form if you want to login

const registerButtonLoginForm = document.getElementById(loginButtonOnRegisterFormName);
registerButtonLoginForm.addEventListener('click', () => {
    loginForm.style.display = visible;
    registerForm.style.display = none;
});

//Login Form

//Email field in login form
const emailLoginInput = document.getElementById(loginEmailField);

//Log in button in login form

const passwordLoginInput = document.getElementById(loginPasswordField);
const loginFormLoginButton = document.getElementById(loginButtonOnLoginFormName);
loginFormLoginButton.addEventListener('click', () => {
    if (!isValidEmail(emailLoginInput.value)) {
        showPopup(emailFailRegexCheckMessage);
    } else {
        const jsonString = JSON.stringify({
            email: emailLoginInput.value,
            password: passwordLoginInput.value,
        });

        localStorage.setItem("password", passwordLoginInput.value.toString());
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonString,
        }
    
        fetch("http://localhost:5005/auth/login", requestOptions).then((response) => {
            if (response.status === 400) {
                showPopup(loginErrorMessage);
            } else if (response.status === 200) {
                response.json().then((data) => {
                    const userToken = "Bearer ".concat(data.token);
                    localStorage.setItem('user', userToken);
                    localStorage.setItem('userId', data.userId);
                    loginForm.style.display = none;
                    registerForm.style.display = none;
                    displayHomeScreen();
                });
            }
        }).catch((error) => {
            showPopup(error);
        })
    }
});


//Register form

//email field in the register form
const emailRegisterInput = document.getElementById(registerEmailField);

//name field in the register form
const nameRegisterInput = document.getElementById(registerNameField);

//password field in the register form
const passwordRegisterInput = document.getElementById(registerPasswordFieldName);

//confirm password field in the register form
const passwordConfirmRegisterInput = document.getElementById(registerPasswordConfirmFieldName);

//register button in register form
const registerButtonRegisterForm = document.getElementById(registerButtonOnRegisterFormName);
registerButtonRegisterForm.addEventListener('click', () => { 
    if (!isValidEmail(emailRegisterInput.value)) {
        showPopup(emailFailRegexCheckMessage);
    } else if (nameRegisterInput.value === '') {
        showPopup(invalidNameMessage);
    } else if (passwordConfirmRegisterInput.value != passwordRegisterInput.value) {
        showPopup(passwordsNotMatchingMessage);
    } else if (passwordConfirmRegisterInput.value === '' && passwordRegisterInput.value === '') {
        showPopup(blankPasswordsMessage);
    } else {
        const jsonString = JSON.stringify({
            email: emailRegisterInput.value,
            password: passwordRegisterInput.value,
            name: nameRegisterInput.value,
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonString,
        }
    
        fetch("http://localhost:5005/auth/register", requestOptions).then((response) => {
            if (response.status === 400) {
                showPopup(alreadyRegisteredMessage);
            } else if (response.status === 200) {
                response.json().then((data) => {
                    showPopup(successfulRegisterMessage);
                });
            }
        }).catch((error) => {
            showPopup(error);
        })
    }
});
