document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("healthForm");
  const healthList = document.getElementById("healthList");

  const loadRecords = () => {
    const records = JSON.parse(localStorage.getItem("healthRecords")) || [];
    healthList.innerHTML = "";

    records.forEach((record, index) => {
      const card = document.createElement("div");
      card.className = "pet-card";
      card.innerHTML = `
        <h3>${record.vaccine}</h3>
        <p>Date: ${record.date}</p>
        <p>Vet: ${record.vet || 'Not specified'}</p>
        <button onclick="deleteRecord(${index})" class="delete-btn">🗑 Remove</button>
      `;
      healthList.appendChild(card);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const vaccine = document.getElementById("vaccineName").value;
    const date = document.getElementById("vaccineDate").value;
    const vet = document.getElementById("vetName").value;

    const records = JSON.parse(localStorage.getItem("healthRecords")) || [];
    records.push({ vaccine, date, vet });
    localStorage.setItem("healthRecords", JSON.stringify(records));
    form.reset();
    loadRecords();
  });

  window.deleteRecord = (index) => {
    const records = JSON.parse(localStorage.getItem("healthRecords")) || [];
    records.splice(index, 1);
    localStorage.setItem("healthRecords", JSON.stringify(records));
    loadRecords();
  };

  loadRecords();
});
