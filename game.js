// 牧场养鸡大亨游戏主逻辑

// 游戏配置
const CONFIG = {
    PRICES: {
        CHICKEN: 10000,
        FEED: 10,
        SELL_CHICKEN: 1000,
        SELL_EGG: 100
    },
    PRODUCTION_RATES: {
        EGG: [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1],
        HATCH: [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.012]
    },
    RANCH_RATINGS: [
        { min: 1, max: 9, name: '破鸡笼', level: 1 },
        { min: 10, max: 19, name: '简陋鸡棚', level: 2 },
        { min: 20, max: 29, name: '木屋鸡舍', level: 3 },
        { min: 30, max: 39, name: '玄铁鸡舍', level: 4 },
        { min: 40, max: 49, name: '青铜养鸡场', level: 5 },
        { min: 50, max: 59, name: '白银养鸡场', level: 6 },
        { min: 60, max: 69, name: '黄金牧场', level: 7 },
        { min: 70, max: 79, name: '黑金牧场', level: 8 },
        { min: 80, max: 89, name: '钻石牧场', level: 9 },
        { min: 90, max: 99, name: '星耀牧场', level: 10 },
        { min: 100, max: 100, name: '最NB牧场', level: 11 }
    ],
    ENVIRONMENT_DECORATIONS: [
        [],
        ['🌱'],
        ['🌱', '🌻'],
        ['🌱', '🌻', '🌳'],
        ['🌱', '🌻', '🌳', '🌲'],
        ['🌱', '🌻', '🌳', '🌲', '🌺'],
        ['🌱', '🌻', '🌳', '🌲', '🌺', '🌸'],
        ['🌱', '🌻', '🌳', '🌲', '🌺', '🌸', '🌴'],
        ['🌱', '🌻', '🌳', '🌲', '🌺', '🌸', '🌴', '🌵'],
        ['🌱', '🌻', '🌳', '🌲', '🌺', '🌸', '🌴', '🌵', '🌷'],
        ['🌱', '🌻', '🌳', '🌲', '🌺', '🌸', '🌴', '🌵', '🌷', '🌹', '✨', '⭐']
    ]
};

// 游戏状态
let gameState = {
    user: {
        nickname: '',
        avatar: ''
    },
    resources: {
        gold: 10000,
        feed: 0,
        chickens: 1,
        eggs: 0
    },
    ranch: {
        level: 1,
        rating: '破鸡笼',
        ratingLevel: 1
    },
    manualHatch: {
        clicks: 0,
        required: 100
    },
    lastSaveTime: Date.now()
};

// DOM元素
const elements = {
    registrationScreen: document.getElementById('registration-screen'),
    gameScreen: document.getElementById('game-screen'),
    avatarPreview: document.getElementById('avatar-preview'),
    avatarGrid: document.getElementById('avatar-grid'),
    nicknameInput: document.getElementById('nickname'),
    startGameBtn: document.getElementById('start-game-btn'),
    userAvatar: document.getElementById('user-avatar'),
    userName: document.getElementById('user-name'),
    ranchLevel: document.getElementById('ranch-level'),
    ranchRating: document.getElementById('ranch-rating'),
    goldDisplay: document.getElementById('gold'),
    feedDisplay: document.getElementById('feed'),
    feedDisplay2: document.getElementById('feed-display'),
    chickenCount: document.getElementById('chicken-count'),
    chickenCapacity: document.getElementById('chicken-capacity'),
    eggCount: document.getElementById('egg-count'),
    eggCapacity: document.getElementById('egg-capacity'),
    coopStructure: document.getElementById('coop-structure'),
    chickensContainer: document.getElementById('chickens-container'),
    environment: document.getElementById('environment'),
    upgradeCost: document.getElementById('upgrade-cost'),
    tradeModal: document.getElementById('trade-modal'),
    modalTitle: document.getElementById('modal-title'),
    quantitySlider: document.getElementById('quantity-slider'),
    quantityValue: document.getElementById('quantity-value'),
    totalCost: document.getElementById('total-cost'),
    confirmBtn: document.getElementById('confirm-btn'),
    cancelBtn: document.getElementById('cancel-btn'),
    toast: document.getElementById('toast'),
    buyChickenBtn: document.getElementById('buy-chicken-btn'),
    buyFeedBtn: document.getElementById('buy-feed-btn'),
    sellChickenBtn: document.getElementById('sell-chicken-btn'),
    sellEggBtn: document.getElementById('sell-egg-btn'),
    upgradeRanchBtn: document.getElementById('upgrade-ranch-btn'),
    // 扫码相关元素
    scanQrBtn: document.getElementById('scan-qr-btn'),
    scanModal: document.getElementById('scan-modal'),
    cameraScanBtn: document.getElementById('camera-scan-btn'),
    fileScanBtn: document.getElementById('file-scan-btn'),
    cameraContainer: document.getElementById('camera-container'),
    fileContainer: document.getElementById('file-container'),
    cameraVideo: document.getElementById('camera-video'),
    cameraCanvas: document.getElementById('camera-canvas'),
    stopCameraBtn: document.getElementById('stop-camera-btn'),
    qrFileInput: document.getElementById('qr-file-input'),
    filePreview: document.getElementById('file-preview'),
    scanResult: document.getElementById('scan-result'),
    scanCode: document.getElementById('scan-code'),
    verifyBtn: document.getElementById('verify-btn'),
    rescanBtn: document.getElementById('rescan-btn'),
    scanLoading: document.getElementById('scan-loading'),
    closeScanBtn: document.getElementById('close-scan-btn'),
    // 手动输入相关元素
    manualInputBtn: document.getElementById('manual-input-btn'),
    manualInputContainer: document.getElementById('manual-input-container'),
    manualCodeInput: document.getElementById('manual-code-input'),
    confirmManualBtn: document.getElementById('confirm-manual-btn'),
    cancelManualBtn: document.getElementById('cancel-manual-btn'),
    inputError: document.getElementById('input-error'),
    // 生成验证码元素
    generateCodesBtn: document.getElementById('generate-codes-btn'),
    // 注销相关元素
    logoutBtn: document.getElementById('logout-btn'),
    logoutModal: document.getElementById('logout-modal'),
    logoutPassword: document.getElementById('logout-password'),
    logoutError: document.getElementById('logout-error'),
    confirmLogoutBtn: document.getElementById('confirm-logout-btn'),
    cancelLogoutBtn: document.getElementById('cancel-logout-btn'),
    // 游戏标题点击相关元素
    gameTitle: document.getElementById('game-title'),
    clickCounter: document.getElementById('click-counter'),
    clickProgress: document.getElementById('click-progress')
};

