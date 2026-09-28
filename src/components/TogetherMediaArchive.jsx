import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import TogetherMediaCard from "./TogetherMediaCard"
import YouTubeModal from "./YouTubeModal"

import {
  togetherMedia,
} from "../data/togetherMediaData"


const ITEMS_PER_PAGE = 12


const FILTERS = [

  {
    id: "all",
    label: "ALL",
  },

  {
    id: "interviews",
    label: "INTERVIEWS",
  },

  {
    id: "lives",
    label: "LIVES",
  },

  {
    id: "bts",
    label: "BTS",
  },

  {
    id: "press",
    label: "PRESS",
  },

]


/* ==================================================
   CHUNK ARRAY
================================================== */

function createPages(
  items,
  size
) {

  const pages = []


  for (
    let index = 0;
    index < items.length;
    index += size
  ) {

    pages.push(
      items.slice(
        index,
        index + size
      )
    )

  }


  return pages

}


function TogetherMediaArchive() {

  const [activeFilter, setActiveFilter] =
    useState("all")

  const [activePage, setActivePage] =
    useState(0)

  const [selectedMedia, setSelectedMedia] =
    useState(null)

  const [showAll, setShowAll] =
    useState(false)


  const railRef =
    useRef(null)


  /* ==================================================
     FILTERED MEDIA
  ================================================== */

  const filteredMedia =
    useMemo(() => {

      if (
        activeFilter === "all"
      ) {
        return togetherMedia
      }


      return togetherMedia.filter(
        (item) =>
          item.category === activeFilter
      )

    }, [
      activeFilter,
    ])


  /* ==================================================
     COUNTS
  ================================================== */

  const counts =
    useMemo(() => {

      return {

        all:
          togetherMedia.length,

        interviews:
          togetherMedia.filter(
            (item) =>
              item.category === "interviews"
          ).length,

        lives:
          togetherMedia.filter(
            (item) =>
              item.category === "lives"
          ).length,

        bts:
          togetherMedia.filter(
            (item) =>
              item.category === "bts"
          ).length,

        press:
          togetherMedia.filter(
            (item) =>
              item.category === "press"
          ).length,

      }

    }, [])


  /* ==================================================
     PAGES
  ================================================== */

  const pages =
    useMemo(
      () =>
        createPages(
          filteredMedia,
          ITEMS_PER_PAGE
        ),
      [
        filteredMedia,
      ]
    )


  /* ==================================================
     RESET WHEN FILTER CHANGES
  ================================================== */

  useEffect(() => {

    setActivePage(0)


    if (railRef.current) {

      railRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      })

    }

  }, [
    activeFilter,
  ])


  /* ==================================================
     CHANGE FILTER
  ================================================== */

  const changeFilter =
    (filter) => {

      setActiveFilter(filter)

    }


  /* ==================================================
     PAGE NAVIGATION
  ================================================== */

  const goToPage =
    (index) => {

      if (!railRef.current) {
        return
      }


      const safeIndex =
        Math.max(
          0,
          Math.min(
            index,
            pages.length - 1
          )
        )


      setActivePage(
        safeIndex
      )


      railRef.current.scrollTo({

        left:
          railRef.current.clientWidth *
          safeIndex,

        behavior:
          "smooth",

      })

    }


  /* ==================================================
     TRACK MANUAL SIDE SCROLL
  ================================================== */

  const handleRailScroll = () => {

    if (!railRef.current) {
      return
    }


    const width =
      railRef.current.clientWidth


    if (!width) {
      return
    }


    const page =
      Math.round(
        railRef.current.scrollLeft /
        width
      )


    setActivePage(page)

  }


  return (

    <>
      <section
        id="media"
        className="together-media-section"
      >

        <div className="together-media-shell">


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="together-media-heading">

            <div>

              <p>
                02 / MEDIA ARCHIVE
              </p>

              <h2>
                Interviews, lives
                <br />
                <em>& moments together.</em>
              </h2>

              <span>
                conversations, chaos, stories & behind the scenes
              </span>

            </div>


            <button
              type="button"
              className="together-media-see-all"
              onClick={() =>
                setShowAll(true)
              }
            >
              SEE ALL

              <span>
                ↗
              </span>
            </button>

          </div>


          {/* ==================================================
              FILTER BAR
          ================================================== */}

          <div className="together-media-filters">

            {FILTERS.map(
              (filter) => (

                <button
                  key={filter.id}

                  type="button"

                  className={
                    activeFilter === filter.id
                      ? "active"
                      : ""
                  }

                  onClick={() =>
                    changeFilter(
                      filter.id
                    )
                  }
                >

                  <span>
                    {filter.label}
                  </span>

                  <small>
                    {counts[filter.id]}
                  </small>

                </button>

              )
            )}

          </div>


          {/* ==================================================
              MEDIA FRAME
          ================================================== */}

          <div className="together-media-frame">


            {/* ==================================================
                PAGE RAIL
            ================================================== */}

            <div
              ref={railRef}

              className="together-media-pages"

              onScroll={
                handleRailScroll
              }
            >

              {pages.map(
                (
                  page,
                  pageIndex
                ) => (

                  <div
                    key={pageIndex}
                    className="together-media-page"
                  >

                    {page.map(
                      (item) => (

                        <TogetherMediaCard
                          key={item.id}
                          item={item}
                          onOpen={
                            setSelectedMedia
                          }
                        />

                      )
                    )}

                  </div>

                )
              )}

            </div>


            {/* ==================================================
                EMPTY
            ================================================== */}

            {filteredMedia.length === 0 && (

              <div className="together-media-empty">

                <span>
                  ♡
                </span>

                <p>
                  Nothing archived here yet.
                </p>

              </div>

            )}


            {/* ==================================================
                BOTTOM NAVIGATION
            ================================================== */}

            {pages.length > 0 && (

              <div className="together-media-navigation">


                <button
                  type="button"

                  onClick={() =>
                    goToPage(
                      activePage - 1
                    )
                  }

                  disabled={
                    activePage === 0
                  }

                  aria-label="Previous media page"
                >
                  ←
                </button>


                <div className="together-media-progress">

                  {pages.map(
                    (_, index) => (

                      <button
                        key={index}

                        type="button"

                        className={
                          activePage === index
                            ? "active"
                            : ""
                        }

                        onClick={() =>
                          goToPage(index)
                        }

                        aria-label={
                          `Go to media page ${index + 1}`
                        }
                      />

                    )
                  )}

                </div>


                <span className="together-media-page-count">

                  {String(
                    activePage + 1
                  ).padStart(
                    2,
                    "0"
                  )}

                  <small>/</small>

                  {String(
                    pages.length
                  ).padStart(
                    2,
                    "0"
                  )}

                </span>


                <button
                  type="button"

                  onClick={() =>
                    goToPage(
                      activePage + 1
                    )
                  }

                  disabled={
                    activePage ===
                    pages.length - 1
                  }

                  aria-label="Next media page"
                >
                  →
                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* ==================================================
          SEE ALL OVERLAY
      ================================================== */}

      {showAll && (

        <div
          className="together-media-library-backdrop"

          onClick={() =>
            setShowAll(false)
          }
        >

          <div
            className="together-media-library"

            onClick={
              (event) =>
                event.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="together-media-library-header">

              <div>

                <p>
                  JAN × JINGJING
                </p>

                <h2>
                  Media Archive
                </h2>

                <span>
                  {filteredMedia.length}
                  {" "}
                  items
                </span>

              </div>


              <button
                type="button"

                onClick={() =>
                  setShowAll(false)
                }

                aria-label="Close media archive"
              >
                ×
              </button>

            </div>


            {/* FILTERS */}

            <div className="together-media-library-filters">

              {FILTERS.map(
                (filter) => (

                  <button
                    key={filter.id}

                    type="button"

                    className={
                      activeFilter === filter.id
                        ? "active"
                        : ""
                    }

                    onClick={() =>
                      changeFilter(
                        filter.id
                      )
                    }
                  >

                    {filter.label}

                    <span>
                      {counts[filter.id]}
                    </span>

                  </button>

                )
              )}

            </div>


            {/* ALL CARDS */}

            <div className="together-media-library-grid">

              {filteredMedia.map(
                (item) => (

                  <TogetherMediaCard
                    key={item.id}
                    item={item}
                    onOpen={
                      setSelectedMedia
                    }
                  />

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* ==================================================
          VIDEO MODAL
      ================================================== */}

      {selectedMedia && (

        <YouTubeModal
          videoId={
            selectedMedia.youtubeId
          }

          title={
            selectedMedia.title
          }

          type={
            selectedMedia.category
          }

          onClose={() =>
            setSelectedMedia(null)
          }
        />

      )}

    </>

  )

}


export default TogetherMediaArchive