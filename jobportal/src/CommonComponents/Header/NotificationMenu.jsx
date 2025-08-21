import { Indicator, Menu, Notification} from '@mantine/core'
import { IconBell, IconCheck, } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../Notification.css'
import { getAllNotifications, readNotification } from '../../Services/NotificationService'
import { useNavigate } from 'react-router-dom';
import labels from '../../Labels/LandingPageLabel.json'
export default function NotificationMenu() {
    const navigate=useNavigate();
    const user = useSelector((state) => state.user);
    const [notifications,setNotifications]=useState([])
    useEffect(() => {
        getAllNotifications(user.userEmail).then((res)=>{
            setNotifications(res.data);
        }).catch((error)=>{
            console.log(error);
        })
        //eslint-disable-next-line
    },[]);
    const unread=(index)=>{
        let notificationCount=[...notifications];
        notificationCount=notificationCount.filter((notification,i)=>i!==index);
        setNotifications(notificationCount);
       readNotification(notifications[index].id).then((res)=>console.log(res)).catch((error)=>{
        console.log(error);
       })
    }
    const [opened, setOpened] = useState(false);

    return (
        <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="bg-gradient square rounded-4 p-1 notificationindicator">
                    <Indicator disabled={notifications.length<=0} color='#ffa500' offset={6} size={8} processing>
                        <IconBell size={25} color='white' stroke={1.5} />
                    </Indicator>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)} className='notificationdropdown bg-dark p-3  border border-secondary'>
                <div className='d-flex flex-column gap-2'>
                {
                    notifications.map((notification,index)=>
                        <Notification key={index} 
                        onClick={()=>{
                            navigate(notification.route);
                            setOpened(false);
                            unread(index);

                        }}
                        className='w-100 notificationicon' onClose={()=>unread(index)} icon={<IconCheck />} color='teal' title={notification.action} mt="md">
                       {notification.message}
                    </Notification>)
                }
                {
                    notifications.length===0 && <div className='text-center text-white'>{labels.notificationMenuLabel.emptynotification}</div>
                }

                    <Menu.Divider />
                    </div>
            </Menu.Dropdown>
        </Menu>

    )
}
