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

function numero(e) {
    let num = e.target.innerText;
    if (calcolo.num1 === null) {
        let primo = document.createElement("span");
        primo.id = "primo";
        primo.innerText = num;
        display.appendChild(primo);
        calcolo.num1 = num;
    } else if (calcolo.num1 !== null && calcolo.operazione === null) {
        document.getElementById("primo").innerText += num;
        calcolo.num1 += num;
    } else if (calcolo.operazione !== null && calcolo.num2 === null) {
        let secondo = document.createElement("span");
        secondo.id = "secondo";
        secondo.innerText = num;
        display.appendChild(secondo);
        calcolo.num2 = num;
    } else {
        document.getElementById("secondo").innerText += num;
        calcolo.num2 += num;
    }
}

function operatore(e) {
    let op = e.target.innerText;
    if (calcolo.num1 === null) {
        return;
    } else if (calcolo.num1 !== null && calcolo.operazione === null && calcolo.num2 === null) {
        let operaz = document.createElement("span");
        operaz.id = "operaz";
        operaz.innerText = op;
        display.appendChild(operaz);
        calcolo.operazione = op;
    } else if (calcolo.num1 !== null && calcolo.operazione !== null && calcolo.num2 === null) {
        document.getElementById("operaz").innerText = op;
        calcolo.operazione = op;
    } /*else {
        uguale();
        let operaz = document.createElement("span");
        operaz.id = "operaz";
        operaz.innerText = op;
        display.appendChild(operaz);
        calcolo.operazione = op;
    }*/
}

function cancella() {
    if (calcolo.num1 === null) {
        return;
    } else if (calcolo.num !== null && calcolo.operazione === null) {
        let num = document.getElementById("primo").innerText;
        num = num.slice(0, -1);
        if (num.length === 0) {
            document.getElementById("primo").remove();
            calcolo.num1 = null;
        } else {
            document.getElementById("primo").innerText = num;
            calcolo.num1 = num;
        }
    } else if (calcolo.operazione !== null && calcolo.num2 === null) {
        document.getElementById("operaz").remove();
        calcolo.operazione = null;
    } else {
        let num = document.getElementById("secondo").innerText;
        num = num.slice(0, -1);
        if (num.length === 0) {
            document.getElementById("secondo").remove();
            calcolo.num2 = null;
        } else {
            document.getElementById("secondo").innerText = num;
            calcolo.num2 = num;
        }
    }
}

function elimina() {

}

function percentuale() {

}

function cambioSegno() {

}

function uguale() {

}