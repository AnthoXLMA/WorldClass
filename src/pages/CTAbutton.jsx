// src/components/CTAButton.jsx
export default function CTAButton({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition ${className}`}
    >
      {text}
    </button>
  );
}
