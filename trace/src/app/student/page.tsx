"use client"

import type React from "react"
import { useState } from "react"

export default function StudentDashboard() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("education")
  const [expandedCertification, setExpandedCertification] = useState<number | null>(null)
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

  const student = {
    name: "Alex Johnson",
    key: "0x7a9d53f954abA95C1ba958d2C2c1a1a7e8f32B7a",
    universities: [
      {
        id: 1,
        name: "Blockchain University",
        degree: "Bachelor of Science in Computer Science",
        graduationYear: "2024",
        gpa: 3.85,
        transcript: [
          { course: "Data Structures", grade: "A", credits: 4 },
          { course: "Algorithms", grade: "A-", credits: 4 },
          { course: "Blockchain Technology", grade: "A", credits: 3 },
          { course: "Web Development", grade: "B+", credits: 3 },
          { course: "Machine Learning", grade: "A-", credits: 4 },
        ],
      },
    ],
    certifications: [
      {
        id: 1,
        name: "Full Stack Development Certificate",
        issuer: "Tech Academy",
        date: "December 2023",
        verified: true,
        description:
          "Comprehensive certification covering modern full-stack development practices including React, Node.js, and database management.",
        skills: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs"],
      },
      {
        id: 2,
        name: "Blockchain Fundamentals",
        issuer: "Crypto Learning Institute",
        date: "August 2023",
        verified: true,
        description: "In-depth exploration of blockchain technology, smart contracts, and decentralized applications.",
        skills: ["Blockchain", "Smart Contracts", "Ethereum", "Solidity", "Web3"],
      },
    ],
    companies: [
      {
        id: 1,
        name: "TechCorp Solutions",
        position: "Software Engineer Intern",
        period: "Jun 2023 - Aug 2023",
        verified: true,
        description:
          "Worked on developing and maintaining web applications using React and Node.js. Collaborated with senior developers to implement new features and fix bugs.",
        achievements: [
          "Developed a dashboard that improved team productivity by 15%",
          "Implemented responsive design principles across 3 major applications",
          "Participated in daily stand-ups and biweekly sprint planning",
        ],
      },
      {
        id: 2,
        name: "DataViz Analytics",
        position: "Junior Developer",
        period: "Jan 2023 - May 2023",
        verified: true,
        description:
          "Assisted in the development of data visualization tools for enterprise clients. Focused on frontend implementation and UI/UX improvements.",
        achievements: [
          "Created interactive data visualizations using D3.js",
          "Optimized application performance by reducing load time by 30%",
          "Collaborated with design team to implement user-friendly interfaces",
        ],
      },
    ],
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(student.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleCertification = (id: number) => {
    setExpandedCertification((prev) => (prev === id ? null : id))
  }

  const toggleExperience = (id: number) => {
    setExpandedExperience((prev) => (prev === id ? null : id))
  }

  const TabButton = ({ value, label }: { value: string; label: string }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        flex-1 py-3 text-center text-sm font-medium transition-all duration-200 border-b-2
        ${
          activeTab === value
            ? "text-[#228c22] border-[#228c22] font-semibold"
            : "text-black border-transparent hover:text-black hover:border-gray-300"
        }
      `}
    >
      {label}
    </button>
  )

  const Badge = ({
    children,
    color,
    className = "",
  }: {
    children: React.ReactNode
    color: string
    className?: string
  }) => {
    const colors: Record<string, string> = {
      green: "bg-green-50 text-green-700 border-green-300",
      yellow: "bg-yellow-50 text-yellow-700 border-yellow-300",
      gray: "bg-gray-100 text-black border-gray-300",
    }

    return (
      <span
        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded border ${colors[color]} ${className}`}
      >
        {children}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Blockchain Key Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-[#228c22]">Your Blockchain Key</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium text-black">{student.name}</h3>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex">
                <span className="bg-gray-50 p-3 text-black border-r-0 text-sm font-mono truncate w-72 shadow-inner">
                  {student.key}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-3 border rounded-r-md bg-white hover:bg-gray-50 w-12 flex justify-center items-center transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? "✓" : "📋"}
                </button>
              </div>
              {copied && <div className="text-xs text-[#228c22] mt-1">Copied to clipboard!</div>}
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-white rounded-t-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="flex">
            <TabButton value="education" label="Education" />
            <TabButton value="certification" label="Certification" />
            <TabButton value="experience" label="Work Experience" />
          </div>

          {/* Content Container */}
          <div className="border-t">
            {/* Education Tab - Always Expanded */}
            {activeTab === "education" && (
              <div className="p-6">
                {student.universities.map((university) => (
                  <div key={university.id} className="bg-white rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-black">{university.name}</h3>
                          <div className="bg-green-50 text-green-800 px-4 py-1 rounded-full border border-green-200 font-medium">
                            GPA: {university.gpa.toFixed(2)}
                          </div>
                        </div>
                        <p className="text-black font-medium mb-1">{university.degree}</p>
                        <p className="text-black text-sm mb-6">Expected Graduation: {university.graduationYear}</p>

                        <div className="mt-4">
                          <h4 className="font-medium text-lg mb-3 text-black border-b pb-2">Transcript</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                    Course
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                    Grade
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                    Credits
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {university.transcript.map((course, idx) => (
                                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-6 py-4 text-sm font-medium text-black">{course.course}</td>
                                    <td className="px-6 py-4 text-sm text-black">{course.grade}</td>
                                    <td className="px-6 py-4 text-sm text-black">{course.credits}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certification Tab - With Dropdowns */}
            {activeTab === "certification" && (
              <div className="p-6">
                <div className="bg-white rounded-lg">
                  <div className="space-y-4">
                    {student.certifications.map((cert) => (
                      <div key={cert.id} className="border rounded-lg overflow-hidden shadow-sm">
                        <div
                          className="flex items-start p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleCertification(cert.id)}
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <h3 className="text-lg font-medium text-black">{cert.name}</h3>
                              <div className="flex items-center">
                                {cert.verified && (
                                  <Badge color="green" className="mr-2">
                                    Verified
                                  </Badge>
                                )}
                                <span className="text-black text-lg">
                                  {expandedCertification === cert.id ? "▲" : "▼"}
                                </span>
                              </div>
                            </div>
                            <p className="text-black">{cert.issuer}</p>
                            <p className="text-black text-sm">{cert.date}</p>
                          </div>
                        </div>

                        {expandedCertification === cert.id && (
                          <div className="p-4 border-t bg-gray-50">
                            <p className="text-black mb-4">{cert.description}</p>
                            <div>
                              <h4 className="font-medium mb-2 text-black">Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {cert.skills.map((skill, idx) => (
                                  <Badge key={idx} color="gray">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Tab - With Dropdowns */}
            {activeTab === "experience" && (
              <div className="p-6">
                <div className="bg-white rounded-lg">
                  <div className="space-y-4">
                    {student.companies.map((company) => (
                      <div key={company.id} className="border rounded-lg overflow-hidden shadow-sm">
                        <div
                          className="flex items-start p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleExperience(company.id)}
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <h3 className="text-lg font-medium text-black">{company.name}</h3>
                              <div className="flex items-center">
                                {company.verified ? (
                                  <Badge color="green" className="mr-2">
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge color="yellow" className="mr-2">
                                    Pending
                                  </Badge>
                                )}
                                <span className="text-black text-lg">
                                  {expandedExperience === company.id ? "▲" : "▼"}
                                </span>
                              </div>
                            </div>
                            <p className="text-black">{company.position}</p>
                            <p className="text-black text-sm">{company.period}</p>
                          </div>
                        </div>

                        {expandedExperience === company.id && (
                          <div className="p-4 border-t bg-gray-50">
                            <p className="text-black mb-4">{company.description}</p>
                            <div>
                              <h4 className="font-medium mb-2 text-black">Key Achievements</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {company.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-black">
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}