import { useEffect, useState } from 'react';
import './Error.css';
import { Link, useLocation } from 'react-router-dom';

function Error() {
    const location = useLocation();
    const [errorInfo, setErrorInfo] = useState({});

    useEffect(() => {
        if (location.state) {
            setErrorInfo({
                status: location.state.status,
                message: location.state.message,
            });
        } else {
            setErrorInfo({
                status: 404,
                message: 'Page not found',
            });
        }
    }, []);

    return (
        <section id='errorPage'>
            <div
                id='errorContainer'
                className='statusContainer'
            >
                <img
                    src={`${
                        import.meta.env.VITE_REACT_URL
                    }/staffOverflow_logo.svg`}
                    alt='staffoverflow logo'
                    className='logo'
                />
                <h2>{errorInfo.status}</h2>
                <p>{errorInfo.message}</p>
                <Link to='/'>Back home</Link>
            </div>
        </section>
    );
}

export default Error;
