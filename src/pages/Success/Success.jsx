import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';
import { useEffect, useState } from 'react';

function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const [successInfo, setSuccessInfo] = useState({});

    useEffect(() => {
        if (location.state) {
            setSuccessInfo({
                status: location.state.status,
                message: location.state.message,
            });
            setTimeout(() => navigate('/home/employees'), 3000);
        } else {
            setSuccessInfo({
                status: 200,
                message: 'Operation successful',
            });
        }
    }, []);

    return (
        <section id='successPage'>
            <div className='statusContainer success'>
                <img
                    src={`${import.meta.env.VITE_REACT_URL}/success_Icon.svg`}
                    alt='Success Icon'
                />
                <div>
                    <h2>Success</h2>
                    <p>{successInfo.message}</p>
                </div>
            </div>
        </section>
    );
}

export default Success;
