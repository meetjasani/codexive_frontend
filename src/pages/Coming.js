import React, { useEffect, useState } from 'react'



const Coming = () => {
    let curDate = new Date();
    curDate = curDate.getHours();
    let greeting = "";
    const cssStyle = {};
    const cssStyleTwo = {};
    const sunDispaly = {};
    const moonDispaly = {};


    if (curDate >= 5 && curDate < 12) {
        greeting = "Good Morning"
        cssStyle.background = "#4aa8e0"
        cssStyleTwo.color = "#444"
        sunDispaly.display = ""
        moonDispaly.display = "none"
       

    } else if (curDate >= 12 && curDate < 18) {
        greeting = "Good Afternoon"
        cssStyle.background = "#ffcc80"
        cssStyleTwo.color = "#444"
        sunDispaly.display = ""
        moonDispaly.display = "none"
      

    } else if (curDate >= 19 && curDate < 21) {
        greeting = "Good Evening"
        cssStyle.background = "#666666"
        cssStyleTwo.color = "#4aa8e0"
        sunDispaly.display = ""
        moonDispaly.display = "none"
    } 
    
    else {
        greeting = "Good night"
        cssStyle.background = "#333"
        cssStyleTwo.color = "#4aa8e0"
        sunDispaly.display = "none"
        moonDispaly.display = "block"
    
    }


    return (
        <div style={cssStyle} className='coming-soon-page'>
            <div className="cloud-content">
                <div className="cloud-1 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-2 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-3 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-4 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-5 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-6 cloud-block">
                    <div className="cloud"></div>
                </div>
                <div className="cloud-7 cloud-block">
                    <div className="cloud"></div>
                </div>
            </div>
         
                <div style={moonDispaly} className="sunlight-content">
                    <img src="./img/moon.png"/>
                </div>

                <div style={sunDispaly} className="sunlight-content">
                    <div className="sun">
                        <div className="sun-face">
                            <div className="eyes-block">
                                <span className="eyes left-eye"></span>
                                <span className="eyes right-eye"></span>
                            </div>
                            <div className="mouth">
                                <span className="tongue"></span>
                            </div>
                        </div>
                        <span className="box"></span>
                    </div>
                    <div className="sunlight-box">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
           
            <div className='hero-content-coming'>
                <p style={cssStyleTwo}>{greeting}</p>
                <p className='text-white'>We are Coming Soon</p>
                <h3 style={cssStyleTwo} className='custom-text-hero'>Digital <span> Technology,
                    IT Solutions & Services </span>
                    Around the World</h3>
            </div>
        </div>
    )
}

export default Coming