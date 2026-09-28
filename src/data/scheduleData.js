// src/data/scheduleData.js


/* ==================================================
   PEOPLE FILTERS
================================================== */

export const schedulePeopleFilters = [
  {
    id: "all",
    label: "ALL",
  },

  {
    id: "jan",
    label: "JAN",
    emoji: "💜",
  },

  {
    id: "jingjing",
    label: "JINGJING",
    emoji: "🎀",
  },

  {
    id: "together",
    label: "TOGETHER",
    emoji: "♡",
  },
]


/* ==================================================
   TYPE LABELS
================================================== */

export const scheduleTypeLabels = {
  event: "EVENT",
  awards: "AWARDS",
  fanmeeting: "FAN MEETING",
  fancon: "FANCON",
  live: "LIVE",
  press: "PRESS",
  appearance: "APPEARANCE",
  fashion: "FASHION",
  tv: "TV",
}


/* ==================================================
   SEPTEMBER 2026 SCHEDULE
================================================== */

export const scheduleEvents = [

  /* ==================================================
     SEPTEMBER 02
  ================================================== */

  {
    id: "miss-dior-popup",

    date: "2026-09-02",

    dateTime:
      "2026-09-02T16:00:00+07:00",

    time:
      "4:00 PM",

    timezone:
      "ICT",

    title:
      "Miss Dior Pop-up",

    people: [
      "jan",
    ],

    type:
      "event",

    venue:
      "Hall of Fame, M Floor",

    location:
      "Siam Paragon",

    tag:
      "EVENT",
  },


  /* ==================================================
     SEPTEMBER 03
  ================================================== */

  {
    id: "y-entertain-awards-2026",

    date: "2026-09-03",

    dateTime:
      "2026-09-03T16:00:00+07:00",

    time:
      "4:00 PM",

    timezone:
      "ICT",

    title:
      "Y Entertain Awards 2026",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "awards",

    venue:
      "ICONSIAM Hall, 7th Floor",

    location:
      "ICONSIAM",

    tag:
      "AWARDS",
  },


  /* ==================================================
     SEPTEMBER 04
  ================================================== */

  {
    id: "mizumi-pool-party",

    date: "2026-09-04",

    dateTime:
      "2026-09-04T16:00:00+07:00",

    time:
      "4:00 PM",

    timezone:
      "ICT",

    title:
      "MizuMi Pool Party with JanJingJing",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "event",

    venue:
      "",

    location:
      "",

    tag:
      "PRIVATE",

    note:
      "Private event — invited guests only.",
  },


  /* ==================================================
     SEPTEMBER 06
  ================================================== */

  {
    id: "ewb-fanmeeting-taipei",

    date: "2026-09-06",

    dateTime:
      "2026-09-06T15:30:00+08:00",

    time:
      "3:30 PM Taiwan",

    secondaryTime:
      "2:30 PM Bangkok",

    timezone:
      "Taiwan Time",

    title:
      "Enemies With Benefits 1st Fan Meeting in Taipei",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "fanmeeting",

    venue:
      "Zepp New Taipei",

    location:
      "New Taipei, Taiwan",

    tag:
      "FAN MEETING",
  },


  /* ==================================================
     SEPTEMBER 08
  ================================================== */

  {
    id: "bbb-love-at-first-blink",

    date: "2026-09-08",

    dateTime:
      "2026-09-08T20:00:00+07:00",

    time:
      "8:00 PM",

    timezone:
      "ICT",

    title:
      "BBB Love at First Blink with JanJingJing",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "live",

    venue:
      "BABYBRIGHT.SKIN",

    location:
      "TikTok Live",

    tag:
      "LIVE",
  },


  /* ==================================================
     SEPTEMBER 12
  ================================================== */

  {
    id: "mchoice-mint-awards-2026",

    date: "2026-09-12",

    dateTime:
      "2026-09-12T12:00:00+07:00",

    time:
      "12:00 PM",

    secondaryTime:
      "5:00 PM Red Carpet · 6:30 PM Show",

    timezone:
      "ICT",

    title:
      "Mchoice & Mint Awards 2026",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "awards",

    venue:
      "ICONSIAM Hall",

    location:
      "ICONSIAM",

    tag:
      "AWARDS",

    note:
      "12:00 PM Samsung Special Stage with Jan × JingJing. Market Celebrity Visit around 2:30–2:45 PM. Mchoice TH livestream starts at 5:00 PM.",
  },


  /* ==================================================
     SEPTEMBER 13
  ================================================== */

  {
    id: "central-korat-celebrate-the-moment",

    date: "2026-09-13",

    dateTime:
      "2026-09-13T16:00:00+07:00",

    time:
      "4:00 PM",

    timezone:
      "ICT",

    title:
      "Central Korat Celebrate The Moment",

    people: [
      "jingjing",
    ],

    type:
      "event",

    venue:
      "1st Floor",

    location:
      "Central Korat",

    tag:
      "EVENT",
  },


  /* ==================================================
     SEPTEMBER 14
  ================================================== */

  {
    id: "bewitch-you-press-tour",

    date: "2026-09-14",

    dateTime:
      "2026-09-14T11:30:00+07:00",

    time:
      "11:30 AM onwards",

    timezone:
      "ICT",

    title:
      "JAN JINGJING BEWITCH YOU Fancon Press Tour",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "press",

    venue:
      "",

    location:
      "",

    tag:
      "PRESS",
  },


  /* ==================================================
     SEPTEMBER 15
  ================================================== */

  {
    id: "sail-through-skin",

    date: "2026-09-15",

    dateTime:
      "2026-09-15T20:00:00+07:00",

    time:
      "8:00 PM",

    timezone:
      "ICT",

    title:
      "Sail Through Skin",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "live",

    venue:
      "sts.sailthroughskin",

    location:
      "TikTok Live",

    tag:
      "LIVE",
  },


  /* ==================================================
     SEPTEMBER 17 — JAN
  ================================================== */

  {
    id: "gentlewoman-gigi-and-friends",

    date: "2026-09-17",

    dateTime:
      "2026-09-17T14:00:00+07:00",

    time:
      "2:00 PM",

    timezone:
      "ICT",

    title:
      "GENTLEWOMAN: GiGi and Friends",

    people: [
      "jan",
    ],

    type:
      "event",

    venue:
      "SOU(L) SONGWAT",

    location:
      "Bangkok",

    tag:
      "EVENT",
  },


  /* ==================================================
     SEPTEMBER 17 — JINGJING
  ================================================== */

  {
    id: "tumi-press-event-fw26",

    date: "2026-09-17",

    dateTime:
      "2026-09-17T15:00:00+07:00",

    time:
      "3:00 PM",

    timezone:
      "ICT",

    title:
      "TUMI Press Event FW26",

    people: [
      "jingjing",
    ],

    type:
      "press",

    venue:
      "TUMI Store",

    location:
      "Central Park",

    tag:
      "PRESS",
  },


  /* ==================================================
     SEPTEMBER 19
  ================================================== */

  {
    id: "infinity-medical-clinic",

    date: "2026-09-19",

    dateTime:
      "2026-09-19T17:00:00+07:00",

    time:
      "5:00 PM",

    timezone:
      "ICT",

    title:
      "Infinity Medical Clinic",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "event",

    venue:
      "1st Floor",

    location:
      "The Mall Lifestore Bangkapi",

    tag:
      "EVENT",
  },


  /* ==================================================
     SEPTEMBER 21 — YOYO
  ================================================== */

  {
    id: "yoyo-x-janjingjing",

    date: "2026-09-21",

    dateTime:
      "2026-09-21T19:00:00+07:00",

    time:
      "7:00 PM",

    timezone:
      "ICT",

    title:
      "YOYO × JanJingJing",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "live",

    venue:
      "YOYO旗舰店",

    location:
      "Weidian Live",

    tag:
      "LIVE",
  },


  /* ==================================================
     SEPTEMBER 21 — WORKPOINT
  ================================================== */

  {
    id: "workpoint-program-21",

    date: "2026-09-21",

    dateTime:
      "2026-09-21T19:00:00+07:00",

    time:
      "7:00 PM",

    timezone:
      "ICT",

    title:
      "Workpoint23 Program",

    people: [
      "jan",
    ],

    type:
      "tv",

    venue:
      "Workpoint23",

    location:
      "Thailand",

    tag:
      "TV",
  },


  /* ==================================================
     SEPTEMBER 22 — WORKPOINT
  ================================================== */

  {
    id: "workpoint-program-22",

    date: "2026-09-22",

    dateTime:
      "2026-09-22T19:00:00+07:00",

    time:
      "7:00 PM",

    timezone:
      "ICT",

    title:
      "Workpoint23 Program",

    people: [
      "jan",
    ],

    type:
      "tv",

    venue:
      "Workpoint23",

    location:
      "Thailand",

    tag:
      "TV",
  },


  /* ==================================================
     SEPTEMBER 22 — ELLE
  ================================================== */

  {
    id: "elle-fashion-week-2026",

    date: "2026-09-22",

    dateTime:
      "2026-09-22T15:30:00+07:00",

    time:
      "3:30 PM",

    timezone:
      "ICT",

    title:
      "ELLE Fashion Week 2026",

    people: [
      "jingjing",
    ],

    type:
      "fashion",

    venue:
      "River Park",

    location:
      "ICONSIAM",

    tag:
      "FASHION",
  },


  /* ==================================================
     SEPTEMBER 22 — GMMTV LIVE HOUSE
  ================================================== */

  {
    id: "gmmtv-live-house",

    date: "2026-09-22",

    dateTime:
      "2026-09-22T21:30:00+07:00",

    time:
      "9:30 PM",

    timezone:
      "ICT",

    title:
      "GMMTV Live House",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "live",

    venue:
      "GMMTV OFFICIAL",

    location:
      "YouTube Live",

    tag:
      "LIVE",
  },


  /* ==================================================
     SEPTEMBER 23
  ================================================== */

  {
    id: "powercell-exo-center",

    date: "2026-09-23",

    dateTime:
      "2026-09-23T10:00:00+07:00",

    time:
      "10:00 AM",

    timezone:
      "ICT",

    title:
      "Powercell [EXO] Center",

    people: [
      "jingjing",
    ],

    type:
      "event",

    venue:
      "",

    location:
      "",

    tag:
      "PRIVATE",

    note:
      "Private event — invited guests only.",
  },


  /* ==================================================
     SEPTEMBER 25
  ================================================== */

  {
    id: "eat-by-pepsi",

    date: "2026-09-25",

    dateTime:
      "2026-09-25T18:00:00+07:00",

    time:
      "6:00 PM",

    timezone:
      "ICT",

    title:
      "3 เกลอชวน EAT BY เป๊ปซี่มิตรชวนกิน",

    people: [
      "jan",
    ],

    type:
      "live",

    venue:
      "GMMTV OFFICIAL",

    location:
      "YouTube",

    tag:
      "LIVE",
  },


  /* ==================================================
     SEPTEMBER 26
  ================================================== */

  {
    id: "gmmtv-fanday-35-vietnam",

    date: "2026-09-26",

    dateTime:
      "2026-09-26T20:00:00+07:00",

    time:
      "8:00 PM",

    timezone:
      "ICT",

    title:
      "GMMTV FANDAY 35 IN HO CHI MINH CITY, VIETNAM",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "fanmeeting",

    venue:
      "Nguyen Du Gymnasium",

    location:
      "Ho Chi Minh City, Vietnam",

    tag:
      "FAN EVENT",
  },


  /* ==================================================
     NOVEMBER 21
  ================================================== */

  {
    id: "bewitch-you-day-1",

    date: "2026-11-21",

    dateTime:
      "2026-11-21T17:00:00+07:00",

    time:
      "5:00 PM",

    timezone:
      "ICT",

    title:
      "JAN JINGJING 'BEWITCH YOU' FANCON",

    subtitle:
      "DAY 1",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "fancon",

    venue:
      "Thunder Dome",

    location:
      "Muang Thong Thani, Thailand",

    tag:
      "FANCON",

    image:
      "/images/couple/JJJBY.jpg",
  },


  /* ==================================================
     NOVEMBER 22
  ================================================== */

  {
    id: "bewitch-you-day-2",

    date: "2026-11-22",

    dateTime:
      "2026-11-22T17:00:00+07:00",

    time:
      "5:00 PM",

    timezone:
      "ICT",

    title:
      "JAN JINGJING 'BEWITCH YOU' FANCON",

    subtitle:
      "DAY 2",

    people: [
      "jan",
      "jingjing",
      "together",
    ],

    type:
      "fancon",

    venue:
      "Thunder Dome",

    location:
      "Muang Thong Thani, Thailand",

    tag:
      "FANCON",

    image:
      "/images/couple/JJJBY.jpg",
  },

]


