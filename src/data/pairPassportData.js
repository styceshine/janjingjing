/**
 * src/data/pairPassportData.js
 * ---------------------------------------------------------------------------
 * Pair Passport destinations.
 *
 * Asia destinations use the normal Asia map.
 * Destinations with:
 *
 *   mapMode: "world"
 *
 * trigger the zoomed-out Europe + Asia map.
 *
 * lon / lat are now included so pins can automatically reposition
 * depending on which map is being displayed.
 * ---------------------------------------------------------------------------
 */


/* ==========================================================================
   SETTINGS
========================================================================== */

export const pairPassportConfig = {

  homeId:
    "bangkok-home",

  mapImage:
    null,

  mapSize: {
    w: 1600,
    h: 1000,
  },

}


/* ==========================================================================
   PASSENGERS
========================================================================== */

export const pairPassportCast = [

  {
    id: "jan",

    name: "Jan",

    chibi:
      "/images/couple/passport/solo2.jpg",

    color:
      "#7c5cd6",
  },


  {
    id: "jingjing",

    name: "JingJing",

    chibi:
       "/images/couple/passport/pic-48.jpg",
    color:
      "#ee78ab",
  },


  {
    id: "kapook",

    name: "Kapook",

    chibi:
       "/images/couple/passport/kpk.jpg",

    color:
      "#e6a865",
  },


  {
    id: "ciize",

    name: "Ciize",

    chibi:
      "/images/couple/passport/cz.jpg",

    color:
      "#6fb8ad",
  },

]


/* ==========================================================================
   DESTINATIONS
========================================================================== */

