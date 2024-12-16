import { useEffect, useState } from 'react';
import './NewEmployee.css';
import { useNavigate } from 'react-router-dom';
import { validateNewEmp } from '../../utils/validateInput';
import { addNewEmployee } from '../../utils/requests';

function NewEmployee() {
    const [isEditing, setIsEditing] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [msg, setMsg] = useState('');
    const currentDate = new Date().toISOString().substring(0, 10);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        role: '',
        department: 'Default',
        employment_type: 'Default',
        location: '',
        salary: null,
        startdate: currentDate,
    });

    const navigate = useNavigate();
    const { firstname, lastname } = formData;

    function handleChange(e) {
        setMsg('');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            validateNewEmp({ ...formData });
            setSubmitted(true);
        } catch (err) {
            setMsg(`Error: ${err.message}`);
            setTimeout(() => setMsg(''), 3000);
        }
    }

    useEffect(() => {
        if (submitted) {
            async function submitForm() {
                try {
                    const response = await addNewEmployee(formData);
                    navigate(`/home/employees/${response.id}`);
                } catch (error) {
                    navigate('/error', {
                        state: {
                            status: 500,
                            message: 'Server error when adding employee',
                        },
                    });
                }
            }
            submitForm();
        }
    }, [submitted]);

    return (
        <div
            className={
                isEditing ? 'newEmployeeCard edit' : 'newEmployeeCard addNew'
            }
        >
            {isEditing ? (
                <>
                    <p className='emName'>Add employee</p>
                    <div className='frame'>
                        {firstname && lastname && (
                            <img
                                src={`https://robohash.org/${firstname}${lastname}.png?set=set5&size=175x175`}
                            />
                        )}
                    </div>
                    <form>
                        <div>
                            <label htmlFor='firstname'>Firstname</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='firstname'
                                id='firstname'
                                value={formData.firstname}
                            />
                        </div>
                        <div>
                            <label htmlFor='lastname'>Lastname</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='lastname'
                                id='lastname'
                                value={formData.lastname}
                            />
                        </div>
                        <div>
                            <label htmlFor='role'>Role</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='role'
                                id='role'
                                value={formData.role}
                            />
                        </div>
                        <div>
                            <label htmlFor='department'>Department</label>
                            <select
                                onChange={handleChange}
                                name='department'
                                id='department'
                            >
                                <option value='default'>---</option>
                                <option value='IT'>IT</option>
                                <option value='Marketing'>Marketing</option>
                                <option value='Finance'>Finance</option>
                                <option value='Admin'>Admin</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='employment_type'>
                                Employment type
                            </label>
                            <select
                                onChange={handleChange}
                                name='employment_type'
                                id='employment_type'
                            >
                                <option value='default'>---</option>
                                <option value='Full-Time'>Full-Time</option>
                                <option value='Part-Time'>Part-Time</option>
                                <option value='Intern'>Intern</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='location'>Location</label>
                            <select
                                onChange={handleChange}
                                name='location'
                                id='location'
                            >
                                <option value='default'>---</option>
                                <option value='Helsinki'>Helsinki</option>
                                <option value='Pasila'>Pasila</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='salary'>Initial salary</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='salary'
                                id='salary'
                                value={formData.salary}
                            />
                        </div>
                        <div>
                            <label htmlFor='startdate'>Date of hiring</label>
                            <input
                                onChange={handleChange}
                                type='date'
                                name='startdate'
                                id='startdate'
                                value={formData.startdate}
                            />
                        </div>
                        {msg && <p className='error'>{msg}</p>}
                        <div>
                            <button
                                type='button'
                                onClick={() => setIsEditing((prev) => !prev)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing((prev) => !prev)}>
                        <img
                            src={`${
                                import.meta.env.VITE_REACT_URL
                            }/add_icon.svg`}
                            alt='Add employee Icon'
                        />
                    </button>
                    <p>Add new employee</p>
                </>
            )}
        </div>
    );
}

export default NewEmployee;
