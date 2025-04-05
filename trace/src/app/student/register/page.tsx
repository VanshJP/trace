// src/app/student/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { isSignInWithEmailLink, signInWithEmailLink, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../../firebase";
import Link from "next/link";

export default function StudentRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if this is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email from localStorage (it was stored when the link was sent)
      let storedEmail = window.localStorage.getItem('emailForSignIn');
      
      if (!storedEmail) {
        // If the email isn't saved locally, prompt the user for it
        storedEmail = window.prompt('Please provide your email for confirmation');
      }
      
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw new Error("Invalid or expired sign-in link");
      }

      // Complete the sign-in process
      const result = await signInWithEmailLink(auth, email, window.location.href);
      const user = result.user;

      // Set the user's password
      await updatePassword(user, password);

      // Update the user document with any additional info if needed
      // The user doc was created when the email was sent, but we can update it here
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          signupCompleted: true,
          // We don't need to update transactionId as it was already set when the email was sent
        });
      }

      // Clear the email from localStorage
      window.localStorage.removeItem('emailForSignIn');
      
      setSuccess(true);
      
      // Redirect to student dashboard after 2 seconds
      setTimeout(() => {
        router.push('/student');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <span className="text-3xl font-bold text-[#228c22]">Trace</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-black">Complete Student Registration</h1>
          <p className="mt-2 text-black">Set your password to access your verified academic credentials</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-center">
              <p className="font-medium">Registration successful!</p>
              <p>Redirecting to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-black font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500">
                  This is the email address the invitation was sent to
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-black font-medium">
                  Create Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#228c22]"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#228c22] hover:bg-[#1c7a1c] text-white font-medium py-2 px-4 rounded-md ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : "Complete Registration"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}