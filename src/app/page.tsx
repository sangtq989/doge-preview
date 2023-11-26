"use client";
import PhotoGallery from "@/components/PhotoGallery";
import LoadMore from "@/components/ui/LoadMore";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const convertLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const fetchWithToken = (url: string, token: string) => {
  return fetch(`${url}?nextToken=${token}`).then((res) => res.json());
};

export default function Home() {
  const [token, setToken] = useState("");
  const [photo, setPhoto] = useState([]);

  const { data, error, isLoading } = useSWR(
    ["/api/doges", token],
    ([url, token]) => fetchWithToken(url, token)
  );

  const endOfPageRef = useRef(null);
  const isLoadingMoreData = useRef(false);

  const handleScroll = () => {
    if (
      endOfPageRef.current &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      if (!isLoadingMoreData.current) {
        isLoadingMoreData.current = true;
        setTimeout(() => {
          setToken(data.nextPageToken);
          isLoadingMoreData.current = false;
        }, 300); // Adjust the delay time (in milliseconds) as needed
      }
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      const photos = data.files.map((photo) => {
        const metadata = photo.imageMediaMetadata
          ? photo.imageMediaMetadata
          : photo.videoMediaMetadata;

        return {
          src: convertLink(photo.id),
          width: metadata.width,
          height: metadata.height,
          mimiType: photo.fileExtension,
          id: photo.id,
        };
      });

      setPhoto((prevArray) => [...prevArray, ...photos]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, );

  return (
    <>
      <PhotoGallery photos={photo} />
      {isLoading ? (
        <div>
          <LoadMore></LoadMore>
          <div style={{ display: "block", height: "200px" }}></div>
        </div>
      ) : (
        <div>
          <div
            ref={endOfPageRef}
            className="relative rounded-xl overflow-auto p-8"
          >
            <div className="flex justify-center">
              <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-violet-500"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
          <div style={{ display: "block", height: "200px" }}></div>
        </div>
      )}
    </>
  );
}
