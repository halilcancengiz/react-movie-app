import { memo } from 'react';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsArrowBarLeft, BsArrowBarRight } from "../assets/icons/icons"
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import "../css/pagination.css"


function Pagination({ page, setSearchParams }) {
    const { t } = useTranslation()
    const currentpage = Number(page)

    const handlePageChange = (newPage) => {
        if (newPage < 1) {
            newPage = 1;
        } else if (newPage > 500) {
            newPage = 500;
        }
        setSearchParams({ page: newPage.toString() });
    }

    return (
        <div id='pagination-container' className='container d-flex align-items-center justify-content-center my-5'>
            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => handlePageChange(currentpage - 1)}>
                <Tooltip title={t("prev")}>
                    <BsFillArrowLeftCircleFill />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => handlePageChange(1)}>
                <Tooltip title={t("firstPage")}>
                    <BsArrowBarLeft />
                </Tooltip>
            </button>

            {[0, 1, 2, 3, 4].map((index) => {
                const pageNumber = currentpage + index;
                if (pageNumber > 500) {
                    return null; // Sayfa numarası 500'ü aşarsa düğme oluşturma
                }
                return (
                    <button
                        key={index}
                        onClick={() => handlePageChange(pageNumber)}
                        className={pageNumber === currentpage ? "btn activebtn mx-1" : "btn deactive mx-1"}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => handlePageChange(500)}>
                <Tooltip title={t("lastPage")}>
                    <BsArrowBarRight />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => handlePageChange(currentpage + 1)}>
                <Tooltip title={t("next")}>
                    <BsFillArrowRightCircleFill />
                </Tooltip>
            </button>
        </div>
    )
}

export default memo(Pagination)
