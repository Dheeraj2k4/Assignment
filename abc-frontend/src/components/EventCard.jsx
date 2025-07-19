export default function EventCard({ image, date, month, rotate }) {
  return (
    <div
      className="relative overflow-hidden shadow-lg"
      style={{
        width: "273px",
        height: "443px",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Poster Image */}
      <img
        src={image}
        alt="event"
        style={{
          width: "257px",
          height: "279px",
          objectFit: "cover",
          margin: "8px",
          // No border radius
          transform: rotate ? `rotate(${rotate})` : undefined,
        }}
      />

      {/* Title block */}
      <div
        style={{
          position: "absolute",
          top: "303px",
          left: "16px",
          width: "171px",
          height: "47px",
          backgroundColor: "transparent", // No background
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          // No border radius
        }}
      >
        <span
          style={{
            fontFamily: "SF Pro Display, sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Afrikadrums
        </span>
      </div>

      {/* Date/Year box with year at top */}
      <div
        style={{
          position: "absolute",
          top: "303px",
          left: "203px",
          width: "54px",
          height: "74px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#FFFFFF33",
          borderRadius: "6px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          background: "#fff0",
        }}
      >
        {/* Year box */}
        <div
          style={{
            width: "100%",
            height: "28px",
            background: "#666666",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "SF Pro Display, sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "65px",
            letterSpacing: "0",
            textAlign: "center",
            verticalAlign: "middle",
            textTransform: "uppercase",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
        >
          2025
        </div>
        {/* Date/Month as plain text below year */}
        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px"}}>
          <span
            style={{
              fontFamily: "SF Pro Display, sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "15px",
              letterSpacing: "0",
              textAlign: "center",
              verticalAlign: "middle",
              textTransform: "uppercase",
              color: "#fff",
              opacity: 1,
              margin: 0,
            }}
          >
            {date}
          </span>
          <span
            style={{
              fontFamily: "SF Pro Display, sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "15px",
              letterSpacing: "0",
              textAlign: "center",
              verticalAlign: "middle",
              textTransform: "uppercase",
              color: "#fff",
              opacity: 1,
              margin: 0,
            }}
          >
            {month}
          </span>
        </div>
      </div>

      {/* Button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button
          style={{
            width: "241px",
            height: "44px",
            padding: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "transparent",
            background: `linear-gradient(
              50deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(255, 255, 255, 0.4) 17.54%,
              rgba(255, 255, 255, 0.4) 49.12%,
              rgba(17, 23, 255, 0.4) 63.16%,
              rgba(63, 255, 255, 0.4) 75.44%,
              rgba(255, 9, 8, 0.4) 83.33%,
              rgba(255, 255, 31, 0.4) 92.98%,
              rgba(0, 0, 0, 0.4) 100%
            )`,
          }}
          className="text-white text-sm font-medium rounded-md"
        >
          GET TICKETS
        </button>
      </div>
    </div>
  );
}
