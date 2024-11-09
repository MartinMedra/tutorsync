import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeaderTutor() {

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        // console.log(response.data);
      } catch (error) {
        setError('Error al cargar el perfil.');
      }
    };
  
    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const handlelogout = () =>{
    localStorage.removeItem('token');
    navigate('/');
}

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">TutorSync</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="secondary" href="#">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="#" aria-current="page" color="foreground">
            Citas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Profesores
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user.role}</p>
              <p className="font-semibold">{user.name}</p>
            </DropdownItem>
            <DropdownItem key="settings">Perfil</DropdownItem>
            <DropdownItem onClick={handlelogout} key="logout" color="danger">
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}