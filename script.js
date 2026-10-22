let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {

    const name = document.getElementById("expenseName").value;
    const amount = document.getElementById("expenseAmount").value;
    const category = document.getElementById("expenseCategory").value;

    if (name === "" || amount === "") {
        alert("Please enter expense name and amount.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: Number(amount),
        category: category
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    displayExpenses();
}

function displayExpenses() {

    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    if (expenses.length === 0) {

        expenseList.innerHTML =
            '<p class="empty">No expenses added yet.</p>';

        updateSummary();
        return;
    }

    expenses.forEach(function(expense) {

        const div = document.createElement("div");

        div.className = "expense-item";

        div.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category}</p>
            </div>

            <div>
                <span class="amount">
                    ₹${expense.amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    🗑️
                </button>
            </div>
        `;

        expenseList.appendChild(div);
    });

    updateSummary();
}

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

function updateSummary() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    document.getElementById("totalAmount").textContent =
        "₹" + total;

    document.getElementById("totalExpenses").textContent =
        expenses.length;
}

displayExpenses();