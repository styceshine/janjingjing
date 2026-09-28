import {
  useEffect,
  useState,
} from "react"

import {
  NavLink,
  useLocation,
} from "react-router-dom"


function Navbar() {

  const location =
    useLocation()


  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(false)


  /* ==================================================
     CLOSE MENU WHEN PAGE CHANGES
  ================================================== */

  useEffect(
    () => {

      setMenuOpen(false)

    },
    [
      location.pathname,
    ]
  )


  /* ==================================================
     ESCAPE KEY
  ================================================== */

  useEffect(
    () => {

      if (!menuOpen) {
        return
      }


      const handleEscape =
        (event) => {

          if (
            event.key === "Escape"
          ) {

            setMenuOpen(false)

          }

        }


      window.addEventListener(
        "keydown",
        handleEscape
      )


      return () => {

        window.removeEventListener(
          "keydown",
          handleEscape
        )

      }

    },
    [
      menuOpen,
    ]
  )


  return (

    <header
      className={[
        "navbar",

        menuOpen
          ? "is-menu-open"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      {/* ==================================================
          LOGO
      ================================================== */}

      <NavLink
        to="/"
        end
        className="brand-logo"
        aria-label="JanJingJing Home"
        onClick={() =>
          setMenuOpen(false)
        }
      >

        <img
          src="/images/logo/jjj-logo.png"
          alt="JanJingJing"
        />

      </NavLink>


      {/* ==================================================
          DESKTOP / MOBILE LINKS
      ================================================== */}

      <nav
        id="main-navigation"
        className="nav-links"
        aria-label="Main navigation"
      >

        <NavLink
          to="/"
          end
        >
          Home
        </NavLink>


        <NavLink to="/jan">
          Jan
        </NavLink>


        <NavLink to="/jingjing">
          JingJing
        </NavLink>


        <NavLink to="/together">
          Together
        </NavLink>


        <NavLink to="/gallery">
          Gallery
        </NavLink>


        <NavLink to="/schedule">
          Schedule
        </NavLink>


        {/* ==================================================
            MOBILE TAG
        ================================================== */}

        <div className="nav-mobile-tag">

          <span>
            a small place
          </span>

          <strong>
            for a big love ♡
          </strong>

        </div>

      </nav>


      {/* ==================================================
          DESKTOP TAG
      ================================================== */}

      <div className="nav-tag">

        a small place

        <span>
          for a big love ♡
        </span>

      </div>


      {/* ==================================================
          MOBILE MENU BUTTON
      ================================================== */}

      <button
        type="button"
        className="nav-menu-toggle"

        aria-label={
          menuOpen
            ? "Close navigation"
            : "Open navigation"
        }

        aria-expanded={
          menuOpen
        }

        aria-controls="main-navigation"

        onClick={() =>
          setMenuOpen(
            (current) =>
              !current
          )
        }
      >

        <span />
        <span />
        <span />

      </button>

    </header>

  )

}


export default Navbar