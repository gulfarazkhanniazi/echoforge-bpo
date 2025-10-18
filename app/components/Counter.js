"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { FaHeadset, FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";

export default function Counter() {
  const [startCount, setStartCount] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element is visible, trigger count once
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="counter-up" ref={counterRef}>
      <div className="content">
        <div className="box">
          <div className="icon"><FaHeadset /></div>
          <div className="counter">
            {startCount && <CountUp end={250000} duration={4} separator="," />}
          </div>
          <div className="text">Customer Interactions Handled</div>
        </div>

        <div className="box">
          <div className="icon"><FaHandshake /></div>
          <div className="counter">
            {startCount && <CountUp end={320} duration={4} />}
          </div>
          <div className="text">Global Clients Served</div>
        </div>

        <div className="box">
          <div className="icon"><FaUsers /></div>
          <div className="counter">
            {startCount && <CountUp end={1500} duration={4} />}
          </div>
          <div className="text">Dedicated Professionals</div>
        </div>

        <div className="box">
          <div className="icon"><FaChartLine /></div>
          <div className="counter">
            {startCount && <CountUp end={98} duration={4} />}%
          </div>
          <div className="text">Client Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
}
