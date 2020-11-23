import galleryItems from'./gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImg: document.querySelector('.lightbox__image'),
    closeButton: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    
}

const createImageItem = galleryItem => {
    const listRef = document.createElement('li');
    listRef.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.href = galleryItem.original;
   

    const imageRef = document.createElement('img');
    imageRef.classList.add('gallery__image');
    imageRef.src = galleryItem.preview;
    imageRef.dataset.source = galleryItem.original;
    imageRef.alt = galleryItem.description;
    imageRef.dataset.index = galleryItem.index;

    

    linkRef.appendChild(imageRef);
    listRef.appendChild(linkRef);

    return listRef;
}

const imageItems = galleryItems.map(galleryItem => createImageItem(galleryItem));

refs.galleryList.append(...imageItems);



refs.galleryList.addEventListener('click', imageClickHandler);
refs.galleryList.addEventListener('click', onClickModal); 
refs.closeButton.addEventListener('click', onCloseModalButton);
refs.lightboxOverlay.addEventListener('click', onOverlayClick);


function imageClickHandler(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const image = event.target;
    const largeImage = image.dataset.source;

    onClickModal();
    setLargeImageSrc(largeImage);
}



function onClickModal() {
    window.addEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onPressLeftRight);
    refs.lightbox.classList.add('is-open'); 
}

   
function setLargeImageSrc(url) {
    refs.lightboxImg.src = url;
}


function onCloseModalButton() {
    window.removeEventListener('keydown', onPressEsc);
    window.removeEventListener('keydown', onPressLeftRight);
    refs.lightbox.classList.remove('is-open'); 
    refs.lightboxImg.src = '';
}
   

function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
       onCloseModalButton();  
    }
}


function onPressEsc(event) {
    if (event.code === 'Escape') {
      onCloseModalButton();   
    }
}


function onPressLeftRight(event) {
    let img = event.target.firstElementChild;
    let activeIndex = Number(img.dataset.index);
    
    if (event.code === 'ArrowLeft' && activeIndex > 0) {
        refs.lightboxImg.src = galleryItems[activeIndex - 1].original;
      
    }else if (event.code === 'ArrowRight' && activeIndex < galleryItems.length) {
    refs.lightboxImg.src = galleryItems[activeIndex + 1].original;
    }
}

