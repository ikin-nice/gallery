// 初始化 AOS 動畫
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200,
        disable: 'mobile' // 在手機版停用動畫以提升效能
    });
});

// 響應式選單功能
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 點擊選單項目後關閉選單
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 平滑滾動功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 表單驗證函數
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    formGroup.classList.remove('error');
}

// 聯絡表單提交處理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => removeError(input));
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // 驗證姓名
        if (!name.value.trim()) {
            showError(name, '請輸入您的姓名');
            isValid = false;
        }

        // 驗證電子郵件
        if (!email.value.trim()) {
            showError(email, '請輸入電子郵件');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, '請輸入有效的電子郵件地址');
            isValid = false;
        }

        // 驗證訊息
        if (!message.value.trim()) {
            showError(message, '請輸入您的訊息');
            isValid = false;
        }

        if (isValid) {
            // 如果驗證通過，可以在這裡處理表單提交
            alert('表單提交成功！');
            contactForm.reset();
        }
    });
}

// 滾動時改變導覽列樣式
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(40, 44, 52, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// 作品集篩選功能
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按鈕狀態
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === category) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// Lightbox 功能
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// 為每個作品項目添加點擊事件
workItems.forEach(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const desc = item.querySelector('p').textContent;

    item.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = `${title} - ${desc}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景捲動
    });
});

// 關閉 Lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// 捲動進度指示器
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// 優化作品集篩選動畫
workItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
});

// 當作品項目進入視窗時顯示
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

workItems.forEach(item => {
    observer.observe(item);
});

// 主題切換功能
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 檢查本地儲存的主題設定
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
} else {
    // 如果沒有儲存的主題，則使用系統預設
    const theme = prefersDarkScheme.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// 切換主題
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 更新導覽列背景色（如果在頁面頂部）
    if (window.scrollY <= 50) {
        navbar.style.background = newTheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(40, 44, 52, 0.95)';
    }
});

// 自訂主題設定功能
const defaultTheme = {
    '--primary-color': '#282c34',
    '--secondary-color': '#61afef',
    '--text-color': '#abb2bf',
    '--light-color': '#21252b',
    '--accent-color': '#98c379',
    '--border-color': '#3e4451',
    '--hover-color': '#3e4451',
    '--bg-color': '#282c34',
    '--card-bg': '#21252b'
};

const lightTheme = {
    '--primary-color': '#ffffff',
    '--secondary-color': '#2973af',
    '--text-color': '#333333',
    '--light-color': '#f5f5f5',
    '--accent-color': '#4a9d4f',
    '--border-color': '#dddddd',
    '--hover-color': '#eeeeee',
    '--bg-color': '#ffffff',
    '--card-bg': '#f5f5f5'
};

// 載入已儲存的自訂主題
function loadCustomTheme() {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        Object.entries(theme).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
            const input = document.querySelector(`input[data-var="${variable}"]`);
            if (input) input.value = value;
        });
    }
}

// 更新主題色彩
function updateThemeColor(variable, value) {
    document.documentElement.style.setProperty(variable, value);
    const currentTheme = JSON.parse(localStorage.getItem('customTheme') || '{}');
    currentTheme[variable] = value;
    localStorage.setItem('customTheme', JSON.stringify(currentTheme));
}

// 重置主題
function resetTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const baseTheme = currentTheme === 'light' ? lightTheme : defaultTheme;
    
    Object.entries(baseTheme).forEach(([variable, value]) => {
        document.documentElement.style.setProperty(variable, value);
        const input = document.querySelector(`input[data-var="${variable}"]`);
        if (input) input.value = value;
    });
    
    localStorage.removeItem('customTheme');
}

// 主題設定面板控制
const themeSettingsToggle = document.querySelector('.theme-settings-toggle');
const themeSettingsPanel = document.querySelector('.theme-settings-panel');
const colorInputs = document.querySelectorAll('.color-picker input[type="color"]');
const resetThemeButton = document.querySelector('.reset-theme');

// 初始化顏色選擇器的值
function initializeColorPickers() {
    colorInputs.forEach(input => {
        const variable = input.getAttribute('data-var');
        const computedStyle = getComputedStyle(document.documentElement);
        input.value = computedStyle.getPropertyValue(variable).trim() || defaultTheme[variable];
    });
}

// 顯示/隱藏主題設定面板
themeSettingsToggle.addEventListener('click', () => {
    themeSettingsPanel.classList.toggle('active');
});

// 點擊面板外關閉面板
document.addEventListener('click', (e) => {
    if (!themeSettingsPanel.contains(e.target) && 
        !themeSettingsToggle.contains(e.target)) {
        themeSettingsPanel.classList.remove('active');
    }
});

// 監聽顏色選擇器變更
colorInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        updateThemeColor(e.target.dataset.var, e.target.value);
    });
});

// 重置主題按鈕
resetThemeButton.addEventListener('click', resetTheme);

// 載入主題設定
document.addEventListener('DOMContentLoaded', () => {
    // 初始化顏色選擇器
    initializeColorPickers();
    // 載入已儲存的自訂主題
    loadCustomTheme();
    
    // 其他既有的 DOMContentLoaded 事件處理...
    // 初始化 AOS 動畫
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200,
        disable: 'mobile' // 在手機版停用動畫以提升效能
    });
    
    // 響應式選單功能
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 點擊選單項目後關閉選單
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // 平滑滾動功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表單驗證函數
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        formGroup.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        formGroup.classList.remove('error');
    }
    
    // 聯絡表單提交處理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => removeError(input));
        });
    
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
    
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
    
            // 驗證姓名
            if (!name.value.trim()) {
                showError(name, '請輸入您的姓名');
                isValid = false;
            }
    
            // 驗證電子郵件
            if (!email.value.trim()) {
                showError(email, '請輸入電子郵件');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError(email, '請輸入有效的電子郵件地址');
                isValid = false;
            }
    
            // 驗證訊息
            if (!message.value.trim()) {
                showError(message, '請輸入您的訊息');
                isValid = false;
            }
    
            if (isValid) {
                // 如果驗證通過，可以在這裡處理表單提交
                alert('表單提交成功！');
                contactForm.reset();
            }
        });
    }
    
    // 滾动時改變導覽列樣式
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 50) {
            navbar.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(40, 44, 52, 0.95)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 作品集篩選功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按鈕狀態
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
    
            const filterValue = button.getAttribute('data-filter');
    
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });
    
    // Lightbox 功能
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // 為每個作品項目添加點擊事件
    workItems.forEach(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
    
        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} - ${desc}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景捲動
        });
    });
    
    // 關閉 Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 捲動進度指示器
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });
    
    // 優化作品集篩選動畫
    workItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    // 當作品項目進入視窗時顯示
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    workItems.forEach(item => {
        observer.observe(item);
    });
    
    // 主題切換功能
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 檢查本地儲存的主題設定
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
        // 如果沒有儲存的主題，則使用系統預設
        const theme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // 切換主題
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    
        // 更新導覽列背景色（如果在頁面頂部）
        if (window.scrollY <= 50) {
            navbar.style.background = newTheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(40, 44, 52, 0.95)';
        }
    });
    
    // 自訂主題設定功能
    const defaultTheme = {
        '--primary-color': '#282c34',
        '--secondary-color': '#61afef',
        '--text-color': '#abb2bf',
        '--light-color': '#21252b',
        '--accent-color': '#98c379',
        '--border-color': '#3e4451',
        '--hover-color': '#3e4451',
        '--bg-color': '#282c34',
        '--card-bg': '#21252b'
    };
    
    const lightTheme = {
        '--primary-color': '#ffffff',
        '--secondary-color': '#2973af',
        '--text-color': '#333333',
        '--light-color': '#f5f5f5',
        '--accent-color': '#4a9d4f',
        '--border-color': '#dddddd',
        '--hover-color': '#eeeeee',
        '--bg-color': '#ffffff',
        '--card-bg': '#f5f5f5'
    };
    
    // 載入已儲存的自訂主題
    function loadCustomTheme() {
        const savedTheme = localStorage.getItem('customTheme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            Object.entries(theme).forEach(([variable, value]) => {
                document.documentElement.style.setProperty(variable, value);
                const input = document.querySelector(`input[data-var="${variable}"]`);
                if (input) input.value = value;
            });
        }
    }
    
    // 更新主題色彩
    function updateThemeColor(variable, value) {
        document.documentElement.style.setProperty(variable, value);
        const currentTheme = JSON.parse(localStorage.getItem('customTheme') || '{}');
        currentTheme[variable] = value;
        localStorage.setItem('customTheme', JSON.stringify(currentTheme));
    }
    
    // 重置主題
    function resetTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const baseTheme = currentTheme === 'light' ? lightTheme : defaultTheme;
        
        Object.entries(baseTheme).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
            const input = document.querySelector(`input[data-var="${variable}"]`);
            if (input) input.value = value;
        });
        
        localStorage.removeItem('customTheme');
    }
    
    // 主題設定面板控制
    const themeSettingsToggle = document.querySelector('.theme-settings-toggle');
    const themeSettingsPanel = document.querySelector('.theme-settings-panel');
    const colorInputs = document.querySelectorAll('.color-picker input[type="color"]');
    const resetThemeButton = document.querySelector('.reset-theme');
    
    // 初始化顏色選擇器的值
    function initializeColorPickers() {
        colorInputs.forEach(input => {
            const variable = input.getAttribute('data-var');
            const computedStyle = getComputedStyle(document.documentElement);
            input.value = computedStyle.getPropertyValue(variable).trim() || defaultTheme[variable];
        });
    }
    
    // 顯示/隱藏主題設定面板
    themeSettingsToggle.addEventListener('click', () => {
        themeSettingsPanel.classList.toggle('active');
    });
    
    // 點擊面板外關閉面板
    document.addEventListener('click', (e) => {
        if (!themeSettingsPanel.contains(e.target) && 
            !themeSettingsToggle.contains(e.target)) {
            themeSettingsPanel.classList.remove('active');
        }
    });
    
    // 監聽顏色選擇器變更
    colorInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            updateThemeColor(e.target.dataset.var, e.target.value);
        });
    });
    
    // 重置主題按鈕
    resetThemeButton.addEventListener('click', resetTheme);
    
    // 載入主題設定
    document.addEventListener('DOMContentLoaded', () => {
        // 初始化顏色選擇器
        initializeColorPickers();
        // 載入已儲存的自訂主題
        loadCustomTheme();
        
        // 其他既有的 DOMContentLoaded 事件處理...
        // ...existing code...
    });
});

// 語言切換功能
const langButtons = document.querySelectorAll('.lang-btn');
const currentLang = localStorage.getItem('language') || 'zh-tw';
let translations;

// 根據語言代碼取得對應的翻譯
function getTranslations(lang) {
    switch(lang) {
        case 'zh-tw':
            return zhTW;
        case 'en-us':
            return enUS;
        case 'ja-jp':
            return jaJP;
        case 'ko-kr':
            return koKR;
        default:
            return zhTW;
    }
}

// 初始化語言
function initLanguage() {
    document.documentElement.lang = currentLang;
    translations = getTranslations(currentLang);
    updateLanguageButtons();
    updateContent();
}

// 更新語言按鈕狀態
function updateLanguageButtons() {
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// 更新頁面內容
function updateContent() {
    // 導覽列
    document.querySelector('.nav-links li:nth-child(1) a').textContent = translations.nav.home;
    document.querySelector('.nav-links li:nth-child(2) a').textContent = translations.nav.about;
    document.querySelector('.nav-links li:nth-child(3) a').textContent = translations.nav.works;
    document.querySelector('.nav-links li:nth-child(4) a').textContent = translations.nav.contact;

    // Hero 區塊
    document.querySelector('.hero h1').textContent = translations.hero.title;
    document.querySelector('.hero p').textContent = translations.hero.subtitle;
    document.querySelector('.hero .cta-btn').textContent = translations.hero.cta;

    // About 區塊
    document.querySelector('#about h2').textContent = translations.about.title;
    document.querySelector('#about p').textContent = translations.about.description;

    // Works 區塊
    document.querySelector('#works h2').textContent = translations.works.title;
    document.querySelector('#works p').textContent = translations.works.description;

    // Contact 區塊
    document.querySelector('#contact h2').textContent = translations.contact.title;
    document.querySelector('#contact [name="name"]').placeholder = translations.contact.name;
    document.querySelector('#contact [name="email"]').placeholder = translations.contact.email;
    document.querySelector('#contact [name="message"]').placeholder = translations.contact.message;
    document.querySelector('#contact button[type="submit"]').textContent = translations.contact.submit;
}

// 監聽語言切換按鈕
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        if (newLang !== currentLang) {
            localStorage.setItem('language', newLang);
            document.documentElement.lang = newLang;
            translations = getTranslations(newLang);
            updateLanguageButtons();
            updateContent();
        }
    });
});

// 頁面載入時初始化語言
document.addEventListener('DOMContentLoaded', initLanguage);