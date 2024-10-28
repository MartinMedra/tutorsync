function QuickAccess() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Accesos Rápidos</h2>
      <ul className="space-y-3">
        <li className="flex items-center text-gray-700">
          📋 Documentos de Consulta
        </li>
        <li className="flex items-center text-gray-700">
          📅 Próximas Eventos
        </li>
        <li className="flex items-center text-gray-700">
          💼 Recursos
        </li>
      </ul>
    </div>
  );
}

export default QuickAccess;