// 标题点击计数器
let titleClickCount = 0;
const REQUIRED_CLICKS = 30;
let clickTimer = null;

// 当前交易类型
let currentTrade = null;

// 初始化游戏
function initGame() {
    loadGame();
    setupEventListeners();
    
    if (gameState.user.nickname) {
        showGameScreen();
    }
    
    // 处理离线进度
    processOfflineProgress();
    
    // 开始游戏循环
    startGameLoop();
    
    // 自动保存
    setInterval(saveGame, 30000);
}

// 设置事件监听器
function setupEventListeners() {
    // 头像选择
    setupAvatarSelection();
    
    // 游戏标题点击（生成验证码按钮显示）
    setupTitleClickHandler();
    
    // 开始游戏
    elements.startGameBtn.addEventListener('click', startGame);
    
    // 交易按钮
    elements.buyChickenBtn.addEventListener('click', () => openTradeModal('buyChicken'));
    elements.buyFeedBtn.addEventListener('click', () => openTradeModal('buyFeed'));
    elements.sellChickenBtn.addEventListener('click', () => openTradeModal('sellChicken'));
    elements.sellEggBtn.addEventListener('click', () => openTradeModal('sellEgg'));
    elements.upgradeRanchBtn.addEventListener('click', upgradeRanch);
    
    // 弹窗控制
    elements.quantitySlider.addEventListener('input', updateTradeDisplay);
    elements.confirmBtn.addEventListener('click', confirmTrade);
    elements.cancelBtn.addEventListener('click', closeTradeModal);
    
    // 手动孵化
    elements.coopStructure.addEventListener('click', handleManualHatch);
    
    // 点击牧场区域让鸡啄食
    elements.chickensContainer.addEventListener('click', handleChickenClick);
    
    // 扫码功能
    elements.scanQrBtn.addEventListener('click', openScanModal);
    elements.closeScanBtn.addEventListener('click', closeScanModal);
    elements.cameraScanBtn.addEventListener('click', startCameraScan);
    elements.fileScanBtn.addEventListener('click', () => {
        elements.fileContainer.classList.remove('hidden');
        elements.cameraContainer.classList.add('hidden');
        stopCamera();
    });
    elements.stopCameraBtn.addEventListener('click', stopCamera);
    elements.qrFileInput.addEventListener('change', handleFileScan);
    elements.verifyBtn.addEventListener('click', verifyCode);
    elements.rescanBtn.addEventListener('click', resetScan);
    
    // 手动输入功能
    elements.manualInputBtn.addEventListener('click', showManualInput);
    elements.confirmManualBtn.addEventListener('click', handleManualSubmit);
    elements.cancelManualBtn.addEventListener('click', hideManualInput);
    elements.manualCodeInput.addEventListener('input', handleManualInput);
    elements.manualCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleManualSubmit();
        }
    });
    
    // 生成验证码功能
    elements.generateCodesBtn.addEventListener('click', generateVerificationCodes);
    
    // 注销功能
    elements.logoutBtn.addEventListener('click', openLogoutModal);
    elements.cancelLogoutBtn.addEventListener('click', closeLogoutModal);
    elements.confirmLogoutBtn.addEventListener('click', handleLogout);
    elements.logoutPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogout();
        }
    });
}

// 设置头像选择功能
function setupAvatarSelection() {
    const avatarOptions = elements.avatarGrid.querySelectorAll('.avatar-option');
    
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 移除其他选中状态
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 添加选中状态
            option.classList.add('selected');
            
            // 获取选中的头像
            const selectedAvatar = option.dataset.avatar;
            gameState.user.avatar = selectedAvatar;
            
            // 更新预览
            elements.avatarPreview.innerHTML = `<span class="selected-avatar">${selectedAvatar}</span>`;
            elements.avatarPreview.classList.add('has-avatar');
            
            // 播放音效
            playSound('click');
        });
    });
}

// 设置游戏标题点击处理器
function setupTitleClickHandler() {
    elements.gameTitle.addEventListener('click', handleTitleClick);
}

