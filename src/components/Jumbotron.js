import { useState } from "react"
import "../css/jumbotron.css"
import { toast } from 'react-hot-toast';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcGenericSortingAsc, FcGenericSortingDesc } from "../assets/icons/icons"
import { setSearch } from "../features/searchQuerry";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';



export default function Jumbotron() {
    const searchValue = useSelector((state) => state.searchReducer.value)
    const dispath = useDispatch()
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispath(setSearch(inputValue))
        toast.loading("Veriler Getiriliyor", { 
            duration: 1000
        })
        setInputValue("")
    }
    return (
        <>
            <section className='jumbotron container mb-5 bg-dark d-flex align-items-center justify-content-center flex-column'>
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
                        to={`/${inputValue.split(" ").join("-")}`}>
                        <button type="submit" disabled={inputValue.length <= 0} className="submit-search-button">Ara</button>
                    </NavLink>
                </form>

            </section>
            <div className={searchValue.length > 0 ? "container d-flex align-items-center justify-content-around rounded-pill flex-row my-3 bg-transparent shadow-lg py-2" : "d-none"}>
                <FcAlphabeticalSortingAz style={{ cursor: "pointer" }} onClick={() => console.log("A-Z")} size={30} />
                <FcAlphabeticalSortingZa style={{ cursor: "pointer" }} onClick={() => console.log("Z-A")} size={30} />
                <FcGenericSortingAsc style={{ cursor: "pointer" }} onClick={() => console.log("düşük rating başta")} size={30} />
                <FcGenericSortingDesc style={{ cursor: "pointer" }} onClick={() => console.log("yüksek rating başta")} size={30} />
            </div>
            {/* <div className="container mx-auto">
                <MovieList searchValue={searchValue} movieYear={movieYear} />
            </div> */}
        </>
    )
}