/* ==================================================
   EVENT STATUS
================================================== */

export function getScheduleStatus(
  event,
  now = new Date()
) {

  const start =
    new Date(
      event.dateTime
    )


  const end =
    event.endDateTime
      ? new Date(
          event.endDateTime
        )
      : new Date(
          start.getTime() +
          2 * 60 * 60 * 1000
        )


  if (
    now < start
  ) {

    return "upcoming"
  }


  if (
    now >= start &&
    now <= end
  ) {

    return "ongoing"
  }


  return "past"
}


/* ==================================================
   SORT
================================================== */

export function sortScheduleEvents(
  events
) {

  return [...events].sort(
    (a, b) =>
      new Date(
        a.dateTime
      ) -
      new Date(
        b.dateTime
      )
  )
}


/* ==================================================
   UPCOMING
================================================== */

export function getUpcomingEvents(
  events = scheduleEvents,
  now = new Date()
) {

  return sortScheduleEvents(
    events.filter(
      (event) =>
        getScheduleStatus(
          event,
          now
        ) !== "past"
    )
  )
}


/* ==================================================
   NEXT EVENT
================================================== */

export function getNextEvent(
  events = scheduleEvents,
  now = new Date()
) {

  return (
    getUpcomingEvents(
      events,
      now
    )[0] ||
    null
  )
}






