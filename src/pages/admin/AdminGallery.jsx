import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import {
  supabase,
} from "../../lib/supabase"

import "../../styles/pages/AdminGallery.css"


/* ==================================================
   DEFAULT FORM
================================================== */

const createEmptyForm =
  () => ({
    title: "",
    altText: "",
    people: [
      "jan",
      "jingjing",
      "together",
    ],
    category: "",
    era: "",
    photoDate: "",
    credit: "",
    sourceUrl: "",
    sortOrder: 0,
    isPublished: true,
  })


/* ==================================================
   HELPERS
================================================== */

const safeFilename =
  (filename) => {

    const parts =
      filename.split(".")

    const extension =
      parts.length > 1
        ? parts.pop()
        : "jpg"

    const base =
      parts
        .join(".")
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        )
        .slice(
          0,
          60
        ) || "photo"

    return {
      base,

      extension:
        String(
          extension
        )
          .toLowerCase()
          .replace(
            /[^a-z0-9]/g,
            ""
          ) || "jpg",
    }

  }


const getPublicPhotoUrl =
  (path) => {

    if (
      !path
    ) {
      return ""
    }


    const {
      data,
    } =
      supabase.storage
        .from(
          "gallery"
        )
        .getPublicUrl(
          path
        )


    return (
      data?.publicUrl ||
      ""
    )

  }


/* ==================================================
   COMPONENT
================================================== */

