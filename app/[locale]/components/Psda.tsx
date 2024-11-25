"use client"; // Mark this as a client component

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const Psda = () => {
  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    // Check if it's the user's first visit
    if (typeof window !== "undefined") {
      const isFirstVisit = localStorage.getItem("visited");

      if (!isFirstVisit && locale !== "mn") {
        // Set the user's locale to 'mn' on first visit
        localStorage.setItem("visited", "true");
        router.replace("/mn"); // Redirect to the 'mn' locale
      }
    }
  }, [locale, router]);

  return null; // No need to render anything
};

export default Psda;
