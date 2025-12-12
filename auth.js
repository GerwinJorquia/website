const registerBtn = document.getElementById('registerBtn');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPass').value.trim();

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        if (localStorage.getItem(email)) {
            alert("Email already registered!");
            return;
        }

        localStorage.setItem(email, password);

        alert("Registration successful!");
        window.location.href = "index.html";
    });
}

const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

        const storedPass = localStorage.getItem(email);

        if (!storedPass) {
            alert("Email is not registered.");
            return;
        }

        if (password === storedPass) {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Incorrect password.");
        }
    });
}
