/**
 * src/components/TogetherPairPassport.jsx
 * ---------------------------------------------------------------------------
 * 05 / PAIR PASSPORT
 *
 * Features:
 * - Asia map for normal destinations
 * - World / Eurasia map for Paris
 * - Automatic zoom-out before flying to Paris
 * - Automatic zoom-in after returning from Paris to Asia
 * - Plane flight animation
 * - Arrival media modal
 * - Vietnam + Paris pin support
 * - Automatic UPCOMING → VISITED status using dateTime + autoStatus
 * - Bottom destination shortcuts always show every destination
 * ---------------------------------------------------------------------------
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  createPortal,
} from "react-dom"

import {
  pairPassportCast,
  pairPassportConfig,
  pairPassportEvents,
} from "../data/pairPassportData"

import {
  MAP_BOUNDS,
  MAP_VIEW,
  SEA_LABELS,
  getLandDotPath,
  mapPoint,
} from "../data/pairPassportLand"

import {
  WORLD_LABELS,
  WORLD_MAP_BOUNDS,
  WORLD_MAP_VIEW,
  getWorldLandDotPath,
  worldMapPoint,
} from "../data/pairPassportWorld"


/* ==========================================================================
   SETTINGS
========================================================================== */

const FLIGHT_MS =
  3000

const REDUCED_MOTION_FLIGHT_MS =
  600

const MAX_TILT =
  24


/* ==========================================================================
   DECORATIVE STARS
========================================================================== */

const SPARKS = [

  {
    x: 84,
    y: 30,
    size: 15,
  },

  {
    x: 93,
    y: 47,
    size: 10,
  },

  {
    x: 76,
    y: 76,
    size: 12,
  },

  {
    x: 8,
    y: 22,
    size: 11,
  },

  {
    x: 38,
    y: 12,
    size: 9,
  },

]


/* ==========================================================================
   HELPERS
========================================================================== */

const cls =
  (...parts) =>
    parts
      .filter(Boolean)
      .join(" ")


const clamp =
  (
    number,
    min,
    max
  ) =>
    Math.min(
      max,
      Math.max(
        min,
        number
      )
    )


const easeInOutCubic =
  (t) =>
    t < 0.5
      ? 4 *
        t *
        t *
        t
      : 1 -
        Math.pow(
          -2 *
            t +
            2,
          3
        ) /
          2


const isHttpUrl =
  (url) =>
    typeof url ===
      "string" &&
    /^https?:\/\//i.test(
      url.trim()
    )


/* ==========================================================================
   AUTOMATIC STATUS

   If:
   autoStatus: true
   dateTime: "2026-09-26T20:00:00+07:00"

   then it automatically becomes VISITED once that time passes.
========================================================================== */

const statusOf =
  (event) => {

    if (
      event.status ===
      "visited"
    ) {

      return "visited"

    }


    if (
      event.autoStatus &&
      event.dateTime
    ) {

      const eventTime =
        new Date(
          event.dateTime
        ).getTime()


      if (
        Number.isFinite(
          eventTime
        ) &&
        Date.now() >=
          eventTime
      ) {

        return "visited"

      }

    }


    return "upcoming"

  }


const statusLabel =
  (event) =>
    statusOf(
      event
    ) ===
      "visited"
      ? "VISITED"
      : "UPCOMING"


function prefersReducedMotion() {

  return (
    typeof window !==
      "undefined" &&
    typeof window.matchMedia ===
      "function" &&
    window
      .matchMedia(
        "(prefers-reduced-motion: reduce)"
      )
      .matches
  )

}


/* ==========================================================================
   FLIGHT ANGLE
========================================================================== */

function getFlightAngles(
  from,
  to,
  view
) {

  const dx =
    (
      (
        to.x -
        from.x
      ) /
      100
    ) *
    view.w


  const dy =
    (
      (
        to.y -
        from.y
      ) /
      100
    ) *
    view.h


  const facing =
    dx <
    0
      ? -1
      : 1


  const pitch =
    (
      Math.atan2(
        dy,
        Math.abs(
          dx
        )
      ) *
      180
    ) /
    Math.PI


  return {

    facing,

    tilt:
      clamp(
        pitch,
        -MAX_TILT,
        MAX_TILT
      ) *
      facing,

  }

}


/* ==========================================================================
   SAFE IMAGE
========================================================================== */

function SafeImage({
  src,
  alt = "",
  className,
  fallback = null,
  ...rest
}) {

  const [
    failed,
    setFailed,
  ] =
    useState(false)


  useEffect(
    () => {

      setFailed(
        false
      )

    },
    [
      src,
    ]
  )


  if (
    !src ||
    failed
  ) {

    return fallback

  }


  return (

    <img

      src={
        src
      }

      alt={
        alt
      }

      className={
        className
      }

      decoding="async"

      onError={() =>
        setFailed(
          true
        )
      }

      {...rest}

    />

  )

}


/* ==========================================================================
   CHIBI
========================================================================== */

function Chibi({
  member,
}) {

  return (

    <SafeImage

      src={
        member.chibi
      }

      className="pp-chibi"

      fallback={

        <span
          className="pp-chibi pp-chibi--fallback"
          aria-hidden="true"
        >

          {
            member.name.charAt(
              0
            )
          }

        </span>

      }

    />

  )

}


/* ==========================================================================
   PLANE
========================================================================== */

