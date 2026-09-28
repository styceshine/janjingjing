const jewelPoses = {
  peek: "/images/jewel/j13.png",
}

function Jewel({
  pose = "peek",
  size = "medium",
  className = "",
  message = "",
}) {
  return (
    <div
      className={`
        jewel
        jewel-${size}
        ${className}
      `}
    >
      {message && (
        <div className="jewel-message">
          {message}
        </div>
      )}

      <img
        src={jewelPoses[pose]}
        alt="Jewel"
        draggable="false"
      />
    </div>
  )
}

export default Jewel