import { useState } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import './Jobs.css'
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slices/SortSlice';
const opt = ['Relevance', 'Most Recent', 'Salary:Low to High', 'Salary:High to Low'];
const talentSort=['Relevance', 'Experience:Low to High','Experience:High to Low'];
function Sort(props) {
  const dispatch=useDispatch();
  const [selectedItem, setSelectedItem] = useState('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort==="job"? opt.map((item) => (
    <Combobox.Option style={{fontSize:"12px"}} value={item} key={item}>
      {item}
    </Combobox.Option>
  )):talentSort.map((item) => (
    <Combobox.Option style={{fontSize:"12px"}} className='w-75' value={item} key={item}>
      {item}
    </Combobox.Option>));

  return (
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val))
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick={()=>combobox.toggleDropdown()} className='gap-2 sort-items'>
            {selectedItem}<IconAdjustments className='sort-icon'/>
          </div>

        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
  );
}
export default Sort;