function Plane({
  cast,
  point,
  flying,
  angles,
  gradId,
}) {

  if (
    !point
  ) {

    return null

  }


  return (

    <div

      className={
        cls(
          "pp-plane",
          flying &&
            "is-flying"
        )
      }

      style={{
        left:
          `${point.x}%`,

        top:
          `${point.y}%`,
      }}

      aria-hidden="true"

    >

      <span className="pp-plane__tag">
        ON THE WAY...
      </span>


      <div

        className="pp-plane__tilt"

        style={{
          transform:
            `rotate(${angles.tilt}deg)`,
        }}

      >

        <div className="pp-plane__bob">

          <div className="pp-plane__craft">


            {/* ==================================================
                PLANE SHELL
            ================================================== */}

            <svg

              className="pp-plane__shell"

              viewBox="0 0 200 72"

              style={{
                transform:
                  `scaleX(${angles.facing})`,
              }}

              focusable="false"

            >

              <path
                d="M96 20 L128 20 L114 4 L98 4 Z"
                fill={`url(#${gradId})`}
                opacity="0.5"
              />


              <path
                d="M22 26 L8 4 L34 4 L54 20 Z"
                fill={`url(#${gradId})`}
              />


              <path

                d="
                  M30 17
                  H166

                  C190 17
                  198 27
                  198 36

                  C198 45
                  190 55
                  166 55

                  H30

                  C21 55
                  18 46
                  18 36

                  C18 26
                  21 17
                  30 17
                  Z
                "

                fill="#fff"

                stroke={
                  `url(#${gradId})`
                }

                strokeWidth="2.5"

              />


              <path
                d="
                  M84 53
                  H134
                  L112 69

                  Q109 71
                  105 71

                  H92

                  Q88 71
                  89 67
                  Z
                "
                fill={`url(#${gradId})`}
              />


              <circle
                cx="184"
                cy="33"
                r="4"
                fill="#ece6fb"
                stroke={`url(#${gradId})`}
                strokeWidth="1.5"
              />

            </svg>


            {/* ==================================================
                PASSENGERS
            ================================================== */}

            <ul className="pp-plane__crew">

              {cast.map(
                (
                  member,
                  index
                ) => (

                  <li

                    key={
                      member.id
                    }

                    className="pp-plane__seat"

                    style={{
                      "--seat":
                        member.color,

                      "--i":
                        index,
                    }}

                  >

                    <Chibi
                      member={
                        member
                      }
                    />

                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      </div>

    </div>

  )

}


/* ==========================================================================
   MAP PIN
========================================================================== */

function Pin({
  event,
  gradId,
  isCurrent,
  isTarget,
  locked,
  onSelect,
}) {

  const status =
    statusOf(
      event
    )


  const visited =
    status ===
    "visited"


  return (

    <button

      type="button"

      className={
        cls(

          "pp-pin",

          `pp-pin--${status}`,

          event.labelSide ===
            "left"
            ? "pp-pin--left"
            : "pp-pin--right",

          isCurrent &&
            "is-current",

          isTarget &&
            "is-target"

        )
      }

      style={{
        left:
          `${event.x}%`,

        top:
          `${event.y}%`,
      }}

      aria-disabled={
        locked ||
        undefined
      }

      aria-label={
        `${event.city}, ${event.country}. ${
          statusLabel(
            event
          ).toLowerCase()
        }${
          event.date
            ? `, ${event.date}`
            : ""
        }. ${
          isCurrent
            ? "The plane is here. Open details."
            : "Fly here."
        }`
      }

      onClick={() =>
        onSelect(
          event.id
        )
      }

    >

      <span
        className="pp-pin__ground"
        aria-hidden="true"
      />


      <span
        className="pp-pin__ring"
        aria-hidden="true"
      />


      <svg

        className="pp-pin__marker"

        viewBox="0 0 26 35"

        aria-hidden="true"

        focusable="false"

      >

        <path

          className="pp-pin__shape"

          d="
            M13 34.5
            C13 34.5
            1.5 21.5
            1.5 12.5

            a11.5 11.5
            0 0 1
            23 0

            C24.5 21.5
            13 34.5
            13 34.5
            Z
          "

          fill={
            visited
              ? `url(#${gradId})`
              : "#fff"
          }

        />


        <circle

          className="pp-pin__core"

          cx="13"

          cy="12.5"

          r="4.4"

        />

      </svg>


      <span className="pp-pin__label">

        <span className="pp-pin__city">
          {
            event.city
          }
        </span>


        <span className="pp-pin__meta">

          <span className="pp-pin__country">
            {
              event.country
            }
          </span>


          <span className="pp-tag">
            {
              statusLabel(
                event
              )
            }
          </span>

        </span>

      </span>

    </button>

  )

}


/* ==========================================================================
   EVENT / MEDIA MODAL
========================================================================== */

function EventModal({
  event,
  cast,
  onClose,
}) {

  const titleId =
    useId()

  const descId =
    useId()


  const closeRef =
    useRef(null)

  const dialogRef =
    useRef(null)

  const pressedBackdrop =
    useRef(false)


  const [
    hero,
    setHero,
  ] =
    useState(
      event.image
    )


  const gallery =
    Array.isArray(
      event.gallery
    )
      ? event.gallery.filter(
          Boolean
        )
      : []


  const status =
    statusOf(
      event
    )


  const travellers =
    (
      event.participants ||
      []
    ).map(
      (name) => {

        const match =
          cast.find(
            (member) =>
              member.name.toLowerCase() ===
              String(
                name
              ).toLowerCase()
          )


        return (
          match || {
            id:
              name,

            name,

            color:
              "#7c5cd6",

            chibi:
              "",
          }
        )

      }
    )


  /* ==================================================
     MODAL ACCESSIBILITY
  ================================================== */

  useEffect(
    () => {

      const body =
        document.body


      const prevOverflow =
        body.style.overflow


      const prevPadding =
        body.style.paddingRight


      const scrollbar =
        window.innerWidth -
        document.documentElement.clientWidth


      body.style.overflow =
        "hidden"


      if (
        scrollbar >
        0
      ) {

        body.style.paddingRight =
          `${scrollbar}px`

      }


      closeRef.current?.focus()


      const onKeyDown =
        (event) => {

          if (
            event.key ===
            "Escape"
          ) {

            event.preventDefault()

            onClose()

            return

          }


          if (
            event.key !==
              "Tab" ||
            !dialogRef.current
          ) {

            return

          }


          const focusable =
            dialogRef.current.querySelectorAll(

              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

            )


          if (
            !focusable.length
          ) {

            return

          }


          const first =
            focusable[0]


          const last =
            focusable[
              focusable.length -
              1
            ]


          if (
            event.shiftKey &&
            document.activeElement ===
              first
          ) {

            event.preventDefault()

            last.focus()

          }

          else if (
            !event.shiftKey &&
            document.activeElement ===
              last
          ) {

            event.preventDefault()

            first.focus()

          }

        }


      document.addEventListener(
        "keydown",
        onKeyDown
      )


      return () => {

        document.removeEventListener(
          "keydown",
          onKeyDown
        )


        body.style.overflow =
          prevOverflow


        body.style.paddingRight =
          prevPadding

      }

    },
    [
      onClose,
    ]
  )


  return createPortal(

    <div

      className="pp-modal-overlay"

      onPointerDown={
        (event) => {

          pressedBackdrop.current =
            event.target ===
            event.currentTarget

        }
      }

      onClick={
        (event) => {

          if (
            pressedBackdrop.current &&
            event.target ===
              event.currentTarget
          ) {

            onClose()

          }


          pressedBackdrop.current =
            false

        }
      }

    >

      <div

        ref={
          dialogRef
        }

        className="pp-modal"

        role="dialog"

        aria-modal="true"

        aria-labelledby={
          titleId
        }

        aria-describedby={
          event.description
            ? descId
            : undefined
        }

      >

        {/* ==================================================
            CLOSE
        ================================================== */}

        <button

          ref={
            closeRef
          }

          type="button"

          className="pp-modal__close"

          onClick={
            onClose
          }

          aria-label="Close"

        >

          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >

            <path
              d="
                M3 3
                l10 10

                M13 3
                L3 13
              "
            />

          </svg>

        </button>


        {/* ==================================================
            MEDIA
        ================================================== */}

        <div className="pp-modal__media">

          <SafeImage

            src={
              hero
            }

            className="pp-modal__hero"

            alt={
              `${event.title} — ${event.city}`
            }

            fallback={

              <span
                className="pp-ph pp-modal__hero"
                aria-hidden="true"
              >

                <span>
                  Photo coming soon
                </span>

              </span>

            }

          />


          <div

            className={
              cls(
                "pp-stamp",
                "pp-stamp--modal",
                `is-${status}`
              )
            }

            aria-hidden="true"

          >

            <span>
              PASSPORT
            </span>


            <strong>
              {
                event.city
              }
            </strong>


            <span>
              {
                event.date ||
                event.type
              }
            </span>

          </div>


          {event.isSample && (

            <span className="pp-modal__sample">
              SAMPLE DATA
            </span>

          )}

        </div>


        {/* ==================================================
            DETAILS
        ================================================== */}

        <div className="pp-modal__body">

          <span

            className={
              cls(
                "pp-pill",
                `pp-pill--${status}`
              )
            }

          >
            {
              statusLabel(
                event
              )
            }
          </span>


          <p className="pp-modal__kicker">

            {
              event.city
            }

            {" • "}

            {
              event.country
            }

          </p>


          {event.date && (

            <p className="pp-modal__date">
              {
                event.date
              }
            </p>

          )}


          <h3
            id={
              titleId
            }
            className="pp-modal__title"
          >
            {
              event.title
            }
          </h3>


          {event.type && (

            <p className="pp-modal__type">
              {
                event.type
              }
            </p>

          )}


          {event.description && (

            <p
              id={
                descId
              }
              className="pp-modal__desc"
            >
              {
                event.description
              }
            </p>

          )}


          {/* ==================================================
              TRAVELLERS
          ================================================== */}

          {travellers.length >
            0 && (

            <div className="pp-modal__crew">

              <p className="pp-modal__label">
                TRAVELING WITH
              </p>


              <ul>

                {travellers.map(
                  (member) => (

                    <li

                      key={
                        member.id
                      }

                      style={{
                        "--seat":
                          member.color,
                      }}

                    >

                      <span
                        className="pp-mini"
                        aria-hidden="true"
                      >

                        <Chibi
                          member={
                            member
                          }
                        />

                      </span>


                      {
                        member.name
                      }

                    </li>

                  )
                )}

              </ul>

            </div>

          )}


          {/* ==================================================
              MEDIA GALLERY
          ================================================== */}

          {gallery.length >
            0 && (

            <div
              className="pp-modal__gallery"
              role="group"
              aria-label="Photos"
            >

              {gallery.map(
                (
                  src,
                  index
                ) => {

                  const active =
                    hero ===
                    src


                  return (

                    <button

                      key={
                        src
                      }

                      type="button"

                      className={
                        cls(
                          "pp-thumb",
                          active &&
                            "is-active"
                        )
                      }

                      aria-pressed={
                        active
                      }

                      aria-label={
                        `Photo ${
                          index +
                          1
                        } of ${
                          gallery.length
                        }`
                      }

                      onClick={() =>
                        setHero(
                          active
                            ? event.image
                            : src
                        )
                      }

                    >

                      <SafeImage

                        src={
                          src
                        }

                        loading="lazy"

                        alt=""

                        fallback={

                          <span
                            className="pp-ph pp-ph--thumb"
                            aria-hidden="true"
                          />

                        }

                      />

                    </button>

                  )

                }
              )}

            </div>

          )}


          {/* ==================================================
              FOOT
          ================================================== */}

          <div className="pp-modal__foot">

            {isHttpUrl(
              event.sourceUrl
            ) && (

              <a

                className="pp-modal__source"

                href={
                  event.sourceUrl
                }

                target="_blank"

                rel="noopener noreferrer"

              >
                OFFICIAL SOURCE ↗
              </a>

            )}


            {event.coords && (

              <span className="pp-modal__coords">
                {
                  event.coords
                }
              </span>

            )}

          </div>

        </div>

      </div>

    </div>,

    document.body

  )

}


/* ==========================================================================
   DOTTED MAP

   Switches between:
   ASIA
   WORLD / EURASIA
========================================================================== */

function DottedMap({
  landGradId,
  mapMode,
}) {

  const isWorld =
    mapMode ===
    "world"


  const view =
    isWorld
      ? WORLD_MAP_VIEW
      : MAP_VIEW


  const bounds =
    isWorld
      ? WORLD_MAP_BOUNDS
      : MAP_BOUNDS


  const dots =
    useMemo(
      () =>
        isWorld
          ? getWorldLandDotPath()
          : getLandDotPath(),
      [
        isWorld,
      ]
    )


  const {
    w,
    h,
  } =
    view


  const {
    lonMin,
    lonMax,
    latMax,
    latMin,
  } =
    bounds


  const longitudeStep =
    isWorld
      ? 20
      : 10


  const latitudeStep =
    10


  const lons =
    []


  for (
    let lon =
      Math.ceil(
        lonMin /
        longitudeStep
      ) *
      longitudeStep;

    lon <=
    lonMax;

    lon +=
      longitudeStep
  ) {

    lons.push(
      lon
    )

  }


  const lats =
    []


  for (
    let lat =
      Math.floor(
        latMax /
        latitudeStep
      ) *
      latitudeStep;

    lat >=
    latMin;

    lat -=
      latitudeStep
  ) {

    lats.push(
      lat
    )

  }


  const px =
    (lon) =>
      (
        (
          lon -
          lonMin
        ) /
        (
          lonMax -
          lonMin
        )
      ) *
      w


  const py =
    (lat) =>
      (
        (
          latMax -
          lat
        ) /
        (
          latMax -
          latMin
        )
      ) *
      h


  const longitudeLabel =
    (lon) => {

      if (
        lon ===
        0
      ) {

        return "0°"

      }


      return `${
        Math.abs(
          lon
        )
      }°${
        lon <
        0
          ? "W"
          : "E"
      }`

    }


  const latitudeLabel =
    (lat) => {

      if (
        lat ===
        0
      ) {

        return "0°"

      }


      return `${
        Math.abs(
          lat
        )
      }°${
        lat <
        0
          ? "S"
          : "N"
      }`

    }


  return (

    <svg

      className={
        cls(
          "pp-map__art",

          isWorld
            ? "pp-map__art--world"
            : "pp-map__art--asia"
        )
      }

      viewBox={
        `0 0 ${w} ${h}`
      }

      preserveAspectRatio="none"

      aria-hidden="true"

      focusable="false"

    >

      <defs>

        <linearGradient

          id={
            landGradId
          }

          gradientUnits="userSpaceOnUse"

          x1="0"

          y1="0"

          x2={
            w
          }

          y2={
            h
          }

        >

          <stop
            offset="0"
            stopColor="#c2afee"
          />


          <stop
            offset="0.55"
            stopColor="#d3b6ec"
          />


          <stop
            offset="1"
            stopColor="#f0a9c8"
          />

        </linearGradient>

      </defs>


      {/* ==================================================
          GRID
      ================================================== */}

      <g className="pp-map__grid">

        {lons.map(
          (lon) => (

            <line

              key={
                `lon-${lon}`
              }

              x1={
                px(
                  lon
                )
              }

              y1="0"

              x2={
                px(
                  lon
                )
              }

              y2={
                h
              }

            />

          )
        )}


        {lats.map(
          (lat) => (

            <line

              key={
                `lat-${lat}`
              }

              x1="0"

              y1={
                py(
                  lat
                )
              }

              x2={
                w
              }

              y2={
                py(
                  lat
                )
              }

            />

          )
        )}

      </g>


      {/* ==================================================
          COORDINATE TEXT
      ================================================== */}

      <g className="pp-map__ticks">

        {lons.map(
          (lon) => (

            <text

              key={
                `tlon-${lon}`
              }

              x={
                px(
                  lon
                ) +
                6
              }

              y={
                h -
                10
              }

            >
              {
                longitudeLabel(
                  lon
                )
              }
            </text>

          )
        )}


        {lats
          .filter(
            (lat) =>
              lat >
              0
          )
          .map(
            (lat) => (

              <text

                key={
                  `tlat-${lat}`
                }

                x="10"

                y={
                  py(
                    lat
                  ) -
                  6
                }

              >
                {
                  latitudeLabel(
                    lat
                  )
                }
              </text>

            )
          )}

      </g>


      {/* ==================================================
          LAND DOTS
      ================================================== */}

      <path

        className="pp-map__dots"

        d={
          dots
        }

        stroke={
          `url(#${landGradId})`
        }

      />

    </svg>

  )

}


/* ==========================================================================
   MAIN COMPONENT
========================================================================== */

export default function TogetherPairPassport({

  events =
    pairPassportEvents,

  cast =
    pairPassportCast,

  homeId =
    pairPassportConfig.homeId,

  mapImage =
    pairPassportConfig.mapImage,

  mapSize =
    pairPassportConfig.mapSize,

}) {

  const uid =
    useId()
      .replace(
        /[^a-zA-Z0-9_-]/g,
        ""
      )


  const brandGradId =
    `pp-brand-${uid}`


  const routeGradId =
    `pp-route-${uid}`


  const landGradId =
    `pp-land-${uid}`


  /* ==================================================
     MAP MODE
  ================================================== */

  const [
    mapMode,
    setMapMode,
  ] =
    useState(
      "asia"
    )


  const [
    isMapChanging,
    setIsMapChanging,
  ] =
    useState(
      false
    )


  const view =
    mapImage
      ? mapSize
      : mapMode ===
          "world"
        ? WORLD_MAP_VIEW
        : MAP_VIEW


  /* ==================================================
     STOPS
  ================================================== */

  const stops =
    useMemo(
      () =>
        events.filter(
          (event) => {

            if (
              !event ||
              !event.id
            ) {

              return false

            }


            const hasCoordinates =
              Number.isFinite(
                event.lon
              ) &&
              Number.isFinite(
                event.lat
              )


            const hasLegacyPosition =
              Number.isFinite(
                event.x
              ) &&
              Number.isFinite(
                event.y
              )


            return (
              hasCoordinates ||
              hasLegacyPosition
            )

          }
        ),
      [
        events,
      ]
    )


  const byId =
    useMemo(
      () =>
        new Map(
          stops.map(
            (event) => [
              event.id,
              event,
            ]
          )
        ),
      [
        stops,
      ]
    )


  const homeEvent =
    byId.get(
      homeId
    ) ||
    stops[0]


  /* ==================================================
     PROJECT A DESTINATION TO CURRENT MAP
  ================================================== */

  const projectEvent =
    useCallback(
      (
        event,
        mode =
          mapMode
      ) => {

        if (
          !event
        ) {

          return null

        }


        if (
          Number.isFinite(
            event.lon
          ) &&
          Number.isFinite(
            event.lat
          )
        ) {

          const position =
            mode ===
              "world"
              ? worldMapPoint(
                  event.lon,
                  event.lat
                )
              : mapPoint(
                  event.lon,
                  event.lat
                )


          return {

            ...event,

            ...position,

          }

        }


        return {
          ...event,
        }

      },
      [
        mapMode,
      ]
    )


  /* ==================================================
     PINS CURRENTLY VISIBLE

     Asia mode:
     hides Paris

     World mode:
     shows Asia + Paris
  ================================================== */

  const visibleStops =
    useMemo(
      () =>
        stops
          .filter(
            (event) =>
              mapMode ===
                "world" ||
              event.mapMode !==
                "world"
          )
          .map(
            (event) =>
              projectEvent(
                event,
                mapMode
              )
          )
          .filter(
            (event) =>
              event &&
              event.x >=
                -3 &&
              event.x <=
                103 &&
              event.y >=
                -3 &&
              event.y <=
                103
          ),
      [
        stops,
        mapMode,
        projectEvent,
      ]
    )


  /* ==================================================
     STATE
  ================================================== */

  const [
    currentId,
    setCurrentId,
  ] =
    useState(
      homeEvent?.id
    )


  const [
    flight,
    setFlight,
  ] =
    useState(
      null
    )


  const [
    route,
    setRoute,
  ] =
    useState(
      null
    )


  const [
    angles,
    setAngles,
  ] =
    useState({
      facing: 1,
      tilt: 0,
    })


  const [
    flightMs,
    setFlightMs,
  ] =
    useState(
      FLIGHT_MS
    )


  const [
    openId,
    setOpenId,
  ] =
    useState(
      null
    )


  /* ==================================================
     REFS
  ================================================== */

  const timerRef =
    useRef(null)


  const mapSwitchTimerRef =
    useRef(null)


  const mapSettleTimerRef =
    useRef(null)


  const rafRef =
    useRef(null)


  const scrollRef =
    useRef(null)


  const mapRef =
    useRef(null)


  const lastFocusRef =
    useRef(null)


  /* ==================================================
     CLEANUP
  ================================================== */

  useEffect(
    () =>
      () => {

        window.clearTimeout(
          timerRef.current
        )


        window.clearTimeout(
          mapSwitchTimerRef.current
        )


        window.clearTimeout(
          mapSettleTimerRef.current
        )


        window.cancelAnimationFrame(
          rafRef.current
        )

      },
    []
  )


  /* ==================================================
     FOLLOW PLANE ON SMALL SCREENS
  ================================================== */

  const followPlane =
    useCallback(
      (
        target,
        ms
      ) => {

        const scroller =
          scrollRef.current


        const map =
          mapRef.current


        if (
          !scroller ||
          !map
        ) {

          return

        }


        const max =
          scroller.scrollWidth -
          scroller.clientWidth


        if (
          max <=
          2
        ) {

          return

        }


        const from =
          scroller.scrollLeft


        const to =
          clamp(

            map.offsetLeft +
              (
                target.x /
                100
              ) *
                map.offsetWidth -
              scroller.clientWidth /
                2,

            0,

            max

          )


        if (
          Math.abs(
            to -
            from
          ) <
          2
        ) {

          return

        }


        window.cancelAnimationFrame(
          rafRef.current
        )


        const startedAt =
          performance.now()


        const step =
          (now) => {

            const t =
              clamp(
                (
                  now -
                  startedAt
                ) /
                  ms,
                0,
                1
              )


            scroller.scrollLeft =
              from +
              (
                to -
                from
              ) *
                easeInOutCubic(
                  t
                )


            if (
              t <
              1
            ) {

              rafRef.current =
                window.requestAnimationFrame(
                  step
                )

            }

          }


        rafRef.current =
          window.requestAnimationFrame(
            step
          )

      },
      []
    )


  /* ==================================================
     SELECT DESTINATION

     ASIA → PARIS:
     1. Zoom out
     2. Show world
     3. Fly
     4. Land
     5. Open media modal

     PARIS → ASIA:
     1. Stay zoomed out while flying
     2. Land
     3. Zoom back into Asia
     4. Open media modal
  ================================================== */

  const handleSelect =
    useCallback(
      (id) => {

        if (
          flight ||
          isMapChanging
        ) {

          return

        }


        const targetRaw =
          byId.get(
            id
          )


        if (
          !targetRaw
        ) {

          return

        }


        lastFocusRef.current =
          document.activeElement


        const originRaw =
          byId.get(
            currentId
          ) ||
          homeEvent


        if (
          !originRaw
        ) {

          return

        }


        /* ==================================================
           ALREADY AT DESTINATION
        ================================================== */

        if (
          originRaw.id ===
          targetRaw.id
        ) {

          setOpenId(
            targetRaw.id
          )

          return

        }


        /* ==================================================
           WHICH MAP SHOULD THE FLIGHT USE?
        ================================================== */

        const travelMode =
          originRaw.mapMode ===
            "world" ||
          targetRaw.mapMode ===
            "world"
            ? "world"
            : "asia"


        const targetHomeMode =
          targetRaw.mapMode ===
            "world"
            ? "world"
            : "asia"


        /* ==================================================
           START FLIGHT
        ================================================== */

        const startFlight =
          () => {

            const origin =
              projectEvent(
                originRaw,
                travelMode
              )


            const target =
              projectEvent(
                targetRaw,
                travelMode
              )


            const travelView =
              travelMode ===
                "world"
                ? WORLD_MAP_VIEW
                : MAP_VIEW


            const ms =
              prefersReducedMotion()
                ? REDUCED_MOTION_FLIGHT_MS
                : FLIGHT_MS


            setFlightMs(
              ms
            )


            setAngles(
              getFlightAngles(
                origin,
                target,
                travelView
              )
            )


            setRoute({

              from: {
                x:
                  origin.x,

                y:
                  origin.y,
              },

              to: {
                x:
                  target.x,

                y:
                  target.y,
              },

              live:
                true,

            })


            setFlight({
              toId:
                targetRaw.id,
            })


            window.requestAnimationFrame(
              () => {

                followPlane(
                  target,
                  ms
                )

              }
            )


            window.clearTimeout(
              timerRef.current
            )


            timerRef.current =
              window.setTimeout(
                () => {

                  /* ==================================================
                     LAND
                  ================================================== */

                  setCurrentId(
                    targetRaw.id
                  )


                  setFlight(
                    null
                  )


                  setAngles(
                    (
                      current
                    ) => ({

                      ...current,

                      tilt:
                        0,

                    })
                  )


                  setRoute(
                    (
                      current
                    ) =>
                      current
                        ? {
                            ...current,

                            live:
                              false,
                          }
                        : current
                  )


                  /* ==================================================
                     RETURNING FROM PARIS TO ASIA

                     Land on world map first,
                     then zoom into Asia.
                  ================================================== */

                  if (
                    travelMode !==
                    targetHomeMode
                  ) {

                    setIsMapChanging(
                      true
                    )


                    mapSwitchTimerRef.current =
                      window.setTimeout(
                        () => {

                          setMapMode(
                            targetHomeMode
                          )


                          mapSettleTimerRef.current =
                            window.setTimeout(
                              () => {

                                setIsMapChanging(
                                  false
                                )


                                setOpenId(
                                  targetRaw.id
                                )

                              },
                              320
                            )

                        },
                        220
                      )


                    return

                  }


                  /* ==================================================
                     NORMAL ARRIVAL
                  ================================================== */

                  setOpenId(
                    targetRaw.id
                  )

                },
                ms
              )

          }


        /* ==================================================
           NEED TO ZOOM OUT FIRST
        ================================================== */

        if (
          mapMode !==
          travelMode
        ) {

          setIsMapChanging(
            true
          )


          setRoute(
            null
          )


          window.clearTimeout(
            mapSwitchTimerRef.current
          )


          mapSwitchTimerRef.current =
            window.setTimeout(
              () => {

                setMapMode(
                  travelMode
                )


                mapSettleTimerRef.current =
                  window.setTimeout(
                    () => {

                      setIsMapChanging(
                        false
                      )


                      startFlight()

                    },
                    340
                  )

              },
              220
            )


          return

        }


        /* ==================================================
           SAME MAP — FLY IMMEDIATELY
        ================================================== */

        startFlight()

      },
      [
        byId,
        currentId,
        flight,
        followPlane,
        homeEvent,
        isMapChanging,
        mapMode,
        projectEvent,
      ]
    )


  /* ==================================================
     CLOSE MODAL
  ================================================== */

  const handleClose =
    useCallback(
      () => {

        setOpenId(
          null
        )


        window.requestAnimationFrame(
          () => {

            const element =
              lastFocusRef.current


            if (
              element &&
              typeof element.focus ===
                "function" &&
              document.contains(
                element
              )
            ) {

              element.focus()

            }

          }
        )

      },
      []
    )


  /* ==================================================
     SAFETY
  ================================================== */

  if (
    !homeEvent
  ) {

    return null

  }


  /* ==================================================
     CURRENT / TARGET POSITIONS
  ================================================== */

  const isFlying =
    Boolean(
      flight
    )


  const currentRaw =
    byId.get(
      currentId
    ) ||
    homeEvent


  const targetRaw =
    flight
      ? byId.get(
          flight.toId
        )
      : null


  const currentEvent =
    projectEvent(
      currentRaw,
      mapMode
    )


  const targetEvent =
    targetRaw
      ? projectEvent(
          targetRaw,
          mapMode
        )
      : null


  const planePoint =
    targetEvent ||
    currentEvent


  const openEvent =
    openId
      ? byId.get(
          openId
        )
      : null


  const visitedCount =
    stops.filter(
      (event) =>
        statusOf(
          event
        ) ===
        "visited"
    ).length


  const mapLabels =
    mapMode ===
      "world"
      ? WORLD_LABELS
      : SEA_LABELS


  /* ==========================================================================
     COMPONENT
  ========================================================================== */

  return (

    <section

      id="pair-passport"

      className={
        cls(

          "pair-passport",

          isFlying &&
            "is-flying",

          isMapChanging &&
            "is-map-changing",

          mapMode ===
            "world" &&
            "is-world-map"

        )
      }

      style={{
        "--pp-flight":
          `${flightMs}ms`,
      }}

      aria-labelledby={
        `pp-title-${uid}`
      }

    >


      {/* ==================================================
          SHARED GRADIENT
      ================================================== */}

      <svg

        className="pp-defs"

        width="0"

        height="0"

        aria-hidden="true"

        focusable="false"

      >

        <defs>

          <linearGradient
            id={
              brandGradId
            }
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >

            <stop
              offset="0"
              stopColor="#7c5cd6"
            />


            <stop
              offset="1"
              stopColor="#ee78ab"
            />

          </linearGradient>

        </defs>

      </svg>


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="pp-head">

        <div>

          <p className="pp-eyebrow">
            05 / PAIR PASSPORT
          </p>


          <h2

            id={
              `pp-title-${uid}`
            }

            className="pp-title"

          >

            From Bangkok,

            <span className="pp-title__script">
              with love.
            </span>

          </h2>

        </div>


        <p className="pp-sub">

          Follow JanJingJing&rsquo;s journey,
          one stop at a time.

        </p>

      </header>


      {/* ==================================================
          MAP CARD
      ================================================== */}

      <div className="pp-card">


        {/* ==================================================
            TOP BAR
        ================================================== */}

        <div className="pp-card__bar">

          <ul
            className="pp-legend"
            aria-label="Map legend"
          >

            <li>

              <span
                className="pp-legend__dot is-visited"
                aria-hidden="true"
              />

              VISITED

            </li>


            <li>

              <span
                className="pp-legend__dot is-upcoming"
                aria-hidden="true"
              />

              UPCOMING

            </li>

          </ul>


          <p

            className={
              cls(
                "pp-status",
                isFlying &&
                  "is-flying"
              )
            }

            role="status"

            aria-live="polite"

          >

            <span
              className="pp-status__dot"
              aria-hidden="true"
            />


            <span>

              {
                isFlying
                  ? "ON THE WAY TO "
                  : "NOW IN "
              }


              <span className="pp-status__city">

                {
                  isFlying
                    ? targetEvent?.city
                    : currentEvent?.city
                }

              </span>


              {
                isFlying
                  ? "..."
                  : ""
              }

            </span>

          </p>

        </div>


        {/* ==================================================
            MAP
        ================================================== */}

        <div
          className="pp-mapscroll"
          ref={
            scrollRef
          }
        >

          <div

            className="pp-map"

            ref={
              mapRef
            }

            style={{
              aspectRatio:
                `${view.w} / ${view.h}`,
            }}

          >


            {/* ==================================================
                MAP BACKGROUND
            ================================================== */}

            {mapImage ? (

              <img

                className="pp-map__art pp-map__img"

                src={
                  mapImage
                }

                alt=""

                draggable="false"

              />

            ) : (

              <>

                <DottedMap

                  landGradId={
                    landGradId
                  }

                  mapMode={
                    mapMode
                  }

                />


                {mapLabels.map(
                  (label) => (

                    <span

                      key={
                        label.text
                      }

                      className="pp-sea"

                      style={{
                        left:
                          `${label.x}%`,

                        top:
                          `${label.y}%`,
                      }}

                      aria-hidden="true"

                    >
                      {
                        label.text
                      }
                    </span>

                  )
                )}

              </>

            )}


            {/* ==================================================
                DECORATIONS
            ================================================== */}

            {SPARKS.map(
              (
                spark,
                index
              ) => (

                <span

                  key={
                    index
                  }

                  className="pp-spark"

                  style={{
                    left:
                      `${spark.x}%`,

                    top:
                      `${spark.y}%`,

                    fontSize:
                      spark.size,
                  }}

                  aria-hidden="true"

                >
                  ✦
                </span>

              )
            )}


            {/* ==================================================
                PASSPORT STAMP COUNT
            ================================================== */}

            <div
              className="pp-stamp pp-stamp--map"
              aria-hidden="true"
            >

              <span>
                STAMPS
              </span>


              <strong>

                {
                  String(
                    visitedCount
                  ).padStart(
                    2,
                    "0"
                  )
                }

                /

                {
                  String(
                    stops.length
                  ).padStart(
                    2,
                    "0"
                  )
                }

              </strong>


              <span>
                COLLECTED
              </span>

            </div>


            {/* ==================================================
                FLIGHT ROUTE
            ================================================== */}

            {route && (

              <svg

                className={
                  cls(
                    "pp-route",
                    route.live &&
                      "is-live"
                  )
                }

                viewBox="0 0 100 100"

                preserveAspectRatio="none"

                aria-hidden="true"

                focusable="false"

              >

                <defs>

                  <linearGradient

                    id={
                      routeGradId
                    }

                    gradientUnits="userSpaceOnUse"

                    x1={
                      route.from.x
                    }

                    y1={
                      route.from.y
                    }

                    x2={
                      route.to.x
                    }

                    y2={
                      route.to.y
                    }

                  >

                    <stop
                      offset="0"
                      stopColor="#7c5cd6"
                    />


                    <stop
                      offset="1"
                      stopColor="#ee78ab"
                    />

                  </linearGradient>

                </defs>


                <line

                  className="pp-route__line"

                  x1={
                    route.from.x
                  }

                  y1={
                    route.from.y
                  }

                  x2={
                    route.to.x
                  }

                  y2={
                    route.to.y
                  }

                  stroke={
                    `url(#${routeGradId})`
                  }

                />

              </svg>

            )}


            {/* ==================================================
                PINS

                Asia mode:
                Paris is hidden.

                World mode:
                Paris + all Asian destinations appear.
            ================================================== */}

            {visibleStops.map(
              (event) => (

                <Pin

                  key={
                    event.id
                  }

                  event={
                    event
                  }

                  gradId={
                    brandGradId
                  }

                  isCurrent={
                    !isFlying &&
                    event.id ===
                      currentEvent.id
                  }

                  isTarget={
                    isFlying &&
                    event.id ===
                      targetEvent?.id
                  }

                  locked={
                    isFlying ||
                    isMapChanging
                  }

                  onSelect={
                    handleSelect
                  }

                />

              )
            )}


            {/* ==================================================
                PLANE
            ================================================== */}

            <Plane

              cast={
                cast
              }

              point={
                planePoint
              }

              flying={
                isFlying
              }

              angles={
                angles
              }

              gradId={
                brandGradId
              }

            />

          </div>

        </div>


        {/* ==================================================
            MOBILE SWIPE TEXT
        ================================================== */}

        <p
          className="pp-swipe"
          aria-hidden="true"
        >

          &larr; swipe the map &rarr;

        </p>


        {/* ==================================================
            DESTINATIONS

            IMPORTANT:
            Uses ALL `stops`, not `visibleStops`.

            Therefore Paris remains available at the bottom
            even while the map is zoomed into Asia.
        ================================================== */}

        <nav
          className="pp-dest"
          aria-label="Destinations"
        >

          <ul className="pp-dest__list">

            {stops.map(
              (event) => {

                const isCurrent =
                  !isFlying &&
                  event.id ===
                    currentRaw.id


                const isTarget =
                  isFlying &&
                  event.id ===
                    targetRaw?.id


                return (

                  <li
                    key={
                      event.id
                    }
                  >

                    <button

                      type="button"

                      className={
                        cls(

                          "pp-dest__btn",

                          `is-${statusOf(
                            event
                          )}`,

                          isCurrent &&
                            "is-current",

                          isTarget &&
                            "is-target",

                          event.mapMode ===
                            "world" &&
                            "is-world-destination"

                        )
                      }

                      aria-disabled={
                        isFlying ||
                        isMapChanging ||
                        undefined
                      }

                      aria-current={
                        isCurrent
                          ? "location"
                          : undefined
                      }

                      onClick={() =>
                        handleSelect(
                          event.id
                        )
                      }

                    >

                      <span className="pp-dest__city">

                        <span
                          className="pp-dest__dot"
                          aria-hidden="true"
                        />


                        {
                          event.city
                        }

                      </span>


                      <span className="pp-dest__date">

                        {
                          event.date ||
                          event.type
                        }

                      </span>

                    </button>

                  </li>

                )

              }
            )}

          </ul>

        </nav>

      </div>


      {/* ==================================================
          ARRIVAL MEDIA MODAL
      ================================================== */}

      {openEvent && (

        <EventModal

          key={
            openEvent.id
          }

          event={
            openEvent
          }

          cast={
            cast
          }

          onClose={
            handleClose
          }

        />

      )}

    </section>

  )

}