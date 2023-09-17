import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { getFilter, setStatusFilter } from 'Redux/contactSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleFilterChange = event => {
    dispatch(setStatusFilter(event.target.value));
  };
  return (
    <div>
      <label className={css.filterWrap}></label>
      <input
        className={css.filter}
        type="text"
        id={filter}
        placeholder="Find contacts by name"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};
