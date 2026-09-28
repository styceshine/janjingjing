import {
  useEffect,
  useState,
} from "react"

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"


import FloatingFanPulse from "./components/FloatingFanPulse"
import AdminFanPulse from "./pages/admin/AdminFanPulse"

import ScrollToTop from "./components/ScrollToTop"


import Home from "./pages/Home"
import Jan from "./pages/Jan"
import JingJing from "./pages/JingJing"
import Together from "./pages/Together"
import Works from "./pages/Works"
import Gallery from "./pages/Gallery"
import Schedule from "./pages/Schedule"


import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminSchedule from "./pages/admin/AdminSchedule"
import AdminGallery from "./pages/admin/AdminGallery"




import {
  supabase,
} from "./lib/supabase"


/* ==================================================
   PROTECTED ADMIN ROUTE
================================================== */

function ProtectedAdminRoute({
  children,
}) {

  const [
    loading,
    setLoading,
  ] =
    useState(true)


  const [
    allowed,
    setAllowed,
  ] =
    useState(false)


  useEffect(
    () => {

      let active =
        true


      const checkAdmin =
        async () => {

          try {

            /* ==========================================
               AUTH SESSION
            ========================================== */

            const {
              data: {
                session,
              },
              error: sessionError,
            } =
              await supabase.auth.getSession()


            if (
              sessionError
            ) {

              throw sessionError

            }


            if (
              !session?.user
            ) {

              if (
                active
              ) {

                setAllowed(
                  false
                )

                setLoading(
                  false
                )

              }


              return

            }


            /* ==========================================
               VERIFY ADMIN
            ========================================== */

            const {
              data: adminRecord,
              error: adminError,
            } =
              await supabase
                .from(
                  "admin_users"
                )
                .select(
                  "user_id"
                )
                .eq(
                  "user_id",
                  session.user.id
                )
                .maybeSingle()


            if (
              adminError
            ) {

              throw adminError

            }


            if (
              active
            ) {

              setAllowed(
                Boolean(
                  adminRecord
                )
              )

              setLoading(
                false
              )

            }

          }

          catch (
            error
          ) {

            console.error(
              "Admin authorization error:",
              error
            )


            if (
              active
            ) {

              setAllowed(
                false
              )

              setLoading(
                false
              )

            }

          }

        }


      checkAdmin()


      /* ==============================================
         WATCH AUTH CHANGES
      ============================================== */

      const {
        data: authListener,
      } =
        supabase.auth.onAuthStateChange(
          () => {

            checkAdmin()

          }
        )


      return () => {

        active =
          false


        authListener
          .subscription
          .unsubscribe()

      }

    },
    []
  )


  /* ==================================================
     LOADING
  ================================================== */

  if (
    loading
  ) {

    return (

      <main
        style={{
          minHeight:
            "100vh",

          display:
            "grid",

          placeItems:
            "center",

          background:
            "#fff9f7",

          fontFamily:
            '"DM Sans", sans-serif',

          color:
            "#766d78",

          letterSpacing:
            "0.12em",

          fontSize:
            "0.65rem",

          fontWeight:
            700,
        }}
      >
        CHECKING ADMIN ACCESS...
      </main>

    )

  }


  /* ==================================================
     NOT ADMIN
  ================================================== */

  if (
    !allowed
  ) {

    return (

      <Navigate
        to="/admin/login"
        replace
      />

    )

  }


  /* ==================================================
     ADMIN VERIFIED
  ================================================== */

  return children

}


/* ==================================================
   APP
================================================== */

function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />


      <Routes>


        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        <Route
          path="/"
          element={
            <Home />
          }
        />


        <Route
          path="/jan"
          element={
            <Jan />
          }
        />


        <Route
          path="/jingjing"
          element={
            <JingJing />
          }
        />


        <Route
          path="/together"
          element={
            <Together />
          }
        />


        <Route
          path="/works"
          element={
            <Works />
          }
        />


        <Route
          path="/gallery"
          element={
            <Gallery />
          }
        />


        <Route
          path="/schedule"
          element={
            <Schedule />
          }
        />


        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />


        {/* ==================================================
            ADMIN DASHBOARD
        ================================================== */}

        <Route

          path="/admin"

          element={

            <ProtectedAdminRoute>

              <AdminDashboard />

            </ProtectedAdminRoute>

          }

        />


        {/* ==================================================
            ADMIN SCHEDULE
        ================================================== */}

        <Route

          path="/admin/schedule"

          element={

            <ProtectedAdminRoute>

              <AdminSchedule />

            </ProtectedAdminRoute>

          }

        />







        {/* ==================================================
        ADMIN GALLERY
        ================================================== */}

        <Route
          path="/admin/gallery"
          element={
          <ProtectedAdminRoute>
            <AdminGallery />
          </ProtectedAdminRoute>
          }
        />





        {/* ==================================================
          ADMIN FAN PULSE
      ================================================== */}

        <Route
          path="/admin/fan-pulse"
          element={
            <ProtectedAdminRoute>

              <AdminFanPulse />

            </ProtectedAdminRoute>
          }
        />


      </Routes>


      <FloatingFanPulse />

    

    </BrowserRouter>

  )

}


export default App