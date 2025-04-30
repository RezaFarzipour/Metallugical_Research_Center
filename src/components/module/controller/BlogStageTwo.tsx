"use client";
import React from "react";
import TextEditor from "../textEditor/TextEditor";
import BlurModal from "@/components/element/BlurModal";

const BlogStageTwo = () => {
  const handleConfirm = () => {
    console.log("Confirmed!");
  };
  return (
    <div>
      <BlurModal
        title="ساخت هدر بلاگ"
        bodyContent={<TextEditor />}
        onConfirm={handleConfirm}
      />
      <BlurModal
        title="ساخت متن"
        bodyContent={<TextEditor />}
        onConfirm={handleConfirm}
      />
      
    </div>
  );
};

export default BlogStageTwo;
