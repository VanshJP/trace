"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LoginModal from '../LoginModal';
import { registerCompanyRep } from "../registerUser";

export default function CompanyRegistration() {
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [showLogin, setShowLogin] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("")
        setIsLoading(true)

        try {
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match")
            }

            // Register the company representative with Firebase
            // Pass company name now
            await registerCompanyRep(
                formData.email, 
                formData.password,
                formData.companyName
            )
            
            setSuccessMessage("Registration successful! Redirecting to dashboard...")
            
            // Redirect after a short delay to show success message
            setTimeout(() => {
                router.push('/dashboard/company');
            }, 2000);
            
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center">
                        <span className="text-3xl font-bold text-[#228c22]">Trace</span>
                    </Link>
                    <h1 className="mt-6 text-3xl font-bold text-black">Company Registration</h1>
                    <p className="mt-2 text-black">Create your company account</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                    {successMessage ? (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                            {successMessage}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="companyName" className="block text-black font-medium">
                                    Company Name
                                </label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-black font-medium">
                                    Company Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-black font-medium">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-black font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22]"
                                />
                            </div>

                            {error && <div className="text-red-500 text-sm">{error}</div>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-[#228c22] hover:bg-[#1c7a1c] text-white font-medium py-2 px-4 rounded-md ${
                                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                        </form>
                    )}

                    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

                    <div className="mt-4 text-center text-sm">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="w-full bg-[#228c22] hover:bg-[#1c7a1c] text-white font-medium py-2 px-4 rounded-md"
                        >
                            Already Have An Account? Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}