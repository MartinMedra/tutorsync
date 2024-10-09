import AccordionHome from "./accordion";

export default function Politics() {
    return (
        <section className="min-h-screen text-gray-600 body-font"id="politics">
            <div className="container px-5 py-24 mx-auto">
                <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">Politicas y Tratamientos</h1>
                <div className="flex justify-center -m-4">
                    <div className="p-4 md:w-1/2 w-full">
                        <AccordionHome />
                    </div>
                </div>
            </div>
        </section>
    )
}