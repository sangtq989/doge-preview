"use client";
import PhotoGallery from "@/components/PhotoGallery";
import { useEffect, useState } from "react";
//  import photos from "@/components/photo";

const convertLink = (id: string) =>
  `https://lh3.googleusercontent.com/d/${id}`;

export default function Home() {
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/doges")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotoData(data);
        setLoading(false);
      });
  }, []);

  const photos = photoData?.files?.map((photo) => {
    const metadata = photo.imageMediaMetadata
      ? photo.imageMediaMetadata
      : photo.videoMediaMetadata;

    return {
      src: convertLink(photo.id),
      width: metadata.width,
      height: metadata.height,
      mimiType: photo.fileExtension,
      id: photo.id
    };
  });

  if (isLoading) return <p>Loading...</p>;

  return <PhotoGallery photos={photos} />;
}