// 处理游戏标题点击
function handleTitleClick() {
    // 添加点击动画
    elements.gameTitle.classList.add('clicking');
    setTimeout(() => {
        elements.gameTitle.classList.remove('clicking');
    }, 300);
    
    // 增加计数
    titleClickCount++;
    
    // 显示计数器
    elements.clickCounter.classList.remove('hidden');
    elements.clickCounter.classList.add('show');
    elements.clickProgress.textContent = titleClickCount;
    
    // 移除动画类以便下次触发
    setTimeout(() => {
        elements.clickCounter.classList.remove('show');
    }, 300);
    
    // 检查是否达到目标
    if (titleClickCount >= REQUIRED_CLICKS) {
        // 显示生成验证码按钮
        elements.generateCodesBtn.classList.remove('hidden');
        elements.clickCounter.classList.add('complete');
        
        // 播放成功音效
        playSound('success');
        
        // 显示提示
        showToast('🎉 隐藏功能已解锁！');
        
        // 重置计数（可选，保持按钮显示）
        titleClickCount = 0;
        
        // 清除点击计时器
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
        }
    } else {
        // 播放点击音效
        playSound('click');
        
        // 重置计时器（3秒内没有点击则重置计数）
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        
        clickTimer = setTimeout(() => {
            if (titleClickCount > 0 && titleClickCount < REQUIRED_CLICKS) {
                titleClickCount = 0;
                elements.clickCounter.classList.add('hidden');
                elements.clickProgress.textContent = '0';
            }
        }, 3000);
    }
}

// 开始游戏
function startGame() {
    const nickname = elements.nicknameInput.value.trim();
    if (!nickname) {
        showToast('请输入昵称！');
        return;
    }
    if (!gameState.user.avatar) {
        showToast('请选择头像！');
        return;
    }
    
    gameState.user.nickname = nickname;
    saveGame();
    showGameScreen();
}

// 显示游戏界面
function showGameScreen() {
    elements.registrationScreen.classList.add('hidden');
    elements.gameScreen.classList.remove('hidden');

    // 更新用户信息显示
    // 检查是否是emoji头像
    if (gameState.user.avatar && gameState.user.avatar.length <= 2) {
        // 使用emoji作为头像，创建一个data URL
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff9e6';
        ctx.fillRect(0, 0, 100, 100);
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(gameState.user.avatar, 50, 55);
        elements.userAvatar.src = canvas.toDataURL();
    } else {
        elements.userAvatar.src = gameState.user.avatar;
    }
    elements.userName.textContent = gameState.user.nickname;

    updateUI();
    renderChickens();
    updateEnvironment();
}

// 获取牧场评级信息
function getRanchRatingInfo(level) {
    for (const rating of CONFIG.RANCH_RATINGS) {
        if (level >= rating.min && level <= rating.max) {
            return rating;
        }
    }
    return CONFIG.RANCH_RATINGS[0];
}

// 计算升级成本
function calculateUpgradeCost(level) {
    return Math.pow(level, 3) + 5 * Math.pow(level, 2) + 294 * level;
}

// 获取容量限制
function getCapacity(level) {
    return {
        chickens: level * 5,
        eggs: level * 100,
        feed: level * 3600
    };
}

// 更新UI显示
function updateUI() {
    const capacity = getCapacity(gameState.ranch.level);
    const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
    const upgradeCost = calculateUpgradeCost(gameState.ranch.level);
    
    // 更新状态面板
    elements.ranchLevel.textContent = gameState.ranch.level;
    elements.ranchRating.textContent = ratingInfo.name;
    elements.goldDisplay.textContent = formatNumber(gameState.resources.gold);
    elements.feedDisplay.textContent = formatNumber(gameState.resources.feed);
    elements.feedDisplay2.textContent = formatNumber(gameState.resources.feed);
    elements.chickenCount.textContent = formatNumber(gameState.resources.chickens);
    elements.chickenCapacity.textContent = capacity.chickens;
    elements.eggCount.textContent = formatNumber(gameState.resources.eggs);
    elements.eggCapacity.textContent = capacity.eggs;
    
    // 更新升级成本
    elements.upgradeCost.textContent = formatNumber(upgradeCost) + '金币';
    
    // 更新鸡笼外观
    elements.coopStructure.className = `coop-structure level-${ratingInfo.level}`;
    
    // 更新按钮状态
    updateButtonStates();
}

// 更新按钮状态
function updateButtonStates() {
    const capacity = getCapacity(gameState.ranch.level);
    const upgradeCost = calculateUpgradeCost(gameState.ranch.level);
    
    elements.buyChickenBtn.disabled = gameState.resources.gold < CONFIG.PRICES.CHICKEN || 
                                       gameState.resources.chickens >= capacity.chickens;
    elements.buyFeedBtn.disabled = gameState.resources.gold < CONFIG.PRICES.FEED || 
                                    gameState.resources.feed >= capacity.feed;
    elements.sellChickenBtn.disabled = gameState.resources.chickens <= 0;
    elements.sellEggBtn.disabled = gameState.resources.eggs <= 0;
    elements.upgradeRanchBtn.disabled = gameState.resources.gold < upgradeCost || 
                                         gameState.ranch.level >= 100;
}

// 格式化数字
// 格式化数字显示：去除小数点，使用适当单位
function formatNumber(num) {
    const intNum = Math.floor(num);
    if (intNum >= 100000000) {
        return Math.floor(intNum / 100000000) + '亿';
    } else if (intNum >= 10000) {
        return Math.floor(intNum / 10000) + '万';
    } else if (intNum >= 1000) {
        return Math.floor(intNum / 1000) + '千';
    }
    return intNum.toString();
}

// 计算时保留三位有效数字
function roundToThreeDecimals(num) {
    return Number(num.toFixed(3));
}

