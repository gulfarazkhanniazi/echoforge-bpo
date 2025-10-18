"use client";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";

export default function HeroSection() {
  const sliderControlsRef = useRef(null);
  const sliderIndicatorRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const controls = sliderControlsRef.current;
    const indicator = sliderIndicatorRef.current;

    if (!controls || !indicator) return;

    const sliderTabs = controls.querySelectorAll(".slider-tab");
    if (!sliderTabs.length) return;

    const updateIndicator = (tab) => {
      if (!tab || !controls || !indicator) return;

      sliderTabs.forEach((t) => t.classList.remove("current"));
      tab.classList.add("current");

      indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
      indicator.style.width = `${tab.offsetWidth}px`;

      const scrollLeft =
        tab.offsetLeft - controls.offsetWidth / 2 + tab.offsetWidth / 2;
      controls.scrollTo({ left: scrollLeft, behavior: "smooth" });
    };

    // Initialize Swiper
    swiperRef.current = new Swiper(".slider-container", {
      modules: [Navigation, Autoplay, EffectFade],
      effect: "fade",
      loop: true,
      speed: 1300,
      autoplay: { delay: 4000, disableOnInteraction: false },
      navigation: { prevEl: "#slide-prev", nextEl: "#slide-next" },
      on: {
        slideChange: function () {
          const index = this.realIndex;
          updateIndicator(sliderTabs[index]);
        },
      },
    });

    // Add click events to tabs
    sliderTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        swiperRef.current.slideToLoop(index);
        updateIndicator(tab);
      });
    });

    // Initial indicator
    updateIndicator(sliderTabs[0]);

    return () => {
      // Cleanup Swiper
      if (swiperRef.current) swiperRef.current.destroy();

      // Remove click listeners
      sliderTabs.forEach((tab) => {
        const newTab = tab.cloneNode(true);
        tab.replaceWith(newTab);
      });
    };
  }, []);

  const slides = [
    {
      subtitle: "Global Expertise",
      title: "Delivering seamless business solutions worldwide",
      description:
        "Echo-Forge BPO empowers businesses by providing scalable and efficient process outsourcing solutions tailored to your needs.",
    },
    {
      subtitle: "Customer-Centric Approach",
      title: "Enhancing customer experiences with precision",
      description:
        "Our team focuses on delivering high-quality customer support, ensuring satisfaction and loyalty for your brand.",
    },
    {
      subtitle: "Innovative Technology",
      title: "Leveraging advanced tools for smarter solutions",
      description:
        "We integrate modern technology and automation to streamline processes and boost operational efficiency.",
    },
    {
      subtitle: "Trusted Partnership",
      title: "Building long-term relationships with clients",
      description:
        "At Echo-Forge BPO, we prioritize collaboration and transparency, fostering trust and mutual growth.",
    },
    {
      subtitle: "Scalable Solutions",
      title: "Supporting your growth every step of the way",
      description:
        "From startups to enterprises, our flexible outsourcing services adapt to meet your evolving business needs.",
    },
  ];

  return (
    <div className="slider-container">
      <div className="slider-wrapper swiper-wrapper">
        {slides.map((slide, idx) => (
          <div key={idx} className="slider-item swiper-slide">
            <div className="slide-content">
              <h3 className="slide-subtitle">{slide.subtitle}</h3>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
              <Link href="#services" className="slide-button">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Tabs */}
      <div className="slider-controls" ref={sliderControlsRef}>
        <ul className="slider-pagination">
          <div className="slider-indicator" ref={sliderIndicatorRef}></div>
          {slides.map((slide, idx) => (
            <li
              key={idx}
              className={`slider-tab ${idx === 0 ? "current" : ""}`}
            >
              {slide.subtitle}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Arrows */}
      <div className="slider-navigations">
        <button id="slide-prev" className="material-symbols-rounded">
          ←
        </button>
        <button id="slide-next" className="material-symbols-rounded">
          →
        </button>
      </div>
    </div>
  );
}
