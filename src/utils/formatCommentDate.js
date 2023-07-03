export const formatCommentDate = (commentData) => {
    if (commentData.updateAt.length > 0) {
        const date = new Date(commentData.updateAt);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Europe/Istanbul',
        };
        const formattedDate = date.toLocaleString('tr-TR', options);
        return `${formattedDate} (güncellendi)`;
    } else {
        const date = new Date(commentData.addedAt);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Europe/Istanbul',
        };
        const formattedDate = date.toLocaleString('tr-TR', options);
        return formattedDate;
    }
};