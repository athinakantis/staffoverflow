function Spinner() {
    return (
        <img
            src={`${import.meta.env.VITE_REACT_URL}/sf_spinner.gif`}
            alt='Loading...'
        />
    );
}

export default Spinner;
