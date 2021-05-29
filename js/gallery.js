import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector(".lightbox__image"),
};

refs.gallery.addEventListener("click", onGalleryClick);
refs.closeBtn.addEventListener("click", onCloseBtnClick);
refs.overlay.addEventListener("click", onOverlayBtnClick);

createGallery(images);

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.classList.contains("gallery__image")) {
    refs.lightboxImage.src = e.target.dataset.source;
    refs.lightboxImage.alt = e.target.alt;
    refs.lightbox.classList.toggle("is-open");
  }

  window.addEventListener("keydown", ifEscapeKeyDown);
  window.addEventListener("keydown", ifRightKeyDown);
  window.addEventListener("keydown", ifLeftKeyDown);
}

function onCloseBtnClick() {
  refs.lightbox.classList.toggle("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}

function onOverlayBtnClick() {
  refs.lightbox.classList.toggle("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}

function ifEscapeKeyDown(e) {
  if (e.code === "Escape") {
    refs.lightbox.classList.toggle("is-open");
    refs.lightboxImage.src = "";
    refs.lightboxImage.alt = "";
  }
}

function ifRightKeyDown(e) {
  if (e.code === "ArrowRight") {
    const urls = images.map((image) => image.original);
    for (let i = 0; i < urls.length; i += 1) {
      if (urls[i] === refs.lightboxImage.src && i !== 8) {
        refs.lightboxImage.src = urls[i + 1];
        console.log(i);
        break;
      }
    }
  }
}

function ifLeftKeyDown(e) {
  if (e.code === "ArrowLeft") {
    const urls = images.map((image) => image.original);
    for (let i = 0; i < urls.length; i += 1) {
      if (urls[i] === refs.lightboxImage.src && i !== 0) {
        refs.lightboxImage.src = urls[i - 1];
        console.log(i);
        break;
      }
    }
  }
}

function createGallery(items) {
  const markup = items
    .map(({ original, preview, description }) => {
      return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </li>
`;
    })
    .join("");

  refs.gallery.insertAdjacentHTML("beforeend", markup);
}
