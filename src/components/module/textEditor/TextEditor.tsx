"use client";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
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
import ImageResize from "tiptap-extension-resize-image";
import { CgEnter } from "react-icons/cg";

// 📌 نوع props برای TextEditor
export type ToolbarButton = {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
};

export interface TextEditorProps {
  html: string;
  setHtml?: (value: string) => void;
  onSave?: () => void;
}
export interface TextEditorRef {
  getHtml: () => string;
}
const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  ({ html }, ref) => {
    const editor = useEditor({
      content: html,
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
        ImageResize,
        Image.configure({
          inline: false, // اجازه می‌دهد تصاویر به صورت inline رندر شوند
          allowBase64: true, // پشتیبانی از data URLs
          HTMLAttributes: {
            class: "mx-auto block pt-8",
          },
        }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Heading,
        Blockquote,
        HorizontalRule,
      ],
    });
    useEffect(() => {
      if (editor && html) {
        editor.commands.setContent(html);
      }
    }, [editor, html]);
    useImperativeHandle(ref, () => ({
      getHtml: () => editor?.getHTML() || "",
    }));

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
            editor
              .chain()
              .focus()
              .setImage({
                src: reader.result,
                alt: "image",
                title: "",
                class: "mx-auto block ",
              })
              .run();
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
      {
        title: "پاراگراف جدید",
        icon: <CgEnter />,
        action: () => editor.chain().focus().insertContent("<p><br></p>").run(),
      },
      ...baseButtons(editor, pickColor, addImage),

      ...alignmentButtons(editor),
      ...listButtons(editor),
      ...blockquoteAndHr(editor),
    ];
    const undoBtn = [...undoButtons(editor)];

    return (
      <div className="p-4 bg-secondary-50 rounded-lg text-white">
        <div className="relative flex flex-wrap gap-3 mb-4 bg-secondary-700 p-3 rounded-md">
          <div className=" p-3 rounded-lg mb-3 grid grid-cols-3 gap-2 w-5/5 pt-20 md:pt-1 md:w-2/3 ">
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
        </div>
        {/* محتوای ویرایشگر */}
        <div
          className="bg-white text-black p-4 rounded-lg min-h-[200px] max-h-[400px] overflow-y-auto border border-gray-200 "
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }
);
TextEditor.displayName = "TextEditor";
export default TextEditor;
