function Spinner({ background = 'light' }) {
    return (
        <img
            className='spinnerImg'
            src={
                background === 'light'
                    ? `/Spinner_white.gif`
                    : `/Spinner_aliceblue.gif`
            }
            alt='Loading...'
        />
    );
}

export default Spinner;
