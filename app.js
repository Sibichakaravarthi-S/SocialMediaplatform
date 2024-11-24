// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const themeToggle = document.getElementById('theme-toggle');
const createPostBtn = document.getElementById('create-post-btn');
const createPostModal = document.getElementById('create-post-modal');
const closeModal = document.querySelector('.close-modal');
const storyList = document.querySelector('.story-list');
const postsContainer = document.querySelector('.posts-container');
const exploreGrid = document.querySelector('.explore-grid');
const messagesList = document.querySelector('.messages-list');

// Sample Data
const posts = [
    {
        id: 1,
        username: 'john_doe',
        avatar: 'https://via.placeholder.com/32',
        image: 'https://via.placeholder.com/600',
        likes: 1234,
        comments: 56,
        caption: 'Beautiful day! ☀️ #coding #webdev'
    },
    {
        id: 2,
        username: 'jane_smith',
        avatar: 'https://via.placeholder.com/32',
        image: 'https://via.placeholder.com/600',
        likes: 892,
        comments: 43,
        caption: 'Working on a new project 💻 #javascript'
    }
];

const stories = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    avatar: 'https://via.placeholder.com/66'
}));

const messages = [
    {
        id: 1,
        username: 'sarah_parker',
        avatar: 'https://via.placeholder.com/48',
        lastMessage: 'Hey, great work on the new design!',
        time: '2m ago',
        unread: true
    },
    {
        id: 2,
        username: 'mike_wilson',
        avatar: 'https://via.placeholder.com/48',
        lastMessage: 'When are you available for a meeting?',
        time: '1h ago',
        unread: false
    }
];

// Navigation Functions
function switchPage(pageId) {
    // Remove active class from all pages and nav items
    pages.forEach(page => page.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to selected page and nav item
    document.getElementById(`${pageId}-page`).classList.add('active');
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
}

// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Modal Functions
function openModal() {
    createPostModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    createPostModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Render Functions
function renderStories() {
    storyList.innerHTML = stories.map(story => `
        <div class="story-item">
            <div class="story-avatar">
                <img src="${story.avatar}" alt="${story.username}">
            </div>
            <span class="story-username">${story.username}</span>
        </div>
    `).join('');
}

function renderPosts() {
    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.username}" class="post-avatar">
                <span class="post-username">${post.username}</span>
            </div>
            <img src="${post.image}" alt="Post" class="post-image">
            <div class="post-actions">
                <div class="action-buttons">
                    <button class="action-btn like-btn">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn">
                        <i class="far fa-comment"></i>
                    </button>
                    <button class="action-btn">
                        <i class="far fa-paper-plane"></i>
                    </button>
                </div>
                <div class="post-likes">${post.likes.toLocaleString()} likes</div>
                <div class="post-caption">
                    <span class="post-username">${post.username}</span>
                    ${post.caption}
                </div>
                <div class="post-comments">
                    View all ${post.comments} comments
                </div>
            </div>
        </div>
    `).join('');
}

function renderExplore() {
    const exploreItems = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        image: `https://via.placeholder.com/300`
    }));

    exploreGrid.innerHTML = exploreItems.map(item => `
        <div class="explore-item">
            <img src="${item.image}" alt="Explore ${item.id}">
        </div>
    `).join('');
}

function renderMessages() {
    messagesList.innerHTML = messages.map(message => `
        <div class="message-item ${message.unread ? 'unread' : ''}">
            <img src="${message.avatar}" alt="${message.username}" class="message-avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${message.username}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <div class="message-text">${message.lastMessage}</div>
            </div>
        </div>
    `).join('');
}

// Like Button Function
function handleLike(button) {
    button.classList.toggle('liked');
    const icon = button.querySelector('i');
    icon.classList.toggle('fas');
    icon.classList.toggle('far');
}

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        switchPage(pageId);
    });
});

themeToggle.addEventListener('click', toggleTheme);
createPostBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === createPostModal) {
        closeModalFunc();
    }
});

// Like button event delegation
document.addEventListener('click', (e) => {
    if (e.target.closest('.like-btn')) {
        handleLike(e.target.closest('.like-btn'));
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Render initial content
    renderStories();
    renderPosts();
    renderExplore();
    renderMessages();

    // Set initial page
    switchPage('home');
});

// Handle image upload preview
const postImage = document.getElementById('post-image');
postImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('img');
            preview.src = e.target.result;
            preview.className = 'upload-preview';
            const container = document.querySelector('.upload-container');
            const existingPreview = container.querySelector('.upload-preview');
            if (existingPreview) {
                container.removeChild(existingPreview);
            }
            container.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }
});

// Add lazy loading to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add double-tap like feature for posts
let lastTap = 0;
document.addEventListener('touchend', (e) => {
    const postImage = e.target.closest('.post-image');
    if (postImage) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            const post = postImage.closest('.post-card');
            const likeBtn = post.querySelector('.like-btn');
            if (!likeBtn.classList.contains('liked')) {
                handleLike(likeBtn);
            }
        }
        lastTap = currentTime;
    }
});
