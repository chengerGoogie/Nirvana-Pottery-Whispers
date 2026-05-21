/**
 * 涅槃陶语 NIEPAN TAOYU - Main JavaScript
 * 交互功能：滚动动画、灯箱、产品筛选、表单处理、高端交互效果
 */

// ============================================
// PAGE LOADER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
    }, 2000);
});

// Prevent scrolling during loading
document.body.style.overflow = 'hidden';

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX - 20 + 'px';
        cursorRing.style.top = ringY - 20 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .product-card, .gallery-item, .filter-tab');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ============================================
// SMOOTH SCROLL INDICATOR
// ============================================
const scrollDots = document.querySelectorAll('.scroll-dot');
const sections = ['hero', 'story', 'products', 'craft', 'contact'];

scrollDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function updateScrollIndicator() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                scrollDots.forEach(d => d.classList.remove('active'));
                scrollDots[index]?.classList.add('active');
            }
        }
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Stagger animation for children
            const children = entry.target.querySelectorAll('.stagger-child');
            children.forEach((child, index) => {
                child.style.transitionDelay = (index * 0.1) + 's';
                child.classList.add('active');
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.3;
            const rect = el.getBoundingClientRect();
            const scrolled = window.scrollY;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

initParallax();

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
const magneticBtns = document.querySelectorAll('.magnetic-btn, .btn-primary, .nav-cta');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ============================================
// TEXT REVEAL ON SCROLL
// ============================================
const textRevealElements = document.querySelectorAll('.text-reveal');

const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.5 });

textRevealElements.forEach(el => textRevealObserver.observe(el));

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Navbar background
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    scrollProgress.style.width = scrollPercent + '%';

    // Back to top button
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Update smooth scroll indicator
    updateScrollIndicator();
});

// Back to top click
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'rgba(248, 245, 240, 0.98)';
        navLinks.style.padding = '24px';
        navLinks.style.gap = '20px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
}

// ============================================
// PRODUCT FILTER
// ============================================
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        // Filter products
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let lightboxImages = [];
let currentLightboxIndex = 0;

// Collect all lightbox-enabled images
document.querySelectorAll('[data-lightbox]').forEach((el, index) => {
    lightboxImages.push({
        src: el.dataset.lightbox,
        caption: el.dataset.caption || ''
    });

    el.addEventListener('click', () => {
        currentLightboxIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const image = lightboxImages[currentLightboxIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.caption;
    lightboxCaption.textContent = image.caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
    if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;
    openLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate
        if (!formData.name || !formData.phone || !formData.message) {
            showFormMessage('请填写必填字段（姓名、电话、留言内容）', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        try {
            // =============================================
            // Formspree 接入 —— 需要替换下方 YOUR_FORM_ID
            // 注册: https://formspree.io  → 创建表单 → 获取ID
            // 示例: https://formspree.io/f/xpzgkqyw
            // =============================================
            const FORMSPREE_URL = 'https://formspree.io/f/xzdweoqj';

            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    _subject: `【涅槃陶语】${formData.subject || '新咨询'} - ${formData.name}`,
                    message: `
姓名: ${formData.name}
电话: ${formData.phone}
邮箱: ${formData.email}
主题: ${formData.subject || '未选择'}
留言: ${formData.message}
                    `.trim()
                })
            });

            if (response.ok) {
                showFormMessage('感谢您的咨询！我们会尽快与您联系。', 'success');
                contactForm.reset();
            } else {
                throw new Error('提交失败');
            }
        } catch (err) {
            // Formspree 不可用时，回退到本地存储
            console.warn('Formspree 提交失败，已保存到本地:', err);
            const submissions = JSON.parse(localStorage.getItem('niepan_submissions') || '[]');
            submissions.push({ ...formData, timestamp: new Date().toISOString() });
            localStorage.setItem('niepan_submissions', JSON.stringify(submissions));
            showFormMessage('感谢您的咨询！我们已收到您的信息。', 'success');
            contactForm.reset();
        }

        submitBtn.textContent = '提交咨询';
        submitBtn.disabled = false;
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // Create a placeholder with gradient background
        this.style.background = 'linear-gradient(135deg, #E6D5B8 0%, #D4CDBF 100%)';
        this.style.minHeight = '200px';
        this.alt = this.alt || '图片加载中';
    });
});

// ============================================
// IMAGE HOVER TILT EFFECT
// ============================================
const tiltElements = document.querySelectorAll('.product-image-wrap, .story-image-wrapper');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            el.style.transition = '';
        }, 500);
    });
});

