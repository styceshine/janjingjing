import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Link,
} from "react-router-dom"

import scheduleData from "../data/scheduleData"

import {
  supabase,
} from "../lib/supabase"


/* ==================================================
   HELPERS
================================================== */

const normalizePeople =
  (people = []) => {

    if (
      !Array.isArray(
        people
      )
    ) {

      return []

    }


    return people
      .map(
        (person) =>
          String(
            person
          )
            .trim()
            .toLowerCase()
      )
      .filter(Boolean)

  }


const getTheme =
  (event) => {

    const people =
      normalizePeople(
        event.people ||
        event.participants ||
        event.artists
      )


    const hasJan =
      people.includes(
        "jan"
      )


    const hasJing =
      people.includes(
        "jingjing"
      )


    const together =
      people.includes(
        "together"
      ) ||
      (
        hasJan &&
        hasJing
      )


    if (
      together
    ) {

      return "couple"

    }


    if (
      hasJing
    ) {

      return "jing"

    }


    return "jan"

  }


const getPersonLabel =
  (event) => {

    const theme =
      getTheme(
        event
      )


    if (
      theme ===
      "couple"
    ) {

      return "JAN × JINGJING"

    }


    if (
      theme ===
      "jing"
    ) {

      return "JINGJING"

    }


    return "JAN"

  }


const getTypeLabel =
  (event) => {

    if (
      event.tag
    ) {

      return String(
        event.tag
      ).toUpperCase()

    }


    const type =
      event.type ||
      event.category ||
      "event"


    return String(
      type
    )
      .replace(
        /[-_]/g,
        " "
      )
      .toUpperCase()

  }


const getEventStart =
  (event) => {

    const value =
      event.dateTime ||
      event.start_at ||
      event.startAt


    if (
      !value
    ) {

      return null

    }


    const date =
      new Date(
        value
      )


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return null

    }


    return date

  }


const getEventEnd =
  (event) => {

    const value =
      event.endDateTime ||
      event.end_at ||
      event.endAt


    if (
      value
    ) {

      const date =
        new Date(
          value
        )


      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {

        return date

      }

    }


    const start =
      getEventStart(
        event
      )


    if (
      !start
    ) {

      return null

    }


    return new Date(
      start.getTime() +
      2 *
      60 *
      60 *
      1000
    )

  }


const isUpcoming =
  (
    event,
    now = new Date()
  ) => {

    const status =
      String(
        event.databaseStatus ||
        event.status ||
        ""
      ).toLowerCase()


    if (
      status ===
        "cancelled" ||
      status ===
        "postponed"
    ) {

      return false

    }


    const end =
      getEventEnd(
        event
      )


    if (
      !end
    ) {

      return false

    }


    return (
      end >=
      now
    )

  }


const getDateKey =
  (event) => {

    if (
      event.date
    ) {

      return String(
        event.date
      )
    }


    const start =
      getEventStart(
        event
      )


    if (
      !start
    ) {

      return ""
    }


    const year =
      start.getFullYear()


    const month =
      String(
        start.getMonth() +
        1
      ).padStart(
        2,
        "0"
      )


    const day =
      String(
        start.getDate()
      ).padStart(
        2,
        "0"
      )


    return `${year}-${month}-${day}`

  }


const getMergeKey =
  (event) =>
    `${getDateKey(
      event
    )}::${String(
      event.title ||
      ""
    )
      .trim()
      .toLowerCase()}`


const mergeEvents =
  (
    localEvents,
    databaseEvents
  ) => {

    const merged =
      new Map()


    localEvents.forEach(
      (event) => {

        merged.set(
          getMergeKey(
            event
          ),
          event
        )

      }
    )


    /*
     * Database events are added second.
     * If the same event exists locally and
     * in Supabase, Supabase wins.
     */

    databaseEvents.forEach(
      (event) => {

        merged.set(
          getMergeKey(
            event
          ),
          event
        )

      }
    )


    return Array.from(
      merged.values()
    )

  }


const formatShortDate =
  (event) => {

    const date =
      getEventStart(
        event
      )


    if (
      !date
    ) {

      return "TBA"

    }


    return date
      .toLocaleDateString(
        "en-US",
        {
          month:
            "short",

          day:
            "2-digit",
        }
      )
      .toUpperCase()

  }


const formatMonth =
  (event) => {

    const date =
      getEventStart(
        event
      )


    if (
      !date
    ) {

      return "UPCOMING"

    }


    return date
      .toLocaleDateString(
        "en-US",
        {
          month:
            "long",
        }
      )
      .toUpperCase()

  }


const formatYear =
  (event) => {

    const date =
      getEventStart(
        event
      )


    return date
      ? date.getFullYear()
      : ""

  }


