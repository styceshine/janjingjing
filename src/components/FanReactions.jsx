import {
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  supabase,
} from "../lib/supabase"

import "../styles/components/FanReactions.css"


/* ==================================================
   REACTIONS
================================================== */

const reactionOptions = [
  {
    id: "purple_heart",
    emoji: "💜",
    label: "Love",
  },

  
  {
    id: "pink_heart",
    emoji: "🩷",
    label: "Heart",
  },

  {
    id: "fox",
    emoji: "🦊",
    label: "Fox",
  },

  {
    id: "tiger",
    emoji: "🐯",
    label: "Tiger",
  },

  {
    id: "ribbon",
    emoji: "🎀",
    label: "Ribbon",
  },

  {
    id: "egg",
    emoji: "🥚",
    label: "Cool",
  },

]


/* ==================================================
   EMPTY COUNTS
================================================== */

const createEmptyCounts =
  () => ({
    purple_heart: 0,
    pink_heart: 0,
    fox: 0,
    tiger: 0,
    ribbon: 0,
    egg: 0,
  })


/* ==================================================
   LOCAL STORAGE KEY
================================================== */

function getStorageKey(
  targetType,
  targetId,
  reaction
) {

  return (
    `janjingjing-reaction:` +
    `${targetType}:` +
    `${targetId}:` +
    `${reaction}`
  )

}


/* ==================================================
   FAN REACTIONS
================================================== */

function FanReactions({
  targetType,
  targetId,
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


  /* ==================================================
     READ LOCAL REACTION STATE
  ================================================== */

  const loadLocalReactionState =
    useCallback(
      () => {

        const saved =
          reactionOptions
            .filter(
              (
                reaction
              ) => {

                const key =
                  getStorageKey(
                    targetType,
                    targetId,
                    reaction.id
                  )


                return (
                  localStorage.getItem(
                    key
                  ) ===
                  "true"
                )

              }
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
      [
        targetType,
        targetId,
      ]
    )


  /* ==================================================
     LOAD COUNTS
  ================================================== */

  const loadCounts =
    useCallback(
      async () => {

        if (
          !targetType ||
          !targetId
        ) {

          return

        }


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
            "Fan reaction load error:",
            loadError
          )

          setError(
            "Unable to load reactions."
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
              Object.prototype.hasOwnProperty.call(
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
      [
        targetType,
        targetId,
      ]
    )


  /* ==================================================
     INITIAL LOAD
  ================================================== */

  useEffect(
    () => {

      loadCounts()

      loadLocalReactionState()

    },
    [
      loadCounts,
      loadLocalReactionState,
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


      /*
       * Optimistic update.
       *
       * The UI responds instantly while Supabase
       * processes the RPC request.
       */

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


        /*
         * The RPC returns the current database count.
         * If Supabase gives us a usable number,
         * sync the UI to that authoritative value.
         */

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


        const storageKey =
          getStorageKey(
            targetType,
            targetId,
            reactionId
          )


        localStorage.setItem(
          storageKey,
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

      }

      catch (
        reactionError
      ) {

        console.error(
          "Fan reaction error:",
          reactionError
        )


        /*
         * Roll back optimistic count.
         */

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
          "Reaction could not be saved."
        )

      }

      finally {

        setSubmitting(
          ""
        )

      }

    }


  /* ==================================================
     INVALID TARGET
  ================================================== */

  if (
    !targetType ||
    !targetId
  ) {

    return null

  }


  /* ==================================================
     PAGE
  ================================================== */

  return (

    <div
      className={[
        "fan-reactions",

        compact
          ? "fan-reactions--compact"
          : "",
      ]
        .filter(
          Boolean
        )
        .join(
          " "
        )}
    >

      <div className="fan-reactions__top">

        <span>
          FAN REACTIONS
        </span>

        {!compact && (

          <small>
            TAP TO REACT ♡
          </small>

        )}

      </div>


      <div className="fan-reactions__buttons">

        {reactionOptions.map(
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
                  } reactions`
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

                <span className="fan-reactions__emoji">
                  {
                    reaction.emoji
                  }
                </span>


                <span className="fan-reactions__count">

                  {
                    loading
                      ? "—"
                      : (
                          counts[
                            reaction.id
                          ] || 0
                        ).toLocaleString()
                  }

                </span>

              </button>

            )

          }
        )}

      </div>


      {error && (

        <p
          className="fan-reactions__error"
          role="status"
        >
          {error}
        </p>

      )}

    </div>

  )

}


export default FanReactions