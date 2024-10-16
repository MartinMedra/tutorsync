import NavigationEstudiante from "../../components/estudiante/navigationEstudiante";
import TabPrevProfesores from "../../components/estudiante/tablaPreviaProfesores";
import ListaPreviaCita from "../../components/estudiante/listaPreviaCita";

export default function PrincipalEstudiante() {
    return (     
        <>
        <NavigationEstudiante/>
        <div className="lg:mx-10 mx-3 my-3 flex flex-col gap-3 justify-center items-center ">
            <section className="Botones">
                <div className="flex gap-3 justify-center items-center">
                    <button className="bg-rosado hover:bg-rosado-claro text-white font-bold py-2 px-4 rounded">Solicitar tutoría</button>
                    <button className="bg-rosado hover:bg-rosado-claro text-white font-bold py-2 px-4 rounded">Ver tutorías</button>
                </div>
            </section>
            <section className="ProxTutorias">
                <h1 className="text-2xl font-bold text-center">Próximas Tutorías</h1>
                <div className="flex gap-3 justify-center items-center">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <h2 className="text-xl font-bold">Tutoría de Matemáticas</h2>
                        <p>Fecha: 15/10/2021</p>
                        <p>Hora: 10:00 am</p>
                        <p>Profesor: Juan Perez</p>
                    </div>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <h2 className="text-xl font-bold">Tutoría de Física</h2>
                        <p>Fecha: 20/10/2021</p>
                        <p>Hora: 2:00 pm</p>
                        <p>Profesor: Maria Gonzalez</p>
                    </div>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <h2 className="text-xl font-bold">Ver más</h2>
                    </div>
                </div>
            </section>
            <section className="HistCitas">
                <div>
                    <h1 className="text-xl font-bold">Ultimas citas</h1>
                    <ListaPreviaCita />
                </div>
            </section>
            <section className="ProfDisponibles">
                <div>
                    <h1 className="text-xl font-bold">Profesores disponibles</h1>
                    <TabPrevProfesores />
                </div>
            </section>
        </div>
        </>
    )   
    
}