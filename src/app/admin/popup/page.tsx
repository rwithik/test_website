"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PopupNotice {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  pdf_url: string | null;
  button_text: string;
  button_link: string;
  active: boolean;
  created_at: string;
}

export default function PopupPage() {

  //-----------------------------
  // Existing Popups
  //-----------------------------

  const [popups, setPopups] = useState<PopupNotice[]>([]);

  //-----------------------------
  // Form Fields
  //-----------------------------

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [buttonText, setButtonText] = useState("");

  const [buttonLink, setButtonLink] = useState("");

  const [active, setActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

const [pdfFile, setPdfFile] = useState<File | null>(null);

  //-----------------------------

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  //-----------------------------
  // Load Data
  //-----------------------------

  useEffect(() => {
    loadPopups();
  }, []);

  async function loadPopups() {

    const { data, error } = await supabase
      .from("popup_notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {

      setPopups(data);

    }

  }

  //-----------------------------
  // Save Popup
  //-----------------------------

  async function savePopup() { 
    if (title.trim() === "") 
      { 
        alert("Please enter popup title."); 
        return; } 
        setLoading(true); setMessage(""); 
        let imageUrl: string | null = null; 
        let pdfUrl: string | null = null; // ----------------------------- // Upload Poster Image // ----------------------------- //
        if (imageFile) {

          const formData = new FormData();
        
          formData.append("file", imageFile);
        
          formData.append("bucket", "popup-images");
        
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
        
          const result = await response.json();
        
          if (!response.ok) {
        
            alert(result.error);
        
            setLoading(false);
        
            return;
        
          }
        
          imageUrl = result.url;
        
        }
                 // ----------------------------- // Upload PDF // --------------
                 if (pdfFile) {

                  const formData = new FormData();
                
                  formData.append("file", pdfFile);
                
                  formData.append("bucket", "popup-pdfs");
                
                  const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });
                
                  const result = await response.json();
                
                  if (!response.ok) {
                
                    alert(result.error);
                
                    setLoading(false);
                
                    return;
                
                  }
                
                  pdfUrl = result.url;
                
                }
                  // ----------------------------- // Only one popup should be active // ----------------------------- 
                  if (active) { await supabase 
                    .from("popup_notices") 
                    .update({ active: false }) 
                    .eq("active", true); } 
                    // ----------------------------- // Insert Popup // ----------------------------- 
                    const { error } = await supabase 
                    .from("popup_notices") 
                    .insert({ 
                      title, 
                      description, 
                      button_text: buttonText, 
                      button_link: buttonLink, 
                      image_url: imageUrl, 
                      pdf_url: pdfUrl, 
                      active 
                    }); 
                    setLoading(false); 
                    if (error) { alert(error.message); 
                      return; 
                    } 
                    setMessage("Popup saved successfully."); 
                    setTitle(""); 
                    setDescription(""); 
                    setButtonText(""); 
                    setButtonLink(""); 
                    setImageFile(null); 
                    setPdfFile(null); 
                    loadPopups(); 
                  }

  return (

    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-primary-700 mb-8">

        Popup Notice Management

      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">

          Create Popup

        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">

              Title

            </label>

            <input

              value={title}

              onChange={(e) => setTitle(e.target.value)}

              className="w-full border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Description

            </label>

            <textarea

              rows={5}

              value={description}

              onChange={(e) => setDescription(e.target.value)}

              className="w-full border rounded-lg p-3"

            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">

                Button Text

              </label>

              <input

                value={buttonText}

                onChange={(e) => setButtonText(e.target.value)}

                className="w-full border rounded-lg p-3"

              />

            </div>

            <div>

              <label className="block mb-2 font-medium">

                Button Link

              </label>

              <input

                value={buttonLink}

                onChange={(e) => setButtonLink(e.target.value)}

                className="w-full border rounded-lg p-3"

              />

            </div>

          </div>
          <div>

  <label className="block mb-2 font-medium">

    Poster Image

  </label>

  <input

    type="file"

    accept="image/*"

    onChange={(e)=>{

      if(e.target.files){

        setImageFile(e.target.files[0]);

      }

    }}

  />

</div>
<div>

  <label className="block mb-2 font-medium">

    PDF File (optional)

  </label>

  <input

    type="file"

    accept=".pdf"

    onChange={(e)=>{

      if(e.target.files){

        setPdfFile(e.target.files[0]);

      }

    }}

  />

</div>
          <div>

            <label className="flex items-center gap-3">

              <input

                type="checkbox"

                checked={active}

                onChange={(e) => setActive(e.target.checked)}

              />

              Active Popup

            </label>

          </div>

          <button

            onClick={savePopup}

            disabled={loading}

            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700"

          >

            {loading ? "Saving..." : "Save Popup"}

          </button>

          {

            message &&

            <p className="text-green-600 font-medium">

              {message}

            </p>

          }

        </div>

      </div>

      <div className="mt-12">

        <h2 className="text-2xl font-semibold mb-5">

          Existing Popups

        </h2>

        <div className="space-y-4">

          {

            popups.map((popup) => (

              <div

                key={popup.id}

                className="border rounded-lg p-5 bg-white shadow"

              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">

                      {popup.title}

                    </h3>

                    <p className="text-slate-600">

                      {popup.description}

                    </p>
                    {popup.image_url && ( 
                      <img 
                      src={popup.image_url} 
                      alt={popup.title} 
                      className="mt-3 w-48 rounded-lg border" 
                      /> 
                      )}
                      {popup.pdf_url && (

                      <a
                        href={popup.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                         className="text-blue-600 underline block mt-2"
                        >
                        📄 View PDF
                      </a>

                    )}
                  </div>

                  <div>

                    {

                      popup.active ?

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                        Active

                      </span>

                      :

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

                        Inactive

                      </span>

                    }

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}