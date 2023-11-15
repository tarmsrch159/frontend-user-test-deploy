import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MD5 } from 'crypto-js'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import jsPDF from 'jspdf'
import { font } from '../assets/Fonts/THSarabun-normal'
import { fontBold } from '../assets/Fonts/THSarabun Bold-bold'
import taweesak_signature from '../assets/img/taweesak_signature.png'
import logo_certi from '../assets/img/logo_certi.png'
import profile_1in from '../assets/img/profile_1in.png'
import wutthiphong_signature from '../assets/img/wutthiphong_signature.png'
import Sattarpoom_signature from '../assets/img/Sattarpoom_signature.png'
import Baramee_signature from '../assets/img/Baramee_signature.png'

function Login_user() {


    //reCaptcha
    const SITE_KEY = '6LckJokoAAAAAAt1_omKmKpnwih9h19dmrUNnhLu'
    const SITE_KEY_2 = '6LebtgYmAAAAADOb1pK-GGCL1PpR_bV-j9x5zqFJ'
    const [captchaDone, setCaptchaDone] = useState(null)
    const onChange = () => {
        console.log('Changed')
        setCaptchaDone(true)
    }

    const [reg_id, setReg_id] = useState("")
    const [id_card, setId_card] = useState("")
    const [dp_idcard, setDp_idcard] = useState("")
    const [login_successful, setLogin_successful] = useState("")
    const [login_failed, setLogin_failed] = useState("")
    const [authentication, setAuthentication] = useState(null)
    const [params, setParams] = useState()
    const [user_data, setUser_data] = useState([])
    const [change_style, setChange_style] = useState("modal")
    const navigate = useNavigate()


    //Payment
    const [img, setImg] = useState()
    const [upload_id, setUpload_id] = useState("")

    const toThaiDateString = (date) => {
        const change_date = new Date(date)
        let monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        let year = change_date.getFullYear() + 543
        let month = monthNames[change_date.getMonth()]
        let numOfDay = change_date.getDate();

        return `${numOfDay} ${month} ${year}`
    }

    const handle_img = (e) => {
        setImg(e.target.files[0])
    }

    const upload_img = () => {
        const formdata = new FormData()
        formdata.append("image", img)
        axios.put(`http://localhost:3000/payment/${upload_id}`, formdata)
            .then((res) => {
                if (res.data.status == 'true') {
                    alert("บันทึกข้อมูลเสร็จสิ้น")
                    window.location = '/login_user'
                } else {
                    return false
                }
            })
    }



    //Debug
    const [checkPayment, setCheckPayment] = useState(null)
    const [single_certi, setSingle_certi] = useState([])
    const today = new Date()
    const year_thai = today.getFullYear() + 543
    const year_en = today.getFullYear()
    const Export_certificate = async (reg_id) => {

        await axios.get('http://localhost:3000/get_single_certi/' + reg_id).then((res) => {
            setSingle_certi(res.data[0])
        })
    }

    const get_single_reg = async () => {


        // await doc.addImage(`http://localhost:3000/images/${single_certi.profile_img}`, 'JPEG', 41, 232, 25, 30)
        // await doc.addImage(`http://localhost:3000/${single_certi.profile_img}`, 'PNG', 41, 232, 25, 30)

        const img = new Image()
        img.src = await `http://localhost:3000/images/${single_certi.profile_img}`
        img.onload = () => {

            const doc = new jsPDF()
            const imgWidth = 35;
            const imgHeight = 35;
            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const x = (pageWidth - imgWidth) / 2;
            const y_position = (pageHeight - imgHeight) / 2
            const x_text = pageWidth / 2

            //Add Font th-sarabun
            doc.addFileToVFS("Font.ttf", font)
            doc.addFont("Font.ttf", "Font", "normal")

            doc.addFileToVFS("MyFont.ttf", fontBold)
            doc.addFont("MyFont.ttf", "MyFont", "normal")
            //Page1
            doc.addImage(logo_certi, 'png', x, 15, imgWidth, imgHeight)
            doc.setFont("MyFont")
            const fontSize1 = 20
            doc.setFontSize(fontSize1)
            doc.text('หนังสือรับรองว่าเป็นผู้ผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ', x_text, 58, { align: "center" })

            doc.setFont("Font")
            const fontSize2 = 18
            doc.setFontSize(fontSize2)
            doc.text('National Skill Standard Assessment Certificate', x_text, 65, { align: "center" })


            const x_1 = 82;
            let y_1 = 75;
            const text = [
                { content: 'เลขที่ ', fontSize: 16, Font: 'MyFont' },
                { content: `(No.) บท.สพ ${single_certi.book_id}/${year_thai} `, fontSize: 16, Font: 'Font' },
            ];
            // Initialize the current X position
            let currentX = x_1;
            for (const segment of text) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX, y_1);
                currentX += textWidth

            }


            doc.setFont("MyFont")
            const fontSize3 = 16
            doc.setFontSize(fontSize3)
            doc.text('หนังสือรับรองฉบับนี้ให้ไว้เพื่อแสดงว่า', x_text, 82, { align: "center" })

            doc.setFont("Font")
            const fontSize4 = 16
            doc.setFontSize(fontSize4)
            doc.text('This is to certify that', x_text, 87, { align: "center" })

            doc.setFont("MyFont")
            const fontSize5 = 20
            doc.setFontSize(fontSize5)
            doc.text(`${single_certi.prefix} ${single_certi.name} ${single_certi.lastname}`, x_text, 97, { align: "center" })

            doc.setFont("Font")
            const fontSize6 = 16
            doc.setFontSize(fontSize6)
            doc.text(`${single_certi.name_en} ${single_certi.lastname_en}`, x_text, 104, { align: "center" })

            doc.setFont("MyFont")
            const fontSize7 = 16
            doc.setFontSize(fontSize7)
            doc.text(`ได้ผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ`, x_text, 115, { align: "center" })

            doc.setFont("Font")
            const fontSize8 = 16
            doc.setFontSize(fontSize8)
            doc.text(`has passed the National Skill Standard Test`, x_text, 120, { align: "center" })

            doc.setFont("MyFont")
            const fontSize9 = 16
            doc.setFontSize(fontSize9)
            doc.text(`ตามพระราชบัญญัติส่งเสริมการพัฒนาฝีมือแรงงาน พ.ศ. 2545`, x_text, 128, { align: "center" })

            doc.setFont("Font")
            const fontSize10 = 16
            doc.setFontSize(fontSize10)
            doc.text(`according to the Skill Development Promotion Act, B.E. 2545`, x_text, 133, { align: "center" })

            doc.setFont("MyFont")
            const fontSize11 = 16
            doc.setFontSize(fontSize11)
            doc.text(`ในสาขาอาชีพ ${single_certi.branch} ${single_certi.course_name_th}`, 15, 140, { align: "left" })

            doc.setFont("Font")
            const fontSize12 = 16
            doc.setFontSize(fontSize12)
            doc.text(`On Electric, ${single_certi.course_name_en}`, 15, 146, { align: "left" })

            doc.setFont("MyFont")
            const fontSize13 = 16
            doc.setFontSize(fontSize13)
            doc.text(`จากศูนย์ทดสอบมาตรฐานฝีมือแรงงาน โดย คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ มทร.สุวรรณภูมิ ศูนย์สุพรรณบุรี`, 15, 153, { align: "left" })

            doc.setFont("Font")
            const fontSize14 = 16
            doc.setFontSize(fontSize14)
            doc.text(`from Department of Skill Development by Faculty of Business Administration and Information `, 15, 159, { align: "left" })

            doc.setFont("Font")
            doc.setFontSize(fontSize14)
            doc.text(`Technology, RMUTSB Skill Standard Testing Center `, 15, 165, { align: "left" })

            doc.setFont("MyFont")
            const fontSize15 = 16
            doc.setFontSize(fontSize15)
            doc.text([`ซึ่งได้รับอนุญาตจากอธิบดีกรมพัฒนาฝีมือแรงงาน กระทรวงแรงงาน ในฐานะนายทะเบียน`],
                15, 172, { align: "left" })

            doc.setFont("Font")
            const fontSize16 = 16
            doc.setFontSize(fontSize16)
            doc.text(`authorized by Director General of the Department of Skill Development, Ministry of labour, as a registrar`,
                15, 178, { align: "left" })

            doc.setFont("MyFont")
            const fontSize17 = 16
            doc.setFontSize(fontSize17)
            doc.text(`ตามใบอนุญาตเลขที่       สพ.๐๐๐๑.๑/๒๕๖๖   ลงวันที่   31 มกราคม พ.ศ. ${year_thai}`,
                15, 184, { align: "left" })

            doc.setFont("Font")
            const fontSize18 = 16
            doc.setFontSize(fontSize18)
            doc.text(`under license number  สพ.0001.1/2566      dated    31 January B.E. ${year_thai} (${year_en})`,
                15, 190, { align: "left" })

            doc.setFont("MyFont")
            const fontSize19 = 16
            doc.setFontSize(fontSize19)
            doc.text(`ให้ไว้ ณ วันที่   9 มีนาคม พ.ศ. 2566`,
                x_text, 198, { align: "center" })

            doc.setFont("Font")
            const fontSize20 = 16
            doc.setFontSize(fontSize20)
            doc.text(`given on   9 March B.E.2566 (${year_en})`,
                x_text, 204, { align: "center" })

            doc.addImage(taweesak_signature, 'png', 110, 215, 20, 15)

            doc.setFont("MyFont")
            const fontSize21 = 16
            doc.setFontSize(fontSize21)
            doc.text(`(นายทวีศักดิ์  คงตุก)`,
                120, 235, { align: "center" })

            doc.setFont("Font")
            const fontSize22 = 16
            doc.setFontSize(fontSize22)
            doc.text(`Thaweesak khongtuk`,
                120, 241, { align: "center" })

            doc.setFont("MyFont")
            const fontSize23 = 16
            doc.setFontSize(fontSize23)
            doc.text(`ผู้ดำเนินการทดสอบมาตรฐานฝีมือแรงงาน`,
                120, 247.5, { align: "center" })

            doc.setFont("Font")
            const fontSize24 = 16
            doc.setFontSize(fontSize24)
            doc.text(`Skill Standard Testing Provider`,
                120, 253, { align: "center" })

            doc.addImage(img, 'JPEG', 41, 232, 25, 30)
            doc.addImage(img, 'PNG', 41, 232, 25, 30)

            doc.setFont("Font")
            const fontSize25 = 16
            doc.setFontSize(fontSize25)
            doc.text(`...........................................`,
                53, 265, { align: "center" })

            doc.setFont("Font")
            const fontSize26 = 16
            doc.setFontSize(fontSize26)
            doc.text(`ผู้ผ่านการทดสอบมาตรฐานฝีมือแรงงาน`,
                53, 270, { align: "center" })

            doc.setFont("Font")
            const fontSize27 = 16
            doc.setFontSize(fontSize27)
            doc.text(`Examiner`,
                53, 275, { align: "center" })




            //Page2
            doc.addPage()
            doc.setFont("MyFont")
            const fontSize28 = 16
            doc.setFontSize(fontSize28)
            doc.text(`คะแนนการทดสอบ`, 50, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize29 = 16
            doc.setFontSize(fontSize29)
            doc.text(`(Total Score)`, 50, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize30 = 16
            doc.setFontSize(fontSize30)
            doc.text(`${single_certi.sum_score}%`, 50, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize31 = 16
            doc.setFontSize(fontSize31)
            doc.text(`.................................`, 50, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize32 = 16
            doc.setFontSize(fontSize32)
            doc.text('ภาคความรู้', x_text, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize33 = 16
            doc.setFontSize(fontSize33)
            doc.text('(Theoretical)', x_text, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize34 = 16
            doc.setFontSize(fontSize34)
            doc.text(`${single_certi.kn_score}%`, x_text, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize35 = 16
            doc.setFontSize(fontSize35)
            doc.text('.................................', x_text, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize36 = 16
            doc.setFontSize(fontSize36)
            doc.text('ภาคความสามารถ', 155, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize37 = 16
            doc.setFontSize(fontSize37)
            doc.text('(Practical)', 155, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize38 = 16
            doc.setFontSize(fontSize38)
            doc.text(`${single_certi.profi_score}%`, 155, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize39 = 16
            doc.setFontSize(fontSize39)
            doc.text('.................................', 155, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize40 = 16
            doc.setFontSize(fontSize40)
            doc.text(`ชื่อผู้ทดสอบมาตรฐานฝีมือแรงงาน`, 50, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize41 = 16
            doc.setFontSize(fontSize41)
            doc.text(`(Examiner)`, 50, 67, { align: "center" })



            //เลขที่ขึ้นทะเบียน
            doc.setFont("MyFont")
            const fontSize42 = 16
            doc.setFontSize(fontSize42)
            doc.text(`เลขที่ขึ้นทะเบียน`, 131, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize43 = 16
            doc.setFontSize(fontSize43)
            doc.text(`(Examiner No.)`, 131, 67, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0012-59`, 132, 80, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`, 131, 80.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0013-59`, 132, 95, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`, 131, 95.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0014-59`, 132, 110, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`, 131, 110.8, { align: "center" })


            //ลง Signature
            doc.setFont("MyFont")
            const fontSize44 = 16
            doc.setFontSize(fontSize44)
            doc.text(`ลงชื่อ`, 175, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize45 = 16
            doc.setFontSize(fontSize45)
            doc.text(`(Signature)`, 175, 67, { align: "center" })

            doc.addImage(wutthiphong_signature, 170, 72, 10, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`, 175, 80.8, { align: "center" })

            doc.addImage(Sattarpoom_signature, 170, 87, 10, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`, 175, 95.8, { align: "center" })

            doc.addImage(Baramee_signature, 166, 102, 20, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`, 175, 110.8, { align: "center" })


            const x_2 = 25;
            let y_2 = 80;
            const text_1 = [
                { content: '1.      ', fontSize: 16, Font: 'Font' },
                { content: `นายวุฒิพงษ์  เขื่อนดิน`, fontSize: 16, Font: 'Font' },

            ];
            // Initialize the current X position
            let currentX_2 = x_2;
            for (const segment of text_1) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_2, y_2,);
                currentX_2 += textWidth
            }

            doc.setFont("Font")
            const fontSize46 = 16
            doc.setFontSize(fontSize46)
            doc.text(`..........................................................................`, 64, 80.8, { align: "center" })


            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`Mr. Wutthiphong Khuandin`, 58, 88, { align: "center" })

            doc.setFont("Font")
            const fontSize47 = 16
            doc.setFontSize(fontSize47)
            doc.text(`..........................................................................`, 64, 88.8, { align: "center" })

            const x_3 = 25;
            let y_3 = 95;
            const text_2 = [
                { content: '2.      ', fontSize: 16, Font: 'Font' },
                { content: `นายสัตถาภูมิ  ไทยพานิช`, fontSize: 16, Font: 'Font' },

            ];
            // Initialize the current X position
            let currentX_3 = x_3;
            for (const segment of text_2) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_3, y_3,);
                currentX_3 += textWidth
            }

            doc.setFont("Font")
            const fontSize48 = 16
            doc.setFontSize(fontSize48)
            doc.text(`..........................................................................`, 64, 95.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`Mr.Sattarpoom Thaiparnit`, 57, 103, { align: "center" })

            doc.setFont("Font")
            const fontSize49 = 16
            doc.setFontSize(fontSize49)
            doc.text(`..........................................................................`, 64, 103.8, { align: "center" })

            const x_4 = 25;
            let y_4 = 110;
            const text_3 = [
                { content: '3.      ', fontSize: 16, Font: 'Font' },
                { content: `นายบารมี  โอสธีรกุล`, fontSize: 16, Font: 'Font' },

            ];
            // Initialize the current X position
            let currentX_4 = x_4;
            for (const segment of text_3) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_4, y_4,);
                currentX_4 += textWidth
            }

            doc.setFont("Font")
            const fontSize50 = 16
            doc.setFontSize(fontSize50)
            doc.text(`..........................................................................`, 64, 110.8, { align: "center" })

            doc.setFont("Font")
            const fontSize51 = 16
            doc.setFontSize(fontSize51)
            doc.text(`Mr.Baramee  Osateerakul`, 57, 118, { align: "center" })

            doc.setFont("Font")
            const fontSize52 = 16
            doc.setFontSize(fontSize52)
            doc.text(`..........................................................................`, 64, 118.8, { align: "center" })

            doc.save("ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ.pdf")
        }


    }

    const handle_Export = async (val_reg_id) => {
        await Export_certificate(val_reg_id)
        await get_single_reg()
    }

    const [show_modal, setShow_modal] = useState(false)
    //Task for a function----------------------------------------------------------------------------------------
    const submit_login = () => {

        axios.post("http://localhost:3000/login_user", {
            reg_id: reg_id,
            id_card: id_card
        }).then((res) => {
            //If there are not id_card, Let's show error according to message below
            if (res.data.status == "false") {
                setShow_modal(false)
                alert("กรุณาใส่ รหัสประจำตัวการสอบ หรือ เลขบัตรประจำตัวประชาชน")
            } else {
                // setChange_style("modal")

                const id_card = res.data.id_card
                const hide_id_card = id_card.substr(10)
                setDp_idcard(hide_id_card)
                setLogin_successful(res.data.message)
                setAuthentication(true)
                setUser_data(res.data.result)
                setUpload_id(res.data.result[0].reg_id)
                setShow_modal(true)
            }
        })

    }

    const reload_page = () => {
        location.reload()
    }

    const direct_pay = (reg_id) => {
        window.location = `/payment/${reg_id}`
    }

    console.log(user_data)

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-tab">
                            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true" style={{ fontWeight: "bolder", fontSize: "16px" }}>ตรวจสอบสถานะ</a>
                                    </li>

                                </ul>
                                <div>

                                </div>
                            </div>
                            <div className="container-fluid page-body-wrapper full-page-wrapper">
                                <div className="content-wrapper d-flex auth px-0">
                                    <div className="row w-100 mx-0">
                                        <div className="col-lg-10 mx-auto">
                                            {show_modal
                                                ? <>
                                                    {authentication
                                                        ? <>
                                                            <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4 card card-body">
                                                                <h3 style={{ fontWeight: 'bolder', textAlign: "center" }}>ข้อมูลผู้สมัครสอบ</h3>
                                                                <hr />
                                                                {user_data.map((val) => {
                                                                    return (
                                                                        <>
                                                                            <div key={val.reg_id} className='mt-3'>
                                                                                <div className="mb-3" >
                                                                                    <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                                        <div className="col-4" style={{ display: 'flex' }}>
                                                                                        </div>
                                                                                        <div className="col-8" style={{ display: 'flex', justifyContent: 'end' }}>
                                                                                            <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                                <h5 style={{ fontWeight: 'bold', marginRight: "10px", }} >รูปประจำตัว</h5>

                                                                                                <img
                                                                                                    src={`http://localhost:3000/images/${val.profile_img}`}
                                                                                                    className="img-thumbnail"
                                                                                                    alt=""
                                                                                                    width={100}
                                                                                                    height={100}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="mb-3" style={{ display: 'flex' }}>
                                                                                    <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>หลักสูตร(ฝึกอบรม):</h5>
                                                                                    <span className='fs-6'>{val.course_name_th}</span>
                                                                                </div>
                                                                                <div className="mb-3" >
                                                                                    <div className="row">
                                                                                        <div className='col-3'>
                                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>ชื่อ-นามสกุล:</h5>
                                                                                            <span className='fs-6'>{val.name} {val.lastname}</span>
                                                                                        </div>
                                                                                        <div className="col-9">

                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                                {/* <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน:</h5>
                                                                            <span className='fs-6'>{val.address}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>จังหวัด:</h5>
                                                                            <span className='fs-6'>{val.province_name}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>อำเภอ:</h5>
                                                                            <span className='fs-6'>{val.amphure_name}</span>
                                                                        </div>
                                                                        <div className="mb-2" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>ตำบล:</h5>
                                                                            <span className='fs-6'>{val.district_name}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>สัญชาติ:</h5>
                                                                            <span className='fs-6'>{val.nationality}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>วัน เดือน ปี เกิด:</h5>
                                                                            <span className='fs-6'>{toThaiDateString(val.Thaibirthday)}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>เบอร์โทรศัพท์:</h5>
                                                                            <span className='fs-6'>{val.tel}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>อีเมลล์:</h4>
                                                                            <span className='fs-6'>{val.email}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>เพศ:</h5>
                                                                            <span className='fs-6'>{val.gender}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>วุฒิการศึกษาสูงสุด:</h5>
                                                                            <span className='fs-6'>{val.educational}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>สาขา:</h5>
                                                                            <span className='fs-6'>{val.branch}</span>
                                                                        </div>
                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>Line id:</h5>
                                                                            <span className='fs-6'>{val.line_id}</span>
                                                                        </div> */}
                                                                                <div className="mb-3" style={{ display: 'flex' }}>
                                                                                    <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>สิทธิ์การเข้าถึง:</h5>
                                                                                    <span className='fs-6'>
                                                                                        {val.receipt != ''
                                                                                            ? 'กำลังรอตรวจสอบใบเสร็จ'
                                                                                            : 'ผู้สมัคร (รอดำเนินการ)'
                                                                                        }</span>
                                                                                </div>


                                                                                {/* Checkdebug payment */}
                                                                                {val.permission == "รอชำระเงิน"
                                                                                    ? (
                                                                                        <div className="mb-3" style={{ display: 'flex' }}>
                                                                                            <h5 style={{ fontWeight: 'bold', marginRight: "10px", color: "red" }}>การยืนยันชำระเงิน:</h5>
                                                                                            <div className='d-flex flex-column mb-3'>
                                                                                                <span className='fs-6' style={{ marginBottom: "10px", color: "red" }}>กรุณาชำระเงิน</span>
                                                                                                <img style={{ marginBottom: "10px", color: "red" }} src="https://cdn-icons-png.flaticon.com/512/105/105614.png" class="img-fluid" alt="" width={60} height={40} />
                                                                                                <Link to={{ pathname: `/payment/${val.reg_id}` }}>
                                                                                                    <button type="button" className="btn btn-warning py-2 px-4"> ชำระเงิน</button>
                                                                                                </Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <div className="mb-3" style={{ display: 'flex' }}>
                                                                                                <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>การยืนยันชำระเงิน:</h5>
                                                                                                <span className='fs-6' style={{ color: "green" }} >ชำระเงินเรียบร้อยแล้ว</span>
                                                                                            </div>
                                                                                            {/* <input type="file" onChange={handle_img} className="form-control py-2" id="customFile" />
                                                                                <button type="button" onClick={upload_img} className="btn btn-warning px-5 mt-3">อัพเดตการชำระเงิน</button> */}
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            {val.permission == 'รอชำระเงิน'
                                                                                ? null
                                                                                : <>
                                                                                    <hr />

                                                                                    <h3 style={{ fontWeight: 'bolder', textAlign: "center" }} className='mt-3 mb-5'>สถานะการสอบ</h3>

                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>คะแนนภาคความรู้:</h5>
                                                                                        <span className='fs-6'>{val.kn_score}</span>
                                                                                    </div>
                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>คะแนนภาคความสามารถ:</h5>
                                                                                        <span className='fs-6'>{val.profi_score}</span>
                                                                                    </div>
                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>คะแนนรวม:</h5>
                                                                                        <span className='fs-6'>{val.sum_score}</span>
                                                                                    </div>
                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>ผลการทดสอบ:</h5>
                                                                                        <span className='fs-6'>
                                                                                            {val.pass_fail == ''
                                                                                                ? <h4 style={{ color: 'red', textDecoration: 'underline' }} >ไม่ผ่าน</h4>
                                                                                                : <h4 style={{ color: 'green', textDecoration: 'underline' }} >ผ่าน</h4>
                                                                                            }
                                                                                        </span>
                                                                                    </div>


                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>เกณฑ์การทดสอบกรมพัฒนาฝีมือแรงงาน 70%:</h5>
                                                                                        <span className='fs-6'>
                                                                                            {val.sum_score < 70
                                                                                                ? <div>
                                                                                                    <h4><span style={{ color: 'red', textDecoration: 'underline' }} >ไม่ผ่าน</span> (ไม่สามารถออกเกียรติบัตรได้)</h4>

                                                                                                </div>
                                                                                                : <h4 style={{ color: 'green', textDecoration: 'underline' }} >ผ่าน</h4>
                                                                                            }
                                                                                        </span>
                                                                                    </div>



                                                                                    <div className="mb-3" style={{ display: 'flex' }}>
                                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>เกียรติบัตร:</h5>
                                                                                        <span className='fs-6'>
                                                                                            {val.book_id == ''
                                                                                                ? <div>
                                                                                                    <button className='btn btn-info px-3' disabled>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                                                                                                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                                                                                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                </div>
                                                                                                :
                                                                                                <>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-primary"
                                                                                                        // data-bs-toggle="modal"
                                                                                                        // data-bs-target="#exampleModal"
                                                                                                        onClick={() => handle_Export(val.reg_id)}
                                                                                                    >
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                                                                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                                                                                        </svg>
                                                                                                    </button>
                                                                                                    {/* Modal */}
                                                                                                    <div
                                                                                                        className="modal fade"
                                                                                                        id="exampleModal"
                                                                                                        tabIndex={-1}
                                                                                                        aria-labelledby="exampleModalLabel"
                                                                                                        aria-hidden="true"
                                                                                                    >
                                                                                                        <div className="modal-dialog">
                                                                                                            <div className="modal-content">
                                                                                                                <div className="modal-header">
                                                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">

                                                                                                                    </h1>
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="btn-close"
                                                                                                                        data-bs-dismiss="modal"
                                                                                                                        aria-label="Close"
                                                                                                                    />
                                                                                                                </div>
                                                                                                                <div className="modal-body">
                                                                                                                    <h5>ต้องการออกรายงานเกียรติบัตรใช่หรือไม่</h5>
                                                                                                                </div>
                                                                                                                <div className="modal-footer">
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="btn btn-secondary"
                                                                                                                        data-bs-dismiss="modal"
                                                                                                                    >
                                                                                                                        ยกเลิก
                                                                                                                    </button>
                                                                                                                    <button type="button" onClick={get_single_reg} className="btn btn-primary" data-bs-dismiss="modal">
                                                                                                                        ยืนยัน
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </>
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </>
                                                                            }

                                                                        </>



                                                                    )
                                                                })}


                                                            </div>
                                                        </>
                                                        : //if it occurred Let's show the component below
                                                        <>

                                                        </>
                                                    }
                                                </>
                                                : <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4 card card-body">
                                                    <div className="brand-logo"></div>
                                                    <h4 style={{ fontWeight: 'bolder' }}>ตรวจสอบสถานะการสมัคร</h4>
                                                    <form className="pt-3 mt-3" >
                                                        <div className="form-group">
                                                            <div>
                                                                <h4>เลขประจำตัวการสอบ</h4>
                                                                <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="เลขประจำตัวการสอบ"
                                                                    onChange={(e) => setReg_id(e.target.value.toUpperCase())} />
                                                            </div>
                                                            <div className='mt-3'>
                                                                <h4>เลขบัตรประจำตัวประชาชน</h4>
                                                                <input type="password" className=" form-control form-control-lg" id="exampleInputEmail1" placeholder="เลขบัตรประจำตัวประชาชน"
                                                                    onChange={(e) => setId_card(e.target.value)} />

                                                            </div>
                                                        </div>



                                                        {/* recaptcha */}
                                                        <div class="mb-5 mt-5" style={{ display: 'flex', justifyContent: "center" }}>
                                                            < ReCAPTCHA
                                                                sitekey={SITE_KEY}
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                        {captchaDone
                                                            ? (<>
                                                                {/* Submitform */}
                                                                <button onClick={submit_login} type="button" className="btn btn-warning py-3" >
                                                                    ตรวจสอบสถานะ
                                                                </button>
                                                            </>
                                                            )
                                                            : null}
                                                    </form>
                                                </div>

                                            }

                                            <hr />

                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* content-wrapper ends */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login_user