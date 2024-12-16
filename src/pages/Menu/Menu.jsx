import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css';
import Button from '../../Components/CustomComponents/Button/Button';

function Menu() {
    const location = useLocation();
    const username = localStorage.getItem('username') || 'admin'
    const navigate = useNavigate();

    return (
        <section id='menuPage'>
            <div className='welcomePrompt'>
                <h2>Welcome @{username}!</h2>
                <p>What do you want to do?</p>
            </div>
            <div className='suggestions'>
                <Button
                    role='suggestion'
                    text='Remove an employee'
                    handleClick={() => navigate('/home/employees')}
                    img='/personRemove.svg'
                    imgAlt='Remove employee icon'
                />
                <Button
                    role='suggestion'
                    text='View employees'
                    handleClick={() => navigate('/home/employees')}
                    img='/personList.svg'
                    imgAlt='Remove employee icon'
                />
                <Button
                    role='suggestion'
                    text='Add employee'
                    handleClick={() => navigate('/home/add')}
                    img='/personAdd.svg'
                    imgAlt='Remove employee icon'
                />
            </div>
        </section>
    );
}

export default Menu;
