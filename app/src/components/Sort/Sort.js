import { useEffect, useRef, useState } from 'react';
import '../Sort/Sort.css';

function Sort({
    onSortChange,
    subCategory
}) {
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const prevSubCategoryRef = useRef(subCategory);

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSortOption(selectedOption);
        onSortChange(selectedOption);
    };

    useEffect(() => {
        if (prevSubCategoryRef.current !== subCategory) {
            setSelectedSortOption(''); // Set to default option when the subcategory changes
        }
        prevSubCategoryRef.current = subCategory; // Update the previous subcategory ref
    }, [subCategory]);

    return (
        <div className='sort-container'>
            <label className="sort-label" htmlFor="sort-dropdown">
                Sort by:
            </label>
            <select
                className="sort-select"
                id="sort-dropdown"
                value={selectedSortOption}
                onChange={handleSortChange}
            >
                <option value="">Select an option</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="name-desc">Alphabetical (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        </div>
    );
};

export default Sort;