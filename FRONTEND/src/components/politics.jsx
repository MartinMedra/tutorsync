import AccordionHome from "./accordion";

export default function Politics() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Testimonials</h1>
                <div className="flex justify-center -m-4">
                    <div className="p-4 md:w-1/2 w-full">
                        <AccordionHome />
                    </div>
                </div>
            </div>
        </section>
    )
}