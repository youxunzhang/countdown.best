// 新年倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    function updateNewYearCountdown() {
        const now = new Date();
        const targetYear = 2027;
        const newYearDate = new Date(targetYear, 0, 1); // 1月1日 00:00:00
        
        const timeLeft = newYearDate - now;
        
        // 更新目标年份显示
        document.getElementById('target-year').textContent = targetYear;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // 如果距离新年不到24小时，添加特殊效果
            if (days === 0 && hours < 24) {
                document.querySelector('.newyear-content').style.animation = 'newYearUrgent 1s ease-in-out infinite alternate';
                // 增加烟花频率
                document.querySelectorAll('.firework').forEach(firework => {
                    firework.style.animationDuration = '2s';
                });
            } else {
                document.querySelector('.newyear-content').style.animation = '';
                // 恢复正常烟花频率
                document.querySelectorAll('.firework').forEach((firework, index) => {
                    const durations = ['3s', '4s', '3.5s', '4.5s', '3.8s'];
                    firework.style.animationDuration = durations[index];
                });
            }
        } else {
            // 新年到了！
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // 显示庆祝消息
            const message = document.querySelector('.newyear-message');
            if (message) {
                message.innerHTML = `
                    <p>🎉 新年快乐！</p>
                    <p>🌟 欢迎来到 ${targetYear} 年</p>
                    <p>🎊 愿新的一年带给你无限可能</p>
                `;
            }
            
            // 增加烟花效果
            document.querySelectorAll('.firework').forEach(firework => {
                firework.style.animationDuration = '1s';
            });
        }
    }

    // 每秒更新倒计时
    updateNewYearCountdown();
    setInterval(updateNewYearCountdown, 1000);

    // 新年决心功能
    const resolutionText = document.getElementById('resolution-text');
    const saveResolutionBtn = document.getElementById('save-resolution');
    const savedResolutionsDiv = document.getElementById('saved-resolutions');

    // 加载已保存的决心
    function loadResolutions() {
        const savedResolutions = JSON.parse(localStorage.getItem('newYearResolutions') || '[]');
        savedResolutionsDiv.innerHTML = '';
        
        savedResolutions.forEach(resolution => {
            const resolutionItem = document.createElement('div');
            resolutionItem.className = 'resolution-item';
            resolutionItem.innerHTML = `
                <p>${resolution.text}</p>
                <div class="date">${resolution.date}</div>
            `;
            savedResolutionsDiv.appendChild(resolutionItem);
        });
    }

    // 保存新年决心
    saveResolutionBtn.addEventListener('click', function() {
        const text = resolutionText.value.trim();
        if (text) {
            const resolution = {
                text: text,
                date: new Date().toLocaleString('zh-CN')
            };
            
            const savedResolutions = JSON.parse(localStorage.getItem('newYearResolutions') || '[]');
            savedResolutions.unshift(resolution); // 添加到开头
            
            // 只保留最新的10个决心
            if (savedResolutions.length > 10) {
                savedResolutions.splice(10);
            }
            
            localStorage.setItem('newYearResolutions', JSON.stringify(savedResolutions));
            
            // 清空输入框
            resolutionText.value = '';
            
            // 重新加载显示
            loadResolutions();
            
            // 显示成功提示
            showNotification('新年决心已保存！🎯', 'success');
        } else {
            showNotification('请输入你的新年决心', 'error');
        }
    });

    // 显示通知
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            z-index: 1000;
            animation: notificationSlideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes newYearUrgent {
            from { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
            to { box-shadow: 0 20px 60px rgba(255, 215, 0, 0.5); }
        }
        
        @keyframes notificationSlideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes notificationSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    // 加载已保存的决心
    loadResolutions();

    // 添加烟花点击效果
    const fireworkElements = document.querySelectorAll('.firework');
    fireworkElements.forEach(firework => {
        firework.addEventListener('click', function() {
            this.style.transform = 'scale(2)';
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '1';
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

    // 添加新年图标点击效果
    const newyearIcon = document.querySelector('.newyear-icon');
    if (newyearIcon) {
        newyearIcon.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.textShadow = '0 0 50px rgba(255, 255, 255, 1)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.textShadow = '';
            }, 500);
        });
    }

    // 添加页面加载动画
    function addNewYearAnimations() {
        const newyearContent = document.querySelector('.newyear-content');
        const infoCards = document.querySelectorAll('.info-card');
        const activityItems = document.querySelectorAll('.activity-item');
        const resolutionForm = document.querySelector('.resolution-form');
        
        // 新年内容动画
        newyearContent.style.opacity = '0';
        newyearContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            newyearContent.style.transition = 'all 1s ease-out';
            newyearContent.style.opacity = '1';
            newyearContent.style.transform = 'translateY(0)';
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

        // 决心表单动画
        if (resolutionForm) {
            resolutionForm.style.opacity = '0';
            resolutionForm.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                resolutionForm.style.transition = 'all 0.8s ease-out';
                resolutionForm.style.opacity = '1';
                resolutionForm.style.transform = 'translateY(0)';
            }, 1800);
        }
    }

    // 执行动画
    addNewYearAnimations();

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按空格键重新开始烟花动画
        if (e.code === 'Space') {
            e.preventDefault();
            const fireworkElements = document.querySelectorAll('.firework');
            fireworkElements.forEach(firework => {
                firework.style.animation = 'none';
                setTimeout(() => {
                    firework.style.animation = '';
                }, 10);
            });
        }
        
        // 按N键显示新年祝福
        if (e.key.toLowerCase() === 'n') {
            showNewYearWish();
        }
        
        // 按Enter键保存决心
        if (e.key === 'Enter' && document.activeElement === resolutionText) {
            saveResolutionBtn.click();
        }
    });

    // 显示新年祝福函数
    function showNewYearWish() {
        const wishes = [
            "🎊 新年快乐！愿新的一年带给你无限可能",
            "🌟 愿新年为你开启美好的人生新篇章",
            "🎆 愿烟花为你照亮前行的道路",
            "🎯 愿你的新年决心都能实现",
            "💫 愿新年带给你健康、快乐和成功"
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
            background: rgba(0, 123, 255, 0.9);
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

    // 添加新年音乐提示（可选）
    function addNewYearMusicHint() {
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
                🎵 点击播放新年音乐
            </div>
        `;
        
        musicHint.addEventListener('click', function() {
            // 这里可以添加音乐播放功能
            alert('🎵 新年快乐！这里可以播放新年音乐');
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
    setTimeout(addNewYearMusicHint, 3000);
}); 
