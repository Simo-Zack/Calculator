const elementi = document.querySelectorAll(".operatore");
elementi.forEach(el => {
    el.addEventListener("click", operatore);
});

const 

function operatore(e) {
    let operazione = e.target.innerText;
    document.getElementById("display").innerText = operazione;
}