const formatDayNumber =
  (event) => {

    const date =
      getEventStart(
        event
      )


    return date
      ? String(
          date.getDate()
        ).padStart(
          2,
          "0"
        )
      : "—"

  }


const formatWeekday =
  (event) => {

    const date =
      getEventStart(
        event
      )


    if (
      !date
    ) {

      return "TBA"

    }


    return date
      .toLocaleDateString(
        "en-US",
        {
          weekday:
            "short",
        }
      )
      .toUpperCase()

  }


const getEventLocation =
  (event) => {

    const venue =
      event.venue ||
      ""


    const location =
      event.location ||
      [
        event.city,
        event.country,
      ]
        .filter(Boolean)
        .join(", ")


    if (
      venue &&
      location
    ) {

      return `${venue} • ${location}`

    }


    return (
      venue ||
      location ||
      event.time ||
      "Details TBA"
    )

  }


const getUpdateText =
  (event) => {

    if (
      event.description
    ) {

      return event.description

    }


    const location =
      getEventLocation(
        event
      )


    const time =
      event.time


    if (
      time &&
      location
    ) {

      return `${time} • ${location}`

    }


    return (
      location ||
      "See the full schedule for details."
    )

  }


/* ==================================================
   SUPABASE ROW → SCHEDULE EVENT
================================================== */

const mapDatabaseEvent =
  (row) => {

    return {

      id:
        `supabase-${row.id}`,

      databaseId:
        row.id,

      title:
        row.title,

      description:
        row.description ||
        "",

      type:
        row.type ||
        "event",

      dateTime:
        row.start_at,

      endDateTime:
        row.end_at ||
        null,

      venue:
        row.venue ||
        "",

      location:
        [
          row.city,
          row.country,
        ]
          .filter(Boolean)
          .join(", "),

      people:
        normalizePeople(
          row.participants
        ),

      participants:
        normalizePeople(
          row.participants
        ),

      databaseStatus:
        row.status ||
        "scheduled",

      isPublished:
        row.is_published,

      sourceUrl:
        row.source_url ||
        null,

    }

  }


/* ==================================================
   COMPONENT
================================================== */

