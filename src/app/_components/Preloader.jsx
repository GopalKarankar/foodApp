import React from "react";

const Preloader = ({ size = 20, color = "black", loading = true }) => {
  
    if (!loading) return null;

  return (
    <div
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%,)",
        width: size,
        height: size,
        border: `${size / 6}px solid #ddd`,
        borderTop: `${size / 6}px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};

export default Preloader;