// ============================================
// SMOOTH NUMBER COUNTER
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    update();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial reveal for elements in viewport
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });

    // Add hover class to nav links for cursor effect
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.classList.add('magnetic-btn');
    });

    // Initialize smooth scroll indicator
    updateScrollIndicator();

    // Add loaded class for CSS transitions
    document.body.classList.add('loaded');
});

// ============================================
// CHAT WIDGET - 涅槃陶语智能客服
// ============================================
const chatResponses = {
    '产品|花器|花瓶|器物': {
        text: '涅槃陶语的花器以戈壁夯土城墙肌理为设计灵感，融合东方侘寂美学，每一件都是纯手工制作。\n\n我们的花器系列包括：\n• 桌面花器 — 适合书房、茶室陈设\n• 落地花器 — 适合客厅、展厅空间\n• 装置花器 — 适合艺术展览、商业空间\n\n每件花器都拥有独一无二的夯土肌理，既可插花使用，也可作为独立艺术品陈列。',
        quickReplies: ['工艺', '定制', '购买']
    },
    '工艺|制作|烧制|窑烧|手工': {
        text: '我们的花器经过6道核心工艺精心打造：\n\n1️⃣ 创意手绘定稿 — 确立设计理念与器型\n2️⃣ 3D数字建模 — 1:1精准数据锁定\n3️⃣ 专属泥料制备 — 精选戈壁优质陶土\n4️⃣ 肌理制作与成型 — 手工复刻夯土肌理\n5️⃣ 素坯阴干与修坯 — 恒温恒湿精细修整\n6️⃣ 高温窑烧成器 — 烈焰中完成蜕变\n\n每一道工序都严格把控，确保成品兼具设计质感与结构强度。',
        quickReplies: ['产品', '定制', '购买']
    },
    '定制|量身|专属|个性化': {
        text: '我们提供花器定制服务：\n\n• 器型定制 — 根据空间需求设计专属器型\n• 肌理定制 — 可选夯土、风蚀、戈壁等多种肌理风格\n• 尺寸定制 — 从小型桌面花器到大型空间装置均可制作\n• 企业定制 — 支持品牌联名、空间软装定制\n\n定制周期一般为3-5周，具体视工艺复杂度而定。\n如需定制，请留下您的联系方式或需求描述，我们会尽快与您联系。',
        quickReplies: ['产品', '工艺', '购买']
    },
    '购买|价格|多少钱|费用|订购': {
        text: '感谢您对涅槃陶语花器的关注！\n\n由于每件花器均为纯手工制作，价格因器型、尺寸和工艺不同而有所差异。您可以通过以下方式了解详情：\n\n• 拨打电话：130-9928-0907\n• 发送邮件：276818881@qq.com\n• 到访工作室：兰州市七里河区省建筑学院陶艺工作室\n\n也可直接在页面底部的联系表单留下您的信息，我们会主动联系您。',
        quickReplies: ['产品', '工艺', '定制']
    },
    '地址|在哪|位置|工作室|参观': {
        text: '我们的陶艺工作室位于：\n\n📍 兰州市七里河区省建筑学院陶艺工作室\n\n欢迎您预约参观，近距离感受花器的夯土肌理与手工质感。参观请提前电话联系：130-9928-0907',
        quickReplies: ['产品', '工艺', '购买']
    },
    '联系方式|电话|邮箱|微信|联系': {
        text: '您可以通过以下方式联系我们：\n\n📞 电话：130-9928-0907\n📧 邮箱：276818881@qq.com\n📍 地址：兰州市七里河区省建筑学院陶艺工作室\n\n工作时间：周一至周六 9:00-18:00\n我们通常会在1小时内回复您的咨询。',
        quickReplies: ['产品', '定制', '购买']
    },
    '设计理念|灵感|概念|涅槃': {
        text: '"涅槃陶语"的命名源于我们对材料与精神的双重理解：\n\n🌋「涅槃」— 取泥土经烈焰烧制后的蜕变重生之意\n🎯「陶语」— 陶土以肌理诉说千年夯土城墙的故事\n\n我们的设计灵感源自西北戈壁的夯土城墙肌理，将粗犷的自然力量融入精致的器物之中，追求"大巧若拙"的东方侘寂美学。\n\n每一件花器都是泥土与火焰的对话，是传统与现代的交融。',
        quickReplies: ['工艺', '产品', '定制']
    },
    '团队|匠人|设计师|创始人': {
        text: '涅槃陶语团队由一群热爱陶艺与当代设计的年轻人组成。\n\n我们的核心理念是：以西北大地的粗犷肌理为底色，用当代设计语言重新诠释传统陶艺，让每一件花器都承载着泥土的温度与匠心的厚度。\n\n团队成员包括陶艺师、工业设计师、3D建模师和花艺设计师，共同打造从设计到成品的完整创作链。',
        quickReplies: ['产品', '工艺', '购买']
    }
};

