"use client";
import React from "react";
import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <hr />
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Echo-Forge BPO. All rights reserved.</p>
          <div className="footer-icons">
            <a
              href="https://wa.me/17194838574"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon whatsapp"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsappSquare size={36} />
            </a>

            <a
              href="https://www.instagram.com/echoforge_bpo_"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon instagram"
              aria-label="Visit our Instagram"
            >
              <FaInstagramSquare size={36} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
