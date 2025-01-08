import options from '../../../data/filters';
import './Select.css';

function Select({ filter, setFilter, setPage }) {
    const { data } = options[filter.key];

    function handleFilterChange(e) {
        const { value } = e.target;
        setFilter({ ...filter, ['value']: value });
        setPage(1);
    }

    return (
        <select
            onChange={handleFilterChange}
            name='emFilter'
            id='emFilter'
        >
            <option value='Default'>No filter</option>
            {data.map((option) => (
                <option
                    key={option.id}
                    value={option.value}
                >
                    {option.data}
                </option>
            ))}
        </select>
    );
}

export default Select;
