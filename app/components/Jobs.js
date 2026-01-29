import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Jobs() {
  const jobs = [
  {
    id: 1,
    title: "Closer",
    slug: "closer",
    location: "Plaza 28, Lower Ground, Civic Center, Bahria Phase IV, Islamabad",
    description:
      "We are hiring experienced Closers to finalize sales deals with international clients. The ideal candidate should possess excellent communication and negotiation skills, a results-driven attitude, and the ability to work efficiently in a fast-paced environment. A minimum of 2 years of experience, fluency in English, and computer literacy are required. Both male and female candidates are encouraged to apply. Free transport is available for female employees.",
  },
  // {
  //   id: 2,
  //   title: "Customer Sales Representative",
  //   slug: "customer-sales-representative",
  //   location: "Plaza 28, Lower Ground, Civic Center, Bahria Phase IV, Islamabad",
  //   description:
  //     "We are looking for motivated Customer Sales Representatives to engage with customers, promote company products, and close sales effectively. Candidates should have at least 2 years of relevant experience, be fluent in English, and have sound computer knowledge. Both male and female applicants are welcome. Free transport facility is provided for female staff.",
  // },
  {
    id: 3,
    title: "Verifiers",
    slug: "verifiers",
    location: "Plaza 28, Lower Ground, Civic Center, Bahria Phase IV, Islamabad",
    description:
      "We are looking for dedicated Verifiers to handle customer interactions. The ideal candidate should have strong attention to detail, excellent communication skills, and the ability to work under pressure. A minimum of 2 years of experience in sales, marketing, or customer service is required, along with fluency in English and good computer literacy. Both",
  },
];


  return (
    <>
      <h2 className="jobs-title">Join Our Team</h2>
      <section className="jobs-section">
        <div className="job-container">
          {jobs.map((job) => (
            <div key={job.id} className="task" draggable="true">
              <div>
                <div className="tags">
                  <span className="tag">{job.title}</span>
                </div>
                <p>
                  <FaMapMarkerAlt size={14} /> {job.location}
                </p>
                <p>{job.description}</p>
                <div className="stats">
                  <Link
                    href={`/jobs/apply/${job.slug}`}
                    className="viewer"
                  >
                    <button className="job-btn">Apply Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
