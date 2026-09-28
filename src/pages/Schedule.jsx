// src/pages/Schedule.jsx

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"


import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


import {
  getEffectiveScheduleStatus,
  mapSupabaseScheduleEvent,
  mergeScheduleEvents,
  scheduleEvents,
  schedulePeopleFilters,
  scheduleTypeLabels,
  sortScheduleEvents,
} from "../data/scheduleData"


import {
  supabase,
} from "../lib/supabase"


import "../styles/pages/Schedule.css"


/* ==================================================
   DATE HELPERS
================================================== */

function makeLocalDate(
  dateString
) {

  return new Date(
    `${dateString}T00:00:00`
  )

}


function getDateParts(
  dateString
) {

  const date =
    makeLocalDate(
      dateString
    )


  return {

    day:
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      ),

    month:
      date
        .toLocaleDateString(
          "en-US",
          {
            month:
              "short",
          }
        )
        .toUpperCase(),

    year:
      date.getFullYear(),

    weekday:
      date
        .toLocaleDateString(
          "en-US",
          {
            weekday:
              "long",
          }
        )
        .toUpperCase(),

  }

}


/* ==================================================
   STORAGE URL
================================================== */

function getSchedulePosterUrl(
  imagePath
) {

  if (
    !imagePath
  ) {

    return ""

  }


  const {
    data,
  } =
    supabase.storage
      .from(
        "schedule"
      )
      .getPublicUrl(
        imagePath
      )


  return (
    data?.publicUrl ||
    ""
  )

}


/* ==================================================
   PAGE
================================================== */

