import { useState } from 'react';
import { BsSearch, HiOutlineXMark } from '../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../css/search-bar.css"

function SearchBar() {
    console.count("Search Bar")
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchQuery}`)
    }

    return (
        <div id='search-container' style={{ borderRadius: !isOpen ? "50%" : "5px", bottom: isOpen ? '50%' : '2rem', left: isOpen ? '50%' : '2rem', transform: isOpen ? 'translate(-50%, -50%)' : 'none' }}>
            {
                !isOpen &&
                <button className='search-bar-btn' id='openSearchModal' onClick={() => setIsOpen(true)}>
                    <BsSearch color='white' />
                </button>
            }
            {
                isOpen &&
                <form id='search-bar-form' onSubmit={handleSubmit} style={{ width: '250px' }}>
                    <button className='search-bar-btn' type="submit">
                        <BsSearch color='white' />
                    </button>
                    <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} id='search-bar-input' className='flex-fill' type="text" placeholder={t("searchMovie")} />
                    <button className='search-bar-btn' onClick={() => setIsOpen(false)}>
                        <HiOutlineXMark color='white' />
                    </button>
                </form>
            }
        </div>
    );
}

export default SearchBar;