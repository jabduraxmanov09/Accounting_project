let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

const money = value => new Intl.NumberFormat("uz-UZ").format(value) + " so‘m";

function save() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function render() {
  const tbody = document.getElementById("transactions");
  tbody.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((item, index) => {
    if (item.type === "income") income += item.amount;
    else expense += item.amount;

    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.description}</td><td>${item.type === "income" ? "Daromad" : "Xarajat"}</td><td>${money(item.amount)}</td><td><button class="delete" data-index="${index}">O‘chirish</button></td>`;
    tbody.appendChild(row);
  });

  document.getElementById("income").textContent = money(income);
  document.getElementById("expense").textContent = money(expense);
  document.getElementById("balance").textContent = money(income - expense);

  document.querySelectorAll(".delete").forEach(button => {
    button.onclick = () => {
      transactions.splice(Number(button.dataset.index), 1);
      save();
      render();
    };
  });
}

document.getElementById("add").onclick = () => {
  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || amount <= 0) {
    alert("Operatsiya nomi va to‘g‘ri summani kiriting.");
    return;
  }

  transactions.push({ description, amount, type });
  save();
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  render();
};

render();