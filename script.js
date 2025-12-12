window.showSection = function (sectionId) {
    const allSections = document.querySelectorAll('.info-section');
    const selected = document.getElementById(sectionId);

    if (!selected) return;

    
    allSections.forEach(sec => sec.classList.add('hidden'));

    
    selected.classList.remove('hidden');

    
    selected.scrollIntoView({ behavior: "smooth" });
};


const searchBtn = document.querySelector('.search-btn');
const dropdown = document.getElementById('facultyDropdown');

if (searchBtn && dropdown) {
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        const clickedInside = dropdown.contains(event.target);
        const clickedBtn = searchBtn.contains(event.target);

        if (!clickedInside && !clickedBtn) {
            dropdown.classList.add('hidden');
        }
    });
}

const faculties = [
    { name: "Faculty of Computing Engineering and Technology (FaCET)", code: "FCET" },
    { name: "Faculty of Criminal Justice Education (FCJE)", code: "CRIM" },
    { name: "Faculty of Agriculture & Life Sciences (FALS)", code: "FALS" },
    { name: "Faculty of Teacher Education (FTED)", code: "FTED" },
    { name: "Faculty of Nursing & Allied Health Sciences (FNAHS)", code: "NURSING" },
    { name: "Faculty of Humanities, Social Sciences and Communication (FHuSoCom)", code: "FHSSC" },
    { name: "Faculty of Business & Management (FBM)", code: "FGBM" }
];

const searchInput = document.querySelector(".search-input");
if (searchInput && dropdown) {
    const listItems = dropdown.querySelectorAll("li");

    
    searchInput.addEventListener("input", () => {
        let value = searchInput.value.toLowerCase();
        dropdown.classList.remove("hidden");

        listItems.forEach((li, index) => {
            let text = li.innerText.toLowerCase();
            li.style.display = text.includes(value) ? "flex" : "none";
        });
    });

    
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search-container") &&
            !event.target.closest("#facultyDropdown")) {
            dropdown.classList.add("hidden");
        }
    });

    
    listItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const faculty = faculties[index];
            window.location.href = `faculty.html?img=${faculty.code}`;
        });
    });
}

const loginBtn = document.querySelector('.login-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

if (loginBtn && emailInput && passwordInput) {
    loginBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

        try {
            localStorage.setItem('currentUser', JSON.stringify({ email }));
        } catch (e) {
            console.warn('Failed to save currentUser', e);
        }

        alert('Login successful! Redirecting...');
        window.location.href = 'dashboard.html';
    });
}

const registerBtn = document.getElementById('registerBtn');
const regEmail = document.getElementById('regEmail');
const regPass = document.getElementById('regPass');

if (registerBtn && regEmail && regPass) {
    registerBtn.addEventListener('click', () => {
        const email = regEmail.value.trim();
        const password = regPass.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const newUser = { email, password };
        localStorage.setItem("userAccount", JSON.stringify(newUser));

        alert("Account created successfully!");
        window.location.href = "index.html";
    });
}

function simulateSocialLogin(provider) {
    const ts = Date.now();
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    const user = {
        name: `${providerName} User`,
        email: `${provider}_${ts}@example.com`,
        provider: provider
    };

    try {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (e) {
        console.warn('Failed to save currentUser for social login', e);
    }

    alert(`Logged in with ${providerName}. Redirecting...`);
    window.location.href = 'dashboard.html';
}

document.querySelectorAll('.social-icon').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        
        const classes = Array.from(e.currentTarget.classList);
        const providers = ['instagram','twitter','google','skype'];
        const found = providers.find(p => classes.includes(p));
        simulateSocialLogin(found || 'social');
    });
});
