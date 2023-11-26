import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      {photo.mimiType == "mp4" ? (
        <video
          src={`https://drive.google.com/uc?id=${photo.id}`}
           style={{ width: '100%', height: '100%' }} 
          controls
        ></video>
      ) : (
        <Image
          fill
          src={photo}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
          {...{ alt, title, sizes, className, onClick }}
        />
      )}
    </div>
  );
}
