import React from 'react'
//import alumni from "../Data/alumni.json"
const Alumni = ()=>{
    return(
        <div className="alumni-container">
      <h1>Alumni Resources and Engagement</h1>
      <section>
        <h2>Alumni Spotlight</h2>
        <img src="https://plus.unsplash.com/premium_photo-1673967831980-1d377baaded2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Alumni spotlight"
            style={{ width: '10%', height: 'auto' }}
            />
        <p>Godoy, Class of 2015 - employment here. </p>
        <div>
            <h4>Quote</h4>
            <p>“Godoy Godoy Godoy”</p>
        </div>
        
      </section>

      <section>
        <h2>Upcoming Events</h2>
        <ul>
          <li>Toga - April 12th, 2025</li>
          <li>Another event - May 3rd, 2025</li>
        </ul>
      </section>

      <section>
        <h2>Stay Involved</h2>
        <p>add in automated email listing here <a href="/donate">Click here to support</a>.</p>
      </section>

      <section>
        <h2>Lambda Delta Alumni</h2>
        <p>list alumni here</p>
      </section>

    </div>
    )
}

export default Alumni