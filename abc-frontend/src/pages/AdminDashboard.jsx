import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [cardId, setCardId] = useState(0);
  const [cards, setCards] = useState([]);

  // Fetch existing cards when component mounts
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/events");
      const data = await res.json();
      setCards(data.cards || []);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("images", image); // single image
    formData.append("index", cardId); // index is 0–4

    try {
      const res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Event updated successfully!");
        setHeading("");
        setImage(null);
        await fetchCards(); // refresh cards
      } else {
        setStatus("Failed to update event.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-[#18181b] text-white">
      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-black p-12 rounded-lg shadow-lg w-full"
        >
          <label className="font-semibold">Event Card ID (0–4)</label>
          <input
            type="number"
            min="0"
            max="4"
            className="p-2 rounded bg-[#23232a] border border-gray-700"
            value={cardId}
            onChange={(e) => setCardId(Number(e.target.value))}
          />

          <label className="font-semibold">Heading Sentence</label>
          <input
            type="text"
            className="p-2 rounded bg-[#23232a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter heading sentence"
            required
          />

          <label className="font-semibold mt-2">Event Image</label>
          <input
            type="file"
            accept="image/*"
            className="p-2 rounded bg-[#23232a] border border-gray-700"
            onChange={handleImageChange}
          />

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Submit
          </button>

          {status && <div className="mt-2 text-center text-sm">{status}</div>}
        </form>

        {/* Display cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="border border-gray-700 rounded-lg p-2">
              <p className="text-center mb-2">Card {idx}</p>
              {card.image ? (
                <img
                  src={`http://localhost:3000${card.image}`}
                  alt={`Card ${idx}`}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center text-gray-500 border border-gray-700 rounded">
                  No image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
