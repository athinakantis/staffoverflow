import { useMemo } from 'react';

export function useEmployeeStatus(startDate) {
    const today = new Date();
    const start = new Date(startDate);

    const yearsWorked = useMemo(() => {
        if (!startDate) return 0;

        let years = today.getFullYear() - start.getFullYear();

        if (
            today.getMonth() < start.getMonth() ||
            (today.getMonth() === start.getMonth() &&
                today.getDate() < start.getDate())
        ) {
            years -= 1;
        }

        return years;
    }, [startDate]);

    const monthsWorked = useMemo(() => {
        if (!startDate) return 0;

        const months = start.getMonth() - today.getMonth();
        return months;
    }, [startDate]);

    const daysWorked = useMemo(() => {
        if (!startDate) return 0;

        let days = start.getDate() - today.getDate();
        return days;
    }, [startDate]);

    const isProbation = yearsWorked < 0.5;
    const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;

    return {
        yearsWorked,
        isProbation,
        isAnniversary,
        monthsWorked,
        daysWorked,
    };
}

export default useEmployeeStatus;