/* ==================================================
   SUPABASE EVENT SUPPORT
================================================== */


/* ==================================================
   NORMALIZE EVENT TYPE

   Admin form values may be:
   FAN MEETING
   fanmeeting
   Fan Meeting
   etc.

   Convert them into the keys already used by
   scheduleTypeLabels.
================================================== */

export function normalizeScheduleType(
  value
) {

  const normalized =
    String(
      value ||
      "event"
    )
      .trim()
      .toLowerCase()
      .replace(
        /[_-]+/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )


  const aliases = {

    event:
      "event",

    award:
      "awards",

    awards:
      "awards",

    "fan meeting":
      "fanmeeting",

    fanmeeting:
      "fanmeeting",

    "fan meet":
      "fanmeeting",

    "fan con":
      "fancon",

    fancon:
      "fancon",

    live:
      "live",

    livestream:
      "live",

    "live stream":
      "live",

    press:
      "press",

    appearance:
      "appearance",

    fashion:
      "fashion",

    tv:
      "tv",

  }


  return (
    aliases[
      normalized
    ] ||
    "event"
  )

}


/* ==================================================
   NORMALIZE PARTICIPANTS
================================================== */

function normalizeSupabaseParticipants(
  participants = []
) {

  const normalized =
    participants
      .map(
        (
          person
        ) =>
          String(
            person
          )
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]/g,
              ""
            )
      )
      .filter(
        Boolean
      )


  /*
   * Existing site filtering expects:
   *
   * jan
   * jingjing
   * together
   */

  if (
    normalized.includes(
      "jan"
    ) &&
    normalized.includes(
      "jingjing"
    ) &&
    !normalized.includes(
      "together"
    )
  ) {

    normalized.push(
      "together"
    )

  }


  return [
    ...new Set(
      normalized
    ),
  ]

}


