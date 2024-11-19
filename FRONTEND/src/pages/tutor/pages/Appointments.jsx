import AvailabilityManagement from "../components/AvailabilityManagement";
import RequestAppointments from "../components/RequestAppointments";

function Appointments () {
  return (
    <div className="p-4 grid gap-4">
      {/* Profesor Availability: Toda la fila */}
      <div className="bg-white shadow-md rounded-lg p-4 col-span-full">
          <AvailabilityManagement />
      </div>

      <div className="grid gap-4">
        {/* Request Appointments */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <RequestAppointments />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