function Schedule() {

  const now =
    new Date()


  /* ==================================================
     SUPABASE EVENTS
  ================================================== */

  const [
    databaseEvents,
    setDatabaseEvents,
  ] =
    useState([])


  const [
    databaseReady,
    setDatabaseReady,
  ] =
    useState(false)


  /*
   * Used so the calendar automatically moves to the
   * real next event once Supabase finishes loading,
   * but only once.
   */

  const syncedDatabaseRef =
    useRef(false)


  useEffect(
    () => {

      let active =
        true


      const loadDatabaseEvents =
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
                .select("*")
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


            const convertedEvents =
              (
                data ||
                []
              ).map(
                (
                  row
                ) => {

                  const posterUrl =
                    getSchedulePosterUrl(
                      row.image_path
                    )


                  return mapSupabaseScheduleEvent(
                    row,
                    posterUrl
                  )

                }
              )


            if (
              active
            ) {

              setDatabaseEvents(
                convertedEvents
              )

            }

          }

          catch (
            error
          ) {

            /*
             * Important:
             *
             * The page does NOT break if Supabase
             * is temporarily unavailable.
             *
             * Existing local scheduleData continues
             * to work as a fallback.
             */

            console.error(
              "Public schedule Supabase error:",
              error
            )

          }

          finally {

            if (
              active
            ) {

              setDatabaseReady(
                true
              )

            }

          }

        }


      loadDatabaseEvents()


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

  const allScheduleEvents =
    useMemo(
      () =>
        mergeScheduleEvents(
          scheduleEvents,
          databaseEvents
        ),
      [
        databaseEvents,
      ]
    )


  /* ==================================================
     FILTER
  ================================================== */

  const [
    personFilter,
    setPersonFilter,
  ] =
    useState(
      "all"
    )


  const filteredEvents =
    useMemo(
      () => {

        if (
          personFilter ===
          "all"
        ) {

          return sortScheduleEvents(
            allScheduleEvents
          )

        }


        return sortScheduleEvents(

          allScheduleEvents.filter(
            (
              event
            ) =>
              event.people.includes(
                personFilter
              )
          )

        )

      },
      [
        personFilter,
        allScheduleEvents,
      ]
    )


  /* ==================================================
     NEXT EVENT

     Cancelled and postponed events are not used as
     the featured "Next Event".
  ================================================== */

  const nextEvent =
    filteredEvents.find(
      (
        event
      ) => {

        const status =
          getEffectiveScheduleStatus(
            event,
            now
          )


        return (
          status ===
            "upcoming" ||
          status ===
            "ongoing"
        )

      }
    ) ||
    null


  /* ==================================================
     INITIAL CALENDAR MONTH
  ================================================== */

  const currentMonthHasEvents =
    filteredEvents.some(
      (
        event
      ) => {

        const date =
          makeLocalDate(
            event.date
          )


        return (
          date.getFullYear() ===
            now.getFullYear() &&
          date.getMonth() ===
            now.getMonth()
        )

      }
    )


  const initialMonth =
    currentMonthHasEvents
      ? now
      : nextEvent
        ? makeLocalDate(
            nextEvent.date
          )
        : now


  const [
    calendarDate,
    setCalendarDate,
  ] =
    useState(
      new Date(
        initialMonth.getFullYear(),
        initialMonth.getMonth(),
        1
      )
    )


  /* ==================================================
     SELECTED DATE
  ================================================== */

  const [
    selectedDate,
    setSelectedDate,
  ] =
    useState(
      nextEvent?.date ||
      null
    )


  /* ==================================================
     SYNC CALENDAR AFTER DATABASE LOAD

     Example:

     Local next event = November
     Supabase next event = October

     After Supabase loads, the calendar moves to
     October automatically.
  ================================================== */

  useEffect(
    () => {

      if (
        !databaseReady ||
        syncedDatabaseRef.current
      ) {

        return

      }


      syncedDatabaseRef.current =
        true


      if (
        !nextEvent
      ) {

        return

      }


      const nextDate =
        makeLocalDate(
          nextEvent.date
        )


      setCalendarDate(
        new Date(
          nextDate.getFullYear(),
          nextDate.getMonth(),
          1
        )
      )


      setSelectedDate(
        nextEvent.date
      )

    },
    [
      databaseReady,
      nextEvent,
    ]
  )


  /* ==================================================
     CALENDAR VALUES
  ================================================== */

  const calendarYear =
    calendarDate.getFullYear()


  const calendarMonth =
    calendarDate.getMonth()


  const daysInMonth =
    new Date(
      calendarYear,
      calendarMonth + 1,
      0
    ).getDate()


  const firstDay =
    new Date(
      calendarYear,
      calendarMonth,
      1
    ).getDay()


  const calendarLabel =
    calendarDate.toLocaleDateString(
      "en-US",
      {
        month:
          "long",

        year:
          "numeric",
      }
    )


  const calendarCells = [

    ...Array(
      firstDay
    ).fill(
      null
    ),

    ...Array.from(
      {
        length:
          daysInMonth,
      },

      (
        _,
        index
      ) =>
        index + 1
    ),

  ]


  /* ==================================================
     MONTH EVENTS
  ================================================== */

  const monthEvents =
    filteredEvents.filter(
      (
        event
      ) => {

        const date =
          makeLocalDate(
            event.date
          )


        return (
          date.getFullYear() ===
            calendarYear &&
          date.getMonth() ===
            calendarMonth
        )

      }
    )


  /* ==================================================
     DATE STRING
  ================================================== */

  const getDateString =
    (
      day
    ) =>
      `${calendarYear}-${String(
        calendarMonth + 1
      ).padStart(
        2,
        "0"
      )}-${String(
        day
      ).padStart(
        2,
        "0"
      )}`


  const eventsForDay =
    (
      day
    ) => {

      const dateString =
        getDateString(
          day
        )


      return monthEvents.filter(
        (
          event
        ) =>
          event.date ===
          dateString
      )

    }


  /* ==================================================
     SELECTED EVENTS
  ================================================== */

  const selectedEvents =
    selectedDate
      ? filteredEvents.filter(
          (
            event
          ) =>
            event.date ===
            selectedDate
        )
      : []


  /* ==================================================
     MONTH NAVIGATION
  ================================================== */

  const changeMonth =
    (
      direction
    ) => {

      const newDate =
        new Date(
          calendarYear,
          calendarMonth +
            direction,
          1
        )


      setCalendarDate(
        newDate
      )


      const firstEvent =
        filteredEvents.find(
          (
            event
          ) => {

            const eventDate =
              makeLocalDate(
                event.date
              )


            return (
              eventDate.getFullYear() ===
                newDate.getFullYear() &&
              eventDate.getMonth() ===
                newDate.getMonth()
            )

          }
        )


      setSelectedDate(
        firstEvent?.date ||
        null
      )

    }


  /* ==================================================
     DAY STATUS
  ================================================== */

  const getDayStatus =
    (
      events
    ) => {

      if (
        events.length ===
        0
      ) {

        return ""

      }


      const statuses =
        events.map(
          (
            event
          ) =>
            getEffectiveScheduleStatus(
              event,
              now
            )
        )


      if (
        statuses.includes(
          "ongoing"
        )
      ) {

        return "ongoing"

      }


      if (
        statuses.includes(
          "upcoming"
        )
      ) {

        return "upcoming"

      }


      if (
        statuses.includes(
          "postponed"
        )
      ) {

        return "postponed"

      }


      if (
        statuses.includes(
          "cancelled"
        )
      ) {

        return "cancelled"

      }


      return "past"

    }


  /* ==================================================
     TODAY
  ================================================== */

  const todayString =
    `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    )}-${String(
      now.getDate()
    ).padStart(
      2,
      "0"
    )}`


  return (

    <>

      <Navbar />


      <main className="schedule-page">


        {/* ==================================================
            00 / NEXT UP
        ================================================== */}

        <section className="schedule-intro">

          <div className="schedule-intro__inner">


            <div className="schedule-intro__meta">

              <span>
                00 / SCHEDULE
              </span>

              <span>
                JANJINGJING
                EVENT CALENDAR
              </span>

            </div>


            <div className="schedule-intro__grid">


              {/* LEFT */}

              <div className="schedule-intro__copy">

                <p className="schedule-eyebrow">
                  NEXT UP
                </p>


                <h1>

                  See them

                  <span>
                    next.
                  </span>

                </h1>


                <p className="schedule-intro__text">

                  Fan meetings,
                  appearances,
                  livestreams and
                  shared schedules —
                  all in one calendar.

                </p>

              </div>


              {/* NEXT EVENT */}

              {nextEvent ? (

                <article className="schedule-featured">

                  <div className="schedule-featured__top">

                    <span>
                      NEXT EVENT
                    </span>

                    <span className="schedule-featured__status">
                      UPCOMING
                    </span>

                  </div>


                  <div className="schedule-featured__body">


                    <div className="schedule-featured__date">

                      <strong>
                        {
                          getDateParts(
                            nextEvent.date
                          ).day
                        }
                      </strong>


                      <div>

                        <span>
                          {
                            getDateParts(
                              nextEvent.date
                            ).month
                          }
                        </span>

                        <small>
                          {
                            getDateParts(
                              nextEvent.date
                            ).year
                          }
                        </small>

                      </div>

                    </div>


                    <div className="schedule-featured__info">

                      <span className="schedule-featured__tag">

                        {
                          nextEvent.tag ||
                          scheduleTypeLabels[
                            nextEvent.type
                          ] ||
                          "EVENT"
                        }

                      </span>


                      <h2>
                        {
                          nextEvent.title
                        }
                      </h2>


                      {nextEvent.subtitle && (

                        <p className="schedule-featured__subtitle">
                          {
                            nextEvent.subtitle
                          }
                        </p>

                      )}


                      <div className="schedule-featured__details">

                        <span>
                          {
                            nextEvent.time
                          }
                        </span>


                        {nextEvent.venue && (

                          <span>
                            {
                              nextEvent.venue
                            }
                          </span>

                        )}


                        {nextEvent.location && (

                          <span>
                            {
                              nextEvent.location
                            }
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                </article>

              ) : (

                <div className="schedule-featured schedule-featured--empty">

                  <span>
                    NO UPCOMING EVENT
                  </span>

                </div>

              )}

            </div>

          </div>

        </section>


        {/* ==================================================
            01 / MARK THE DATE
        ================================================== */}

        <section className="schedule-main">

          <div className="schedule-main__inner">


            {/* HEADER */}

            <div className="schedule-heading">

              <div>

                <p className="schedule-eyebrow">
                  01 / CALENDAR
                </p>


                <h2>

                  Mark the

                  <span>
                    date.
                  </span>

                </h2>

              </div>


              <div className="schedule-heading__month">
                {
                  calendarLabel
                }
              </div>

            </div>


            {/* FILTER */}

            <div className="schedule-filter">

              <span className="schedule-filter__label">
                SHOW
              </span>


              <div className="schedule-filter__buttons">

                {schedulePeopleFilters.map(
                  (
                    person
                  ) => (

                    <button
                      key={
                        person.id
                      }

                      type="button"

                      className={
                        personFilter ===
                        person.id
                          ? "is-active"
                          : ""
                      }

                      onClick={() => {

                        setPersonFilter(
                          person.id
                        )

                        setSelectedDate(
                          null
                        )

                      }}
                    >

                      {person.label}


                      {person.emoji && (

                        <span>
                          {
                            person.emoji
                          }
                        </span>

                      )}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* CALENDAR + DAILY LIST */}

            <div className="schedule-calendar-layout">


              {/* ==================================================
                  CALENDAR
              ================================================== */}

              <div className="schedule-calendar">


                <div className="schedule-calendar__top">

                  <button
                    type="button"

                    onClick={() =>
                      changeMonth(
                        -1
                      )
                    }

                    aria-label="Previous month"
                  >
                    ←
                  </button>


                  <h3>
                    {
                      calendarLabel
                    }
                  </h3>


                  <button
                    type="button"

                    onClick={() =>
                      changeMonth(
                        1
                      )
                    }

                    aria-label="Next month"
                  >
                    →
                  </button>

                </div>


                {/* WEEKDAYS */}

                <div className="schedule-calendar__weekdays">

                  {[
                    "SUN",
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                  ].map(
                    (
                      weekday
                    ) => (

                      <span
                        key={
                          weekday
                        }
                      >
                        {
                          weekday
                        }
                      </span>

                    )
                  )}

                </div>


                {/* DAYS */}

                <div className="schedule-calendar__grid">

                  {calendarCells.map(
                    (
                      day,
                      index
                    ) => {

                      if (
                        day ===
                        null
                      ) {

                        return (

                          <div
                            key={
                              `empty-${index}`
                            }

                            className="schedule-calendar__day schedule-calendar__day--empty"
                          />

                        )

                      }


                      const dateString =
                        getDateString(
                          day
                        )


                      const dayEvents =
                        eventsForDay(
                          day
                        )


                      const dayStatus =
                        getDayStatus(
                          dayEvents
                        )


                      const isSelected =
                        selectedDate ===
                        dateString


                      const isToday =
                        todayString ===
                        dateString


                      return (

                        <button
                          key={
                            dateString
                          }

                          type="button"

                          className={[
                            "schedule-calendar__day",

                            dayEvents.length
                              ? "has-event"
                              : "",

                            dayStatus
                              ? `is-${dayStatus}`
                              : "",

                            isSelected
                              ? "is-selected"
                              : "",

                            isToday
                              ? "is-today"
                              : "",
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              " "
                            )}

                          onClick={() =>
                            setSelectedDate(
                              dateString
                            )
                          }
                        >

                          <span className="schedule-calendar__number">
                            {day}
                          </span>


                          {dayEvents.length >
                            0 && (

                            <div className="schedule-calendar__markers">

                              {dayEvents
                                .slice(
                                  0,
                                  3
                                )
                                .map(
                                  (
                                    event
                                  ) => {

                                    const status =
                                      getEffectiveScheduleStatus(
                                        event,
                                        now
                                      )


                                    return (

                                      <i
                                        key={
                                          event.id
                                        }

                                        className={
                                          `schedule-calendar__marker schedule-calendar__marker--${status}`
                                        }
                                      />

                                    )

                                  }
                                )}

                            </div>

                          )}


                          {dayEvents.length >
                            0 && (

                            <span className="schedule-calendar__count">

                              {
                                dayEvents.length
                              }

                              {
                                dayEvents.length ===
                                1
                                  ? " EVENT"
                                  : " EVENTS"
                              }

                            </span>

                          )}

                        </button>

                      )

                    }
                  )}

                </div>


                {/* LEGEND */}

                <div className="schedule-calendar__legend">

                  <span>

                    <i className="is-upcoming" />

                    UPCOMING

                  </span>


                  <span>

                    <i className="is-past" />

                    PAST

                  </span>


                  <span>

                    <i className="is-today" />

                    TODAY

                  </span>

                </div>

              </div>


              {/* ==================================================
                  SELECTED DATE
              ================================================== */}

              <aside className="schedule-day-panel">


                <div className="schedule-day-panel__head">

                  <span>
                    {
                      selectedDate
                        ? "SELECTED DATE"
                        : "MONTH SCHEDULE"
                    }
                  </span>


                  {selectedDate ? (

                    <>

                      <h3>
                        {
                          getDateParts(
                            selectedDate
                          ).day
                        }
                      </h3>


                      <p>
                        {
                          getDateParts(
                            selectedDate
                          ).weekday
                        }

                        {" · "}

                        {
                          getDateParts(
                            selectedDate
                          ).month
                        }
                      </p>

                    </>

                  ) : (

                    <>

                      <h3>
                        {
                          monthEvents.length
                        }
                      </h3>

                      <p>
                        EVENTS THIS MONTH
                      </p>

                    </>

                  )}

                </div>


                <div className="schedule-day-panel__list">

                  {(selectedDate
                    ? selectedEvents
                    : monthEvents
                  ).length >
                  0 ? (

                    (
                      selectedDate
                        ? selectedEvents
                        : monthEvents
                    ).map(
                      (
                        event
                      ) => {

                        const status =
                          getEffectiveScheduleStatus(
                            event,
                            now
                          )


                        return (

                          <article
                            key={
                              event.id
                            }

                            className={
                              `schedule-mini-event schedule-mini-event--${status}`
                            }
                          >

                            <div className="schedule-mini-event__top">

                              <span>
                                {
                                  event.time
                                }
                              </span>


                              <span
                                className={
                                  `schedule-mini-event__status is-${status}`
                                }
                              >
                                {
                                  status.toUpperCase()
                                }
                              </span>

                            </div>


                            <h4>
                              {
                                event.title
                              }
                            </h4>


                            {event.subtitle && (

                              <p className="schedule-mini-event__subtitle">
                                {
                                  event.subtitle
                                }
                              </p>

                            )}


                            {event.secondaryTime && (

                              <p>
                                {
                                  event.secondaryTime
                                }
                              </p>

                            )}


                            {event.venue && (

                              <p>
                                {
                                  event.venue
                                }
                              </p>

                            )}


                            {event.location && (

                              <p>
                                {
                                  event.location
                                }
                              </p>

                            )}


                            {event.note && (

                              <p className="schedule-mini-event__note">
                                {
                                  event.note
                                }
                              </p>

                            )}

                          </article>

                        )

                      }
                    )

                  ) : (

                    <div className="schedule-day-panel__empty">

                      <span>
                        ♡
                      </span>

                      <p>
                        No schedule
                        for this date.
                      </p>

                    </div>

                  )}

                </div>


                {selectedDate && (

                  <button
                    type="button"

                    className="schedule-day-panel__show-month"

                    onClick={() =>
                      setSelectedDate(
                        null
                      )
                    }
                  >

                    VIEW ALL
                    {
                      " "
                    }
                    {
                      calendarLabel.toUpperCase()
                    }
                    {
                      " "
                    }
                    EVENTS

                  </button>

                )}

              </aside>

            </div>

          </div>

        </section>

      </main>


      <Footer />

    </>

  )

}


export default Schedule