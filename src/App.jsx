
//Components
import Main from "./Pages/Main"
import Navbar from "./Components/Navbar"
import Settings from "./Components/Settings"
import Sidebar from "./components/Sidebar"
import Register from "./Pages/Register"
import Register_old from "./Pages/Register_old"
import Test from "./Components/Test"
import Payment_form from "./Pages/Payment_form"
import Login_user from "./Pages/Login_user"
import User_information from "./Pages/User_information"
import Demo_pdf from "./Pages/Demo_pdf"


//Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <div className="container-scroller">
      <Navbar />
        <div class="container-fluid page-body-wrapper">
        <Settings />
        <Sidebar />
        <Routes>
          <Route path='/' element={< Main/>}></Route>
          <Route path='/register/:course_name' element={< Register/>}></Route>
          <Route path='/register' element={< Register_old/>}></Route>
          <Route path='/payment/:id' element={< Payment_form/>}></Route>
          <Route path='/login_user' element={< Login_user/>} ></Route>
          <Route path='/user_information/:id' element={< User_information/>} ></Route>
          <Route path='/demo_pdf' element={< Demo_pdf/>} ></Route>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
