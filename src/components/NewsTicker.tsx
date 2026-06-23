"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsTicker() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from("news_events")
      .select("*")
      .order("date", { ascending: false });

    setNews(data || []);
  }

  return (
    <div className="bg-red-600 text-white overflow-hidden py-3">
      <div className="flex whitespace-nowrap animate-marquee">
        {news.map((item) => (
          <span
            key={item.id}
            className="mx-10 font-medium"
          >
            📢 {item.title}
          </span>
        ))}
      </div>
    </div>
  );
}