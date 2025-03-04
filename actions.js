function addButton(text, id, action) {
    let button = document.createElement('button');
    button.id = id;
    button.textContent = text;
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

    document.getElementById('controlPanel').appendChild(button);
}

// Добавляем кнопки
document.addEventListener('DOMContentLoaded', () => {
    addButton("Заполнить данные", "fillDataBtn", () => {
        if (typeof fillDataIn1C === 'function') {
            fillDataIn1C();
        } else {
            alert("Функция заполнения данных пока не работает.");
        }
    });

    let pauseButton = addButton("Пауза", "pauseBtn", () => {
        let btn = document.getElementById("pauseBtn");
        if (btn.textContent === "Пауза") {
            btn.textContent = "Продолжить";
        } else {
            btn.textContent = "Пауза";
        }
    });
});
