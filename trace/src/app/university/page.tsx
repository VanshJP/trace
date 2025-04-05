"use client";

import React, { useState } from "react";
import TranscriptUploader from "../components/TranscriptUploader";

// Define types for our data
interface Class {
  classCode: string;
  grade: string;
}

interface Student {
  firstName: string;
  lastName: string;
  studentId: string;
  gpa: string;
  studentEmail: string;
  classes: Class[];
}

const UniversityPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showClassesForm, setShowClassesForm] = useState(false);

  const [formData, setFormData] = useState<Student>({
    firstName: "",
    lastName: "",
    studentId: "",
    gpa: "",
    studentEmail: "",
    classes: [],
  });

  const [currentClass, setCurrentClass] = useState<Class>({
    classCode: "",
    grade: "",
  });

  const [students, setStudents] = useState<Student[]>([
    {
      firstName: "John",
      lastName: "Doe",
      studentId: "12345678",
      gpa: "3.75",
      studentEmail: "john.doe@email.com",
      classes: [
        { classCode: "CS101", grade: "A" },
        { classCode: "MATH201", grade: "B+" },
        { classCode: "ENG105", grade: "A-" },
      ],
    },
  ]);

  // New state for JSON file data and URL
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [jsonFileUrl, setJsonFileUrl] = useState<string | null>(null);

  const handleTranscriptData = (data: any) => {
    console.log("Transcript data received:", data);

    if (data && typeof data === "object") {
      const fullName = data.studentName?.trim().split(" ") || [];
      const firstName = fullName[0] || "";
      const lastName = fullName.slice(1).join(" ") || "";

      const newFormData: Student = {
        firstName,
        lastName,
        studentId: data.studentId || "",
        gpa: data.cumulativeGPA?.toString() || "",
        studentEmail: data.studentEmail || "",
        classes: Array.isArray(data.recentCourses)
          ? data.recentCourses.map((cls: any) => ({
              classCode: cls.courseCode || "",
              grade: cls.grade || "",
            }))
          : [],
      };

      setFormData(newFormData);
      setShowClassesForm(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleClassInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setCurrentClass({
      ...currentClass,
      [id]: value,
    });
  };

  const handleAddClass = () => {
    if (!currentClass.classCode || !currentClass.grade) {
      alert("Please fill in all class fields");
      return;
    }

    setFormData({
      ...formData,
      classes: [...formData.classes, { ...currentClass }],
    });

    setCurrentClass({
      classCode: "",
      grade: "",
    });
  };

  const handleRemoveClass = (index: number) => {
    const updatedClasses = [...formData.classes];
    updatedClasses.splice(index, 1);
    setFormData({
      ...formData,
      classes: updatedClasses,
    });
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.studentId ||
      !formData.gpa ||
      !formData.studentEmail
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Add new student to the records
    setStudents([...students, { ...formData }]);

    // Create a JSON string from the student data
    const studentJson = JSON.stringify(formData, null, 2);
    // Create a blob and generate a URL for download
    const blob = new Blob([studentJson], { type: "application/json" });
    const fileUrl = URL.createObjectURL(blob);
    // Save the JSON data and URL in state
    setJsonData(studentJson);
    setJsonFileUrl(fileUrl);

    // Clear the form for new input
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      gpa: "",
      studentEmail: "",
      classes: [],
    });

    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center pl-0">
                <span className="text-3xl font-bold text-[#228c22]">Trace</span>
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  University Portal
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-lg font-semibold text-gray-700">
                UNIVERSITY OF KENTUCKY
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="py-16 bg-white" id="verify-transcript">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TranscriptUploader onParsed={handleTranscriptData} />
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Create a Student
          </h2>
          <form onSubmit={handleSaveStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Student ID
                </label>
                <input
                  id="studentId"
                  type="text"
                  placeholder="Enter student ID"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  value={formData.studentId}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="gpa"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GPA
                </label>
                <input
                  id="gpa"
                  type="number"
                  step="0.01"
                  placeholder="Enter GPA"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  value={formData.gpa}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="studentEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Student Email
                </label>
                <input
                  id="studentEmail"
                  type="email"
                  placeholder="Enter student email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                  required
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

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
                {formData.classes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-700 mb-2">
                      Added Classes
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.classes.map((cls, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {cls.classCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {cls.grade}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                type="button"
                                onClick={() => handleRemoveClass(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="classCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Class Name / Code
                    </label>
                    <input
                      id="classCode"
                      type="text"
                      placeholder="e.g. CS101"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      value={currentClass.classCode}
                      onChange={handleClassInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="grade"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Grade
                    </label>
                    <input
                      id="grade"
                      type="text"
                      placeholder="e.g. A, B+"
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
                      value={currentClass.grade}
                      onChange={handleClassInputChange}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddClass}
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
                >
                  + Add Class
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

        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Student Records
          </h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded-md focus:ring-[#228c22] focus:border-[#228c22] focus:outline-none text-black placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students
                  .filter(
                    (student) =>
                      student.firstName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      student.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      student.studentId.includes(search) ||
                      student.studentEmail.includes(search)
                  )
                  .map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.studentEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.studentId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.gpa}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {student.classes.length > 0 ? (
                            <details>
                              <summary className="cursor-pointer text-[#228c22]">
                                {student.classes.length}{" "}
                                {student.classes.length === 1
                                  ? "class"
                                  : "classes"}
                              </summary>
                              <ul className="mt-2 list-disc pl-5">
                                {student.classes.map((cls, idx) => (
                                  <li key={idx}>
                                    {cls.classCode} - {cls.grade}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            "No classes"
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Trace University Portal. All rights
            reserved.
          </p>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <svg
              className="mx-auto h-12 w-12 text-[#228c22]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
              Student Saved
            </h3>
            <p className="text-gray-500 mb-4">
              Student has been successfully added to the system.
            </p>
            {jsonData && jsonFileUrl && (
              <div className="mb-4 text-left">
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Student Data (JSON)
                </h4>
                <pre className="bg-gray-100 p-2 rounded text-xs text-gray-700 overflow-auto max-h-48">
                  {jsonData}
                </pre>
                <a
                  href={jsonFileUrl}
                  download="studentData.json"
                  className="mt-2 inline-flex items-center justify-center rounded-md bg-[#228c22] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
                >
                  Download JSON
                </a>
              </div>
            )}
            <button
              onClick={() => {
                // Revoke the URL when closing the modal if necessary
                if (jsonFileUrl) URL.revokeObjectURL(jsonFileUrl);
                setShowModal(false);
              }}
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#228c22] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#1c7a1c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityPage;
