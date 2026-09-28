// src/data/galleryData.js

export const galleryPersonFilters = [
  { id: "all", label: "ALL" },
  { id: "jan", label: "JAN", emoji: "💜" },
  { id: "jingjing", label: "JINGJING", emoji: "🎀" },
  { id: "together", label: "TOGETHER", emoji: "♡" },
]

export const galleryCategoryFilters = [
  { id: "all", label: "ALL" },
  { id: "selfie", label: "SELFIE" },
  { id: "series", label: "SERIES" },
  { id: "events", label: "EVENTS" },
  { id: "fancons", label: "FANCONS" },
  { id: "editorial", label: "EDITORIAL" },
  { id: "bts", label: "BEHIND THE SCENES" },
  { id: "music", label: "MUSIC" },
  { id: "achievements", label: "ACHIEVEMENTS" },
]

export const galleryEraFilters = [
  { id: "all", label: "ALL ERAS" },
  { id: "enemies-with-benefits", label: "ENEMIES WITH BENEFITS" },
  { id: "bewitch-you", label: "BEWITCH YOU" },
  { id: "hide-and-sis", label: "HIDE & SIS" },
  { id: "cherry-magic", label: "CHERRY MAGIC" },
  { id: "peaceful-property", label: "PEACEFUL PROPERTY" },
  { id: "magazines", label: "MAGAZINES / EDITORIAL" },
  { id: "personal", label: "PERSONAL / SOCIAL" },
  { id: "other-events", label: "OTHER EVENTS" },
  { id: "other-works", label: "OTHER WORKS" },
  { id: "music", label: "MUSIC" },
  { id: "career", label: "CAREER / AWARDS" },
]

const galleryAsset = (path) =>
  `/${path.split("/").map((part) => encodeURIComponent(part)).join("/")}`

const makeGalleryGroup = ({
  idPrefix,
  base,
  files,
  people,
  category,
  era,
  title,
  subtitle,
  year,
}) =>
  files.map((filename, index) => ({
    id: `${idPrefix}-${String(index + 1).padStart(3, "0")}`,
    people,
    category,
    era,
    title,
    subtitle,
    ...(year ? { year } : {}),
    folder: `/${base}`,
    filename,
    image: galleryAsset(`${base}/${filename}`),
    alt: `${title}${subtitle ? ` — ${subtitle}` : ""}`,
  }))

