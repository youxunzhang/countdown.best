// 游戏页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态管理
    const gameState = {
        perception: { isRunning: false, startTime: 0, timer: null },
        memory: { isRunning: false, sequence: [], playerSequence: [], level: 1 },
        click: { isRunning: false, score: 0, timer: null, timeLeft: 10 },
        color: { isRunning: false, score: 0, timer: null, timeLeft: 30, selectedCells: [] }
    };

    // 时间感知游戏
    function initPerceptionGame() {
        const startBtn = document.getElementById('start-perception');
        const stopBtn = document.getElementById('stop-perception');
        const resetBtn = document.getElementById('reset-perception');
        const timerDisplay = document.getElementById('perception-timer');
        const resultDisplay = document.getElementById('perception-result');

        startBtn.addEventListener('click', function() {
            if (!gameState.perception.isRunning) {
                gameState.perception.isRunning = true;
                gameState.perception.startTime = Date.now();
                startBtn.disabled = true;
                stopBtn.disabled = false;
                resultDisplay.textContent = '';
                resultDisplay.className = 'game-result';

                gameState.perception.timer = setInterval(() => {
                    const elapsed = Date.now() - gameState.perception.startTime;
                    const seconds = Math.floor(elapsed / 1000);
                    const milliseconds = Math.floor((elapsed % 1000) / 10);
                    timerDisplay.textContent = `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
                }, 10);
            }
        });

        stopBtn.addEventListener('click', function() {
            if (gameState.perception.isRunning) {
                gameState.perception.isRunning = false;
                clearInterval(gameState.perception.timer);
                startBtn.disabled = false;
                stopBtn.disabled = true;

                const elapsed = Date.now() - gameState.perception.startTime;
                const seconds = elapsed / 1000;
                const difference = Math.abs(seconds - 10);

                let message, className;
                if (difference < 0.5) {
                    message = `🎉 太棒了！你的时间感知非常准确！误差仅 ${difference.toFixed(2)} 秒`;
                    className = 'success';
                } else if (difference < 1) {
                    message = `👍 不错！误差 ${difference.toFixed(2)} 秒`;
                    className = 'success';
                } else if (difference < 2) {
                    message = `😊 还可以，误差 ${difference.toFixed(2)} 秒`;
                    className = 'info';
                } else {
                    message = `😅 需要练习，误差 ${difference.toFixed(2)} 秒`;
                    className = 'error';
                }

                resultDisplay.textContent = message;
                resultDisplay.className = `game-result ${className}`;

                // 保存分数
                saveScore('perception', Math.round((10 - difference) * 10));
            }
        });

        resetBtn.addEventListener('click', function() {
            gameState.perception.isRunning = false;
            clearInterval(gameState.perception.timer);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            timerDisplay.textContent = '00:00';
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
        });
    }

    // 记忆游戏
    function initMemoryGame() {
        const startBtn = document.getElementById('start-memory');
        const resetBtn = document.getElementById('reset-memory');
        const numbersDisplay = document.getElementById('memory-numbers');
        const inputDisplay = document.getElementById('memory-input');
        const resultDisplay = document.getElementById('memory-result');

        startBtn.addEventListener('click', function() {
            if (!gameState.memory.isRunning) {
                startMemoryGame();
            }
        });

        resetBtn.addEventListener('click', function() {
            resetMemoryGame();
        });

        function startMemoryGame() {
            gameState.memory.isRunning = true;
            gameState.memory.sequence = [];
            gameState.memory.playerSequence = [];
            gameState.memory.level = 1;
            startBtn.disabled = true;
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';

            // 生成序列
            for (let i = 0; i < gameState.memory.level + 2; i++) {
                gameState.memory.sequence.push(Math.floor(Math.random() * 9) + 1);
            }

            showSequence();
        }

        function showSequence() {
            numbersDisplay.innerHTML = '';
            inputDisplay.innerHTML = '';

            // 显示序列
            gameState.memory.sequence.forEach((num, index) => {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'memory-number';
                numberDiv.textContent = num;
                numbersDisplay.appendChild(numberDiv);

                setTimeout(() => {
                    numberDiv.style.background = '#28a745';
                }, index * 1000);

                setTimeout(() => {
                    numberDiv.style.background = '#667eea';
                }, index * 1000 + 500);
            });

            // 创建输入按钮
            setTimeout(() => {
                for (let i = 1; i <= 9; i++) {
                    const btn = document.createElement('button');
                    btn.className = 'memory-input-btn';
                    btn.textContent = i;
                    btn.addEventListener('click', () => handleMemoryInput(i));
                    inputDisplay.appendChild(btn);
                }
            }, gameState.memory.sequence.length * 1000 + 1000);
        }

        function handleMemoryInput(num) {
            gameState.memory.playerSequence.push(num);
            const currentIndex = gameState.memory.playerSequence.length - 1;

            // 检查是否正确
            if (num === gameState.memory.sequence[currentIndex]) {
                // 正确
                const btn = inputDisplay.querySelector(`button:nth-child(${num})`);
                btn.classList.add('active');

                if (gameState.memory.playerSequence.length === gameState.memory.sequence.length) {
                    // 完成当前级别
                    setTimeout(() => {
                        gameState.memory.level++;
                        resultDisplay.textContent = `🎉 级别 ${gameState.memory.level - 1} 完成！继续下一级？`;
                        resultDisplay.className = 'game-result success';
                        
                        setTimeout(() => {
                            if (gameState.memory.level <= 5) {
                                startMemoryGame();
                            } else {
                                endMemoryGame();
                            }
                        }, 2000);
                    }, 500);
                }
            } else {
                // 错误
                endMemoryGame();
            }
        }

        function endMemoryGame() {
            gameState.memory.isRunning = false;
            startBtn.disabled = false;
            resultDisplay.textContent = `游戏结束！你完成了 ${gameState.memory.level - 1} 级`;
            resultDisplay.className = 'game-result info';
            
            // 保存分数
            saveScore('memory', (gameState.memory.level - 1) * 10);
        }

        function resetMemoryGame() {
            gameState.memory.isRunning = false;
            startBtn.disabled = false;
            numbersDisplay.innerHTML = '';
            inputDisplay.innerHTML = '';
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
        }
    }

    // 快速点击游戏
    function initClickGame() {
        const startBtn = document.getElementById('start-click');
        const resetBtn = document.getElementById('reset-click');
        const timerDisplay = document.getElementById('click-timer');
        const targetDisplay = document.getElementById('click-target');
        const scoreDisplay = document.getElementById('click-score');
        const resultDisplay = document.getElementById('click-result');

        startBtn.addEventListener('click', function() {
            if (!gameState.click.isRunning) {
                startClickGame();
            }
        });

        resetBtn.addEventListener('click', function() {
            resetClickGame();
        });

        function startClickGame() {
            gameState.click.isRunning = true;
            gameState.click.score = 0;
            gameState.click.timeLeft = 10;
            startBtn.disabled = true;
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
            scoreDisplay.textContent = '0';

            // 随机移动目标
            moveTarget();

            gameState.click.timer = setInterval(() => {
                gameState.click.timeLeft--;
                timerDisplay.textContent = gameState.click.timeLeft;

                if (gameState.click.timeLeft <= 0) {
                    endClickGame();
                }
            }, 1000);
        }

        function moveTarget() {
            if (!gameState.click.isRunning) return;

            const maxX = window.innerWidth - 200;
            const maxY = window.innerHeight - 200;
            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            targetDisplay.style.position = 'fixed';
            targetDisplay.style.left = x + 'px';
            targetDisplay.style.top = y + 'px';

            setTimeout(moveTarget, 1000 + Math.random() * 1000);
        }

        targetDisplay.addEventListener('click', function() {
            if (gameState.click.isRunning) {
                gameState.click.score++;
                scoreDisplay.textContent = gameState.click.score;
                
                // 添加点击效果
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });

        function endClickGame() {
            gameState.click.isRunning = false;
            clearInterval(gameState.click.timer);
            startBtn.disabled = false;
            timerDisplay.textContent = '10';

            let message, className;
            if (gameState.click.score >= 20) {
                message = `🎉 太棒了！你点击了 ${gameState.click.score} 次！`;
                className = 'success';
            } else if (gameState.click.score >= 10) {
                message = `👍 不错！你点击了 ${gameState.click.score} 次`;
                className = 'success';
            } else {
                message = `😊 继续练习！你点击了 ${gameState.click.score} 次`;
                className = 'info';
            }

            resultDisplay.textContent = message;
            resultDisplay.className = `game-result ${className}`;

            // 保存分数
            saveScore('click', gameState.click.score);
        }

        function resetClickGame() {
            gameState.click.isRunning = false;
            clearInterval(gameState.click.timer);
            startBtn.disabled = false;
            timerDisplay.textContent = '10';
            scoreDisplay.textContent = '0';
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
            targetDisplay.style.position = 'static';
        }
    }

    // 颜色匹配游戏
    function initColorGame() {
        const startBtn = document.getElementById('start-color');
        const resetBtn = document.getElementById('reset-color');
        const timerDisplay = document.getElementById('color-timer');
        const gridDisplay = document.getElementById('color-grid');
        const scoreDisplay = document.getElementById('color-score');
        const resultDisplay = document.getElementById('click-result');

        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

        startBtn.addEventListener('click', function() {
            if (!gameState.color.isRunning) {
                startColorGame();
            }
        });

        resetBtn.addEventListener('click', function() {
            resetColorGame();
        });

        function startColorGame() {
            gameState.color.isRunning = true;
            gameState.color.score = 0;
            gameState.color.timeLeft = 30;
            gameState.color.selectedCells = [];
            startBtn.disabled = true;
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
            scoreDisplay.textContent = '0';

            createColorGrid();

            gameState.color.timer = setInterval(() => {
                gameState.color.timeLeft--;
                timerDisplay.textContent = gameState.color.timeLeft;

                if (gameState.color.timeLeft <= 0) {
                    endColorGame();
                }
            }, 1000);
        }

        function createColorGrid() {
            gridDisplay.innerHTML = '';
            const colorPairs = [];
            
            // 创建颜色对
            for (let i = 0; i < 8; i++) {
                const color = colors[i % colors.length];
                colorPairs.push(color, color);
            }

            // 打乱颜色
            for (let i = colorPairs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [colorPairs[i], colorPairs[j]] = [colorPairs[j], colorPairs[i]];
            }

            // 创建网格
            colorPairs.forEach((color, index) => {
                const cell = document.createElement('div');
                cell.className = 'color-cell';
                cell.style.backgroundColor = color;
                cell.dataset.color = color;
                cell.dataset.index = index;
                cell.addEventListener('click', () => handleColorClick(cell));
                gridDisplay.appendChild(cell);
            });
        }

        function handleColorClick(cell) {
            if (!gameState.color.isRunning || cell.classList.contains('matched') || cell.classList.contains('selected')) {
                return;
            }

            cell.classList.add('selected');
            gameState.color.selectedCells.push(cell);

            if (gameState.color.selectedCells.length === 2) {
                const [cell1, cell2] = gameState.color.selectedCells;
                
                if (cell1.dataset.color === cell2.dataset.color) {
                    // 匹配成功
                    setTimeout(() => {
                        cell1.classList.remove('selected');
                        cell2.classList.remove('selected');
                        cell1.classList.add('matched');
                        cell2.classList.add('matched');
                        gameState.color.score++;
                        scoreDisplay.textContent = gameState.color.score;
                    }, 500);
                } else {
                    // 匹配失败
                    setTimeout(() => {
                        cell1.classList.remove('selected');
                        cell2.classList.remove('selected');
                    }, 1000);
                }

                gameState.color.selectedCells = [];
            }
        }

        function endColorGame() {
            gameState.color.isRunning = false;
            clearInterval(gameState.color.timer);
            startBtn.disabled = false;
            timerDisplay.textContent = '30';

            let message, className;
            if (gameState.color.score >= 6) {
                message = `🎉 太棒了！你匹配了 ${gameState.color.score} 对！`;
                className = 'success';
            } else if (gameState.color.score >= 3) {
                message = `👍 不错！你匹配了 ${gameState.color.score} 对`;
                className = 'success';
            } else {
                message = `😊 继续练习！你匹配了 ${gameState.color.score} 对`;
                className = 'info';
            }

            resultDisplay.textContent = message;
            resultDisplay.className = `game-result ${className}`;

            // 保存分数
            saveScore('color', gameState.color.score);
        }

        function resetColorGame() {
            gameState.color.isRunning = false;
            clearInterval(gameState.color.timer);
            startBtn.disabled = false;
            timerDisplay.textContent = '30';
            scoreDisplay.textContent = '0';
            resultDisplay.textContent = '';
            resultDisplay.className = 'game-result';
            gridDisplay.innerHTML = '';
        }
    }

    // 分数保存和排行榜
    function saveScore(gameType, score) {
        const scores = JSON.parse(localStorage.getItem(`${gameType}Scores`) || '[]');
        const playerName = prompt('请输入你的名字：') || '匿名玩家';
        
        scores.push({
            name: playerName,
            score: score,
            date: new Date().toLocaleString('zh-CN')
        });

        // 按分数排序
        scores.sort((a, b) => b.score - a.score);

        // 只保留前10名
        if (scores.length > 10) {
            scores.splice(10);
        }

        localStorage.setItem(`${gameType}Scores`, JSON.stringify(scores));
        updateLeaderboard();
    }

    function updateLeaderboard() {
        const gameTypes = ['perception', 'memory', 'click', 'color'];
        
        gameTypes.forEach(type => {
            const scores = JSON.parse(localStorage.getItem(`${type}Scores`) || '[]');
            const leaderboardElement = document.getElementById(`${type}-scores`);
            
            if (leaderboardElement) {
                leaderboardElement.innerHTML = '';
                
                scores.forEach((score, index) => {
                    const item = document.createElement('div');
                    item.className = `leaderboard-item rank-${index + 1}`;
                    item.innerHTML = `
                        <span class="rank-number">#${index + 1}</span>
                        <span class="player-name">${score.name}</span>
                        <span class="player-score">${score.score}</span>
                    `;
                    leaderboardElement.appendChild(item);
                });
            }
        });
    }

    // 排行榜标签切换
    function initLeaderboardTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // 移除所有活动状态
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加活动状态
                this.classList.add('active');
                document.getElementById(`${targetTab}-leaderboard`).classList.add('active');
            });
        });
    }

    // 初始化所有游戏
    initPerceptionGame();
    initMemoryGame();
    initClickGame();
    initColorGame();
    initLeaderboardTabs();
    updateLeaderboard();

    // 添加页面加载动画
    function addGameAnimations() {
        const gameCards = document.querySelectorAll('.game-card');
        const tipItems = document.querySelectorAll('.tip-item');
        
        gameCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + index * 200);
        });

        tipItems.forEach((item, index) => {
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
    addGameAnimations();

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按空格键暂停/继续游戏
        if (e.code === 'Space') {
            e.preventDefault();
            // 这里可以添加暂停功能
        }
        
        // 按R键重置当前游戏
        if (e.key.toLowerCase() === 'r') {
            const activeGame = document.querySelector('.game-card:hover');
            if (activeGame) {
                const resetBtn = activeGame.querySelector('.game-btn.reset');
                if (resetBtn) {
                    resetBtn.click();
                }
            }
        }
    });
}); 