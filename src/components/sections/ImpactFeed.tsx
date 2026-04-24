"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IssueCard } from "../ui/IssueCard";
import { ScrambleText } from "../ui/ScrambleText";
import axios from "axios";

const MOCK_ISSUES = [
  {
    id: "1",
    title: "Broken Water Pipeline in Nazimabad",
    location: "Karachi",
    progress: 75,
    tokens: 450,
    isAiVerified: true,
    image: "/pothole.jpeg",
  },
  {
    id: "2",
    title: "Street Light Outage - Street 14",
    location: "Lahore",
    progress: 30,
    tokens: 120,
    isAiVerified: true,
    image: "/sewer.jpeg",
  },
  {
    id: "3",
    title: "Uncollected Waste Near School",
    location: "Islamabad",
    progress: 90,
    tokens: 890,
    isAiVerified: false,
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1000",
  },
];

export const ImpactFeed = () => {
  const [issues, setIssues] = useState(MOCK_ISSUES);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (apiUrl) {
          const response = await axios.get(`${apiUrl}/issues`);
          setIssues(response.data);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-rajdhani font-bold text-lime-neon tracking-widest uppercase mb-2"
          >
            <ScrambleText text="Humaray Maslay" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-rajdhani font-bold text-white tracking-tighter"
          >
            <ScrambleText text="Active Tameer" />
          </motion.h2>
        </div>
        
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-surface border border-border rounded-lg font-rajdhani font-bold text-xs text-zinc-400 hover:text-white transition-colors">
            FILTER: KARACHI
          </button>
          <button className="px-6 py-2 bg-surface border border-border rounded-lg font-rajdhani font-bold text-xs text-zinc-400 hover:text-white transition-colors">
            SORT: NEWEST
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <IssueCard {...issue} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
