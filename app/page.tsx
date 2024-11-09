/*import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main>
    </>
  );
} */
'use client';

import Link from "next/link";
import React, { useState } from "react";
import { FaFileAlt, FaTrash } from "react-icons/fa";

export default function Home() {
  // Initialize the state with the documents array
  const [documents, setDocuments] = useState([
    { title: " Project Requirement", time: "about 03 hours ago" },
    { title: "  Optimization Report", time: "about 14 hours ago" },
    { title: "  Best Practices", time: "about 16 hours ago" },
    { title: " Specifications", time: "about 22 hours ago" },
    { title: "RESTful API", time: "about 23 hours ago" },
  ]);

  // Function to handle deleting a document by index
  const handleDelete = (index: number) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-5xl px-10 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All documents</h2>
          <button className="px-4 ml-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Link href="/doc/1">+ Start a blank document</Link>
          </button>
        </div>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-6"> {/* Increased space-x value to 6 */}
                <FaFileAlt className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-lg font-semibold text-white">{doc.title}</p>
                  <p className="text-gray-300 text-sm">{doc.time}</p>
                </div>
              </div>
              <div className="ml-4"></div>
              <FaTrash
                className="text-gray-300 cursor-pointer"
                onClick={() => handleDelete(index)} // Call handleDelete when clicked
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}