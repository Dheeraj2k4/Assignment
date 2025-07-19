import React, { useEffect, useState, useRef } from "react";
import EventCard from "../components/EventCard";
import Indicator from "../components/Indicator";

const DEFAULT_CARDS = [
  { image: "/94518bbc4f3be0543cbfa9970a3d32221630340e.png", date: "29", month: "JUNE" },
  { image: "/d4b4077e2f7f5f51353724ef58d59296fbc98662.png", date: "05", month: "JULY" },
  { image: "/1f0fe3d3051c476ce6f57747b3505ad717bad614.png", date: "12", month: "AUG" },
  { image: "/ca4a6c45864e49d75d27565ae69f465cc717ae8e.png", date: "20", month: "SEP" },
  { image: "/d4b4077e2f7f5f51353724ef58d59296fbc98662.png", date: "10", month: "OCT" },
];

export default function LandingPage() {
  const [heading, setHeading] = useState("Browse All Events");
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [numPages, setNumPages] = useState(cards.length);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setHeading(
          typeof data.heading === "string" && data.heading.trim()
            ? data.heading
            : "Browse All Events"
        );
        if (data.cards && data.cards.length === 5) {
          setCards(data.cards.map((c, i) => ({
            image: c.image ? `http://localhost:3000${c.image}` : DEFAULT_CARDS[i].image,
            date: DEFAULT_CARDS[i].date,
            month: DEFAULT_CARDS[i].month,
          })));
        } else {
          setCards(DEFAULT_CARDS);
        }
        setLoading(false);
      })
      .catch(() => {
        setCards(DEFAULT_CARDS);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.firstChild?.clientWidth || 1;
      const visible = Math.floor(el.clientWidth / (cardWidth + 8)); // 8px = gap-2
      setCardsPerPage(visible || 1);
      setNumPages(Math.max(1, Math.ceil(cards.length / (visible || 1))));
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [cards.length]);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.firstChild?.clientWidth || 1;
      const page = Math.round(el.scrollLeft / ((cardWidth + 8) * cardsPerPage));
      setActiveIndex(page);
    };
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el && el.removeEventListener("scroll", handleScroll);
  }, [cardsPerPage, cards.length]);

  return (
    <div className="relative w-screen overflow-x-hidden" style={{ height: 'calc(100vh + 400px)', overflowY: 'hidden', background: 'black' }}>
      {/* Corner Images */}
      <img src="/dd61efba70e3eac60efc26946b4851022cf4176f.png" alt="corner" className="absolute top-56 left-2 w-20 h-20 z-20" style={{ transform: 'rotate(57deg)' }} />
      <img src="/dd61efba70e3eac60efc26946b4851022cf4176f.png" alt="corner" className="absolute bottom-56 right-2 w-20 h-20 z-20" style={{ transform: 'rotate(110deg)' }} />
      <img src="/fca62c3cbdf5442bdcb63aaac92264ad6684273c.png" alt="corner" className="absolute bottom-44 left-2 w-20 h-20 z-20" style={{ transform: 'rotate(35deg)' }}/>
      {/* Video background */}
      <video
        className="absolute top-[220px] left-0 w-full h-[calc(100%+220px)] object-cover"
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
          top: "240px",
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
        {loading ? "Loading..." : heading}
      </h1>
      {/* Event Cards */}
      <div
        ref={scrollRef}
        className="relative z-10 mt-[340px] flex flex-nowrap gap-4 pl-40 pb-12 w-full overflow-x-auto custom-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((card, idx) => (
          <div key={card.image || idx} className="flex-shrink-0">
            <EventCard image={card.image} date={card.date} month={card.month} />
          </div>
        ))}
      </div>
      {/* Carousel/slider indicator */}
      <div className="flex items-center justify-center mt-2 pl-12 w-full">
        <Indicator currentIndex={activeIndex} total={numPages} />
      </div>
      {/* Decorative custom scrollbar bar centered below event cards */}
      <div className="w-40 h-6 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #444 0%, #888 100%)' }}></div>
    </div>
  );
} 