// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单功能
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 关闭菜单当点击链接时
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// 倒计时功能
function updateCountdown(targetDate, elements) {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        // 倒计时结束
        elements.forEach(element => {
            element.textContent = '00';
        });
        return false;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const values = [days, hours, minutes, seconds];
    
    elements.forEach((element, index) => {
        element.textContent = values[index].toString().padStart(2, '0');
    });
    
    return true;
}

// 首页倒计时功能
function initHomeCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const statusElement = document.getElementById('countdown-status');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    const elements = [daysElement, hoursElement, minutesElement, secondsElement];
    const targetDate = new Date('January 1, 2026 00:00:00').getTime();
    
    function update() {
        const isRunning = updateCountdown(targetDate, elements);
        if (!isRunning && statusElement) {
            statusElement.textContent = '2026年已经到来！新年快乐！';
        }
    }
    
    update();
    setInterval(update, 1000);
}

// 圣诞节倒计时功能
function initChristmasCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    const elements = [daysElement, hoursElement, minutesElement, secondsElement];
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`December 25, ${currentYear} 00:00:00`).getTime();
    
    function update() {
        updateCountdown(targetDate, elements);
    }
    
    update();
    setInterval(update, 1000);
}

// 新年倒计时功能
function initNewYearCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    const elements = [daysElement, hoursElement, minutesElement, secondsElement];
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`January 1, ${currentYear + 1} 00:00:00`).getTime();
    
    function update() {
        updateCountdown(targetDate, elements);
    }
    
    update();
    setInterval(update, 1000);
}

// 万圣节倒计时功能
function initHalloweenCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    const elements = [daysElement, hoursElement, minutesElement, secondsElement];
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`October 31, ${currentYear} 00:00:00`).getTime();
    
    function update() {
        updateCountdown(targetDate, elements);
    }
    
    update();
    setInterval(update, 1000);
}

// 背景选择器功能
function initBackgroundSelector() {
    const bgOptions = document.querySelectorAll('.bg-option');
    const body = document.body;
    
    const backgrounds = {
        default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        nature: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
        city: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        space: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)',
        ocean: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    };
    
    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            const bgType = this.getAttribute('data-bg');
            
            // 移除所有active类
            bgOptions.forEach(opt => opt.classList.remove('active'));
            
            // 添加active类到当前选项
            this.classList.add('active');
            
            // 应用背景
            if (backgrounds[bgType]) {
                body.style.background = backgrounds[bgType];
            }
        });
    });
    
    // 默认选择第一个背景
    if (bgOptions.length > 0) {
        bgOptions[0].classList.add('active');
    }
}

// 分享功能
function shareToWeChat() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    alert('请复制链接到微信分享：' + window.location.href);
}

function shareToWeibo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
}

function shareToQQ() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`, '_blank');
}

function shareToQzone() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}`, '_blank');
}

function copyShareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板！');
    }).catch(() => {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('链接已复制到剪贴板！');
    });
}

// 游戏功能
let gameInterval;
let gameTime = 0;
let gameScore = 0;
let isGameRunning = false;

function startGame() {
    if (isGameRunning) return;
    
    isGameRunning = true;
    gameTime = 0;
    gameScore = 0;
    
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const gameDisplay = document.getElementById('game-display');
    const scoreDisplay = document.getElementById('score-display');
    
    if (startBtn) startBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = false;
    
    gameInterval = setInterval(() => {
        gameTime++;
        if (gameDisplay) {
            gameDisplay.textContent = gameTime.toString().padStart(3, '0');
        }
        
        // 每10秒增加分数
        if (gameTime % 10 === 0) {
            gameScore += 10;
            if (scoreDisplay) {
                scoreDisplay.textContent = gameScore;
            }
        }
    }, 1000);
}

function resetGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    gameTime = 0;
    gameScore = 0;
    
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const gameDisplay = document.getElementById('game-display');
    const scoreDisplay = document.getElementById('score-display');
    
    if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = '开始游戏';
    }
    if (resetBtn) resetBtn.disabled = true;
    if (gameDisplay) gameDisplay.textContent = '000';
    if (scoreDisplay) scoreDisplay.textContent = '0';
}

// 中国时间系统功能
function initChineseTime() {
    const timeDisplay = document.getElementById('current-time');
    const dateDisplay = document.getElementById('current-date');
    const timePeriods = document.querySelectorAll('.time-period');
    
    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // 更新时间显示
        if (timeDisplay) {
            timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // 更新日期显示
        if (dateDisplay) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            dateDisplay.textContent = now.toLocaleDateString('zh-CN', options);
        }
        
        // 更新时辰显示
        const timePeriod = getTimePeriod(hours);
        timePeriods.forEach(period => {
            period.classList.remove('active');
            if (period.getAttribute('data-period') === timePeriod) {
                period.classList.add('active');
            }
        });
    }
    
    function getTimePeriod(hour) {
        if (hour >= 23 || hour < 1) return '子时';
        if (hour >= 1 && hour < 3) return '丑时';
        if (hour >= 3 && hour < 5) return '寅时';
        if (hour >= 5 && hour < 7) return '卯时';
        if (hour >= 7 && hour < 9) return '辰时';
        if (hour >= 9 && hour < 11) return '巳时';
        if (hour >= 11 && hour < 13) return '午时';
        if (hour >= 13 && hour < 15) return '未时';
        if (hour >= 15 && hour < 17) return '申时';
        if (hour >= 17 && hour < 19) return '酉时';
        if (hour >= 19 && hour < 21) return '戌时';
        if (hour >= 21 && hour < 23) return '亥时';
        return '子时';
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 根据页面类型初始化不同的功能
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path === '') {
        initHomeCountdown();
        initBackgroundSelector();
    } else if (path.includes('christmas.html')) {
        initChristmasCountdown();
    } else if (path.includes('newyear.html')) {
        initNewYearCountdown();
    } else if (path.includes('halloween.html')) {
        initHalloweenCountdown();
    } else if (path.includes('game.html')) {
        // 游戏页面功能在HTML中直接定义
    } else if (path.includes('chinese-time.html')) {
        initChineseTime();
    }
});

