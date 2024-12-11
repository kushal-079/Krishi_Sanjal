import React from 'react'
import './Hero1.css'
import { assets } from '../../../assets/assets'

const Hero1 = () => {
    return (
        <div className="Hero1">
            <div className="pero">
                <div className="zero">
                    <div className="hero">
                        <div className="htext1">Sell Your Produce Directly</div>
                        <div className="htext2">Boost Your Earnings Expand Your Reach And Gain Loyal Customers</div>
                        <div className="htext3">A Platform Built on Trust and Transparency
                        </div>
                        <div className="hbutton">
                            <button>Join Us</button>
                        </div>
                    </div>
                    <div className="hero-img">
                        <img src={assets.hero} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero1