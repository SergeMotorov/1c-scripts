function createMenu() {
    let menuId = 'menu' + Math.floor(Math.random() * 100000);
    let panelId = 'panel' + Math.floor(Math.random() * 100000);

    if (document.getElementById(menuId)) return;

    // Создаём квадратное, светло-голубое Меню1 (25x25 пикселей) с анимацией
    let mainMenu = document.createElement('div');
    mainMenu.id = menuId;
    mainMenu.style.position = 'fixed';
    mainMenu.style.top = '20px';
    mainMenu.style.right = '20px';
    mainMenu.style.width = '25px';
    mainMenu.style.height = '25px';
    mainMenu.style.background = 'linear-gradient(135deg, #B0E0E6, #87CEEB)';
    mainMenu.style.borderRadius = '5px';
    mainMenu.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
    mainMenu.style.cursor = 'pointer';
    mainMenu.style.zIndex = '100000';
    mainMenu.style.display = 'flex';
    mainMenu.style.alignItems = 'center';
    mainMenu.style.justifyContent = 'center';
    mainMenu.style.color = 'black';
    mainMenu.style.fontSize = '14px';
    mainMenu.style.fontWeight = 'bold';
    mainMenu.innerText = '≡';
    mainMenu.style.transition = 'all 0.3s ease';

    // Добавляем эффект увеличения при наведении
    mainMenu.onmouseover = () => {
        mainMenu.style.transform = 'scale(1.2)';
    };
    mainMenu.onmouseout = () => {
        mainMenu.style.transform = 'scale(1)';
    };

    // Создаём Меню2 (изначально скрытое)
    let controlPanel = document.createElement('div');
    controlPanel.id = panelId;
    controlPanel.style.position = 'fixed';
    controlPanel.style.top = '20px';
    controlPanel.style.right = '50px';
    controlPanel.style.width = '200px';
    controlPanel.style.background = 'rgba(255, 255, 255, 0.95)';
    controlPanel.style.borderRadius = '12px';
    controlPanel.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    controlPanel.style.padding = '10px';
    controlPanel.style.display = 'none';
    controlPanel.style.flexDirection = 'column';
    controlPanel.style.gap = '10px';
    controlPanel.style.zIndex = '100001';
    controlPanel.style.fontFamily = 'Segoe UI, sans-serif';

    // Заголовок Меню2
    let panelTitle = document.createElement('div');
    panelTitle.textContent = 'Меню управления';
    panelTitle.style.fontSize = '16px';
    panelTitle.style.fontWeight = 'bold';
    panelTitle.style.marginBottom = '10px';
    controlPanel.appendChild(panelTitle);

    // Функция для добавления кнопок с иконками
    function addButton(text, icon, action) {
        let button = document.createElement('button');
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.gap = '8px';
        button.style.padding = '10px';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';
        button.style.transition = '0.3s';
        button.style.fontSize = '14px';
        button.style.fontWeight = 'bold';
        button.style.fontFamily = 'Segoe UI, sans-serif';
        button.style.background = '#0078D7';
        button.style.color = 'white';
        button.onmouseover = () => button.style.background = '#0053A6';
        button.onmouseout = () => button.style.background = '#0078D7';
        button.onclick = action;

        let btnIcon = document.createElement('span');
        btnIcon.innerHTML = icon;
        button.appendChild(btnIcon);

        let btnText = document.createElement('span');
        btnText.textContent = text;
        button.appendChild(btnText);

        controlPanel.appendChild(button);
    }

   // Добавляем кнопки в Меню2
addButton("Заполнить данные", "📝", () => {
    console.log("📝 Кнопка 'Заполнить данные' нажата");
    if (typeof fillDataIn1C === "function") {
        fillDataIn1C();
    } else {
        console.error("❌ Функция fillDataIn1C не найдена!");
        alert("Функция не загружена!");
    }
});


  
// Кнопка "Пауза" → Меняется на "Продолжить"
let pauseButton = addButton("Пауза", "⏸️", function () {
    if (this.textContent.includes("Пауза")) {
        this.innerHTML = "▶️ <span>Продолжить</span>";
    } else {
        this.innerHTML = "⏸️ <span>Пауза</span>";
    }
});
  
addButton("Настройки", "⚙️", () => alert("Открыть настройки"));

    // При наведении на Меню2 курсор остаётся активным
    controlPanel.onmouseenter = () => {
        document.body.style.pointerEvents = 'none';
    };
    controlPanel.onmouseleave = () => {
        document.body.style.pointerEvents = 'auto';
    };

    // Функция для разворачивания/сворачивания меню
    mainMenu.onclick = () => {
        controlPanel.style.display = controlPanel.style.display === 'none' ? 'flex' : 'none';
    };

    // Добавляем элементы в body
    document.body.appendChild(mainMenu);
    document.body.appendChild(controlPanel);

    // 🔥 Защита от удаления 1С: если Меню1 удалят, оно пересоздастся
    const observer = new MutationObserver(() => {
        if (!document.body.contains(mainMenu)) {
            console.log("⚠️ 1С удалила Меню1! Восстанавливаю...");
            createMenu();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// Запускаем создание меню
setTimeout(createMenu, 3000);
