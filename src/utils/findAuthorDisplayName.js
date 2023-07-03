export const findAuthorDisplayName = (authorId, allAuthorsDisplayName) => {
    let displayName = null;
    if (allAuthorsDisplayName && allAuthorsDisplayName.length > 0) {
      const authorDisplayName = allAuthorsDisplayName.find(
        (displayName) => displayName.id === authorId
      );
      if (authorDisplayName) {
        displayName = authorDisplayName.displayName;
      }
    }
    return displayName || "Anonim";
  };