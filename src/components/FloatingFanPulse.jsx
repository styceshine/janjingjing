import {
  useEffect,
  useState,
} from "react"

import {
  useLocation,
} from "react-router-dom"

import FanPulse from "./FanPulse"
import FanPulseJewel from "./FanPulseJewel"

import "../styles/components/FloatingFanPulse.css"


function FloatingFanPulse() {

  const location =
    useLocation()


  const [
    open,
    setOpen,
  ] = useState(false)


  /* ==================================================
     HIDE ON ADMIN PAGES
  ================================================== */

  const isAdminPage =
    location.pathname.startsWith(
      "/admin"
    )


  /* ==================================================
     CLOSE WHEN ROUTE CHANGES
  ================================================== */

  useEffect(
    () => {

      setOpen(false)

    },
    [
      location.pathname,
    ]
  )


  /* ==================================================
     ESCAPE KEY
  ================================================== */

  useEffect(
    () => {

      if (!open) {
        return
      }


      const handleKeyDown =
        (event) => {

          if (
            event.key ===
            "Escape"
          ) {

            setOpen(false)

          }

        }


      window.addEventListener(
        "keydown",
        handleKeyDown
      )


      return () => {

        window.removeEventListener(
          "keydown",
          handleKeyDown
        )

      }

    },
    [
      open,
    ]
  )


  /* ==================================================
     DON'T SHOW ON ADMIN
  ================================================== */

  if (isAdminPage) {

    return null

  }


  /* ==================================================
     RENDER
  ================================================== */

  return (

    <div
      className={[
        "floating-pulse",

        open
          ? "is-open"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >


      {/* ==================================================
          INTERACTIVE JEWEL
      ================================================== */}

      <FanPulseJewel
        panelOpen={open}
      />


      {/* ==================================================
          FAN PULSE PANEL
      ================================================== */}

      <div
        className="floating-pulse__panel"
        aria-hidden={!open}
      >

        <div className="floating-pulse__panel-head">

          <div>

            <span>
              FAN PULSE
            </span>


            <h2>

              Leave a charm

              <i>
                ♡
              </i>

            </h2>

          </div>


          <button
            type="button"
            className="floating-pulse__close"
            onClick={() =>
              setOpen(false)
            }
            aria-label="Close Fan Pulse"
          >
            ×
          </button>

        </div>


        <p className="floating-pulse__description">

          Pick a little symbol for Jan or JingJing
          and add it to the community pulse.

        </p>


        <FanPulse
          compact
        />


        <div className="floating-pulse__legend">

          <span>
            JAN · 💜 🦊 🥚
          </span>


          <span>
            JINGJING · 🩷 🎀 🐯
          </span>

        </div>

      </div>


      {/* ==================================================
          FLOATING BUTTON
      ================================================== */}

      <button
        type="button"
        className="floating-pulse__launcher"

        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }

        aria-expanded={open}

        aria-label={
          open
            ? "Close Fan Pulse"
            : "Leave a charm"
        }
      >

        <span className="floating-pulse__launcher-heart">
          ♡
        </span>


        <span className="floating-pulse__launcher-copy">

          <strong>
            LEAVE A CHARM
          </strong>

          <small>
            FAN PULSE
          </small>

        </span>

      </button>

    </div>

  )

}


export default FloatingFanPulse