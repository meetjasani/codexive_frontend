import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'



interface props {
    SrNo: Number,
    title: string,
    children: string,
    isActive: boolean,
    onClick: (isActive: boolean, index: Number) => void,
}
const FaqAccordion: React.FC<props> = (props) => {

    const [active, setActive] = useState(false);
    const iconRef: any = useRef();
    const toggleFaq = (e: any, srNo: any) => {
        setActive(!active)
        // let currentDom = document.getElementById('collapse' + srNo)?.classList.toggle("show");
        let currentDom = document.getElementById('collapse' + srNo);
        document.querySelectorAll('.collapse').forEach((e) => {
            if (!e.isEqualNode(currentDom)) {
                e.classList.remove('show');
            }
        })
        currentDom?.classList.toggle("show");
    }

    return (
        <>
            <div className="pmaccordion-wrapper" >
                <div className="card" >
                    <div className="card-header" id="headingOne" >
                        <h5 className="mb-0 pm-accodian-title">
                            <p className={` ${props.isActive ? 'accordion-srno' : ''}`} >{props.SrNo}</p>
                            <span >
                                {props.title}
                            </span>
                            <button className="btn btn-link pm-btn-link" data-toggle="collapse" data-target={`#collapse${props.SrNo}`} aria-expanded="true" aria-controls={`collapse${props.SrNo}`}
                                // onClick={(e) => toggleFaq(e, props.SrNo)} >
                                onClick={(e) => props.onClick(!props.isActive, props.SrNo)} >
                                <FontAwesomeIcon forwardedRef={iconRef} id={`icon-${props.SrNo}`} className='plus-icon' icon={props.isActive ? faMinus : faPlus} />
                            </button>
                        </h5>
                    </div>

                    <div id={`collapse${props.SrNo}`} className={`collapse ${props.isActive ? 'show' : ''}`} aria-labelledby="headingOne" data-parent={`#accordion${props.SrNo}`}>
                        <div className="card-body">
                            <p> {props.children}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="accordion-wrapper">

                    <div className="head-faq-accordian-srno pm-faq-accordian-srno">
                        <span className="pm-faq-bg">{props.SrNo}</span>
                    </div>
                    <div className="head-faq-accordian-title pm-head-faqacordian">
                        <h2 className='faq-content-ctn'>{props.title}</h2>
                    </div>
                </div>
                <div className="accordion-content pm-faqaccordian-ctn">
                    <p className='pm-faqcontent-box'>{props.children}</p>
                </div> */}
            </div>
        </>

    );
};

export default FaqAccordion