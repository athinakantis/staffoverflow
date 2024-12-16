import Button from '../../Components/CustomComponents/Button/Button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateFormCheck, validateUpdateEmp } from '../../utils/validateInput';
import { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Spinner from '../../Components/Spinner/Spinner';
import './SinglePage.css';

function SinglePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [isRemoving, setIsRemoving] = useState(false);
    const [verifyRemove, setVerifyRemove] = useState(false);
    const [edit, setEdit] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({});
    const { loading, get, patch, remove } = useAxios(
        `${import.meta.env.VITE_API_URL}`
    );

    // Delete employee
    useEffect(() => {
        const removeEmployee = async () => {
            try {
                if (verifyRemove) {
                    await remove(`/employees/${id}`);
                    navigate('/home/success', {
                        state: {
                            status: 200,
                            message: 'Employee was successfully removed!',
                        },
                    });
                }
            } catch (err) {
                console.error(err)
                navigate('/error', {
                    state: {
                        status: 500,
                        message: 'A server error occurred',
                    },
                });
            }
        };

        removeEmployee();
    }, [verifyRemove]);

    // Get employee
    useEffect(() => {
        const getEmployee = async () => {
            try {
                const employeeData = await get(`/employees/${id}`);
                setEmployee(employeeData);
                setFormData({
                    department: employeeData.department,
                    location: employeeData.location,
                    salary: employeeData.salary,
                    id: id,
                });
            } catch (error) {
                navigate('/error', {
                    state: {
                        status: 500,
                        message: 'Error when retrieving employee data',
                    },
                });
            }
        };
        getEmployee();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function renderInput(field, value) {
        return edit ? (
            <>
                <input
                    type='text'
                    name={field}
                    value={value}
                    onChange={handleChange}
                />
            </>
        ) : (
            <span className={field}>{value}</span>
        );
    }

    function handleRemove() {
        setVerifyRemove(true);
    }

    async function handleUpdateEmployee() {
        try {
            if (updateFormCheck(formData, employee)) {
                return setEdit((prev) => !prev);
            }
            validateUpdateEmp({ ...formData });
            await patch(`/employees/${id}`, formData, {
                'Content-Type': 'application/json',
            });
            setEdit(false);
        } catch (err) {
            navigate('/error', {
                state: {
                    status: 500,
                    message: 'Server error during employee update',
                },
            });
        }
    }

    return (
        <section id='inspectEmployee'>
            <button className='btn return' onClick={() => navigate(-1)}>
                <img
                    src={`${import.meta.env.VITE_REACT_URL}/returnIcon.svg`}
                    alt='Return icon'
                />
                Back to list
            </button>
            {loading ? (
                <Spinner />
            ) : (
                <div id='employeeContainer'>
                    <div className='employeeCard inspect'>
                        <div className='title'>
                            <h2>
                                {employee?.firstname} {employee?.lastname}
                            </h2>
                        </div>
                        <div className='frame'>
                            <LazyLoadImage
                                src={`https://robohash.org/${employee?.firstname}${employee?.lastname}.png?set=set5&size=300x300`}
                                placeholder={<Spinner />}
                            />
                        </div>
                    </div>

                    <div className='emInfo'>
                        <div className='emDetails'>
                            {edit ? (
                                <Button
                                    role='save'
                                    handleClick={handleUpdateEmployee}
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/save_Icon.svg`}
                                />
                            ) : (
                                <Button
                                    role='edit'
                                    handleClick={() => setEdit((prev) => !prev)}
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/edit.svg`}
                                    imgAlt='Edit'
                                />
                            )}
                            <p>
                                Role <span>{employee?.role}</span>
                            </p>
                            <p>
                                Employment Type{' '}
                                <span>{employee?.employment_type}</span>
                            </p>

                            <p>
                                Department
                                {renderInput(
                                    'department',
                                    formData?.department
                                )}
                            </p>
                            <p>
                                Location{' '}
                                {renderInput('location', formData?.location)}
                            </p>
                            <p>
                                Salary {renderInput('salary', formData?.salary)}
                            </p>
                        </div>

                        <div className='removeContainer'>
                            {!isRemoving ? (
                                <Button
                                    text='Remove'
                                    role='removeEmp'
                                    handleClick={() => setIsRemoving(true)}
                                />
                            ) : (
                                <>
                                    <p className='removeWarning'>
                                       {`Are you sure you want to remove
                                        ${employee?.firstname}
                                        ${employee?.lastname}? This action is
                                        irreversible!`}
                                    </p>

                                    <div className='warningContainer'>
                                        <Button
                                            role='warningReturn'
                                            text='No, go back ✘'
                                            handleClick={() => setIsRemoving(false)}
                                        />
                                        <Button
                                            role='confirm'
                                            text='Yes, remove ✔'
                                            handleClick={() => handleRemove(id)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {msg && <p className='error'>{msg}</p>}
                </div>
            )}
        </section>
    );
}

export default SinglePage;
