// 万圣节倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    function updateHalloweenCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // 计算距离今年万圣节的时间（10月31日）
        let halloweenDate = new Date(currentYear, 9, 31); // 10月31日
        
        // 如果今年的万圣节已经过了，计算明年的万圣节
        if (now > halloweenDate) {
            halloweenDate = new Date(currentYear + 1, 9, 31);
        }
        
        const timeLeft = halloweenDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // 如果距离万圣节不到24小时，添加特殊效果
            if (days === 0 && hours < 24) {
                document.querySelector('.halloween-content').style.animation = 'halloweenUrgent 1s ease-in-out infinite alternate';
                // 增加幽灵频率
                document.querySelectorAll('.ghost').forEach(ghost => {
                    ghost.style.animationDuration = '4s';
                });
            } else {
                document.querySelector('.halloween-content').style.animation = '';
                // 恢复正常幽灵频率
                document.querySelectorAll('.ghost').forEach((ghost, index) => {
                    const durations = ['8s', '10s', '12s', '9s', '11s'];
                    ghost.style.animationDuration = durations[index];
                });
            }
        } else {
            // 万圣节到了！
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // 显示庆祝消息
            const message = document.querySelector('.halloween-message');
            if (message) {
                message.innerHTML = `
                    <p>🎃 万圣节快乐！</p>
                    <p>👻 幽灵们正在狂欢</p>
                    <p>🍬 享受这个神秘的节日</p>
                `;
            }
            
            // 增加幽灵效果
            document.querySelectorAll('.ghost').forEach(ghost => {
                ghost.style.animationDuration = '2s';
            });
        }
    }

    // 每秒更新倒计时
    updateHalloweenCountdown();
    setInterval(updateHalloweenCountdown, 1000);

    // 添加幽灵点击效果
    const ghostElements = document.querySelectorAll('.ghost');
    ghostElements.forEach(ghost => {
        ghost.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(180deg)';
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '0.7';
            }, 500);
        });
    });

    // 添加倒计时数字的点击效果
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.color = '#ff4500';
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '#ff8c00';
            }, 300);
        });
    });

    // 添加万圣节图标点击效果
    const halloweenIcon = document.querySelector('.halloween-icon');
    if (halloweenIcon) {
        halloweenIcon.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.textShadow = '0 0 50px rgba(255, 165, 0, 1)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.textShadow = '';
            }, 500);
        });
    }

    // 添加页面加载动画
    function addHalloweenAnimations() {
        const halloweenContent = document.querySelector('.halloween-content');
        const infoCards = document.querySelectorAll('.info-card');
        const activityItems = document.querySelectorAll('.activity-item');
        const costumeItems = document.querySelectorAll('.costume-item');
        
        // 万圣节内容动画
        halloweenContent.style.opacity = '0';
        halloweenContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            halloweenContent.style.transition = 'all 1s ease-out';
            halloweenContent.style.opacity = '1';
            halloweenContent.style.transform = 'translateY(0)';
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

        // 装扮项目动画
        costumeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 1600 + index * 100);
        });
    }

    // 执行动画
    addHalloweenAnimations();

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按空格键重新开始幽灵动画
        if (e.code === 'Space') {
            e.preventDefault();
            const ghostElements = document.querySelectorAll('.ghost');
            ghostElements.forEach(ghost => {
                ghost.style.animation = 'none';
                setTimeout(() => {
                    ghost.style.animation = '';
                }, 10);
            });
        }
        
        // 按H键显示万圣节祝福
        if (e.key.toLowerCase() === 'h') {
            showHalloweenWish();
        }
    });

    // 显示万圣节祝福函数
    function showHalloweenWish() {
        const wishes = [
            "🎃 万圣节快乐！愿幽灵们带给你欢乐",
            "👻 愿南瓜灯为你照亮前行的道路",
            "🍬 愿糖果的甜蜜填满你的心",
            "🦇 愿蝙蝠为你带来好运",
            "🧙‍♀️ 愿女巫的魔法保佑你"
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
            background: rgba(255, 140, 0, 0.9);
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
        @keyframes halloweenUrgent {
            from { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
            to { box-shadow: 0 20px 60px rgba(255, 140, 0, 0.5); }
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

    // 添加装扮项目的特殊效果
    const costumeItems = document.querySelectorAll('.costume-item');
    costumeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.costume-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.costume-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // 添加万圣节音乐提示（可选）
    function addHalloweenMusicHint() {
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
                🎵 点击播放万圣节音乐
            </div>
        `;
        
        musicHint.addEventListener('click', function() {
            // 这里可以添加音乐播放功能
            alert('🎵 万圣节快乐！这里可以播放万圣节音乐');
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
    setTimeout(addHalloweenMusicHint, 3000);

    // 添加万圣节特效
    function addHalloweenEffects() {
        // 随机添加蜘蛛网效果
        setInterval(() => {
            if (Math.random() < 0.1) { // 10%的概率
                const spiderWeb = document.createElement('div');
                spiderWeb.innerHTML = '🕸️';
                spiderWeb.style.cssText = `
                    position: fixed;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    font-size: 2rem;
                    opacity: 0.3;
                    pointer-events: none;
                    z-index: 1;
                    animation: spiderWebFloat 3s ease-out forwards;
                `;
                
                document.body.appendChild(spiderWeb);
                
                setTimeout(() => {
                    if (spiderWeb.parentNode) {
                        spiderWeb.parentNode.removeChild(spiderWeb);
                    }
                }, 3000);
            }
        }, 2000);

        // 添加CSS动画
        const spiderWebStyle = document.createElement('style');
        spiderWebStyle.textContent = `
            @keyframes spiderWebFloat {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 0.3;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(spiderWebStyle);
    }

    // 启动万圣节特效
    addHalloweenEffects();
}); 