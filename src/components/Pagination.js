import { useEffect, useState, memo } from 'react';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsArrowBarLeft, BsArrowBarRight } from "../assets/icons/icons"
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import "../css/pagination.css"


function Pagination({ page, setSearchParams }) {
    const { t } = useTranslation()
    const currentpage = Number(page)
    let [isActive, setIsActive] = useState({
        firstBoxRef: false,
        secondBoxRef: false,
        thirdBoxRef: false,
        fourthBoxRef: false,
        fifthBoxRef: false
    })
    const checkIsActive = (page) => {
        let firstBoxRef = document.getElementById("firstBox").innerText === page;
        let secondBoxRef = document.getElementById("secondBox").innerText === page;
        let thirdBoxRef = document.getElementById("thirdBox").innerText === page;
        let fourthBoxRef = document.getElementById("fourthBox").innerText === page;
        let fifthBoxRef = document.getElementById("fifthBox").innerText === page;
        setIsActive({
            firstBoxRef,
            secondBoxRef,
            thirdBoxRef,
            fourthBoxRef,
            fifthBoxRef
        })

    }
    useEffect(() => {
        checkIsActive(page)
    }, [page])
    // className={firstBoxRef.current.innerText && Number(firstBoxRef.current.innerText) === page ? "btn btn-danger":"btn btn-outline-danger"}
    return (
        <div id='pagination-container' className='container d-flex align-items-center justify-content-center my-5'>

            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => setSearchParams({ page: `${currentpage - 1}` })}>
                <Tooltip title={t("prev")}>
                    <BsFillArrowLeftCircleFill />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => setSearchParams({ page: 1 })}>
                <Tooltip title={t("firstPage")}>
                    <BsArrowBarLeft />
                </Tooltip>
            </button>

            <button id='firstBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage}` }) : setSearchParams({ page: 496 })} className={isActive.firstBoxRef ? "btn active mx-1" : "btn deactive mx-1"} >{currentpage > 496 ? 496 : currentpage}</button>
            <button id='secondBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 1}` }) : setSearchParams({ page: 497 })} className={isActive.secondBoxRef ? "btn active mx-1" : "btn deactive mx-1"}>{currentpage > 496 ? 497 : currentpage + 1}</button>
            <button id='thirdBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 2}` }) : setSearchParams({ page: 498 })} className={isActive.thirdBoxRef ? "btn active mx-1" : "btn deactive mx-1"}>{currentpage > 496 ? 498 : currentpage + 2}</button>
            <button id='fourthBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 3}` }) : setSearchParams({ page: 499 })} className={isActive.fourthBoxRef ? "btn active mx-1" : "btn deactive mx-1"}>{currentpage > 496 ? 499 : currentpage + 3}</button>
            <button id='fifthBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 4}` }) : setSearchParams({ page: 500 })} className={isActive.fifthBoxRef ? "btn active mx-1" : "btn deactive mx-1"}>{currentpage > 496 ? 500 : currentpage + 4}</button>

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => setSearchParams({ page: 500 })}>
                <Tooltip title={t("lastPage")}>
                    <BsArrowBarRight />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => setSearchParams({ page: `${currentpage + 1}` })}>
                <Tooltip title={t("next")}>
                    <BsFillArrowRightCircleFill />
                </Tooltip>
            </button>
        </div>
    )
}

export default memo(Pagination)


