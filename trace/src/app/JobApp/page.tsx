"use client";

import type React from "react";
import { useState } from "react";

// TypeScript interface for Job
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  gpaRequirement?: number;
}

const JobApplication: React.FC = () => {
  const [search, setSearch] = useState("");
  const [walletKey, setWalletKey] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [gpaFile, setGpaFile] = useState<File | null>(null);

  // Hardcoded jobs data with GPA requirement added.
  // Note: Any GPA reference has been removed from the loose requirements.
  const jobs: Job[] = [
    {
      id: "job-001",
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      description:
        "We're looking for an experienced blockchain developer to help build our decentralized credential verification system.",
      requirements: [
        "3+ years of experience with blockchain technologies",
        "Strong knowledge of Ethereum and smart contracts",
        "Experience with Solidity and Web3.js",
        "Understanding of cryptographic principles",
        "Bachelor's degree in Computer Science or related field",
      ],
      responsibilities: [
        "Develop and maintain smart contracts for credential verification",
        "Implement secure wallet integration for student credentials",
        "Optimize gas usage and transaction efficiency",
        "Collaborate with front-end developers to create seamless user experiences",
        "Stay up-to-date with the latest blockchain technologies and best practices",
      ],
      postedDate: "2025-03-15",
      gpaRequirement: 3.7,
    },
    {
      id: "job-002",
      title: "Frontend Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      description:
        "Join our team to build intuitive and responsive user interfaces for our blockchain-based credential platform.",
      requirements: [
        "3+ years of experience with React and TypeScript",
        "Experience with responsive design and CSS frameworks",
        "Knowledge of state management solutions (Redux, Context API)",
        "Understanding of Web3 integration is a plus",
        "Bachelor's degree in Computer Science or related field",
      ],
      responsibilities: [
        "Develop responsive and accessible user interfaces",
        "Implement wallet connection features for credential verification",
        "Work closely with designers to translate mockups into functional components",
        "Optimize application performance and loading times",
        "Write clean, maintainable, and well-tested code",
      ],
      postedDate: "2025-03-20",
      gpaRequirement: 3.0,
    },
    {
      id: "job-003",
      title: "Blockchain Solutions Architect",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140,000 - $180,000",
      description:
        "Design and architect blockchain solutions for our credential verification platform, ensuring security, scalability, and usability.",
      requirements: [
        "5+ years of experience in software architecture",
        "Deep understanding of blockchain technologies and protocols",
        "Experience designing and implementing large-scale distributed systems",
        "Knowledge of cryptographic principles and security best practices",
        "Master's degree in Computer Science or related field preferred",
      ],
      responsibilities: [
        "Design and architect blockchain-based credential verification systems",
        "Evaluate and select appropriate blockchain technologies and protocols",
        "Create technical specifications and documentation",
        "Collaborate with engineering teams to implement solutions",
        "Ensure security, scalability, and performance of blockchain systems",
      ],
      postedDate: "2025-03-10",
      gpaRequirement: 3.5,
    },
    {
      id: "job-004",
      title: "Product Manager - Blockchain",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      description:
        "Lead the product development for our blockchain-based credential verification platform, working with stakeholders to define requirements and roadmap.",
      requirements: [
        "3+ years of product management experience",
        "Understanding of blockchain technology and its applications",
        "Experience with agile development methodologies",
        "Strong communication and stakeholder management skills",
        "Bachelor's degree in Business, Computer Science, or related field",
      ],
      responsibilities: [
        "Define product requirements and roadmap for blockchain credential solutions",
        "Work with universities and employers to understand credential verification needs",
        "Collaborate with engineering teams to deliver features and improvements",
        "Analyze market trends and competitive landscape",
        "Measure and optimize product performance and user satisfaction",
      ],
      postedDate: "2025-03-25",
      gpaRequirement: 3.2,
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletKey.trim()) {
      alert("Please enter your blockchain key.");
      return;
    }
    if (!gpaFile) {
      alert("Please upload your GPA JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonText = event.target?.result;
        if (typeof jsonText !== "string") throw new Error("Invalid file content");
        const parsed = JSON.parse(jsonText);
        const applicantGpa = Number(parsed.gpa);
        if (isNaN(applicantGpa)) throw new Error("GPA is not a valid number");

        if (selectedJob && selectedJob.gpaRequirement !== undefined) {
          if (applicantGpa >= selectedJob.gpaRequirement) {
            setShowSuccessModal(true);
          } else {
            setShowFailureModal(true);
          }
        }
        setSelectedJob(null);
      } catch (error: any) {
        alert("Error processing GPA JSON file: " + error.message);
      }
    };
    reader.readAsText(gpaFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleGpaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setGpaFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center pl-0">
                <span className="text-3xl font-bold text-[#228c22]">Trace</span>
                <span className="ml-2 text-lg font-semibold text-black"></span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-lg font-semibold text-black">JOB CORP</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Listings Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-black">Job Listings</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job, index) => (
                  <tr key={job.id} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-[#228c22] hover:text-[#1c7a1c]" onClick={() => handleJobClick(job)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No jobs found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredJobs.length}</span> of{" "}
              <span className="font-medium">{filteredJobs.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled
              >
                Previous
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                        <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-500">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="text-gray-700">{selectedJob.department}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">Posted on {selectedJob.postedDate}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                {selectedJob.gpaRequirement && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">GPA Requirement</h3>
                    <p className="text-gray-700">Minimum GPA: {selectedJob.gpaRequirement}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h3>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="jobWalletKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Blockchain Key
                    </label>
                    <input
                      id="jobWalletKey"
                      type="text"
                      placeholder="Enter your wallet address (0x...)"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black"
                      value={walletKey}
                      onChange={(e) => setWalletKey(e.target.value)}
                      required
                    />
                    <p className="text-xs text-black mt-1">
                      Your wallet will be used to verify your academic credentials
                    </p>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                      Resume/CV
                    </label>
                    <div className="border border-gray-300 rounded-md px-4 py-2">
                      <div className="flex items-center justify-between">
                        <input id="resume" type="file" className="hidden" onChange={handleFileChange} />
                        <label htmlFor="resume" className="cursor-pointer text-sm text-black">
                          {resume ? resume.name : "Choose file..."}
                        </label>
                        <label
                          htmlFor="resume"
                          className="cursor-pointer text-sm font-medium text-[#228c22] hover:text-[#1c7a1c]"
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 5MB</p>
                  </div>

                  <div>
                    <label htmlFor="gpaFile" className="block text-sm font-medium text-gray-700 mb-1">
                      GPA JSON File
                    </label>
                    <div className="border border-gray-300 rounded-md px-4 py-2">
                      <div className="flex items-center justify-between">
                        <input id="gpaFile" type="file" accept=".json" className="hidden" onChange={handleGpaFileChange} />
                        <label htmlFor="gpaFile" className="cursor-pointer text-sm text-black">
                          {gpaFile ? gpaFile.name : "Choose file..."}
                        </label>
                        <label
                          htmlFor="gpaFile"
                          className="cursor-pointer text-sm font-medium text-[#228c22] hover:text-[#1c7a1c]"
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">JSON file containing your GPA data.</p>
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      placeholder="Tell us why you're a good fit for this position"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none min-h-[120px] text-black"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#1c7a1c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal (Light Green) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-100 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-2xl font-bold text-green-900 mt-4 mb-2">Successfully Applied</h3>
            <p className="text-green-700 mb-6">
              Your application has been successfully submitted.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Failure Modal (Light Red) */}
      {showFailureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-100 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <svg className="mx-auto h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h3 className="text-2xl font-bold text-red-900 mt-4 mb-2">Application Failed</h3>
            <p className="text-red-700 mb-6">
              You failed to meet the GPA requirement for this position.
            </p>
            <button
              onClick={() => setShowFailureModal(false)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
