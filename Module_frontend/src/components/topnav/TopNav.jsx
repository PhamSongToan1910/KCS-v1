import React, { useEffect } from 'react'

import './topnav.scss'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'

import notifications from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/tuat.png'

import user_menu from '../../assets/JsonData/user_menus.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserByUsername } from '../../redux/slices/UserSlice'
import { jwtDecode } from 'jwt-decode';
import { avatarClasses } from '@mui/material'

const API_URL = "http://localhost:8081/api/v1/user";

const token = localStorage.getItem('token')

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)


const renderUserToggle = (props) => {
        // const avatarData = props.avatar;
        // console.log("-----------",avatarData.data)
        // const base64 = `data:image; base64, ${avatarData.data}`
        // console.log(base64);
        return (
          <div className="topnav__right-user">
            <div className="topnav__right-user__image">
              {/* <img src={base64} alt="" /> */}
            </div>
            <div className="topnav__right-user__name">
              {props.user.name} {/* Giả sử tên người dùng là trường 'name' */}
            </div>
          </div>
        );
      };

const Topnav = (props) => {

    
    
      

    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
    }
    const renderUserMenu = (item, index) => (
        <Link to={item.path} onClick={() => (item.path === "/login" ? handleClick() : '')} key={index}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>

    )
    return (
        <>

            <div className='topnav'>
                <div className="topnav__search">
                    <input type="text" placeholder='Search here...' />
                    <i className='bx bx-search'></i>
                </div>
                <div className="topnav__right">
                    <div className="topnav__right-item">
                        <Dropdown
                            icon='bx bx-bell'
                            badge='12'
                            contentData={notifications}
                            renderItems={(item, index) => renderNotificationItem(item, index)}
                            renderFooter={() => <Link to='/'>View All</Link>}
                        />

                    </div>
                    <div className="topnav__right-item">

                        <Dropdown
                            customToggle={() => renderUserToggle(props)}
                            contentData={user_menu}
                            renderItems={(item, index) => renderUserMenu(item, index)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topnav