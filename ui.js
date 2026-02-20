// ui.js
// Maneja SOLO el DOM y la visualización

class CalculatorUI {
    constructor(calculator) {
        this.calc = calculator;

        this.currentEl = document.getElementById("current-operand");
        this.previousEl = document.getElementById("previous-operand");
        this.historyEl = document.getElementById("history-list");
    }

    updateDisplay() {
        // número actual
        this.currentEl.innerText = this.calc.current;

        // operación previa
        this.previousEl.innerText = this.calc.operation
            ? `${this.calc.previous} ${this.calc.operation}`
            : "";

        this.renderHistory();
    }

    renderHistory() {
        this.historyEl.innerHTML = "";

        if (!this.calc.history || this.calc.history.length === 0) {
            this.historyEl.innerHTML =
                '<li class="empty-msg">Sin operaciones</li>';
            return;
        }

        // mostrar solo últimas 5 operaciones
        this.calc.history.slice(0, 5).forEach(item => {
            const li = document.createElement("li");
            li.className = "history-item";

            li.innerHTML = `
                <span>${item.text}</span>
                <small>${item.date}</small>
            `;

            this.historyEl.appendChild(li);
        });
    }
}