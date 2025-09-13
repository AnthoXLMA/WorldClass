// src/components/ProfileForm.jsx
export default function ProfileForm({ profile, setProfile }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Modifier mon profil</h2>
      <input
        type="text"
        value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
        placeholder="Nom"
        className="w-full border rounded-lg p-2"
      />
      <input
        type="email"
        value={profile.email}
        onChange={e => setProfile({ ...profile, email: e.target.value })}
        placeholder="Email"
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}
