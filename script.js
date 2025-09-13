const img = document.getElementById("img");
const btn = document.getElementById("change");
const firstImage = "absolute_cinema.jpg";
const secondImage = "absolute_catastrophe.jpg";

btn.addEventListener("click", () => {
  if (img.src.includes(firstImage)) {
    img.src = secondImage;
  } else {
    img.src = firstImage;
  }
});