// 渲染鸡
function renderChickens() {
    const container = elements.chickensContainer;
    container.innerHTML = '';
    
    // 显示的鸡数量基于牧场评级
    const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
    const visibleChickens = Math.min(ratingInfo.level, gameState.resources.chickens);
    
    for (let i = 0; i < visibleChickens; i++) {
        const chicken = document.createElement('div');
        chicken.className = 'chicken';
        chicken.textContent = '🐔';
        chicken.style.left = Math.random() * 80 + 10 + '%';
        chicken.style.top = Math.random() * 60 + 20 + '%';
        chicken.style.animationDelay = Math.random() * 2 + 's';
        chicken.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(chicken);
    }
}

// 更新环境装饰
function updateEnvironment() {
    const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
    const decorations = CONFIG.ENVIRONMENT_DECORATIONS[ratingInfo.level - 1] || [];
    
    elements.environment.innerHTML = decorations.map(decoration => 
        `<span>${decoration}</span>`
    ).join('');
}

// 打开交易弹窗
function openTradeModal(type) {
    currentTrade = type;
    const capacity = getCapacity(gameState.ranch.level);
    
    let title, maxQuantity, unitPrice;
    
    switch(type) {
        case 'buyChicken':
            title = '购买鸡';
            maxQuantity = Math.min(
                Math.floor(gameState.resources.gold / CONFIG.PRICES.CHICKEN),
                capacity.chickens - gameState.resources.chickens
            );
            unitPrice = CONFIG.PRICES.CHICKEN;
            break;
        case 'buyFeed':
            title = '购买饲料（斤）';
            maxQuantity = Math.min(
                Math.floor(gameState.resources.gold / CONFIG.PRICES.FEED),
                capacity.feed - gameState.resources.feed
            );
            unitPrice = CONFIG.PRICES.FEED;
            break;
        case 'sellChicken':
            title = '出售鸡';
            maxQuantity = gameState.resources.chickens;
            unitPrice = CONFIG.PRICES.SELL_CHICKEN;
            break;
        case 'sellEgg':
            title = '出售鸡蛋';
            maxQuantity = gameState.resources.eggs;
            unitPrice = CONFIG.PRICES.SELL_EGG;
            break;
    }
    
    if (maxQuantity <= 0) {
        showToast(type.startsWith('buy') ? '资源不足或容量已满！' : '没有可出售的资源！');
        return;
    }
    
    elements.modalTitle.textContent = title;
    elements.quantitySlider.max = maxQuantity;
    elements.quantitySlider.value = 1;
    elements.quantityValue.textContent = '1';
    elements.totalCost.textContent = unitPrice.toLocaleString();
    
    elements.tradeModal.classList.remove('hidden');
}

// 更新交易显示
function updateTradeDisplay() {
    const quantity = parseInt(elements.quantitySlider.value);
    elements.quantityValue.textContent = quantity;
    
    let unitPrice;
    switch(currentTrade) {
        case 'buyChicken':
            unitPrice = CONFIG.PRICES.CHICKEN;
            break;
        case 'buyFeed':
            unitPrice = CONFIG.PRICES.FEED;
            break;
        case 'sellChicken':
            unitPrice = CONFIG.PRICES.SELL_CHICKEN;
            break;
        case 'sellEgg':
            unitPrice = CONFIG.PRICES.SELL_EGG;
            break;
    }
    
    const total = quantity * unitPrice;
    elements.totalCost.textContent = total.toLocaleString();
}

// 关闭交易弹窗
function closeTradeModal() {
    elements.tradeModal.classList.add('hidden');
    currentTrade = null;
}

// 确认交易
function confirmTrade() {
    if (!currentTrade) return;
    
    const quantity = parseInt(elements.quantitySlider.value);
    const capacity = getCapacity(gameState.ranch.level);
    
    switch(currentTrade) {
        case 'buyChicken':
            const chickenCost = quantity * CONFIG.PRICES.CHICKEN;
            if (gameState.resources.gold >= chickenCost && 
                gameState.resources.chickens + quantity <= capacity.chickens) {
                gameState.resources.gold -= chickenCost;
                gameState.resources.chickens += quantity;
                showToast(`成功购买 ${quantity} 只鸡！`);
                playSound('buy');
            }
            break;
        case 'buyFeed':
            const feedCost = quantity * CONFIG.PRICES.FEED;
            if (gameState.resources.gold >= feedCost && 
                gameState.resources.feed + quantity <= capacity.feed) {
                gameState.resources.gold -= feedCost;
                gameState.resources.feed += quantity;
                showToast(`成功购买 ${quantity} 斤饲料！`);
                playSound('buy');
            }
            break;
        case 'sellChicken':
            if (gameState.resources.chickens >= quantity) {
                const chickenRevenue = quantity * CONFIG.PRICES.SELL_CHICKEN;
                gameState.resources.chickens -= quantity;
                gameState.resources.gold += chickenRevenue;
                showToast(`成功出售 ${quantity} 只鸡，获得 ${chickenRevenue} 金币！`);
                playSound('sell');
            }
            break;
        case 'sellEgg':
            if (gameState.resources.eggs >= quantity) {
                const eggRevenue = quantity * CONFIG.PRICES.SELL_EGG;
                gameState.resources.eggs -= quantity;
                gameState.resources.gold += eggRevenue;
                showToast(`成功出售 ${quantity} 个鸡蛋，获得 ${eggRevenue} 金币！`);
                playSound('sell');
            }
            break;
    }
    
    updateUI();
    renderChickens();
    closeTradeModal();
    saveGame();
}

