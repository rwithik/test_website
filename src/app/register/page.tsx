"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [course, setCourse] = useState("");
const [qualification, setQualification] = useState("");
const [percentage, setPercentage] = useState("");
const [dob, setDob] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("Form submitted");

  const { data, error } = await supabase
  .from("admissions")
  .insert([
    {
      full_name: name,
      email,
      phone,
      course,
      qualification,
      percentage,
      dob,
    },
  ])
  .select();


        
  
      if (error) {
        
        alert(error.message);
      } else {
      alert("Registration successful");
      setName("");
      setEmail("");
      setPhone("");
      setCourse("");
  
      setQualification("");
      setPercentage("");
      setDob("");
  
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
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border p-2 w-full"
  required
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="border p-2 w-full"
  required
/>

<input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="border p-2 w-full"
  required
/>
         <div>
  <label className="block mb-2">
    Date of Birth
  </label>

  <input
    type="date"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
    className="w-full border rounded-lg p-3"
    required
  />
</div>
         <div>
          <label className="block mb-2">
              Qualification
          </label>

    <select
      value={qualification}
      onChange={(e) => setQualification(e.target.value)}
      className="w-full border rounded-lg p-3"
      required
    >
       <option value="">
        Select Qualification
       </option>

       <option value="SSLC">
        SSLC
       </option>

       <option value="Plus Two">
        Plus Two
       </option>

       <option value="ITI">
        ITI
        </option>
        </select>
        </div>
        <div>
        <label className="block mb-2">
           Percentage of Marks
         </label>

         <input
           type="number"
           value={percentage}
           onChange={(e) => setPercentage(e.target.value)}
           placeholder="Enter Percentage"
           className="w-full border rounded-lg p-3"
           required
         />
         </div>

        <select
  value={course}
  onChange={(e) => setCourse(e.target.value)}
  className="w-full border rounded-lg p-3"
  required
>
  <option value="">
    Select Course
  </option>

  <option value="Computer Engineering">
    Computer Engineering
  </option>

  <option value="Computer Science & Technology">
    Computer Science & Technology
  </option>

  <option value="Electronics & Communication">
    Electronics & Communication
  </option>

  <option value="Electronics Engineering">
    Electronics Engineering
  </option>

  <option value="Electrical & Electronics Engineering">
    Electrical & Electronics Engineering
  </option>

  <option value="Mechanical Engineering">
    Mechanical Engineering
  </option>
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