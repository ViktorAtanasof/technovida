import { useParams } from 'react-router-dom';
import '../SubCategory/SubCategory.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import ProductCard from '../ProductCard/ProductCard';

function SubCategory() {
    const { category, subCategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async (category, subCategory) => {
            try {
                const productsRef = collection(db, category);
                const q = query(
                    productsRef,
                    where('type', '==', subCategory),
                    limit(4),
                );
                const querySnap = await getDocs(q);
                const products = [];
                querySnap.forEach((doc) => {
                    return products.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts(category, subCategory)
    }, [category, subCategory]);

    return (
        <main className='main-content'>
            <h2>Sub-Category Page</h2>
            <p>Category: {category}</p>
            <p>Sub-Category: {subCategory}</p>
            <ul className='products-list'>
                {products.length > 0 && products.map((product) => {
                    return <ProductCard
                        key={product.id}
                        id={product.id}
                        product={product.data}
                    />
                })}
            </ul>
        </main>
    );
}

export default SubCategory;