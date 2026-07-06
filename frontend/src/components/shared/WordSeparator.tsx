import { useState } from "react";
import { inputStyle } from "@/components/shared/styles/inputStyle";

interface WordSeparatorProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function WordSeparator({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
}: WordSeparatorProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const word = input.trim();

    if (word && !value.includes(word)) {
      onChange([...value, word]);
      setInput("");
    }
  };

  const removeWord = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="font-semibold text-gray-600">{label}</label>

      <input
        className={inputStyle}
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {value?.map((word, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1"
          >
            <span>{word}</span>

            <button
              type="button"
              onClick={() => removeWord(index)}
              className="text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}