/* ==================================================
   DATABASE DATE
================================================== */

function getDatabaseDate(
  dateTime
) {

  const date =
    new Date(
      dateTime
    )


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return ""

  }


  return (
    `${date.getFullYear()}-${String(
      date.getMonth() +
      1
    ).padStart(
      2,
      "0"
    )}-${String(
      date.getDate()
    ).padStart(
      2,
      "0"
    )}`
  )

}


/* ==================================================
   DATABASE TIME
================================================== */

function getDatabaseTime(
  dateTime
) {

  const date =
    new Date(
      dateTime
    )


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return ""
  }


  return date.toLocaleTimeString(
    "en-US",
    {
      hour:
        "numeric",

      minute:
        "2-digit",
    }
  )

}


/* ==================================================
   CONVERT SUPABASE ROW

   Turns:

   public.events

   into the same object structure used by the
   existing local scheduleData.js.
================================================== */

export function mapSupabaseScheduleEvent(
  row,
  posterUrl = ""
) {

  const rawType =
    String(
      row?.type ||
      "event"
    ).trim()


  const type =
    normalizeScheduleType(
      rawType
    )


  const people =
    normalizeSupabaseParticipants(
      Array.isArray(
        row?.participants
      )
        ? row.participants
        : []
    )


  const databaseStatus =
    String(
      row?.status ||
      "scheduled"
    )
      .trim()
      .toLowerCase()


  const description =
    String(
      row?.description ||
      ""
    ).trim()


  const statusNote =
    databaseStatus ===
    "cancelled"

      ? "This event has been cancelled."

      : databaseStatus ===
        "postponed"

        ? "This event has been postponed."

        : ""


  const note =
    [
      statusNote,
      description,
    ]
      .filter(
        Boolean
      )
      .join(
        " "
      )


  const location =
    [
      row?.city,
      row?.country,
    ]
      .filter(
        Boolean
      )
      .join(
        ", "
      )


  /* ==================================================
     BASE EVENT

     New schedule structure
  ================================================== */

  const event = {

    id:
      `supabase-${row.id}`,

    databaseId:
      row.id,

    source:
      "supabase",


    /* DATE */

    date:
      getDatabaseDate(
        row.start_at
      ),

    dateTime:
      row.start_at,

    endDateTime:
      row.end_at ||
      null,

    time:
      getDatabaseTime(
        row.start_at
      ),

    secondaryTime:
      "",

    timezone:
      "",


    /* CONTENT */

    title:
      row.title ||
      "Untitled Event",

    subtitle:
      "",

    description,

    people,

    type,

    tag:
      rawType
        ? rawType.toUpperCase()
        : (
            scheduleTypeLabels[
              type
            ] ||
            "EVENT"
          ),


    /* LOCATION */

    venue:
      row.venue ||
      "",

    location,


    /* EXTRA */

    note,

    officialUrl:
      row.source_url ||
      null,

    sourceUrl:
      row.source_url ||
      null,

    link:
      row.source_url ||
      null,

    image:
      posterUrl ||
      "",

    imagePath:
      row.image_path ||
      "",


    /* DATABASE */

    databaseStatus,

    isPublished:
      Boolean(
        row.is_published
      ),

  }


  /* ==================================================
     BACKWARD COMPATIBILITY

     ScheduleCard and older dashboard code can still
     safely use the old names.
  ================================================== */

  return {

    ...event,

    artists:
      people,

    category:
      type,

    status:
      databaseStatus ===
      "cancelled"

        ? "cancelled"

        : databaseStatus ===
          "postponed"

          ? "postponed"

          : getScheduleStatus(
              event
            ),

  }

}


