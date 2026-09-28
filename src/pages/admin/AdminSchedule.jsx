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

import "../../styles/pages/AdminSchedule.css"


/* ==================================================
   DEFAULT FORM
================================================== */

const createEmptyForm =
  () => ({
    title: "",
    description: "",
    type: "",
    startAt: "",
    endAt: "",
    venue: "",
    city: "",
    country: "",
    sourceUrl: "",
    status: "scheduled",
    isPublished: true,
    participants: [
      "Jan",
      "JingJing",
    ],
  })


/* ==================================================
   HELPERS
================================================== */

const toLocalInputValue =
  (value) => {

    if (
      !value
    ) {
      return ""
    }


    const date =
      new Date(value)


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return ""
    }


    const offset =
      date.getTimezoneOffset()


    const local =
      new Date(
        date.getTime() -
        offset * 60 * 1000
      )


    return local
      .toISOString()
      .slice(
        0,
        16
      )

  }


const formatDateTime =
  (value) => {

    if (
      !value
    ) {
      return "DATE TBA"
    }


    const date =
      new Date(value)


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "DATE TBA"
    }


    return new Intl.DateTimeFormat(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(date)

  }


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
        ) || "poster"


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


const getPublicPosterUrl =
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
          "schedule"
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

function AdminSchedule() {

  const navigate =
    useNavigate()


  const [
    events,
    setEvents,
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
    posterFile,
    setPosterFile,
  ] =
    useState(null)


  const [
    editingId,
    setEditingId,
  ] =
    useState(null)


  const [
    existingPosterPath,
    setExistingPosterPath,
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
    message,
    setMessage,
  ] =
    useState("")


  const [
    error,
    setError,
  ] =
    useState("")


  /* ==================================================
     LOCAL POSTER PREVIEW
  ================================================== */

  const localPosterPreview =
    useMemo(
      () => {

        if (
          !posterFile
        ) {
          return ""
        }


        return URL.createObjectURL(
          posterFile
        )

      },
      [
        posterFile,
      ]
    )


  useEffect(
    () => {

      return () => {

        if (
          localPosterPreview
        ) {

          URL.revokeObjectURL(
            localPosterPreview
          )

        }

      }

    },
    [
      localPosterPreview,
    ]
  )


  const posterPreview =
    localPosterPreview ||
    getPublicPosterUrl(
      existingPosterPath
    )


  /* ==================================================
     LOAD EVENTS
  ================================================== */

  const loadEvents =
    useCallback(
      async () => {

        setLoading(true)

        setError("")


        const {
          data,
          error: loadError,
        } =
          await supabase
            .from(
              "events"
            )
            .select("*")
            .order(
              "start_at",
              {
                ascending:
                  false,
              }
            )


        if (
          loadError
        ) {

          console.error(
            "Schedule load error:",
            loadError
          )

          setError(
            "Unable to load schedule events."
          )

          setLoading(false)

          return

        }


        setEvents(
          data ||
          []
        )

        setLoading(false)

      },
      []
    )


  useEffect(
    () => {

      loadEvents()

    },
    [
      loadEvents,
    ]
  )


  /* ==================================================
     FORM CHANGE
  ================================================== */

  const handleChange =
    (event) => {

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
     PARTICIPANTS
  ================================================== */

  const toggleParticipant =
    (name) => {

      setForm(
        (
          current
        ) => {

          const exists =
            current.participants.includes(
              name
            )


          return {
            ...current,

            participants:
              exists
                ? current.participants.filter(
                    (
                      participant
                    ) =>
                      participant !==
                      name
                  )
                : [
                    ...current.participants,
                    name,
                  ],
          }

        }
      )

    }


  /* ==================================================
     UPLOAD POSTER
  ================================================== */

  const uploadPoster =
    async (
      file
    ) => {

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
        `events/${Date.now()}-${random}-${base}.${extension}`


      const {
        error: uploadError,
      } =
        await supabase.storage
          .from(
            "schedule"
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

      setPosterFile(
        null
      )

      setEditingId(
        null
      )

      setExistingPosterPath(
        ""
      )

      setError("")

      setMessage("")

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
        !form.title.trim()
      ) {

        setError(
          "Event title is required."
        )

        return

      }


      if (
        !form.startAt
      ) {

        setError(
          "Start date and time are required."
        )

        return

      }


      setSaving(true)

      setError("")

      setMessage("")


      let uploadedPath =
        ""


      try {

        let nextImagePath =
          existingPosterPath ||
          null


        if (
          posterFile
        ) {

          uploadedPath =
            await uploadPoster(
              posterFile
            )


          nextImagePath =
            uploadedPath

        }


        const payload = {

          title:
            form.title.trim(),

          description:
            form.description.trim() ||
            null,

          type:
            form.type.trim() ||
            null,

          start_at:
            new Date(
              form.startAt
            ).toISOString(),

          end_at:
            form.endAt
              ? new Date(
                  form.endAt
                ).toISOString()
              : null,

          venue:
            form.venue.trim() ||
            null,

          city:
            form.city.trim() ||
            null,

          country:
            form.country.trim() ||
            null,

          participants:
            form.participants,

          image_path:
            nextImagePath,

          source_url:
            form.sourceUrl.trim() ||
            null,

          status:
            form.status,

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
                "events"
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
                "events"
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

          /*
           * If the database save failed after a new
           * image was uploaded, remove that orphan file.
           */
          if (
            uploadedPath
          ) {

            await supabase.storage
              .from(
                "schedule"
              )
              .remove([
                uploadedPath,
              ])

          }


          throw databaseError

        }


        /*
         * Editing with a new poster:
         * the new database row is already safe,
         * so now remove the previous image.
         */
        if (
          editingId &&
          uploadedPath &&
          existingPosterPath &&
          uploadedPath !==
            existingPosterPath
        ) {

          await supabase.storage
            .from(
              "schedule"
            )
            .remove([
              existingPosterPath,
            ])

        }


        setMessage(
          editingId
            ? "Event updated successfully."
            : "Event added successfully."
        )


        setForm(
          createEmptyForm()
        )

        setPosterFile(
          null
        )

        setEditingId(
          null
        )

        setExistingPosterPath(
          ""
        )


        await loadEvents()

      }

      catch (
        saveError
      ) {

        console.error(
          "Schedule save error:",
          saveError
        )


        setError(
          saveError?.message ||
          "Unable to save event."
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
    (eventItem) => {

      setEditingId(
        eventItem.id
      )


      setExistingPosterPath(
        eventItem.image_path ||
        ""
      )


      setPosterFile(
        null
      )


      setForm({

        title:
          eventItem.title ||
          "",

        description:
          eventItem.description ||
          "",

        type:
          eventItem.type ||
          "",

        startAt:
          toLocalInputValue(
            eventItem.start_at
          ),

        endAt:
          toLocalInputValue(
            eventItem.end_at
          ),

        venue:
          eventItem.venue ||
          "",

        city:
          eventItem.city ||
          "",

        country:
          eventItem.country ||
          "",

        sourceUrl:
          eventItem.source_url ||
          "",

        status:
          eventItem.status ||
          "scheduled",

        isPublished:
          Boolean(
            eventItem.is_published
          ),

        participants:
          Array.isArray(
            eventItem.participants
          )
            ? eventItem.participants
            : [],

      })


      setMessage("")

      setError("")


      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      })

    }


  /* ==================================================
     DELETE
  ================================================== */

  const handleDelete =
    async (
      eventItem
    ) => {

      const confirmed =
        window.confirm(
          `Delete "${eventItem.title}"? This cannot be undone.`
        )


      if (
        !confirmed
      ) {
        return
      }


      setError("")

      setMessage("")


      const {
        error:
          deleteError,
      } =
        await supabase
          .from(
            "events"
          )
          .delete()
          .eq(
            "id",
            eventItem.id
          )


      if (
        deleteError
      ) {

        console.error(
          "Delete event error:",
          deleteError
        )

        setError(
          "Unable to delete this event."
        )

        return

      }


      if (
        eventItem.image_path
      ) {

        const {
          error:
            storageError,
        } =
          await supabase.storage
            .from(
              "schedule"
            )
            .remove([
              eventItem.image_path,
            ])


        if (
          storageError
        ) {

          console.warn(
            "Event deleted, but poster cleanup failed:",
            storageError
          )

        }

      }


      if (
        editingId ===
        eventItem.id
      ) {

        resetForm()

      }


      setMessage(
        "Event deleted."
      )


      await loadEvents()

    }


  /* ==================================================
     PUBLISH TOGGLE
  ================================================== */

  const togglePublished =
    async (
      eventItem
    ) => {

      const nextValue =
        !eventItem.is_published


      const {
        error:
          updateError,
      } =
        await supabase
          .from(
            "events"
          )
          .update({
            is_published:
              nextValue,
          })
          .eq(
            "id",
            eventItem.id
          )


      if (
        updateError
      ) {

        setError(
          "Unable to change publication status."
        )

        return

      }


      await loadEvents()

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

    <main className="admin-schedule">


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="admin-schedule-sidebar">

        <div>

          <button
            type="button"
            className="admin-schedule-brand"
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


          <nav className="admin-schedule-nav">

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
              className="is-active"
            >
              <span>
                01
              </span>

              Schedule
            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/gallery"
                )
              }
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


        <div className="admin-schedule-sidebar__bottom">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/schedule"
              )
            }
          >
            VIEW PUBLIC SCHEDULE ↗
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


      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="admin-schedule-main">


        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="admin-schedule-header">

          <div>

            <p>
              01 / SCHEDULE MANAGER
            </p>

            <h1>
              Events &
              <span>
                appearances.
              </span>
            </h1>

          </div>


          <p>
            Create and manage public schedule entries
            without editing the website code.
          </p>

        </header>


        {/* ==================================================
            MESSAGE
        ================================================== */}

        {message && (

          <p className="admin-schedule-message is-success">
            {message}
          </p>

        )}


        {error && (

          <p className="admin-schedule-message is-error">
            {error}
          </p>

        )}


        {/* ==================================================
            EDITOR
        ================================================== */}

        <section className="admin-schedule-editor">

          <div className="admin-schedule-section-title">

            <div>

              <p>
                {
                  editingId
                    ? "EDIT EVENT"
                    : "NEW EVENT"
                }
              </p>

              <h2>
                {
                  editingId
                    ? "Update schedule entry"
                    : "Add to the schedule"
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
            className="admin-schedule-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* TITLE */}

            <label className="admin-field admin-field--wide">

              <span>
                EVENT TITLE *
              </span>

              <input
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                placeholder="GMMTV FANDAY 37 IN PARIS"
              />

            </label>


            {/* TYPE */}

            <label className="admin-field">

              <span>
                EVENT TYPE
              </span>

              <input
                name="type"
                value={
                  form.type
                }
                onChange={
                  handleChange
                }
                placeholder="FAN MEETING"
              />

            </label>


            {/* STATUS */}

            <label className="admin-field">

              <span>
                STATUS
              </span>

              <select
                name="status"
                value={
                  form.status
                }
                onChange={
                  handleChange
                }
              >

                <option value="scheduled">
                  Scheduled
                </option>

                <option value="postponed">
                  Postponed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

              </select>

            </label>


            {/* START */}

            <label className="admin-field">

              <span>
                START *
              </span>

              <input
                type="datetime-local"
                name="startAt"
                value={
                  form.startAt
                }
                onChange={
                  handleChange
                }
              />

            </label>


            {/* END */}

            <label className="admin-field">

              <span>
                END
              </span>

              <input
                type="datetime-local"
                name="endAt"
                value={
                  form.endAt
                }
                onChange={
                  handleChange
                }
              />

            </label>


            {/* VENUE */}

            <label className="admin-field admin-field--wide">

              <span>
                VENUE
              </span>

              <input
                name="venue"
                value={
                  form.venue
                }
                onChange={
                  handleChange
                }
                placeholder="Thunder Dome"
              />

            </label>


            {/* CITY */}

            <label className="admin-field">

              <span>
                CITY
              </span>

              <input
                name="city"
                value={
                  form.city
                }
                onChange={
                  handleChange
                }
                placeholder="Bangkok"
              />

            </label>


            {/* COUNTRY */}

            <label className="admin-field">

              <span>
                COUNTRY
              </span>

              <input
                name="country"
                value={
                  form.country
                }
                onChange={
                  handleChange
                }
                placeholder="Thailand"
              />

            </label>


            {/* PARTICIPANTS */}

            <fieldset className="admin-participants">

              <legend>
                PARTICIPANTS
              </legend>


              {[
                "Jan",
                "JingJing",
                "Kapook",
                "Ciize",
              ].map(
                (
                  name
                ) => (

                  <button
                    key={
                      name
                    }
                    type="button"
                    className={
                      form.participants.includes(
                        name
                      )
                        ? "is-selected"
                        : ""
                    }
                    onClick={() =>
                      toggleParticipant(
                        name
                      )
                    }
                  >
                    {
                      name
                    }
                  </button>

                )
              )}

            </fieldset>


            {/* DESCRIPTION */}

            <label className="admin-field admin-field--wide">

              <span>
                DESCRIPTION
              </span>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                rows="5"
                placeholder="Short event description..."
              />

            </label>


            {/* SOURCE */}

            <label className="admin-field admin-field--wide">

              <span>
                OFFICIAL SOURCE URL
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


            {/* POSTER */}

            <div className="admin-poster-field admin-field--wide">

              <span>
                EVENT POSTER
              </span>


              <div className="admin-poster-box">

                <div className="admin-poster-preview">

                  {posterPreview ? (

                    <img
                      src={
                        posterPreview
                      }
                      alt="Event poster preview"
                    />

                  ) : (

                    <span>
                      NO POSTER
                    </span>

                  )}

                </div>


                <div className="admin-poster-controls">

                  <label>

                    <span>
                      SELECT IMAGE
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        (
                          event
                        ) =>
                          setPosterFile(
                            event
                              .target
                              .files?.[0] ||
                            null
                          )
                      }
                    />

                  </label>


                  {posterFile && (

                    <p>
                      {
                        posterFile.name
                      }
                    </p>

                  )}


                  {existingPosterPath &&
                    !posterFile && (

                    <p>
                      Existing poster will be kept.
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* PUBLISHED */}

            <label className="admin-publish-toggle admin-field--wide">

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

              <span className="admin-publish-toggle__control" />

              <div>

                <strong>
                  PUBLISH EVENT
                </strong>

                <small>
                  When enabled, visitors can see this event.
                </small>

              </div>

            </label>


            {/* ACTION */}

            <div className="admin-schedule-actions admin-field--wide">

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
                      : "ADD EVENT"
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
            EVENT LIST
        ================================================== */}

        <section className="admin-schedule-list">

          <div className="admin-schedule-section-title">

            <div>

              <p>
                EVENT DATABASE
              </p>

              <h2>
                Saved events
              </h2>

            </div>


            <span>
              {
                events.length
              } TOTAL
            </span>

          </div>


          {loading ? (

            <div className="admin-schedule-empty">
              Loading events...
            </div>

          ) : events.length === 0 ? (

            <div className="admin-schedule-empty">

              <strong>
                No Supabase events yet.
              </strong>

              <span>
                Add your first event using the form above.
              </span>

            </div>

          ) : (

            <div className="admin-event-list">

              {events.map(
                (
                  eventItem
                ) => {

                  const imageUrl =
                    getPublicPosterUrl(
                      eventItem.image_path
                    )


                  return (

                    <article
                      key={
                        eventItem.id
                      }
                      className="admin-event-card"
                    >

                      <div className="admin-event-card__poster">

                        {imageUrl ? (

                          <img
                            src={
                              imageUrl
                            }
                            alt=""
                            loading="lazy"
                          />

                        ) : (

                          <span>
                            EVENT
                          </span>

                        )}

                      </div>


                      <div className="admin-event-card__content">

                        <div className="admin-event-card__meta">

                          <span
                            className={
                              `is-${eventItem.status}`
                            }
                          >
                            {
                              eventItem.status
                            }
                          </span>


                          <span>

                            {
                              eventItem.is_published
                                ? "PUBLISHED"
                                : "DRAFT"
                            }

                          </span>

                        </div>


                        <h3>
                          {
                            eventItem.title
                          }
                        </h3>


                        <p>
                          {
                            formatDateTime(
                              eventItem.start_at
                            )
                          }
                        </p>


                        {(eventItem.venue ||
                          eventItem.city ||
                          eventItem.country) && (

                          <span className="admin-event-card__location">

                            {[
                              eventItem.venue,
                              eventItem.city,
                              eventItem.country,
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " • "
                              )}

                          </span>

                        )}


                        {Array.isArray(
                          eventItem.participants
                        ) &&
                          eventItem.participants.length >
                            0 && (

                          <div className="admin-event-card__people">

                            {eventItem.participants.map(
                              (
                                participant
                              ) => (

                                <span
                                  key={
                                    participant
                                  }
                                >
                                  {
                                    participant
                                  }
                                </span>

                              )
                            )}

                          </div>

                        )}

                      </div>


                      <div className="admin-event-card__actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              eventItem
                            )
                          }
                        >
                          EDIT
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            togglePublished(
                              eventItem
                            )
                          }
                        >

                          {
                            eventItem.is_published
                              ? "UNPUBLISH"
                              : "PUBLISH"
                          }

                        </button>


                        <button
                          type="button"
                          className="is-danger"
                          onClick={() =>
                            handleDelete(
                              eventItem
                            )
                          }
                        >
                          DELETE
                        </button>

                      </div>

                    </article>

                  )

                }
              )}

            </div>

          )}

        </section>


        <footer className="admin-schedule-footer">

          <span>
            JANJINGJING
          </span>

          <span>
            SCHEDULE MANAGER ♡
          </span>

        </footer>

      </section>

    </main>

  )

}


export default AdminSchedule