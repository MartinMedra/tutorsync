export default function AboutUs() {
  return (
    <section className="text-gray-600 body-font min-h-screen shadow-white-glow" id="aboutUs">
      <div className="container px-5 py-24 mx-auto" data-aos="fade-left" data-aos-duration="1800">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Conoce un poco sobre nosotros
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">
          En TutorSync creemos en facilitar la conexión entre estudiantes y tutores, optimizando el tiempo y mejorando la
           experiencia de aprendizaje. Nuestra misión es crear una plataforma intuitiva y confiable para agendar citas, 
           gestionar horarios y promover el éxito académico a través de una comunicación fluida.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="cardAbout ">
              <div className="cardAbout2 px-4 py-6 rounded-lg">
                <svg className="text-rosado w-12 h-12 mb-3 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-white">
                  +305
                </h2>
                <p className="leading-relaxed text-gray-400">Citas Gestionadas con Éxito</p>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="cardAbout">
              <div className="cardAbout2 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  className="text-[#FF346F] w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 className="title-font font-medium text-3xl text-white">
                  +235
                </h2>
                <p className="leading-relaxed text-gray-400"> Tutores expertos</p>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="cardAbout">
              <div className="cardAbout2 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  className="text-[#FF346F] w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                </svg>
                <h2 className="title-font font-medium text-3xl text-white">
                  24/7
                </h2>
                <p className="leading-relaxed text-gray-400">Soporte en Tiempo Real</p>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="cardAbout">
              <div className="cardAbout2 px-4 py-6 rounded-lg">
                <svg className="text-rosado w-12 h-12 mb-3 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-white">
                  95%
                </h2>
                <p className="leading-relaxed text-gray-400">Usuarios Satisfechos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}