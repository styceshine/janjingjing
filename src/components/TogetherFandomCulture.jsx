import { useMemo, useState } from "react";

import {
  fandomCultureItems,
  fandomCultureTabs,
} from "../data/fandomCultureData";

function TogetherFandomCulture() {
  const [activeTab, setActiveTab] = useState("fanbases");

  /* ==================================================
     FILTER ITEMS
  ================================================== */

  const visibleItems = useMemo(() => {
    return fandomCultureItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  /* ==================================================
     AUTOMATIC COUNTS
  ================================================== */

  const counts = useMemo(() => {
    return fandomCultureTabs.reduce((result, tab) => {
      result[tab.id] = fandomCultureItems.filter(
        (item) => item.category === tab.id,
      ).length;

      return result;
    }, {});
  }, []);

  /* ==================================================
     BUTTON LABEL
  ================================================== */

  const getActionLabel = (item) => {
    if (item.category === "fanbases") {
      return "FOLLOW";
    }

    if (item.type === "TICKETS") {
      return "TICKETS";
    }

    if (item.category === "official") {
      return "VIEW";
    }

    return "VISIT";
  };

  return (
    <section id="fandom-culture" className="together-fandom">
      <div className="together-fandom-shell">
        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="together-fandom-heading">
          <div className="together-fandom-heading-main">
            <p>03 / FANDOM CULTURE</p>

            <h2>
              Made with love,
              <br />
              <em>carried by the fandom.</em>
            </h2>
          </div>

          <div className="together-fandom-heading-copy">
            <p>
              Discover fanbases, artist-owned brands, official merchandise, fan
              projects and creators from the JanJingJing community.
            </p>

            <span>SUPPORT • DISCOVER • CREATE</span>
          </div>
        </div>

        {/* ==================================================
            CATEGORY TABS
        ================================================== */}

        <div className="together-fandom-tabs">
          {fandomCultureTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>

              <small>{counts[tab.id] || 0}</small>
            </button>
          ))}
        </div>

        {/* ==================================================
            CURRENT CATEGORY LABEL
        ================================================== */}

        <div className="together-fandom-category-heading">
          <div>
            <p>
              {fandomCultureTabs.find((tab) => tab.id === activeTab)?.label}
            </p>

            <span>
              {visibleItems.length}{" "}
              {visibleItems.length === 1 ? "ENTRY" : "ENTRIES"}
            </span>
          </div>

          <span className="together-fandom-category-line" />
        </div>

        {/* ==================================================
            FAN CREATIONS EMPTY STATE
        ================================================== */}

        {activeTab === "creations" && visibleItems.length === 0 ? (
          <div className="together-fandom-creations-empty">
            <div className="together-fandom-empty-heart">♡</div>

            <p>FAN-MADE WITH LOVE</p>

            <h3>
              A space for the
              <br />
              <em>fandom's creativity.</em>
            </h3>

            <span>
              Fan art, support projects, handmade creations and fandom shops
              will live here.
            </span>

            <div className="together-fandom-empty-preview">
              <div>
                <span>FAN ART</span>
              </div>

              <div>
                <span>SUPPORT PROJECT</span>
              </div>

              <div>
                <span>FAN-MADE MERCH</span>
              </div>
            </div>
          </div>
        ) : (
          /* ==================================================
             DIRECTORY GRID
          ================================================== */

          <div key={activeTab} className="together-fandom-grid">
            {visibleItems.map((item) => {
              const actionLabel = getActionLabel(item);

              return (
                <article
                  key={item.id}
                  className={`
                      together-fandom-card
                      together-fandom-card-${item.category}
                    `}
                >
                  {/* =========================================
                        AVATAR / LOGO / PRODUCT IMAGE
                    ========================================= */}

                  <div className="together-fandom-avatar">
                    {item.image ? (
                      <img src={item.image} alt={item.name} loading="lazy" />
                    ) : (
                      <span>{item.initials}</span>
                    )}
                  </div>

                  {/* =========================================
                        INFO
                    ========================================= */}

                  <div className="together-fandom-info">
                    {/* TOP */}

                    <div className="together-fandom-info-top">
                      <div className="together-fandom-name-wrap">
                        <p className="together-fandom-small-label">
                          {item.label}
                        </p>

                        <h3>{item.name}</h3>

                        {item.handle && (
                          <p className="together-fandom-handle">
                            {item.handle}
                          </p>
                        )}
                      </div>

                      {item.region && (
                        <span className="together-fandom-region">
                          {item.region}
                        </span>
                      )}
                    </div>

                    {/* ARTIST OWNER */}

                    {item.owner && (
                      <p className="together-fandom-owner">
                        CREATED BY
                        <strong>{item.owner}</strong>
                      </p>
                    )}

                    {/* PRODUCT INFO */}

                    {(item.price || item.availability) && (
                      <div className="together-fandom-product-meta">
                        {item.price && (
                          <span className="together-fandom-price">
                            {item.price}
                          </span>
                        )}

                        {item.availability && (
                          <span className="together-fandom-availability">
                            {item.availability}
                          </span>
                        )}
                      </div>
                    )}

                    {/* DESCRIPTION — HIDDEN ONLY FOR FANBASES */}

                    {item.category !== "fanbases" && (
                      <p className="together-fandom-description">
                        {item.description}
                      </p>
                    )}

                    {/* BOTTOM */}

                    <div className="together-fandom-card-bottom">
                      <span className="together-fandom-platform">
                        {item.platform || item.type || "COMMUNITY"}
                      </span>

                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {actionLabel}

                          <span>↗</span>
                        </a>
                      ) : (
                        <span className="together-fandom-link-pending">
                          {actionLabel}

                          <span>↗</span>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ==================================================
            COMMUNITY NOTE
        ================================================== */}

        {/* <div className="together-fandom-note">

          <span>
            ♡
          </span>

          <p>
            Fanbases and fan creators are
            community-run unless specifically
            marked as official.
          </p>

        </div>*/}
      </div>
    </section>
  );
}

export default TogetherFandomCulture;