export const pairPassportEvents = [


  /* ==========================================================================
     BANGKOK
  ========================================================================== */

  {
    id:
      "bangkok-home",

    city:
      "Bangkok",

    country:
      "Thailand",

    lon:
      100.5018,

    lat:
      13.7563,

    mapMode:
      "asia",

    status:
      "visited",

    title:
      "Home base: where every trip begins",

    date:
      "",

    type:
      "HOME BASE",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "Bangkok — home base for JanJingJing and the starting point of the Pair Passport journey.",

    image:
      "/images/couple/jjj-38.jpeg",

    gallery: [
      "/images/couple/jjj-08.jpg",
      "/images/couple/jjj-02.jpg",
      "/images/couple/jjj-41.jpeg",
    ],

    sourceUrl:
      "",

    coords:
      "13.76°N  100.50°E",

    labelSide:
      "right",
  },


  /* ==========================================================================
     TAIPEI
  ========================================================================== */

  {
    id:
      "taipei-2026",

    city:
      "Taipei",

    country:
      "Taiwan",

    lon:
      121.5654,

    lat:
      25.033,

    mapMode:
      "asia",

    status:
      "visited",

    title:
      "Enemies With Benefits 1st Fan Meeting in Taipei",

    date:
      "06 SEP 2026",

    type:
      "FAN MEETING",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "Jan, JingJing, Kapook and Ciize brought Enemies With Benefits to Taipei for its first fan meeting.",

    image:
      "/images/couple/TP.jpg",

    gallery: [
      "/images/couple/TP1.jpg",
      "/images/couple/TP11.jpg",
      "/images/couple/TP8.jpg",
    ],

    sourceUrl:
      "",

    coords:
      "25.03°N  121.56°E",

    labelSide:
      "left",
  },


  /* ==========================================================================
     HO CHI MINH CITY — VIETNAM
  ========================================================================== */

  {
    id:
      "vietnam-fanday-35",

    city:
      "Ho Chi Minh City",

    country:
      "Vietnam",

    lon:
      106.6297,

    lat:
      10.8231,

    mapMode:
      "asia",

    /*
     * `autoStatus` allows the component to turn this
     * from UPCOMING → VISITED automatically after its dateTime.
     */
    status:
      "upcoming",

    autoStatus:
      true,

    dateTime:
      "2026-09-26T20:00:00+07:00",

    title:
      "Enemies With Benefits FanDay in Vietnam",

    date:
      "26 SEP 2026",

    time:
      "20:00 ICT",

    type:
      "GMMTV FANDAY",

    venue:
      "Nguyen Du Gymnasium",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "The Enemies With Benefits cast — Jan, JingJing, Kapook and Ciize — meet fans in Ho Chi Minh City as part of GMMTV FANDAY 35.",

    /*
     * Add these files later.
     * SafeImage already shows a fallback if they do not exist yet.
     */
    image:
      "/images/couple/passport/FDY.jpeg",

    gallery: [
      "/images/couple/passport/vt-04.jpg",
      "/images/couple/passport/vt-02.jpg",
      "/images/couple/passport/vt-03.jpg",
    ],

    sourceUrl:
      "https://www.ticketmelon.com/gmmtv/fanday35inVN-AP-Benefit",

    coords:
      "10.82°N  106.63°E",

    labelSide:
      "right",
  },


  /* ==========================================================================
     PARIS — WORLD MAP DESTINATION
  ========================================================================== */

  {
    id:
      "paris-fanday-37",

    city:
      "Paris",

    country:
      "France",

    lon:
      2.3522,

    lat:
      48.8566,

    /*
     * IMPORTANT:
     * Selecting this destination tells Pair Passport
     * to zoom out to the Europe + Asia map.
     */
    mapMode:
      "world",

    status:
      "upcoming",

    autoStatus:
      true,

    dateTime:
      "2026-10-04T17:30:00+02:00",

    title:
      "Jan Jingjing Fanday in Paris.",

    date:
      "04 OCT 2026",

    time:
      "17:30",

    type:
      "GMMTV FANDAY",

    venue:
      "Novotel Paris Est – Centre de Conférences",

    participants: [
      "Jan",
      "JingJing",
    ],

    description:
      "Jan and JingJing travel beyond Asia to meet fans in Paris for GMMTV FANDAY 37.",

    image:
      "/images/together/passport/events/paris.jpg",

    gallery: [
      "/images/together/passport/events/paris-01.jpg",
      "/images/together/passport/events/paris-02.jpg",
      "/images/together/passport/events/paris-03.jpg",
    ],

    /*
     * Leave empty until you choose the official page
     * you want linked from the archive.
     */
    sourceUrl:
      "",

    coords:
      "48.86°N  2.35°E",

    labelSide:
      "right",
  },


  /* ==========================================================================
     SEOUL
  ========================================================================== */

  {
    id:
      "seoul-sample",

    city:
      "Seoul",

    country:
      "South Korea",

    lon:
      126.978,

    lat:
      37.5665,

    mapMode:
      "asia",

    status:
      "upcoming",

    title:
      "Enemies With Benefits 1st Fan Meeting in Seoul.",

    date:
      "11 OCT 2026",

    type:
      "FAN EVENT",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "Jan, JingJing, Kapook and Ciize brought Enemies With Benefits to Taipei for its first fan meeting.",

    image:
      "/images/couple/SL.jpg",

    gallery: [
      "/images/together/passport/events/seoul-01.jpg",
      "/images/together/passport/events/seoul-02.jpg",
      "/images/together/passport/events/seoul-03.jpg",
    ],

    sourceUrl:
      "",

    coords:
      "37.57°N  126.98°E",

    isSample:
      true,

    labelSide:
      "left",
  },


  /* ==========================================================================
     SINGAPORE
  ========================================================================== */

  {
    id:
      "singapore-sample",

    city:
      "Singapore",

    country:
      "Singapore",

    lon:
      103.8198,

    lat:
      1.3521,

    mapMode:
      "asia",

    status:
      "upcoming",

    title:
      "Enemies With Benefits 1st Fan Meeting in Singapore",

    date:
      "05 DEC 2026",

    type:
      "FAN EVENT",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "Jan, JingJing, Kapook and Ciize brought Enemies With Benefits to Singapore for its first fan meeting.",

    image:
      "/images/together/passport/events/singapore.jpg",

    gallery: [
      "/images/together/passport/events/singapore-01.jpg",
      "/images/together/passport/events/singapore-02.jpg",
      "/images/together/passport/events/singapore-03.jpg",
    ],

    sourceUrl:
      "",

    coords:
      "1.35°N  103.82°E",

    isSample:
      true,

    labelSide:
      "right",
  },


  /* ==========================================================================
     MANILA
  ========================================================================== */

  {
    id:
      "manila-2027",

    city:
      "Manila",

    country:
      "Philippines",

    lon:
      120.9842,

    lat:
      14.5995,

    mapMode:
      "asia",

    status:
      "upcoming",

    title:
      "Enemies With Benefits Fan Meeting in Manila",

    date:
      "09 JAN 2027",

    type:
      "FAN MEETING",

    participants: [
      "Jan",
      "JingJing",
      "Kapook",
      "Ciize",
    ],

    description:
      "Jan, JingJing, Kapook and Ciize brought Enemies With Benefits to Manila for its first fan meeting.",

    image:
      "/images/couple/MNL.jpg",

    gallery: [
      "/images/together/passport/events/manila-01.jpg",
      "/images/together/passport/events/manila-02.jpg",
      "/images/together/passport/events/manila-03.jpg",
    ],

    sourceUrl:
      "",

    coords:
      "14.60°N  120.98°E",

    isSample:
      true,

    labelSide:
      "left",
  },

]