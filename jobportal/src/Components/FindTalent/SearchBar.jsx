import React, { useState } from 'react';
import { MultiInput } from '../FindJobs/MultiInput';
import { Divider, RangeSlider } from '@mantine/core';
import './TalentPage.css';
import { searchFields } from '../../Data/TalentData';
import { IconUserCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

export default function SearchBar() {
  const dispatch=useDispatch();
  const [value, setValue] = useState([0, 50]);
  const [name,setName]=useState('');
  const handleChange=(name,event)=>{
    if(name==="exp"){
      dispatch(updateFilter({exp:event}))
    }else{
      dispatch(updateFilter({name:event.target.value}));
      setName(event.target.value);
    }
  }
  return (
    <div className="search-multiinput-outer-container">
      <div className="d-flex align-items-center talent-name">
        <div className="talent-input-container position-relative">
          <IconUserCircle size={20} className="talent-user-icon" />
          <input defaultValue={name} onChange={(e)=>handleChange("name",e)} className='square rounded-1' placeholder="Talent Name"/>
        </div>
      </div>
      {
        searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="search-multiinput">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </React.Fragment>
      ))
      }
      <div className="range-slider">
        <div className="slider-title">
          <div>Experience(In Years)</div>
          <div>{value[0]} -{value[1]}</div>
        </div>
        <RangeSlider
          color="orange" size="xs"
          min={1}
          max={50}
          step={1}
          minRange={1}
          value={value}
          onChangeEnd={(e)=>handleChange("exp",e)}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          labelAlwaysOn
          onChange={setValue}
        />
      </div>
    </div>
  );
}
