function StarRating({ averageRating }) {
    // Round the average rating to the nearest half star
    const roundedRating = Math.round(averageRating * 2) / 2;

    // Create an array of 5 stars with full, half, or empty icons
    const stars = Array.from({ length: 5 }).map((_, index) => {
        let starIcon;
        if (index + 0.5 === roundedRating) {
            // Half-filled star
            starIcon = <i key={index} className="fa-regular fa-star-half-stroke" />;
        } else if (index + 1 <= roundedRating) {
            // Filled star
            starIcon = <i key={index} className="fa-solid fa-star" />;
        } else {
            // Empty star
            starIcon = <i key={index} className="fa-regular fa-star" />;
        }
        return starIcon;
    });

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
