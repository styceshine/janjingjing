import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import TheGirls from "../components/TheGirls"
import FeaturedWork from "../components/FeaturedWork" 
import Milestones from "../components/Milestones"
import PhotoDiary from "../components/PhotoDiary"
import UpdatesSchedule from "../components/UpdatesSchedule"
import Footer from "../components/Footer"


function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TheGirls />
        <FeaturedWork />
        <Milestones />
        <PhotoDiary />
        <UpdatesSchedule />
        <Footer />
      </main>
    </>
  )
}

export default Home