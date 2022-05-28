import React, { useEffect, useState } from 'react'
import { ApiGetNoAuth } from '../../helper/API/ApiData';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';


const PrivacyPolicy = () => {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const [termData, setTerData] = useState("");
    useEffect(() => {
        ApiGetNoAuth('policy/get-noAuth-privacy-policy')
            .then((res: any) => {
                setTerData(res?.data?.details)
            })
    }, [])


    return (
        <div className={isDark ? "main-privacypolicy-box dark-mode bg-remove" : "main-privacypolicy-box"}>
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <div className='privacy-policy-ctn'>
                <h2 className='privacyheadingctn'

                > Privacy Policy
                </h2>
                <div className='privacypolicy_content-ctn'>
                    <div className='privacy-policy-ctn-box' >
                        <h1>
                            {ReactHtmlParser(termData)}
                        </h1>
                    </div>
                    {/* <div className='privacypolicy-btn'>
                        <button> Close </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
