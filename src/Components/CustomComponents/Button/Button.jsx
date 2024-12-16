import './Button.css';

function Button({ text, handleClick, type = 'button', role = 'primary', img, imgAlt }) {
    return (
        <button
            className={`btn ${role}`}
            type={type}
            onClick={handleClick}
        >
            {img && (
                <img
                    src={img}
                    alt={imgAlt}
                />
            )}
            {text}
        </button>
    );
}

export default Button;
