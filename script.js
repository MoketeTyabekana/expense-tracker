// Getting our elements from our html file though their ID

const itemName =document.getElementById('expense-name');
const itemPrice =document.getElementById('expense-amount');
const addBtn =document.getElementById('add-expense');
const totalAmount =document.getElementById('total-amount');
const listItems =document.getElementById('expense-list');

let expense =[];

function updateTotal(){
    const total =expense.reduce((sum,expense)=>sum+expense.amount,0);
    totalAmount.textContent=total.toFixed(2);
}

function addExpense(){
    const name=itemName.ariaValueMax;
    const amount =parseFloat(itemPrice.value);

    if (name&&amount){
        const expense={name,amount};
        expense.push(expense);
        updateTotal();
        renderExpense();
        saveExpense();
        itemName.value='';
        itemPrice.value='';
    }
}

addBtn.addEventListener('click',addExpense);