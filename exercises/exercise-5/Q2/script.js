const loadButton = document.getElementById('load-btn');
const imageInputSection = document.getElementById('image-input-section')
const imageInput = document.getElementById('image-input')
const imgSection = document.getElementById('img-section')
const upload = document.getElementById('load-img')
loadButton.addEventListener('click',() => imageInputSection.style.display = 'block')
upload.addEventListener('click',() => {
    if(imageInput.value === '') {
        alert('Path is empty')
        return;
    }
    imgSection.src = imageInput.value;
    imgSection.style.display = 'block';
})

const imgError = (image) => {
    alert('Image path is invalid');
}