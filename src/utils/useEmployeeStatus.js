import { useMemo } from "react";

export function useEmployeeStatus(startDate) {
    const yearsWorked = useMemo(() => {
        if (!startDate) return 0;
        const today = new Date();
        const start = new Date(startDate);

        let years = today.getFullYear() - start.getFullYear();

        if (
            today.getMonth() < start.getMonth() ||
            (today.getMonth() === start.getMonth() && today.getDate() < start.getDate())
        ) {
            years -= 1;
        }

        return years;
    }, [startDate]);

    const isProbation = yearsWorked < 0.5;
    const isAnniversary = yearsWorked > 0 && yearsWorked % 5 === 0;

    return { yearsWorked, isProbation, isAnniversary };
}

export default useEmployeeStatus;