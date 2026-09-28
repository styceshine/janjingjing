/**
 * src/data/pairPassportWorld.js
 * ---------------------------------------------------------------------------
 * Zoomed-out Europe → Asia backdrop used when Pair Passport
 * travels to a destination outside the normal Asia map.
 *
 * The main Asia geometry stays in pairPassportLand.js.
 * ---------------------------------------------------------------------------
 */

import {
  LAND_POLYGONS,
} from "./pairPassportLand"


/* ==========================================================================
   WORLD / EURASIA VIEW

   Same visual aspect ratio as the Asia map so switching views
   does not suddenly change the height of the section.
========================================================================== */

export const WORLD_MAP_BOUNDS = {

  lonMin:
    -15,

  lonMax:
    150,

  latMax:
    62,

  latMin:
    -5,

}


export const WORLD_MAP_VIEW = {

  w:
    1000,

  h:
    680,

}


/* ==========================================================================
   LON / LAT → PERCENT POSITION
========================================================================== */

export function worldMapPoint(
  lon,
  lat
) {

  const {
    lonMin,
    lonMax,
    latMax,
    latMin,
  } =
    WORLD_MAP_BOUNDS


  const x =
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
    100


  const y =
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
    100


  return {

    x:
      Math.round(
        x *
        10
      ) /
      10,

    y:
      Math.round(
        y *
        10
      ) /
      10,

  }

}


/* ==========================================================================
   WORLD LABELS
========================================================================== */

export const WORLD_LABELS = [

  {
    text:
      "Europe",

    ...worldMapPoint(
      15,
      50
    ),
  },

  {
    text:
      "Central Asia",

    ...worldMapPoint(
      62,
      46
    ),
  },

  {
    text:
      "Indian Ocean",

    ...worldMapPoint(
      77,
      3
    ),
  },

  {
    text:
      "South China Sea",

    ...worldMapPoint(
      114,
      12
    ),
  },

]


/* ==========================================================================
   EXTRA WORLD LAND

   Decorative simplified polygons.
   They only create the dotted silhouette.
========================================================================== */

const WORLD_EXTRA_POLYGONS = [

  /* ------------------------------------------------------------------------
     WESTERN + CENTRAL EUROPE
  ------------------------------------------------------------------------ */

  [
    [-10, 36],
    [-9, 43],
    [-5, 48],
    [0, 51],
    [4, 53],
    [8, 55],
    [13, 55],
    [18, 54],
    [23, 55],
    [29, 59],
    [35, 60],
    [40, 57],
    [42, 52],
    [39, 47],
    [34, 44],
    [31, 41],
    [29, 37],
    [24, 35],
    [18, 37],
    [14, 41],
    [10, 43],
    [7, 44],
    [3, 43],
    [-1, 42],
    [-5, 40],
    [-10, 36],
  ],


  /* ------------------------------------------------------------------------
     UNITED KINGDOM
  ------------------------------------------------------------------------ */

  [
    [-6, 50],
    [-5, 55],
    [-3, 58],
    [0, 57],
    [1, 53],
    [-1, 50],
    [-6, 50],
  ],


  /* ------------------------------------------------------------------------
     IRELAND
  ------------------------------------------------------------------------ */

  [
    [-10.5, 51],
    [-10, 54],
    [-8, 55.5],
    [-6, 54],
    [-6.5, 51.5],
    [-10.5, 51],
  ],


  /* ------------------------------------------------------------------------
     SCANDINAVIA
  ------------------------------------------------------------------------ */

  [
    [5, 55],
    [7, 60],
    [12, 66],
    [18, 69],
    [25, 68],
    [30, 63],
    [27, 58],
    [20, 55],
    [14, 56],
    [9, 58],
    [5, 55],
  ],


  /* ------------------------------------------------------------------------
     ITALY
  ------------------------------------------------------------------------ */

  [
    [7, 45],
    [11, 46],
    [13, 44],
    [14, 42],
    [17, 40],
    [18, 38],
    [16, 37],
    [14, 40],
    [12, 42],
    [9, 44],
    [7, 45],
  ],


  /* ------------------------------------------------------------------------
     WEST + CENTRAL ASIA
     Bridges Europe to the existing East / Southeast Asia polygons.
  ------------------------------------------------------------------------ */

  [
    [28, 38],
    [31, 45],
    [38, 51],
    [48, 55],
    [60, 57],
    [72, 56],
    [82, 53],
    [92, 50],
    [96, 44],
    [91, 38],
    [84, 34],
    [78, 30],
    [72, 27],
    [65, 25],
    [57, 27],
    [50, 30],
    [44, 32],
    [38, 35],
    [33, 37],
    [28, 38],
  ],


  /* ------------------------------------------------------------------------
     INDIA
  ------------------------------------------------------------------------ */

  [
    [68, 24],
    [70, 29],
    [75, 32],
    [80, 30],
    [86, 26],
    [89, 22],
    [87, 18],
    [83, 14],
    [79, 9],
    [76, 8],
    [73, 13],
    [70, 18],
    [68, 24],
  ],


  /* ------------------------------------------------------------------------
     SRI LANKA
  ------------------------------------------------------------------------ */

  [
    [79.5, 9.8],
    [81.5, 9.5],
    [81.9, 7.0],
    [80.7, 5.5],
    [79.7, 7.0],
    [79.5, 9.8],
  ],

]


