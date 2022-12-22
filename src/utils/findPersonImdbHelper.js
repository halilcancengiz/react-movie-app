import { toast } from 'react-hot-toast';
import { personImdbURL } from '../services/apiURLs';
import { getPersonInfo } from './../services/tmdb/tmdb';
export const findPersonImdbHelper = async (personId, language) => {
    try {
        const response = await getPersonInfo(personId, language);
        if (response.imdb_id === null) {
            toast.error(`${response.name} adlı oyuncunun IMDB adresine ulaşılamıyor.`)
        }
        else if (response && response.imdb_id) {
            const url = personImdbURL(response.imdb_id);
            window.open(url, "_blank");
        }
    } catch (error) {
        toast.error(`Oyuncunun IMDB adresine erişilemiyor.`);
    }
}