const form = document.querySelector("form");
const category = document.querySelector("#category");
const expense = document.querySelector("#expense");
const amount = document.querySelector("#amount");

//Lista de itens
const expenseList = document.querySelector("ul");

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

    selectedIndex = category.options.selectedIndex;
    const newExpense = {
        idExpense : new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
})

function expenseAdd(newExpense){
    try{
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        expenseList.appendChild(expenseItem);

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt",`${newExpense.category_name}`);

        expenseItem.appendChild(expenseIcon);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        expenseItem.appendChild(expenseInfo);

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        expenseInfo.appendChild(expenseName);

        const expenseCategoryName = document.createElement("span");
        expenseCategoryName.textContent = newExpense.category_name;

        expenseInfo.appendChild(expenseCategoryName);

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseItem.appendChild(expenseAmount);

        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace("R$","")}`;

        const expenseRemove = document.createElement("img");
        expenseRemove.classList.add("remove-icon");
        expenseRemove.setAttribute("src","img/remove.svg");
        expenseRemove.setAttribute("alt","remove");

        expenseItem.appendChild(expenseRemove);

        const requests = document.querySelector("header span");
        let numberRequests = expenseList.querySelectorAll("li").length;
        
        requests.textContent = `${numberRequests} solicitações`;

        const amountRequests = document.querySelectorAll(".expense-amount");
        let sumAmount = 0;
        for(i = 0; i < numberRequests; i++){
            let amountValue = formartAmount(amountRequests[i].textContent);
            sumAmount += amountValue;
        }
        
        const totalAmount = document.querySelector("header h2");

        totalAmount.innerHTML = `<small>R$</small> ${formartCurrencyBRL(sumAmount)}`;
    }catch(e){
        alert("Não foi possivel concluir a operação")
    }
}

function formartAmount(value){
    value = value.replace("R$","");
    value = value.replace(".","").trim();
    value = value.replace(",",".");
    return Number(value);
}

const removeIcon = document.querySelector(".remove-icon");

removeIcon.addEventListener("click",(event)=>{
    alert("remover");
})