import { useState } from 'react';
import AuthModalsManager from './AuthModalsManager';
import Navbar from './navbarHome';

const ModalProvider = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openLogin = () => setActiveModal('login');
  const openRegister = () => setActiveModal('register');
  const closeModals = () => setActiveModal(null);

  return (
    <>
      {/* Pasar funciones y estado al navbar */}
      <Navbar openLogin={openLogin} openRegister={openRegister} />

      {/* AuthModalsManager gestiona los modales */}
      <AuthModalsManager
        activeModal={activeModal}
        closeModals={closeModals}
        openLogin={openLogin}
        openRegister={openRegister}
      />
    </>
  );
};

export default ModalProvider;
