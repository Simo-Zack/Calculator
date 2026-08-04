const display = document.getElementById("display");
const calcolo = {
    "num1": null,
    "operazione": null,
    "num2": null
};

const operatori = document.querySelectorAll(".operatore");
operatori.forEach(op => {
    op.addEventListener("click", operatore);
});

const numeri = document.querySelectorAll(".nero");
numeri.forEach(num => {
    num.addEventListener("click", numero);
});

document.getElementById("cancella").addEventListener("click", elimina);
document.addEventListener("keydown", tastiera);

function numero(e) {
    let num = e.target.innerText;

    if (calcolo.num1 === null) {
        let primo = document.createElement("span");
        primo.id = "primo";
        primo.innerText = num;

        display.appendChild(primo);
        calcolo.num1 = num;
    }
    else if (calcolo.num1 !== null && calcolo.operazione === null) {
        document.getElementById("primo").innerText += num;

        calcolo.num1 += num;
    }
    else if (calcolo.operazione !== null && calcolo.num2 === null) {
        let secondo = document.createElement("span");
        secondo.id = "secondo";
        secondo.innerText = num;

        display.appendChild(secondo);
        calcolo.num2 = num;

        document.getElementById("cancella").innerText = "C";
        document.getElementById("cancella").removeEventListener("click", elimina);
        document.getElementById("cancella").addEventListener("click", eliminaSecondo);
    }
    else {
        document.getElementById("secondo").innerText += num;

        calcolo.num2 += num;
    }
}

function operatore(e) {
    let op = e.target.innerText;

    if (calcolo.num1 === null) {
        return;
    }
    else if (calcolo.num1 !== null && calcolo.operazione === null && calcolo.num2 === null) {
        if (calcolo.num1.indexOf(",") === (calcolo.num1.length - 1)) {
            return;
        }
        else {
            let operaz = document.createElement("span");
            operaz.id = "operaz";
            operaz.innerText = op;

            display.appendChild(operaz);
            calcolo.operazione = op;
        }
    }
    else if (calcolo.num1 !== null && calcolo.operazione !== null && calcolo.num2 === null) {
        document.getElementById("operaz").innerText = op;

        calcolo.operazione = op;
    }
    else {
        if (calcolo.num2.indexOf(",") === (calcolo.num2.length - 1)) {
            return;
        }
        else {
            uguale();

            let operaz = document.createElement("span");
            operaz.id = "operaz";
            operaz.innerText = op;

            display.appendChild(operaz);
            calcolo.operazione = op;

            document.getElementById("cancella").innerText = "AC";
            document.getElementById("cancella").removeEventListener("click", eliminaSecondo);
            document.getElementById("cancella").addEventListener("click", elimina);
        }
    }
}

function cancella() {
    if (calcolo.num1 === null) {
        return;
    }
    else if (calcolo.num !== null && calcolo.operazione === null) {
        let num = document.getElementById("primo").innerText;

        num = num.slice(0, -1);

        if (num.length === 0) {
            document.getElementById("primo").remove();

            calcolo.num1 = null;
        }
        else {
            document.getElementById("primo").innerText = num;

            calcolo.num1 = num;
        }
    }
    else if (calcolo.operazione !== null && calcolo.num2 === null) {
        document.getElementById("operaz").remove();

        calcolo.operazione = null;
    }
    else {
        let num = document.getElementById("secondo").innerText;

        num = num.slice(0, -1);

        if (num.length === 0) {
            document.getElementById("secondo").remove();

            calcolo.num2 = null;

            document.getElementById("cancella").innerText = "AC";
            document.getElementById("cancella").removeEventListener("click", eliminaSecondo);
            document.getElementById("cancella").addEventListener("click", elimina);
        }
        else {
            document.getElementById("secondo").innerText = num;

            calcolo.num2 = num;
        }
    }
}

function elimina() {
    if (calcolo.num1 === null) {
        return;
    } else {
        display.replaceChildren();

        calcolo.num1 = null;
        calcolo.operazione = null;
    }
}

function eliminaSecondo() {
    if (document.getElementById("secondo")) {
        display.removeChild(document.getElementById("secondo"));
    }

    calcolo.num2 = null;

    document.getElementById("cancella").innerText = "AC";
    document.getElementById("cancella").removeEventListener("click", eliminaSecondo);
    document.getElementById("cancella").addEventListener("click", elimina);
}

function percentuale() {
    if (calcolo.num1 === null || (calcolo.operazione !== null && calcolo.num2 === null)) {
        return;
    }
    else if (calcolo.num1 !== null && calcolo.operazione === null) {
        document.getElementById("primo").innerText += "%";

        calcolo.num1 = `${+calcolo.num1 / 100}`;
    } else {
        document.getElementById("secondo").innerText += "%";

        calcolo.num2 = `${+calcolo.num2 / 100}`;
    }
}

