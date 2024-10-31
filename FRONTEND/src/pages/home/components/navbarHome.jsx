import {useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";
import {Link as LinkScroll } from "react-scroll";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";

export default function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black bg-transparent">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden bg-white"
        />
        <NavbarBrand className="text-gray-300 font-semibold">TutorSync</NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
          <LinkScroll to="hero" smooth={true} duration={1000} className="text-gray-300 cursor-pointer hover:text-rosado">
            Inicio
          </LinkScroll>
        </NavbarItem>
        <NavbarItem>
          <LinkScroll to="aboutUs" smooth={true} duration={1000} className="text-gray-300 cursor-pointer hover:text-rosado">
            Nosotros
          </LinkScroll>
        </NavbarItem>
        <NavbarItem >
          <LinkScroll to="politics" smooth={true} duration={1000} className="text-gray-300 cursor-pointer hover:text-rosado">
            Politicas
          </LinkScroll>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="cursor-pointer">
          <Link onClick={() => setIsLoginOpen(true)} className="text-gray-300 font-bold hover:text-rosado">Iniciar Sesión</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <button onClick={() => setIsRegisterOpen(true)} className="botonRegistro">Registrate</button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>

<LoginModal isOpen={isLoginOpen} closeModal={() => setIsLoginOpen(false)} />
<RegisterModal isOpen={isRegisterOpen} closeModal={() => setIsRegisterOpen(false)} />

</>
  );
}
