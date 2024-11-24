// Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const loginPage = document.getElementById('loginPage');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Event Listeners
loginBtn.addEventListener('click', () => showForm('login'));
signupBtn.addEventListener('click', () => showForm('signup'));

document.getElementById('userLoginForm').addEventListener('submit', handleLogin);
document.getElementById('userSignupForm').addEventListener('submit', handleSignup);

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Post form handling
document.getElementById('postForm')?.addEventListener('submit', handlePostSubmit);

// Form Display Functions
function showForm(type) {
    loginPage.classList.add('hidden');
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    
    if (type === 'login') {
        loginForm.classList.remove('hidden');
    } else {
        signupForm.classList.remove('hidden');
    }
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showDashboard();
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login.');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Signup successful! Please login.');
            showForm('login');
        } else {
            alert('Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup.');
    }
}

// Dashboard Functions
function showDashboard() {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadPosts();
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(`${tabName}Section`).classList.remove('hidden');
    
    if (tabName === 'watch') {
        loadPosts();
    }
}

// Post Functions
async function handlePostSubmit(e) {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (response.ok) {
            document.getElementById('postContent').value = '';
            document.getElementById('imageUpload').value = '';
            alert('Post created successfully!');
            loadPosts();
        } else {
            alert('Failed to create post.');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert('An error occurred while creating the post.');
    }
}

async function loadPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const posts = await response.json();
            displayPosts(posts);
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

function displayPosts(posts) {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
            <p class="post-meta">Posted by ${post.username}</p>
        `;
        container.appendChild(postElement);
    });
}

// Initialize app
function init() {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    }
}

init();