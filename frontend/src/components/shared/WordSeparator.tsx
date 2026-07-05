import { inputStyle } from "@/features/advertisements/styles/inputStyle";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface WordSeparatorProps {
  name: string;
  label: string;
  register: any;
}

export default function WordSeparator({ name, label, register }: WordSeparatorProps) {
  const { setValue, watch } = useFormContext();
  const words: string[] = watch(name) || [];
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = input.trim();

      if (value && !words.includes(value)) {
        const updated = [...words, value];
        setValue(name, updated);
        setInput("");
      }
    }
  };

  const removeWord = (index: number) => {
    setValue(
      name,
      words.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <label className="font-semibold text-gray-600">{label}</label>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputStyle}
        placeholder="Type and press Enter"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {words?.map((word, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1"
          >
            <span>{word}</span>

            <button
              type="button"
              onClick={() => removeWord(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}