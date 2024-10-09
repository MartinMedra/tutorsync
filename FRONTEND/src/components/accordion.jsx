import { Accordion, AccordionItem } from "@nextui-org/react";

export default function AccordionHome() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="shadow">
      <AccordionItem key="1" aria-label="Accordion 1" title="Política de Privacidad">
        <Accordion variant="shadow">
          <AccordionItem key="1.1" aria-label="Accordion 1.1" title="Recopilación de Datos Personales">
            <div className="mb-3 flex flex-col gap-2">
              <p>En TutorSync, estamos comprometidos con la protección de la privacidad de nuestros usuarios. Recopilamos datos personales, como nombre, correo electrónico, información de contacto y horarios disponibles,
                con el fin de facilitar la gestión de las tutorías entre estudiantes y docentes.</p>
            </div>
            <div className="mb-3 flex flex-col gap-2">
              <h1 className="font-bold text-sm">La Información Recopilada Será Utilizada Exclusivamente Para:</h1>
              <ul className="list-disc ml-10">
                <li>Proporcionar el servicio de conexión entre estudiantes y docentes.</li>
                <li>Enviar notificaciones relacionadas con las tutorías.</li>
                <li>Mejorar nuestros servicios mediante el análisis de datos anónimos.</li>
              </ul>
              <p>No compartiremos, venderemos ni alquilaremos la información personal a terceros sin el consentimiento del usuario, salvo cuando sea requerido por ley.</p>
            </div>
          </AccordionItem>
          <AccordionItem key="1.2" aria-label="Accordion 1.2" title="Derechos de los Usuarios">
            <div className="mb-3 flex flex-col gap-2">
              <p>Los usuarios tienen derecho a acceder, rectificar, actualizar o eliminar sus datos personales en cualquier momento. Para
                ejercer estos derechos, pueden comunicarse con nosotros a través del correo electrónico: soporte@tutorsync.com.</p>
            </div>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Términos y Condiciones de Uso">
        <Accordion variant="shadow">
          <AccordionItem key="2.1" aria-label="Accordion 2.1" title="Registro y Uso de la Plataforma">
            <div className="mb-3 flex flex-col gap-2">
              <p>Los usuarios de TutorSync deberán ser mayores de 18 años o
                contar con el consentimiento de sus padres o tutores legales. Al registrarse, el usuario acepta proporcionar información veraz y actualizada.</p>
              <p>El uso de la plataforma está limitado a estudiantes que buscan tutorías y docentes que ofrecen sus servicios. TutorSync no interviene en el contenido ni en la
                metodología de las tutorías, siendo responsabilidad exclusiva de los docentes y estudiantes el desarrollo de estas.</p>
            </div>
          </AccordionItem>
          <AccordionItem key="2.2" aria-label="Accordion 2.2" title="Conducta del Usuario">
            <div className="mb-3 flex flex-col gap-2">
              <h1 className="font-bold text-sm">La Información Recopilada Será Utilizada Exclusivamente Para:</h1>
              <ul className="list-disc ml-10">
                <li>Respetar a los demás usuarios y actuar con profesionalismo.</li>
                <li>Cumplir con los horarios acordados para las tutorías.</li>
                <li>No utilizar la plataforma para fines ilegales o inapropiados.</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem key="2.3" aria-label="Accordion 2.3" title="Cancelaciones y Reembolsos">
            <div className="mb-3 flex flex-col gap-2">
              <p>Los estudiantes pueden cancelar o reprogramar una tutoría con un mínimo de 24 horas de anticipación. Las cancelaciones fuera de este plazo podrían estar sujetas a penalizaciones según los términos acordados entre el estudiante y el docente.
                En caso de pago anticipado, los reembolsos serán gestionados de acuerdo con la política de cada docente.</p>
            </div>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Propiedad Intelectual">
        <Accordion variant="shadow">
          <AccordionItem key="3.1" aria-label="Accordion 3.1" title="Derechos de Autor">
            <div className="mb-3 flex flex-col gap-2">
              <p>El diseño, contenido y marca de TutorSync son propiedad exclusiva de la plataforma y están protegidos por las leyes de derechos de autor.
                Ningún usuario puede copiar, reproducir o modificar estos materiales sin autorización previa.</p>
            </div>
          </AccordionItem>
          <AccordionItem key="3.2" aria-label="Accordion 3.2" title="Contenido de los Usuarios">
            <div className="mb-3 flex flex-col gap-2">
              <p>Los docentes que suben material educativo a TutorSync conservan los derechos sobre dicho contenido.
                Sin embargo, al subirlo a la plataforma, otorgan a TutorSync una licencia no exclusiva para mostrar y distribuir dicho contenido en la plataforma.</p>
            </div>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="4" aria-label="Accordion 4" title="Limitación de Responsabilidad">
        <Accordion variant="shadow">
          <AccordionItem key="4.1" aria-label="Accordion 4.1" title="Plataforma como Intermediario">
            <div className="mb-3 flex flex-col gap-2">
              <p>TutorSync actúa únicamente como un intermediario entre estudiantes y docentes, facilitando la conexión y gestión de las tutorías.
                No garantizamos los resultados académicos ni somos responsables por cualquier incumplimiento o conflicto que pueda surgir entre los usuarios.</p>
            </div>
          </AccordionItem>
          <AccordionItem key="4.2" aria-label="Accordion 4.2" title="Disponibilidad del Servicio">
            <div className="mb-3 flex flex-col gap-2">
              <p>Nos esforzamos por asegurar la disponibilidad continua de TutorSync,
                pero no garantizamos que la plataforma esté libre de interrupciones o errores. La plataforma puede estar temporalmente fuera de servicio por mantenimiento o razones técnicas.</p>
            </div>
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="5" aria-label="Accordion 5" title="Política de Cookies">
        <p>TutorSync utiliza cookies para mejorar la experiencia del usuario en la plataforma. Las cookies nos permiten recordar las preferencias del usuario y realizar análisis sobre el uso de nuestro sitio web.
          Los usuarios pueden configurar su navegador para rechazar las cookies, aunque esto podría afectar algunas funciones del servicio.</p>
      </AccordionItem>
      <AccordionItem key="6" aria-label="Accordion 6" title="Resolución de Conflictos">
        <Accordion variant="shadow">
          <AccordionItem key="6.1" aria-label="Accordion 6.1" title="Ley Aplicable y Jurisdicción">
            <div className="mb-3 flex flex-col gap-2">
              <p>Cualquier disputa relacionada con el uso de TutorSync se
                regirá por las leyes de la República de Colombia. Los usuarios aceptan que cualquier conflicto será resuelto ante los tribunales de Colombia.</p>
            </div>
          </AccordionItem>
          <AccordionItem key="6.2" aria-label="Accordion 6.2" title="Procedimientos de Quejas">
            <div className="mb-3 flex flex-col gap-2">
              <p>Si un usuario tiene una queja relacionada con el servicio, puede comunicarse con nuestro equipo de soporte a través de soporte@tutorsync.com.
                Nos comprometemos a investigar y resolver todas las quejas dentro de un plazo de 15 días hábiles.</p>
            </div>
          </AccordionItem>
        </Accordion>
      </AccordionItem>

    </Accordion>
  );
}