// src/components/GalleryArchive.jsx

import {
  useMemo,
  useState,
} from "react"

import {
  galleryCategoryFilters,
  galleryEraFilters,
  galleryPhotos,
} from "../data/galleryData"


/* ==================================================
   HELPERS
================================================== */

const formatCategory = (category) => {

  const match =
    galleryCategoryFilters.find(
      (item) =>
        item.id === category
    )

  return (
    match?.label ||
    category
  )

}


const formatEra = (era) => {

  const match =
    galleryEraFilters.find(
      (item) =>
        item.id === era
    )

  return (
    match?.label ||
    era
  )

}


/* ==================================================
   SHUFFLE

   Fisher-Yates shuffle.

   Creates a NEW array so galleryPhotos itself
   is never modified.
================================================== */

const shufflePhotos = (photos) => {

  const shuffled =
    [...photos]


  for (
    let i =
      shuffled.length - 1;

    i > 0;

    i--
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      )


    const current =
      shuffled[i]


    shuffled[i] =
      shuffled[
        randomIndex
      ]


    shuffled[
      randomIndex
    ] =
      current

  }


  return shuffled

}


/* ==================================================
   SAFE IMAGE
================================================== */

function GalleryImage({
  photo,
}) {

  const [
    failed,
    setFailed,
  ] =
    useState(false)


  if (
    !photo.image ||
    failed
  ) {

    return (

      <div className="gallery-photo__placeholder">

        <span>
          PHOTO
        </span>

      </div>

    )

  }


  return (

    <img
      src={
        photo.image
      }

      alt={
        photo.alt ||
        photo.title ||
        "JanJingJing gallery photo"
      }

      loading="lazy"

      decoding="async"

      onError={() =>
        setFailed(true)
      }
    />

  )

}


/* ==================================================
   MAIN ARCHIVE
================================================== */

