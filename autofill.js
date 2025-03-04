async function fetchGoogleSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${config.range}?key=${config.apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) throw new Error("Нет данных");

        return data.values.map(row => ({
            article: row[0] || "",
            quantity: row[1] || "",
            price: row[2] || "",
            total: row[3] || ""
        }));
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        return [];
    }
}

async function fillDataIn1C() {
    console.log("🔄 Заполняем данные в 1С...");
    let data = await fetchGoogleSheetData();

    for (let i = 0; i < data.length; i++) {
        let { article, quantity, price, total } = data[i];

        if (!article) continue; // Пропускаем пустые строки

        // 2.0 Создаём новую строку
        let addRowBtn = document.querySelector("[id^='form'][id$='_ТоварыДобавить'] > span");
        if (addRowBtn) {
            addRowBtn.click();
            await sleep(500);
        }

        // 2.1 Проверяем, что выбрано поле артикула
        let articleField = document.querySelector("#grid_form2_Товары .gridLine.select.eActivityBack > div:nth-child(2) > div > div");
        if (articleField) {
            await typeText(articleField, article);
        }

        // 2.3 Имитируем выбор артикула
        await sleep(500);
        let selectedItem = document.querySelector(".eddText.dots");
        if (!selectedItem || !selectedItem.innerText.includes(article)) {
            console.warn(`❌ Артикул ${article} не найден!`);
            pauseScript();
            return;
        }
        selectedItem.click();
        await sleep(500);

        // 2.4 Ввод количества
        let quantityField = document.querySelector("#grid_form2_Товары .gridLine.select.eActivityBack > div:nth-child(3) > div > div");
        if (quantityField) {
            await typeText(quantityField, quantity);
        }

        // 2.6 Ввод цены (если есть)
        if (price) {
            let priceField = document.querySelector("#grid_form2_Товары .gridLine.select.eActivityBack > div:nth-child(5) > div > div");
            if (priceField) {
                await typeText(priceField, price);
            }
        }

        // 2.7 Ввод суммы (если есть)
        if (total) {
            let totalField = document.querySelector("#grid_form2_Товары .gridLine.select.eActivityBack > div:nth-child(6) > div > div");
            if (totalField) {
                await typeText(totalField, total);
            }
        }

        await sleep(500);
    }
}
async function typeText(element, text) {
    element.focus();
    element.value = "";
    for (let char of text) {
        element.value += char;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(100 + Math.random() * 50); // Имитируем задержку печати
    }
}
let isPaused = false;

function pauseScript() {
    isPaused = true;
    console.log("⏸ Скрипт на паузе.");
}

function resumeScript() {
    isPaused = false;
    console.log("▶️ Возобновление скрипта.");
    fillDataIn1C(); // Возобновляем процесс
}

async function sleep(ms) {
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.fillDataIn1C = fillDataIn1C;
