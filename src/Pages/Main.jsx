import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-tab">
                            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true" style={{ fontWeight: "bolder", fontSize: "16px" }}>หน้าเลือกหลักสูตร</a>
                                    </li>

                                </ul>
                                <div>

                                </div>
                            </div>
                            <div className="tab-content tab-content-basic">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <h4 className="card-title text-center">หน้าเลือกหลักสูตร</h4>
                                                    <p className="card-description text-center">

                                                    </p>
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" style={{ fontSize: "16px" }}>ลำดับ</th>
                                                                    <th scope="col" style={{ fontSize: "16px" }}>สาขา</th>
                                                                    <th scope="col" style={{ fontSize: "16px" }}>หน่วยงาน</th>
                                                                    <th scope="col" style={{ fontSize: "16px" }}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td style={{ fontSize: "16px" }}>สาขาพนักงานการใช้คอมพิวเตอร์ (ประมวลผลคำ)</td>
                                                                    <td style={{ fontSize: "16px" }}>คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ มทร. ศูนย์สุพรรณบุรี</td>
                                                                    <td>
                                                                        <Link to={`/register/1`}>
                                                                            <button type="button" class="btn btn-info px-4 py-3" data-ripple-color="dark">
                                                                                สมัคร
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">2</th>
                                                                    <td style={{ fontSize: "16px" }}>สาขาพนักงานการใช้คอมพิวเตอร์ (ตารางทำการ)</td>
                                                                    <td style={{ fontSize: "16px" }}>คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ มทร. ศูนย์สุพรรณบุรี</td>
                                                                    <td>
                                                                        <Link to={`/register/2`}>
                                                                            <button type="button" class="btn btn-info px-4 py-3" data-ripple-color="dark">
                                                                                สมัคร
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                <tr>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    
                </div>
            </footer>
            {/* partial */}
        </div>
    )
}

export default Main