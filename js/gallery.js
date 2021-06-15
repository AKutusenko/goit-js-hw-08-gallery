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
refs.overlay.addEventListener("click", onCloseBtnClick);

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

  window.removeEventListener("keydown", ifEscapeKeyDown);
  window.removeEventListener("keydown", ifRightKeyDown);
  window.removeEventListener("keydown", ifLeftKeyDown);
}

function ifEscapeKeyDown(e) {
  if (e.code === "Escape") onCloseBtnClick();
}

function ifRightKeyDown(e) {
  if (e.code === "ArrowRight") {
    const urls = images.map((image) => image.original);
    for (let i = 0; i < urls.length; i += 1) {
      if (urls[i] === refs.lightboxImage.src && i !== urls.length - 1) {
        refs.lightboxImage.src = urls[i + 1];
        break;
      }
    }
    const alts = images.map((image) => image.description);
    for (let i = 0; i < alts.length; i += 1) {
      if (alts[i] === refs.lightboxImage.alt && i !== alts.length - 1) {
        refs.lightboxImage.alt = alts[i + 1];
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
        break;
      }
    }
    const alts = images.map((image) => image.description);
    for (let i = 0; i < alts.length; i += 1) {
      if (alts[i] === refs.lightboxImage.alt && i !== 0) {
        refs.lightboxImage.alt = alts[i - 1];
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
