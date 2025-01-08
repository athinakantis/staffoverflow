function Spinner({ background = 'light' }) {
  return (
    <img
      className='spinnerImg'
      src={
        background === 'light'
          ? `/src/assets/Spinner_white.gif`
          : `/src/assets/Spinner_aliceblue.gif`
      }
      alt='Loading...'
    />
  );
}

export default Spinner;
