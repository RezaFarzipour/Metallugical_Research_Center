"use client";
import React from "react";
import BlurModal from "@/components/element/BlurModal";
import TextEditor from "@/components/module/textEditor/TextEditor";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";

const Stage2 = () => {
  const handleConfirm = () => {};
  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="بلاگ ها"
          item2="ساخت بلاگ"
          panelHref="/admin/blogs"
        />
      </div>
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

export default Stage2;
