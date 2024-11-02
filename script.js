// Getting our elements from our html file through their ID
const itemName = document.getElementById('expense-name');
const itemPrice = document.getElementById('expense-amount');
const addBtn = document.getElementById('add-expense');
const totalAmount = document.getElementById('total-amount');
const listItems = document.getElementById('expense-list');

let expenses = [];

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function addExpense() {
    const name = itemName.value;
    const amount = parseFloat(itemPrice.value);

    if (name && amount) {
        const expense = { name, amount };
        expenses.push(expense);
        updateTotal();
        renderExpenses();
        saveExpenses();
        itemName.value = '';
        itemPrice.value = '';
    }
}

addBtn.addEventListener('click', addExpense);

function renderExpenses() {
    listItems.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} - R${expense.amount.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteExpense(index);

        li.appendChild(deleteBtn);
        listItems.appendChild(li);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTotal();
    renderExpenses();
    saveExpenses();
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        updateTotal();
        renderExpenses();
    }
}

window.onload = loadExpenses;
