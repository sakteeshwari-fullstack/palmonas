"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { placeholderTexts } from "../../data/NavbarData";


export default function SearchBar({ isMobile = false }) {
  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput) return;

    const currentText = placeholderTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setPlaceholder(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setPlaceholder(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setTextIndex((prev) => (prev + 1) % placeholderTexts.length);
        }
      }
    }, deleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, showInput]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div className="flex items-center rounded-2xl bg-[#f2efe5] px-4 py-3.5">
      {showInput ? (
        <input
          type="text"
          ref={inputRef}
          placeholder="Type to search..."
          className="flex-1 bg-transparent outline-none text-sm"
          onBlur={() => setShowInput(false)}
        />
      ) : (
        <div
          className="flex flex-row items-center flex-1 bg-transparent outline-none text-gray-500 cursor-text whitespace-nowrap"
          onClick={() => setShowInput(true)}
        >
          <span className="tracking-wide text-sm">{placeholder}</span>
          <span className="animate-blink w-[1px] h-[14px] bg-gray-500 ml-0.5" />
        </div>
      )}
      <Search size={18} />

      <style jsx>{`
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}
