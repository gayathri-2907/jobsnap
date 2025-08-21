import React, { useEffect, useState } from 'react'
import Sort from './Sort'
import JobCard from './JobCard'
import { getAllJobs } from '../../Services/JobService'
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../../Slices/FilterSlice';
import { resetSort } from '../../Slices/SortSlice';
import Pagination from './Pagination'; 
import labels from '../../Labels/JobLabel.json'
export default function Jobs() {
  const [jobList,setJobList]=useState([{}]);
  const dispatch=useDispatch();
  const filter=useSelector((state)=>state.filter);
  const sort=useSelector((state)=>state.sort);
  const [filteredJobs,setFilteredJobs]=useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0);
  
  useEffect(()=>{
    dispatch(resetFilter());
    dispatch(resetSort());
    fetchJobs(0);
    //eslint-disable-next-line
  },[]);
useEffect(()=>{
  if(sort==="Most Recent"){
    setJobList([...jobList].sort((a,b)=>new Date(b.postTime).getTime()-new Date(a.postTime).getTime()))
  }
  else if(sort==="Salary:Low to High"){
    setJobList([...jobList].sort((a,b)=>a.packageOffered-b.packageOffered))
  }else if(sort==="Salary:High to Low"){
    setJobList([...jobList].sort((a,b)=>b.packageOffered-a.packageOffered))
  }
  //  eslint-disable-next-line 
},[sort])

  useEffect(()=>{
    let filterJob=jobList;
 
  if(filter["Job Title"]&&filter["Job Title"].length>0){
    filterJob=filterJob.filter((job)=>filter["Job Title"]?.some((x)=>job.jobTitle.toLowerCase().includes(x.toLowerCase())));
  }
  if(filter.Location && filter.Location.length>0){
    filterJob=filterJob.filter((job)=>filter.Location?.some((x)=>job.location.toLowerCase().includes(x.toLowerCase())));
  }
  if(filter.Experience && filter.Experience.length>0){
    filterJob=filterJob.filter((job)=>filter.Experience?.some((x)=>job.experience?.toLowerCase().includes(x.toLowerCase())));
  }
  if(filter["Job Type"]&&filter["Job Type"].length>0){
    filterJob=filterJob.filter((job)=>filter["Job Type"]?.some((x)=>job.jobType.toLowerCase().includes(x.toLowerCase())));
  }
  if(filter.salary && filter.salary.length>0){
    filterJob=filterJob.filter((job)=>filter.salary[0]<=job.packageOffered && job.packageOffered<=filter.salary[1]);
  }
  setFilteredJobs(filterJob);
  //eslint-disable-next-line
  },[filter,jobList]);

  const fetchJobs = async (pageNumber) => {
    try {
        const res = await getAllJobs(pageNumber, 8); 
        setJobList(res.data.content.filter(job => job.jobStatus === "ACTIVE"));
        setTotalPages(Math.ceil(res.data.totalElements / res.data.size));
        setCurrentPage(pageNumber);
    } catch (err) {
        console.log(err);
    }
};
const handlePageChange = (pageNumber) => {
  fetchJobs(pageNumber);
};
  return (
    <div className='p-3'>
        <div className='jobs-container'>
            <div className='fw-bold fs-4'> {labels.labels.recommandedJobs}</div>
            <Sort sort="job"/>
        </div>
        <div className='Jobs'>
        {
          filteredJobs.length === 0 ? (
            <div className='fw-semibold fs-4'>{labels.default.noJobs}</div>
          ) : (
            filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
          )
        }
        </div>
        <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
    </div>
  )
}
