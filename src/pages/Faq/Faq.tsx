import React, { useState, useEffect } from 'react'
import { ApiGet } from '../../helper/API/ApiData';
import FaqAccordion from './FaqAccordion';
import Pagination from "react-js-pagination";
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux'


interface faq {
    answer: string;
    created_at: string;
    id: string;
    question: string;
    updated_at: string;
    is_active: boolean,
    srNo: number
}
interface faqList {
    count: number;
    faq: faq[];
}

const Faq = () => {
    const isDark = useSelector((state: any) => state.darkMode.is_dark)
    const [faqPageNo, setFaqPageNo] = useState<number>(1)
    const [faqData, setFaqData] = useState<faqList>({
        count: 10,
        faq: [{
            srNo: 0,
            answer: "",
            created_at: "",
            id: "",
            question: "",
            updated_at: "",
            is_active: false
        }]
    })



    useEffect(() => {
        async function fetchMyAPI() {
            await ApiGet(
                `faq/get-noAuth-faq?per_page=${10}&page_number=${faqPageNo}`
            ).then((res: any) => {
                res.data.faq = res.data.faq.map((e: any, i: number) => {
                    e.is_active = false;
                    e.srNo = (faqPageNo - 1) * 10 + (i + 1)
                    return e;
                })
                setFaqData(res.data);
            });
        }

        fetchMyAPI()

    }, [faqPageNo])

    const changeActive1 = (isActive: boolean, index: Number) => {
        let faqList: faq[] = faqData.faq.map((e: any, i: number) => {
            e.is_active = false;
            if (e.srNo == index) {
                e.is_active = isActive;
            }
            return e;
        })

        setFaqData(prevState => (
            {
                ...prevState,
                faq: faqList
            }
        ))
    }

    return (
        <div className={isDark ? "faq-bg-gray pm-FAQ-ctn dark-mode bg-remove" : "faq-bg-gray pm-FAQ-ctn"} >
            <div className='bg-round'>
                <img
                    src="./img/bg-round.png"
                    alt=""

                />
            </div>
            <Container>
                <div className="faq-title-ctn">
                    <h2 > FAQ </h2>
                    <p > Do You Have any Questions <span>?</span> </p>
                    <div className="faq-line" ></div>
                </div>
                <div className="small-container faq-container pm-small-ctn" >
                    {faqData?.faq?.map((items: faq, i: number) => {
                        return (
                            <div key={i}>
                                <div id="accordion">
                                    <FaqAccordion SrNo={items.srNo} title={items.question} isActive={items.is_active} children={items.answer}
                                        onClick={changeActive1} />
                                </div>
                            </div>
                        )
                    }
                    )}
                    <div className='page-header'>
                        <div className="b-pagination-outer">
                            <ul id="border-pagination">
                                <Pagination
                                    activePage={faqPageNo}
                                    itemsCountPerPage={10}
                                    totalItemsCount={faqData.count}
                                    pageRangeDisplayed={10}
                                    firstPageText={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                                    lastPageText={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                                    prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                                    nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                                    onChange={(e) => {
                                        setFaqPageNo(e);
                                    }}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Faq
