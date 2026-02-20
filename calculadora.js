// calculator.js
// Maneja SOLO la lógica matemática y el estado

class Calculator {
    constructor() {
        this.reset();

        // sistema extensible de operaciones
        this.operations = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => b === 0 ? "Error" : a / b
        };
    }

    // reinicia estado
    reset() {
        this.current = "0";
        this.previous = "";
        this.operation = null;
        this.history = [];
    }

    // agregar número
    appendNumber(number) {
        if (number === "." && this.current.includes(".")) return;

        this.current =
            this.current === "0" && number !== "."
                ? number
                : this.current + number;
    }

    // seleccionar operación
    setOperation(op) {
        if (!this.current) return;

        if (this.previous) this.compute();

        this.operation = op;
        this.previous = this.current;
        this.current = "";
    }

    // calcular resultado
    compute() {
        const a = parseFloat(this.previous);
        const b = parseFloat(this.current);

        if (isNaN(a) || isNaN(b)) return;

        const operationFn = this.operations[this.operation];
        if (!operationFn) return;

        const result = operationFn(a, b);

        // guardar historial
        this.history.unshift({
            text: `${a} ${this.operation} ${b} = ${result}`,
            date: new Date().toLocaleTimeString()
        });

        this.current = String(result);
        this.operation = null;
        this.previous = "";
    }

    // borrar último dígito
    deleteLast() {
        if (this.current.length <= 1) {
            this.current = "0";
            return;
        }

        this.current = this.current.slice(0, -1);
    }
}