function AdminGallery() {

  const navigate =
    useNavigate()


  const [
    photos,
    setPhotos,
  ] =
    useState([])


  const [
    form,
    setForm,
  ] =
    useState(
      createEmptyForm
    )


  const [
    imageFile,
    setImageFile,
  ] =
    useState(null)


  const [
    editingId,
    setEditingId,
  ] =
    useState(null)


  const [
    existingImagePath,
    setExistingImagePath,
  ] =
    useState("")


  const [
    loading,
    setLoading,
  ] =
    useState(true)


  const [
    saving,
    setSaving,
  ] =
    useState(false)


  const [
    error,
    setError,
  ] =
    useState("")


  const [
    message,
    setMessage,
  ] =
    useState("")


  /* ==================================================
     PREVIEW
  ================================================== */

  const localPreview =
    useMemo(
      () => {

        if (
          !imageFile
        ) {
          return ""
        }

        return URL.createObjectURL(
          imageFile
        )

      },
      [
        imageFile,
      ]
    )


  useEffect(
    () => {

      return () => {

        if (
          localPreview
        ) {

          URL.revokeObjectURL(
            localPreview
          )

        }

      }

    },
    [
      localPreview,
    ]
  )


  const previewUrl =
    localPreview ||
    getPublicPhotoUrl(
      existingImagePath
    )


  /* ==================================================
     LOAD PHOTOS
  ================================================== */

  const loadPhotos =
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
          error: loadError,
        } =
          await supabase
            .from(
              "gallery_photos"
            )
            .select("*")
            .order(
              "sort_order",
              {
                ascending: true,
              }
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            )


        if (
          loadError
        ) {

          console.error(
            "Gallery load error:",
            loadError
          )

          setError(
            "Unable to load gallery photos."
          )

          setLoading(
            false
          )

          return

        }


        setPhotos(
          data || []
        )

        setLoading(
          false
        )

      },
      []
    )


  useEffect(
    () => {

      loadPhotos()

    },
    [
      loadPhotos,
    ]
  )


  /* ==================================================
     FORM
  ================================================== */

  const handleChange =
    (
      event
    ) => {

      const {
        name,
        value,
        type,
        checked,
      } =
        event.target


      setForm(
        (
          current
        ) => ({
          ...current,

          [name]:
            type ===
            "checkbox"
              ? checked
              : value,
        })
      )

    }


  /* ==================================================
     PEOPLE PRESETS
  ================================================== */

  const selectPeople =
    (
      type
    ) => {

      const presets = {

        jan: [
          "jan",
        ],

        jingjing: [
          "jingjing",
        ],

        together: [
          "jan",
          "jingjing",
          "together",
        ],

      }


      setForm(
        (
          current
        ) => ({
          ...current,

          people:
            presets[
              type
            ] ||
            [],
        })
      )

    }


  const selectedPeoplePreset =
    useMemo(
      () => {

        const values =
          form.people

        if (
          values.length ===
            1 &&
          values.includes(
            "jan"
          )
        ) {
          return "jan"
        }


        if (
          values.length ===
            1 &&
          values.includes(
            "jingjing"
          )
        ) {
          return "jingjing"
        }


        if (
          values.includes(
            "jan"
          ) &&
          values.includes(
            "jingjing"
          )
        ) {
          return "together"
        }


        return ""

      },
      [
        form.people,
      ]
    )


  /* ==================================================
     UPLOAD
  ================================================== */

  const uploadImage =
    async (
      file
    ) => {

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        throw new Error(
          "Please select an image file."
        )

      }


      const maxSize =
        8 * 1024 * 1024


      if (
        file.size >
        maxSize
      ) {

        throw new Error(
          "Image must be smaller than 8 MB."
        )

      }


      const {
        base,
        extension,
      } =
        safeFilename(
          file.name
        )


      const random =
        typeof crypto !==
          "undefined" &&
        typeof crypto.randomUUID ===
          "function"
          ? crypto.randomUUID()
          : Math.random()
              .toString(36)
              .slice(2)


      const path =
        `photos/${Date.now()}-${random}-${base}.${extension}`


      const {
        error: uploadError,
      } =
        await supabase.storage
          .from(
            "gallery"
          )
          .upload(
            path,
            file,
            {
              cacheControl:
                "3600",

              upsert:
                false,

              contentType:
                file.type ||
                undefined,
            }
          )


      if (
        uploadError
      ) {

        throw uploadError

      }


      return path

    }


  /* ==================================================
     RESET
  ================================================== */

  const resetForm =
    () => {

      setForm(
        createEmptyForm()
      )

      setImageFile(
        null
      )

      setEditingId(
        null
      )

      setExistingImagePath(
        ""
      )

      setError(
        ""
      )

      setMessage(
        ""
      )

    }


  /* ==================================================
     SAVE
  ================================================== */

  const handleSubmit =
    async (
      event
    ) => {

      event.preventDefault()


      if (
        !editingId &&
        !imageFile
      ) {

        setError(
          "Select a photo first."
        )

        return

      }


      if (
        form.people.length ===
        0
      ) {

        setError(
          "Choose Jan, JingJing, or Together."
        )

        return

      }


      setSaving(
        true
      )

      setError(
        ""
      )

      setMessage(
        ""
      )


      let uploadedPath =
        ""


      try {

        let nextImagePath =
          existingImagePath


        if (
          imageFile
        ) {

          uploadedPath =
            await uploadImage(
              imageFile
            )


          nextImagePath =
            uploadedPath

        }


        const payload = {

          title:
            form.title.trim() ||
            null,

          alt_text:
            form.altText.trim() ||
            form.title.trim() ||
            "JanJingJing gallery photo",

          image_path:
            nextImagePath,

          people:
            form.people,

          category:
            form.category.trim() ||
            null,

          era:
            form.era.trim() ||
            null,

          photo_date:
            form.photoDate ||
            null,

          credit:
            form.credit.trim() ||
            null,

          source_url:
            form.sourceUrl.trim() ||
            null,

          sort_order:
            Number(
              form.sortOrder
            ) || 0,

          is_published:
            form.isPublished,

        }


        let databaseError =
          null


        if (
          editingId
        ) {

          const {
            error:
              updateError,
          } =
            await supabase
              .from(
                "gallery_photos"
              )
              .update(
                payload
              )
              .eq(
                "id",
                editingId
              )


          databaseError =
            updateError

        }

        else {

          const {
            error:
              insertError,
          } =
            await supabase
              .from(
                "gallery_photos"
              )
              .insert(
                payload
              )


          databaseError =
            insertError

        }


        if (
          databaseError
        ) {

          if (
            uploadedPath
          ) {

            await supabase.storage
              .from(
                "gallery"
              )
              .remove([
                uploadedPath,
              ])

          }


          throw databaseError

        }


        /*
         * If an edited photo received a replacement,
         * delete the previous Storage file only after
         * the database update succeeds.
         */

        if (
          editingId &&
          uploadedPath &&
          existingImagePath &&
          uploadedPath !==
            existingImagePath
        ) {

          const {
            error:
              cleanupError,
          } =
            await supabase.storage
              .from(
                "gallery"
              )
              .remove([
                existingImagePath,
              ])


          if (
            cleanupError
          ) {

            console.warn(
              "Old gallery image cleanup failed:",
              cleanupError
            )

          }

        }


        setMessage(
          editingId
            ? "Photo updated successfully."
            : "Photo added successfully."
        )


        setForm(
          createEmptyForm()
        )

        setImageFile(
          null
        )

        setEditingId(
          null
        )

        setExistingImagePath(
          ""
        )


        await loadPhotos()

      }

      catch (
        saveError
      ) {

        console.error(
          "Gallery save error:",
          saveError
        )


        setError(
          saveError?.message ||
          "Unable to save photo."
        )

      }

      finally {

        setSaving(
          false
        )

      }

    }


  /* ==================================================
     EDIT
  ================================================== */

  const handleEdit =
    (
      photo
    ) => {

      setEditingId(
        photo.id
      )

      setExistingImagePath(
        photo.image_path ||
        ""
      )

      setImageFile(
        null
      )


      setForm({

        title:
          photo.title ||
          "",

        altText:
          photo.alt_text ||
          "",

        people:
          Array.isArray(
            photo.people
          )
            ? photo.people
            : [],

        category:
          photo.category ||
          "",

        era:
          photo.era ||
          "",

        photoDate:
          photo.photo_date ||
          "",

        credit:
          photo.credit ||
          "",

        sourceUrl:
          photo.source_url ||
          "",

        sortOrder:
          photo.sort_order ??
          0,

        isPublished:
          Boolean(
            photo.is_published
          ),

      })


      setError(
        ""
      )

      setMessage(
        ""
      )


      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

    }


  /* ==================================================
     PUBLISH
  ================================================== */

  const togglePublished =
    async (
      photo
    ) => {

      setError(
        ""
      )


      const {
        error:
          updateError,
      } =
        await supabase
          .from(
            "gallery_photos"
          )
          .update({
            is_published:
              !photo.is_published,
          })
          .eq(
            "id",
            photo.id
          )


      if (
        updateError
      ) {

        setError(
          "Unable to change publication status."
        )

        return

      }


      await loadPhotos()

    }


  /* ==================================================
     DELETE
  ================================================== */

  const handleDelete =
    async (
      photo
    ) => {

      const confirmed =
        window.confirm(
          `Delete "${photo.title || "this photo"}"? This cannot be undone.`
        )


      if (
        !confirmed
      ) {
        return
      }


      setError(
        ""
      )

      setMessage(
        ""
      )


      const {
        error:
          deleteError,
      } =
        await supabase
          .from(
            "gallery_photos"
          )
          .delete()
          .eq(
            "id",
            photo.id
          )


      if (
        deleteError
      ) {

        setError(
          "Unable to delete this photo."
        )

        return

      }


      if (
        photo.image_path
      ) {

        const {
          error:
            storageError,
        } =
          await supabase.storage
            .from(
              "gallery"
            )
            .remove([
              photo.image_path,
            ])


        if (
          storageError
        ) {

          console.warn(
            "Photo deleted, but Storage cleanup failed:",
            storageError
          )

        }

      }


      if (
        editingId ===
        photo.id
      ) {

        resetForm()

      }


      setMessage(
        "Photo deleted."
      )


      await loadPhotos()

    }


  /* ==================================================
     LOGOUT
  ================================================== */

  const handleLogout =
    async () => {

      await supabase.auth.signOut()

      navigate(
        "/admin/login",
        {
          replace: true,
        }
      )

    }


  /* ==================================================
     PAGE
  ================================================== */

  return (

    <main className="admin-gallery">

      <aside className="admin-gallery-sidebar">

        <div>

          <button
            type="button"
            className="admin-gallery-brand"
            onClick={() =>
              navigate(
                "/admin"
              )
            }
          >

            <span>
              ♡
            </span>

            <div>

              <strong>
                JANJINGJING
              </strong>

              <small>
                ARCHIVE ADMIN
              </small>

            </div>

          </button>


          <nav className="admin-gallery-nav">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin"
                )
              }
            >
              <span>
                00
              </span>
              Dashboard
            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/schedule"
                )
              }
            >
              <span>
                01
              </span>
              Schedule
            </button>


            <button
              type="button"
              className="is-active"
            >
              <span>
                02
              </span>
              Gallery
            </button>

            {/* FAN PULSE */}

            <button
              type="button"
              className="admin-sidebar__link"
              onClick={() =>
                navigate(
                  "/admin/fan-pulse"
                )
              }
            >

              <span>
                03
              </span>

              Fan Pulse

            </button>

          </nav>

        </div>


        <div className="admin-gallery-sidebar__bottom">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/gallery"
              )
            }
          >
            VIEW PUBLIC GALLERY ↗
          </button>

          <button
            type="button"
            onClick={
              handleLogout
            }
          >
            SIGN OUT
          </button>

        </div>

      </aside>


      <section className="admin-gallery-main">

        <header className="admin-gallery-header">

          <div>

            <p>
              02 / GALLERY MANAGER
            </p>

            <h1>
              Photos &
              <span>
                memories.
              </span>
            </h1>

          </div>

          <p>
            Upload and organize Jan, JingJing,
            and couple photos without editing
            the gallery source code.
          </p>

        </header>


        {message && (

          <p className="admin-gallery-message is-success">
            {message}
          </p>

        )}


        {error && (

          <p className="admin-gallery-message is-error">
            {error}
          </p>

        )}


        {/* ==================================================
            EDITOR
        ================================================== */}

        <section className="admin-gallery-editor">

          <div className="admin-gallery-section-title">

            <div>

              <p>
                {
                  editingId
                    ? "EDIT PHOTO"
                    : "NEW PHOTO"
                }
              </p>

              <h2>
                {
                  editingId
                    ? "Update gallery entry"
                    : "Add to the archive"
                }
              </h2>

            </div>


            {editingId && (

              <button
                type="button"
                onClick={
                  resetForm
                }
              >
                CANCEL EDIT
              </button>

            )}

          </div>


          <form
            className="admin-gallery-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* IMAGE */}

            <div className="admin-gallery-upload admin-gallery-wide">

              <span className="admin-gallery-label">
                PHOTO *
              </span>


              <div className="admin-gallery-upload__box">

                <div className="admin-gallery-upload__preview">

                  {previewUrl ? (

                    <img
                      src={
                        previewUrl
                      }
                      alt="Gallery preview"
                    />

                  ) : (

                    <div>
                      <span>
                        ♡
                      </span>

                      <p>
                        IMAGE PREVIEW
                      </p>
                    </div>

                  )}

                </div>


                <div className="admin-gallery-upload__controls">

                  <label>

                    SELECT IMAGE

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        (
                          event
                        ) =>
                          setImageFile(
                            event
                              .target
                              .files?.[0] ||
                            null
                          )
                      }
                    />

                  </label>


                  {imageFile && (

                    <p>
                      {imageFile.name}
                    </p>

                  )}


                  {editingId &&
                    existingImagePath &&
                    !imageFile && (

                    <p>
                      Existing image will be kept.
                    </p>

                  )}


                  <small>
                    JPG, PNG or WebP · max 8 MB
                  </small>

                </div>

              </div>

            </div>


            {/* PEOPLE */}

            <fieldset className="admin-gallery-people admin-gallery-wide">

              <legend>
                WHO IS IN THE PHOTO?
              </legend>


              <button
                type="button"
                className={
                  selectedPeoplePreset ===
                  "jan"
                    ? "is-selected"
                    : ""
                }
                onClick={() =>
                  selectPeople(
                    "jan"
                  )
                }
              >
                💜 JAN
              </button>


              <button
                type="button"
                className={
                  selectedPeoplePreset ===
                  "jingjing"
                    ? "is-selected"
                    : ""
                }
                onClick={() =>
                  selectPeople(
                    "jingjing"
                  )
                }
              >
                🎀 JINGJING
              </button>


              <button
                type="button"
                className={
                  selectedPeoplePreset ===
                  "together"
                    ? "is-selected"
                    : ""
                }
                onClick={() =>
                  selectPeople(
                    "together"
                  )
                }
              >
                ♡ TOGETHER
              </button>

            </fieldset>


            {/* TITLE */}

            <label className="admin-gallery-field">

              <span>
                TITLE
              </span>

              <input
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                placeholder="FANDAY in Vietnam"
              />

            </label>


            {/* DATE */}

            <label className="admin-gallery-field">

              <span>
                PHOTO DATE
              </span>

              <input
                type="date"
                name="photoDate"
                value={
                  form.photoDate
                }
                onChange={
                  handleChange
                }
              />

            </label>


            {/* CATEGORY */}

            <label className="admin-gallery-field">

              <span>
                CATEGORY
              </span>

              <input
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                placeholder="Fan Meeting"
              />

            </label>


            {/* ERA */}

            <label className="admin-gallery-field">

              <span>
                ERA
              </span>

              <input
                name="era"
                value={
                  form.era
                }
                onChange={
                  handleChange
                }
                placeholder="Enemies With Benefits"
              />

            </label>


            {/* ALT TEXT */}

            <label className="admin-gallery-field admin-gallery-wide">

              <span>
                ALT TEXT
              </span>

              <input
                name="altText"
                value={
                  form.altText
                }
                onChange={
                  handleChange
                }
                placeholder="Describe what appears in the photo"
              />

            </label>


            {/* CREDIT */}

            <label className="admin-gallery-field">

              <span>
                CREDIT
              </span>

              <input
                name="credit"
                value={
                  form.credit
                }
                onChange={
                  handleChange
                }
                placeholder="GMMTV"
              />

            </label>


            {/* SORT */}

            <label className="admin-gallery-field">

              <span>
                SORT ORDER
              </span>

              <input
                type="number"
                name="sortOrder"
                value={
                  form.sortOrder
                }
                onChange={
                  handleChange
                }
                min="0"
              />

            </label>


            {/* SOURCE */}

            <label className="admin-gallery-field admin-gallery-wide">

              <span>
                SOURCE URL
              </span>

              <input
                type="url"
                name="sourceUrl"
                value={
                  form.sourceUrl
                }
                onChange={
                  handleChange
                }
                placeholder="https://..."
              />

            </label>


            {/* PUBLISH */}

            <label className="admin-gallery-publish admin-gallery-wide">

              <input
                type="checkbox"
                name="isPublished"
                checked={
                  form.isPublished
                }
                onChange={
                  handleChange
                }
              />

              <span className="admin-gallery-publish__switch" />

              <div>

                <strong>
                  PUBLISH PHOTO
                </strong>

                <small>
                  Published photos can appear on the public gallery.
                </small>

              </div>

            </label>


            {/* ACTIONS */}

            <div className="admin-gallery-actions admin-gallery-wide">

              <button
                type="submit"
                disabled={
                  saving
                }
              >

                {
                  saving
                    ? "SAVING..."
                    : editingId
                      ? "SAVE CHANGES"
                      : "ADD PHOTO"
                }

                {!saving && (
                  <span>
                    →
                  </span>
                )}

              </button>


              <button
                type="button"
                className="is-secondary"
                onClick={
                  resetForm
                }
                disabled={
                  saving
                }
              >
                CLEAR
              </button>

            </div>

          </form>

        </section>


        {/* ==================================================
            LIBRARY
        ================================================== */}

        <section className="admin-gallery-library">

          <div className="admin-gallery-section-title">

            <div>

              <p>
                PHOTO DATABASE
              </p>

              <h2>
                Gallery library
              </h2>

            </div>

            <span>
              {photos.length} TOTAL
            </span>

          </div>


          {loading ? (

            <div className="admin-gallery-empty">
              Loading gallery...
            </div>

          ) : photos.length === 0 ? (

            <div className="admin-gallery-empty">

              <strong>
                No Supabase photos yet.
              </strong>

              <span>
                Upload your first photo above.
              </span>

            </div>

          ) : (

            <div className="admin-gallery-grid">

              {photos.map(
                (
                  photo
                ) => (

                  <article
                    key={
                      photo.id
                    }
                    className="admin-gallery-card"
                  >

                    <div className="admin-gallery-card__image">

                      <img
                        src={
                          getPublicPhotoUrl(
                            photo.image_path
                          )
                        }
                        alt={
                          photo.alt_text ||
                          photo.title ||
                          ""
                        }
                        loading="lazy"
                      />

                      <span
                        className={
                          photo.is_published
                            ? "is-published"
                            : "is-draft"
                        }
                      >
                        {
                          photo.is_published
                            ? "PUBLISHED"
                            : "DRAFT"
                        }
                      </span>

                    </div>


                    <div className="admin-gallery-card__content">

                      <div className="admin-gallery-card__people">

                        {(
                          photo.people ||
                          []
                        ).map(
                          (
                            person
                          ) => (

                            <span
                              key={
                                person
                              }
                            >
                              {
                                person
                              }
                            </span>

                          )
                        )}

                      </div>


                      <h3>
                        {
                          photo.title ||
                          "Untitled Photo"
                        }
                      </h3>


                      {(photo.category ||
                        photo.era) && (

                        <p>

                          {[
                            photo.category,
                            photo.era,
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              " · "
                            )}

                        </p>

                      )}


                      {photo.credit && (

                        <small>
                          CREDIT · {photo.credit}
                        </small>

                      )}


                      <div className="admin-gallery-card__actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              photo
                            )
                          }
                        >
                          EDIT
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            togglePublished(
                              photo
                            )
                          }
                        >

                          {
                            photo.is_published
                              ? "UNPUBLISH"
                              : "PUBLISH"
                          }

                        </button>


                        <button
                          type="button"
                          className="is-danger"
                          onClick={() =>
                            handleDelete(
                              photo
                            )
                          }
                        >
                          DELETE
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>


        <footer className="admin-gallery-footer">

          <span>
            JANJINGJING
          </span>

          <span>
            GALLERY MANAGER ♡
          </span>

        </footer>

      </section>

    </main>

  )

}


export default AdminGallery