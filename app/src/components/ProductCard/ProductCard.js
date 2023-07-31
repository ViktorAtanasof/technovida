import '../ProductCard/ProductCard.css';
import StarRating from '../StarRating/StarRating';

function ProductCard({
    product
}) {
    const shortenDesc = product.description.length >= 80 ? product.description.slice(0, 80) + '...' : product.description;

    return (
        <li className="product__card">
            <img className="product__image" src={product.image} alt="product" />
            <div className="product__details">
                <p className="product__name">{product.name}</p>
                <StarRating averageRating={product.ratings} />
                <p className="product__desc">{shortenDesc}</p>
                <div className="prices">
                    {product.oldprice && (
                        <p className="product__old-price">{product.oldprice}<i className="fa-solid fa-dollar-sign"></i></p>
                    )}
                    <p className="product__price">{product.price}<i className="fa-solid fa-dollar-sign"></i></p>
                </div>
            </div>
            <button className='cart-btn' onClick={() => alert('Product added to cart')}>Add to cart</button>
        </li>

    );
}

export default ProductCard;