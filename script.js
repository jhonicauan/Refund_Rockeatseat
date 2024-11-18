const form = document.querySelector("form");
const category = document.querySelector("#category");
const expense = document.querySelector("#expense");
const amount = document.querySelector("#amount");

amount.addEventListener("input",(event)=>{
    const regex = /\D+/g
    amount.value = amount.value.replace(regex,"");
    amount.value = formartCurrencyBRL(Number(amount.value/100));
})

function formartCurrencyBRL(value){
    value = value.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL",
    });
    return value;
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    const newExpense = {
        idExpense : new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }
})