import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard';
import Filter from '../../Components/Filter/Filter';
import Button from '../../Components/CustomComponents/Button/Button';
import './EmployeeList.css';

function EmployeeList() {
    const { get } = useAxios(
        `${import.meta.env.VITE_API_URL}`
    );
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const totalPages = useRef(0);
    const [filter, setFilter] = useState('Default');
    const [filterGroup, setFilterGroup] = useState('Default');
    const [teamLeads, setTeamLeads] = useState([]);

    function handleNavigate(id) {
        navigate(`/home/employees/${id}`);
    }

    // Effect to fetch employee data from backend
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await get(
                    `/employees?_page=${page}&_sort=firstname`
                );
                totalPages.current = response.pages;
                setEmployees(response.data);
            } catch (error) {
                showError();
            }
        };

        const getFilteredEmployees = async () => {
            try {
                const response = await get(
                    `/employees?${filterGroup}=${filter}&_page=${page}&_sort=firstname`
                );
                setEmployees(response.data);
                totalPages.current = response.pages;
            } catch (err) {
                showError();
            }
        };

        if (filter !== 'Default') {
            getFilteredEmployees();
        } else {
            getEmployees();
        }
    }, [page, filter]);

    const showError = () => {
        navigate('/error', {
            state: {
                message: err.message,
                status: 500,
            },
        });
    };

    return (
        <section id='list'>
            {employees?.length < 1 ? (
                <div id='emptyList'>
                    <p>Employee list is currently empty!</p>
                    <Link to='/home/add'>Add employees</Link>
                </div>
            ) : (
                <>
                    <Filter
                        employees={employees}
                        setFilter={setFilter}
                        setFilterGroup={setFilterGroup}
                        filterGroup={filterGroup}
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
                                            handleNavigate={handleNavigate}
                                        />
                                    );
                                })}
                            <div className='newEmployeeCard addNew'>
                                <button onClick={() => navigate('/home/add')}>
                                    <img
                                        src={`${
                                            import.meta.env.VITE_REACT_URL
                                        }/add_icon.svg`}
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
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/arrowBack.svg`}
                                />
                            )}
                            {page < totalPages.current && (
                                <Button
                                    role='nextPage'
                                    handleClick={() => {
                                        setPage((prev) => prev + 1);
                                    }}
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/arrowNext.svg`}
                                    text='Next page'
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default EmployeeList;
