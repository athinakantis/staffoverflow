import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';
import styles from './Login.module.css'

function Login({}) {
    const [user, setUser] = useState({
        username: 'admin',
        password: 'unicorn',
    });
    const navigate = useNavigate();

    function handleUser(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function handleNavigate() {
        localStorage.setItem('username', user.username);
        navigate('/home');
    }

    return (
        <section className={`${styles.logInPage}`}>
                <img src={`${import.meta.env.VITE_REACT_URL}/staffOverflow_logo.svg`} alt="Staffoverflow Logo" />
            <div className={`${styles.logInContainer}`}>
                <h2 className={`${styles.h2}`}>Log in</h2>
                <form className={`${styles.form}`}>
                    <div className={`${styles.formDiv}`}>
                        <label htmlFor='username'>Username</label>
                        <input
                            className={`${styles.input}`}
                            type='text'
                            name='username'
                            id='username'
                            value={user.username}
                            onChange={handleUser}
                        />
                    </div>
                    <div className={`${styles.formDiv}`}>
                        <label htmlFor='password'>Password</label>

                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={user.password}
                            onChange={handleUser}
                        />
                    </div>
                </form>
                <Button
                    role={`${styles.logInBtn}`}
                    text='Login'
                    handleClick={handleNavigate}
                />
            </div>
        </section>
    );
}

export default Login;
