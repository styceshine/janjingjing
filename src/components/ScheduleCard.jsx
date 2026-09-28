import { Link } from "react-router-dom"

function ScheduleCard({ event }) {
  if (!event) return null

  const eventDate = new Date(
    `${event.date}T00:00:00`
  )

  const month =
    eventDate
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase()

  const day =
    eventDate
      .toLocaleDateString("en-US", {
        day: "2-digit",
      })

  const year =
    eventDate.getFullYear()

  const isTogether =
    event.artists.includes("jan") &&
    event.artists.includes("jingjing")

  const cardClass = isTogether
    ? "schedule-card-together"
    : event.artists.includes("jan")
      ? "schedule-card-jan"
      : "schedule-card-jing"

  return (
    <article
      className={`schedule-card ${cardClass}`}
    >

      {/* DATE */}
      <div className="schedule-card-date">

        <span>{month}</span>

        <strong>
          {day}
        </strong>

        <small>
          {year}
        </small>

      </div>


      {/* INFO */}
      <div className="schedule-card-info">

        <div className="schedule-card-meta">

          <span>
            {isTogether
              ? "JAN × JINGJING"
              : event.artists.includes("jan")
                ? "JAN"
                : "JINGJING"}
          </span>

          <span>
            {event.type}
          </span>

        </div>


        <h3>
          {event.title}
        </h3>


        {event.subtitle && (
          <p className="schedule-card-subtitle">
            {event.subtitle}
          </p>
        )}


        <div className="schedule-card-details">

          {event.time && (
            <span>
              ◷ {event.time}
            </span>
          )}

          {event.location && (
            <span>
              ◇ {event.location}
            </span>
          )}

        </div>


        {event.description && (
          <p className="schedule-card-description">
            {event.description}
          </p>
        )}

      </div>


      {/* ARROW */}
      <Link
        to="/schedule"
        className="schedule-card-arrow"
        aria-label={`View ${event.title}`}
      >
        ↗
      </Link>

    </article>
  )
}

export default ScheduleCard