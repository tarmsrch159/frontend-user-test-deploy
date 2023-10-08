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



                <li className="nav-item" onClick={reload_page}>
                    <Link to='/register' className="nav-link">            
                            <i className="menu-icon mdi mdi-floor-plan" />
                            <span className="menu-title">ลงทะเบียนสมาชิก</span>
                    </Link>
                </li>
                {/* <li className="nav-item nav-category">Forms and Datas</li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                        <i className="menu-icon mdi mdi-card-text-outline" />
                        <span className="menu-title">Form elements</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="form-elements">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"><a className="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                        <i className="menu-icon mdi mdi-chart-line" />
                        <span className="menu-title">Charts</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="charts">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                        <i className="menu-icon mdi mdi-table" />
                        <span className="menu-title">Tables</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="tables">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                        <i className="menu-icon mdi mdi-layers-outline" />
                        <span className="menu-title">Icons</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="icons">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
                        </ul>
                    </div>
                </li> */}
                {/* <li className="nav-item nav-category">pages</li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="menu-icon mdi mdi-account-circle-outline" />
                        <span className="menu-title">User Pages</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item nav-category">help</li>
                <li className="nav-item">
                    <a className="nav-link" href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
                        <i className="menu-icon mdi mdi-file-document" />
                        <span className="menu-title">Documentation</span>
                    </a>
                </li> */}
            </ul>
        </nav>
    )
}

export default Sidebar