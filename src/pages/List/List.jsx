import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import EmployeeCard from '../../Components/Card/Card';
import Filter from '../../Components/Filter/Filter';
import Button from '../../Components/CustomComponents/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import './List.css';

function List() {
    const { get } = useAxios(import.meta.env.VITE_API_URL);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const totalPages = useRef(0);
    const [teamLeads, setTeamLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        key: 'Default',
        value: 'Default',
    });

    function handleNavigate(id) {
        navigate(`/home/employees/${id}`);
    }

    // Effect to fetch employee data from backend
    // Retries if unsuccessful
    useEffect(() => {
        const getEmployees = async (retries = 3, delay = 5000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await get(`/employees?_page=${page}`);
                    totalPages.current = response.pages.totalPages;
                    setEmployees(response.data);
                    setLoading(false);
                    return;
                } catch (error) {
                    if (i < retries - 1) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, delay)
                        );
                    } else {
                        showError(error);
                    }
                }
            }
        };

        getEmployees(`/employees?_page=${page}`);

        const getFilteredEmployees = async () => {
            try {
                const response = await get(
                    `/employees?key=${filter.key}&value=${filter.value}&_page=${page}`
                );
                setEmployees(response.data);
                totalPages.current = response.pages;
            } catch (error) {
                showError(error);
            }
        };

        if (filter.value !== 'Default') {
            getFilteredEmployees();
        } else {
            getEmployees();
        }
    }, [page, filter]);

    const showError = (error) => {
        navigate('/error', {
            state: {
                message: error.message,
                status: 500,
            },
        });
    };

    return (
        <section id='list'>
            {loading ? (
                <Spinner background='aliceblue' />
            ) : (
                <>
                    {employees?.length > 0 ? (
                        <>
                            <Filter
                                employees={employees}
                                filter={filter}
                                setFilter={setFilter}
                                setPage={setPage}
                            />
                            <div className='listContainer'>
                                <div id='employeeList'>
                                    {Array.isArray(employees) &&
                                        employees.map((employee) => {
                                            return (
                                                <EmployeeCard
                                                    key={employee?.id}
                                                    {...employee}
                                                    initialRole={employee?.role}
                                                    teamLeads={teamLeads}
                                                    setTeamLeads={setTeamLeads}
                                                    handleNavigate={
                                                        handleNavigate
                                                    }
                                                />
                                            );
                                        })}
                                    <div className='newEmployeeCard addNew'>
                                        <button
                                            onClick={() =>
                                                navigate('/home/add')
                                            }
                                        >
                                            <img
                                                src='/add_icon.svg'
                                                alt='Add employee Icon'
                                            />
                                        </button>
                                        <p>Add new employee</p>
                                    </div>
                                </div>
                                <div className='pageNavigation'>
                                    {page > 1 && (
                                        <Button
                                            role='prevPage'
                                            text='Previous page'
                                            handleClick={() => {
                                                setPage((prev) => prev - 1);
                                            }}
                                            img='/arrowBack.svg'
                                        />
                                    )}
                                    {page < totalPages.current && (
                                        <Button
                                            role='nextPage'
                                            handleClick={() => {
                                                setPage((prev) => prev + 1);
                                            }}
                                            img='/arrowNext.svg'
                                            text='Next page'
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div id='emptyList'>
                            <p>Employee list is currently empty!</p>
                            <Link to='/home/add'>Add employees</Link>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default List;
