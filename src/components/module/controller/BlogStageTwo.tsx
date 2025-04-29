"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Subscript as SubIcon,
  Superscript as SuperIcon,
  Image as ImageIcon,
  PaintBucket,
  Eraser,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  RefreshCcw,
  Quote,
  Minus,
} from "lucide-react";
import { Button } from "@heroui/button";

const EditorWithToolbar = () => {
  const [html, setHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
        bulletList: { keepMarks: true, keepAttributes: true },
        orderedList: { keepMarks: true, keepAttributes: true },
        heading: {
          levels: [1, 2, 3, 4, 5, 6], // تعریف سطوح H1 تا H6
        },
      }),
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading,
      Blockquote,
      HorizontalRule,
    ],
  });

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const pickColor = () => {
    const input = document.createElement("input");
    input.type = "color";
    input.onchange = () => {
      editor.chain().focus().setColor(input.value).run();
    };
    input.click();
  };

  const buttons = [
    {
      icon: <Bold size={18} />,
      action: () => editor.chain().focus().toggleBold().run(),
      title: "Bold",
    },
    {
      icon: <Italic size={18} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      title: "Italic",
    },
    {
      icon: <UnderlineIcon size={18} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      title: "Underline",
    },
    {
      icon: <Strikethrough size={18} />,
      action: () => editor.chain().focus().toggleStrike().run(),
      title: "Strike",
    },
    {
      icon: <SubIcon size={18} />,
      action: () => editor.chain().focus().toggleSubscript().run(),
      title: "Subscript",
    },
    {
      icon: <SuperIcon size={18} />,
      action: () => editor.chain().focus().toggleSuperscript().run(),
      title: "Superscript",
    },
    { icon: <PaintBucket size={18} />, action: pickColor, title: "Color" },
    { icon: <ImageIcon size={18} />, action: addImage, title: "Insert Image" },
    {
      icon: <Eraser size={18} />,
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      title: "Clear",
    },
  ];

  const alignments = [
    {
      icon: <AlignLeft size={18} />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      title: "Align Left",
    },
    {
      icon: <AlignCenter size={18} />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      title: "Align Center",
    },
    {
      icon: <AlignRight size={18} />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      title: "Align Right",
    },
    {
      icon: <AlignJustify size={18} />,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      title: "Justify",
    },
  ];

  const lists = [
    {
      icon: <List size={18} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      title: "Bulleted List",
    },
    {
      icon: <ListOrdered size={18} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      title: "Ordered List",
    },
  ];

  const undos = [
    {
      icon: <Undo2 size={18} />,
      action: () => editor.chain().focus().undo().run(),
      title: "Undo",
    },
    {
      icon: <Redo2 size={18} />,
      action: () => editor.chain().focus().redo().run(),
      title: "Redo",
    },
    {
      icon: <RefreshCcw size={18} />,
      action: () => editor.commands.setContent(""),
      title: "Clear Content",
    },
  ];

  const headings = [
    {
      title: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      title: "H4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      title: "H5",
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    {
      title: "H6",
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    },
  ];
  const blockquoteAndHrButtons = [
    {
      icon: <Quote size={18} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      title: "Blockquote",
    },
    {
      icon: <Minus size={18} />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      title: "Horizontal Rule",
    },
  ];

  return (
    <div className="p-4 bg-secondary-900 text-white min-h-screen">
      <div className="flex flex-wrap gap-3 mb-4 bg-secondary-800 p-3 rounded-lg">
        {[
          ...headings,
          ...buttons,
          ...alignments,
          ...lists,
          ...undos,
          ...blockquoteAndHrButtons,
        ].map(({ title, icon, action }, idx) => (
          <Button
            key={idx}
            isIconOnly={!!icon}
            onPress={action}
            title={title}
            className="icon-btn"
          >
            {icon || title}
          </Button>
        ))}
        <Button
          onPress={() => setHtml(editor.getHTML())}
          className="bg-green-600 text-white px-4"
        >
          ذخیره
        </Button>
      </div>

      <div className="bg-white text-black p-4 rounded-lg min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      {html && (
        <>
          <h3 className="mt-6 font-bold">نمایش HTML:</h3>
          <pre className="bg-gray-100 text-black p-2 whitespace-pre-wrap">
            {html}
          </pre>

          <h3 className="mt-4 font-bold">نمایش رندرشده:</h3>
          <div
            className="bg-white text-black p-2 border rounded list-disc pl-5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      )}
    </div>
  );
};

export default EditorWithToolbar;
