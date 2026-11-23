'use strict';

const VARIANT = 20;
const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;
const MODAL_DELAY_MS = 60 * 1000; // 1 хвилина
const MODAL_DISMISSED_KEY = 'contactModalDismissed';

// 1. Збір та збереження системної інформації
function collectSystemInfo() {
    const nav = window.navigator;
    const uaData = nav.userAgentData;
    const info = {
        userAgent: nav.userAgent,
        platform: nav.platform,
        vendor: nav.vendor,
        language: nav.language,
        languages: (nav.languages || []).join(', '),
        cookieEnabled: nav.cookieEnabled,
        online: nav.onLine,
        hardwareConcurrency: nav.hardwareConcurrency,
        deviceMemory: nav.deviceMemory,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    if (uaData) {
        info.uaPlatform = uaData.platform;
        info.uaMobile = uaData.mobile;
        info.uaBrands = uaData.brands.map((b) => `${b.brand} ${b.version}`).join(', ');
    }
    return info;
}

function saveSystemInfo(info) {
    try {
        Object.entries(info).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return;
            const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
            localStorage.setItem(key, text);
        });
    } catch (error) {
        console.warn('Помилка localStorage:', error);
    }
}

function renderStorageInfo() {
    const list = document.getElementById('storage-info');
    if (!list) return;
    list.replaceChildren();
    try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        keys.sort();
        keys.forEach((key) => {
            const dt = document.createElement('dt');
            dt.textContent = key;
            const dd = document.createElement('dd');
            dd.textContent = localStorage.getItem(key);
            list.append(dt, dd);
        });
    } catch {
        list.textContent = 'localStorage недоступний.';
    }
}

// 2. Отримання відгуків з сервера
function createCommentCard(comment) {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.marginBottom = '10px';

    const name = document.createElement('h3');
    name.textContent = comment.name;

    const email = document.createElement('span');
    email.style.color = 'var(--muted)';
    email.style.fontSize = '0.85rem';
    email.textContent = comment.email;

    const body = document.createElement('p');
    body.textContent = comment.body;

    card.append(name, email, body);
    return card;
}

async function loadComments() {
    const status = document.getElementById('reviews-status');
    const list = document.getElementById('reviews-list');
    if (!list) return;

    try {
        const response = await fetch(COMMENTS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const comments = await response.json();
        
        comments.forEach((comment) => list.append(createCommentCard(comment)));
        if (status) status.hidden = true;
    } catch (error) {
        if (status) status.textContent = `Не вдалося завантажити відгуки (${error.message}).`;
    }
}

// 3. Модальне вікно
function initContactModal() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    const closeButton = document.getElementById('modal-close');
    const form = modal.querySelector('form');

    function openModal() {
        modal.hidden = false;
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.hidden = true;
        sessionStorage.setItem(MODAL_DISMISSED_KEY, '1');
    }

    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (form) form.addEventListener('submit', () => sessionStorage.setItem(MODAL_DISMISSED_KEY, '1'));

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) closeModal();
    });

    if (sessionStorage.getItem(MODAL_DISMISSED_KEY) !== '1') {
        setTimeout(openModal, MODAL_DELAY_MS);
    }
}

// 4. Перемикач тем за часом
function getThemeByTime() {
    const hours = new Date().getHours();
    return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.textContent = theme === 'dark' ? 'Світла тема' : 'Темна тема';
    }
}

function initTheme() {
    let autoTheme = getThemeByTime();
    applyTheme(autoTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.dataset.theme;
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    setInterval(() => {
        const nextAutoTheme = getThemeByTime();
        if (nextAutoTheme !== autoTheme) {
            autoTheme = nextAutoTheme;
            applyTheme(autoTheme);
        }
    }, 60000);
}

// Ініціалізація
initTheme();
saveSystemInfo(collectSystemInfo());
renderStorageInfo();
loadComments();
initContactModal();