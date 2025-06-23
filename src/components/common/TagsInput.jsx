import { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-wrap gap-2 bg-white my-4 p-2 rounded-sm">
      {tags?.map((tag, i) => (
        <div className="bg-[#0b57d017] px-2 py-1 me-2 rounded flex gap-2 items-center" key={i}>
          <div>{tag}</div>
          <div className="hover:cursor-pointer" onClick={() => removeTag(i)}>✕</div>
        </div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none"
        placeholder="Press 'Enter' after each tag"
      />
    </div>
  );
};
export default TagsInput;
