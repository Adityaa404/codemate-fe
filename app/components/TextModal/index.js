"use client";
import React, { useState } from "react";
import ReadmeFormatter from "../formatter";


const Summary = ({loading,  isOpen, onClose, readmeText }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {loading ? <div>fetching your file summary...</div> : <ReadmeFormatter text={readmeText} />}
      </div>
    </div>
  );
};

const TextModal = ({isOpen, toggleModal, readmeText, loading }) => {
  return (
    
    <div style={styles.app}>
        <Summary loading={loading} isOpen={isOpen} onClose={toggleModal} readmeText={readmeText} />
    </div>
  );
};

const styles = {
  app: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21252B",
  },
  openButton: {
    padding: "10px 20px",
    backgroundColor: "#6200ea",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "72%",
    // backgroundColor: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 5s ease-in-out",
  },
  modal: {
    padding: "20px",
    // backgroundColor: "#1e1e1e",
    backgroundImage: 'linear-gradient(to top left, #000 30%, #111, #333)',
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    width: "95%",
    position: "relative",
    color: "white",
    height: '95%',
    
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "20px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default TextModal;