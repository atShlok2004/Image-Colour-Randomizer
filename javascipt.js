const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const randomizeBtn = document.getElementById('randomizeBtn');
const downloadBtn = document.getElementById('downloadBtn');

let loadedImage = null;

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Ensure it's an image file
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    loadedImage = new Image();
    loadedImage.onload = () => {
      // Set canvas dimensions to match the loaded image
      canvas.width = loadedImage.width;
      canvas.height = loadedImage.height;
      // Clear any existing filter and draw the image
      ctx.filter = 'none';
      ctx.drawImage(loadedImage, 0, 0);
    };
    loadedImage.onerror = () => {
      console.error('Error loading the image.');
    };
    loadedImage.src = event.target.result;
  };

  reader.onerror = () => {
    console.error('Error reading the file.');
  };

  reader.readAsDataURL(file);
});

randomizeBtn.addEventListener('click', () => {
  if (!loadedImage) {
    alert('Please load an image first.');
    return;
  }
  // Generate a random hue rotation (0-360 degrees)
  const randomHue = Math.floor(Math.random() * 360);
  // Set the filter for the canvas context
  ctx.filter = ctx.filter = `hue-rotate(${randomHue}deg)`;
;
  // Clear the canvas and redraw the image with the new filter
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(loadedImage, 0, 0);
});

downloadBtn.addEventListener('click', () => {
  if (!loadedImage) {
    alert('No image to download.');
    return;
  }
  const link = document.createElement('a');
  link.download = 'randomized_image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
