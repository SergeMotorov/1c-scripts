function fillDataIn1C() {
    console.log("🔄 Заполняем данные в 1С...");

    let input = document.querySelector("input[type='text']");
    if (input) {
        input.value = "Тестовые данные";
        let event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    } else {
        alert("Поле для ввода не найдено.");
    }
}
