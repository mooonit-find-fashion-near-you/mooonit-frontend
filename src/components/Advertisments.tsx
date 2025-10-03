"use client";

import { useEffect, useState } from "react";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Advertisement = {
  id: string;
  section: string;
  saleText: string;
  headline: string;
  buttonText: string;
  imageUrl: string;
  imageAlt: string;
  backgroundColor: string;
};

export default function Advertisments({
  activeSection,
}: {
  activeSection: string;
}) {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAds = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/advertisements?section=${encodeURIComponent(activeSection)}`,
          { signal }
        );
        if (!res.ok) {
          // log and set empty ads to avoid breaking the carousel
          const message = `Failed to load advertisements: ${res.status} ${res.statusText}`;
          console.error(message);
          setError(message);
          setAds([]);
          return;
        }
        const data = await res.json();
        setAds(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        // narrow unknown to check for AbortError and other error shapes
        if (typeof error === "object" && error !== null) {
          const err = error as { name?: unknown };
          if (typeof err.name === "string" && err.name === "AbortError") return;
        }
        console.error("Failed to load advertisements:", error);
        setError(String(error));
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();

    return () => controller.abort();
  }, [activeSection]);

  if (loading)
    return <p className="text-center py-8">Loading advertisements...</p>;

  if (error)
    return (
      <div className="text-center py-8">
        <p className="mb-4">{error}</p>
        <button
          className="bg-[#FFDC91] px-4 py-2 rounded"
          onClick={() => {
            setError(null);
            setLoading(true);
            // trigger re-fetch by calling fetchAds through effect: update a key by changing state
            // simplest is to call fetch directly here
            (async () => {
              try {
                const res = await fetch(
                  `/api/advertisements?section=${encodeURIComponent(
                    activeSection
                  )}`
                );
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                const data = await res.json();
                setAds(Array.isArray(data) ? data : []);
              } catch (e) {
                setError(String(e));
              } finally {
                setLoading(false);
              }
            })();
          }}
        >
          Retry
        </button>
      </div>
    );

  if (!ads || ads.length === 0)
    return <p className="text-center py-8">No advertisements available.</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto relative">
        <Carousel className="w-full">
          <CarouselContent>
            {ads.map((ad) => (
              <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <PromotionalBanner
                    saleText={ad.saleText}
                    headline={ad.headline}
                    buttonText={ad.buttonText}
                    imageUrl={ad.imageUrl}
                    imageAlt={ad.imageAlt}
                    onButtonClick={() => console.log("Ad clicked:", ad.id)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
