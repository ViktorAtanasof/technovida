import { Link } from 'react-router-dom';
import '../NotFound/NotFound.css';
import Button from '../Button/Button';

function NotFound() {
    return (
        <>
            <section className='notfound__container'>
                <h1>Oops, Page Not Found</h1>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <Link className='notfound__btn' to={'/phones/phones'}>
                    <Button text={'Go Back to Home'} />
                </Link>
            </section>
        </>
    );
};

export default NotFound;