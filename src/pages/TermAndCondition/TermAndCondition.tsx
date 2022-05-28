import React, { useEffect, useState } from 'react'
import { ApiGet, ApiGetNoAuth } from '../../helper/API/ApiData';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux'


const TermAndCondition = () => {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const [termData, setTerData] = useState("");
    useEffect(() => {
        ApiGetNoAuth('term/get-noAuth-term-and-condition')
            .then((res: any) => {
                setTerData(res?.data?.details)
            })
    }, [])


    return (
        <div className={isDark ? "main-termandcondition-box dark-mode bg-remove" : "main-termandcondition-box"}>
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <div className='termandcondition-ctn'>
                <h2 className='termheadingctn'

                > Term And Condition
                </h2>
                <div
                    className='termandconditon-contetn-ctn'
                >
                    <div
                        className='termandcondition-ctn-box'
                    >
                        <h1 className='termheadingctn'>{ReactHtmlParser(termData)}</h1>
                    </div>
                    {/* <div className='termandcondition-btn'>
                        <button> Close </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default TermAndCondition
