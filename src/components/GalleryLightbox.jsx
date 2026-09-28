// src/components/GalleryLightbox.jsx

import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

function GalleryLightbox({ photos = [], startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const touchStartX = useRef(null);

  const touchEndX = useRef(null);

  const photo = photos[currentIndex];

  /* ==================================================
     RESET INDEX
  ================================================== */

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  /* ==================================================
     PREVIOUS
  ================================================== */

  const previousPhoto = () => {
    setCurrentIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1,
    );
  };

  /* ==================================================
     NEXT
  ================================================== */

  const nextPhoto = () => {
    setCurrentIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1,
    );
  };

  /* ==================================================
     KEYBOARD + BODY LOCK
  ================================================== */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);

      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, photos.length]);

  /* ==================================================
     MOBILE SWIPE
  ================================================== */

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;

    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > 55) {
      if (difference > 0) {
        nextPhoto();
      } else {
        previousPhoto();
      }
    }

    touchStartX.current = null;

    touchEndX.current = null;
  };

  /* ==================================================
     SAFETY
  ================================================== */

  if (!photo || photos.length === 0) {
    return null;
  }

  /* ==================================================
     VIEWER
  ================================================== */

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen photo viewer"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ==================================================
          TOP LEFT
      ================================================== */}

      <div className="gallery-lightbox__brand">
        <strong>JANJINGJING</strong>

        <span>VISUAL ARCHIVE</span>
      </div>

      {/* ==================================================
          COUNTER
      ================================================== */}

      <div className="gallery-lightbox__counter">
        {String(currentIndex + 1).padStart(2, "0")}

        <span>/</span>

        {String(photos.length).padStart(2, "0")}
      </div>

      {/* ==================================================
          CLOSE
      ================================================== */}

      <button
        type="button"
        className="gallery-lightbox__close"
        aria-label="Close photo viewer"
        onClick={onClose}
      >
        ×
      </button>

      {/* ==================================================
          PREVIOUS
      ================================================== */}

      {photos.length > 1 && (
        <button
          type="button"
          className="
            gallery-lightbox__nav
            gallery-lightbox__nav--prev
          "
          aria-label="Previous photo"
          onClick={previousPhoto}
        >
          ←
        </button>
      )}

      {/* ==================================================
          IMAGE STAGE
      ================================================== */}

      <div
        className="gallery-lightbox__stage"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <img
          key={photo.id}
          src={photo.image}
          alt={photo.alt || photo.title || "Gallery photo"}
          className="gallery-lightbox__image"
          draggable="false"
        />
      </div>

      {/* ==================================================
          NEXT
      ================================================== */}

      {photos.length > 1 && (
        <button
          type="button"
          className="
            gallery-lightbox__nav
            gallery-lightbox__nav--next
          "
          aria-label="Next photo"
          onClick={nextPhoto}
        >
          →
        </button>
      )}

      {/* ==================================================
          BOTTOM LEFT INFO
      ================================================== */}

      <div className="gallery-lightbox__caption">
        <span>{photo.title || "JanJingJing"}</span>

        {photo.subtitle && (
          <small>
            {photo.subtitle}

            {photo.year && (
              <>
                {" • "}
                {photo.year}
              </>
            )}
          </small>
        )}
      </div>

      {/* ==================================================
          BOTTOM RIGHT HINT
      ================================================== */}

      <div className="gallery-lightbox__hint">
        <span className="gallery-lightbox__hint-title">PHOTO CREDITS</span>

        <span className="gallery-lightbox__hint-text">
          This is an unofficial fan-made visual archive.
          Photos and media belong
          to their respective photographers, publications, agencies, artists,
          and copyright holders.
         No ownership is claimed.
        </span>
      </div>
    </div>,

    document.body,
  );
}

export default GalleryLightbox;
