// App.tsx
import { useState } from "react";
import "./App.css";

import bub1 from "./assets/bub1.png";
import bub2 from "./assets/bub2.png";
import bub3 from "./assets/bub3.png";
import robot from "./assets/Robot.png";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    level: "",
    interests: [] as string[],
  });
  const levels = ["1 Licence", "2 Licence", "3 Licence", "Master 1", "Master 2"];
  const interestsList = ["Web Dev", "Mobile Dev", "Ai & Data science", "Robotics", "Cyber Security"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newInterests = checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value);
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Create the JSON body
  const userData = {
    username: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    major: formData.level,
    interest: formData.interests.join(", "),
  };

  // WHAT URL- =========================================

  try {
    const response = await fetch("https://open-day-sheet-backend.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
  username: formData.firstName + " "+ formData.lastName,
  email:  formData.email,
  major : formData.level,
  interest: formData.interests.join(", "),

      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Success:", result);
    alert("User added successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Failed to send data. Check console for details.");
  }
};


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-700 to-blue-400 flex flex-col justify-between items-center">
      
      {/* Top Header with Logo */}
      <header className="mt-1 flex items-center gap-4">
       <img src="src\assets\HLogoPic.png" alt="Unitech Logo" className="w-20 h-20 object-contain" />
       <h1 className="text-white text-4xl font-extrabold drop-shadow-md">Unitech Club</h1>
      </header>

        <main className="relative flex justify-center items-center flex-1 w-full my-8">
          {/* Left Bubble */}
          <img
            src={bub1}
            alt="Bubble 1"
            className="absolute left-[-80px] top-1/4 w-60 h-60 -translate-y-1/2 opacity-30 pointer-events-none float-right z-0"
          />
          {/* Sec Left Bubble */}
          <img
            src={bub3}
            alt="Bubble 3"
            className="absolute left-[-30px] top-7/8 w-30 h-30 -translate-y-1/2 opacity-30 pointer-events-none float-left z-0"
          />

          {/* Right Bubble */}
          <img
            src={bub2}
            alt="Bubble 2"
            className="absolute right-[-80px] top-1/2 w-40 h-40 -translate-y-1/2 opacity-30 pointer-events-none float-right z-0"
          />
          {/* Robot */}
          <img
            src={robot}
            alt="robot"
            className="absolute left-[90px] top-2/4 w-110 h-90 -translate-y-1/2 opacity-75 pointer-events-none float-left z-0"
          />

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md"
        >
          <h2 className="text-white text-2xl font-semibold mb-6 text-center drop-shadow-md">
            Join the Club
          </h2>

          {/* First Name */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
            />
          </div>

          {/* Level */}
          <div className="mb-4">
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
            >
              <option value="" disabled>
                Select Level
              </option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="text-black">
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2 drop-shadow-md">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interestsList.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center gap-2 text-white font-medium drop-shadow-md"
                >
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleInterestChange}
                    className="accent-blue-300 w-4 h-4"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
          >
            Submit
          </button>
        </form>
      </main>

      {/* Bottom Contact Info */}
      <footer className="mb-5 text-white text-center drop-shadow-md flex flex-col items-center gap-2">
  <p className="text-2xl font-semibold">Contact us:</p>
  <div className="flex gap-15 mt-2">
  {/* Facebook */}
  <a href="https://www.facebook.com/unitechclub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">
    <svg className="w-13 h-13" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
    </svg>
  </a>

  {/* Instagram */}
  <a href="https://www.instagram.com/unitech.club/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
    <svg className="w-13 h-13" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
    </svg>
  </a>

  {/* LinkedIn */}
<a href="https://www.linkedin.com/company/unitechclub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
  <svg className="w-13 h-13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.17h.05c.52-.99 1.8-2.04 3.7-2.04 3.95 0 4.7 2.6 4.7 5.97V24h-4v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96V24h-4V8z"/>
  </svg>
</a>

</div>

</footer>

    </div>
  );
}

export default App;
