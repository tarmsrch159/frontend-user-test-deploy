import React, { useState } from 'react'

import { Link } from 'react-router-dom'


function Sidebar() {

    const reload_page = () => {
        location.reload()
    }

    // const [isActive, setIsActive] = useState(false);

    // const handleClick = () => {
    //     // Toggle the isActive state when the element is clicked
    //     setIsActive(!isActive);
    // };

    function direct_admin() {
        window.location = 'https://front-end-admin-vercel-1-4lho.vercel.app/'
    }
    return (
        // sidebar sidebar-offcanvas active
        <nav className='sidebar sidebar-offcanvas active' id="sidebar">
            <ul className="nav">
                <li className="nav-item" onClick={reload_page}>
                    <Link to='/' className="nav-link">
                    <i className="menu-icon mdi mdi-animation"></i>
                        <span className="menu-title">หน้าเลือกหลักสูตร</span>
                    </Link>
                </li>


                {/* <li className="nav-item nav-category">ตรวจสอบสถานะ</li> */}
                <li className="nav-item" onClick={reload_page}>
                    <Link to='/login_user' className="nav-link">
                        <i className="menu-icon mdi mdi-application" />
                        <span className="menu-title">ตรวจสอบสถานะ</span>
                    </Link>
                </li>

                <hr />
                <li className="nav-item" onClick={direct_admin}>
                    <Link onClick={direct_admin} className="nav-link">
                        <i className="menu-icon mdi mdi-account-circle-outline" />

                        <span className="menu-title">หน้าสำหรับ Admin</span>
                    </Link>
                </li>

                {/* <li className="nav-item" onClick={reload_page}>
                    <Link to='/register' className="nav-link">            
                            <i className="menu-icon mdi mdi-floor-plan" />
                            <span className="menu-title">ลงทะเบียนสมาชิก</span>
                    </Link>
                </li> */}

            </ul>
        </nav>
    )
}

export default Sidebar