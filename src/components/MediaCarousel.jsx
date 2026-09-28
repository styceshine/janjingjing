import { useState } from "react"
import MediaCard from "./MediaCard"

function MediaCarousel({
  items,
  cardsPerPage = 3,
}) {
  const [startIndex, setStartIndex] = useState(0)

  const totalPages = Math.ceil(items.length / cardsPerPage)
  const currentPage = Math.floor(startIndex / cardsPerPage)

  const visibleItems = items.slice(
    startIndex,
    startIndex + cardsPerPage,
  )

  const nextSlide = () => {
    const nextIndex = startIndex + cardsPerPage

    setStartIndex(
      nextIndex >= items.length
        ? 0
        : nextIndex,
    )
  }

  const previousSlide = () => {
    const previousIndex = startIndex - cardsPerPage

    if (previousIndex >= 0) {
      setStartIndex(previousIndex)
      return
    }

    const lastPageIndex =
      Math.floor((items.length - 1) / cardsPerPage) * cardsPerPage

    setStartIndex(lastPageIndex)
  }

  return (
    <div className="media-carousel">
      {items.length > cardsPerPage && (
        <button
          className="media-carousel-arrow media-carousel-arrow-left"
          type="button"
          onClick={previousSlide}
          aria-label="Previous media"
        >
          ‹
        </button>
      )}

      <div className="media-carousel-window">
        <div
          key={startIndex}
          className="media-carousel-grid"
        >
          {visibleItems.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              year={item.year}
              type={item.type}
              role={item.role}
              image={item.image}
              youtubeId={item.youtubeId}
              description={item.description}
            />
          ))}
        </div>
      </div>

      {items.length > cardsPerPage && (
        <button
          className="media-carousel-arrow media-carousel-arrow-right"
          type="button"
          onClick={nextSlide}
          aria-label="Next media"
        >
          ›
        </button>
      )}

      {totalPages > 1 && (
        <div className="media-carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === currentPage
                  ? "media-carousel-dot active"
                  : "media-carousel-dot"
              }
              onClick={() => setStartIndex(index * cardsPerPage)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaCarousel
