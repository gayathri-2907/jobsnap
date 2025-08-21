import React, { useState } from 'react'
import { MultiInput } from './MultiInput'
import { dropdownData } from '../../Data/JobData'
import {Divider, RangeSlider} from '@mantine/core'
import './SearchBar.css'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../../Slices/FilterSlice'
export default function SearchBar() {
  const [value,setValue]=useState([0,300]);
  const dispatch = useDispatch();
  const handleChange=(event)=>{
  
      dispatch(updateFilter({salary:event}));
  
  }
  return (
    <div className='search-multiinput-outer-container'>
    {
      dropdownData.map((item, index) =><><div key={index} className='search-multiinput'>
      <MultiInput {...item}/>
    </div>
    <Divider mr="xs" size='xs' orientation="vertical"/>
    </>)
    }
    <div className='range-slider'>
    <div className='slider-title'>
      <div>Salary</div>
      <div>&#8377;{value[0]} LPA-&#8377;{value[1]} LPA</div>
    </div>

      <RangeSlider color='orange' size="xs" value={value} labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }} labelAlwaysOn onChange={setValue} onChangeEnd={handleChange}/>
    </div>
    </div>
  )
}
