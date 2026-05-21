// ===== 悬浮球画廊功能 =====

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // FLOATING BUTTON DRAG
    // ============================================
    const floatingBtn = document.getElementById('floatingGalleryBtn');
    let isDragging = false;
    let startX, startY, startLeft, startBottom;
    let hasMoved = false;

    if (floatingBtn) {
        // Mouse events
        floatingBtn.addEventListener('mousedown', function(e) {
            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = floatingBtn.offsetLeft;
            startBottom = window.innerHeight - floatingBtn.offsetTop - floatingBtn.offsetHeight;
            floatingBtn.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }

            const newLeft = startLeft + deltaX;
            const newBottom = startBottom - deltaY;

            // Constrain to viewport
            const maxLeft = window.innerWidth - floatingBtn.offsetWidth - 10;
            const maxBottom = window.innerHeight - floatingBtn.offsetHeight - 10;

            floatingBtn.style.left = Math.max(10, Math.min(newLeft, maxLeft)) + 'px';
            floatingBtn.style.bottom = Math.max(10, Math.min(newBottom, maxBottom)) + 'px';
            floatingBtn.style.right = 'auto';
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                floatingBtn.style.transition = '';

                // If not moved much, treat as click
                if (!hasMoved) {
                    openGalleryModal();
                }
            }
        });

        // Touch events
        floatingBtn.addEventListener('touchstart', function(e) {
            isDragging = true;
            hasMoved = false;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startLeft = floatingBtn.offsetLeft;
            startBottom = window.innerHeight - floatingBtn.offsetTop - floatingBtn.offsetHeight;
            floatingBtn.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }

            const newLeft = startLeft + deltaX;
            const newBottom = startBottom - deltaY;

            const maxLeft = window.innerWidth - floatingBtn.offsetWidth - 10;
            const maxBottom = window.innerHeight - floatingBtn.offsetHeight - 10;

            floatingBtn.style.left = Math.max(10, Math.min(newLeft, maxLeft)) + 'px';
            floatingBtn.style.bottom = Math.max(10, Math.min(newBottom, maxBottom)) + 'px';
            floatingBtn.style.right = 'auto';
        }, { passive: true });

        document.addEventListener('touchend', function() {
            if (isDragging) {
                isDragging = false;
                floatingBtn.style.transition = '';

                if (!hasMoved) {
                    openGalleryModal();
                }
            }
        });
    }

    // ============================================
    // GALLERY MODAL
    // ============================================
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalClose = document.getElementById('galleryModalClose');

    function openGalleryModal() {
        if (galleryModal) {
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeGalleryModal() {
        if (galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const galleryLightbox = document.getElementById('galleryLightbox');
    const galleryLightboxImg = document.getElementById('galleryLightboxImg');
    const galleryLightboxCaption = document.getElementById('galleryLightboxCaption');
    const galleryLightboxClose = document.getElementById('galleryLightboxClose');
    const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
    const galleryLightboxNext = document.getElementById('galleryLightboxNext');

    let galleryImages = [];
    let currentGalleryIndex = 0;

    // Collect all gallery images
    const galleryItems = document.querySelectorAll('.gallery-series-item');
    galleryItems.forEach(function(item, index) {
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption') || img.alt;

        galleryImages.push({
            src: img.src,
            caption: caption
        });

        item.addEventListener('click', function() {
            currentGalleryIndex = index;
            openGalleryLightbox();
        });
    });

    function openGalleryLightbox() {
        if (!galleryLightbox) return;

        const image = galleryImages[currentGalleryIndex];
        galleryLightboxImg.src = image.src;
        galleryLightboxImg.alt = image.caption;
        galleryLightboxCaption.textContent = image.caption;
        galleryLightbox.classList.add('active');
    }

    function closeGalleryLightbox() {
        if (galleryLightbox) {
            galleryLightbox.classList.remove('active');
        }
    }

    function navigateGalleryLightbox(direction) {
        currentGalleryIndex += direction;
        if (currentGalleryIndex < 0) currentGalleryIndex = galleryImages.length - 1;
        if (currentGalleryIndex >= galleryImages.length) currentGalleryIndex = 0;
        openGalleryLightbox();
    }

    if (galleryLightboxClose) {
        galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
    }

    if (galleryLightboxPrev) {
        galleryLightboxPrev.addEventListener('click', function() {
            navigateGalleryLightbox(-1);
        });
    }

    if (galleryLightboxNext) {
        galleryLightboxNext.addEventListener('click', function() {
            navigateGalleryLightbox(1);
        });
    }

    // Click background to close
    if (galleryLightbox) {
        galleryLightbox.addEventListener('click', function(e) {
            if (e.target === galleryLightbox) {
                closeGalleryLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Gallery lightbox
        if (galleryLightbox && galleryLightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeGalleryLightbox();
                    break;
                case 'ArrowLeft':
                    navigateGalleryLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateGalleryLightbox(1);
                    break;
            }
            return;
        }

        // Gallery modal
        if (galleryModal && galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            }
        }
    });

    // ============================================
    // SCROLL ANIMATIONS FOR GALLERY ITEMS
    // ============================================
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease ' + (index % 4) * 0.1 + 's, transform 0.6s ease ' + (index % 4) * 0.1 + 's';
        galleryObserver.observe(item);
    });
});
