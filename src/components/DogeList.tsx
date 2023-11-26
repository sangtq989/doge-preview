"use client";
// import {getAllDogeDrive} from "@/action/DogeAPI";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";


function DogePage({index, nextToken}){
    
}

export default function DogeList() {
  const [dogeData, setDogeData] = useState([]);
  const [nextToken, setNextToken] = useState();
  const [loading, setLoading] = useState(true);

  const fetcher = (url: any) => fetch(url).then((r) => r.json());


  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <p>Page {size}</p>
      <button onClick={() => setSize(size + 1)}>Load More</button>
      <p>{nextToken}</p>
      {dogeData ? (
        dogeData?.map((item, index) =>
          item.mimeType != "video/mp4" ? (
            <Image
              width={200}
              height={300}
              key={index}
              src={`https://lh3.googleusercontent.com/d/${item.id}`}
              alt={item?.name}
              className="object-contain h-48 rounded"
            />
          ) : (
            <video
              key={index}
              src={`https://drive.google.com/uc?id=${item.id}`}
              controls
            ></video>
          )
        )
      ) : (
        <div className="text-xl font-bold">No doge left available !! </div>
      )}
    </section>
  );
}
