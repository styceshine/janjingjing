// src/lib/supabase.js

import {
  createClient,
} from "@supabase/supabase-js";


const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;


const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;




/*console.log("SUPABASE ENV CHECK", {
hasUrl: Boolean(import.meta.env.VITE_SUPABASE_URL),
hasKey: Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY),
mode: import.meta.env.MODE,
}); */


/* ==================================================
   ENVIRONMENT CHECK
================================================== */

if (
  !supabaseUrl ||
  !supabasePublishableKey
) {
  throw new Error(
    "Supabase environment variables are missing. Check .env.local."
  );
}


/* ==================================================
   SUPABASE CLIENT
================================================== */

export const supabase =
  createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );