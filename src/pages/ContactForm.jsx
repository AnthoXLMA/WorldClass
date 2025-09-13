// src/components/ContactForm.jsx
export default function ContactForm() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Nous contacter</h2>
      <input type="text" placeholder="Nom" className="w-full border rounded-lg p-2"/>
      <input type="email" placeholder="Email" className="w-full border rounded-lg p-2"/>
      <textarea placeholder="Message" className="w-full border rounded-lg p-2" rows={4}></textarea>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">Envoyer</button>
    </div>
  );
}
