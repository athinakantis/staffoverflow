export function validateNewEmp({ ...formData }) {
    const {
        firstname,
        lastname,
        role,
        department,
        employment_type,
        location,
        salary,
    } = formData;

    if (firstname.trim() < 1 || !firstname instanceof String) {
        throw new Error('Missing firstname');
    }

    if (lastname.trim() < 1 || !lastname instanceof String) {
        throw new Error('Missing lastname');
    }

    if (role.trim() < 1 || !role instanceof String) {
        throw new Error('Missing or invalid role');
    }

    if (department === 'default') {
        throw new Error('Missing or invalid department');
    }

    if (employment_type === 'default') {
        throw new Error('Missing employment type');
    }

    if (location === 'default') {
        throw new Error('Missing location');
    }

    if (+salary < 0 || !+salary instanceof Number) {
        throw new Error('Invalid salary');
    }
}

export function validateUpdateEmp({ ...input }) {
    const { department, location, salary } = input;

    if (department.trim() < 1) {
        throw new Error('Invalid department');
    }

    if (location.trim() < 1 || !location instanceof String) {
        throw new Error('Invalid location');
    }

    if (+salary < 0 || !+salary) {
        throw new Error('Invalid salary');
    }
}

export function updateFormCheck(formData, employee) {
    return (
        JSON.stringify(formData) ===
        JSON.stringify({
            department: employee.department,
            location: employee.location,
            salary: employee.salary,
            id: employee.id.toString(),
        })
    );
}
