"use client";
import React, { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Eraser,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Undo2,
  Redo2,
  Image,
  PaintBucket,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@heroui/button";

// Types
type ExecCommand = (command: string, value?: string | null) => void;

const toolbarButtons: {
  icon: JSX.Element;
  cmd: string;
  title: string;
}[] = [
  { icon: <Bold size={18} />, cmd: "bold", title: "Bold" },
  { icon: <Italic size={18} />, cmd: "italic", title: "Italic" },
  { icon: <Underline size={18} />, cmd: "underline", title: "Underline" },
  {
    icon: <Strikethrough size={18} />,
    cmd: "strikeThrough",
    title: "Strikethrough",
  },
  { icon: <Subscript size={18} />, cmd: "subscript", title: "Subscript" },
  { icon: <Superscript size={18} />, cmd: "superscript", title: "Superscript" },
  { icon: <PaintBucket size={18} />, cmd: "textColor", title: "Text Color" },
];

const alignmentButtons: typeof toolbarButtons = [
  { icon: <AlignLeft size={18} />, cmd: "justifyLeft", title: "Align Left" },
  {
    icon: <AlignCenter size={18} />,
    cmd: "justifyCenter",
    title: "Align Center",
  },
  { icon: <AlignRight size={18} />, cmd: "justifyRight", title: "Align Right" },
  { icon: <AlignJustify size={18} />, cmd: "justifyFull", title: "Justify" },
];

const listButtons: typeof toolbarButtons = [
  {
    icon: <List size={18} />,
    cmd: "insertUnorderedList",
    title: "Bulleted List",
  },
  {
    icon: <ListOrdered size={18} />,
    cmd: "insertOrderedList",
    title: "Numbered List",
  },
  { icon: <Outdent size={18} />, cmd: "outdent", title: "Outdent" },
  { icon: <Indent size={18} />, cmd: "indent", title: "Indent" },
];

const commandHandlers: {
  image: (execCmd: ExecCommand) => void;
  textColor: (execCmd: ExecCommand) => void;
  fontSize: (
    e: React.ChangeEvent<HTMLSelectElement>,
    execCmd: ExecCommand
  ) => void;
} = {
  image: (execCmd) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result;
        if (typeof imageDataUrl === "string") {
          execCmd("insertImage", imageDataUrl);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  },
  textColor: (execCmd) => {
    const input = document.createElement("input");
    input.type = "color";
    input.onchange = () => execCmd("foreColor", input.value);
    input.click();
  },
  fontSize: (e, execCmd) => {
    const size = e.target.value;
    if (parseInt(size) >= 1 && parseInt(size) <= 7) execCmd("fontSize", size);
  },
};

export default function WordToolbarClone(): JSX.Element {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [html, setHtml] = useState<string>("");

  const execCmd: ExecCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="p-4 bg-secondary-900 text-white min-h-screen">
      <div className="relative flex flex-wrap gap-2 bg-secondary-900 p-3 rounded-lg ">
        {/* ابزارها: پاک کردن و درج تصویر */}
        <div className="flex flex-row md:flex-col gap-x-2 md:h-32 justify-between items-start border border-gray-700 rounded-lg p-2 bg-secondary-700">
          <Button
            isIconOnly
            onPress={() => execCmd("removeFormat")}
            className="icon-btn"
            title="Clear Formatting"
          >
            <Eraser size={18} />
          </Button>
          <Button
            isIconOnly
            onPress={() => commandHandlers.image(execCmd)}
            className="icon-btn"
            title="Insert Image"
          >
            <Image size={18} />
          </Button>
        </div>

        {/* اندازه فونت و دکمه‌ها */}
        <div className="border border-gray-700 rounded-lg p-4 bg-secondary-700 grid grid-rows-[auto_1fr] gap-6">
          <div>
            <select
              onChange={(e) => commandHandlers.fontSize(e, execCmd)}
              defaultValue=""
              className="text-black px-2 py-1 rounded w-full"
              title="Font Size"
            >
              <option value="" disabled>
                اندازه فونت
              </option>
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} (
                  {
                    [
                      "بسیار کوچک",
                      "کوچک",
                      "معمولی",
                      "متوسط",
                      "بزرگ",
                      "بسیار بزرگ",
                      "خیلی بزرگ",
                    ][i]
                  }
                  )
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 justify-start">
            {toolbarButtons.map(({ icon, cmd, title }) => (
              <Button
                key={cmd}
                isIconOnly
                onPress={() =>
                  cmd === "textColor"
                    ? commandHandlers.textColor(execCmd)
                    : execCmd(cmd)
                }
                className="icon-btn"
                title={title}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>

        {/* چیدمان و لیست‌ها */}
        <div className="border border-gray-700 rounded-lg p-4 bg-secondary-700 grid grid-rows-[auto_1fr] gap-4">
          <div className="flex gap-2">
            {alignmentButtons.map(({ icon, cmd, title }) => (
              <Button
                key={cmd}
                isIconOnly
                onPress={() => execCmd(cmd)}
                className="icon-btn"
                title={title}
              >
                {icon}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-start">
            {listButtons.map(({ icon, cmd, title }) => (
              <Button
                key={cmd}
                isIconOnly
                onPress={() => execCmd(cmd)}
                className="icon-btn"
                title={title}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>

        {/* Undo/Redo و ریست */}
        <div className="absolute top-2 left-2 flex gap-2 p-2 z-10 rounded-lg bg-secondary-700">
          {[
            { icon: <Redo2 size={18} />, cmd: "redo", title: "Redo" },
            { icon: <Undo2 size={18} />, cmd: "undo", title: "Undo" },
          ].map(({ icon, cmd, title }) => (
            <Button
              key={cmd}
              isIconOnly
              onPress={() => execCmd(cmd)}
              className="icon-btn"
              title={title}
            >
              {icon}
            </Button>
          ))}
          <Button
            isIconOnly
            onPress={() => {
              if (editorRef.current) {
                editorRef.current.innerHTML = "";
              }
              setHtml("");
            }}
          >
            <RefreshCcw size={18} />
          </Button>
        </div>

        {/* دکمه ذخیره‌سازی */}
        <div className="absolute bottom-0 left-2 flex gap-2 z-10 ">
          <Button
            onPress={() => setHtml(editorRef.current?.innerHTML || "")}
            className="bg-green-600 text-white px-3"
          >
            نمایش محتوا
          </Button>
          <Button className="bg-secondary-500 text-white px-3">
            ذخیره محتوا
          </Button>
        </div>
      </div>

      {/* ویرایشگر */}
      <div
        ref={editorRef}
        contentEditable
        className="mt-4 min-h-[200px] border border-gray-600 p-4 rounded-lg bg-white text-black"
        suppressContentEditableWarning
      ></div>

      {/* نمایش HTML */}
      <div>
        <h2 className="font-bold mt-4">نمایش HTML ذخیره‌شده:</h2>
        <pre className="bg-gray-100 text-black p-2 whitespace-pre-wrap break-words">
          {html}
        </pre>
      </div>

      <div>
        <h2 className="font-bold mt-4">نمایش محتوای HTML با استایل:</h2>
        <div
          className="border p-2 bg-white text-black"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
