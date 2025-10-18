"use client";
import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className="navbar">
        <span 
          className="hamburger-btn material-symbols-rounded"
          onClick={toggleMenu}
        >
          <MdMenu size={28} />
        </span>

        <Link href="/" className="logo">
          {/* <img src="images/logo.jpg" alt="logo" /> */}
          <h2>Echo-Forge BPO</h2>
        </Link>

        <ul className={`links ${menuOpen ? "show-menu" : ""}`}>
          <span 
            className="close-btn material-symbols-rounded"
            onClick={closeMenu}
          >
            <MdClose size={28} />
          </span>
          <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/#about-us" onClick={closeMenu}>About</Link></li>
          <li><Link href="/#services" onClick={closeMenu}>Services</Link></li>
          <li><Link href="/#contact-us" onClick={closeMenu}>Contact us</Link></li>
          <li><Link  href="/jobs"><button className="job-btn">Apply Now</button></Link></li>
        </ul>
      </nav>
    </header>
  );
}
