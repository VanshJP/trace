"use client"

import type React from "react"
import { useState } from "react"

const UniversityPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState("")
  const [showClassesForm, setShowClassesForm] = useState(false)

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center pl-0">
                <span className="text-3xl font-bold text-[#228c22]">Trace</span>
                <span className="ml-2 text-lg font-semibold text-gray-700">University Portal</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-lg font-semibold text-gray-700">UNIVERSITY OF KENTUCKY</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Transcript Upload Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Upload Transcript</h2>
          <p className="text-base text-gray-500 mb-6">
            Upload official student transcripts to be verified and stored securely on the blockchain.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4 flex text-sm text-gray-600 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#228c22] hover:text-[#1c7a1c] focus-within:outline-none">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
          </div>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]">
            Upload Transcript
          </button>
        </div>

        {/* Create Student Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Create a Student</h2>
          <form onSubmit={handleSaveStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  id="studentId"
                  type="text"
                  placeholder="Enter student ID"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <input
                  id="gpa"
                  type="number"
                  step="0.01"
                  placeholder="Enter GPA"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  style={{ color: 'black' }}
                />
              </div>
            </div>

            {/* Toggle Class Section */}
            <div>
              <button
                type="button"
                onClick={() => setShowClassesForm(!showClassesForm)}
                className="text-[#228c22] hover:text-[#1c7a1c] text-sm underline"
              >
                {showClassesForm ? "Hide Class Section" : "Add Classes"}
              </button>
            </div>

            {showClassesForm && (
              <div className="space-y-4 mt-2 bg-white p-4 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                      Semester
                    </label>
                    <select
                      id="semester"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      required
                      style={{ color: 'black' }}
                    >
                      <option value="">Select semester</option>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="fall">Fall</option>
                      <option value="winter">Winter</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      id="year"
                      type="number"
                      placeholder="Enter year"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Class Name / Code
                    </label>
                    <input
                      id="classCode"
                      type="text"
                      placeholder="e.g. CS101"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      id="grade"
                      type="text"
                      placeholder="e.g. A, B+"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      required
                      style={{ color: 'black' }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
                >
                  + Class
                </button>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
            >
              Save Student
            </button>
          </form>
        </div>

        {/* Other sections (View Students, Footer, Modal) stay unchanged */}
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Trace University Portal. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <svg className="mx-auto h-12 w-12 text-[#228c22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Student Saved</h3>
            <p className="text-gray-500 mb-6">Email invitation has been sent to the student.</p>
            <button
              onClick={() => setShowModal(false)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UniversityPage