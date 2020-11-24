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
    refs.lightboxImg.src = largeImage;

    const largeImageAlt = image.alt;
    refs.lightboxImg.alt = largeImageAlt;

    const largeImageIndex = image.dataset.index;
    refs.lightboxImg.dataset.index = largeImageIndex;
    onClickModal();
    // setLargeImageSrc(largeImage);
}



function onClickModal() {
    refs.lightbox.classList.add('is-open'); 
     window.addEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onPressLeftRight);
}

   
// function setLargeImageSrc(url) {
//     refs.lightboxImg.src = url;
//     refs.lightboxImg.src = image.alt;
// }


function onCloseModalButton() {
    window.removeEventListener('keydown', onPressEsc);
    window.removeEventListener('keydown', onPressLeftRight);
    refs.lightbox.classList.remove('is-open'); 
    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
     refs.lightboxImg.dataset.index = '';
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
  const jsGalleryImg = document.querySelectorAll('.gallery__image');
    let activeIndex = Number(refs.lightboxImg.dataset.index);
        if (event.code === 'ArrowLeft' && activeIndex > 0) {
            refs.lightboxImg.src = jsGalleryImg[activeIndex - 1].dataset.source;
            refs.lightboxImg.alt = jsGalleryImg[activeIndex - 1].alt;
            refs.lightboxImg.dataset.index = jsGalleryImg[activeIndex - 1].dataset.index;
        } else if (event.code === 'ArrowRight' && activeIndex < jsGalleryImg.length-1) {
           refs.lightboxImg.src = jsGalleryImg[activeIndex + 1].dataset.source;
           refs.lightboxImg.alt = jsGalleryImg[activeIndex + 1].alt;
           refs.lightboxImg.dataset.index = jsGalleryImg[activeIndex + 1].dataset.index;
        }
    }

