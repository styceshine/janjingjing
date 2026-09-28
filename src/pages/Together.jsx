import Navbar from "../components/Navbar"
import TogetherFeatured from "../components/TogetherFeatured"
import TogetherStory from "../components/TogetherStory"
import TogetherMediaArchive from "../components/TogetherMediaArchive"
import TogetherFandomCulture from "../components/TogetherFandomCulture"
import TogetherPairPassport from "../components/TogetherPairPassport"
import FanPulse from "../components/FanPulse"
import Footer from "../components/Footer"


function Together() {

  return (
    <>

      <Navbar />


      <main className="together-page">

        {/* 00 — FEATURED */}
        <TogetherFeatured />

        {/* 01 — THEIR STORY */}
        <TogetherStory />

        {/* 02 — MEDIA ARCHIVE */}
        <TogetherMediaArchive />

        {/* 04 — FANDOM CULTURE */}
        <TogetherFandomCulture />

        {/* 05 — PAIR PASSPORT */}
        <TogetherPairPassport />

        {/* 06 — FAN PULSE */}
        <FanPulse />

      </main>


      <Footer />

    </>
  )

}


export default Together