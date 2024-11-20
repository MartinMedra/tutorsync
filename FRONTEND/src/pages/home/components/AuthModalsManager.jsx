
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import propTypes from 'prop-types';
const AuthModalsManager = ({ activeModal, closeModals, openLogin, openRegister }) => {

  return (
    <>
      <LoginModal
        isOpen={activeModal === 'login'}
        closeModal={closeModals}
        openRegister={openRegister}
      />
      <RegisterModal
        isOpen={activeModal === 'register'}
        closeModal={closeModals}
        openLogin={openLogin}
      />
    </>
  );
};

AuthModalsManager.propTypes = {
    activeModal: propTypes.string,
    closeModals: propTypes.func,
    openLogin: propTypes.func,
    openRegister: propTypes.func,
    };

export default AuthModalsManager;
