function showHome() {
    hideAllSections();
    document.getElementById('home-section').style.display = 'block';
}

function showLogin() {
    hideAllSections();
    document.getElementById('login-section').style.display = 'block';
}

function showSignup() {
    hideAllSections();
    document.getElementById('signup-section').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
}

function login(event) {
    event.preventDefault(); // Prevent form submission (for demonstration purposes)
    // Add your login logic here
    console.log('Login clicked!');
}

function signup(event) {
    event.preventDefault(); // Prevent form submission (for demonstration purposes)
    // Add your signup logic here
    console.log('Signup clicked!');
}

function logout() {
    // Add your logout logic here
    console.log('Logout clicked!');
}