// 升级牧场
function upgradeRanch() {
    const cost = calculateUpgradeCost(gameState.ranch.level);
    
    if (gameState.resources.gold < cost) {
        showToast('金币不足！');
        return;
    }
    
    if (gameState.ranch.level >= 100) {
        showToast('牧场已达到最高等级！');
        return;
    }
    
    gameState.resources.gold -= cost;
    gameState.ranch.level++;
    
    const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
    gameState.ranch.rating = ratingInfo.name;
    gameState.ranch.ratingLevel = ratingInfo.level;
    
    // 更新手动孵化所需点击数
    gameState.manualHatch.required = 101 - gameState.ranch.level;
    
    showToast(`恭喜！牧场升级到等级 ${gameState.ranch.level} - ${ratingInfo.name}！`);
    playSound('upgrade');
    
    updateUI();
    renderChickens();
    updateEnvironment();
    saveGame();
}

// 处理手动孵化
function handleManualHatch() {
    if (gameState.resources.eggs <= 0) {
        showToast('没有鸡蛋可以孵化！');
        return;
    }
    
    const capacity = getCapacity(gameState.ranch.level);
    if (gameState.resources.chickens >= capacity.chickens) {
        showToast('鸡的数量已达到上限！');
        return;
    }
    
    gameState.manualHatch.clicks++;
    
    // 显示进度
    showHatchProgress();
    
    if (gameState.manualHatch.clicks >= gameState.manualHatch.required) {
        gameState.resources.eggs--;
        gameState.resources.chickens++;
        gameState.manualHatch.clicks = 0;
        
        showToast('恭喜！成功孵化一只小鸡！');
        playSound('hatch');
        
        updateUI();
        renderChickens();
        saveGame();
    }
    
    playSound('click');
}

// 显示孵化进度
function showHatchProgress() {
    const progress = (gameState.manualHatch.clicks / gameState.manualHatch.required) * 100;
    
    // 移除已有的进度显示
    const existingProgress = document.querySelector('.hatch-progress');
    if (existingProgress) {
        existingProgress.remove();
    }
    
    const progressDiv = document.createElement('div');
    progressDiv.className = 'hatch-progress';
    progressDiv.innerHTML = `
        <div>孵化进度</div>
        <div class="hatch-progress-bar">
            <div class="hatch-progress-fill" style="width: ${progress}%"></div>
        </div>
        <div>${gameState.manualHatch.clicks}/${gameState.manualHatch.required}</div>
    `;
    
    document.body.appendChild(progressDiv);
    
    setTimeout(() => {
        progressDiv.remove();
    }, 1000);
}

// 处理点击鸡
function handleChickenClick(e) {
    if (e.target.classList.contains('chicken')) {
        e.target.classList.add('pecking');
        setTimeout(() => {
            e.target.classList.remove('pecking');
        }, 500);
        playSound('cluck');
    }
}

// 游戏主循环
function startGameLoop() {
    // 每分钟执行一次资源计算
    setInterval(processGameTick, 60000);
    
    // 每秒更新UI
    setInterval(() => {
        updateUI();
    }, 1000);
}

// 处理游戏刻
function processGameTick() {
    const capacity = getCapacity(gameState.ranch.level);
    const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
    const ratingIndex = ratingInfo.level - 1;
    
    // 饲料消耗（计算时保留三位有效数字）
    const feedConsumption = roundToThreeDecimals(gameState.resources.chickens * 0.5);
    const actualFeedConsumption = roundToThreeDecimals(Math.min(feedConsumption, gameState.resources.feed));
    gameState.resources.feed = roundToThreeDecimals(gameState.resources.feed - actualFeedConsumption);
    
    // 产蛋率（计算时保留三位有效数字）
    const eggRate = CONFIG.PRODUCTION_RATES.EGG[ratingIndex];
    const eggProduction = roundToThreeDecimals(gameState.resources.chickens * eggRate);
    const newEggs = roundToThreeDecimals(Math.min(eggProduction, capacity.eggs - gameState.resources.eggs));
    
    if (newEggs > 0 && actualFeedConsumption >= roundToThreeDecimals(feedConsumption * 0.5)) {
        gameState.resources.eggs += Math.floor(newEggs);
    }
    
    // 孵化率（计算时保留三位有效数字）
    const hatchRate = CONFIG.PRODUCTION_RATES.HATCH[ratingIndex];
    const hatchProduction = roundToThreeDecimals(gameState.resources.eggs * hatchRate);
    const newChickens = roundToThreeDecimals(Math.min(hatchProduction, capacity.chickens - gameState.resources.chickens));
    
    if (newChickens > 0) {
        const hatched = Math.floor(newChickens);
        gameState.resources.eggs -= hatched;
        gameState.resources.chickens += hatched;
        
        if (hatched > 0) {
            showToast(`自动孵化了 ${hatched} 只小鸡！`);
            renderChickens();
        }
    }
    
    updateUI();
    saveGame();
}

