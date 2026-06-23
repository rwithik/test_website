"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EventCard from "./EventCard";
import Reveal from "@/components/ui/Reveal";

export default function NewsBoard() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data, error } = await supabase
      .from("news_events")
      .select("*")
      .order("date", { ascending: false });

    if (!error) {
      setNews(data || []);
    }
  }

  return (
    <>
      {news.map((item, i) => (
        <Reveal key={item.id} delay={i * 70}>
          <EventCard {...item} />
        </Reveal>
      ))}
    </>
  );
}