import '../Button/Button.css';

function Button({
    onClick,
    text,
    filterBtn
}) {
    return (
        <button onClick={onClick}
            className={`btn ${filterBtn}`}
        >
            {text}
        </button>
    );
};

export default Button;