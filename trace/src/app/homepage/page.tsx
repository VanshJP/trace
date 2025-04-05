"use client";

import React, { useState } from 'react';
import LoginModal from '../LoginModal';
import { useRouter } from 'next/navigation';
import { registerStudent } from '../registerUser';
import TranscriptUploader from '../components/TranscriptUploader';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const HomePage: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [userType, setUserType] = useState<string>('');

    const router = useRouter();

    const handleNavigation = (type: string) => {
        switch(type) {
            case 'student':
                router.push('/register-student');
                break;
            case 'university':
                router.push('/register-university');
                break;
            case 'company':
                router.push('/register-company');
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center pl-0">
                            <img
                                src="/TRACELOGO.png"
                                className="h-10 w-auto"
                                alt="Trace"
                            />
                            <span className="ml-2 text-3xl font-bold text-[#228c22]">Trace</span>
                        </div>
                        <button onClick={() => registerStudent("test@email.com", "actual_university_id", uuidv4())}>
  Test Student Register
</button>
                        <div className="flex items-center pr-0">
                            <button
                                onClick={() => handleNavigation('university')}
                                className="ml-3 bg-white text-[#228c22] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium border border-[#228c22]"
                            >
                                I'm A University Representative
                            </button>
                            <button
                                onClick={() => handleNavigation('company')}
                                className="ml-3 bg-white text-[#228c22] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium border border-[#228c22]"
                            >
                                I'm A Company Representative
                            </button>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="ml-3 bg-[#228c22] text-white hover:bg-[#1c7a1c] px-4 py-2 rounded-md text-sm font-medium border border-[#228c22]"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile navigation menu (hidden by default) */}
            <div className="md:hidden hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <button
                        onClick={() => handleNavigation('student')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#228c22] hover:bg-gray-50"
                    >
                        I'm A Student
                    </button>
                    <button
                        onClick={() => handleNavigation('university')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#228c22] hover:bg-gray-50"
                    >
                        I'm A University Representative
                    </button>
                    <button
                        onClick={() => handleNavigation('company')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#228c22] hover:bg-gray-50"
                    >
                        I'm A Company Representative
                    </button>
                </div>
            </div>

            {/* Show Login Modal if needed */}
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-16 bg-white sm:pb-40 md:pb-52 lg:pb-60 xl:pb-16">
                        <main className="mt-10 mx-auto px-4 sm:mt-14 sm:px-6 md:mt-20 lg:mt-24 lg:px-8 xl:mt-28 flex flex-col items-center text-center min-h-[80vh]">
                            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl leading-tight">
                                <span className="block xl:inline">Facts.</span>{' '}
                                <span className="block text-[#228c22] italic xl:inline">Locked In.</span>
                            </h1>
                            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl leading-tight">
                                <span className="block xl:inline">Doubt.</span>{' '}
                                <span className="block text-[#e81f17] italic xl:inline">Locked Out.</span>
                            </h1>

                            <p className="mt-6 text-xl text-gray-500 sm:mt-10 sm:text-2xl max-w-xl md:text-2xl">
                                Trace revolutionizes how academic credentials are verified. Immutable, secure, and instantly verifiable, eliminating the need for university registrars as middlemen.
                            </p>

                            <div className="mt-12 flex flex-wrap justify-center gap-4">
                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#228c22] hover:bg-[#1c7a1c]"
                                >
                                    How It Works
                                </a>
                                <a
                                    href="#learn-more"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-[#228c22] text-base font-medium rounded-md text-[#228c22] bg-white hover:bg-gray-50"
                                >
                                    Learn More
                                </a>
                            </div>
                        </main>
                    </div>
                </div>
            </div>



            {/* How It Works Section */}
            <div id="how-it-works" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-[#228c22] font-semibold tracking-wide uppercase">How It Works</h2>
                        <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Blockchain-powered credential verification
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto mb-16">
                            Our platform leverages Ethereum blockchain technology to create immutable, trustworthy academic records
                        </p>

                        <div className="py-16 bg-white" id="verify-transcript">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-[#228c22] text-white">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="mt-5 text-center">
                                    <h3 className="text-xl leading-6 font-bold text-gray-900">Universities Issue Credentials</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Verified institutions create and issue digital academic records secured by blockchain technology.
                                        Each credential is hashed and stored on the Ethereum blockchain, creating a tamper-proof record.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-[#228c22] text-white">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="mt-5 text-center">
                                    <h3 className="text-xl leading-6 font-bold text-gray-900">Students Own Their Data</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Students receive verified credentials in their digital wallet and control who sees them.
                                        No more relying on university registrars or risking lost documents. Your credentials
                                        are always accessible and under your control.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-[#228c22] text-white">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="mt-5 text-center">
                                    <h3 className="text-xl leading-6 font-bold text-gray-900">Employers Verify Instantly</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Companies can instantly verify academic credentials without contacting universities.
                                        The verification is cryptographically secure and takes seconds instead of days,
                                        streamlining hiring processes and eliminating credential fraud.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learn More Section */}
            <div id="learn-more" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-[#228c22] font-semibold tracking-wide uppercase">Learn More</h2>
                        <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Why use Trace?
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* For Students */}
                        <div className="flex flex-col md:flex-row items-start">
                            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
                                <h3 className="text-2xl font-bold text-black mb-4">For Students</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Own and control your academic records</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Share verified credentials instantly</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">No more requesting transcripts from registrars</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Keep your credentials forever, without risk of loss</span>
                                    </li>
                                </ul>
                            </div>

                            {/* For Universities */}
                            <div className="md:w-1/3 mb-8 md:mb-0 md:px-8">
                                <h3 className="text-2xl font-bold text-black mb-4">For Universities</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Reduce administrative burden and costs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Enhance credential security and trust</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Protect against credential fraud</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Future-proof your credentialing process</span>
                                    </li>
                                </ul>
                            </div>

                            {/* For Employers */}
                            <div className="md:w-1/3 md:pl-8">
                                <h3 className="text-2xl font-bold text-black mb-4">For Employers</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Instant credential verification</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Eliminate fake degrees and resumes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Streamline hiring processes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="h-6 w-6 text-[#228c22] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-lg text-black">Reduce background check costs and time</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#228c22]">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to get started?</span>
                        <span className="block text-white">Join Trace today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
                        <div className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => handleNavigation('student')}
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#228c22] bg-white hover:bg-gray-50"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => handleNavigation('university')}
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1c7a1c] hover:bg-[#196919]"
                            >
                                Register Institution
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                        <div className="px-5 py-2">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                About
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                Blog
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                Privacy
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                Terms
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                Contact
                            </a>
                        </div>
                    </nav>
                    <p className="mt-8 text-center text-base text-gray-400">
                        &copy; 2025 Trace. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;