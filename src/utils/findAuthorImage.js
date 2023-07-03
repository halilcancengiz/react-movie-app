import defaultImage from "../assets/images/defaultManImage.png"

export const findAuthorImage = (authorId, allAuthorsImage) => {
    let image = null;
    if (allAuthorsImage && allAuthorsImage.length > 0) {
        const author = allAuthorsImage.find(author => author.id === authorId);
        if (author) {
            image = author.url;
        }
    }
    return image || defaultImage;
};