/* ==========================================================================
   WORLD LAND SET

   Existing Asia polygons +
   simplified western Eurasia.
========================================================================== */

const WORLD_POLYGONS = [

  ...WORLD_EXTRA_POLYGONS,

  ...LAND_POLYGONS,

]


/* ==========================================================================
   POLYGON BOUNDS
========================================================================== */

const polygonBoxes =
  WORLD_POLYGONS.map(
    (
      polygon
    ) => {

      let minX =
        Infinity

      let maxX =
        -Infinity

      let minY =
        Infinity

      let maxY =
        -Infinity


      for (
        const [
          x,
          y,
        ]
        of polygon
      ) {

        if (
          x <
          minX
        ) {
          minX =
            x
        }


        if (
          x >
          maxX
        ) {
          maxX =
            x
        }


        if (
          y <
          minY
        ) {
          minY =
            y
        }


        if (
          y >
          maxY
        ) {
          maxY =
            y
        }

      }


      return {
        minX,
        maxX,
        minY,
        maxY,
      }

    }
  )


/* ==========================================================================
   POINT IN POLYGON
========================================================================== */

function inPolygon(
  lon,
  lat,
  polygon
) {

  let inside =
    false


  for (
    let i = 0,
      j =
        polygon.length -
        1;

    i <
    polygon.length;

    j =
      i++
  ) {

    const [
      xi,
      yi,
    ] =
      polygon[i]


    const [
      xj,
      yj,
    ] =
      polygon[j]


    const intersect =
      (
        yi >
        lat
      ) !==
        (
          yj >
          lat
        ) &&
      lon <
        (
          (
            xj -
            xi
          ) *
            (
              lat -
              yi
            )
        ) /
          (
            yj -
            yi
          ) +
          xi


    if (
      intersect
    ) {

      inside =
        !inside
    }

  }


  return inside

}


/* ==========================================================================
   LAND CHECK
========================================================================== */

function isWorldLand(
  lon,
  lat
) {

  for (
    let index = 0;

    index <
    WORLD_POLYGONS.length;

    index++
  ) {

    const bounds =
      polygonBoxes[index]


    if (
      lon <
        bounds.minX ||
      lon >
        bounds.maxX ||
      lat <
        bounds.minY ||
      lat >
        bounds.maxY
    ) {

      continue
    }


    if (
      inPolygon(
        lon,
        lat,
        WORLD_POLYGONS[
          index
        ]
      )
    ) {

      return true
    }

  }


  return false

}


/* ==========================================================================
   DOTTED WORLD PATH
========================================================================== */

const DOT_STEP =
  7


let cachedWorldPath =
  null


export function getWorldLandDotPath() {

  if (
    cachedWorldPath
  ) {

    return cachedWorldPath
  }


  const {
    w,
    h,
  } =
    WORLD_MAP_VIEW


  const {
    lonMin,
    lonMax,
    latMax,
    latMin,
  } =
    WORLD_MAP_BOUNDS


  let path =
    ""

  let row =
    0


  for (
    let y =
      DOT_STEP /
      2;

    y <
    h;

    y +=
      DOT_STEP,
    row++
  ) {

    const offset =
      row %
        2
        ? DOT_STEP /
          2
        : 0


    for (
      let x =
        DOT_STEP /
          2 +
        offset;

      x <
      w;

      x +=
        DOT_STEP
    ) {

      const lon =
        lonMin +
        (
          x /
          w
        ) *
          (
            lonMax -
            lonMin
          )


      const lat =
        latMax -
        (
          y /
          h
        ) *
          (
            latMax -
            latMin
          )


      if (
        isWorldLand(
          lon,
          lat
        )
      ) {

        path +=
          `M${x.toFixed(
            1
          )} ${y.toFixed(
            1
          )}h.01`
      }

    }

  }


  cachedWorldPath =
    path


  return cachedWorldPath

}