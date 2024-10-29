function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Nombre de la Aplicación</div>
      <div className="flex space-x-4 items-center">
        <button className="p-2 text-gray-600 hover:text-gray-900">🔔</button>
        <img
          src="https://via.placeholder.com/40"
          alt="Perfil"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;
