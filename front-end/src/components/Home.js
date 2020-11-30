import React from 'react'
import Signup from './Signup'
import Login from './Login'

const Home = () => {


        return(
            <div className="text-center">
                <h2>welcome to fakeTwitter</h2>
                
                    <Signup />
                    <Login  />                
            </div>
        )
    }
export default Home