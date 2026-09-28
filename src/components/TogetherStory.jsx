import { useRef } from "react"

import {
  togetherStory,
} from "../data/togetherData"


function TogetherStory() {

  const railRef =
    useRef(null)


  /* ==================================================
     SCROLL
  ================================================== */

  const scrollStory = (direction) => {

    if (!railRef.current) return


    const amount =
      railRef.current.clientWidth * 0.78


    railRef.current.scrollBy({
      left:
        direction === "next"
          ? amount
          : -amount,

      behavior:
        "smooth",
    })

  }


  return (

    <section
      id="story"
      className="together-story"
    >

      {/* ==================================================
          HEADING
      ================================================== */}

      <div className="together-story-heading">

        <div className="together-story-heading-left">

          <p>
            01 / THEIR STORY
          </p>

          <h2>
            Two paths.
            <br />
            <em>One shared story.</em>
          </h2>

        </div>


        <div className="together-story-heading-right">

          <p>
            A collection of the moments that
            shaped Jan × JingJing — from their
            first shared series to the stages
            they now step onto together.
          </p>

          <span>
            SCROLL TO EXPLORE →
          </span>

        </div>

      </div>


      {/* ==================================================
          RAIL
      ================================================== */}

      <div className="together-story-frame">

        <div
          ref={railRef}
          className="together-story-rail"
        >

          {togetherStory.map(
            (moment) => (

              <article
                key={moment.id}
                className="together-story-card"
              >

                {/* =========================================
                    IMAGE
                ========================================= */}

                <div className="together-story-image">

                  <img
                    src={moment.image}
                    alt={moment.project}
                  />

                  <span className="together-story-card-number">
                    {moment.number}
                  </span>

                </div>


                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="together-story-content">

                  <div className="together-story-meta">

                    <span>
                      {moment.date}
                    </span>

                    <span>
                      {moment.eyebrow}
                    </span>

                  </div>


                  <h3>
                    {moment.title}
                  </h3>


                  <p className="together-story-project">
                    {moment.project}
                  </p>


                  <p className="together-story-description">
                    {moment.description}
                  </p>


                  <a
                    href={moment.link}
                    target="_blank"
                    rel="noreferrer"
                    className="together-story-link"
                  >

                    {moment.linkLabel}

                    <span>
                      ↗
                    </span>

                  </a>

                </div>

              </article>

            )
          )}

        </div>


        {/* ==================================================
            CONTROLS
        ================================================== */}

        <div className="together-story-controls">

          <div className="together-story-line">

            <span />

            <p>
              2026
            </p>

            <span />

          </div>


          <div className="together-story-arrows">

            <button
              type="button"
              onClick={() =>
                scrollStory("previous")
              }
              aria-label="Previous story"
            >
              ←
            </button>


            <button
              type="button"
              onClick={() =>
                scrollStory("next")
              }
              aria-label="Next story"
            >
              →
            </button>

          </div>

        </div>

      </div>

    </section>

  )

}


export default TogetherStory