// 嵌入计时器功能
let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isRunning = false;
let isPaused = false;

function initEmbedTimer() {
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const minutesInput = document.getElementById('minutes');
    const timerNameInput = document.getElementById('timer-name');
    const displayName = document.getElementById('display-name');
    const status = document.getElementById('status');
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minsElement = document.getElementById('mins');
    const secsElement = document.getElementById('secs');
    
    if (!startBtn || !pauseBtn || !resetBtn) return;
    
    function init() {
        const urlParams = new URLSearchParams(window.location.search);
        const minutes = urlParams.get('minutes');
        const name = urlParams.get('name');
        
        if (minutes !== null && minutesInput) minutesInput.value = minutes;
        if (name !== null && timerNameInput) timerNameInput.value = name;
        
        updateDisplayName();
        resetDisplay();
    }
    
    function updateDisplayName() {
        if (displayName && timerNameInput) {
            displayName.textContent = timerNameInput.value || '学习时间';
        }
    }
    
    function resetDisplay() {
        const elements = [daysElement, hoursElement, minsElement, secsElement];
        elements.forEach(element => {
            if (element) element.textContent = '00';
        });
    }
    
    function secondsToTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;
        
        return { days, hours, minutes, seconds: secs };
    }
    
    function updateDisplay(seconds) {
        if (seconds <= 0) {
            resetDisplay();
            if (status) status.textContent = '计时器已结束！';
            stopTimer();
            showCompletion();
            return;
        }
        
        const time = secondsToTime(seconds);
        const elements = [daysElement, hoursElement, minsElement, secsElement];
        const values = [time.days, time.hours, time.minutes, time.seconds];
        
        elements.forEach((element, index) => {
            if (element) {
                element.textContent = values[index].toString().padStart(2, '0');
            }
        });
    }
    
    function validateInput() {
        if (!minutesInput) return false;
        const minutes = parseInt(minutesInput.value) || 0;
        
        if (minutes < 0 || minutes > 999) {
            alert('分钟数必须在0-999之间！');
            return false;
        }
        
        if (minutes === 0) {
            alert('请设置至少1分钟的时间！');
            return false;
        }
        
        return true;
    }
    
    function startTimer() {
        if (!validateInput()) return;
        
        const minutes = parseInt(minutesInput.value) || 0;
        
        if (!isPaused) {
            totalSeconds = minutes * 60;
            remainingSeconds = totalSeconds;
        }
        
        updateDisplayName();
        isRunning = true;
        isPaused = false;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        
        if (status) status.textContent = '计时器运行中...';
        
        timerInterval = setInterval(() => {
            remainingSeconds--;
            updateDisplay(remainingSeconds);
        }, 1000);
    }
    
    function pauseTimer() {
        if (!isRunning) return;
        
        clearInterval(timerInterval);
        isPaused = true;
        
        startBtn.disabled = false;
        startBtn.textContent = '继续';
        pauseBtn.disabled = true;
        
        if (status) status.textContent = '计时器已暂停';
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = false;
        remainingSeconds = 0;
        
        startBtn.disabled = false;
        startBtn.textContent = '开始计时';
        pauseBtn.disabled = true;
        resetBtn.disabled = false;
    }
    
    function resetTimer() {
        stopTimer();
        resetDisplay();
        if (status) status.textContent = '请设置时间并开始计时';
    }
    
    function showCompletion() {
        const timerName = timerNameInput ? timerNameInput.value : '计时';
        const message = `⏰ ${timerName} 时间到！`;
        
        const completionDiv = document.createElement('div');
        completionDiv.style.cssText = `
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
        
        completionDiv.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                margin: 1rem;
            ">
                <h2 style="color: #667eea; margin-bottom: 1rem;">${message}</h2>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    padding: 0.8rem 1.5rem;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1rem;
                ">确定</button>
            </div>
        `;
        
        document.body.appendChild(completionDiv);
    }
    
    // 绑定事件
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    if (timerNameInput) {
        timerNameInput.addEventListener('input', updateDisplayName);
    }
    
    // 初始化
    init();
}

// 如果页面包含嵌入计时器元素，则初始化
if (document.getElementById('start-btn') && document.getElementById('pause-btn')) {
    document.addEventListener('DOMContentLoaded', initEmbedTimer);
} 