import { data } from '../data/DataPlanes';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div className='container-items card-plan'>
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h4>{product.nameProduct}</h4>
                        <p>{product.infoProduct}</p>
						<p className='price'>${product.price}</p>
						<button className='button1'onClick={() => onAddProduct(product)}>
							Sumar servicios
						</button>
                        <button className='button2'>
							Contactanos
						</button>
					</div>
				</div>
			))}
		</div>
	);
};