// 处理离线进度
function processOfflineProgress() {
    const now = Date.now();
    const offlineTime = roundToThreeDecimals((now - gameState.lastSaveTime) / 1000 / 60); // 分钟
    
    if (offlineTime > 1 && gameState.lastSaveTime > 0) {
        const capacity = getCapacity(gameState.ranch.level);
        const ratingInfo = getRanchRatingInfo(gameState.ranch.level);
        const ratingIndex = ratingInfo.level - 1;
        
        // 离线饲料消耗 (正常速率) - 计算时保留三位有效数字
        const feedConsumption = roundToThreeDecimals(gameState.resources.chickens * 0.5 * offlineTime);
        gameState.resources.feed = roundToThreeDecimals(Math.max(0, gameState.resources.feed - feedConsumption));
        
        // 离线产蛋 (10%速率) - 计算时保留三位有效数字
        const eggRate = roundToThreeDecimals(CONFIG.PRODUCTION_RATES.EGG[ratingIndex] * 0.1);
        const eggProduction = roundToThreeDecimals(gameState.resources.chickens * eggRate * offlineTime);
        const newEggs = Math.min(Math.floor(eggProduction), capacity.eggs - gameState.resources.eggs);
        
        if (newEggs > 0) {
            gameState.resources.eggs += newEggs;
        }
        
        // 离线孵化 (10%速率) - 计算时保留三位有效数字
        const hatchRate = roundToThreeDecimals(CONFIG.PRODUCTION_RATES.HATCH[ratingIndex] * 0.1);
        const hatchProduction = roundToThreeDecimals(gameState.resources.eggs * hatchRate * offlineTime);
        const newChickens = Math.min(Math.floor(hatchProduction), capacity.chickens - gameState.resources.chickens);
        
        if (newChickens > 0) {
            gameState.resources.eggs -= newChickens;
            gameState.resources.chickens += newChickens;
        }
        
        if (newEggs > 0 || newChickens > 0) {
            showToast(`离线收益：获得 ${newEggs} 个鸡蛋，孵化 ${newChickens} 只小鸡！`);
        }
        
        renderChickens();
    }
}

// 显示提示消息
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.remove('hidden');
    
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 2000);
}

// 播放音效 (使用Web Audio API)
function playSound(type) {
    // 创建简单的音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'buy':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'sell':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'upgrade':
            oscillator.frequency.value = 1000;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'hatch':
            oscillator.frequency.value = 1200;
            gainNode.gain.value = 0.15;
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'click':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.05;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
        case 'cluck':
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.08;
            oscillator.start();
            oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.15;
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.15);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'error':
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'reward':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 1000;
                gain2.gain.value = 0.2;
                osc2.start();
                osc2.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.1);
                osc2.stop(audioContext.currentTime + 0.1);
            }, 100);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
    }
}

// ==================== 扫码功能 ====================

let currentScanCode = '';
let cameraStream = null;
let scanInterval = null;

// 打开扫码弹窗
function openScanModal() {
    elements.scanModal.classList.remove('hidden');
    resetScan();
}

// 关闭扫码弹窗
function closeScanModal() {
    elements.scanModal.classList.add('hidden');
    stopCamera();
    resetScan();
}

// 重置扫码状态
function resetScan() {
    currentScanCode = '';
    elements.cameraContainer.classList.add('hidden');
    elements.fileContainer.classList.add('hidden');
    elements.scanResult.classList.add('hidden');
    elements.scanLoading.classList.add('hidden');
    elements.filePreview.innerHTML = '';
    elements.qrFileInput.value = '';
    stopCamera();
}

// 开始摄像头扫描
async function startCameraScan() {
    try {
        elements.cameraContainer.classList.remove('hidden');
        elements.fileContainer.classList.add('hidden');
        
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        
        elements.cameraVideo.srcObject = cameraStream;
        
        // 开始持续扫描
        scanInterval = setInterval(() => {
            scanFromCamera();
        }, 500);
        
    } catch (error) {
        showToast('无法访问摄像头，请使用图片扫描方式');
        console.error('Camera error:', error);
        elements.cameraContainer.classList.add('hidden');
    }
}

// 停止摄像头
function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    if (scanInterval) {
        clearInterval(scanInterval);
        scanInterval = null;
    }
    elements.cameraVideo.srcObject = null;
}

// 从摄像头扫描
function scanFromCamera() {
    if (!cameraStream) return;
    
    const canvas = elements.cameraCanvas;
    const video = elements.cameraVideo;
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    
    if (code && code.data) {
        const scannedCode = code.data.trim();
        if (/^\d{6}$/.test(scannedCode)) {
            currentScanCode = scannedCode;
            stopCamera();
            showScanResult(scannedCode);
        }
    }
}

// 处理文件扫描
function handleFileScan(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            elements.filePreview.innerHTML = '';
            elements.filePreview.appendChild(img);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code && code.data) {
                const scannedCode = code.data.trim();
                if (/^\d{6}$/.test(scannedCode)) {
                    currentScanCode = scannedCode;
                    showScanResult(scannedCode);
                } else {
                    showToast('二维码内容必须是6位数字');
                }
            } else {
                showToast('未能识别二维码，请尝试其他图片');
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// 显示扫描结果
function showScanResult(code) {
    elements.scanCode.textContent = code;
    elements.scanResult.classList.remove('hidden');
    playSound('success');
}

// 验证验证码
async function verifyCode() {
    if (!currentScanCode || !/^\d{6}$/.test(currentScanCode)) {
        showToast('无效的验证码');
        return;
    }
    
    elements.scanLoading.classList.remove('hidden');
    elements.scanResult.classList.add('hidden');
    
    try {
        // 读取验证码文件
        const response = await fetch('yanzhengma.txt');
        if (!response.ok) {
            throw new Error('无法读取验证码文件');
        }
        
        const text = await response.text();
        // 统一处理换行符，支持 Windows(CRLF) 和 Unix(LF)
        const lines = text.replace(/\r\n/g, '\n').split('\n');

        // 查找验证码
        let codeIndex = -1;
        const validCodes = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line && !line.startsWith('#')) {
                validCodes.push({ line, index: i });
                if (line === currentScanCode) {
                    codeIndex = i;
                }
            }
        }
        
        if (codeIndex === -1) {
            elements.scanLoading.classList.add('hidden');
        showToast('验证码无效或已被使用');
        playSound('error');
        setTimeout(() => {
            resetScan();
        }, 1500);
        return;
    }
    
    // 执行奖励发放
    await processReward(currentScanCode);
    
} catch (error) {
    console.error('Verification error:', error);
        elements.scanLoading.classList.add('hidden');
        showToast('验证失败，请稍后重试');
        playSound('error');
    }
}

