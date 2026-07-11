 const form = document.getElementById('signup-form');
const successMsg = document.getElementById('successMsg');

const fields = {
    name: {
        input: document.querySelector('#name'),
        error: document.querySelector('#name-error'),
        validate: (value) => value.trim().length >= 3 ? "" : "Username must be at least 3 characters long"
    },
    email: {
        input: document.querySelector('#email'),
        error: document.querySelector('#email-error'),
        validate: (value) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value.trim()) ? "" : "Please enter a valid email address";
        }
    },
    password: {
        input: document.querySelector('#password'),
        error: document.querySelector('#password-error'),
        validate: (value) => {
            const trimmedValue = value.trim();
            const hasNumber = /\d/.test(trimmedValue);
            const hasSpecialChar = /[^A-Za-z0-9]/.test(trimmedValue);

            if (trimmedValue.length < 6) {
                return "Password must be at least 6 characters long";
            }
            if (!hasNumber) {
                return "Password must include at least one number";
            }
            if (!hasSpecialChar) {
                return "Password must include at least one special character";
            }
            return "";
        }
    },
    confirmPassword: {
        input: document.querySelector('#confirm-password'),
        error: document.querySelector('#confirm-password-error'),
        validate: (value) => {
            const password = fields.password.input.value;
            return value === password ? "" : "Passwords do not match";
        }
    }
};

function validateField(key) {
    const field = fields[key];
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    field.input.classList.remove('valid', 'invalid');
    field.input.classList.add(message ? 'invalid' : 'valid');

    return message === '';
}

Object.keys(fields).forEach((key) => {
    const field = fields[key];
    field.input.addEventListener('input', () => validateField(key));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const allValid = results.every((result) => result === true);

    if (allValid) {
        successMsg.style.display = 'block';
        form.reset();

        Object.values(fields).forEach((field) => field.input.classList.remove('valid', 'invalid'));
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
});