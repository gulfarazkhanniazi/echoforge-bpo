"use client";
import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { z } from "zod";
import { toast } from "react-toastify";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation helper
  const validateForm = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      // Show the first error
      const firstError = result.error.errors[0];
      toast.warn(firstError.message);
      return false;
    }
    return true;
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("subject", "Website Contact Form");
      formData.append("message", form.message.trim());

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Your message has been sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.warn("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-us-page" id="contact-us">
      <div className="container">
        <div className="content">
          {/* -------- LEFT SIDE -------- */}
          <div className="left-side">
            <div className="address details">
              <FaMapMarkerAlt className="c-icon" size={30} />
              <div className="topic">Address</div>
              <div className="text-one">Range Road, Main Shally</div>
              <div className="text-two">Valley Chowk, Rawalpindi</div>
            </div>

            <div className="phone details">
              <FaPhoneAlt className="c-icon" size={30} />
              <div className="topic">Phone</div>
              <div className="text-one">+1 (719) 483-8574</div>
              <div className="text-two">+92 333 0766413</div>
            </div>

            <div className="email details">
              <FaEnvelope className="c-icon" size={30} />
              <div className="topic">Email</div>
              <div className="text-one">dflora794@gmail.com</div>
              {/* <div className="text-two">info.codinglab@gmail.com</div> */}
            </div>
          </div>

          {/* -------- RIGHT SIDE -------- */}
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any work inquiries or questions related to our
              services, please feel free to contact us. We are always happy to
              assist you.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box message-box">
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="button">
                <input
                  type="submit"
                  value={loading ? "Sending..." : "Send Now"}
                  disabled={loading}
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}