import { Editor } from "@tinymce/tinymce-react";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichEditor({
  value,
  onChange,
}: RichEditorProps) {
  return (
    <Editor
      apiKey="tiqisqpr5lirayk8j3s5079dj0klnqrr2q9ue67jmj4pym2a"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | image media link | code fullscreen | help",
      }}
    />
  );
}