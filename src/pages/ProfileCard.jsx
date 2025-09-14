// src/pages/ProfileCard.jsx
export default function ProfileCard({ user }) {
  if (!user) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
        Chargement du profil.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="Avatar"
        className="w-24 h-24 rounded-full border-2 border-indigo-600"
      />
      <h2 className="text-xl font-bold text-gray-700">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-gray-500">Âge : {user.age}</p>
      <p className="text-gray-500">Pays : {user.country}</p>
    </div>
  );
}
