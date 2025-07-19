import React, { useState } from "react";

export default function AdminDashboard() {
  const [heading, setHeading] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [cardId, setCardId] = useState(1); // default to 1

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const formData = new FormData();
    formData.append("heading", heading);
    images.forEach((img) => formData.append("images", img));
    formData.append("index", cardId - 1); // backend expects 0-based index
    try {
      const res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Event updated successfully!");
        setHeading("");
        setImages([]);
      } else {
        setStatus("Failed to update event.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#18181b]">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-black p-12 rounded-lg shadow-lg w-full">
          <label className="font-semibold">Event Card ID (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="p-2 rounded bg-[#23232a] border border-gray-700"
            value={cardId}
            onChange={e => setCardId(Number(e.target.value))}
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
          <label className="font-semibold mt-2">Event Images</label>
          <input
            type="file"
            multiple
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
      </div>
    </div>
  );
} 