"use client";

import { useState, useEffect } from "react";

import { addBaseUrlToImages } from "@/utility/addBaseUrlToImages";

const Content = ({ data }: { data: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const contentWithFixedImages = addBaseUrlToImages(data);
  return (
    <div
      className="detail-content large-image"
      dangerouslySetInnerHTML={{ __html: contentWithFixedImages }}
    />
  );
};

export default Content;
