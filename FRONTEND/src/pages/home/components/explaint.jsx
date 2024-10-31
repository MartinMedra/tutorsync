export default function Explaint() {

    return (
        <section className="text-gray-600 body-font bg-white">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="max-lg:hidden lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                    <img alt="feature" className="object-cover object-center h-full w-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" />
                </div>
                <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-center text-center">
                    <div className="flex flex-col mb-10 lg:items-center items-center">
                        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black mb-5">
                            <svg fill="none" stroke="#FF346F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                        </div>
                        <div className="flex-grow lg:w-2/3 sm:w-2/3">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Gestion de Disponibilidad en Tiempo Real</h2>
                            <p className="leading-relaxed text-base">Consulta la disponibilidad de los profesores y agenda citas de manera instantáneas según sus horarios.</p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-10 lg:items-center items-center">
                        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black mb-5">
                            <svg fill="none" stroke="#FF346F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div className="flex-grow w-1/2">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Modalidad Flexible</h2>
                            <p className="leading-relaxed text-base">Elige entre citas presenciales o virtuales, según tus preferencias y la disponibilidad del profesor.</p>
                        </div>
                    </div>
                    <div className="flex flex-col mb-10 lg:items-center items-center">
                        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black mb-5">
                            <svg className="w-6 h-6 text-rosado" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                            </svg>

                        </div>
                        <div className="flex-grow w-1/2">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Historial de Citas</h2>
                            <p className="leading-relaxed text-base">Accede al registro completo de todas tus citas pasadas y futuras para llevar un control detallado de tu progreso.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}