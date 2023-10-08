import React from 'react'

function Navbar() {
  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div className="me-3">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
            <span className="icon-menu" />
          </button>
        </div>
        <div>
          <a className="navbar-brand brand-logo" href="index.html">
            {/* <img src="" alt="logo" /> */}
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            {/* <img src="" alt="logo" /> */}
          </a>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-top">



        {/* Searchbar */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <form className="search-form" action="#">
              <i className="icon-search" />
              <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
            </form>
          </li>
        </ul>


{/* 
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown d-none d-lg-block">
            <a className="nav-link dropdown-bordered dropdown-toggle dropdown-toggle-split" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Select Category </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="messageDropdown">
              <a className="dropdown-item py-3">
                <p className="mb-0 font-weight-medium float-left">Select category</p>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">Bootstrap Bundle </p>
                  <p className="fw-light small-text mb-0">This is a Bundle featuring 16 unique dashboards</p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">Angular Bundle</p>
                  <p className="fw-light small-text mb-0">Everything you’ll ever need for your Angular projects</p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">VUE Bundle</p>
                  <p className="fw-light small-text mb-0">Bundle of 6 Premium Vue Admin Dashboard</p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">React Bundle</p>
                  <p className="fw-light small-text mb-0">Bundle of 8 Premium React Admin Dashboard</p>
                </div>
              </a>
            </div>
          </li> */}
          
          
          

        {/* Profile */}
{/* 
          <li className="nav-item dropdown d-none d-lg-block user-dropdown">
            <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image" /> </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
              <div className="dropdown-header text-center">
                <img className="img-md rounded-circle" src="images/faces/face8.jpg" alt="Profile image" />
                <p className="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
                <p className="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
              </div>
              <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile <span className="badge badge-pill badge-danger">1</span></a>
              <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" /> Messages</a>
              <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" /> Activity</a>
              <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2" /> FAQ</a>
              <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2" />Sign Out</a>
            </div>
          </li>
        </ul> */}
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar