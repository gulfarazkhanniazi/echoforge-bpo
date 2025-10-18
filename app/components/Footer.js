// components/Footer.js
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} Echo-Forge BPO. All rights reserved.</p>
      </div>
    </footer>
  );
}
