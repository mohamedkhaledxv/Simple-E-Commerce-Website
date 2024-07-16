document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        saveRegistrationData(name, email, password, phone);
        window.location.href = 'login.html';
    });
});

function saveRegistrationData(name, email, password, phone) {
    const userData = {
        name: name,
        email: email,
        password: password,
        phone: phone
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}

function validateEmail(email) {
    const regexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexStr.test(email);
}

function validatePhone(phone) {
    const regexStr = /^\d{11}$/;
    return regexStr.test(phone);
}