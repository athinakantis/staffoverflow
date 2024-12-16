import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../CustomComponents/Button/Button';

function Header() {
    const navigate = useNavigate()

    function handleLogOut() {
        localStorage.removeItem('username');
        navigate('/')
    }
    return (
        <header>
            <NavLink to='/home'>
                <img
                    src='../../src/assets/staffOverflow_logo.svg'
                    alt='Image of staffoverflow logo'
                />
            </NavLink>

            <nav>
                <ul>
                    <li>
                        <NavLink to='/home/employees'>Employees</NavLink>
                    </li>
                    <li>
                        <NavLink to='/home/add'>Add employee</NavLink>
                    </li>
                    <li>
                        <Button handleClick={handleLogOut} text='Log out'/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
