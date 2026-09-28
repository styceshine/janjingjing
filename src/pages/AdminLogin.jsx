import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  supabase,
} from "../lib/supabase";

import "../styles/pages/AdminLogin.css";


function AdminLogin() {

  const navigate =
    useNavigate();


  const [
    email,
    setEmail,
  ] =
    useState("");


  const [
    password,
    setPassword,
  ] =
    useState("");


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    loading,
    setLoading,
  ] =
    useState(false);


  /* ==================================================
     LOGIN
  ================================================== */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      if (
        !email.trim() ||
        !password
      ) {

        setError(
          "Enter your email and password."
        );

        return;

      }


      setLoading(true);

      setError("");


      try {

        /* ==============================================
           SIGN IN WITH SUPABASE AUTH
        ============================================== */

        const {
          data,
          error: signInError,
        } =
          await supabase.auth.signInWithPassword({
            email:
              email.trim(),

            password,
          });


        if (
          signInError
        ) {

          throw signInError;

        }


        const user =
          data.user;


        if (
          !user
        ) {

          throw new Error(
            "Unable to verify this account."
          );

        }


        /* ==============================================
           CHECK ADMIN TABLE

           Signing in alone is NOT enough.

           The user's UUID must also exist inside:
           public.admin_users
        ============================================== */

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
              user.id
            )
            .maybeSingle();


        if (
          adminError
        ) {

          throw adminError;

        }


        if (
          !adminRecord
        ) {

          await supabase.auth.signOut();


          throw new Error(
            "This account does not have administrator access."
          );

        }


        /* ==============================================
           SUCCESS

           /admin will be created in our next step.
        ============================================== */

        navigate(
          "/admin",
          {
            replace: true,
          }
        );

      }

      catch (loginError) {

        console.error(
          "Admin login error:",
          loginError
        );


        if (
          loginError?.message ===
          "Invalid login credentials"
        ) {

          setError(
            "Incorrect email or password."
          );

        }

        else {

          setError(
            loginError?.message ||
            "Unable to sign in."
          );

        }

      }

      finally {

        setLoading(false);

      }

    };


  /* ==================================================
     PAGE
  ================================================== */

  return (

    <main className="admin-login-page">

      {/* ==============================================
          DECORATIVE BACKGROUND
      ============================================== */}

      <div
        className="admin-login-glow admin-login-glow--purple"
        aria-hidden="true"
      />

      <div
        className="admin-login-glow admin-login-glow--pink"
        aria-hidden="true"
      />


      {/* ==============================================
          LOGIN CARD
      ============================================== */}

      <section
        className="admin-login-card"
        aria-labelledby="admin-login-title"
      >

        <div className="admin-login-brand">

          <span className="admin-login-brand__mark">
            ♡
          </span>


          <div>

            <p>
              JANJINGJING
            </p>

            <span>
              PRIVATE ARCHIVE
            </span>

          </div>

        </div>


        <div className="admin-login-heading">

          <p className="admin-login-eyebrow">
            ADMIN ACCESS
          </p>


          <h1
            id="admin-login-title"
          >
            Welcome
            <span>
              back.
            </span>
          </h1>


          <p className="admin-login-description">
            Sign in to manage the JanJingJing archive,
            schedule, gallery, and site content.
          </p>

        </div>


        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          {/* ============================================
              EMAIL
          ============================================ */}

          <label className="admin-login-field">

            <span>
              EMAIL
            </span>


            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="admin@example.com"
              autoComplete="email"
              disabled={loading}
            />

          </label>


          {/* ============================================
              PASSWORD
          ============================================ */}

          <label className="admin-login-field">

            <span>
              PASSWORD
            </span>


            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />

          </label>


          {/* ============================================
              ERROR
          ============================================ */}

          {error && (

            <p
              className="admin-login-error"
              role="alert"
            >
              {error}
            </p>

          )}


          {/* ============================================
              SUBMIT
          ============================================ */}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >

            <span>

              {
                loading
                  ? "SIGNING IN..."
                  : "ENTER ADMIN"
              }

            </span>


            {!loading && (
              <span aria-hidden="true">
                →
              </span>
            )}

          </button>

        </form>


        <div className="admin-login-footer">

          <span>
            PRIVATE ACCESS ONLY
          </span>


          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
          >
            ← BACK TO ARCHIVE
          </button>

        </div>

      </section>

    </main>

  );

}


export default AdminLogin;