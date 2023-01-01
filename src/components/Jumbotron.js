import { useState } from "react"
import "../css/jumbotron.css"
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

function Jumbotron() {
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.loading("Veriler Getiriliyor", {
            duration: 1000
        })
        setInputValue("")
    }
    return (
        <>
            <section className='jumbotron container mb-5 d-flex align-items-center justify-content-center flex-column'>
                <h3 className="text-white">Film Arama Siteme Hoş Geldiniz</h3>
                <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-between border-0 overflow-hidden w-75  rounded-pill text-dark bg-white">
                    <input onChange={(e) => setInputValue(e.target.value)}
                        name="search"
                        value={inputValue}
                        className="border-0 w-100 h-100 px-4"
                        id="search"
                        type="text"
                        placeholder="Film, Dizi, Oyuncu Ara..." />
                    <NavLink
                        className=" h-100 "
                        to={`/search/${inputValue.split(" ").join("-")}`}>
                        <button type="submit" disabled={inputValue.length <= 0} className="submit-search-button">Ara</button>
                    </NavLink>
                </form>
            </section>
        </>
    )
}
export default Jumbotron