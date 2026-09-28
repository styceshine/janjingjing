import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  supabase,
} from "../lib/supabase"

import "../styles/components/FanPulse.css"


/* ==================================================
   FAN PULSE CONFIG
================================================== */

const fanPulseGroups = [
  {
    id: "jan",
    name: "JAN",
    subtitle: "leave a charm for Jan",
    reactions: [
      {
        id: "purple_heart",
        emoji: "💜",
        label: "Purple Heart",
      },
      {
        id: "fox",
        emoji: "🦊",
        label: "Fox",
      },
      {
        id: "egg",
        emoji: "🥚",
        label: "Egg",
      },
    ],
  },

  {
    id: "jingjing",
    name: "JINGJING",
    subtitle: "leave a charm for JingJing",
    reactions: [
      {
        id: "pink_heart",
        emoji: "🩷",
        label: "Pink Heart",
      },
      {
        id: "ribbon",
        emoji: "🎀",
        label: "Ribbon",
      },
      {
        id: "tiger",
        emoji: "🐯",
        label: "Tiger",
      },
    ],
  },
]


const allReactions =
  fanPulseGroups.flatMap(
    (group) =>
      group.reactions
  )


/* ==================================================
   EMPTY COUNTS
================================================== */

const createEmptyCounts =
  () => ({
    purple_heart: 0,
    fox: 0,
    egg: 0,

    pink_heart: 0,
    ribbon: 0,
    tiger: 0,
  })


/* ==================================================
   STORAGE KEY
================================================== */

function getStorageKey(
  reaction
) {

  return (
    `janjingjing-fan-pulse:` +
    `${reaction}`
  )

}


/* ==================================================
   COMPONENT
================================================== */

