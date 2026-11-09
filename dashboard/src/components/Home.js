import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post("/verify", {});
        if (data.status) {
          setUsername(data.user);
          setLoading(false);
        } else {
          const frontendUrl =
            process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
          window.location.href = `${frontendUrl}/login`;
        }
      } catch (err) {
        console.error("Verification failed:", err);
        const frontendUrl =
          process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
        window.location.href = `${frontendUrl}/login`;
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Roboto, sans-serif",
          color: "#666",
        }}
      >
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #387ed1",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            animation: "spin 1s linear infinite",
            marginBottom: "16px",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <p>Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <TopBar username={username} />
      <Dashboard username={username} />
    </>
  );
};

export default Home;
