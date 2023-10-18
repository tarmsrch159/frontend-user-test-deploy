import React, { useState } from 'react'

import { Link } from 'react-router-dom'


function Sidebar() {

    const reload_page = () => {
        location.reload()
    }
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
            <li className="nav-item" onClick={reload_page}>
                    <Link to='/' className="nav-link">
                        <i className="menu-icon mdi mdi-floor-plan" />
                        <span className="menu-title">หน้าเลือกหลักสูตร</span>
                    </Link>
                </li>


                {/* <li className="nav-item nav-category">ตรวจสอบสถานะ</li> */}
                <li className="nav-item" onClick={reload_page}>
                    <Link to='/login_user' className="nav-link">
                        <i className="menu-icon mdi mdi-floor-plan" />
                        <span className="menu-title">ตรวจสอบสถานะ</span>
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