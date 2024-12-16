
/* GET requests */

// All employees

// Single employee
export async function fetchEmployee(id) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`
    );
    const data = await response.json();
    return data;
}

export async function fetchFilteredEmployees(filterGroup, filter, page) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL
            }/employees?${filterGroup}=${filter}&_page=${page}&_sort=firstname&_order=asc`
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error when fetching filtered employees`);
    }
}

/* PUT requests */
export async function promoteEmployee(department, id, name) {
    await fetch(`${import.meta.env.VITE_API_URL}/teamleads/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            department: department,
            employeeId: id,
            employeeName: name,
        }),
    });
    return true;
}

export async function demoteEmployee(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/teamleads/${id}`, {
        method: 'DELETE',
    });
    return true;
}

export async function addNewEmployee(formData) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    return data;
}

/* PATCH requests */
export async function updateEmployee(formData, id) {
    console.log(formData);
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
    );
    return await response.json();
}

/* DELETE requests */
export async function deleteEmployee(id) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        { method: 'DELETE' }
    );
    return response;
}
