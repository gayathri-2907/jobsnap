import React from 'react'
import SearchBar from '../Components/FindTalent/SearchBar'
import { Divider } from '@mantine/core'
import Talents from '../Components/FindTalent/Talents'
export default function FindTalentPage() {
  return (
     <div>
          <Divider size='xs' mx="md" />
          <SearchBar/>
          <Divider size='xs' mx="md" />
          <Talents/>
        </div>
  )
}
