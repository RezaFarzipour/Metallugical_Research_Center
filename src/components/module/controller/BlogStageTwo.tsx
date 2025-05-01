"use client";
import React from "react";
import TextEditor from "../textEditor/TextEditor";
import BlurModal from "@/components/element/BlurModal";

const BlogStageTwo = () => {
  const handleConfirm = () => {

  };
  return (
    <div>
      <BlurModal
        title="ساخت هدر بلاگ"
        bodyContent={<TextEditor />}
        onConfirm={handleConfirm}
        heightProp="full"
      />
      <BlurModal
        title="ساخت متن"
        bodyContent={<TextEditor />}
        onConfirm={handleConfirm}
        heightProp="full"
      />
      
    </div>
  );
};

export default BlogStageTwo;
