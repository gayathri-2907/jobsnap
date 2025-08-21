import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
export const fields=[
    {
      label:"Job Title",placeholder:"Enter JobTitle",options:['Designer','Developer','Product Manager','Marketing Specialit','Assosciate Developer'],leftSection:IconBriefcase
    },
    {
      label:"Company",placeholder:"Enter Company Name",options:["Google","Amazon","Figma","Netflix","Meta","Microsoft","Pinterest","Slack","Spotify","Oracle","Walmart","Endava","GalaxE"],leftSection:IconBriefcase
    },
    {
      label:"Location",placeholder:"Enter Location",options:['Delhi','Bangalore','New York','San Francisco','London','Berlin','Tokyo','Sydney','Seattle'],leftSection:IconMapPin
    },
    {
      label:"Total Experience",placeholder:"Enter Total Experience",options:["1 year","2 years","3 years"]
    }
]