"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FormEvent } from "react";
export default function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [course, setCourse] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  
    const { error } = await supabase
      .from("admissions")
      .insert([
        {
          full_name: name,
          email: email,
          phone: phone,
          course: course,
        },
      ]);
  
    if (error) {
      alert("Registration failed");
    } else {
      alert("Registration successful");
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admission Registration
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 w-full"
        />

        <select className="border p-2 w-full">
          <option>Computer Engineering</option>
          <option>Computer Science & Technology</option>
          <option>Electronics & Communication</option>
          <option>Electronics Engineering</option>
          <option>Electrical & Electronics</option>
          <option>Mechanical Engineering</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}