function FanPulse({
  compact = false,
}) {

  const [
    counts,
    setCounts,
  ] =
    useState(
      createEmptyCounts
    )


  const [
    reacted,
    setReacted,
  ] =
    useState([])


  const [
    loading,
    setLoading,
  ] =
    useState(true)


  const [
    submitting,
    setSubmitting,
  ] =
    useState("")


  const [
    error,
    setError,
  ] =
    useState("")


  const [
    latestReaction,
    setLatestReaction,
  ] =
    useState(null)


  /* ==================================================
     TARGET

     This is one global Fan Pulse shared across
     the entire JanJingJing website.
  ================================================== */

  const targetType =
    "fan_pulse"


  const targetId =
    "janjingjing"


  /* ==================================================
     LOCAL REACTION STATE
  ================================================== */

  const loadLocalState =
    useCallback(
      () => {

        const saved =
          allReactions
            .filter(
              (
                reaction
              ) =>
                localStorage.getItem(
                  getStorageKey(
                    reaction.id
                  )
                ) ===
                "true"
            )
            .map(
              (
                reaction
              ) =>
                reaction.id
            )


        setReacted(
          saved
        )

      },
      []
    )


  /* ==================================================
     LOAD COUNTS
  ================================================== */

  const loadCounts =
    useCallback(
      async () => {

        setLoading(
          true
        )

        setError(
          ""
        )


        const {
          data,
          error:
            loadError,
        } =
          await supabase
            .from(
              "fan_reactions"
            )
            .select(
              "reaction, count"
            )
            .eq(
              "target_type",
              targetType
            )
            .eq(
              "target_id",
              targetId
            )


        if (
          loadError
        ) {

          console.error(
            "Fan Pulse load error:",
            loadError
          )

          setError(
            "Fan Pulse could not be loaded."
          )

          setLoading(
            false
          )

          return

        }


        const nextCounts =
          createEmptyCounts()


        ;(
          data ||
          []
        ).forEach(
          (
            row
          ) => {

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

          }
        )


        setCounts(
          nextCounts
        )

        setLoading(
          false
        )

      },
      []
    )


  /* ==================================================
     INITIAL LOAD
  ================================================== */

  useEffect(
    () => {

      loadCounts()
      loadLocalState()

    },
    [
      loadCounts,
      loadLocalState,
    ]
  )






/* ==================================================
   SYNC MULTIPLE FAN PULSE INSTANCES

   Example:
   Full Together Fan Pulse
   +
   Floating Charm panel
================================================== */

useEffect(
  () => {

    const handlePulseUpdate =
      () => {

        loadCounts()
        loadLocalState()

      }


    window.addEventListener(
      "janjingjing:fan-pulse",
      handlePulseUpdate
    )


    return () => {

      window.removeEventListener(
        "janjingjing:fan-pulse",
        handlePulseUpdate
      )

    }

  },
  [
    loadCounts,
    loadLocalState,
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


  const totalPulse =
    janTotal +
    jingJingTotal


  /* ==================================================
     REACTION MESSAGE
  ================================================== */

  const reactionMessage =
    useMemo(
      () => {

        if (
          !latestReaction
        ) {

          return ""
        }


        const messages = {

          purple_heart:
            "A purple heart for Jan 💜",

          fox:
            "Fox charm received! 🦊",

          egg:
            "Boiled Egg acquired 🥚",

          pink_heart:
            "A pink heart for JingJing 🩷",

          ribbon:
            "A little ribbon for JingJing 🎀",

          tiger:
            "Tiger energy! 🐯",

        }


        return (
          messages[
            latestReaction
          ] ||
          ""
        )

      },
      [
        latestReaction,
      ]
    )


  /* ==================================================
     REACT
  ================================================== */

  const handleReaction =
    async (
      reactionId
    ) => {

      if (
        submitting ||
        reacted.includes(
          reactionId
        )
      ) {

        return

      }


      const previousCount =
        counts[
          reactionId
        ] || 0


      /* ==============================================
         OPTIMISTIC UPDATE
      ============================================== */

      setCounts(
        (
          current
        ) => ({
          ...current,

          [reactionId]:
            (
              current[
                reactionId
              ] || 0
            ) + 1,
        })
      )


      setSubmitting(
        reactionId
      )

      setError(
        ""
      )


      try {

        const {
          data,
          error:
            reactionError,
        } =
          await supabase
            .rpc(
              "add_fan_reaction",
              {
                p_target_type:
                  targetType,

                p_target_id:
                  targetId,

                p_reaction:
                  reactionId,
              }
            )


        if (
          reactionError
        ) {

          throw reactionError

        }


        const databaseCount =
          Number(
            data
          )


        if (
          Number.isFinite(
            databaseCount
          )
        ) {

          setCounts(
            (
              current
            ) => ({
              ...current,

              [reactionId]:
                databaseCount,
            })
          )

        }


        localStorage.setItem(
          getStorageKey(
            reactionId
          ),
          "true"
        )


        setReacted(
          (
            current
          ) => [
            ...current,
            reactionId,
          ]
        )


        setLatestReaction(
          reactionId
        )


        /*
         * Later the floating charm button and Jewel
         * can listen for this same browser event.
         */

        window.dispatchEvent(
          new CustomEvent(
            "janjingjing:fan-pulse",
            {
              detail: {
                reaction:
                  reactionId,

                count:
                  Number.isFinite(
                    databaseCount
                  )
                    ? databaseCount
                    : previousCount + 1,
              },
            }
          )
        )


        window.setTimeout(
          () => {

            setLatestReaction(
              null
            )

          },
          2200
        )

      }

      catch (
        reactionError
      ) {

        console.error(
          "Fan Pulse reaction error:",
          reactionError
        )


        setCounts(
          (
            current
          ) => ({
            ...current,

            [reactionId]:
              previousCount,
          })
        )


        setError(
          "Your charm could not be added."
        )

      }

      finally {

        setSubmitting(
          ""
        )

      }

    }


  /* ==================================================
     COMPACT VERSION

     This will be useful later for the floating panel.
  ================================================== */

  if (
    compact
  ) {

    return (

      <div className="fan-pulse fan-pulse--compact">

        <div className="fan-pulse-compact__groups">

          {fanPulseGroups.map(
            (
              group
            ) => (

              <div
                key={
                  group.id
                }
                className={
                  `fan-pulse-compact__group fan-pulse-compact__group--${group.id}`
                }
              >

                <span className="fan-pulse-compact__name">
                  {
                    group.name
                  }
                </span>


                <div className="fan-pulse-compact__buttons">

                  {group.reactions.map(
                    (
                      reaction
                    ) => {

                      const hasReacted =
                        reacted.includes(
                          reaction.id
                        )


                      return (

                        <button
                          key={
                            reaction.id
                          }

                          type="button"

                          className={
                            hasReacted
                              ? "is-reacted"
                              : ""
                          }

                          aria-label={
                            `${reaction.label}: ${
                              counts[
                                reaction.id
                              ] || 0
                            }`
                          }

                          disabled={
                            loading ||
                            Boolean(
                              submitting
                            ) ||
                            hasReacted
                          }

                          onClick={() =>
                            handleReaction(
                              reaction.id
                            )
                          }
                        >

                          <span>
                            {
                              reaction.emoji
                            }
                          </span>

                          <small>
                            {
                              loading
                                ? "—"
                                : (
                                    counts[
                                      reaction.id
                                    ] || 0
                                  ).toLocaleString()
                            }
                          </small>

                        </button>

                      )

                    }
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    )

  }


  /* ==================================================
     FULL FAN PULSE
  ================================================== */

  return (

    <section className="fan-pulse">

      <div className="fan-pulse__inner">


        {/* ==================================================
            HEADING
        ================================================== */}

        <header className="fan-pulse__heading">

          <p className="fan-pulse__eyebrow">
            FAN PULSE
          </p>


          <h2>

            Leave a little

            <span>
              charm.
            </span>

          </h2>


          <p className="fan-pulse__intro">

            Pick the symbols that feel most like
            Jan and JingJing. Every charm becomes
            part of this little fan-made archive.

          </p>

        </header>


        {/* ==================================================
            TOTAL PULSE
        ================================================== */}

        <div className="fan-pulse__total">

          <span>
            COMMUNITY PULSE
          </span>

          <strong>

            {
              loading
                ? "—"
                : totalPulse.toLocaleString()
            }

          </strong>

          <small>
            CHARMS LEFT SO FAR
          </small>

        </div>


        {/* ==================================================
            GROUPS
        ================================================== */}

        <div className="fan-pulse__groups">

          {fanPulseGroups.map(
            (
              group
            ) => {

              const groupTotal =
                group.id ===
                "jan"
                  ? janTotal
                  : jingJingTotal


              return (

                <article
                  key={
                    group.id
                  }
                  className={
                    `fan-pulse-group fan-pulse-group--${group.id}`
                  }
                >

                  <div className="fan-pulse-group__head">

                    <div>

                      <span>
                        FOR
                      </span>

                      <h3>
                        {
                          group.name
                        }
                      </h3>

                      <p>
                        {
                          group.subtitle
                        }
                      </p>

                    </div>


                    <div className="fan-pulse-group__total">

                      <strong>

                        {
                          loading
                            ? "—"
                            : groupTotal.toLocaleString()
                        }

                      </strong>

                      <span>
                        CHARMS
                      </span>

                    </div>

                  </div>


                  <div className="fan-pulse-group__buttons">

                    {group.reactions.map(
                      (
                        reaction
                      ) => {

                        const hasReacted =
                          reacted.includes(
                            reaction.id
                          )


                        const isSubmitting =
                          submitting ===
                          reaction.id


                        return (

                          <button
                            key={
                              reaction.id
                            }

                            type="button"

                            className={[
                              "fan-pulse-charm",

                              hasReacted
                                ? "is-reacted"
                                : "",

                              isSubmitting
                                ? "is-submitting"
                                : "",
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " "
                              )}

                            aria-label={
                              `${reaction.label}: ${
                                counts[
                                  reaction.id
                                ] || 0
                              } charms`
                            }

                            aria-pressed={
                              hasReacted
                            }

                            disabled={
                              loading ||
                              Boolean(
                                submitting
                              ) ||
                              hasReacted
                            }

                            onClick={() =>
                              handleReaction(
                                reaction.id
                              )
                            }
                          >

                            <span className="fan-pulse-charm__emoji">

                              {
                                reaction.emoji
                              }

                            </span>


                            <span className="fan-pulse-charm__copy">

                              <strong>
                                {
                                  reaction.label
                                }
                              </strong>

                              <small>

                                {
                                  loading
                                    ? "—"
                                    : (
                                        counts[
                                          reaction.id
                                        ] || 0
                                      ).toLocaleString()
                                }

                              </small>

                            </span>


                            {hasReacted && (

                              <span className="fan-pulse-charm__check">
                                ✓
                              </span>

                            )}

                          </button>

                        )

                      }
                    )}

                  </div>

                </article>

              )

            }
          )}

        </div>


        {/* ==================================================
            RESPONSE MESSAGE
        ================================================== */}

        <div
          className={[
            "fan-pulse__response",

            reactionMessage
              ? "is-visible"
              : "",
          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )}
          aria-live="polite"
        >

          {
            reactionMessage ||
            "♡"
          }

        </div>


        {error && (

          <p
            className="fan-pulse__error"
            role="status"
          >
            {
              error
            }
          </p>

        )}


        <footer className="fan-pulse__footer">

          <span>
            JAN
            {" "}
            💜 🦊 🥚
          </span>

          <i>
            ♡
          </i>

          <span>
            🩷 🎀 🐯
            {" "}
            JINGJING
          </span>

        </footer>

      </div>

    </section>

  )

}


export default FanPulse