"use client";

import React, { useState } from 'react';

interface CourseInfo {
  courseCode: string;
  courseName: string;
  grade: string;
  hours: string;
}

interface TranscriptData {
  studentName: string;
  studentId: string;
  major: string;
  program: string;
  cumulativeGPA: string;
  enrollmentDate: string;
  expectedGraduation: string;
  recentCourses: CourseInfo[];
}

interface TranscriptUploaderProps {
  onParsed: (data: TranscriptData) => void;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({ onParsed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TranscriptData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
      setHash(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-transcript', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process transcript');
      }

      const data: TranscriptData = await response.json();
      setResult(data);

      // Notify parent
      onParsed(data);

      // Generate mock blockchain hash
      const mockHash = generateMockBlockchainHash(data);
      setHash(mockHash);
    } catch (err) {
      setError('Error processing file: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const generateMockBlockchainHash = (data: any): string => {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(40, '0');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Verify Academic Credentials</h2>
      <p className="mb-4 text-black">
        Upload your transcript to extract information and generate a blockchain-verified credential.
      </p>

      <div className="flex items-center mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="transcript-upload"
        />
        <label
          htmlFor="transcript-upload"
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md border border-gray-300 flex-grow"
        >
          {file ? file.name : 'Choose PDF transcript'}
        </label>
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`ml-4 py-2 px-6 rounded-md ${
            !file || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#228c22] text-white hover:bg-[#1c7a1c]'
          }`}
        >
          {loading ? 'Processing...' : 'Verify Transcript'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-3 text-[#228c22]">Verified Credential</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-black">Student Name</p>
                <p className="font-medium text-black">{result.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-black">Student ID</p>
                <p className="font-medium text-black">{result.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-black">Program</p>
                <p className="font-medium text-black">{result.program}</p>
              </div>
              <div>
                <p className="text-sm text-black">Major</p>
                <p className="font-medium text-black">{result.major}</p>
              </div>
              <div>
                <p className="text-sm text-black">Cumulative GPA</p>
                <p className="font-medium text-black">{result.cumulativeGPA}</p>
              </div>
              <div>
                <p className="text-sm text-black">Enrollment Date</p>
                <p className="font-medium text-black">{result.enrollmentDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-black">Expected Graduation</p>
                <p className="font-medium text-black">{result.expectedGraduation}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-3 text-[#228c22]">Recent Courses</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Course</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Course Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Grade</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Hours</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.recentCourses.map((course, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-black">{course.courseCode}</td>
                      <td className="px-4 py-2 text-black">{course.courseName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-black">{course.grade}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-black">{course.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptUploader;
