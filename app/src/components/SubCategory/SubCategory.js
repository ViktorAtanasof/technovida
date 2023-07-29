import { useParams } from 'react-router-dom';
import '../SubCategory/SubCategory.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { db } from '../../firebase';
import ProductCard from '../ProductCard/ProductCard';
import Sort from '../Sort/Sort';

function SubCategory() {
    const { category, subCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedSubCategoryDesc, setSelectedSubCategoryDesc] = useState('');
    const [lastFetchedProduct, setLastFetchedProduct] = useState(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [totalTabletsCount, setTotalTabletsCount] = useState(0);
    const [totalPhonesCount, setTotalPhonesCount] = useState(0);
    const [currentlyDisplayedTabletsCount, setCurrentlyDisplayedTabletsCount] = useState(0);
    const [currentlyDisplayedPhonesCount, setCurrentlyDisplayedPhonesCount] = useState(0);
    const [sortOption, setSortOption] = useState('');

    const capitalizedCategory = subCategory[0].toUpperCase() + subCategory.slice(1);

    useEffect(() => {
        const fetchProducts = async (category, subCategory, sortOption) => {
            try {
                const productsRef = collection(db, category);
                const q = query(
                    productsRef,
                    where('type', '==', subCategory),
                    limit(12),
                );
                const querySnap = await getDocs(q);
                if (querySnap.size < 12) {
                    setHasMoreProducts(false);
                } else {
                    setHasMoreProducts(true);
                }
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedProduct(lastVisible);
                const products = [];
                querySnap.forEach((doc) => {
                    return products.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                // Handle sorting based on the selected sortOption
                if (sortOption === 'name-asc') {
                    products.sort((a, b) => a.data.name.localeCompare(b.data.name));
                } else if (sortOption === 'name-desc') {
                    products.sort((a, b) => b.data.name.localeCompare(a.data.name));
                } else if (sortOption === 'price-asc') {
                    products.sort((a, b) => a.data.price - b.data.price);
                } else if (sortOption === 'price-desc') {
                    products.sort((a, b) => b.data.price - a.data.price);
                }

                setProducts(products);
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

                // Fetch the description for the selected subcategory
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
        fetchProducts(category, subCategory, sortOption);
    }, [category, subCategory, sortOption]);

    useEffect(() => {
        setSortOption('');
    }, [subCategory]);

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);
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
            if (querySnap.size < 12) {
                setHasMoreProducts(false);
            } else {
                setHasMoreProducts(true);
            }
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedProduct(lastVisible);
            const products = [];
            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setProducts((prevState) => {
                return [...prevState, ...products];
            });
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
                <section>
                    <h2>{capitalizedCategory}</h2>
                    <p>{selectedSubCategoryDesc}</p>
                    {category === 'phones' && (
                        <p>{currentlyDisplayedPhonesCount} - {totalPhonesCount}</p>
                    )}
                    {category === 'tablets' && (
                        <p>{currentlyDisplayedTabletsCount} - {totalTabletsCount}</p>
                    )}
                </section>
                <div className="sort">
                    <Sort onSortChange={handleSortChange} subCategory={subCategory} />
                </div>
                <ul className='products-list'>
                    {products?.length > 0 && products.map((product) => {
                        return <ProductCard
                            key={product.id}
                            id={product.id}
                            product={product.data}
                        />
                    })}
                </ul>
            </main>
            {hasMoreProducts && products?.length >= 12 && (
                <div className="load-more-container">
                    <button onClick={onFetchMoreProducts}
                        className='more-btn'
                    >Load More</button>
                </div>
            )}
        </>
    );
}

export default SubCategory;