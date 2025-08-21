import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import './SearchBar.css';
import { IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

export function MultiInput(props) {
  const dispatch=useDispatch();
  useEffect(() => {
    setData(props.options)
  },[props])
  //combo state and handlers
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  //local states
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({[props.title]:[...value,search]}));
    } else {
      dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v)=>v!==val):[...value,val]}))
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]  ); }};

  const handleValueRemove = (val) =>
  {
    dispatch(updateFilter({[props.title]:value.filter((v)=>v!==val)}))
    setValue((current) => current.filter((v) => v !== val));
  }

  const values = value
  .slice(0,1)
  .map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));
    const options = data.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));
  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
        className='fixed-width-input'
          rightSection={<IconSelector />}
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="searchbar-icon">
              <props.icon />
            </div>
          }
        >
      <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length >1 && (
                  <Pill>+{value.length - 1} more</Pill>
                )}
              </>
            ) : (
              <input style={{border:"none",color:"black"}} placeholder={props.title}></input>
            )}


          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
      <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search Criteria"
          />
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
