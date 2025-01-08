import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Error.css';

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
            <img
                src='/staffOverflow_logo.svg'
                alt='staffoverflow logo'
                className='logo'
            />
            <div
                id='errorContainer'
                className='statusContainer'
            >
                <h2>{errorInfo.status}</h2>
                <p>{errorInfo.message}</p>
            </div>
            <Link to='/'>Back home</Link>
        </section>
    );
}

export default Error;
