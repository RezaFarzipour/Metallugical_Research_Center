"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Button } from "@heroui/button";
import {
  alignmentButtons,
  baseButtons,
  blockquoteAndHr,
  headingButtons,
  listButtons,
  undoButtons,
} from "./toolbarButtons";

// 📌 تعریف نوع دکمه
type ToolbarButton = {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
};

// 📌 نوع props برای TextEditor
interface TextEditorProps {
  html: string;
  setHtml: (value: string) => void;
  onSave?: () => void;
}
const TextEditor: React.FC<TextEditorProps> = ({ html, setHtml, onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
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
  const headingBtn = [...headingButtons(editor)];
  const allBtn = [
    ...baseButtons(editor, pickColor, addImage),
    ...alignmentButtons(editor),
    ...listButtons(editor),
    ...blockquoteAndHr(editor),
  ];
  const undoBtn = [...undoButtons(editor)];

  return (
    <div className="p-4 bg-secondary-50 rounded-lg text-white">
      <div className="relative flex flex-wrap gap-3 mb-4 bg-secondary-700 p-3 rounded-md">
        <div className=" p-3 rounded-lg mb-3 grid grid-cols-3 gap-2 w-2/3">
          {headingBtn.map(({ title, icon, action }, idx) => (
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

          <div className="col-span-3 ">
            {allBtn.map(({ title, icon, action }, idx) => (
              <Button
                key={idx}
                isIconOnly={!!icon}
                onPress={action}
                title={title}
                className="icon-btn m-2"
              >
                {icon || title}
              </Button>
            ))}
          </div>
        </div>
        {/* باکس دکمه‌های Undo/Redo */}
        <div className="p-3 rounded-lg mb-3 absolute left-0 top-0  ">
          {undoBtn.map(({ title, icon, action }, idx) => (
            <Button
              key={idx}
              isIconOnly={!!icon}
              onPress={action}
              title={title}
              className="icon-btn m-1"
            >
              {icon || title}
            </Button>
          ))}
        </div>

        {/* دکمه ذخیره */}
        <Button
          onPress={() => {
            setHtml(editor.getHTML());
            onSave?.();
          }}
          className="bg-green-600 text-white px-4 absolute bottom-4 left-3"
        >
          پیش نمایش
        </Button>
      </div>
      {/* محتوای ویرایشگر */}
      <div
        className="bg-white text-black p-4 rounded-lg min-h-[200px] max-h-[400px] overflow-y-auto border border-gray-200 "
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>
      {/* نمایش HTML و رندر شده */}
      {html && (
        <>
          <h3 className="mt-4 font-bold text-gray-400">پیش نمایش:</h3>
          <div
            className="bg-white  text-black p-2 border rounded pl-5 list-custome br-custome"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      )}
    </div>
  );
};

export default TextEditor;
