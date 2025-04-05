// utils/registerUser.ts
import { auth, db } from "../../firebase"
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth"
import { doc, setDoc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore"
import { fetchSignInMethodsForEmail } from "firebase/auth"
import { v4 as uuidv4 } from 'uuid'; // Install: npm install uuid @types/uuid

const actionCodeSettings = {
  url: typeof window !== "undefined" ? window.location.origin + "/student" : "http://localhost:3000/student",
  handleCodeInApp: true,
}

// Create a University entity and return its ID
async function createUniversity(universityName: string, repId: string) {
  // Create a university document with a generated ID
  const universityRef = await addDoc(collection(db, "universities"), {
    name: universityName,
    repId: repId, // Reference to the university rep
    transactionId: null, // Will be set when first student is created
    createdAt: new Date(),
  });
  return universityRef.id;
}

// UNIVERSITY REP: Create account with password
export async function registerUniversityRep(
  email: string, 
  password: string, 
  universityName: string
) {
  // Create the user account first
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  
  // Set document for the user
  await setDoc(doc(db, "users", uid), {
    email,
    type: "university-rep",
    createdAt: new Date(),
  });
  
  // Now create the university entity with reference to this rep
  const universityId = await createUniversity(universityName, uid);
  
  // Update the user with the university reference
  await updateDoc(doc(db, "users", uid), {
    universityId,
  });
  
  return userCred.user;
}

// STUDENT: Email link for password setup
// utils/registerUser.ts - modified registerStudent function

// STUDENT: Email link for password setup
export async function registerStudent(email: string, universityId: string) {
    console.log("📩 Starting student registration...", email, universityId)
  
    try {
      const userExists = (await fetchSignInMethodsForEmail(auth, email)).length > 0
      if (userExists) throw new Error("Email is already registered")
  
      const transactionId = uuidv4()
      const universityRef = doc(db, "universities", universityId)
      let universityDoc = await getDoc(universityRef)
  
      // 🔁 Fallback if university doesn't exist: create a default "University of Kentucky"
      if (!universityDoc.exists()) {
        console.warn("⚠️ University not found, creating fallback 'University of Kentucky'")
        await setDoc(universityRef, {
          name: "University of Kentucky",
          createdAt: new Date(),
        })
        universityDoc = await getDoc(universityRef)
      }
  
      const actionCode = {
        ...actionCodeSettings,
        url: `${actionCodeSettings.url}?universityId=${universityId}&transactionId=${transactionId}`,
      }
  
      console.log("📨 Sending sign-in link...")
      await sendSignInLinkToEmail(auth, email, actionCode)
      console.log("✅ Email sent!")
  
      if (typeof window !== "undefined") {
        localStorage.setItem("emailForSignIn", email)
      }
  
      await setDoc(doc(db, "pendingStudents", email), {
        email,
        type: "student",
        universityId,
        transactionId,
        createdAt: new Date(),
        status: "pending",
      })
  
      await updateDoc(universityRef, {
        transactionId,
      })
  
      return "Email sent! Please check your inbox to finish registration."
    } catch (err) {
      console.error("🔥 Student registration error:", err)
      throw err
    }
  }

// COMPANY REP: Create account with password
export async function registerCompanyRep(
  email: string, 
  password: string, 
  companyName: string
) {
  // Create the user account
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  // Create a company document
  const companyRef = await addDoc(collection(db, "companies"), {
    name: companyName,
    repId: uid,
    createdAt: new Date(),
  });

  // Set user document with reference to the company
  await setDoc(doc(db, "users", uid), {
    email,
    type: "company-rep",
    companyId: companyRef.id,
    createdAt: new Date(),
  });
  
  return userCred.user;
}