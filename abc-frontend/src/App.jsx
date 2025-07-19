import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCard from "./components/EventCard";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
// Placeholder for AdminDashboard import

function HomePage() {
  const events = [
    { id: 1, image: "/94518bbc4f3be0543cbfa9970a3d32221630340e.png", date: "29", month: "JUNE" },
    { id: 2, image: "/d4b4077e2f7f5f51353724ef58d59296fbc98662.png", date: "05", month: "JULY" },
    { id: 3, image: "/94518bbc4f3be0543cbfa9970a3d32221630340e.png", date: "12", month: "AUG" },
    { id: 4, image: "/d4b4077e2f7f5f51353724ef58d59296fbc98662.png", date: "20", month: "SEP" },
    { id: 5, image: "/94518bbc4f3be0543cbfa9970a3d32221630340e.png", date: "10", month: "OCT" },
    { id: 6, image: "/d4b4077e2f7f5f51353724ef58d59296fbc98662.png", date: "15", month: "NOV" },
    { id: 7, image: "/94518bbc4f3be0543cbfa9970a3d32221630340e.png", date: "22", month: "DEC" },
  ];
  return (
    <div className="relative w-screen overflow-x-hidden" style={{ height: 'calc(100vh + 300px)', overflowY: 'auto', background: 'black' }}>
      {/* Corner Images */}
      <img src="/dd61efba70e3eac60efc26946b4851022cf4176f.png" alt="corner" className="absolute top-36 left-2 w-20 h-20 z-20" style={{ transform: 'rotate(57deg)' }} />
      <img src="/dd61efba70e3eac60efc26946b4851022cf4176f.png" alt="corner" className="absolute bottom-2 right-2 w-20 h-20 z-20" style={{ transform: 'rotate(110deg)' }} />
      <img src="/fca62c3cbdf5442bdcb63aaac92264ad6684273c.png" alt="corner" className="absolute bottom-[-40px] left-2 w-20 h-20 z-20" style={{ transform: 'rotate(45deg)' }}/>
      {/* Video background */}
      <video
        className="absolute top-28 left-0 w-full h-[calc(100%+220px)] object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/quake.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      {/* Heading */}
      <h1
        style={{
          position: "absolute",
          top: "200px",
          left: "150px",
          width: "836px",
          height: "40px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "46px",
          lineHeight: "40px",
          letterSpacing: "-0.08em",
          textTransform: "uppercase",
          color: "#DADADA",
          margin: 0,
        }}
      >
        Browse All Events
      </h1>
      {/* Event Cards */}
      <div className="relative z-10 mt-[340px] flex flex-nowrap gap-6 pl-32 pr-24 sm:px-4 pb-12 w-full overflow-x-auto custom-scrollbar">
        {events.map((ev, idx) => (
          <div key={ev.id || idx} className="flex-shrink-0">
            <EventCard
              image={ev.image}
              date={ev.date}
              month={ev.month}
              rotate={ev.rotate}
            />
          </div>
        ))}
      </div>
      {/* Custom carousel-style scrollbar below event cards */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <div className="h-4 w-32 bg-white rounded-full"></div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
        </div>
      </div>
      {/* Decorative custom scrollbar bar centered below event cards */}
      <div className="w-40 h-6 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #444 0%, #888 100%)' }}></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
