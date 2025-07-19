// Homepage functionality - Year countdown
document.addEventListener('DOMContentLoaded', function() {
    // Year countdown variables
    let yearCountdownInterval = null;
    let targetYear = 2026;
    let targetDate = new Date(targetYear, 0, 1, 0, 0, 0); // January 1, 2026 00:00:00

    // DOM elements
    const statusText = document.getElementById('countdown-status');

    // Timer display elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Initialize page
    function initializePage() {
        // Start year countdown
        startYearCountdown();
        
        // Add page animations
        addPageAnimations();
    }

    // Start year countdown
    function startYearCountdown() {
        // Update display immediately
        updateYearCountdown();
        
        // Start timer, update every second
        yearCountdownInterval = setInterval(updateYearCountdown, 1000);
    }

    // Update year countdown display
    function updateYearCountdown() {
        const now = new Date();
        const timeDifference = targetDate.getTime() - now.getTime();
        
        if (timeDifference <= 0) {
            // 2026 has arrived
            resetDisplay();
            updateStatus('🎉 Happy New Year 2026! 🎊');
            clearInterval(yearCountdownInterval);
            showNewYearMessage();
            return;
        }

        // Calculate remaining time
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update numbers with animation
        animateNumber(daysElement, days);
        animateNumber(hoursElement, hours);
        animateNumber(minutesElement, minutes);
        animateNumber(secondsElement, seconds);
    }

    // Number animation effect
    function animateNumber(element, targetValue) {
        const currentValue = parseInt(element.textContent);
        if (currentValue === targetValue) return;

        const increment = (targetValue - currentValue) / 5;
        let current = currentValue;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= targetValue) || 
                (increment < 0 && current <= targetValue)) {
                element.textContent = targetValue.toString().padStart(2, '0');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString().padStart(2, '0');
            }
        }, 100);
    }

    // Reset timer display
    function resetDisplay() {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
    }

    // Update status text
    function updateStatus(message) {
        statusText.textContent = message;
    }

    // Show New Year message
    function showNewYearMessage() {
        // Create New Year celebration modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea, #764ba2);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                color: white;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <h2 style="font-size: 2rem; margin-bottom: 20px;">🎉 Happy New Year! 🎊</h2>
                <p style="font-size: 1.2rem; margin-bottom: 30px; line-height: 1.6;">
                    Welcome to 2026!<br>
                    May the new year be filled with hope, joy, and success!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    padding: 12px 30px;
                    background: white;
                    color: #667eea;
                    border: none;
                    border-radius: 15px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                ">Start the New Year</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Play New Year sound effect (if browser supports)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.play();
        } catch (e) {
            // Ignore audio playback errors
        }
    }

    // Background selector functionality
    const bgOptions = document.querySelectorAll('.bg-option');
    const heroSection = document.querySelector('.hero-section');

    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove all active states
            bgOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add current active state
            this.classList.add('active');
            
            // Get background type
            const bgType = this.getAttribute('data-bg');
            
            // Remove all background classes
            heroSection.classList.remove('bg-default', 'bg-nature', 'bg-city', 'bg-space', 'bg-ocean');
            
            // Add selected background class
            if (bgType !== 'default') {
                heroSection.classList.add(`bg-${bgType}`);
            }
            
            // Save user choice to local storage
            localStorage.setItem('selectedBackground', bgType);
        });
    });

    // Restore user's background choice on page load
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
        const savedOption = document.querySelector(`[data-bg="${savedBackground}"]`);
        if (savedOption) {
            savedOption.click();
        }
    }

    // Page loading animations
    function addPageAnimations() {
        const countdownContainer = document.querySelector('.countdown-container');
        const featureCards = document.querySelectorAll('.feature-card');
        
        // Countdown container animation
        countdownContainer.style.opacity = '0';
        countdownContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            countdownContainer.style.transition = 'all 0.8s ease-out';
            countdownContainer.style.opacity = '1';
            countdownContainer.style.transform = 'translateY(0)';
        }, 100);
        
        // Feature cards animation
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    // Initialize the page
    initializePage();
});

// Social media sharing functions
function shareToWeChat() {
    const shareData = getShareData();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareData.url)}`;
    showQRCode(qrCodeUrl, 'WeChat');
}

function shareToWeibo() {
    const shareData = getShareData();
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`;
    window.open(url, '_blank');
}

function shareToQQ() {
    const shareData = getShareData();
    const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&desc=${encodeURIComponent(shareData.description)}`;
    window.open(url, '_blank');
}

function shareToQzone() {
    const shareData = getShareData();
    const url = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&desc=${encodeURIComponent(shareData.description)}`;
    window.open(url, '_blank');
}

function copyShareLink() {
    const shareData = getShareData();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(() => {
            showCopySuccess('Link copied to clipboard!');
        }).catch(() => {
            showCopySuccess('Failed to copy link');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareData.url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess('Link copied to clipboard!');
    }
}

function getShareData() {
    return {
        url: window.location.href,
        title: 'Countdown to 2026 - Countdown Website',
        description: 'Check out this amazing countdown timer to 2026!'
    };
}

function showQRCode(url, title) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            max-width: 300px;
            width: 90%;
        ">
            <h3 style="margin-bottom: 20px; color: #333;">Scan QR Code for ${title}</h3>
            <img src="${url}" alt="QR Code" style="max-width: 200px; margin-bottom: 20px;">
            <p style="color: #666; margin-bottom: 20px;">Scan this QR code with your ${title} app to share</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 10px 20px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showCopySuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 