"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing");

        if (!response.ok) {
          throw new Error("Spotify API request failed");
        }

        const json = (await response.json()) as SpotifyData;
        setData(json);
      } catch {
        setData({ isPlaying: false });
      }
    };

    void fetchNowPlaying();
    const interval = window.setInterval(fetchNowPlaying, 10_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={data ? (data.isPlaying ? "playing" : "idle") : "loading"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3 text-sm md:text-base"
        >
          {!data ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span>loading spotify...</span>
            </div>
          ) : data.isPlaying ? (
            <div className="flex min-w-0 items-center gap-3 text-muted-foreground">
              {data.albumImageUrl && (
                <Image
                  src={data.albumImageUrl}
                  alt={data.title || "album art"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl border border-white/5 shadow-sm"
                  unoptimized
                />
              )}

              <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                <span className="font-semibold text-foreground">Listening to</span>

                {data.songUrl ? (
                  <Link
                    href={data.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer"
                    title={`Play ${data.title} on Spotify`}
                  >
                    <span className="max-w-[16rem] truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                      {data.title}
                    </span>
                  </Link>
                ) : (
                  <span className="max-w-[16rem] truncate font-semibold text-foreground">
                    {data.title}
                  </span>
                )}

                <span className="text-muted-foreground">by</span>
                <span className="max-w-[14rem] truncate text-muted-foreground">
                  {data.artist}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="size-4 flex-shrink-0" viewBox="0 0 168 168" fill="currentColor">
                <path d="M83.996 0C37.747 0 0 37.747 0 83.996c0 46.249 37.747 83.996 83.996 83.996 46.249 0 83.996-37.747 83.996-83.996C167.992 37.747 130.245 0 83.996 0zm38.446 120.988c-1.509 2.471-4.723 3.246-7.178 1.737-19.662-12.01-44.414-14.736-73.564-8.075-2.809.642-5.601-1.121-6.243-3.93-.643-2.808 1.12-5.6 3.929-6.242 31.9-7.291 59.263-4.15 81.336 9.601 2.471 1.509 3.246 4.723 1.737 7.178zm10.271-22.86c-1.895 3.076-5.904 4.042-8.98 2.146-22.531-13.872-56.874-17.887-83.503-9.817-3.463 1.045-7.111-.911-8.156-4.374-1.045-3.463.911-7.111 4.374-8.156 30.436-9.228 68.168-4.745 94.127 11.227 3.076 1.896 4.042 5.904 2.146 8.98zm.882-23.781c-27.094-16.066-71.705-17.545-97.581-9.709-3.927 1.19-8.06-1.027-9.25-4.954-1.19-3.927 1.027-8.06 4.954-9.25 29.645-8.997 79.004-7.29 110.062 11.104 3.564 2.112 4.733 6.706 2.621 10.27-2.111 3.564-6.706 4.733-10.27 2.621z" />
              </svg>
              <span>not listening to anything rn.</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}