import { createRef, useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import { Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom'
import { createFileName, useScreenshot } from 'use-react-screenshot'


function Form_register_old() {
  //Hook
  const { course_name } = useParams()
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot({
    type: 'image/jpg',
    quality: 1.0
  })

  const download = (image, { name = 'ข้อมูลสำหรับการตรวจสอบสถานะ', extension = 'jpg' } = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  const getImage = () => {
    takeScreenshot(ref.current).then(download)
  }
  const [id_card, setId_card] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [name_EN, setName_EN] = useState('')
  const [lastname_EN, setLastname_EN] = useState('')
  const [gender, setGender] = useState("")
  const [permission, setPermission] = useState("")
  const [receipt, setReceipt] = useState("")
  const [dp_province, setDp_province] = useState("")
  const [dp_amphure, setDp_amphure] = useState("")
  const [dp_district, setdp_district] = useState("")
  const [course, setCourse] = useState(course_name)
  const [candidate, setCandidate] = useState("")
  const [prefix, setPrefix] = useState("")
  const [nationality, setNationality] = useState("")
  const [birthday, setBirthday] = useState("");
  const [reg_day, setReg_day] = useState("")
  const [tel, setTel] = useState("")
  const [address, setAddress] = useState("")
  const [educational, setEducational] = useState("")
  const [branch, setBranch] = useState("")
  const [email, setEmail] = useState("")
  const [line_id, setLine_id] = useState("")
  const today = new Date()
  const m = today.getMonth() + 1
  const y = today.getFullYear()
  const d = today.getDate()
  const current_date = y + '-' + m + '-' + d




  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])

  const onImageChange = (e) => {
    setImages(e.target.files[0])
  }



  //Usenavigate
  const navigate = useNavigate()
  const [debug_data, setDebug_data] = useState(null)
  const [error, setError] = useState('')
  const [show_modal, setShow_modal] = useState(false)
  const [style_modal, setStyle_modal] = useState("")
  const [provinces, setProvinces] = useState([])
  const [amphure, setAmphure] = useState([])
  const [district, setDistrict] = useState([])

  //For get_provinces and amphures
  const [province_id, setProvince_id] = useState("")
  const [amphure_id, setAmphure_id] = useState("")
  const [district_id, setDistrict_id] = useState("")
  const [show_provinces, setShow_provinces] = useState([])
  const [show_amphures, setShow_amphures] = useState([])
  const [show_district, setShow_district] = useState([])


  const check_debug = () => {

  }

  const [noti_user, setNoti_user] = useState([])
  const [noti_id_card, setNoti_id_card] = useState('')

  const [id_card_img, setId_card_img] = useState([])
  const [educational_Img, setEducational_Img] = useState([])

  const add_member = () => {
    if (!id_card || !name || !lastname || !gender || !course || !candidate
      || !prefix || !nationality || !birthday || !tel
      || !address || !educational || !branch || !email || !images || !line_id || !id_card_img || !educational_Img) {
      alert('กรุณากรอกข้อมูลให้ครบ')
      return false
    }

    const formdata = new FormData
    formdata.append("image", images)
    formdata.append("id_card_img", id_card_img)
    formdata.append("educational_img", educational_Img)
    formdata.append("id_card", id_card)
    formdata.append("name", name)
    formdata.append("lastname", lastname)
    formdata.append("name_EN", name_EN)
    formdata.append("lastname_EN", lastname_EN)
    formdata.append("province", province_id)
    formdata.append("amphure", amphure_id)
    formdata.append("district", district_id)
    formdata.append("gender", gender)
    formdata.append("permission", "รอชำระเงิน")
    formdata.append("receipt", "")
    formdata.append("course", course)
    formdata.append("candidate", candidate)
    formdata.append("prefix", prefix)
    formdata.append("nationality", nationality)
    formdata.append("birthday", birthday)
    formdata.append("tel", tel)
    formdata.append("email", email)
    formdata.append("address", address)
    formdata.append("educational", educational)
    formdata.append("branch", branch)
    formdata.append("reg_day", current_date)
    formdata.append("line_id", line_id)
    formdata.append("kn_score", 0)
    formdata.append("profi_score", 0)
    formdata.append("sum_score", 0)
    axios.post("http://localhost:3000/add_member", formdata).then((res) => {

      if (res.data.STATUS == 'ลงทะเบียนเสร็จสิ้น') {
        setError(false)
        setShow_modal(true)
        alert('กรุณาตรวจสอบข้อมูลสำหรับเข้าใช้งาน !!!')
        setNoti_user(res.data.rows[0].reg_id)
        setNoti_id_card(res.data.id_card)
        // window.location = '/login_user'
      } else {
        setError(true)
        setShow_modal(false)
        alert("เกิดข้อผิดพลาด")
      }
    })
  }


  const handle_province = (e) => {
    setProvince_id(e.target.value)
  }

  useEffect(() => {
    const get_provinces = async () => {
      const resprovinces = await fetch("http://localhost:3000/get_provinces")
      const respro = await resprovinces.json();
      setShow_provinces(await respro)
    }
    get_provinces()
  }, [])
  useEffect(() => {
    const get_amphures = async () => {
      const resAmphures = await fetch(`http://localhost:3000/get_amphures/${province_id}`)
      const resAmp = await resAmphures.json();
      setShow_amphures(await resAmp)
    }
    get_amphures()

  }, [province_id])

  useEffect(() => {
    const get_district = async () => {
      const resDistrict = await fetch(`http://localhost:3000/get_districts/${amphure_id}`)
      const resDis = await resDistrict.json();
      setShow_district(await resDis)
    }

    get_district()
  }, [amphure_id])

  useEffect(() => {
    if (!id_card || !name || !lastname || !gender || !course || !candidate
      || !prefix || !nationality || !birthday || !tel
      || !address || !educational || !branch || !email || !images || !line_id || !id_card_img || !educational_Img) {
      setDebug_data(true)
      setStyle_modal("")
    } else if (images == "" || id_card_img == "" || educational_Img == "") {
      // setError_modal(true)
      setDebug_data(true)
      setStyle_modal("")
    }
    else {
      setDebug_data(false)
      // setError_modal(false)
      setStyle_modal("modal")
    }
  }, [id_card, name, lastname, gender, course, candidate, prefix, nationality, birthday,
    tel, address, educational, branch, email, images, line_id, id_card_img, educational_Img])

  const location = () => {
    window.location = '/login_user'
  }

  console.log('Style model' + style_modal)

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body" style={{ textAlign: "center" }} >
                <h4 className="card-title" ><span style={{ color: 'red' }}>** </span>สแกน LINE QR CODE (สำหรับรับเลขประจำตัวการสอบและการตรวจสอบสถานะ)</h4>
                <img src="https://qr-official.line.me/gs/M_328hqfzt_BW.png?oat_content=qr" className='img-fluid' width={300} height={300}></img>

              </div>
            </div>
          </div>
        </div>


        {show_modal
          ? <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div ref={ref} className="card-body" >

                  <h4 className="card-title mt-3" style={{ textAlign: "center" }} >ข้อมูลสำหรับการตรวจสอบสถานะ</h4>
                  <hr />

                  {/* name and lastname TH*/}
                  <div className="form-group row">
                    <div className="mt-3" style={{ display: 'flex' }}>
                      <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}><span style={{ color: 'red' }}>** </span>รหัสประจำตัวการสอบ:</h5>
                      <span className='fs-6'>
                        <h4> {noti_user} </h4>
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="mb-3" style={{ display: 'flex' }}>
                      <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}><span style={{ color: 'red' }}>** </span>รหัสบัตรประชาชน:</h5>
                      <span className='fs-6'>
                        <h4>{noti_id_card}</h4>
                      </span>
                    </div>
                  </div>


                  <div className="form-group row">
                    <div className="col-8 col-sm-8">

                    </div>
                    <div className="col-4 col-sm-4 d-flex align-items-center">
                      <p><span style={{ color: 'red' }}>* </span>ปริ้นใบสมัครสอบ</p>
                      <button className='btn btn-info py-3 px-4 mx-4' onClick={getImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                          <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                          <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          : <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title" style={{ textAlign: "center" }}>สมัครเข้ารับการอบรมฝีมือแรงงานและทดสอบมาตรฐานฝีมือแรงงาน</h4>
                  <p className="card-description" style={{ textAlign: "center" }}>
                    สำหรับการลงทะเบียนสมาชิก
                  </p>
                  <form className="forms-sample">

                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>หลักสูตรอบรม <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
                          <option selected>กรุณาเลือกหลักสูตร (ฝึกอบรม)</option>
                          <option value='1'>สาขาพนักงานการใช้คอมพิวเตอร์ (ประมวลผลคำ)</option>
                          <option value='2'>สาขาพนักงานการใช้คอมพิวเตอร์ (ตารางทำการ)</option>


                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกหลักสูตร *</p>
                          : null}
                      </div>
                    </div>



                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ประเภทผู้สมัครสอบ (ทดสอบ) <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">

                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCandidate(e.target.value)}>
                          <option select>กรุณาเลือกประเภทผู้สมัครสอบ</option>
                          <option value="ผู้รับการฝึกจาก กพร.">ผู้รับการฝึกจาก กพร.</option>
                          <option value="จากสถานศึกษา">จากสถานศึกษา</option>
                          <option value="จากภาครัฐ">จากภาครัฐ</option>
                          <option value="จากภาคเอกชน">จากภาคเอกชน</option>
                          <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกประเภทผู้สมัครสอบ *</p>
                          : null}
                      </div>
                    </div>

                    <hr />

                    <h5 className="card-title">1. ข้อมูลส่วนบุคคล</h5>
                    {/* Prefix */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>คำนำหน้าชื่อ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setPrefix(e.target.value)}>
                          <option select>กรุณาเลือกคำนำหน้า</option>
                          <option value="นาย">นาย</option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว">นางสาว</option>
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกคำนำหน้า *</p>
                          : null}
                      </div>
                    </div>


                    {/* name and lastname TH*/}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ชื่อ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" required className="form-control" id="exampleInputUsername2" placeholder="ชื่อ"
                          onChange={(e) => setName(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่ชื่อ *</p>
                          : null}
                      </div>

                    </div>

                    {/* name and lastname */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>นามสกุล<span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" required className="form-control" id="validationCustomUsername" placeholder="นามสกุล"

                          onChange={(e) => setLastname(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่นามสกุล *</p>
                          : null}
                      </div>

                    </div>

                    {/* name and lastname TH*/}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ชื่อ ภาษาอังกฤษ(EN)<span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" required className="form-control" id="exampleInputUsername2" placeholder="ชื่อ"
                          onChange={(e) => setName_EN(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่ชื่อ *</p>
                          : null}
                      </div>

                    </div>

                    {/* name and lastname */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>นามสกุล ภาษาอังกฤษ(EN)<span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" required className="form-control" id="validationCustomUsername" placeholder="นามสกุล"

                          onChange={(e) => setLastname_EN(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่นามสกุล *</p>
                          : null}
                      </div>

                    </div>

                    {/* gender */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>เพศ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                          <option select>กรุณาเลือกเพศ</option>
                          <option value="ชาย">ชาย</option>
                          <option value="หญิง">หญิง</option>
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกเพศ *</p>
                          : null}
                      </div>

                    </div>





                    {/* id_card */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>เลขบัตรประจำตัวประชาชน <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="เลขบัตรประจำตัวประชาชน"
                          onChange={(e) => setId_card(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาป้อนเลขบัตรประจำตัวประชาชน *</p>
                          : null}
                      </div>
                    </div>



                    {/* id_card */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>สัญชาติ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="สัญชาติ"
                          onChange={(e) => setNationality(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">สัญชาติ *</p>
                          : null}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>วัน เดือน ปี (เกิด คศ. เท่านั้น) <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <p>เดือน / วัน / ปีเกิด</p>

                        <input type="date" onChange={(e) => setBirthday(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่วัน เดือน ปีเกิด *</p>
                          : null}
                      </div>
                    </div>

                    <div className="div">
                      <input hidden type="date" onChange={(e) => setReg_day(set)} />
                    </div>



                    {/* Tel */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>โทรศัพท์ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="โทรศัพท์"
                          onChange={(e) => setTel(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่เบอร์โทรศัพท์ *</p>
                          : null}

                      </div>
                    </div>


                    {/* Email */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>อีเมลล์ (ถ้ามี)</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="อีเมลล์ (ถ้ามี)"
                          onChange={(e) => setEmail(e.target.value)} />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่อีเมลล์ *</p>
                          : null}
                      </div>
                    </div>


                    {/* Address */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""} onChange={(e) => setAddress(e.target.value)} />
                          <label htmlFor="floatingTextarea2">ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน</label>
                          {debug_data
                            ? <p className="text-danger mt-2">กรุณาใส่ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน *</p>
                            : null}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>จังหวัด <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => handle_province(e)} >
                          <option select>จังหวัด</option>
                          {show_provinces.map((val) => {
                            return (
                              <option key={val.id} value={val.id}>{val.name_th}</option>
                            )
                          })}
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">จังหวัด *</p>
                          : null}

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>อำเภอ <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setAmphure_id(e.target.value)}>
                          <option select>อำเภอ</option>
                          {show_amphures.map((val) => {
                            return (
                              <option key={val.id} value={val.id}>{val.name_th}</option>
                            )
                          })}
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">อำเภอ *</p>
                          : null}

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>แขวง/ตำบล <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setDistrict_id(e.target.value)}>
                          <option select>แขวง/ตำบล</option>
                          {show_district.map((val) => {
                            return (
                              <option key={val.id} value={val.id}>{val.name_th}</option>
                            )
                          })}
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">แขวง/ตำบล *</p>
                          : null}

                      </div>
                    </div>


                    <div className="form-group row">
                      <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>วุฒิการศึกษาสูงสุด <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setEducational(e.target.value)}>
                          <option select>กรุณาเลือกวุฒิการศึกษาสูงสุด</option>
                          <option value="ประถมศึกษา">ประถมศึกษา</option>
                          <option value="มัธยมต้น">มัธยมต้น</option>
                          <option value="มัธยมปลาย">มัธยมปลาย</option>
                          <option value="อนุปริญญา"> อนุปริญญา</option>
                          <option value="ปวช.">ปวช.</option>
                          <option value="ปวส./ปวท.">ปวส./ปวท.</option>
                          <option value="ปริญญาตรีขึ้นไป">ปริญญาตรีขึ้นไป</option>
                          <option value="ไม่จบการศึกษา">ไม่จบการศึกษา</option>
                        </select>
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกวุฒิการศึกษาสูงสุด *</p>
                          : null}
                      </div>
                    </div>


                    {/* สาขา */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>สาขา <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="สาขา"
                          onChange={(e) => setBranch(e.target.value)}
                        />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่สาขา *</p>
                          : null}
                      </div>
                    </div>

                    {/* Line_id */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>Line id <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="exampleInputUsername2" placeholder="Line id"
                          onChange={(e) => setLine_id(e.target.value)}
                        />
                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาใส่ Line id *</p>
                          : null}
                      </div>
                    </div>

                    {/* สาขา */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>รูปประจำตัว <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        <input type="file" name='image' onChange={onImageChange} multiple accept='image/*' className="form-control py-2" id="customFile" />

                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาเลือกรูประจำตัว *</p>
                          : null}
                      </div>
                    </div>

                    {/* สาขา */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>แนบสำเนาบัตรประจำตัวประชาชน <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        <input type="file" name='id_card_img' onChange={(e) => setId_card_img(e.target.files[0])} multiple accept='id_card_img/*' className="form-control py-2" id="customFile" />

                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาแนบสำเนาบัตรประจำตัวประชาชน *</p>
                          : null}
                      </div>
                    </div>


                    {/* education img */}
                    <div className="form-group row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>แนบวุฒิการศึกษา <span style={{ color: "red" }}>*</span></label>
                      <div className="col-sm-9" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        <input type="file" name= 'educational_img'onChange={(e) => setEducational_Img(e.target.files[0])} multiple accept='Educational_Img/*' className="form-control py-2" id="customFile" />

                        {debug_data
                          ? <p className="text-danger mt-2">กรุณาแนบวุฒิการศึกษา *</p>
                          : null}
                      </div>
                    </div>



                    <div style={{ textAlign: 'center' }}>
                      <button className="btn btn-warning py-3" type="button" onClick={add_member}>ยืนยันข้อมูล</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default Form_register_old