function UpdatesSchedule() {

  const [
    databaseEvents,
    setDatabaseEvents,
  ] =
    useState([])


  const [
    loading,
    setLoading,
  ] =
    useState(true)



  /* ==================================================
     LOAD PUBLISHED SUPABASE EVENTS
  ================================================== */

  useEffect(
    () => {

      let active =
        true


      const loadEvents =
        async () => {

          try {

            const {
              data,
              error,
            } =
              await supabase
                .from(
                  "events"
                )
                .select(
                  "*"
                )
                .eq(
                  "is_published",
                  true
                )
                .order(
                  "start_at",
                  {
                    ascending:
                      true,
                  }
                )


            if (
              error
            ) {

              throw error

            }


            if (
              active
            ) {

              setDatabaseEvents(
                (
                  data ||
                  []
                ).map(
                  mapDatabaseEvent
                )
              )

            }

          }

          catch (
            error
          ) {

            console.error(
              "Home schedule load error:",
              error
            )

          }

          finally {

            if (
              active
            ) {

              setLoading(
                false
              )

            }

          }

        }


      loadEvents()


      return () => {

        active =
          false

      }

    },
    []
  )



  /* ==================================================
     MERGE LOCAL + DATABASE
  ================================================== */

  const upcomingEvents =
    useMemo(
      () => {

        const merged =
          mergeEvents(
            scheduleData,
            databaseEvents
          )


        return merged
          .filter(
            (event) =>
              isUpcoming(
                event
              )
          )
          .sort(
            (a, b) =>
              getEventStart(
                a
              ) -
              getEventStart(
                b
              )
          )

      },
      [
        databaseEvents,
      ]
    )


  /* ==================================================
     HOME PREVIEW
  ================================================== */

  const latestUpdates =
    upcomingEvents.slice(
      0,
      3
    )


  const nextEvent =
    upcomingEvents[0] ||
    null


  /*
   * The paper calendar shows events from the
   * same month as the next upcoming event.
   */

  const paperEvents =
    useMemo(
      () => {

        if (
          !nextEvent
        ) {

          return []

        }


        const nextDate =
          getEventStart(
            nextEvent
          )


        if (
          !nextDate
        ) {

          return []

        }


        return upcomingEvents
          .filter(
            (event) => {

              const date =
                getEventStart(
                  event
                )


              return (
                date &&
                date.getFullYear() ===
                  nextDate.getFullYear() &&
                date.getMonth() ===
                  nextDate.getMonth()
              )

            }
          )
          .slice(
            0,
            4
          )

      },
      [
        nextEvent,
        upcomingEvents,
      ]
    )


  return (

    <section className="updates-section">

      {/* ==================================================
          HEADING
      ================================================== */}

      <div className="updates-heading">

        <p className="updates-kicker">
          05 / LATEST & UPCOMING
        </p>


        <h2>
          What’s happening
          <br />

          <em>
            next.
          </em>
        </h2>


        <p className="updates-note">
          schedules, appearances, and little things to
          look forward to ♡
        </p>

      </div>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="updates-layout">


        {/* ==================================================
            LATEST UPDATES
        ================================================== */}

        <div className="updates-list-side">

          <div className="updates-subheading">

            <span>
              Latest Updates
            </span>

            <p>
              what’s next in their world
            </p>

          </div>


          <div className="updates-list">

            {latestUpdates.length >
            0 ? (

              latestUpdates.map(
                (event) => {

                  const theme =
                    getTheme(
                      event
                    )


                  return (

                    <Link
                      key={
                        event.id
                      }
                      to="/schedule"
                      className={
                        `update-card update-card-${theme}`
                      }
                    >

                      <div className="update-date">
                        {
                          formatShortDate(
                            event
                          )
                        }
                      </div>


                      <div className="update-content">

                        <span className="update-type">
                          {
                            getPersonLabel(
                              event
                            )
                          }
                          {" · "}
                          {
                            getTypeLabel(
                              event
                            )
                          }
                        </span>


                        <h3>
                          {
                            event.title
                          }
                        </h3>


                        <p>
                          {
                            getUpdateText(
                              event
                            )
                          }
                        </p>

                      </div>


                      <span
                        className="update-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>

                    </Link>

                  )

                }
              )

            ) : (

              <div className="update-card update-card-couple">

                <div className="update-content">

                  <span className="update-type">
                    SCHEDULE
                  </span>


                  <h3>
                    No upcoming events yet ♡
                  </h3>


                  <p>
                    New published schedules will appear
                    here automatically.
                  </p>

                </div>

              </div>

            )}

          </div>


          <Link
            to="/schedule"
            className="updates-link"
          >
            View Full Schedule

            <span>
              →
            </span>
          </Link>

        </div>



        {/* ==================================================
            SCHEDULE PAPER
        ================================================== */}

        <div className="schedule-preview">

          <div className="schedule-paper">

            <div className="schedule-top">

              <span>
                {
                  nextEvent
                    ? formatMonth(
                        nextEvent
                      )
                    : "UPCOMING"
                }
              </span>


              <strong>
                {
                  nextEvent
                    ? formatYear(
                        nextEvent
                      )
                    : ""
                }
              </strong>

            </div>


            <div className="schedule-days">

              {paperEvents.length >
              0 ? (

                paperEvents.map(
                  (event) => {

                    const theme =
                      getTheme(
                        event
                      )


                    return (

                      <div
                        key={
                          event.id
                        }
                        className={
                          `schedule-item schedule-item-${theme}`
                        }
                      >

                        <div className="schedule-day">

                          <strong>
                            {
                              formatDayNumber(
                                event
                              )
                            }
                          </strong>


                          <span>
                            {
                              formatWeekday(
                                event
                              )
                            }
                          </span>

                        </div>


                        <div>

                          <p>
                            {
                              getPersonLabel(
                                event
                              )
                            }
                            {" · "}
                            {
                              getTypeLabel(
                                event
                              )
                            }
                          </p>


                          <h4>
                            {
                              event.title
                            }
                          </h4>


                          <span>
                            {
                              getEventLocation(
                                event
                              )
                            }
                          </span>

                        </div>

                      </div>

                    )

                  }
                )

              ) : (

                <div className="schedule-item">

                  <div className="schedule-day">

                    <strong>
                      —
                    </strong>

                    <span>
                      TBA
                    </span>

                  </div>


                  <div>

                    <p>
                      SCHEDULE
                    </p>


                    <h4>
                      No upcoming events
                    </h4>


                    <span>
                      Check back soon ♡
                    </span>

                  </div>

                </div>

              )}

            </div>


            <span className="schedule-note">
              keep an eye on what’s next ♡
            </span>

          </div>


          <Link
            to="/schedule"
            className="schedule-button"
          >
            View Full Schedule

            <span>
              →
            </span>
          </Link>

        </div>

      </div>


      {/* ==================================================
          DIVIDER
      ================================================== */}

      <div className="updates-divider">

        <span />

        <p>
          little moments worth waiting for ♡
        </p>

        <span />

      </div>

    </section>

  )

}


export default UpdatesSchedule