function GalleryArchive({
  personFilter = "all",
}) {


  /* ==================================================
     SHUFFLED ALL-PHOTO ORDER

     This runs once whenever the GalleryArchive
     component is mounted.

     Refreshing/reopening the Gallery creates
     a brand-new random order.

     It does NOT reshuffle during normal re-renders.
  ================================================== */

  const [
    shuffledPhotos,
  ] =
    useState(
      () =>
        shufflePhotos(
          galleryPhotos
        )
    )


  /* ==================================================
     SECONDARY FILTERS
  ================================================== */

  const [
    categoryFilter,
    setCategoryFilter,
  ] =
    useState("all")


  const [
    eraFilter,
    setEraFilter,
  ] =
    useState("all")


  /* ==================================================
     PERSON FILTER

     ALL
     → randomized order

     JAN / JINGJING / TOGETHER
     → normal original data order
  ================================================== */

  const personPhotos =
    useMemo(
      () => {

        if (
          personFilter ===
          "all"
        ) {

          return shuffledPhotos

        }


        return galleryPhotos.filter(
          (photo) =>
            Array.isArray(
              photo.people
            ) &&
            photo.people.includes(
              personFilter
            )
        )

      },
      [
        personFilter,
        shuffledPhotos,
      ]
    )


  /* ==================================================
     CATEGORY COUNTS
  ================================================== */

  const categoryCounts =
    useMemo(
      () => {

        const source =
          eraFilter ===
          "all"
            ? personPhotos
            : personPhotos.filter(
                (photo) =>
                  photo.era ===
                  eraFilter
              )


        const counts = {
          all:
            source.length,
        }


        galleryCategoryFilters
          .filter(
            (item) =>
              item.id !==
              "all"
          )
          .forEach(
            (item) => {

              counts[
                item.id
              ] =
                source.filter(
                  (photo) =>
                    photo.category ===
                    item.id
                ).length

            }
          )


        return counts

      },
      [
        personPhotos,
        eraFilter,
      ]
    )


  /* ==================================================
     AVAILABLE ERAS
  ================================================== */

  const availableEras =
    useMemo(
      () => {

        const eras =
          new Set(
            personPhotos
              .map(
                (photo) =>
                  photo.era
              )
              .filter(
                Boolean
              )
          )


        return galleryEraFilters.filter(
          (era) =>
            era.id ===
              "all" ||
            eras.has(
              era.id
            )
        )

      },
      [
        personPhotos,
      ]
    )


  /* ==================================================
     FINAL FILTERED PHOTOS
  ================================================== */

  const visiblePhotos =
    useMemo(
      () => {

        return personPhotos.filter(
          (photo) => {

            const categoryMatch =
              categoryFilter ===
                "all" ||
              photo.category ===
                categoryFilter


            const eraMatch =
              eraFilter ===
                "all" ||
              photo.era ===
                eraFilter


            return (
              categoryMatch &&
              eraMatch
            )

          }
        )

      },
      [
        personPhotos,
        categoryFilter,
        eraFilter,
      ]
    )


  /* ==================================================
     CLEAR SECONDARY FILTERS
  ================================================== */

  const clearSecondaryFilters =
    () => {

      setCategoryFilter(
        "all"
      )

      setEraFilter(
        "all"
      )

    }


  const hasSecondaryFilters =
    categoryFilter !==
      "all" ||
    eraFilter !==
      "all"


  /* ==================================================
     COMPONENT
  ================================================== */

  return (

    <section
      id="photo-archive"
      className="gallery-archive"
    >

      <div className="gallery-archive__inner">


        {/* ==================================================
            ARCHIVE HEADER
        ================================================== */}

        <header className="gallery-archive__head">

          <div>

            <p className="gallery-archive__eyebrow">
              01 / PHOTO ARCHIVE
            </p>


            <h2 className="gallery-archive__title">

              Every frame,

              <span>
                in one place.
              </span>

            </h2>

          </div>


          <div className="gallery-archive__total">

            <strong>
              {
                visiblePhotos.length
              }
            </strong>

            <span>

              {
                visiblePhotos.length ===
                1
                  ? "PHOTO"
                  : "PHOTOS"
              }

            </span>

          </div>

        </header>


        {/* ==================================================
            STICKY FILTER PANEL
        ================================================== */}

        <div className="gallery-archive__filterbar">


          {/* ==================================================
              CATEGORY
          ================================================== */}

          <div className="gallery-filter-row">

            <p className="gallery-filter-row__label">
              CATEGORY
            </p>


            <div className="gallery-filter-row__options">

              {galleryCategoryFilters.map(
                (category) => {

                  const active =
                    categoryFilter ===
                    category.id


                  const count =
                    categoryCounts[
                      category.id
                    ] || 0


                  return (

                    <button

                      key={
                        category.id
                      }

                      type="button"

                      className={
                        `gallery-filter-chip ${
                          active
                            ? "is-active"
                            : ""
                        }`
                      }

                      aria-pressed={
                        active
                      }

                      onClick={() =>
                        setCategoryFilter(
                          category.id
                        )
                      }
                    >

                      <span>
                        {
                          category.label
                        }
                      </span>


                      <span className="gallery-filter-chip__count">
                        {count}
                      </span>

                    </button>

                  )

                }
              )}

            </div>

          </div>


          {/* ==================================================
              ERA / PROJECT
          ================================================== */}

          <div className="gallery-filter-row gallery-filter-row--era">

            <p className="gallery-filter-row__label">
              ERA / PROJECT
            </p>


            <div className="gallery-era-select">

              <select

                value={
                  eraFilter
                }

                onChange={
                  (event) =>
                    setEraFilter(
                      event.target.value
                    )
                }

                aria-label="Filter gallery by era or project"
              >

                {availableEras.map(
                  (era) => (

                    <option
                      key={
                        era.id
                      }

                      value={
                        era.id
                      }
                    >
                      {
                        era.label
                      }
                    </option>

                  )
                )}

              </select>


              <span
                className="gallery-era-select__arrow"
                aria-hidden="true"
              >
                ↓
              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            ACTIVE FILTER SUMMARY
        ================================================== */}

        <div className="gallery-archive__summary">

          <div className="gallery-archive__summary-left">

            <span className="gallery-archive__showing">
              SHOWING
            </span>


            <div className="gallery-active-filters">


              {/* PERSON */}

              {personFilter !==
                "all" && (

                <span className="gallery-active-filter">

                  {
                    personFilter ===
                    "jan"
                      ? "JAN"

                      : personFilter ===
                        "jingjing"
                        ? "JINGJING"

                        : "TOGETHER"
                  }

                </span>

              )}


              {/* CATEGORY */}

              {categoryFilter !==
                "all" && (

                <button
                  type="button"

                  className="gallery-active-filter"

                  onClick={() =>
                    setCategoryFilter(
                      "all"
                    )
                  }
                >

                  {
                    formatCategory(
                      categoryFilter
                    )
                  }

                  <span>
                    ×
                  </span>

                </button>

              )}


              {/* ERA */}

              {eraFilter !==
                "all" && (

                <button
                  type="button"

                  className="gallery-active-filter"

                  onClick={() =>
                    setEraFilter(
                      "all"
                    )
                  }
                >

                  {
                    formatEra(
                      eraFilter
                    )
                  }

                  <span>
                    ×
                  </span>

                </button>

              )}


              {/* ALL */}

              {personFilter ===
                "all" &&
                categoryFilter ===
                  "all" &&
                eraFilter ===
                  "all" && (

                <span className="gallery-active-filter gallery-active-filter--neutral">
                  ALL MEMORIES
                </span>

              )}

            </div>

          </div>


          {hasSecondaryFilters && (

            <button
              type="button"

              className="gallery-archive__clear"

              onClick={
                clearSecondaryFilters
              }
            >
              CLEAR FILTERS
            </button>

          )}

        </div>


        {/* ==================================================
            PINTEREST-STYLE MASONRY
        ================================================== */}

        {visiblePhotos.length >
        0 ? (

          <div className="gallery-masonry">

            {visiblePhotos.map(
              (
                photo,
                index
              ) => (

                <article
                  key={
                    photo.id
                  }

                  className="gallery-photo"
                >

                  <button
                    type="button"

                    className="gallery-photo__button"

                    aria-label={
                      `View ${
                        photo.title ||
                        `photo ${index + 1}`
                      }`
                    }
                  >

                    {/* IMAGE */}

                    <div className="gallery-photo__media">

                      <GalleryImage
                        photo={
                          photo
                        }
                      />


                      <div className="gallery-photo__shade" />


                      <span className="gallery-photo__view">
                        VIEW ↗
                      </span>

                    </div>


                    {/* INFO */}

                    <div className="gallery-photo__info">

                      <div>

                        {photo.title && (

                          <h3>
                            {
                              photo.title
                            }
                          </h3>

                        )}


                        <p>

                          {
                            photo.subtitle ||
                            formatCategory(
                              photo.category
                            )
                          }


                          {photo.year && (

                            <>

                              {" • "}

                              {
                                photo.year
                              }

                            </>

                          )}

                        </p>

                      </div>


                      <span
                        className="gallery-photo__arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>

                    </div>

                  </button>

                </article>

              )
            )}

          </div>

        ) : (

          /* ==================================================
             EMPTY STATE
          ================================================== */

          <div className="gallery-archive__empty">

            <span className="gallery-archive__empty-symbol">
              ♡
            </span>


            <h3>
              No memories here yet.
            </h3>


            <p>

              Add photos to

              {" "}

              <code>
                galleryData.js
              </code>

              {" "}

              and they&apos;ll appear
              here automatically.

            </p>


            {hasSecondaryFilters && (

              <button
                type="button"

                onClick={
                  clearSecondaryFilters
                }
              >
                CLEAR FILTERS
              </button>

            )}

          </div>

        )}


        {/* ==================================================
            PHOTO CREDIT
        ================================================== */}

        <div className="gallery-archive__credit">

          <span>
            PHOTO CREDITS
          </span>


          <p>

            This is an unofficial fan-made
            visual archive. Photos and media
            belong to their respective
            photographers, publications,
            agencies, artists, and copyright
            holders. No ownership is claimed.

          </p>

        </div>

      </div>

    </section>

  )

}


export default GalleryArchive