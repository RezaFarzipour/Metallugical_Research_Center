import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Subscript as SubIcon,
  Superscript as SuperIcon,
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
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

// نوع دکمه‌ها
export interface EditorButton {
  icon?: ReactNode;
  title: string;
  action: () => void;
}

export const baseButtons = (
  editor: Editor,
  pickColor: () => void
): EditorButton[] => [
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
  {
    icon: <Eraser size={18} />,
    action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    title: "Clear",
  },
];

export const alignmentButtons = (editor: Editor): EditorButton[] => [
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

export const listButtons = (editor: Editor): EditorButton[] => [
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

export const undoButtons = (editor: Editor): EditorButton[] => [
  {
    icon: <Redo2 size={18} />,
    action: () => editor.chain().focus().redo().run(),
    title: "Redo",
  },
  {
    icon: <Undo2 size={18} />,
    action: () => editor.chain().focus().undo().run(),
    title: "Undo",
  },

  {
    icon: <RefreshCcw size={18} />,
    action: () => editor.commands.setContent(""),
    title: "Clear Content",
  },
];

export const headingButtons = (editor: Editor): EditorButton[] =>
  Array.from({ length: 6 }, (_, i) => ({
    title: `H${i + 1}`,
    action: () =>
      editor
        .chain()
        .focus()
        .toggleHeading({ level: i + 1 })
        .run(),
  }));

export const blockquoteAndHr = (editor: Editor): EditorButton[] => [
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
