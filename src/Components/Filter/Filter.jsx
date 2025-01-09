import Select from '../CustomComponents/Select/Select';
import './Filter.css';

function Filter({ setFilter, setPage, filter }) {
    function handleFilterGroup(e) {
        const { value } = e.target;
        if (value !== 'Default') {
            setFilter({ key: value.toLowerCase(), value: 'Default' });
        } else {
            setFilter({ key: 'Default', value: 'Default' });
        }
    }

    return (
        <div className='filterOptions'>
            <label htmlFor='filterGroup'>Filter by: </label>
            <select
                name='filterGroup'
                id='filterGroup'
                onChange={handleFilterGroup}
            >
                <option value='Default'>Name</option>
                <option value='Location'>Location</option>
                <option value='Department'>Department</option>
            </select>
            {filter.key !== 'Default' && (
                <Select
                    filter={filter}
                    setFilter={setFilter}
                    setPage={setPage}
                />
            )}
        </div>
    );
}

export default Filter;
