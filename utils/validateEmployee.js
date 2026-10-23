const validateEmployee = (data) =>
{
    const {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department
    } = data;

    // All fields are required.
    const requiredFields = [
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department
    ];

    if (requiredFields.some(value =>
        value == null ||
        (typeof value === "string" && value.trim() === "")
    ))
    {
        return "All fields are required";
    }

    // Validate fields only when supplied.
    if (first_name !== undefined &&
        (typeof first_name !== "string" || !first_name.trim()))
    {
        return "First name must not be empty";
    }

    if (last_name !== undefined &&
        (typeof last_name !== "string" || !last_name.trim()))
    {
        return "Last name must not be empty";
    }

    if (email !== undefined)
    {
        if (typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        {
            return "Please provide a valid email address";
        }
    }

    if (position !== undefined &&
        (typeof position !== "string" || !position.trim()))
    {
        return "Position must not be empty";
    }

    if (department !== undefined &&
        (typeof department !== "string" || !department.trim()))
    {
        return "Department must not be empty";
    }

    if (salary !== undefined &&
        (typeof salary !== "number" ||
            !Number.isFinite(salary) ||
            salary < 0))
    {
        return "Salary must be a non-negative number";
    }

    if (date_of_joining !== undefined)
    {
        const date = new Date(date_of_joining);

        if (isNaN(date.getTime()))
        {
            return "Please provide a valid date of joining";
        }
    }

    return null;
};

module.exports = validateEmployee;