import propTypes from 'prop-types';

const Card = ({ contenido }) => {
    return (
        <div className='card'>
            {contenido}
        </div>
    );
};

Card.propTypes = {
    contenido: propTypes.string.isRequired,
};

export default Card;