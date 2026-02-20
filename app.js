document.addEventListener("DOMContentLoaded", () => {

const calc = new Calculator();
const ui = new CalculatorUI(calc);

ui.updateDisplay();

const buttonsContainer = document.querySelector(".buttons");

if (!buttonsContainer) {
    console.error("No existe .buttons en el HTML");
    return;
}

// eventos botones
buttonsContainer.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.number) {
        calc.appendNumber(btn.dataset.number);
    }

    if (btn.dataset.operation) {
        calc.setOperation(btn.dataset.operation);
    }

    if (btn.dataset.action === "equals") calc.compute();
    if (btn.dataset.action === "clear") calc.reset();
    if (btn.dataset.action === "delete") calc.deleteLast();

    ui.updateDisplay();
});

// teclado
document.addEventListener("keydown", e => {
    if ((e.key >= "0" && e.key <= "9") || e.key === ".")
        calc.appendNumber(e.key);

    if (["+", "-", "*", "/"].includes(e.key))
        calc.setOperation(e.key);

    if (e.key === "Enter") calc.compute();
    if (e.key === "Escape") calc.reset();
    if (e.key === "Backspace") calc.deleteLast();

    ui.updateDisplay();
});

// prompt
document.getElementById("btn-prompt")?.addEventListener("click", () => {
    let n1 = parseFloat(prompt("Ingresa primer número"));
    if (isNaN(n1)) return alert("Número inválido");

    let op = prompt("Operación (+ - * /)");
    let n2 = parseFloat(prompt("Segundo número"));
    if (isNaN(n2)) return alert("Número inválido");

    const result = calc.operations[op]?.(n1, n2);
    alert(`${n1} ${op} ${n2} = ${result}`);
});

});