import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function User_information() {

    const {id} = useParams()

    const [data_mockup, setData_mockup] = useState([])
    useEffect(() =>{
        axios.get(`https://cloud-server-1.onrender.com/user_information/${id}`).then(res => {
        setData_mockup(res.data)
        
        })
    },[])
    console.log(data_mockup)
    return (
        <div>asd</div>
    )
}

export default User_information