// 保存游戏
function saveGame() {
    // 保存时确保数值保留三位有效数字
    if (gameState.resources) {
        if (gameState.resources.feed !== undefined) {
            gameState.resources.feed = roundToThreeDecimals(gameState.resources.feed);
        }
    }
    gameState.lastSaveTime = Date.now();
    localStorage.setItem('ranchChickenGame', JSON.stringify(gameState));
}

// 加载游戏
function loadGame() {
    const saved = localStorage.getItem('ranchChickenGame');
    if (saved) {
        const savedState = JSON.parse(saved);
        gameState = { ...gameState, ...savedState };
        
        // 确保数值计算时保留三位有效数字
        if (gameState.resources) {
            if (gameState.resources.feed !== undefined) {
                gameState.resources.feed = roundToThreeDecimals(gameState.resources.feed);
            }
        }
        
        // 恢复头像显示
        if (gameState.user.avatar) {
            // 检查是否是emoji头像（新格式）还是图片URL（旧格式）
            if (gameState.user.avatar.length <= 2) {
                // Emoji头像
                elements.avatarPreview.innerHTML = `<span class="selected-avatar">${gameState.user.avatar}</span>`;
                elements.avatarPreview.classList.add('has-avatar');
                
                // 恢复头像网格选中状态
                const avatarOptions = elements.avatarGrid.querySelectorAll('.avatar-option');
                avatarOptions.forEach(opt => {
                    if (opt.dataset.avatar === gameState.user.avatar) {
                        opt.classList.add('selected');
                    }
                });
            } else {
                // 旧格式图片头像，重置为未选择状态
                gameState.user.avatar = '';
            }
        }
        
        // 恢复昵称
        if (gameState.user.nickname) {
            elements.nicknameInput.value = gameState.user.nickname;
        }
    }
}

// 处理奖励发放
async function processReward(code) {
    const capacity = getCapacity(gameState.ranch.level);
    const eggsToAdd = 100;
    
    if (gameState.resources.eggs + eggsToAdd > capacity.eggs) {
        elements.scanLoading.classList.add('hidden');
        showToast('鸡蛋存储空间不足，请先出售一些鸡蛋');
        return false;
    }
    
    // 添加鸡蛋
    gameState.resources.eggs += eggsToAdd;
    
    // 记录已使用的验证码
    const usedCodes = JSON.parse(localStorage.getItem('used_yanzhengma') || '[]');
    usedCodes.push({
        code: code,
        time: new Date().toISOString(),
        eggs: eggsToAdd
    });
    localStorage.setItem('used_yanzhengma', JSON.stringify(usedCodes));
    
    elements.scanLoading.classList.add('hidden');
    showToast(`🎉 验证成功！获得 ${eggsToAdd} 个鸡蛋！`);
    playSound('reward');
    
    updateUI();
    saveGame();
    
    setTimeout(() => {
        closeScanModal();
    }, 2000);
    
    return true;
}

// ==================== 手动输入功能 ====================

// 显示手动输入界面
function showManualInput() {
    elements.manualInputContainer.classList.remove('hidden');
    elements.cameraContainer.classList.add('hidden');
    elements.fileContainer.classList.add('hidden');
    elements.scanResult.classList.add('hidden');
    stopCamera();
    
    // 自动聚焦输入框
    setTimeout(() => {
        elements.manualCodeInput.focus();
    }, 100);
}

// 隐藏手动输入界面
function hideManualInput() {
    elements.manualInputContainer.classList.add('hidden');
    elements.manualCodeInput.value = '';
    elements.manualCodeInput.classList.remove('valid', 'invalid');
    hideInputError();
}

// 处理手动输入
function handleManualInput(e) {
    const value = e.target.value;
    
    // 只允许数字
    const numericValue = value.replace(/\D/g, '');
    if (value !== numericValue) {
        e.target.value = numericValue;
    }
    
    // 验证输入
    if (numericValue.length === 6) {
        if (/^\d{6}$/.test(numericValue)) {
            elements.manualCodeInput.classList.add('valid');
            elements.manualCodeInput.classList.remove('invalid');
            hideInputError();
        }
    } else if (numericValue.length > 0) {
        elements.manualCodeInput.classList.remove('valid');
    }
}

// 显示输入错误
function showInputError(message) {
    elements.inputError.textContent = message;
    elements.inputError.classList.remove('hidden');
    elements.manualCodeInput.classList.add('invalid');
    elements.manualCodeInput.classList.remove('valid');
    playSound('error');
}

// 隐藏输入错误
function hideInputError() {
    elements.inputError.classList.add('hidden');
    elements.inputError.textContent = '';
}

