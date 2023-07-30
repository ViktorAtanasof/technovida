import { useState } from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';
import { FetchCategories } from '../../services/FetchCategories';

function SideNav({
    isOpen,
    onCloseSidenav
}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = FetchCategories();

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
    };

    const handleSubCategoryClick = () => {
        setSelectedCategory(null);
        onCloseSidenav();
    }

    return (
        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
            <div className="sidenavHeader">
                <h2>Choose a category</h2>
            </div>
            {isOpen && (
                <div className='category-menu'>
                    <ul>
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                onClick={() => handleCategorySelection(category)}
                                className={selectedCategory === category ? 'active' : ''}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedCategory && (
                <div className='subcategory-menu'>
                    <h3>Subcategories for <span>{selectedCategory.name}</span>:</h3>
                    <ul>
                        {selectedCategory.subcategories?.map((subcategory, index) => (
                            <Link key={index} to={`/${selectedCategory.name.toLowerCase()}/${subcategory.toLowerCase()}`}>
                                <li onClick={handleSubCategoryClick} >
                                    {subcategory}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SideNav;