const galleryGroups = [

  /* ==================================================
     JAN — SELFIES
  ================================================== */

  {
    idPrefix: "jan-selfie",
    base: "images/jan/selfie",
    people: ["jan"],
    category: "selfie",
    era: "personal",
    title: "Jan",
    subtitle: "Selfie",
    files: [
       "sel-14.jpg","sel-15.jpg",
        "sel-16.jpg",
        "sel-17.jpg",
        "sel-18.jpg",
        "sel-19.jpg",
        "sel-20.jpg",
        "sel-21.jpg",
        "sel-22.jpg",
        "sel-23.jpg",
        "sel-24.jpg",
        "sel-25.jpg",
        "sel-26.jpg",
        "sel-27.jpg",
        "sel-28.jpg",
        "sel-29.jpg",
        "sel-30.jpg",
        "sel-31.jpg",
        "sel-32.jpg",
        "sel-33.jpg",
        "sel-34.jpg",
        "sel-35.jpg",
        "sel-36.jpg",
        "sel-37.jpg",
        "sel-38.jpg",
        "sel-39.jpg",
        "sel-40.jpg",
        "sel-41.jpg",
        "sel-42.jpg",
        "sel-43.jpg",
        "sel-44.jpg",
        "sel-45.jpg",
        "sel-46.jpg",
        "sel-47.jpg",
        "sel-48.jpg",
        "sel-49.jpg",
        "sel-50.jpg",
        "sel-51.jpg",
        "sel-52.jpg",
        "sel-53.jpg",
        "sel-54.jpg", "jan-01.jpg", "jan-02.jpg", "jan-04.jpg",
      "jan-05.jpg", "jan-06.jpg", "jan-07.jpg", "jan-08.jpg",
      "jan-09.jpg", "jan-10.jpg", "jan-11.jpg", "jan-12.jpg",
      "jan-13.jpg", "jan-14.jpg", "jan-15.jpg", "jan-16.jpg",
      "janjan-01.jpg", "janjan-03.jpg", "janjan-04.jpg", "janjan-05.jpg",
      "janjan-06.jpg", "janjan-08.jpg", "janjan-09.jpg", "janjan-13.jpg",
      "janjan-14.jpg", "janjan-15.jpg", "janjan-16.jpg", "pic-15.jpg",
      "pic-17.jpg", "pic-18.jpg", "pic-19.jpg", "pic-20.jpg",
      "pic-21.jpg", "pic-22.jpg", "pic-23.jpg", "pic-27.jpg",
      "pic-31.jpg", "pic-33.jpg", "pic-34.jpg", "pic-35.jpg",
      "pic-36.jpg", "pic-38.jpg", "pic-39.jpg", "sel-01.jpg",
      "sel-02.jpg", "sel-03.jpg", "sel-04.jpg", "sel-05.jpg",
      "sel-06.jpg", "sel-07.jpg", "sel-08.jpg", "sel-09.jpg",
      "sel-10.jpg", "sel-11.jpg", "sel-12.jpg", "sel-13.jpg",
      "solo-jan.jpg",
    ],
  },

  /* ==================================================
     JAN — EDITORIAL
  ================================================== */

  {
    idPrefix: "jan-editorial",
    base: "images/jan/editorial",
    people: ["jan"],
    category: "editorial",
    era: "magazines",
    title: "Jan",
    subtitle: "Editorial",
    files: [
      "jm-01.jpg", "joe-01.jpg",
      "model-01.jpg", "model-02.jpg", "model-03.jpg", "model-04.jpg",
      "model-05.jpg", "model-06.jpg", "model-07.jpg", "pic-24.jpg", 
      "pic-25.jpg", "pic-26.jpg", "model-08.jpg", "model-09.jpg", "model-10.jpg", "model-11.jpg",
      "model-12.jpg", "model-13.jpg", "model-14.jpg", "model-15.jpg", "model-16.jpg", "model-17.jpg",
    ],
  },

  /* ==================================================
     JAN — EVENTS
  ================================================== */

  {
    idPrefix: "jan-events",
    base: "images/jan/events",
    people: ["jan"],
    category: "events",
    era: "other-events",
    title: "Jan",
    subtitle: "Event Moment",
    files: [
      "IMG_3714.JPG", "eve-01.jpg", "eve-02.jpg", "eve-03.jpg", "eve-04.jpg",
      "eve-05.jpg", "eve-06.jpg", "eve-07.jpg", "eve-08.jpg",
      "eve-09.jpg", "eve-10.jpg", "eve-11.jpg", "eve-12.jpg",
      "eve-13.jpg", "eve-14.jpg", "eve-15.jpg", "eve-16.jpg",
      "eve-17.jpg", "eve-18.jpg", "eve-19.jpg", "eve-20.jpg",
      "eve-21.jpg", "eve-22.jpg", "eve-23.jpg", "eve-24.jpg",
      "eve-25.jpg", "eve-26.jpg", "eve-27.jpg",
      "IMG_3715.JPG", "IMG_3716.JPG", "IMG_3721.JPG", "IMG_3741.JPG",
      "IMG_3742.JPG", "IMG_3743.JPG", "IMG_3747.JPG", "IMG_3748.JPG",
      "IMG_3749.JPG", "pic-01.jpg", "pic-02.jpg", "pic-03.jpg",
      "pic-04.jpg", "pic-05.jpg", "pic-06.jpg", "pic-07.jpg",
      "pic-08.jpg", "pic-28.jpg", "pic-29.jpg", "pic-30.jpg",
      "pic-32.jpg",
    ],
  },

  /* ==================================================
     JAN — ENEMIES WITH BENEFITS
  ================================================== */

  {
    idPrefix: "jan-ewb",
    base: "images/jan/enemies-with-benefits",
    people: ["jan"],
    category: "series",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "Jan",
    year: 2026,
    files: [
      "ewb-01.jpeg",  "ewb-02.jpeg", "ewb-03.jpeg", "ewb-04.jpg",  "ewb-05.jpg", "ewb-06.jpg",  "ewb-07.jpg", 
      "ewb-08.jpg",  "ewb-09.jpg", "ewb-10.jpg",  "ewb-11.jpg", "ewb-12.jpg", "ewb-13.jpeg", 
      "pic-09.jpg", "pic-10.jpg", "pic-11.jpg", "pic-12.jpg",
      "pic-13.jpg", "pic-37.jpg", 

    ],
  },

  /* ==================================================
     JAN — OTHER WORKS
  ================================================== */

  {
    idPrefix: "jan-works",
    base: "images/jan/works",
    people: ["jan"],
    category: "series",
    era: "other-works",
    title: "Jan",
    subtitle: "Works Archive",
    files: [
      "cover-left.jpg", "cover-right.jpg", "still-01.jpg", "work-01.jpg",
      "work-02.jpg", "work-03.jpg", "work-04.jpg", "work-05.jpg",
      "work-06.png", "work-07.jpg", "work-08.jpg", "work-09.jpg",
      "work-10.jpg",
    ],
  },

  /* ==================================================
     JAN — MUSIC
  ================================================== */

  {
    idPrefix: "jan-music",
    base: "images/jan/music",
    people: ["jan"],
    category: "music",
    era: "music",
    title: "Jan",
    subtitle: "Music",
    files: [
      "song-01.jpg", "song-02.jpg", "song-03.jpg", "song-04.jpg",
    ],
  },

  /* ==================================================
     JAN — ROOT FOLDER
  ================================================== */

  {
    idPrefix: "jan-root-editorial",
    base: "images/jan",
    people: ["jan"],
    category: "editorial",
    era: "magazines",
    title: "Jan",
    subtitle: "Portrait",
    files: [
      "best-2324.png", "869968853055746970.jpg", "jan-prof.jpg", "solo2.jpg",
      "౨ৎ𝐣𝐚𝐧𝐡𝐚𝐞ᰔᩚ (1).jpeg",
    ],
  },

  {
    idPrefix: "jan-root-selfie",
    base: "images/jan",
    people: ["jan"],
    category: "selfie",
    era: "personal",
    title: "Jan",
    subtitle: "Selfie",
    files: [
      "jan-hero.jpg",
    ],
  },

  {
    idPrefix: "jan-root-events",
    base: "images/jan",
    people: ["jan"],
    category: "events",
    era: "other-events",
    title: "Jan",
    subtitle: "Event Moment",
    files: [
      "pic-14.jpg", "HSBTmttaAAA8liq.jpg", "HSBUzUebAAAo3RV.jpg",
    ],
  },

  {
    idPrefix: "jan-root-achievements",
    base: "images/jan",
    people: ["jan"],
    category: "achievements",
    era: "career",
    title: "Jan",
    subtitle: "Career Recognition",
    files: [
      "dara-2020.jpg", "kazz-2021.jpg", "kazz-2022.jpg", "jjj-23.jpg"
    ],
  },

  {
    idPrefix: "jan-root-fancon",
    base: "images/jan",
    people: ["jan"],
    category: "fancons",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "Fan Meeting",
    year: 2026,
    files: [
      "fanmeet-01.jpg",
    ],
  },

  /* ==================================================
     JINGJING — SELFIES
  ================================================== */

  {
    idPrefix: "jing-selfie",
    base: "images/jingjing/selfie",
    people: ["jingjing"],
    category: "selfie",
    era: "personal",
    title: "JingJing",
    subtitle: "Selfie",
    files: [
      "pic-02.jpg", "pic-08.jpg", "pic-11.jpg", "pic-13.jpg",
      "pic-17.jpg", "pic-29.jpg", "pic-30.jpg", "pic-32.jpg",
      "pic-35.jpg", "pic-37.jpg", "pic-45.jpg", "pic-71.jpg",
      "pic-72.jpg", "pic-73.jpg", "pic-74.jpg", "pic-75.jpg",
      "pic-76.jpg", "pic-89.jpg", "pic-90.jpg", "pic-91.jpg",
      "pic-92.jpg", "pic-93.jpg", "pic-94.jpg", "pic-95.jpg",
      "pic-96.jpg", "pic-97.jpg", "pic-98.jpg", "pic-99.jpg",
      "pic-100.jpg", "pic-101.jpg", "pic-102.jpg", "pic-103.jpg",
      "pic-104.jpg", "pic-105.jpg", "pic-106.jpg", "pic-107.jpg",
      "pic-108.jpg", "pic-109.jpg", "pic-110.jpg", "pic-111.jpg",
      "pic-112.jpg", "pic-113.jpg", "pic-114.jpg", "pic-115.jpg",
      "pic-116.jpg", "pic-117.jpg", "pic-118.jpg", "pic-119.jpg",
      "pic-120.jpg",
    ],
  },

  /* ==================================================
     JINGJING — EDITORIAL
  ================================================== */

  {
    idPrefix: "jing-editorial",
    base: "images/jingjing/editorial",
    people: ["jingjing"],
    category: "editorial",
    era: "magazines",
    title: "JingJing",
    subtitle: "Editorial",
    files: [
      "pic-01.jpg", "pic-03.jpg", "pic-04.jpg", "pic-05.jpg",
      "pic-07.jpg", "pic-09.jpg", "pic-10.jpg", "pic-12.jpg",
      "pic-14.jpg", "pic-15.jpg", "pic-16.jpg", "pic-19.jpg",
      "pic-20.jpg", "pic-21.jpg", "pic-22.jpg", "pic-23.jpg",
      "pic-24.jpg", "pic-28.jpg", "pic-31.jpg", "pic-34.jpg",
      "pic-36.jpg", "pic-44.jpg", "pic-46.jpg", "pic-49.jpg",
      "pic-50.jpg", "pic-51.jpg", "pic-52.jpg", "pic-53.jpg",
      "pic-54.jpg", "pic-55.jpg", "pic-56.jpg", "pic-57.jpg",
      "pic-58.jpg", "pic-59.jpg", "pic-60.jpg", "pic-61.jpg",
      "pic-62.jpg", "pic-63.jpg", "pic-64.jpg", "pic-65.jpg",
      "pic-66.jpg", "pic-67.jpg", "pic-68.jpg", "pic-69.jpg",
      "pic-70.jpg",
    ],
  },

  /* ==================================================
     JINGJING — EVENTS
  ================================================== */

  {
    idPrefix: "jing-events",
    base: "images/jingjing/events",
    people: ["jingjing"],
    category: "events",
    era: "other-events",
    title: "JingJing",
    subtitle: "Event Moment",
    files: [
      "pic-00.jpg", "pic-25.jpg", "pic-77.jpg", "pic-78.jpg",
      "pic-79.jpg", "pic-80.jpg", "pic-81.jpg", "pic-82.jpg",
      "pic-83.jpg", "pic-84.jpg", "pic-85.jpg", "pic-86.jpg",
      "pic-87.jpg", "pic-88.JPG",
    ],
  },

  /* ==================================================
     JINGJING — ENEMIES WITH BENEFITS
  ================================================== */

  {
    idPrefix: "jing-ewb",
    base: "images/jingjing/enemies-with-benefits",
    people: ["jingjing"],
    category: "series",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "JingJing",
    year: 2026,
    files: [
      "pic-06.jpg", "pic-26.jpg", "pic-33.jpg", "pic-38.jpg",
      "pic-39.jpg", "pic-41.jpg", "pic-42.jpg", "pic-43.jpg",
      "pic-48.jpg", "pic-121.jpg", "pic-122.jpg", "pic-123.jpg",
      "pic-124.jpg", "pic-125.jpeg", "pic-126.jpeg",
    ],
  },

  /* ==================================================
     JINGJING — OTHER WORKS
  ================================================== */

  {
    idPrefix: "jing-works",
    base: "images/jingjing/works",
    people: ["jingjing"],
    category: "series",
    era: "other-works",
    title: "JingJing",
    subtitle: "Works Archive",
    files: [
      "cover-left.jpg", "cover-right.jpg", "still-01.jpg", "work-01.jpg",
      "work-02.jpg", "work-03.jpg", "work-04.jpg", "work-05.jpg",
      "work-06.jpg",
    ],
  },

  /* ==================================================
     JINGJING — MUSIC
  ================================================== */

  {
    idPrefix: "jing-music",
    base: "images/jingjing/music",
    people: ["jingjing"],
    category: "music",
    era: "music",
    title: "JingJing",
    subtitle: "Music",
    files: [
      "song-01.jpg", "song-02.jpg", "song-03.jpg", "song-04.jpg",
      "song-05.jpg", "song-06.jpg",
    ],
  },

  /* ==================================================
     JINGJING — ACHIEVEMENTS
  ================================================== */

  {
    idPrefix: "jing-achievements",
    base: "images/jingjing/achievements",
    people: ["jingjing"],
    category: "achievements",
    era: "career",
    title: "JingJing",
    subtitle: "Achievement",
    files: [
      "pic-01.jpg", "pic-02.jpg", "pic-03.png", "pic-04.jpg",
      "pic-05.jpg",
    ],
  },

  /* ==================================================
     JINGJING — ROOT FOLDER
  ================================================== */

  {
    idPrefix: "jing-root-editorial",
    base: "images/jingjing",
    people: ["jingjing"],
    category: "editorial",
    era: "magazines",
    title: "JingJing",
    subtitle: "Portrait",
    files: [
      "jing-prof.jpg", "jing-prof1.jpg",
    ],
  },

  {
    idPrefix: "jing-root-selfie",
    base: "images/jingjing",
    people: ["jingjing"],
    category: "selfie",
    era: "personal",
    title: "JingJing",
    subtitle: "Selfie",
    files: [
      "jingjing-hero.jpg", "jingjing-hero1.jpg", "pic-18.jpg", "pic-27.jpg",
      "pic-40.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — SELFIES / PERSONAL
  ================================================== */

  {
    idPrefix: "pair-selfie",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "selfie",
    era: "personal",
    title: "JanJingJing",
    subtitle: "Together",
    files: [
      "JJJ-1.jpeg", "jjj-01.jpg", "jjj-02.jpg", "jjj-03.jpg",
      "jjj-06.jpg", "jjj-07.jpg", "jjj-08.jpg", "jjj-11.jpg",
      "jjj-17.jpg", "jjj-41.jpeg", "jjj-42.jpg", "jjj-43.jpeg",
      "jjj-51.jpg", "jjj-52.jpg", "jjj-57.jpg", "jjj-58.jpg",
      "jjj-61.jpg", "jjj-62.jpg", "jjj-63.jpg", "jjj-67.JPG",
      "jjj-73.jpg", "jjj-79.jpg", "jjj-80.jpg", "jjj-81.jpg",
      "jjj-82.jpg", "jjj-84.jpg", "jjj-85.jpg", "jjj-86.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — EDITORIAL
  ================================================== */

  {
    idPrefix: "pair-editorial",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "editorial",
    era: "magazines",
    title: "JanJingJing",
    subtitle: "Editorial",
    files: [
      "jjj-09.jpg", "jjj-12.jpg", "jjj-13.jpg", "jjj-14.jpg",
      "jjj-25.jpg", "jjj-29.jpg", "jjj-32.jpg", "jjj-38.jpeg",
      "jjj-40.jpg", "jjj-44.jpeg", "jjj-53.jpg", "jjj-54.jpg",
      "jjj-55.jpg", "jjj-56.jpg", "jjj-59.jpg", "jjj-60.jpg",
      "jjj-65.jpg", "jjj-68.jpg", "jjj-69.jpg", "jjj-87.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — EVENTS
  ================================================== */

  {
    idPrefix: "pair-events",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "events",
    era: "other-events",
    title: "JanJingJing",
    subtitle: "Event Moment",
    files: [
      "jjj-04.jpg", "jjj-05.jpg", "jjj-10.jpg", "jjj-15.jpg",
      "jjj-16.jpg", "jjj-18.jpg", "jjj-19.jpg", "jjj-20.jpg",
      "jjj-21.jpg", "jjj-22.jpg", "jjj-23.jpg", "jjj-24.jpg",
      "jjj-26.jpg", "jjj-27.jpg", "jjj-28.jpg", "jjj-30.jpg",
      "jjj-31.jpg", "jjj-33.jpeg", "jjj-34.jpeg", "jjj-35.jpg",
      "jjj-36.jpg", "jjj-37.jpg", "jjj-39.jpg", "jjj-45.jpg",
      "jjj-46.jpg", "jjj-47.jpg", "jjj-48.jpg", "jjj-49.jpg",
      "jjj-50.jpg", "jjj-64.jpg", "jjj-66.jpg", "jjj-70.jpg",
      "jjj-71.jpg", "jjj-72.jpg", "jjj-74.jpg", "jjj-75.jpg",
      "jjj-76.jpg", "jjj-77.jpg", "jjj-78.jpg", "jjj-83.JPG",
      "hero-bg.jpg", "jjj-bg.jpg",
    ],
  },

  {
    idPrefix: "pair-editorial-special",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "editorial",
    era: "magazines",
    title: "JanJingJing",
    subtitle: "Editorial",
    files: [
      "pic-16.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — ENEMIES WITH BENEFITS
  ================================================== */

  {
    idPrefix: "pair-ewb-series",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "series",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "Jan × JingJing",
    year: 2026,
    files: [
      "JJJEWB.png",
    ],
  },

  /* ==================================================
     TOGETHER — BEWITCH YOU
  ================================================== */

  {
    idPrefix: "pair-bewitch",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "fancons",
    era: "bewitch-you",
    title: "Bewitch You",
    subtitle: "JanJingJing Fancon",
    year: 2026,
    files: [
      "JJJBY.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — EWB FAN MEETINGS
  ================================================== */

  {
    idPrefix: "pair-ewb-fancon",
    base: "images/couple",
    people: ["jan", "jingjing", "together"],
    category: "fancons",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "Fan Meeting",
    year: 2026,
    files: [
      "MNL.jpg", "SL.jpg", "TP.jpg", "TP1.jpg",
      "TP2.jpg", "TP3.jpg", "TP4.jpg", "TP5.jpg",
      "TP6.jpg", "TP7.jpg", "TP8.jpg", "TP9.jpg",
      "TP10.jpg", "TP11.jpg", "TP12.jpg",
    ],
  },

  /* ==================================================
     TOGETHER — EWB SERIES ARCHIVE
  ================================================== */

  {
    idPrefix: "pair-ewb-works",
    base: "images/works/ewb",
    people: ["jan", "jingjing", "together"],
    category: "series",
    era: "enemies-with-benefits",
    title: "Enemies With Benefits",
    subtitle: "Series Archive",
    year: 2026,
    files: [
      "ewb1.jpg",
      "ewb2.jpg",
      "cover-left.jpg",
      "cover-right.jpg",
      "scene-01.png",
      "scene-02.png",
      "scene-03.png",
      "scene-04.png",
      "scene-05.png",
      "scene-06.png",
      "scene-07.png",
      "still-01.jpg",
    ],
  },
]

export const galleryPhotos =
  galleryGroups.flatMap(
    makeGalleryGroup
  )
















  /* ==================================================
   SUPABASE GALLERY SUPPORT
================================================== */


/* ==================================================
   SLUG
================================================== */

function gallerySlug(
  value
) {

  return String(
    value ||
    ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and"
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    )

}


/* ==================================================
   CATEGORY NORMALIZATION

   Converts friendly Admin values such as:

   Fan Meeting
   Event
   Behind the Scenes

   into the IDs already used by Gallery.jsx.
================================================== */

export function normalizeGalleryCategory(
  value
) {

  const normalized =
    String(
      value ||
      ""
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

    selfie:
      "selfie",

    selfies:
      "selfie",

    series:
      "series",

    drama:
      "series",

    work:
      "series",

    works:
      "series",

    event:
      "events",

    events:
      "events",

    appearance:
      "events",

    appearances:
      "events",

    fancon:
      "fancons",

    fancons:
      "fancons",

    "fan con":
      "fancons",

    "fan meeting":
      "fancons",

    fanmeeting:
      "fancons",

    editorial:
      "editorial",

    magazine:
      "editorial",

    magazines:
      "editorial",

    portrait:
      "editorial",

    bts:
      "bts",

    "behind the scenes":
      "bts",

    "behind-the-scenes":
      "bts",

    music:
      "music",

    song:
      "music",

    songs:
      "music",

    achievement:
      "achievements",

    achievements:
      "achievements",

    award:
      "achievements",

    awards:
      "achievements",

  }


  return (
    aliases[
      normalized
    ] ||
    gallerySlug(
      normalized
    ) ||
    "events"
  )

}


/* ==================================================
   ERA NORMALIZATION
================================================== */

export function normalizeGalleryEra(
  value
) {

  const normalized =
    String(
      value ||
      ""
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

    "enemies with benefits":
      "enemies-with-benefits",

    "bewitch you":
      "bewitch-you",

    "hide and sis":
      "hide-and-sis",

    "hide & sis":
      "hide-and-sis",

    "cherry magic":
      "cherry-magic",

    "peaceful property":
      "peaceful-property",

    magazine:
      "magazines",

    magazines:
      "magazines",

    editorial:
      "magazines",

    personal:
      "personal",

    social:
      "personal",

    "personal social":
      "personal",

    "other events":
      "other-events",

    event:
      "other-events",

    events:
      "other-events",

    "other works":
      "other-works",

    works:
      "other-works",

    music:
      "music",

    career:
      "career",

    awards:
      "career",

    achievements:
      "career",

  }


  return (
    aliases[
      normalized
    ] ||
    gallerySlug(
      normalized
    ) ||
    "other-events"
  )

}


/* ==================================================
   PEOPLE NORMALIZATION
================================================== */

function normalizeGalleryPeople(
  people = []
) {

  const normalized =
    people
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
   * Couple photos must also work with the existing
   * TOGETHER filter.
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
   SUPABASE ROW → GALLERY PHOTO
================================================== */

export function mapSupabaseGalleryPhoto(
  row,
  imageUrl
) {

  const people =
    normalizeGalleryPeople(
      Array.isArray(
        row.people
      )
        ? row.people
        : []
    )


  const category =
    normalizeGalleryCategory(
      row.category
    )


  const era =
    normalizeGalleryEra(
      row.era
    )


  let subtitle =
    ""


  if (
    people.includes(
      "together"
    )
  ) {

    subtitle =
      "Together"

  }

  else if (
    people.includes(
      "jan"
    )
  ) {

    subtitle =
      "Jan"

  }

  else if (
    people.includes(
      "jingjing"
    )
  ) {

    subtitle =
      "JingJing"

  }


  const year =
    row.photo_date
      ? Number(
          String(
            row.photo_date
          ).slice(
            0,
            4
          )
        )
      : undefined


  return {

    id:
      `supabase-${row.id}`,

    databaseId:
      row.id,

    source:
      "supabase",

    people,

    category,

    era,

    title:
      row.title ||
      "JanJingJing",

    subtitle,

    ...(year
      ? {
          year,
        }
      : {}),

    image:
      imageUrl,

    alt:
      row.alt_text ||
      row.title ||
      "JanJingJing gallery photo",

    credit:
      row.credit ||
      "",

    sourceUrl:
      row.source_url ||
      "",

    photoDate:
      row.photo_date ||
      "",

    sortOrder:
      row.sort_order ??
      0,

    imagePath:
      row.image_path,

    isPublished:
      Boolean(
        row.is_published
      ),

  }

}


/* ==================================================
   MERGE

   Local archive stays untouched.
   Supabase photos are added to it.
================================================== */

export function mergeGalleryPhotos(
  localPhotos = [],
  databasePhotos = []
) {

  return [
    ...localPhotos,
    ...databasePhotos,
  ]

}


/* ==================================================
   DYNAMIC FILTER OPTIONS

   If Admin creates a new category or era that did
   not previously exist in galleryData.js, it will
   automatically become available as a filter.
================================================== */

function formatGalleryFilterLabel(
  value
) {

  return String(
    value ||
    ""
  )
    .split("-")
    .filter(
      Boolean
    )
    .map(
      (
        word
      ) =>
        word
          .charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(
      " "
    )
    .toUpperCase()

}


export function buildGalleryFilterOptions(
  baseFilters,
  photos,
  field
) {

  const existing =
    new Set(
      baseFilters.map(
        (
          item
        ) =>
          item.id
      )
    )


  const additional =
    []


  photos.forEach(
    (
      photo
    ) => {

      const value =
        photo[
          field
        ]


      if (
        !value ||
        existing.has(
          value
        )
      ) {

        return

      }


      existing.add(
        value
      )


      additional.push({

        id:
          value,

        label:
          formatGalleryFilterLabel(
            value
          ),

      })

    }
  )


  return [
    ...baseFilters,
    ...additional,
  ]

}