import NavbarHome from "../components/navbarHome";
import HeroHome from "../components/heroHome";
import AboutUs from "../components/aboutUs";
import Politics from "../components/politics";
import Explaint from "../components/explaint";
import ModalProvider from "../components/ModalProvider";

export default function LandingPage() {
    return(
    <>    
    <section className="home">
<ModalProvider></ModalProvider>
    <HeroHome />
    <Explaint/>
    <AboutUs />
    <Politics />
    </section>
    </>
)}