import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import api from "../../lib/axios";

function LearnerMentorCard({ mentor }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: 30,
  });

  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!mentor) return null;

  const mentorName =
    mentor.user?.name ||
    mentor.name ||
    "Mentor";

  const mentorTitle =
    mentor.title ||
    "Business Mentor";

  const rating =
    mentor.rating !== undefined
      ? mentor.rating
      : 0;

  const mentees =
    mentor.totalMentees !== undefined
      ? mentor.totalMentees
      : 0;

  const sessions =
    mentor.totalSessions !== undefined
      ? mentor.totalSessions
      : 0;

  const years =
    mentor.yearsOfExperience !== undefined
      ? mentor.yearsOfExperience
      : 0;

  const expertise = Array.isArray(mentor.expertise)
    ? mentor.expertise
    : [];

  const isAvailable = mentor.availability === true;

  const mentorImage =
    mentor.user?.profileImage ||
    mentor.profileImage ||
    "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setBooking(true);
      setMessage("");
      setError("");

      if (!formData.title.trim()) {
        setError("Please enter a session title.");
        return;
      }

      if (!formData.date) {
        setError("Please select a date and time.");
        return;
      }

      const response = await api.post("/session/create", {
        mentorId: mentor._id,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        duration: Number(formData.duration),
      });

      if (response.data.success) {
        setMessage(
          "Session request sent successfully!"
        );

        setFormData({
          title: "",
          description: "",
          date: "",
          duration: 30,
        });

        setShowBookingForm(false);
      }
    } catch (error) {
      console.error("Booking error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to book session. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="bg-white px-6 py-6 rounded-2xl mb-4">

      {/* Mentor Header */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3 font-DM-Sans mb-2">

          {mentorImage ? (
            <img
              src={mentorImage}
              alt={mentorName}
              className="w-15 h-15 object-cover rounded-2xl"
            />
          ) : (
            <div className="w-15 h-15 rounded-2xl bg-[#d4cec0] flex items-center justify-center text-xl font-bold text-[#1e3a1e]">
              {mentorName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-[15px] font-semibold">
              {mentorName}
            </p>

            <p className="text-[13px] text-gray-600">
              {mentorTitle}
            </p>

            <div className="flex items-center gap-0.5 text-[12px] text-[#c4622a]">
              <FaStar />

              <p>
                {Number(rating).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-[10px] font-DM-Sans font-semibold">

          <p className="text-orange-800 bg-orange-100 px-2 py-0.5 rounded-2xl mb-1">
            Verified Mentor
          </p>

          <p
            className={`text-center px-1.5 py-0.5 rounded-2xl ${
              isAvailable
                ? "text-green-800 bg-green-100"
                : "text-gray-700 bg-gray-100"
            }`}
          >
            {isAvailable
              ? "Available"
              : "Unavailable"}
          </p>

        </div>
      </div>

      {/* Bio */}
      <p className="text-[12px] font-DM-Sans text-gray-600 mb-3">
        {mentor.bio ||
          "Experienced mentor ready to guide you through your entrepreneurship journey."}
      </p>

      {/* Expertise */}
      {expertise.length > 0 && (
        <ul className="flex flex-wrap items-center gap-2 text-[10px] font-DM-Sans text-gray-600 font-semibold mb-3">

          {expertise.map((skill, index) => (
            <li
              key={`${skill}-${index}`}
              className="bg-[#d4cec0] px-2 py-1 rounded-2xl"
            >
              {skill}
            </li>
          ))}

        </ul>
      )}

      <hr className="h-px my-4 bg-gray-200 border-0" />

      {/* Statistics */}
      <div className="flex items-center justify-between px-3 py-2 mb-3">

        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">
            {mentees}
          </p>
          <p className="text-[11px] text-gray-600">
            Mentees
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">
            {sessions}
          </p>
          <p className="text-[11px] text-gray-600">
            Sessions
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">
            {Number(rating).toFixed(1)}
          </p>
          <p className="text-[11px] text-gray-600">
            Rating
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[15px] font-DM-Sans font-bold">
            {years}yr
          </p>
          <p className="text-[11px] text-gray-600">
            Experience
          </p>
        </div>

      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-DM-Sans">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-DM-Sans">
          {error}
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <form
          onSubmit={handleBooking}
          className="bg-[#f5f3ee] rounded-2xl p-4 mb-4"
        >

          <h3 className="text-sm font-semibold text-[#1e3a1e] mb-3">
            Book a Session
          </h3>

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Session title"
            className="w-full px-3 py-2 mb-3 rounded-xl bg-white border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-green-200"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What would you like to discuss?"
            rows="3"
            className="w-full px-3 py-2 mb-3 rounded-xl bg-white border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-green-200 resize-none"
          />

          {/* Date */}
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Date & Time
          </label>

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-3 py-2 mb-3 rounded-xl bg-white border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-green-200"
          />

          {/* Duration */}
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Duration
          </label>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 rounded-xl bg-white border border-gray-200 text-xs outline-none"
          >
            <option value={30}>
              30 minutes
            </option>

            <option value={45}>
              45 minutes
            </option>

            <option value={60}>
              60 minutes
            </option>
          </select>

          {/* Buttons */}
          <div className="flex gap-2">

            <button
              type="button"
              onClick={() => {
                setShowBookingForm(false);
                setError("");
              }}
              className="flex-1 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={booking || !isAvailable}
              className="flex-1 py-2 rounded-xl bg-[#1e3a1e] text-white text-xs font-semibold disabled:opacity-50"
            >
              {booking
                ? "Booking..."
                : "Send Request"}
            </button>

          </div>
        </form>
      )}

      {/* Actions */}
      {!showBookingForm && (
        <div className="flex gap-2">

          <button
            type="button"
            onClick={() => {
              setShowBookingForm(true);
              setMessage("");
              setError("");
            }}
            disabled={!isAvailable}
            className="flex-1 bg-[#1e3a1e] flex items-center justify-center gap-1 text-white text-[13px] font-DM-Sans font-semibold py-2 rounded-2xl hover:bg-[#294d29] transition disabled:opacity-50"
          >
            Book Session
          </button>

          <button
            type="button"
            className="px-5 bg-gray-100 flex items-center justify-center gap-1 text-gray-700 text-[13px] font-DM-Sans font-semibold py-2 rounded-2xl hover:bg-gray-200 transition"
          >
            <FaRegMessage />
            Message
          </button>

        </div>
      )}

    </div>
  );
}

export default LearnerMentorCard;