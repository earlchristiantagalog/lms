"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({ value, onChange, placeholder = "Enter content...", height = 200 }: RichTextEditorProps) {
  return (
    <div className="sun-editor-wrapper rounded-lg border border-slate-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
      <SunEditor
        setContents={value}
        onChange={onChange}
        setOptions={{
          height: `${height}px`,
          placeholder,
          buttonList: [
            ["undo", "redo"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["removeFormat"],
            ["font", "align", "horizontalRule", "list", "table"],
            ["link", "image"],
            ["fontSize", "fontColor", "hiliteColor"],
            ["fullScreen", "showBlocks", "codeView"],
          ],
          font: [
            "Arial",
            "Arial Black",
            "Comic Sans MS",
            "Courier New",
            "Georgia",
            "Impact",
            "Tahoma",
            "Times New Roman",
            "Trebuchet MS",
            "Verdana",
            "Poppins",
          ],
          defaultTag: "p",
          showPathLabel: false,
          attributesWhitelist: {
            all: "style",
          },
        }}
      />
    </div>
  );
}
