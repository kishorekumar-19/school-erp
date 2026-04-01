import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { FiSettings } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";
import { motion } from "framer-motion"; // ⬅️ make sure you install this with: npm install framer-motion

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklySchedule = () => {
  const { themeDark, themeChange } = useContext(AuthContext);

  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const getStudentDetails = () => {
    axios
      .get(`${baseUrl}/student/fetch-own`)
      .then((resp) => {
        const classId = resp.data.data.student_class._id;
        fetchClassPeriods(classId);
      })
      .catch((e) => console.log("Error in student", e));
  };

  const fetchClassPeriods = async (classId) => {
    try {
      const response = await axios.get(`${baseUrl}/period/class/${classId}`);
      const periods = response.data.periods;
      const tempSchedule = {};
      days.forEach((day) => (tempSchedule[day] = []));

      periods.forEach((period) => {
        const start = new Date(period.startTime);
        const end = new Date(period.endTime);
        const dayName = start.toLocaleDateString("en-US", { weekday: "long" });
        tempSchedule[dayName]?.push(
          `${start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      });

      setScheduleData(tempSchedule);
    } catch (error) {
      console.error("Error fetching periods:", error);
    }
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  const handleDayChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const getDayDate = (day) => {
    const today = new Date(currentDate);
    const todayDayIndex = today.getDay();
    const targetDayIndex = ["Sunday", ...days].indexOf(day);
    const diff = targetDayIndex - todayDayIndex;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate;
  };

  const formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const backgroundStyle = {
    background: themeDark
      ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      : "linear-gradient(135deg, #d9afd9, #97d9e1)",
    minHeight: "100vh",
    padding: "2rem",
    transition: "all 0.3s ease",
    color: themeDark ? "#fff" : "#111",
  };

  const buttonStyle = {
    margin: "0 0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    background: themeDark ? "#334155" : "#e5e7eb",
    color: themeDark ? "#e0f2fe" : "#111",
    cursor: "pointer",
    fontWeight: "500",
  };

  return (
    <div style={backgroundStyle}>
      {/* Dark mode toggle gear icon */}
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <button
          onClick={themeChange}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          title="Toggle Dark Mode"
        >
          <FiSettings size={28} color={themeDark ? "#fff" : "#111"} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Weekly Schedule
        </h1>
        <p>{formattedCurrentDate}</p>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => handleDayChange(-1)} style={buttonStyle}>
            Previous Day
          </button>
          <button onClick={() => setCurrentDate(new Date())} style={buttonStyle}>
            Today
          </button>
          <button onClick={() => handleDayChange(1)} style={buttonStyle}>
            Next Day
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {days.map((day, index) => {
          const date = getDayDate(day);
          const dayLabel = `${day} (${date.getDate()}/${
            date.getMonth() + 1
          })`;

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                backgroundColor: themeDark ? "#1e293b" : "#ffffffcc",
                padding: "1rem",
                borderRadius: "1rem",
                boxShadow: themeDark
                  ? "0 4px 20px rgba(255, 255, 255, 0.1)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                {dayLabel}
              </h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {scheduleData[day] && scheduleData[day].length > 0 ? (
                  scheduleData[day].map((time, idx) => (
                    <li
                      key={idx}
                      style={{
                        backgroundColor: themeDark ? "#334155" : "#f3f4f6",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        marginBottom: "0.5rem",
                        color: themeDark ? "#e0f2fe" : "#111",
                      }}
                    >
                      {time}
                    </li>
                  ))
                ) : (
                  <li style={{ color: themeDark ? "#94a3b8" : "#6b7280" }}>
                    No schedule
                  </li>
                )}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySchedule;
