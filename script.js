const items = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCounter = document.getElementById('lightbox-counter');

let visibleItems = Array.from(items);
let currentIndex = 0;

// Filter Gallery Items
function filterImages(category, btnElement) {
  // Update Active Button Style
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  visibleItems = [];

  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
      visibleItems.push(item);
    } else {
      item.style.display = 'none';
    }
  });
}

// Open Lightbox
function openLightbox(index) {
  const clickedItem = items[index];
  currentIndex = visibleItems.indexOf(clickedItem);
  
  if (currentIndex === -1) currentIndex = 0;

  updateLightboxContent();
  lightbox.style.display = 'flex';
}

// Update Image, Caption, and Counter
function updateLightboxContent() {
  const currentItem = visibleItems[currentIndex];
  const imgUrl = currentItem.querySelector('img').src;
  const title = currentItem.getAttribute('data-title');

  lightboxImg.src = imgUrl;
  lightboxTitle.innerText = title;
  lightboxCounter.innerText = `${currentIndex + 1} of ${visibleItems.length}`;
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Next / Prev Slide
function changeSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = visibleItems.length - 1;
  } else if (currentIndex >= visibleItems.length) {
    currentIndex = 0;
  }
  updateLightboxContent();
}

// Close Lightbox on Click Outside Image
window.onclick = function(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
};

// Keyboard Arrow Navigation
document.addEventListener('keydown', function(event) {
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowRight') changeSlide(1);
    if (event.key === 'ArrowLeft') changeSlide(-1);
    if (event.key === 'Escape') closeLightbox();
  }
});