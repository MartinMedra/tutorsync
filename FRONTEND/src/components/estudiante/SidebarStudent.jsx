function SidebarStudent() {
    return (
      <aside className="w-64 bg-purple-800 text-white flex flex-col items-center p-6 space-y-4">
        <div className="text-2xl font-bold">AppEstudiante</div>
        <div className="space-y-2 mt-8">
          <button className="w-full text-left p-2 hover:bg-purple-700 rounded-md">Dashboard</button>
          <button className="w-full text-left p-2 hover:bg-purple-700 rounded-md">Buscar Profesores</button>
          <button className="w-full text-left p-2 hover:bg-purple-700 rounded-md">Historial de Citas</button>
          <button className="w-full text-left p-2 hover:bg-purple-700 rounded-md">Notificaciones</button>
        </div>
      </aside>
    );
  }
  
  export default SidebarStudent;