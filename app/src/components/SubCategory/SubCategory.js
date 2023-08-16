import { useNavigate, useParams } from 'react-router-dom';
import '../SubCategory/SubCategory.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { db } from '../../firebase';
import ProductCard from '../ProductCard/ProductCard';
import Sort from '../Sort/Sort';
import ProductFilter from '../ProductFilter/ProductFilter';
import { sortProducts } from '../../utils/sortProducts';
import Spinner from '../Spinner/Spinner';
import Button from '../Button/Button';

function SubCategory() {
    const navigate = useNavigate();
    const { category, subCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedSubCategoryDesc, setSelectedSubCategoryDesc] = useState('');
    const [lastFetchedProduct, setLastFetchedProduct] = useState(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [totalTabletsCount, setTotalTabletsCount] = useState(0);
    const [totalPhonesCount, setTotalPhonesCount] = useState(0);
    const [currentlyDisplayedTabletsCount, setCurrentlyDisplayedTabletsCount] = useState(0);
    const [currentlyDisplayedPhonesCount, setCurrentlyDisplayedPhonesCount] = useState(0);
    const [filterOptions, setFilterOptions] = useState({
        priceFilter: '',
        brandFilter: '',
    });
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const capitalizedCategory = subCategory[0].toUpperCase() + subCategory.slice(1);

    const fetchProducts = async (category, subCategory, sortOption, filterOptions) => {
        try {
            const productsRef = collection(db, category);
            let q = query(
                productsRef,
                where('type', '==', subCategory),
                limit(12),
            );
            // Apply both price and brand filters if selected
            const { priceFilter, brandFilter } = filterOptions;
            if (priceFilter === 'under_100') {
                q = query(q, where('price', '<=', 100));
            } else if (priceFilter === '100_to_500') {
                q = query(q, where('price', '>=', 100), where('price', '<=', 500));
            } else if (priceFilter === '500_and_above') {
                q = query(q, where('price', '>=', 500));
            }

            if (brandFilter) {
                q = query(q, where('brand', '==', brandFilter));
            }
            const querySnap = await getDocs(q);
            setHasMoreProducts(querySnap.size >= 12);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedProduct(lastVisible);
            const products = querySnap.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            // Handle sorting based on the selected sortOption
            const sortedProducts = sortProducts(products, sortOption);

            setProducts(sortedProducts);
            setCurrentlyDisplayedTabletsCount(products.filter((product) => product.data.category === 'tablets').length);
            setCurrentlyDisplayedPhonesCount(products.filter((product) => product.data.category === 'phones').length);

            if (category === 'tablets') {
                // Get the total number of products in the "tablets" collection
                const tabletsRef = collection(db, 'tablets');
                const tabletsQuerySnap = await getDocs(tabletsRef);
                setTotalTabletsCount(tabletsQuerySnap.size);
            } else if (category === 'phones') {
                // Get the total number of products in the "phones" collection
                const phonesRef = collection(db, 'phones');
                const phonesQuerySnap = await getDocs(phonesRef);
                setTotalPhonesCount(phonesQuerySnap.size);
            }

            // Fetch the description for the selected subcategory and non-existent subcategories
            const subCategoryRef = collection(db, 'subcategories');
            const subCategoryQuery = query(subCategoryRef, where('name', '==', subCategory));
            const subCategorySnapshot = await getDocs(subCategoryQuery);
            subCategorySnapshot.forEach((doc) => {
                setSelectedSubCategoryDesc(doc.data().description);
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (category !== 'phones' && category !== 'tablets') {
            // Redirect to "not found" page for invalid categories
            navigate('/not-found');
            return;
        };

        fetchProducts(category, subCategory, sortOption, filterOptions);
    }, [category, subCategory, sortOption, filterOptions, navigate]);

    useEffect(() => {
        setSortOption('');
    }, [subCategory]);

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);
    };

    const handleFilterChange = (priceFilter, brandFilter) => {
        // Update the state variables for price and brand filters
        setFilterOptions({ priceFilter, brandFilter });
    };

    const onFetchMoreProducts = async () => {
        try {
            const productsRef = collection(db, category);
            const q = query(
                productsRef,
                where('type', '==', subCategory),
                startAfter(lastFetchedProduct),
                limit(12),
            );
            const querySnap = await getDocs(q);
            setHasMoreProducts(querySnap.size >= 12);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedProduct(lastVisible);
            const products = querySnap.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            // Combine existing and new products
            setProducts((prevState) => [...prevState, ...products]);

            // Sort the combined products based on the selected sortOption
            setProducts((prevProducts) => sortProducts(prevProducts, sortOption));

            const newTabletsCount = products.filter((product) => product.data.type === 'tablets').length;
            const newPhonesCount = products.filter((product) => product.data.type === 'phones').length;
            setCurrentlyDisplayedTabletsCount((prevCount) => prevCount + newTabletsCount);
            setCurrentlyDisplayedPhonesCount((prevCount) => prevCount + newPhonesCount);

            const subCategoryRef = collection(db, 'subcategories');
            const subCategoryQuery = query(subCategoryRef, where('name', '==', subCategory));
            const subCategorySnapshot = await getDocs(subCategoryQuery);
            subCategorySnapshot.forEach((doc) => {
                setSelectedSubCategoryDesc(doc.data().description);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <main className='main-content'>
                {loading
                    ? <Spinner />
                    : (
                        <>

                            <section className='category-section'>
                                <h2 className="category-title">{capitalizedCategory}</h2>
                                <p className="sub-category-desc">{selectedSubCategoryDesc}</p>
                                {category === 'phones' && (
                                    <p className="product-count">
                                        {currentlyDisplayedPhonesCount} of {totalPhonesCount} Products
                                    </p>
                                )}
                                {category === 'tablets' && (
                                    <p className="product-count">
                                        {currentlyDisplayedTabletsCount} of {totalTabletsCount} Products
                                    </p>
                                )}
                            </section>
                            <div className="sort-filter-container">
                                <ProductFilter onFilterChange={handleFilterChange} />
                                <Sort onSortChange={handleSortChange} subCategory={subCategory} />
                            </div>
                            <ul className='products-list'>
                                {products?.length > 0 && products.map((product) => {
                                    return <ProductCard
                                        key={product.id}
                                        product={product.data}
                                    />
                                })}
                            </ul>
                            {hasMoreProducts && (
                                <div className="btn__container">
                                    <Button onClick={onFetchMoreProducts} text={'Load More'} />
                                </div>
                            )}
                        </>
                    )}
            </main >
        </>
    );
}

export default SubCategory;