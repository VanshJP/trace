import { NextRequest, NextResponse } from 'next/server';
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid or missing PDF file.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdfParse(buffer);
    const fullText = pdfData.text;

    const parsedData = parseTranscriptText(fullText);

    return NextResponse.json(parsedData);
  } catch (err) {
    console.error('❌ PDF parsing failed:', err);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}

function parseTranscriptText(fullText: string) {
  const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract cumulative GPA from last 'Cumulative' line
  let cumulativeGPA = 'Not found';
  const cumulativeLine = [...lines].reverse().find(line => line.includes('Cumulative'));
  if (cumulativeLine) {
    const match = cumulativeLine.match(/(\d+\.\d{2})$/);
    if (match) cumulativeGPA = match[1];
  }

  // Extract major/program from last lines
  let major = 'Not found';
  let program = 'Not found';

  for (const line of [...lines].reverse()) {
    if (line.startsWith('Major:')) major = line.replace('Major:', '').trim();
    if (line.startsWith('BS in')) program = line.replace('BS in', '').trim();
    if (major !== 'Not found' && program !== 'Not found') break;
  }

  // Student name and ID
  const nameMatch = fullText.match(/Name:\s*([^,]+),\s*([^\s]+)/);
  const studentName = nameMatch ? `${nameMatch[2]} ${nameMatch[1]}` : 'Not found';

  const idMatch = fullText.match(/Student Number:\s*(\d+)/);
  const studentId = idMatch ? idMatch[1] : 'Not found';

  // Semesters
  const semesterLines = lines.filter(line => /\d{4}\s+(Spring|Fall|Summer)\s+Semester/.test(line));
  const expectedGraduation = semesterLines.at(-1) ?? 'Not found';
  const enrollmentDate = semesterLines[0] ?? 'Not found';

  // Courses
  const coursePattern = /([A-Z]{2,3})\s+(\d{3}[A-Z]?)\s+(.*?)\s+([A-F][+-]?)\s+(\d+\.\d{1,2})/;
  const recentCourses = lines
    .map(line => coursePattern.exec(line))
    .filter(Boolean)
    .slice(0, 10)
    .map(m => ({
      courseCode: `${m![1]} ${m![2]}`,
      courseName: m![3],
      grade: m![4],
      hours: m![5],
    }));

  return {
    studentName,
    studentId,
    major,
    program,
    cumulativeGPA,
    enrollmentDate,
    expectedGraduation,
    recentCourses,
  };
}