import propTypes from "prop-types";

const ModalTutor = ({ isOpen, closeModalTutor, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    //! Si el clic ocurre en el fondo (no en el contenido del modal), cierra el modal
    if (e.target === e.currentTarget) {
      closeModalTutor();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 " onClick={handleBackgroundClick}>
      <div className=" rounded-lg p-6 w-full max-w-fit relative z-50" >
        {children}
      </div>
    </div>
  );
};

export default ModalTutor;

ModalTutor.propTypes = {
    isOpen: propTypes.bool.isRequired,
    closeModalTutor: propTypes.func.isRequired,
    children: propTypes.node.isRequired,
};
