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