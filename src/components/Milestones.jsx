import { Link } from "react-router-dom"

const janAchievements = [
  {
    year: "2022",
    title: "Kazz Awards 2022",
    category: "Popular Female Teenage Award",
  },
  {
    year: "2021",
    title: "Kazz Awards 2021",
    category: "Popular Young Woman of The Year",
  },
  {
    year: "2020",
    title: "Zoom Dara Awards 2020",
    category: "Best Actress in a Villain Role",
  },
]

const coupleAchievements = [
  {
    year: "2026",
    title: "Enemies With Benefits",
    category: "Breakthrough Cast of the Year",
  },
  {
    year: "2026",
    title: "Bewitch You",
    category: "JanJingjing Fan Concert",
  },
  {
    year: "2026",
    title: "J Space",
    category: "Photobook of JanJingJing",
  },
]

const jingAchievements = [
  {
    year: "2019",
    title: "Best Actress",
    category: "15th Kom Chad Luek Awards · App War",
  },
  {
    year: "2017",
    title: "Going International",
    category: "ESteem Entertainment · South Korea",
  },
  {
    year: "2012",
    title: "Thai Super Model Winner",
    category: "Thai Supermodel Contest",
  },
]

function AchievementCard({ item, theme }) {
  return (
    <article className={`milestone-card milestone-card-${theme}`}>
      <div className="milestone-top">
        <span>{item.year}</span>
        <span className="milestone-icon">
          {theme === "jan" ? "✦" : theme === "jing" ? "♡" : "∞"}
        </span>
      </div>

      <p>{item.category}</p>
      <h4>{item.title}</h4>
    </article>
  )
}

function Milestones() {
  return (
    <section className="milestones-section">

      <div className="milestones-heading">
        <p className="milestones-kicker">
          03 / MILESTONES
        </p>

        <h2>
          Things worth
          <br />
          <em>remembering.</em>
        </h2>

        <p className="milestones-note">
          every little win belongs in the archive ♡
        </p>
      </div>

      <div className="milestone-columns">

        {/* JAN */}
        <div className="milestone-column milestone-column-jan">

          <div className="milestone-column-heading">
            <span className="milestone-number">01</span>

            <div>
              <p>JAN</p>
              <h3>Her Journey</h3>
            </div>

            <span className="milestone-main-icon jan-milestone-icon">
              ✦
            </span>
          </div>

          <div className="milestone-list">
            {janAchievements.map((item, index) => (
              <AchievementCard
                key={index}
                item={item}
                theme="jan"
              />
            ))}
          </div>

          <Link
            to="/jan"
            className="milestone-link milestone-link-jan"
          >
            View Jan's Achievements
            <span>→</span>
          </Link>

        </div>


        {/* TOGETHER */}
        <div className="milestone-column milestone-column-couple">

          <div className="couple-milestone-badge">
            JAN × JINGJING
          </div>

          <div className="milestone-column-heading milestone-couple-heading">
            <div>
              <p>TOGETHER</p>
              <h3>Their Story</h3>
            </div>

            <span className="milestone-main-icon couple-milestone-icon">
              ♡
            </span>
          </div>

          <div className="milestone-list">
            {coupleAchievements.map((item, index) => (
              <AchievementCard
                key={index}
                item={item}
                theme="couple"
              />
            ))}
          </div>

          <Link
            to="/together"
            className="milestone-link milestone-link-couple"
          >
            View Couple Milestones
            <span>→</span>
          </Link>

        </div>


        {/* JINGJING */}
        <div className="milestone-column milestone-column-jing">

          <div className="milestone-column-heading">

            <span className="milestone-number">02</span>

            <div>
              <p>JINGJING</p>
              <h3>Her Journey</h3>
            </div>

            <span className="milestone-main-icon jing-milestone-icon">
              ♡
            </span>

          </div>

          <div className="milestone-list">
            {jingAchievements.map((item, index) => (
              <AchievementCard
                key={index}
                item={item}
                theme="jing"
              />
            ))}
          </div>

          <Link
            to="/jingjing"
            className="milestone-link milestone-link-jing"
          >
            View JingJing's Achievements
            <span>→</span>
          </Link>

        </div>

      </div>

      <div className="milestones-footer">
        <span />
        <p>
          JAN • JINGJING • BOTH FOR THEM ♡
        </p>
        <span />
      </div>

    </section>
  )
}

export default Milestones