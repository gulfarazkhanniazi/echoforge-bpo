"use client";
import React from "react";
import Counter from "./Counter";
import Image from 'next/image'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className="about-us-section" id="about-us">
      <div className="about-us-container">
        {/* Section Header */}
        <div className="about-header">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">
            Discover our mission, vision, and the leadership team driving
            excellence in BPO services.
          </p>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <h3 className="company-title">Who We Are</h3>
          <p className="company-description">
            Echo-Forge BPO is a premier business process outsourcing company
            dedicated to delivering high-quality, scalable, and innovative
            solutions to clients worldwide. With a focus on operational
            excellence, cutting-edge technology, and client-centric services, we
            help organizations streamline their processes, reduce costs, and
            enhance customer experiences across multiple industries. Our team of
            skilled professionals is committed to maintaining the highest
            standards of quality, reliability, and continuous improvement,
            ensuring measurable business impact for every client we serve.
          </p>
          <p className="company-description">
            Since our inception, we have partnered with businesses across
            multiple industries, helping them streamline operations, reduce
            costs, and enhance customer experiences.
          </p>

          <div className="company-values">
            <div className="value-card">
              <h4>Mission</h4>
              <p>
                Provide exceptional BPO solutions that enable clients to
                optimize processes and achieve business growth.
              </p>
            </div>
            <div className="value-card">
              <h4>Vision</h4>
              <p>
                To be the most trusted global partner for innovative and
                reliable outsourcing services.
              </p>
            </div>
            <div className="value-card">
              <h4>Values</h4>
              <p>
                Integrity, Excellence, Client-Centricity, Innovation, and
                Collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* CEO Profiles */}
        <div className="ceo-profiles">
          <div className="ceo-card">
            <Image
              src="/favicon.ico.jpeg"
              alt="John Doe"
              className="ceo-image"
              height={150}
              width={150}
              height={150}
              width={150}
            />
            <h3 className="ceo-name">Abdullah Khalil</h3>
            <p className="ceo-title">CEO & Co-Founder</p>
            <p>
  Abdullah Butt is a seasoned leader with over 7 years of experience in BPO management and operations, driving Echo-Forge BPO to achieve international excellence and recognition.
</p>

            {/* <div className="ceo-socials">
              <a href="#" className="ceo-social-link">LinkedIn</a>
              <a href="#" className="ceo-social-link">Twitter</a>
            </div> */}
          </div>

          <div className="ceo-card">
            <Image
              src="/favicon.ico.jpeg"
              alt="Jane Smith"
              className="ceo-image"
              height={150}
              width={150}
              height={150}
              width={150}
            />
            <h3 className="ceo-name">Gul Faraz</h3>
            <h3 className="ceo-name">Gul Faraz</h3>
            <p className="ceo-title">CEO & Co-Founder</p>
            <p>
              Jane oversees strategic growth and client success, ensuring
              exceptional service delivery and operational excellence.
            </p>
            <div className="ceo-socials">
              <a href="#" className="ceo-social-link">LinkedIn</a>
              <a href="#" className="ceo-social-link">Twitter</a>
            </div>
          </div> */}
        </div>
      </div>
      <Counter />
    </section>
  );
}
