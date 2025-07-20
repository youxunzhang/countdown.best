// Chinese Time System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Twelve time periods data
    const timePeriods = [
        { name: 'Zi Hour', start: 23, end: 1, organ: 'Gallbladder Meridian Active', description: 'Gallbladder governs decision-making, time for rest and energy conservation', period: 'zi' },
        { name: 'Chou Hour', start: 1, end: 3, organ: 'Liver Meridian Active', description: 'Liver governs detoxification, time for deep sleep', period: 'chou' },
        { name: 'Yin Hour', start: 3, end: 5, organ: 'Lung Meridian Active', description: 'Lung governs qi, time for fresh air breathing', period: 'yin' },
        { name: 'Mao Hour', start: 5, end: 7, organ: 'Large Intestine Meridian Active', description: 'Large intestine governs conduction, time for elimination', period: 'mao' },
        { name: 'Chen Hour', start: 7, end: 9, organ: 'Stomach Meridian Active', description: 'Stomach governs reception, time for breakfast', period: 'chen' },
        { name: 'Si Hour', start: 9, end: 11, organ: 'Spleen Meridian Active', description: 'Spleen governs transformation, time for work and study', period: 'si' },
        { name: 'Wu Hour', start: 11, end: 13, organ: 'Heart Meridian Active', description: 'Heart governs spirit, time for noon rest', period: 'wu' },
        { name: 'Wei Hour', start: 13, end: 15, organ: 'Small Intestine Meridian Active', description: 'Small intestine governs absorption, time for digestion', period: 'wei' },
        { name: 'Shen Hour', start: 15, end: 17, organ: 'Bladder Meridian Active', description: 'Bladder governs qi transformation, time for exercise', period: 'shen' },
        { name: 'You Hour', start: 17, end: 19, organ: 'Kidney Meridian Active', description: 'Kidney governs essence storage, time for kidney nourishment', period: 'you' },
        { name: 'Xu Hour', start: 19, end: 21, organ: 'Pericardium Meridian Active', description: 'Pericardium governs protection, time for relaxation', period: 'xu' },
        { name: 'Hai Hour', start: 21, end: 23, organ: 'Triple Burner Meridian Active', description: 'Triple burner governs regulation, time to prepare for sleep', period: 'hai' }
    ];

    // Get current time period
    function getCurrentPeriod(hour) {
        for (let period of timePeriods) {
            if (period.start <= period.end) {
                // Normal case: start time is less than end time
                if (hour >= period.start && hour < period.end) {
                    return period;
                }
            } else {
                // Cross-day case: start time is greater than end time (like Zi Hour 23:00-01:00)
                if (hour >= period.start || hour < period.end) {
                    return period;
                }
            }
        }
        return timePeriods[0]; // Default return Zi Hour
    }

    // Get next time period
    function getNextPeriod(currentPeriod) {
        const currentIndex = timePeriods.findIndex(p => p.period === currentPeriod.period);
        const nextIndex = (currentIndex + 1) % timePeriods.length;
        return timePeriods[nextIndex];
    }

    // Update current time display
    function updateCurrentTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        
        // Format time
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Format date
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
        
        // Update clock hands
        updateClockHands(now);
        
        // Get current time period
        const currentHour = now.getHours();
        const currentPeriod = getCurrentPeriod(currentHour);
        const nextPeriod = getNextPeriod(currentPeriod);
        
        // Update current time period display
        updatePeriodDisplay('current-period-info', currentPeriod);
        updatePeriodDisplay('next-period-info', nextPeriod);
        
        // Highlight current time period card and clock mark
        highlightCurrentPeriod(currentPeriod.period);
        highlightClockPeriod(currentPeriod.period);
    }

    // Update clock hands
    function updateClockHands(now) {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Convert 24-hour format to 12-hour format for hand display
        const displayHours = hours % 12 || 12;
        
        // Calculate hand angles - Zi Hour corresponds to 12 o'clock position (0 degrees), Wu Hour corresponds to 6 o'clock position (180 degrees)
        const hourAngle = (displayHours * 30) + (minutes * 0.5); // 30 degrees per hour, 0.5 degrees per minute
        const minuteAngle = minutes * 6; // 6 degrees per minute
        const secondAngle = seconds * 6; // 6 degrees per second
        
        // Update hand positions
        const hourHand = document.getElementById('hour-hand');
        const minuteHand = document.getElementById('minute-hand');
        const secondHand = document.getElementById('second-hand');
        
        if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
    }

    // Highlight current time period on clock
    function highlightClockPeriod(currentPeriodId) {
        // Remove highlight from all time period marks
        document.querySelectorAll('.period-mark').forEach(mark => {
            mark.classList.remove('active');
        });
        
        // Add highlight to current time period mark
        const currentMark = document.querySelector(`.${currentPeriodId}-mark`);
        if (currentMark) {
            currentMark.classList.add('active');
        }
    }

    // Update time period display
    function updatePeriodDisplay(elementId, period) {
        const element = document.getElementById(elementId);
        if (element) {
            const periodName = element.querySelector('.period-name');
            const periodTime = element.querySelector('.period-time');
            const periodOrgan = element.querySelector('.period-organ');
            
            if (periodName) periodName.textContent = period.name;
            if (periodTime) periodTime.textContent = `${period.start.toString().padStart(2, '0')}:00 - ${period.end.toString().padStart(2, '0')}:00`;
            if (periodOrgan) periodOrgan.textContent = period.organ;
        }
    }

    // Highlight current time period card
    function highlightCurrentPeriod(currentPeriodId) {
        // Remove all highlights
        document.querySelectorAll('.period-card').forEach(card => {
            card.classList.remove('current-period-highlight');
        });
        
        // Add current time period highlight
        const currentCard = document.querySelector(`[data-period="${currentPeriodId}"]`);
        if (currentCard) {
            currentCard.classList.add('current-period-highlight');
            
            // Scroll to current time period card
            currentCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Add card click effects
    function addCardInteractions() {
        document.querySelectorAll('.period-card').forEach(card => {
            card.addEventListener('click', function() {
                // Remove active state from other cards
                document.querySelectorAll('.period-card').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active state to current card
                this.classList.add('active');
                
                // Show detailed information
                const periodId = this.getAttribute('data-period');
                const period = timePeriods.find(p => p.period === periodId);
                if (period) {
                    showPeriodDetails(period);
                }
            });
            
            // Mouse hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add click effects for clock time period marks
        document.querySelectorAll('.period-mark').forEach(mark => {
            mark.addEventListener('click', function() {
                const periodId = this.getAttribute('data-period');
                const period = timePeriods.find(p => p.period === periodId);
                if (period) {
                    showPeriodDetails(period);
                    
                    // Scroll to corresponding time period card
                    const targetCard = document.querySelector(`[data-period="${periodId}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        
                        // Highlight corresponding card
                        document.querySelectorAll('.period-card').forEach(c => {
                            c.classList.remove('active');
                        });
                        targetCard.classList.add('active');
                    }
                }
            });
        });
    }

    // Show time period detailed information
    function showPeriodDetails(period) {
        // Create detailed information modal
        const modal = document.createElement('div');
        modal.className = 'period-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${period.name} - ${period.organ}</h2>
                <div class="modal-time">${period.start.toString().padStart(2, '0')}:00 - ${period.end.toString().padStart(2, '0')}:00</div>
                <p class="modal-description">${period.description}</p>
                <div class="modal-tips">
                    <h3>Health Tips</h3>
                    <ul>
                        ${getHealthTips(period.period)}
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = function() {
            document.body.removeChild(modal);
        };
        
        // Click outside modal to close
        modal.onclick = function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
        
        // Add animation effect
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Get health tips
    function getHealthTips(periodId) {
        const tips = {
            'zi': ['Early to bed, early to rise', 'Avoid staying up late', 'Drink warm water before sleep'],
            'chou': ['Maintain deep sleep state', 'Avoid emotional excitement', 'Protect liver function'],
            'yin': ['Can wake up early for exercise', 'Deep breathing exercises', 'Keep indoor ventilation'],
            'mao': ['Develop regular bowel habits', 'Drink more water', 'Moderate exercise'],
            'chen': ['Eat breakfast on time', 'Chew slowly and thoroughly', 'Choose nutritious foods'],
            'si': ['Focus on work and study', 'Moderate exercise', 'Maintain good mood'],
            'wu': ['Take a noon nap', 'Avoid intense exercise', 'Keep calm mood'],
            'wei': ['Moderate exercise', 'Drink more water', 'Avoid overwork'],
            'shen': ['Moderate exercise', 'Drink more water', 'Maintain good mood'],
            'you': ['Moderate exercise', 'Avoid overwork', 'Maintain good mood'],
            'xu': ['Relax and prepare for rest', 'Avoid intense exercise', 'Keep calm mood'],
            'hai': ['Prepare for sleep', 'Avoid intense exercise', 'Keep calm mood']
        };
        
        return tips[periodId] ? tips[periodId].map(tip => `<li>${tip}</li>`).join('') : '';
    }

    // Add keyboard shortcuts
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Escape':
                    // Close modal
                    const modal = document.querySelector('.period-modal');
                    if (modal) {
                        document.body.removeChild(modal);
                    }
                    break;
                case 'h':
                case 'H':
                    // Show help information
                    showHelp();
                    break;
            }
        });
    }

    // Show help information
    function showHelp() {
        const helpText = `
            <div class="help-modal">
                <div class="help-content">
                    <h3>Keyboard Shortcuts</h3>
                    <ul>
                        <li><strong>ESC</strong> - Close modal</li>
                        <li><strong>H</strong> - Show help</li>
                    </ul>
                    <h3>Usage Instructions</h3>
                    <ul>
                        <li>Click on time period cards to view detailed information</li>
                        <li>Current time period will be automatically highlighted</li>
                        <li>Page will automatically scroll to current time period</li>
                    </ul>
                </div>
            </div>
        `;
        
        const helpDiv = document.createElement('div');
        helpDiv.innerHTML = helpText;
        document.body.appendChild(helpDiv);
        
        setTimeout(() => {
            helpDiv.remove();
        }, 3000);
    }

    // Add CSS styles
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .period-modal {
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
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .period-modal.show {
                opacity: 1;
            }
            
            .modal-content {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                position: relative;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .close-modal:hover {
                color: #333;
            }
            
            .modal-time {
                font-size: 1.2rem;
                color: #666;
                margin: 10px 0;
            }
            
            .modal-description {
                font-size: 1.1rem;
                line-height: 1.6;
                margin: 15px 0;
            }
            
            .modal-tips ul {
                padding-left: 20px;
            }
            
            .modal-tips li {
                margin: 8px 0;
                line-height: 1.5;
            }
            
            .help-modal {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                z-index: 1001;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            
            .current-period-highlight {
                border: 3px solid #e74c3c !important;
                box-shadow: 0 0 20px rgba(231, 76, 60, 0.5) !important;
                transform: scale(1.05) !important;
            }
            
            .period-card.active {
                border: 3px solid #3498db !important;
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.5) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    function init() {
        addStyles();
        updateCurrentTime();
        addCardInteractions();
        addKeyboardShortcuts();
        
        // Update time every second
        setInterval(updateCurrentTime, 1000);
        
        // Add page loading animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // Start application
    init();
}); 