// Chat state
let chatOpen = false;
let isTyping = false;

// Chat elements
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMessages = document.getElementById('chatMessages');
const chatBadge = document.getElementById('chatBadge');
const chatHeaderClose = document.getElementById('chatHeaderClose');

// Toggle chat window
function toggleChat() {
    chatOpen = !chatOpen;

    if (chatOpen) {
        chatWindow.classList.add('active');
        chatBadge.classList.add('hidden');
        chatInput.focus();
        // Switch icons
        document.querySelector('.chat-icon-open').style.display = 'none';
        document.querySelector('.chat-icon-close').style.display = 'block';
        // Stop pulse
        chatToggle.querySelector('::before')?.remove();
    } else {
        chatWindow.classList.remove('active');
        document.querySelector('.chat-icon-open').style.display = 'block';
        document.querySelector('.chat-icon-close').style.display = 'none';
    }
}

// Get bot response
function getChatBotResponse(message) {
    const lowerMsg = message.toLowerCase();

    for (const [keywords, response] of Object.entries(chatResponses)) {
        const keywordList = keywords.split('|');
        for (const kw of keywordList) {
            if (lowerMsg.includes(kw)) {
                return response;
            }
        }
    }

    // Default response
    return {
        text: '感谢您的咨询！涅槃陶语专注于戈壁夯土肌理花器的设计与制作。\n\n您可以问我关于：\n• 产品系列与花器款式\n• 6道核心制作工艺\n• 定制服务与周期\n• 购买方式与价格\n• 工作室地址与参观预约\n\n或直接拨打 130-9928-0907 与我们联系。',
        quickReplies: ['产品', '工艺', '定制', '购买']
    };
}

// Add message to chat
function addChatMessage(content, type, quickReplies = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${type}`;

    const avatarText = type === 'bot' ? '陶' : '我';

    let quickHtml = '';
    if (quickReplies.length > 0) {
        quickHtml = '<div class="chat-quick-replies">' +
            quickReplies.map(q => `<button class="chat-quick-btn" data-key="${q}">${q === '产品' ? '了解产品' : q === '工艺' ? '制作工艺' : q === '定制' ? '定制服务' : q === '购买' ? '如何购买' : q}</button>`).join('') +
            '</div>';
    }

    // Convert newlines to <br>
    const formattedContent = content.replace(/\n/g, '<br>');

    msgDiv.innerHTML = `
        <div class="chat-msg-avatar">${avatarText}</div>
        <div class="chat-msg-content">
            <p>${formattedContent}</p>
            ${quickHtml}
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();

    // Bind quick reply buttons
    msgDiv.querySelectorAll('.chat-quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            sendChatMessage(key);
        });
    });
}

// Show typing indicator
function showChatTyping() {
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot';
    typingDiv.id = 'chatTyping';
    typingDiv.innerHTML = `
        <div class="chat-msg-avatar">陶</div>
        <div class="chat-typing"><span></span><span></span><span></span></div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollChatToBottom();
}

// Hide typing indicator
function hideChatTyping() {
    const typing = document.getElementById('chatTyping');
    if (typing) typing.remove();
    isTyping = false;
}

// Send message
function sendChatMessage(text) {
    const message = text || chatInput.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    // Show typing
    showChatTyping();

    // Get response after delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        hideChatTyping();
        const response = getChatBotResponse(message);
        addChatMessage(response.text, 'bot', response.quickReplies);
    }, delay);
}

// Scroll to bottom
function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
if (chatToggle) {
    chatToggle.addEventListener('click', toggleChat);
}

if (chatHeaderClose) {
    chatHeaderClose.addEventListener('click', toggleChat);
}

if (chatSendBtn) {
    chatSendBtn.addEventListener('click', () => sendChatMessage());
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });
}

// Quick reply buttons in welcome message
document.querySelectorAll('.chat-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        sendChatMessage(btn.dataset.key);
    });
});
