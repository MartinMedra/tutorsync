import NavbarHome from "../components/navbarHome";
import HeroHome from "../components/heroHome";
import AboutUs from "../components/aboutUs";
import Politics from "../components/politics";
import Explaint from "../components/explaint";

export default function LandingPage() {
    return(
    <>    
    <section className="home">
    <NavbarHome />
    <HeroHome />
    <Explaint/>
    <AboutUs />
    <Politics />
    </section>
    </>
)}