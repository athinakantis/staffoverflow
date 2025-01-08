import useEmployeeStatus from './useEmployeeStatus';

export const formatTimeWorked = (startdate) => {
    const { yearsWorked, monthsWorked, daysWorked } =
        useEmployeeStatus(startdate);

    if (yearsWorked < 1) {
        if (monthsWorked < 1) {
            return daysWorked <= 1 ? '1 day' : `${daysWorked} days`;
        } else {
            return `${monthsWorked} months`;
        }
    } else {
        return yearsWorked === 1 ? '1 year' : `${yearsWorked} years`;
    }
};
