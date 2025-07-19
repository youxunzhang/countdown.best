// 圣诞节倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    function updateChristmasCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // 计算距离今年圣诞节的时间
        let christmasDate = new Date(currentYear, 11, 25); // 12月25日
        
        // 如果今年的圣诞节已经过了，计算明年的圣诞节
        if (now > christmasDate) {
            christmasDate = new Date(currentYear + 1, 11, 25);
        }
        
        const timeLeft = christmasDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // 如果距离圣诞节不到24小时，添加特殊效果
            if (days === 0 && hours < 24) {
                document.querySelector('.christmas-content').style.animation = 'christmasUrgent 1s ease-in-out infinite alternate';
            } else {
                document.querySelector('.christmas-content').style.animation = '';
            }
        } else {
            // 圣诞节到了！
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // 显示庆祝消息
            const message = document.querySelector('.christmas-message');
            if (message) {
                message.innerHTML = `
                    <p>🎉 圣诞节快乐！</p>
                    <p>🎄 愿你的圣诞节充满欢乐和温暖</p>
                    <p>🎁 享受这美好的节日时光</p>
                `;
            }
        }
    }

    // 每秒更新倒计时
    updateChristmasCountdown();
    setInterval(updateChristmasCountdown, 1000);

    // 添加雪花点击效果
    const snowElements = document.querySelectorAll('.snow');
    snowElements.forEach(snow => {
        snow.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '0.8';
            }, 500);
        });
    });

    // 添加倒计时数字的点击效果
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.color = '#ff6b6b';
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '#ffd700';
            }, 300);
        });
    });

    // 添加圣诞树点击效果
    const christmasTree = document.querySelector('.christmas-tree');
    if (christmasTree) {
        christmasTree.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.textShadow = '0 0 50px rgba(255, 255, 255, 1)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.textShadow = '';
            }, 500);
        });
    }

    // 添加页面加载动画
    function addChristmasAnimations() {
        const christmasContent = document.querySelector('.christmas-content');
        const infoCards = document.querySelectorAll('.info-card');
        const activityItems = document.querySelectorAll('.activity-item');
        
        // 圣诞节内容动画
        christmasContent.style.opacity = '0';
        christmasContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            christmasContent.style.transition = 'all 1s ease-out';
            christmasContent.style.opacity = '1';
            christmasContent.style.transform = 'translateY(0)';
        }, 300);

        // 信息卡片动画
        infoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 800 + index * 200);
        });

        // 活动项目动画
        activityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 1200 + index * 150);
        });
    }

    // 执行动画
    addChristmasAnimations();

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按空格键重新开始雪花动画
        if (e.code === 'Space') {
            e.preventDefault();
            const snowElements = document.querySelectorAll('.snow');
            snowElements.forEach(snow => {
                snow.style.animation = 'none';
                setTimeout(() => {
                    snow.style.animation = '';
                }, 10);
            });
        }
        
        // 按C键显示圣诞祝福
        if (e.key.toLowerCase() === 'c') {
            showChristmasWish();
        }
    });

    // 显示圣诞祝福函数
    function showChristmasWish() {
        const wishes = [
            "🎄 圣诞快乐！愿你的圣诞节充满欢乐和温暖",
            "🎁 愿圣诞老人带给你最美好的礼物",
            "🌟 愿圣诞节的星光为你指引方向",
            "❄️ 愿雪花为你带来纯净的祝福",
            "🎅 愿圣诞老人保佑你平安喜乐"
        ];
        
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        
        // 创建临时提示
        const notification = document.createElement('div');
        notification.textContent = randomWish;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 1000;
            animation: wishFadeIn 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'wishFadeOut 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes christmasUrgent {
            from { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
            to { box-shadow: 0 20px 60px rgba(220, 53, 69, 0.5); }
        }
        
        @keyframes wishFadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes wishFadeOut {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    // 添加鼠标悬停效果
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // 添加圣诞音乐提示（可选）
    function addChristmasMusicHint() {
        const musicHint = document.createElement('div');
        musicHint.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                font-size: 0.9rem;
                color: #333;
                z-index: 100;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                🎵 点击播放圣诞音乐
            </div>
        `;
        
        musicHint.addEventListener('click', function() {
            // 这里可以添加音乐播放功能
            alert('🎵 圣诞快乐！这里可以播放圣诞音乐');
        });
        
        document.body.appendChild(musicHint);
        
        // 5秒后自动隐藏
        setTimeout(() => {
            musicHint.style.opacity = '0';
            setTimeout(() => {
                if (musicHint.parentNode) {
                    musicHint.parentNode.removeChild(musicHint);
                }
            }, 500);
        }, 5000);
    }

    // 延迟显示音乐提示
    setTimeout(addChristmasMusicHint, 3000);
}); 