import React, { useEffect, useState } from 'react';
import TalentCard from '../FindTalent/TalentCard';
import { getAllProfiles } from '../../Services/ProfileService';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function RecommendTalent(props) {
  const { profileId } = useParams();
  const [talentsList, setTalentsList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user=useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    getAllProfiles()
      .then((res) => {
        setTalentsList(res.data.filter(profile => profile.email !== user.userEmail));
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error fetching recommended talents');
        setIsLoading(false);
      });
      //eslint-disable-next-line
  }, [profileId]);

  // Filter the talents and only keep active talents that are not the current talent
  const filteredTalents = talentsList
    ? talentsList
        .filter((talent) => talent.profileId !== parseInt(profileId))
        .slice(0, 3)
    : [];

  return (
    <div className='d-flex justify-content-between flex-wrap w-50'>
      <div>
        <p className='fs-4 fw-bold'>Recommended Talents</p>
        <div className='recommend-talents d-flex flex-column gap-3'>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredTalents?.length > 0 ? (
            filteredTalents.map((talent, index) => (
              <TalentCard key={index} {...talent} />
            ))
          ) : (
            <p>No recommended talents</p>
          )}
        </div>
      </div>
    </div>
  );
}
