import React, { useEffect, useState } from 'react';
import Sort from '../FindJobs/Sort';
import TalentCard from './TalentCard';
import { getAllProfiles } from '../../Services/ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../../Slices/FilterSlice';
import { resetSort } from '../../Slices/SortSlice';
import labels from '../../Labels/TalentLabel.json'
import Pagination from '../FindJobs/Pagination';
export default function Talents() {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const user=useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(0); 
      const [totalPages, setTotalPages] = useState(0);
      
      useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        fetchTalents(0);
        //eslint-disable-next-line
      },[]);

      

  useEffect(() => {
    if (sort === 'Experience:Low to High') {
      setTalents([...talents].sort((a, b) => a.totalExperience - b.totalExperience));
    } else if (sort === 'Experience:High to Low') {
      setTalents([...talents].sort((a, b) => b.totalExperience - a.totalExperience));
    }
    //  eslint-disable-next-line
  }, [sort]);
  
  useEffect(() => {
    let filterTalent = talents;
    if (filter.name) {
      filterTalent = filterTalent.filter((talent) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));
    }
    
    if (filter['Job Title'] && filter['Job Title'].length > 0) {
      filterTalent = filterTalent.filter((talent) =>
        filter['Job Title'].some((title) => talent.jobTitle?.toLowerCase().includes(title.toLowerCase()))
      );
    }
    
    if (filter.Location && filter.Location.length > 0) {
      filterTalent = filterTalent.filter((talent) =>
        filter.Location.some((location) => talent.location?.toLowerCase().includes(location.toLowerCase()))
    );
  }
  
  if (filter.Skills && filter.Skills.length > 0) {
    filterTalent = filterTalent.filter((talent) =>
      filter.Skills.some((skill) =>
        talent.skills?.some((talentSkills) => talentSkills.toLowerCase().includes(skill.toLowerCase()))
  )
);
}

if (filter.exp && filter.exp.length > 0) {
  filterTalent = filterTalent.filter(
    (talent) => filter.exp[0] <= talent.totalExperience && talent.totalExperience <= filter.exp[1]
  );
}

setFilteredTalents(filterTalent);
//eslint-disable-next-line
}, [filter, talents]);
const fetchTalents=async(pageNumber)=>{
  try{
    const response = await getAllProfiles(pageNumber,6);
    console.log("response", response)
      setTalents(response.data?.filter(profile => profile.email !== user.userEmail));
      setTotalPages(Math.ceil(response.data.totalElements/response.data.size));
      setCurrentPage(pageNumber)
    }catch(err){
      console.log(err);
    }
   }

   const handlePageChange=(pageNumber)=>{
    fetchTalents(pageNumber);
   }

  return (
    <div className='p-3'>
      <div className='jobs-container'>
        <div className='fw-bold fs-4'>{labels.labels.talents}</div>
        <Sort />
      </div>
      <div className='container-fluid Jobs'>
        {filteredTalents.length ? (
          filteredTalents.map((talent, index) => <TalentCard key={index} {...talent} />)
        ) : (
          <div className='fs-4 fw-semibold'>{labels.default.notalents}</div>
        )}
      </div>
      {filteredTalents.length>0 && 
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />}
    </div>
  );
}