/* ==================================================
   EFFECTIVE STATUS

   Local events:
   upcoming / ongoing / past

   Supabase events can additionally be:
   cancelled / postponed
================================================== */

export function getEffectiveScheduleStatus(
  event,
  now = new Date()
) {

  if (
    event.databaseStatus ===
    "cancelled"
  ) {

    return "cancelled"

  }


  if (
    event.databaseStatus ===
    "postponed"
  ) {

    return "postponed"

  }


  return getScheduleStatus(
    event,
    now
  )

}


/* ==================================================
   MERGE LOCAL + SUPABASE

   Local events stay available.

   If a Supabase event has the same DATE + TITLE
   as a local event, the Supabase version wins.

   This allows us to gradually migrate old local
   events into the admin without showing duplicates.
================================================== */

export function mergeScheduleEvents(
  localEvents = [],
  databaseEvents = []
) {

  const eventMap =
    new Map()


  const makeKey =
    (
      event
    ) => {

      const title =
        String(
          event.title ||
          ""
        )
          .trim()
          .toLowerCase()


      return (
        `${event.date || ""}::${title}`
      )

    }


  localEvents.forEach(
    (
      event
    ) => {

      eventMap.set(
        makeKey(
          event
        ),
        event
      )

    }
  )


  /*
   * Database events are added second,
   * so they replace matching local events.
   */

  databaseEvents.forEach(
    (
      event
    ) => {

      eventMap.set(
        makeKey(
          event
        ),
        event
      )

    }
  )


  return sortScheduleEvents(
    Array.from(
      eventMap.values()
    )
  )

}








