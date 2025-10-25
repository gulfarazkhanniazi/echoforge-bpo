"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";


export default function ApplyJob({ slug }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const jobData = {
    closer: {
      title: "Closer",
      workingHours: "Night Shift - 8:00 pm to 5:00 am (Monday to Friday)",
      location: "Range Road, Main Shally Valley Chowk, Rawalpindi",
      description:
        "We are hiring experienced Closers to manage and finalize sales deals with international clients.",
      requirements: [
        "Minimum 2 years of relevant experience in sales or closing.",
        "Fluent in spoken and written English.",
        "Strong computer skills and ability to use CRM or communication tools.",
        "Both male and female candidates can apply.",
        "Free transport facility available for female employees.",
      ],
    },
    "customer-sales-representative": {
      title: "Customer Sales Representative",
      workingHours: "Night Shift - 8:00 pm to 5:00 am (Monday to Friday)",
      location: "Range Road, Main Shally Valley Chowk, Rawalpindi",
      description:
        "We are looking for dedicated Customer Sales Representatives to handle customer interactions.",
      requirements: [
        "Minimum 2 years of experience in sales, marketing, or customer service.",
        "Fluent English communication skills (spoken and written).",
        "Good computer literacy and familiarity with CRM tools.",
        "Both male and female candidates can apply.",
        "Free transport facility available for female employees.",
      ],
    },
  };

  const job = jobData[slug];
  if (!job) return <h2 className="error-text">Job not found.</h2>;

  // ✅ Validation function
  const validateForm = (formData) => {
    const newErrors = {};
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const phone = formData.get("phone")?.trim();
    const cv = formData.get("cv");

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Enter a valid name (letters only).";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phone || !/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Enter a valid phone number (10–15 digits).";
    }

    if (cv && cv.size > 0) {
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(cv.type)) {
      newErrors.cv = "Only PDF, DOC, or DOCX files are allowed.";
    } else if (cv.size > 5 * 1024 * 1024) {
      newErrors.cv = "File size must be under 5MB.";
    }
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
