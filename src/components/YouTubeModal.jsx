function YouTubeModal({ videoId, title, onClose }) {
  if (!videoId) return null

  return (
    <div
      className="yt-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="yt-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="yt-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>

        <div className="yt-modal-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="yt-modal-info">
          <p>OFFICIAL GMMTV VIDEO</p>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default YouTubeModal