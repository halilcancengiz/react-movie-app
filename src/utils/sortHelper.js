export const alphabetically = (ascending) => {
    return function (a, b) {
        // equal items sort equally
        if (a.profile_path === b.profile_path) {
            return 0;
        }

        // nulls sort after anything else
        if (a.profile_path === null) {
            return 1;
        }
        if (b.profile_path === null) {
            return -1;
        }

        // otherwise, if we're ascending, lowest sorts first
        if (ascending) {
            return a < b ? -1 : 1;
        }

        // if descending, highest sorts first
        return a < b ? 1 : -1;
    };
}

export const voteAverageSortHelper = (a, b) => {
    return a.vote_average - b.vote_average
}