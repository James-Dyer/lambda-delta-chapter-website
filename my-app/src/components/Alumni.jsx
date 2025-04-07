import React from 'react'
import alumni from "../Data/alumni.json"
const Alumni = ()=>{
    return(
        <div>
            <h1>Lambda Delta Alumni</h1>
            {alumni.map((alumni, id) =>(
                <div>   </div>

            ))}
        </div>
    )
}

export default Alumni