export function sortProducts(productsData, sortOption) {
    if (sortOption === 'name-asc') {
        return productsData.sort((a, b) => a.data.name.localeCompare(b.data.name));
    } else if (sortOption === 'name-desc') {
        return productsData.sort((a, b) => b.data.name.localeCompare(a.data.name));
    } else if (sortOption === 'price-asc') {
        return productsData.sort((a, b) => a.data.price - b.data.price);
    } else if (sortOption === 'price-desc') {
        return productsData.sort((a, b) => b.data.price - a.data.price);
    } else {
        return productsData; // No sorting applied
    }
}