document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            const users = Storage.getUsers();
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                Storage.setCurrentUser({ username: user.username, role: user.role });
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("regUsername").value;
            const password = document.getElementById("regPassword").value;
            const role = document.getElementById("regRole").value;
            
            const users = Storage.getUsers();
            if (users.find(u => u.username === username)) {
                alert("Username already exists! Please choose another.");
                return;
            }
            
            users.push({ username, password, role });
            Storage.setUsers(users);
            
            alert("Signup successful! You can now login.");
            toggleAuthMode("login");
        });
    }

    const path = window.location.pathname;
    const isPublicPage = path.endsWith("login.html") || path.endsWith("index.html") || path === "/" || path.endsWith("search.html") || path.endsWith("pnr.html");
    const user = Storage.getCurrentUser();

    if (!user && !isPublicPage) {
        window.location.href = "login.html";
    }


    if (path.endsWith("admin.html")) {
        if (!user || user.role !== "Admin") {
            alert("Access Denied: Admins Only");
            window.location.href = "index.html";
        }
    }


    const adminLinks = document.querySelectorAll('a[href="admin.html"]');
    if (user && user.role !== "Admin") {
        adminLinks.forEach(link => link.style.display = "none");
    } else if (!user) {
        adminLinks.forEach(link => link.style.display = "none");
    }
});

function logout() {
    Storage.logout();
    window.location.href = "index.html";
}

function toggleAuthMode(mode) {
    if (mode === 'signup') {
        document.getElementById('loginCard').style.display = 'none';
        document.getElementById('signupCard').style.display = 'block';
    } else {
        document.getElementById('signupCard').style.display = 'none';
        document.getElementById('loginCard').style.display = 'block';
    }
}
