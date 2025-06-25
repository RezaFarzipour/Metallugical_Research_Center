import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaImage,
  FaFillDrip,
  FaEraser,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
  FaSyncAlt,
  FaQuoteRight,
  FaMinus,
} from "react-icons/fa";
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

export interface EditorButton {
  icon?: ReactNode;
  title: string;
  action: () => void;
}

export const baseButtons = (
  editor: Editor,
  pickColor: () => void,
  addImage: () => void
): EditorButton[] => [
  {
    icon: <FaBold size={14} color="#444" />,
    action: () => editor.chain().focus().toggleBold().run(),
    title: "Bold",
  },
  {
    icon: <FaItalic size={14} color="#444" />,
    action: () => editor.chain().focus().toggleItalic().run(),
    title: "Italic",
  },
  {
    icon: <FaUnderline size={14} color="#444" />,
    action: () => editor.chain().focus().toggleUnderline().run(),
    title: "Underline",
  },
  {
    icon: <FaStrikethrough size={14} color="#444" />,
    action: () => editor.chain().focus().toggleStrike().run(),
    title: "Strike",
  },
  {
    icon: <FaSubscript size={14} color="#444" />,
    action: () => editor.chain().focus().toggleSubscript().run(),
    title: "Subscript",
  },
  {
    icon: <FaSuperscript size={14} color="#444" />,
    action: () => editor.chain().focus().toggleSuperscript().run(),
    title: "Superscript",
  },
  {
    icon: <FaFillDrip size={14} color="#444" />,
    action: pickColor,
    title: "Color",
  },
  {
    icon: <FaImage size={14} color="#444" />,
    action: addImage,
    title: "Insert Image",
  },
  {
    icon: <FaEraser size={14} color="#444" />,
    action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    title: "Clear",
  },
];

export const alignmentButtons = (editor: Editor): EditorButton[] => [
  {
    icon: <FaAlignLeft size={14} color="#444" />,
    action: () => editor.chain().focus().setTextAlign("left").run(),
    title: "Align Left",
  },
  {
    icon: <FaAlignCenter size={14} color="#444" />,
    action: () => editor.chain().focus().setTextAlign("center").run(),
    title: "Align Center",
  },
  {
    icon: <FaAlignRight size={14} color="#444" />,
    action: () => editor.chain().focus().setTextAlign("right").run(),
    title: "Align Right",
  },
  {
    icon: <FaAlignJustify size={14} color="#444" />,
    action: () => editor.chain().focus().setTextAlign("justify").run(),
    title: "Justify",
  },
];

export const listButtons = (editor: Editor): EditorButton[] => [
  {
    icon: <FaListUl size={14} color="#444" />,
    action: () => editor.chain().focus().toggleBulletList().run(),
    title: "Bulleted List",
  },
  {
    icon: <FaListOl size={14} color="#444" />,
    action: () => editor.chain().focus().toggleOrderedList().run(),
    title: "Ordered List",
  },
];

export const undoButtons = (editor: Editor): EditorButton[] => [
  {
    icon: <FaUndo size={14} color="#444" />,
    action: () => editor.chain().focus().undo().run(),
    title: "Undo",
  },
  {
    icon: <FaRedo size={14} color="#444" />,
    action: () => editor.chain().focus().redo().run(),
    title: "Redo",
  },
  {
    icon: <FaSyncAlt size={14} color="#444" />,
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
    icon: <FaQuoteRight size={14} color="#444" />,
    action: () => editor.chain().focus().toggleBlockquote().run(),
    title: "Blockquote",
  },
  {
    icon: <FaMinus size={14} color="#444" />,
    action: () => editor.chain().focus().setHorizontalRule().run(),
    title: "Horizontal Rule",
  },
];
