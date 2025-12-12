"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { jobData } from "../data/jobs";

import { z } from "zod";

const applySchema = z.object({
  name: z.string().min(2, "Enter a valid name (letters only)."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number (10–15 digits)."),
  cv: z
    .any()
    .refine((file) => {
      if (!file || file.size === 0) return true; // Optional
      return ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
    }, "Only PDF, DOC, or DOCX files are allowed.")
    .refine((file) => {
      if (!file || file.size === 0) return true; // Optional
      return file.size <= 5 * 1024 * 1024;
    }, "File size must be under 5MB."),
});

export default function ApplyJob({ slug }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const job = jobData[slug];
  if (!job) return <h2 className="error-text">Job not found.</h2>;

  // ✅ Validation function
  const validateForm = (formData) => {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cv: formData.get("cv"),
    };

    const result = applySchema.safeParse(data);

    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // 📨 Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("jobTitle", job.title);

    if (!validateForm(formData)) return;

    setLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Application submitted successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to send application. Try again.");
      }
    } catch (error) {
      console.error("Error sending application:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="apply-section">
      <div className="apply-container">
        {/* Job Info */}
        <div className="job-info">
          <h2>{job.title}</h2>
          <p><strong>Working Hours:</strong> {job.workingHours}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p className="desc"><strong>Description:</strong> {job.description}</p>
          <h3>Requirements:</h3>
          <ul>
            {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
          </ul>
        </div>

        {/* Apply Form */}
        <div className="apply-form">
          <h3>Apply Now</h3>
          <form onSubmit={handleSubmit} noValidate>
            <label>
              Full Name
              <input type="text" name="name" />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </label>

            <label>
              Email
              <input type="email" name="email" />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </label>

            <label>
              Phone Number
              <input type="tel" name="phone" />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </label>

            <label>
              Upload CV (optional)
              <input type="file" name="cv" accept=".pdf,.doc,.docx" />
              {errors.cv && <p className="error-text">{errors.cv}</p>}
            </label>

            <button type="submit" className="job-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
