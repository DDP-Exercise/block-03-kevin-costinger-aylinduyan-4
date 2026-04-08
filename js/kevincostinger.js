"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Aylin Duyan  - 2026-03-25
 *******************************************************/
const form = document.querySelector("form");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const expenseInput = document.getElementById("expense");
form.addEventListener("submit", submitForm);

function addExpense(date, amount, expense) {
    const row = document.createElement("tr");
    const tdDate = document.createElement("td");
    tdDate.textContent = date;
    const tdAmount = document.createElement("td");
    tdAmount.textContent = formatEuro(amount);
    const tdExpense = document.createElement("td");
    tdExpense.textContent = expense;
    const tdDelete = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("data-amount", amount);
    tdDelete.append(deleteButton);
    row.append(tdDate);
    row.append(tdAmount);
    row.append(tdExpense);
    row.append(tdDelete);
    document.querySelector("#expenses tbody").append(row);

    sumExpenses += amount;
    updateSum();
}
function updateSum() {
    if (sumExpenses < 0){
        sumExpenses = 0;
    }
    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
}
document.querySelector("#expenses tbody").addEventListener("click", function(e){
    if (e.target.classList.contains("delete")) {
        let amount = parseFloat(e.target.getAttribute("data-amount"));
        sumExpenses -= amount;
        updateSum();
        e.target.closest("tr").remove();
    }
});

let sumExpenses = 0; //Use this variable to keep the sum up to date.

function submitForm(e){
    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

    e.preventDefault();
    let dateValue = dateInput.value;
    let amountValue = parseFloat(amountInput.value);
    let expenseValue = expenseInput.value.trim();

    if (isEmpty(dateValue)){
        alert("Date can't be empty");
        return;
    }
    if (isNaN(amountValue) || amountValue < 0.01){
        alert("Amount must be at least 0.01.");
        return;
    }
    if (expenseValue.length < 3) {
        alert("Expense must be at least 3 characters long.");
        return;
    }
    addExpense(dateValue, amountValue, expenseValue);
    document.querySelector("form").reset();
}


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}