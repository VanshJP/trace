"use client"

import type React from "react"
import { useState } from "react"
import { Search, ChevronDown, ChevronUp, Briefcase } from "lucide-react"

export default function Home() {
  const [activeJobId, setActiveJobId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const jobs = [
    {
      id: 1,
      title: "Junior Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      postedDate: "April 1, 2025",
      description:
        "We are looking for a junior blockchain developer to join our team and help build decentralized applications.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Minimum GPA of 3.5",
        "Basic understanding of blockchain technologies",
        "Familiarity with JavaScript and web development",
        "Willingness to learn Solidity and smart contract development",
        "Strong problem-solving skills and attention to detail",
      ],
    },
    {
      id: 2,
      title: "Associate Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      postedDate: "March 28, 2025",
      description: "Join our product team to support the development of our blockchain-based verification platform.",
      requirements: [
        "Bachelor's degree in Business, Computer Science, or related field",
        "Minimum GPA of 3.5",
        "0-2 years of experience in product management or related role",
        "Interest in blockchain technology and its applications",
        "Strong communication and organizational skills",
        "Ability to work in a fast-paced environment",
      ],
    },
    {
      id: 3,
      title: "Junior UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      postedDate: "March 25, 2025",
      description:
        "Design intuitive and engaging user experiences for our blockchain credential verification platform.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "Minimum GPA of 3.4",
        "Portfolio demonstrating UI/UX design skills",
        "Proficiency with design tools like Figma or Sketch",
        "Understanding of user-centered design principles",
        "Strong visual design skills and attention to detail",
      ],
    },
  ]

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleJobDetails = (id: number) => {
    setActiveJobId((prevId) => (prevId === id ? null : id))
  }

  const Badge = ({ children, color }: { children: React.ReactNode; color: string }) => {
    const colors: Record<string, string> = {
      green: "bg-green-50 text-green-700 border-green-300",
      blue: "bg-blue-50 text-blue-700 border-blue-300",
      gray: "bg-gray-100 text-black border-gray-300",
    }

    return (
      <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded border ${colors[color]}`}>
        {children}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Company Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Company Dashboard</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-black">TechCorp Solutions</h3>
              <p className="text-black">Blockchain Verification Platform</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-[#228c22] hover:bg-[#1a6b1a] text-white rounded-md font-medium transition-colors">
                + Add New Position
              </button>
            </div>
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Job Openings</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            <input
              type="text"
              placeholder="Search job positions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="border rounded-lg overflow-hidden bg-white">
                  <div
                    className="flex items-start p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleJobDetails(job.id)}
                  >
                    <div className="h-10 w-10 rounded-full bg-[#228c22] text-white flex items-center justify-center mr-4">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-black">{job.title}</h3>
                        <span className="text-black text-lg">
                          {activeJobId === job.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge color="blue">{job.department}</Badge>
                        <Badge color="gray">{job.location}</Badge>
                        <Badge color="green">{job.type}</Badge>
                      </div>
                      <p className="text-black text-sm mt-1">Posted: {job.postedDate}</p>
                    </div>
                  </div>

                  {activeJobId === job.id && (
                    <div className="p-4 border-t">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-black">Job Description</h4>
                        <p className="text-black">{job.description}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-black">Requirements</h4>
                        <ul className="list-disc pl-5 text-black space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium mb-4 text-black">Application Form</h4>
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor={`name-${job.id}`}
                                className="block text-sm font-medium text-black mb-1"
                              >
                                Full Name
                              </label>
                              <input
                                id={`name-${job.id}`}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor={`email-${job.id}`}
                                className="block text-sm font-medium text-black mb-1"
                              >
                                Email Address
                              </label>
                              <input
                                id={`email-${job.id}`}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22] focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor={`blockchain-key-${job.id}`}
                              className="block text-sm font-medium text-black mb-1"
                            >
                              Blockchain Key
                            </label>
                            <input
                              id={`blockchain-key-${job.id}`}
                              type="text"
                              placeholder="Enter applicant blockchain key for credential verification"
                              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-[#228c22] focus:border-transparent"
                            />
                            <p className="text-xs text-black mt-1">
                              Blockchain key will be used to verify educational credentials
                            </p>
                          </div>
                          <div>
                            <label htmlFor={`notes-${job.id}`} className="block text-sm font-medium text-black mb-1">
                              Additional Information
                            </label>
                            <textarea
                              id={`notes-${job.id}`}
                              rows={4}
                              placeholder=""
                              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22] focus:border-transparent"
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-[#228c22] hover:bg-[#1a6b1a] text-white rounded-md font-medium transition-colors"
                            >
                              Verify & Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border">
                <p className="text-black">No job positions match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}