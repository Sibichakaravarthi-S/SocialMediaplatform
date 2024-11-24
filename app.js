document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const themeToggle = document.getElementById('theme-toggle');
    const createPostBtn = document.getElementById('create-post-btn');
    const createPostModal = document.getElementById('create-post-modal');
    const closeModal = document.querySelector('.close-modal');
    const postImage = document.getElementById('post-image');
    const previewContainer = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    const postBtn = document.querySelector('.post-btn');
    const toast = document.getElementById('toast');
    const postsContainer = document.querySelector('.posts-container');
    const exploreGrid = document.querySelector('.explore-grid');
    const profileGrid = document.querySelector('.profile-grid');
    // Form and input elements
const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Error message elements
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validation patterns
const usernamePattern = /^[a-zA-Z0-9]{5,15}$/; // Alphanumeric, 5-15 chars
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Valid email pattern
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 1 uppercase, 1 lowercase, 1 number, min 8 chars

// Username validation
function validateUsername() {
    const value = usernameInput.value.trim();
    if (!usernamePattern.test(value)) {
        usernameError.textContent = 'Username must be 5-15 alphanumeric characters.';
        usernameError.style.display = 'block';
        return false;
    }
    usernameError.style.display = 'none';
    return true;
}

// Email validation
function validateEmail() {
    const value = emailInput.value.trim();
    if (!emailPattern.test(value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        return false;
    }
    emailError.style.display = 'none';
    return true;
}

// Password validation
function validatePassword() {
    const value = passwordInput.value.trim();
    if (!passwordPattern.test(value)) {
        passwordError.textContent =
            'Password must have at least 8 characters, including an uppercase letter, a lowercase letter, and a number.';
        passwordError.style.display = 'block';
        return false;
    }
    passwordError.style.display = 'none';
    return true;
}

// Real-time validation
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Form submission handling
form.addEventListener('submit', (event) => {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
        event.preventDefault(); // Prevent submission if validation fails
    } else {
        alert('Form submitted successfully!');
    }
});


    // Sample posts data
    const posts = [
        {
            id: 1,
            username: 'emma_22',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            image: 'https://picsum.photos/600/600?random=1',
            caption: 'Beautiful sunset at the beach! 🌅 #vacation',
            likes: 1234,
            comments: 56
        },
        {
            id: 2,
            username: 'alex_dev',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            image: 'https://picsum.photos/600/600?random=2',
            caption: 'Coding day! 💻 #developer #coding',
            likes: 892,
            comments: 34
        },
        {
            id: 3,
            username: 'sarah_parker',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            image: 'https://picsum.photos/600/600?random=3',
            caption: 'Coffee time ☕️ #morningvibes',
            likes: 2156,
            comments: 78
        }
    ];

    // Navigation handling
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding page
            item.classList.add('active');
            const pageName = item.dataset.page;
            document.getElementById(`${pageName}-page`).classList.add('active');
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Modal handling
    createPostBtn.addEventListener('click', () => {
        createPostModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        createPostModal.style.display = 'none';
        resetPostForm();
    });

    window.addEventListener('click', (e) => {
        if (e.target === createPostModal) {
            createPostModal.style.display = 'none';
            resetPostForm();
        }
    });

    // Image preview
    postImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Post creation
    postBtn.addEventListener('click', () => {
        const caption = document.querySelector('.modal-content textarea').value;
        if (previewImage.src && caption) {
            createNewPost(previewImage.src, caption);
            createPostModal.style.display = 'none';
            showToast('Post uploaded successfully!');
            resetPostForm();
        }
    });

    // Functions
    function createNewPost(imageUrl, caption) {
        const post = {
            id: Date.now(),
            username: 'john_doe',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
            image: imageUrl,
            caption: caption,
            likes: 0,
            comments: 0
        };
        posts.unshift(post);
        renderPosts();
    }

    function renderPosts() {
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-header">
                    <img src="${post.avatar}" alt="${post.username}">
                    <h3>${post.username}</h3>
                </div>
                <img src="${post.image}" alt="Post" class="post-image">
                <div class="post-actions">
                    <button onclick="toggleLike(this)" class="like-btn">
                        <i class="far fa-heart"></i>
                    </button>
                    <button>
                        <i class="far fa-comment"></i>
                    </button>
                    <button>
                        <i class="far fa-paper-plane"></i>
                    </button>
                </div>
                <div class="post-caption">
                    <strong>${post.username}</strong> ${post.caption}
                </div>
                <div class="post-stats">
                    <span>${post.likes} likes</span>
                    <span>${post.comments} comments</span>
                </div>
            </div>
        `).join('');
    }

    function showToast(message) {
        toast.querySelector('span').textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function resetPostForm() {
        previewContainer.classList.add('hidden');
        previewImage.src = '';
        document.querySelector('.modal-content textarea').value = '';
        postImage.value = '';
    }

    // Initialize exploration grid
    function initializeExploreGrid() {
        const exploreItems = Array.from({ length: 9 }, (_, i) => ({
            image: `https://picsum.photos/300/300?random=${i + 4}`
        }));

        exploreGrid.innerHTML = exploreItems.map(item => `
            <div class="explore-item">
                <img src="${item.image}" alt="Explore">
            </div>
        `).join('');
    }

    // Initialize profile grid
    function initializeProfileGrid() {
        const profilePosts = Array.from({ length: 6 }, (_, i) => ({
            image: `https://picsum.photos/300/300?random=${i + 13}`
        }));

        profileGrid.innerHTML = profilePosts.map(post => `
            <div class="profile-post">
                <img src="${post.image}" alt="Profile post">
            </div>
        `).join('');
    }

    // Like functionality
    window.toggleLike = function(button) {
        const icon = button.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.classList.toggle('text-red-500');
    };

    // Initialize the app
    renderPosts();
    initializeExploreGrid();
    initializeProfileGrid();
});
