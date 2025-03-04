function createMenu() {
    // Проверяем, нет ли уже меню
    if (document.getElementById('mainMenu')) return;

    // Создаём квадратное, светло-голубое Меню1 (25x25 пикселей)
    let mainMenu = document.createElement('div');
    mainMenu.id = 'mainMenu';
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

    // Создаём Меню2 (изначально скрытое)
    let controlPanel = document.createElement('div');
    controlPanel.id = 'controlPanel';
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
createMenu();
