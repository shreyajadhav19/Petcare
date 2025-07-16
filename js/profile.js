document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("petForm");
  const petList = document.getElementById("petList");

  const loadPets = () => {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    petList.innerHTML = "";

    pets.forEach((pet, index) => {
      const card = document.createElement("div");
      card.className = "pet-card";
      card.innerHTML = `
        <img src="${pet.image || 'assets/images/default-pet.png'}" alt="Pet Image" />
        <h3>${pet.name}</h3>
        <p>Breed: ${pet.breed}</p>
        <p>Age: ${pet.age} year(s)</p>
        <button onclick="deletePet(${index})" class="delete-btn">🗑 Remove</button>
      `;
      petList.appendChild(card);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("petName").value;
    const breed = document.getElementById("petBreed").value;
    const age = document.getElementById("petAge").value;
    const imageFile = document.getElementById("petImage").files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const pets = JSON.parse(localStorage.getItem("pets")) || [];
      pets.push({
        name,
        breed,
        age,
        image: reader.result || ""
      });
      localStorage.setItem("pets", JSON.stringify(pets));
      form.reset();
      loadPets();
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onloadend(); // fallback if no image
    }
  });

  window.deletePet = (index) => {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.splice(index, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    loadPets();
  };

  loadPets();
});
