// utils/registerUser.ts
import { auth, db } from "../../firebase"
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { fetchSignInMethodsForEmail } from "firebase/auth"

const actionCodeSettings = {
  url: typeof window !== "undefined" ? window.location.origin + "/student" : "http://localhost:3000/student",
  handleCodeInApp: true,
}

// STUDENT: Email link for password setup
export async function registerStudent(email: string) {
    const userExists = (await fetchSignInMethodsForEmail(auth, email)).length > 0
    if (userExists) throw new Error("Email is already registered")

   await sendSignInLinkToEmail(auth, email, actionCodeSettings)

   // Store placeholder user doc in Firestore
  const docRef = doc(db, "users", email)
  await setDoc(docRef, {
    email,
    type: "student",
    createdAt: new Date(),
  })

   return "Email sent! Please check your inbox to finish registration."
}

// UNIVERSITY REP: Create account with password
export async function registerUniversityRep(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCred.user.uid

  // Set document with just the required fields
  await setDoc(doc(db, "users", uid), {
    email,
    type: "university-rep",
    createdAt: new Date(),
  })
  
  return userCred.user
}

// COMPANY REP: Create account with password
export async function registerCompanyRep(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCred.user.uid

  // Set document with just the required fields
  await setDoc(doc(db, "users", uid), {
    email,
    type: "company-rep",
    createdAt: new Date(),
  })
  
  return userCred.user
}