// 处理手动提交
async function handleManualSubmit() {
    const code = elements.manualCodeInput.value.trim();
    
    console.log('=== 验证码验证开始 ===');
    console.log('输入的验证码:', code, '长度:', code.length, '类型:', typeof code);
    
    // 验证输入格式
    if (!code) {
        showInputError('请输入验证码');
        return;
    }
    
    if (code.length !== 6) {
        showInputError('验证码必须是6位数字');
        return;
    }
    
    if (!/^\d{6}$/.test(code)) {
        showInputError('验证码只能包含数字');
        return;
    }
    
    // 检查是否已使用过
    const usedCodes = JSON.parse(localStorage.getItem('used_yanzhengma') || '[]');
    const alreadyUsed = usedCodes.some(item => item.code === code);
    
    console.log('已使用的验证码:', usedCodes);
    console.log('是否已使用:', alreadyUsed);
    
    if (alreadyUsed) {
        showInputError('该验证码已被使用');
        return;
    }
    
    // 显示加载状态
    elements.scanLoading.classList.remove('hidden');
    elements.manualInputContainer.classList.add('hidden');
    
    try {
        // 读取验证码文件
        console.log('正在读取 yanzhengma.txt 文件...');
        const response = await fetch('yanzhengma.txt');
        if (!response.ok) {
            throw new Error('无法读取验证码文件，HTTP状态: ' + response.status);
        }
        
        const text = await response.text();
        console.log('文件内容长度:', text.length, '字符');
        
        // 统一处理换行符，支持 Windows(CRLF) 和 Unix(LF)
        const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const lines = normalizedText.split('\n');
        console.log('总行数:', lines.length);

        // 查找验证码
        let codeExists = false;
        let matchingLine = -1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();
            
            // 调试输出前20行和匹配行
            if (i < 20 || trimmedLine.includes(code)) {
                console.log(`行 ${i}: "${trimmedLine}" (原始: "${line}")`);
            }
            
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                if (trimmedLine === code) {
                    codeExists = true;
                    matchingLine = i;
                    console.log('找到匹配验证码，行号:', i);
                    break;
                }
            }
        }
        
        console.log('验证结果: codeExists =', codeExists);
        
        if (!codeExists) {
            elements.scanLoading.classList.add('hidden');
            elements.manualInputContainer.classList.remove('hidden');
            showInputError('验证码无效或不存在');
            return;
        }
        
        // 设置当前验证码并发放奖励
        currentScanCode = code;
        console.log('验证成功，准备发放奖励');
        await processReward(code);
        
    } catch (error) {
        console.error('Manual verification error:', error);
        console.error('错误堆栈:', error.stack);
        elements.scanLoading.classList.add('hidden');
        elements.manualInputContainer.classList.remove('hidden');
        showInputError('验证失败，请稍后重试: ' + error.message);
    }
}

// 生成1000条不重复的6位数字验证码
function generateVerificationCodes() {
    const count = 1000;
    const codes = new Set();
    
    while (codes.size < count) {
        const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        codes.add(code);
    }
    
    const codeArray = Array.from(codes);
    
    // 构建文件内容
    const content = `# 验证码列表 - 共 ${count} 条
# 生成时间: ${new Date().toISOString()}
# 以#开头的行为注释
# 每行一个6位数字验证码

${codeArray.join('\n')}
`;
    
    // 创建下载链接
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yanzhengma.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`✅ 成功生成 ${count} 条验证码！已下载到本地`);
    console.log('示例验证码:', codeArray.slice(0, 5));
}

// ==================== 注销功能 ====================

const LOGOUT_PASSWORD = 'zhuxiao';

// 打开注销弹窗
function openLogoutModal() {
    elements.logoutModal.classList.remove('hidden');
    elements.logoutPassword.value = '';
    elements.logoutError.classList.add('hidden');
    elements.logoutPassword.focus();
}

// 关闭注销弹窗
function closeLogoutModal() {
    elements.logoutModal.classList.add('hidden');
    elements.logoutPassword.value = '';
    elements.logoutError.classList.add('hidden');
}

// 显示注销错误
function showLogoutError(message) {
    elements.logoutError.textContent = message;
    elements.logoutError.classList.remove('hidden');
    playSound('error');
}

// 处理注销
function handleLogout() {
    const password = elements.logoutPassword.value.trim();
    
    // 验证口令
    if (!password) {
        showLogoutError('请输入口令');
        return;
    }
    
    if (password !== LOGOUT_PASSWORD) {
        showLogoutError('口令错误');
        return;
    }
    
    // 清除所有游戏数据
    localStorage.removeItem('ranchChickenGame');
    localStorage.removeItem('yanzhengma_content');
    localStorage.removeItem('used_yanzhengma');
    
    // 重置游戏状态
    gameState.user.nickname = '';
    gameState.user.avatar = '';
    gameState.resources.gold = 10000;
    gameState.resources.feed = 0;
    gameState.resources.chickens = 1;
    gameState.resources.eggs = 0;
    gameState.ranch.level = 1;
    gameState.ranch.rating = '破鸡笼';
    gameState.ranch.ratingLevel = 1;
    gameState.manualHatch.clicks = 0;
    gameState.manualHatch.required = 100;
    gameState.lastSaveTime = Date.now();
    
    // 重置界面
    elements.avatarPreview.innerHTML = '<span>点击上传头像</span>';
    elements.nicknameInput.value = '';
    
    // 显示成功提示
    closeLogoutModal();
    showToast('✅ 注销成功！');
    playSound('success');
    
    // 返回注册界面
    elements.gameScreen.classList.add('hidden');
    elements.registrationScreen.classList.remove('hidden');
}

// 页面加载完成后初始化
window.addEventListener('load', initGame);

// 页面关闭前保存
window.addEventListener('beforeunload', saveGame);
