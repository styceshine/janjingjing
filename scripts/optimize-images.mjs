import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"


/* ==========================================================
   SETTINGS
========================================================== */

const IMAGE_DIR =
  path.resolve(
    "public/images"
  )


const BACKUP_DIR =
  path.resolve(
    ".image-backup"
  )


const MIN_SIZE =
  1 * 1024 * 1024
// Only process files larger than 1 MB


const MAX_DIMENSION =
  2200
// Very large images are resized to fit inside 2200 × 2200


const JPEG_QUALITY =
  82


/* ==========================================================
   HELPERS
========================================================== */

const isJpeg =
  (filePath) => {

    const extension =
      path
        .extname(filePath)
        .toLowerCase()


    return (
      extension === ".jpg" ||
      extension === ".jpeg"
    )

  }


const formatMB =
  (bytes) =>
    `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`


/* ==========================================================
   RECURSIVE FILE SEARCH
========================================================== */

async function getFiles(
  directory
) {

  const entries =
    await fs.readdir(
      directory,
      {
        withFileTypes:
          true,
      }
    )


  const files =
    []


  for (
    const entry
    of entries
  ) {

    const fullPath =
      path.join(
        directory,
        entry.name
      )


    if (
      entry.isDirectory()
    ) {

      files.push(
        ...await getFiles(
          fullPath
        )
      )

      continue

    }


    files.push(
      fullPath
    )

  }


  return files

}


/* ==========================================================
   OPTIMIZE ONE IMAGE
========================================================== */

async function optimizeImage(
  filePath
) {

  const stat =
    await fs.stat(
      filePath
    )


  if (
    stat.size <
    MIN_SIZE
  ) {

    return {
      status:
        "small",
    }

  }


  const relativePath =
    path.relative(
      IMAGE_DIR,
      filePath
    )


  const backupPath =
    path.join(
      BACKUP_DIR,
      relativePath
    )


  const backupFolder =
    path.dirname(
      backupPath
    )


  await fs.mkdir(
    backupFolder,
    {
      recursive:
        true,
    }
  )


  /* ========================================================
     BACKUP ORIGINAL
  ======================================================== */

  try {

    await fs.access(
      backupPath
    )

  }

  catch {

    await fs.copyFile(
      filePath,
      backupPath
    )

  }


  /* ========================================================
     TEMP FILE
  ======================================================== */

  const tempPath =
    `${filePath}.optimized.jpg`


  /* ========================================================
     READ IMAGE
  ======================================================== */

  const image =
    sharp(
      filePath
    )
      .rotate()


  const metadata =
    await image.metadata()


  let pipeline =
    image


  /* ========================================================
     RESIZE ONLY IF NECESSARY
  ======================================================== */

  if (
    (
      metadata.width &&
      metadata.width >
        MAX_DIMENSION
    ) ||
    (
      metadata.height &&
      metadata.height >
        MAX_DIMENSION
    )
  ) {

    pipeline =
      pipeline.resize({
        width:
          MAX_DIMENSION,

        height:
          MAX_DIMENSION,

        fit:
          "inside",

        withoutEnlargement:
          true,
      })

  }


  /* ========================================================
     JPEG COMPRESSION
  ======================================================== */

  await pipeline
    .jpeg({
      quality:
        JPEG_QUALITY,

      progressive:
        true,

      mozjpeg:
        true,
    })
    .toFile(
      tempPath
    )


  const optimizedStat =
    await fs.stat(
      tempPath
    )


  /* ========================================================
     ONLY REPLACE IF SMALLER
  ======================================================== */

  if (
    optimizedStat.size >=
    stat.size
  ) {

    await fs.unlink(
      tempPath
    )


    return {
      status:
        "not-smaller",

      before:
        stat.size,

      after:
        optimizedStat.size,

      file:
        relativePath,
    }

  }


  await fs.unlink(
    filePath
  )


  await fs.rename(
    tempPath,
    filePath
  )


  return {
    status:
      "optimized",

    before:
      stat.size,

    after:
      optimizedStat.size,

    file:
      relativePath,
  }

}


/* ==========================================================
   MAIN
========================================================== */

async function main() {

  console.log(
    "\nJanJingJing Image Optimizer\n"
  )


  console.log(
    `Images: ${IMAGE_DIR}`
  )


  console.log(
    `Backups: ${BACKUP_DIR}\n`
  )


  await fs.mkdir(
    BACKUP_DIR,
    {
      recursive:
        true,
    }
  )


  const files =
    await getFiles(
      IMAGE_DIR
    )


  const jpegFiles =
    files.filter(
      isJpeg
    )


  let optimized =
    0


  let skippedSmall =
    0


  let skippedLarger =
    0


  let failed =
    0


  let originalTotal =
    0


  let optimizedTotal =
    0


  for (
    const filePath
    of jpegFiles
  ) {

    try {

      const result =
        await optimizeImage(
          filePath
        )


      if (
        result.status ===
        "small"
      ) {

        skippedSmall++

        continue

      }


      if (
        result.status ===
        "not-smaller"
      ) {

        skippedLarger++


        console.log(
          `SKIP  ${result.file}`
        )


        continue

      }


      optimized++


      originalTotal +=
        result.before


      optimizedTotal +=
        result.after


      console.log(
        `✓ ${result.file}`
      )


      console.log(
        `  ${formatMB(
          result.before
        )} → ${formatMB(
          result.after
        )}`
      )

    }

    catch (
      error
    ) {

      failed++


      console.error(
        `✕ ${filePath}`
      )


      console.error(
        error.message
      )

    }

  }


  /* ========================================================
     SUMMARY
  ======================================================== */

  console.log(
    "\n----------------------------------------"
  )


  console.log(
    "Optimization complete."
  )


  console.log(
    `Optimized: ${optimized}`
  )


  console.log(
    `Skipped under 1 MB: ${skippedSmall}`
  )


  console.log(
    `Skipped because result was not smaller: ${skippedLarger}`
  )


  console.log(
    `Failed: ${failed}`
  )


  if (
    optimized >
    0
  ) {

    const saved =
      originalTotal -
      optimizedTotal


    console.log(
      `\nBefore: ${formatMB(
        originalTotal
      )}`
    )


    console.log(
      `After:  ${formatMB(
        optimizedTotal
      )}`
    )


    console.log(
      `Saved:  ${formatMB(
        saved
      )}`
    )

  }


  console.log(
    "\nOriginal files are backed up in:"
  )


  console.log(
    BACKUP_DIR
  )


  console.log(
    ""
  )

}


main().catch(
  (
    error
  ) => {

    console.error(
      error
    )


    process.exit(
      1
    )

  }
)