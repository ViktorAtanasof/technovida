import { useState } from 'react';
import '../ProductFilter/ProductFilter.css';
import Button from '../Button/Button';

function ProductFilter({
    onFilterChange
}) {
    const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');

    const handleFilterChange = () => {
        // Call the onFilterChange function in the parent component with the selected filters
        onFilterChange(selectedPriceFilter, selectedBrandFilter);
    };

    return (
        <div className="filter-container">
            <h3 className="sort-label">Filter By:</h3>
            <div className="filters">
                <div className="price-filter">
                    <label>Price</label>
                    <select
                        className="sort-select"
                        value={selectedPriceFilter}
                        onChange={(e) => setSelectedPriceFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="under_100">$0 - $100</option>
                        <option value="100_to_500">$100 - $500</option>
                        <option value="500_and_above">$500 and above</option>
                    </select>
                </div>
                <div className="brand-filter">
                    <label>Brand</label>
                    <select
                        className="sort-select"
                        value={selectedBrandFilter}
                        onChange={(e) => setSelectedBrandFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="samsung">Samsung</option>
                        <option value="apple">Apple</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="huawei">Huawei</option>
                    </select>
                </div>
                <Button onClick={handleFilterChange} text={'Apply Filters'}  filterBtn={'filter-btn'}/>
            </div>
        </div>
    );
};

export default ProductFilter;