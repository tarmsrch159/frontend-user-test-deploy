import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function User_information() {

    const {id} = useParams()

    const [data_mockup, setData_mockup] = useState([])
    useEffect(() =>{
        axios.get(`https://cloud-server-2.vercel.app/user_information/${id}`).then(res => {
        setData_mockup(res.data)
        
        })
    },[])
    return (
        <div>asd</div>
    )
}

export default User_information