function cambioSegno() {
    if (calcolo.num1 === null || (calcolo.operazione !== null && calcolo.num2 === null)) {
        return;
    }
    else if (calcolo.num1 !== null && calcolo.operazione === null) {
        if (+document.getElementById("primo").innerText > 0) {
            document.getElementById("primo").innerText = `-${document.getElementById("primo").innerText}`;

            calcolo.num1 = `${document.getElementById("primo").innerText * -1}`;
        } else {
            document.getElementById("primo").innerText = `${document.getElementById("primo").innerText * -1}`;

            calcolo.num1 = `${document.getElementById("primo").innerText * -1}`;
        }
    } else {
        if (calcolo.operazione === "+") {
            document.getElementById("operaz").innerText = "-";

            calcolo.operazione = "-";
        }
        else if (calcolo.operazione === "-") {
            document.getElementById("operaz").innerText = "+";

            calcolo.operazione = "+";
        }
        else {
            if (+document.getElementById("secondo").innerText > 0) {
                document.getElementById("secondo").innerText = `-${document.getElementById("secondo").innerText}`;

                calcolo.num1 = `${document.getElementById("secondo").innerText * -1}`;
            } else {
                document.getElementById("secondo").innerText = `${document.getElementById("secondo").innerText * -1}`;

                calcolo.num1 = `${document.getElementById("secondo").innerText * -1}`;
            }
        }
    }
}

function virgola() {
    if (calcolo.num1 === null || (calcolo.operazione !== null && calcolo.num2 === null)) {
        return;
    }
    else if (calcolo.num1 !== null && calcolo.operazione === null) {
        if (calcolo.num1.indexOf(".") === -1) {
            document.getElementById("primo").innerText += ".";

            calcolo.num1 += ".";
        }
        else {
            return;
        }
    } else {
        if (calcolo.num2.indexOf(".") === -1) {
            document.getElementById("secondo").innerText += ".";

            calcolo.num2 += ".";
        }
        else {
            return;
        }
    }
}

function uguale() {
    if (calcolo.num1 === null || calcolo.operazione === null || calcolo.num2 === null) {
        return;
    }
    else {
        if (calcolo.num2.indexOf(".") === (calcolo.num2.length - 1)) {
            return;
        }
        else {
            display.replaceChildren();

            let n1 = +calcolo.num1;
            let n2 = +calcolo.num2;
            let ris = 0;

            switch (calcolo.operazione) {
                case "/":
                    ris = n1 / n2;
                    break;
                case "*":
                    ris = n1 * n2;
                    break;
                case "-":
                    ris = n1 - n2;
                    break;
                case "+":
                    ris = n1 + n2;
                    break;
            }

            let primo = document.createElement("span");
            primo.id = "primo";
            primo.innerText = ris;

            display.appendChild(primo);

            calcolo.num1 = `${ris}`;
            calcolo.operazione = null;
            calcolo.num2 = null;

            document.getElementById("cancella").innerText = "AC";
            document.getElementById("cancella").removeEventListener("click", eliminaSecondo);
            document.getElementById("cancella").addEventListener("click", elimina);
        }
    }
}

function tastiera(e) {
    let tasto = e.key;

    if (tasto === "Backspace") {
        cancella();
    } else if (tasto === "Delete") {
        if (calcolo.num2 === null) {
            elimina();
        } else {
            eliminaSecondo()
        }
    } else if (tasto === "Enter") {
        uguale();
    } else if (tasto === "." || tasto === ",") {
        virgola();
    }
    else if (tasto === "+" || tasto === "-" || tasto === "*" || tasto === "/") {
        if (calcolo.num1 === null) {
            return;
        }
        else if (calcolo.num1 !== null && calcolo.operazione === null && calcolo.num2 === null) {
            if (calcolo.num1.indexOf(",") === (calcolo.num1.length - 1)) {
                return;
            }
            else {
                let operaz = document.createElement("span");
                operaz.id = "operaz";
                operaz.innerText = tasto;

                display.appendChild(operaz);
                calcolo.operazione = tasto;
            }
        }
        else if (calcolo.num1 !== null && calcolo.operazione !== null && calcolo.num2 === null) {
            document.getElementById("operaz").innerText = tasto;

            calcolo.operazione = tasto;
        }
        else {
            if (calcolo.num2.indexOf(",") === (calcolo.num2.length - 1)) {
                return;
            }
            else {
                uguale();

                let operaz = document.createElement("span");
                operaz.id = "operaz";
                operaz.innerText = tasto;

                display.appendChild(operaz);
                calcolo.operazione = tasto;

                document.getElementById("cancella").innerText = "AC";
                document.getElementById("cancella").removeEventListener("click", eliminaSecondo);
                document.getElementById("cancella").addEventListener("click", elimina);
            }
        }
    } else if (+tasto > -1 && +tasto < 10) {
        if (calcolo.num1 === null) {
            let primo = document.createElement("span");
            primo.id = "primo";
            primo.innerText = tasto;

            display.appendChild(primo);
            calcolo.num1 = tasto;
        }
        else if (calcolo.num1 !== null && calcolo.operazione === null) {
            document.getElementById("primo").innerText += tasto;

            calcolo.num1 += tasto;
        }
        else if (calcolo.operazione !== null && calcolo.num2 === null) {
            let secondo = document.createElement("span");
            secondo.id = "secondo";
            secondo.innerText = tasto;

            display.appendChild(secondo);
            calcolo.num2 = tasto;

            document.getElementById("cancella").innerText = "C";
            document.getElementById("cancella").removeEventListener("click", elimina);
            document.getElementById("cancella").addEventListener("click", eliminaSecondo);
        }
        else {
            document.getElementById("secondo").innerText += tasto;

            calcolo.num2 += tasto;
        }
    }
}
