import { useState } from 'react';
import { BsSearch, HiOutlineXMark } from '../assets/icons/icons';
import "../css/search-bar.css"
import { useNavigate } from 'react-router-dom';

function SearchBar() {
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
                    <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} id='search-bar-input' className='flex-fill' type="text" placeholder="Film Ara..." />
                    <button className='search-bar-btn' onClick={() => setIsOpen(false)}>
                        <HiOutlineXMark color='white' />
                    </button>
                </form>
            }
        </div>
    );
}

export default SearchBar;