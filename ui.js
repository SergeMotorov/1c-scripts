function createMenu() {
    // Проверяем, нет ли уже меню
    if (document.getElementById('mainMenu')) return;

    // Создаём свёрнутое Меню1
    let mainMenu = document.createElement('div');
    mainMenu.id = 'mainMenu';
    mainMenu.style.position = 'fixed';
    mainMenu.style.top = '20px';
    mainMenu.style.right = '20px';
    mainMenu.style.width = '50px';
    mainMenu.style.height = '50px';
    mainMenu.style.background = 'linear-gradient(135deg, #0078D7, #0053A6)';
    mainMenu.style.borderRadius = '50%';
    mainMenu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    mainMenu.style.cursor = 'pointer';
    mainMenu.style.zIndex = '100000';
    mainMenu.style.transition = 'width 0.3s, height 0.3s, border-radius 0.3s';
    mainMenu.style.display = 'flex';
    mainMenu.style.alignItems = 'center';
    mainMenu.style.justifyContent = 'center';
    mainMenu.style.color = 'white';
    mainMenu.style.fontSize = '20px';
    mainMenu.innerText = '≡';

    // Создаём Меню2 (панель управления)
    let controlPanel = document.createElement('div');
    controlPanel.id = 'controlPanel';
    controlPanel.style.position = 'fixed';
    controlPanel.style.top = '20px';
    controlPanel.style.right = '20px';
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

    // При наведении на Меню2 блокируем обновления страницы
    controlPanel.onmouseenter = () => {
        document.body.style.pointerEvents = 'none';
    };
    controlPanel.onmouseleave = () => {
        document.body.style.pointerEvents = 'auto';
    };

    // Функция для разворачивания/сворачивания меню
    mainMenu.onclick = () => {
        if (controlPanel.style.display === 'none') {
            mainMenu.style.width = '200px';
            mainMenu.style.height = '50px';
            mainMenu.style.borderRadius = '12px';
            mainMenu.innerText = '×';
            controlPanel.style.display = 'flex';
        } else {
            mainMenu.style.width = '50px';
            mainMenu.style.height = '50px';
            mainMenu.style.borderRadius = '50%';
            mainMenu.innerText = '≡';
            controlPanel.style.display = 'none';
        }
    };

    // Добавляем элементы в body
    document.body.appendChild(mainMenu);
    document.body.appendChild(controlPanel);
}
createMenu();