/* ==================================================
   BACKWARD COMPATIBILITY

   Keeps the existing Home, Jan, JingJing,
   Together and ScheduleCard components working
   with the new schedule structure.
================================================== */


/* ==================================================
   ADD OLD FIELD NAMES TO NEW EVENT OBJECTS

   OLD:
   artists
   category
   link
   status

   NEW:
   people
   type
   officialUrl
================================================== */

scheduleEvents.forEach((event) => {

  if (!event.artists) {
    event.artists =
      event.people || []
  }


  if (!event.category) {
    event.category =
      event.type || "event"
  }


  if (!event.link) {
    event.link =
      event.officialUrl || null
  }


  event.status =
    getScheduleStatus(event)

})


/* ==================================================
   PAST EVENTS
================================================== */

export function getPastEvents(
  events = scheduleEvents,
  now = new Date()
) {

  return sortScheduleEvents(

    events.filter(
      (event) =>
        getScheduleStatus(
          event,
          now
        ) === "past"
    )

  ).reverse()
}


/* ==================================================
   ARTIST UPCOMING EVENTS

   Used by:
   Jan.jsx
   JingJing.jsx

   Example:
   getArtistUpcomingEvents("jan")
   getArtistUpcomingEvents("jingjing")
================================================== */

export function getArtistUpcomingEvents(
  artist,
  now = new Date()
) {

  if (!artist) {
    return []
  }


  const artistId =
    artist.toLowerCase()


  return getUpcomingEvents(
    scheduleEvents,
    now
  ).filter(
    (event) =>
      (
        event.people ||
        event.artists ||
        []
      ).includes(
        artistId
      )
  )
}


/* ==================================================
   TOGETHER UPCOMING EVENTS

   Used by Together dashboard.
================================================== */

export function getTogetherUpcomingEvents(
  now = new Date()
) {

  return getUpcomingEvents(
    scheduleEvents,
    now
  ).filter(
    (event) => {

      const people =
        event.people ||
        event.artists ||
        []


      return (
        people.includes(
          "jan"
        ) &&
        people.includes(
          "jingjing"
        )
      )

    }
  )
}


/* ==================================================
   OPTIONAL OLD DATA NAME

   Allows older files using:
   import { scheduleData } ...
================================================== */

export const scheduleData =
  scheduleEvents


/* ==================================================
   DEFAULT EXPORT

   Allows:
   import scheduleData from ...
================================================== */

export default scheduleEvents