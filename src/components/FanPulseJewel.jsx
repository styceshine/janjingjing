import {
  useEffect,
  useRef,
  useState,
} from "react"

import "../styles/components/FanPulseJewel.css"


/* ==================================================
   CLICK EFFECTS

   1 → JingJing pink hearts
   2 → Jan purple hearts
   3 → Tiger + Fox
   4 → Egg + Ribbon
================================================== */

const jewelEffects = [

  {
    label:
      "Pink hearts",

    emojis: [
      "🩷",
      "🩷",
      "🩷",
      "🩷",
    ],
  },


  {
    label:
      "Purple hearts",

    emojis: [
      "💜",
      "💜",
      "💜",
      "💜",
    ],
  },


  {
    label:
      "Tiger and fox",

    emojis: [
      "🐯",
      "🦊",
      "🐯",
      "🦊",
    ],
  },


  {
    label:
      "Egg and ribbon",

    emojis: [
      "🥚",
      "🎀",
      "🥚",
      "🎀",
    ],
  },

]


/* ==================================================
   PARTICLE DIRECTIONS
================================================== */

const particles = [

  {
    x: "-68px",
    y: "-58px",
    rotate: "-25deg",
    delay: "0ms",
    scale: 0.9,
  },

  {
    x: "-38px",
    y: "-92px",
    rotate: "20deg",
    delay: "35ms",
    scale: 1.1,
  },

  {
    x: "-5px",
    y: "-105px",
    rotate: "-12deg",
    delay: "70ms",
    scale: 0.85,
  },

  {
    x: "34px",
    y: "-94px",
    rotate: "24deg",
    delay: "105ms",
    scale: 1,
  },

  {
    x: "68px",
    y: "-62px",
    rotate: "-18deg",
    delay: "140ms",
    scale: 0.9,
  },

  {
    x: "-82px",
    y: "-25px",
    rotate: "-30deg",
    delay: "80ms",
    scale: 0.8,
  },

  {
    x: "82px",
    y: "-20px",
    rotate: "28deg",
    delay: "120ms",
    scale: 0.85,
  },

  {
    x: "-52px",
    y: "5px",
    rotate: "18deg",
    delay: "150ms",
    scale: 0.7,
  },

  {
    x: "53px",
    y: "4px",
    rotate: "-20deg",
    delay: "180ms",
    scale: 0.75,
  },

  {
    x: "3px",
    y: "-70px",
    rotate: "10deg",
    delay: "190ms",
    scale: 0.75,
  },

]


function FanPulseJewel({
  panelOpen = false,
}) {

  const [
    nextEffect,
    setNextEffect,
  ] =
    useState(0)


  const [
    burst,
    setBurst,
  ] =
    useState(null)


  const burstIdRef =
    useRef(0)


  const timerRef =
    useRef(null)


  /* ==================================================
     CLEAN TIMER
  ================================================== */

  useEffect(
    () => {

      return () => {

        window.clearTimeout(
          timerRef.current
        )

      }

    },
    []
  )


  /* ==================================================
     CLICK JEWEL
  ================================================== */

  const handleJewelClick =
    () => {

      const effectIndex =
        nextEffect


      burstIdRef.current +=
        1


      setBurst({
        id:
          burstIdRef.current,

        effectIndex,
      })


      setNextEffect(
        (
          effectIndex +
          1
        ) %
        jewelEffects.length
      )


      window.clearTimeout(
        timerRef.current
      )


      timerRef.current =
        window.setTimeout(
          () => {

            setBurst(
              null
            )

          },
          1500
        )

    }


  const activeEffect =
    burst
      ? jewelEffects[
          burst.effectIndex
        ]
      : null


  return (

    <div
      className={[
        "fan-pulse-jewel",

        panelOpen
          ? "is-panel-open"
          : "",

        burst
          ? "is-bursting"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      {/* ==================================================
          EMOJI BURST
      ================================================== */}

      {burst &&
        activeEffect && (

          <div
            key={
              burst.id
            }
            className="fan-pulse-jewel__burst"
            aria-hidden="true"
          >

            {particles.map(
              (
                particle,
                index
              ) => (

                <span
                  key={
                    `${burst.id}-${index}`
                  }

                  className="fan-pulse-jewel__particle"

                  style={{
                    "--jewel-x":
                      particle.x,

                    "--jewel-y":
                      particle.y,

                    "--jewel-rotate":
                      particle.rotate,

                    "--jewel-delay":
                      particle.delay,

                    "--jewel-scale":
                      particle.scale,
                  }}
                >

                  {
                    activeEffect.emojis[
                      index %
                      activeEffect.emojis.length
                    ]
                  }

                </span>

              )
            )}

          </div>

        )}


      {/* ==================================================
          JEWEL
      ================================================== */}

      <button
        type="button"
        className="fan-pulse-jewel__button"
        onClick={
          handleJewelClick
        }

        aria-label={
          `Click Jewel. Next surprise: ${
            jewelEffects[
              nextEffect
            ].label
          }.`
        }

        title="Click Jewel ♡"
      >

        <img
          src="/images/jewel/j13.png"
          alt="Jewel"
          draggable="false"
        />

      </button>

    </div>

  )

}


export default FanPulseJewel