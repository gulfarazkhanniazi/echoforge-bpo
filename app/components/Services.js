"use client";
import React from "react";
import {
  FaPhoneAlt,
  FaHeadset,
  FaChartLine,
  FaBullhorn,
  FaCogs,
  FaHandshake,
  FaUsers,
  FaSearchDollar,
} from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaBullhorn />,
      title: "Affiliate Marketing Solutions",
      description:
        "Expand your reach through targeted affiliate partnerships. We design and manage affiliate campaigns that drive traffic, leads, and measurable business growth.",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Outbound Call Center Solutions",
      description:
        "Boost sales, increase customer reach, and drive growth with Prime BPO’s professional outbound calling services. Our expert agents help you connect, convert, and grow your business efficiently.",
    },
    {
      icon: <FaHeadset />,
      title: "Inbound Call Support",
      description:
        "Affordable, scalable, and 24/7 inbound call center services designed to enhance customer satisfaction and streamline operations across healthcare, fintech, e-commerce, and more.",
    },
    {
      icon: <FaChartLine />,
      title: "Call Quality Assurance",
      description:
        "Ensure every customer interaction meets your brand standards. Our QA team monitors, analyzes, and enhances call quality to deliver consistency, compliance, and satisfaction.",
    },
    {
      icon: <FaBullhorn />,
      title: "Telesales & Telemarketing",
      description:
        "Where every call counts and every lead converts. We provide cold calling, B2B telemarketing, and appointment setting services tailored to your goals and target audience.",
    },
    {
      icon: <FaHandshake />,
      title: "Business Development",
      description:
        "We help you identify and pursue new opportunities for sustainable growth. From strategy to execution, we turn ideas into measurable business outcomes.",
    },
    {
      icon: <FaCogs />,
      title: "Back Office Support",
      description:
        "End-to-end back office outsourcing for seamless business operations. From finance and accounting to data management, we help reduce costs and boost efficiency.",
    },
    {
      icon: <FaUsers />,
      title: "Garage2Global BPO Services",
      description:
        "Garage2Global provides end-to-end BPO solutions with innovative IT-enabled services, deep industry expertise, and customized strategies for scalable success.",
    },
    {
      icon: <FaSearchDollar />,
      title: "Direct Sales Optimization",
      description:
        "Maximize direct sales performance through SEO-driven strategies. Build stronger customer relationships, enhance brand loyalty, and increase revenue.",
    },
    {
      icon: <FaChartLine />,
      title: "Lead Generation Outsourcing",
      description:
        "Simplify and scale your lead generation while reducing staffing costs by up to 80%. Outsource Accelerator connects you to thousands of global professionals securely.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Our Professional Services</h2>
        <p className="section-subtitle">
          Empowering your business with innovative, results-driven outsourcing solutions.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
