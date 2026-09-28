import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Link,
} from "react-router-dom"

import {
  supabase,
} from "../../lib/supabase"

import "../../styles/pages/AdminFanPulse.css"


/* ==================================================
   REACTIONS
================================================== */

const reactions = [
  {
    id: "purple_heart",
    emoji: "💜",
    label: "Purple Heart",
    person: "jan",
  },

  {
    id: "fox",
    emoji: "🦊",
    label: "Fox",
    person: "jan",
  },

  {
    id: "egg",
    emoji: "🥚",
    label: "Egg",
    person: "jan",
  },

  {
    id: "pink_heart",
    emoji: "🩷",
    label: "Pink Heart",
    person: "jingjing",
  },

  {
    id: "ribbon",
    emoji: "🎀",
    label: "Ribbon",
    person: "jingjing",
  },

  {
    id: "tiger",
    emoji: "🐯",
    label: "Tiger",
    person: "jingjing",
  },
]


const createEmptyCounts =
  () => ({
    purple_heart: 0,
    fox: 0,
    egg: 0,

    pink_heart: 0,
    ribbon: 0,
    tiger: 0,
  })


function AdminFanPulse() {

  const [
    counts,
    setCounts,
  ] =
    useState(
      createEmptyCounts
    )


  const [
    loading,
    setLoading,
  ] =
    useState(true)


  const [
    error,
    setError,
  ] =
    useState("")


  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState(null)


  /* ==================================================
     LOAD FAN PULSE
  ================================================== */

  const loadFanPulse =
    useCallback(
      async () => {

        setLoading(true)

        setError("")


        const {
          data,
          error: loadError,
        } =
          await supabase
            .from(
              "fan_reactions"
            )
            .select(
              "reaction, count, updated_at"
            )
            .eq(
              "target_type",
              "fan_pulse"
            )
            .eq(
              "target_id",
              "janjingjing"
            )


        if (
          loadError
        ) {

          console.error(
            "Admin Fan Pulse error:",
            loadError
          )

          setError(
            "Could not load Fan Pulse."
          )

          setLoading(false)

          return

        }


        const nextCounts =
          createEmptyCounts()


        let newestUpdate =
          null


        ;(
          data || []
        ).forEach(
          (row) => {

            if (
              Object.prototype
                .hasOwnProperty.call(
                  nextCounts,
                  row.reaction
                )
            ) {

              nextCounts[
                row.reaction
              ] =
                Number(
                  row.count
                ) || 0

            }


            if (
              row.updated_at
            ) {

              const rowDate =
                new Date(
                  row.updated_at
                )


              if (
                !newestUpdate ||
                rowDate >
                  newestUpdate
              ) {

                newestUpdate =
                  rowDate

              }

            }

          }
        )


        setCounts(
          nextCounts
        )

        setLastUpdated(
          newestUpdate
        )

        setLoading(false)

      },
      []
    )


  useEffect(
    () => {

      loadFanPulse()

    },
    [
      loadFanPulse,
    ]
  )


  /* ==================================================
     TOTALS
  ================================================== */

  const janTotal =
    useMemo(
      () =>
        counts.purple_heart +
        counts.fox +
        counts.egg,
      [
        counts,
      ]
    )


  const jingJingTotal =
    useMemo(
      () =>
        counts.pink_heart +
        counts.ribbon +
        counts.tiger,
      [
        counts,
      ]
    )


  const total =
    janTotal +
    jingJingTotal


  /* ==================================================
     RENDER
  ================================================== */

  return (

    <main className="admin-pulse">

      <div className="admin-pulse__container">


        {/* ==================================================
            TOP
        ================================================== */}

        <div className="admin-pulse__top">

          <div>

            <p className="admin-pulse__eyebrow">
              ADMIN / FAN PULSE
            </p>


            <h1>
              Fan Pulse
            </h1>


            <p className="admin-pulse__intro">
              View the charms visitors have left
              for Jan and JingJing.
            </p>

          </div>


          <div className="admin-pulse__actions">

            <button
              type="button"
              onClick={
                loadFanPulse
              }
              disabled={
                loading
              }
            >
              {
                loading
                  ? "Loading..."
                  : "Refresh"
              }
            </button>


            <Link to="/admin">
              Dashboard
            </Link>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="admin-pulse__error">
            {error}
          </div>

        )}


        {/* ==================================================
            OVERVIEW
        ================================================== */}

        <section className="admin-pulse__overview">

          <div className="admin-pulse__overview-card">

            <span>
              TOTAL CHARMS
            </span>

            <strong>
              {
                loading
                  ? "—"
                  : total.toLocaleString()
              }
            </strong>

          </div>


          <div className="admin-pulse__overview-card admin-pulse__overview-card--jan">

            <span>
              JAN
            </span>

            <strong>
              {
                loading
                  ? "—"
                  : janTotal.toLocaleString()
              }
            </strong>

            <small>
              💜 🦊 🥚
            </small>

          </div>


          <div className="admin-pulse__overview-card admin-pulse__overview-card--jingjing">

            <span>
              JINGJING
            </span>

            <strong>
              {
                loading
                  ? "—"
                  : jingJingTotal.toLocaleString()
              }
            </strong>

            <small>
              🩷 🎀 🐯
            </small>

          </div>

        </section>


        {/* ==================================================
            REACTION COUNTS
        ================================================== */}

        <section className="admin-pulse__reactions">

          {reactions.map(
            (reaction) => (

              <article
                key={
                  reaction.id
                }
                className={[
                  "admin-pulse__reaction",

                  reaction.person ===
                  "jan"
                    ? "is-jan"
                    : "is-jingjing",
                ].join(" ")}
              >

                <div className="admin-pulse__reaction-emoji">
                  {
                    reaction.emoji
                  }
                </div>


                <div className="admin-pulse__reaction-copy">

                  <span>
                    {
                      reaction.label
                    }
                  </span>

                  <small>
                    {
                      reaction.person ===
                      "jan"
                        ? "JAN"
                        : "JINGJING"
                    }
                  </small>

                </div>


                <strong>

                  {
                    loading
                      ? "—"
                      : (
                          counts[
                            reaction.id
                          ] || 0
                        ).toLocaleString()
                  }

                </strong>

              </article>

            )
          )}

        </section>


        {/* ==================================================
            FOOTER INFO
        ================================================== */}

        <div className="admin-pulse__footer">

          {lastUpdated ? (

            <p>

              Last reaction update:{" "}

              {lastUpdated.toLocaleString()}

            </p>

          ) : (

            <p>
              No Fan Pulse reactions yet.
            </p>

          )}

        </div>

      </div>

    </main>

  )

}


export default AdminFanPulse