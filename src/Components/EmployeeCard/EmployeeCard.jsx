import { useState, useEffect } from 'react';
import './EmployeeCard.css';
import Button from '../CustomComponents/Button/Button';
import { useNavigate } from 'react-router-dom';
import useEmployeeStatus from '../../utils/useEmployeeStatus';

function EmployeeCard(props) {
    const {
        id,
        initialRole,
        firstname,
        lastname,
        department,
        startdate,
        teamLeads,
        setTeamLeads,
        handleNavigate,
    } = props;

    const [role, setRole] = useState(initialRole);
    const [msg, setMsg] = useState('');
    const { yearsWorked, isProbation, isAnniversary } =
        useEmployeeStatus(startdate);

    const currentTeamLead = teamLeads?.find((a) => a.department == department);
    async function handleRoleChange() {
        try {
            if (currentTeamLead && currentTeamLead.id != id) {
                setMsg(
                    `Error: ${currentTeamLead.employeeName} is currently team leader`
                );
                return setTimeout(() => setMsg(''), 3000);
            } else if (!currentTeamLead) {
                setMsg('');
                setTeamLeads((prev) => [
                    ...prev,
                    {
                        department: department,
                        id: id,
                        employeeName: `${firstname} ${lastname}`,
                    },
                ]);
                setRole('Team leader');
            } else if (currentTeamLead && currentTeamLead.id == id) {
                setMsg('');
                setTeamLeads(
                    teamLeads.filter((a) => a.department !== department)
                );
                setRole(initialRole);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={`employeeCard`}>
            <div className='title'>
                <p className='emName'>
                    {firstname} {lastname}
                </p>
            </div>
            <div className='frame'>
                <img
                    src={`https://robohash.org/${firstname}${lastname}.png?set=set5&size=140x140`}
                />
                {currentTeamLead?.id == id && (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='#f48023'
                        className='size-6'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                            clipRule='evenodd'
                        />
                    </svg>
                )}
            </div>
            <div className='emDetails'>
                <p>
                    Role <span>{role}</span>
                </p>
                <p>
                    Time employed{' '}
                    <span>
                        {yearsWorked > 1
                            ? `${yearsWorked} years`
                            : yearsWorked === 1
                            ? `${yearsWorked} year`
                            : `${yearsWorked} months`}
                    </span>
                </p>
            </div>
            {msg && <p className='error'>{msg}</p>}
            <div className='emOptions'>
                <Button
                    role='secondary'
                    id='changeRole'
                    handleClick={handleRoleChange}
                    type='button'
                    text={currentTeamLead?.id == id ? 'Demote' : 'Promote'}
                />
                <Button
                    text='See more'
                    role='primary'
                    handleClick={() => handleNavigate(id)}
                />
                {isAnniversary && (
                    <Button
                        text='Schedule recognition meeting'
                        role='schedule recognition'
                        img='/cake.svg'
                    />
                )}
                {isProbation && (
                    <Button
                        text='Schedule assessment review'
                        role='schedule assessment'
                        img='/chat_bubbles.svg'
                    />
                )}
            </div>
        </div>
    );
}

export default EmployeeCard;
