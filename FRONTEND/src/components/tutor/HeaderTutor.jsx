
function HeaderTutor() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center px-6">
      <div className="text-lg font-semibold text-gray-700">¡Buenos días, Profesor!</div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">🔔</button>
        <img
          src="https://via.placeholder.com/40"
          alt="Perfil"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
      </div>
    </header>
  );
}

export default HeaderTutor;
