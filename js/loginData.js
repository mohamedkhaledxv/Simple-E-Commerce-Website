document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
            window.location.href = 'home.html';
        } else {
            alert('Please put the right data that you have entered in registration form');
        }
    });
});
