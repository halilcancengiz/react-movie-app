import { useTranslation } from 'react-i18next';
import React from 'react';
import "../css/footer.css"

function Footer() {
    const { t } = useTranslation()
    return (
        <footer className='container-fluid d-flex align-items-center justify-content-center p-5'>
            <div className="container m-0 p-0 g-0">
                <div className="row m-0 p-0 g-0">
                    <div className="col-12">
                        <div className='text-center d-flex align-items-center justify-content-center'>
                            <span className='text-white'>{t("apiSource")}</span>
                            <a style={{ width: "50px", height: "50px" }} className="tmdb-footer-logo p-2" rel='noreferrer' target="_blank" href="https://www.themoviedb.org/">
                                <img className='w-100 h-100' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb-logo" />
                            </a>
                        </div>
                        <div className='d-flex flex-column text-center'>
                            <span className='text-white'>Copyright &copy; {t("allRightsReserved")} </span>
                            <span className='text-white'>{t("thisApplication")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer