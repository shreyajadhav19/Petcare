document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("photoForm");
  const photoInput = document.getElementById("photoInput");
  const captionInput = document.getElementById("caption");
  const gallery = document.getElementById("gallery");

  const loadGallery = () => {
    const photos = JSON.parse(localStorage.getItem("petPhotos")) || [];
    gallery.innerHTML = "";
    photos.forEach((photo, index) => {
      const card = document.createElement("div");
      card.className = "pet-card";
      card.innerHTML = `
        <img src="${photo.image}" alt="Pet Photo" />
        <p>${photo.caption || "No caption 🐾"}</p>
        <button onclick="deletePhoto(${index})" class="delete-btn">🗑</button>
      `;
      gallery.appendChild(card);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = photoInput.files[0];
    const caption = captionInput.value;

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const photos = JSON.parse(localStorage.getItem("petPhotos")) || [];
      photos.push({ image: reader.result, caption });
      localStorage.setItem("petPhotos", JSON.stringify(photos));
      form.reset();
      loadGallery();
    };

    reader.readAsDataURL(file);
  });

  window.deletePhoto = (index) => {
    const photos = JSON.parse(localStorage.getItem("petPhotos")) || [];
    photos.splice(index, 1);
    localStorage.setItem("petPhotos", JSON.stringify(photos));
    loadGallery();
  };

  loadGallery();
});
