import { data } from '../data/DataPlanes';
import ReactModal from 'react-modal';
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com'; // Cambiamos el import para usar el paquete emailjs-com

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviamos el formulario usando el paquete emailjs-com
    emailjs
      .sendForm('service_cyy6gui', 'template_v5rxhon', e.target, 'F9ADarLVUQU5W4bMm')
      .then(
        (result) => {
          console.log(result.text);
          // Después de enviar el formulario, cerramos la ventana modal
          handleCloseModal();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='container-items card-plan'>
      {data.map((product) => (
        <div className='item' key={product.id}>
          <figure>
            <img src={product.img} alt={product.nameProduct} />
          </figure>
          <div className='info-product'>
            <h4>{product.nameProduct}</h4>
            <p>{product.infoProduct}</p>
            <p className='price'>${product.price}</p>
            <button className='button1' onClick={() => onAddProduct(product)}>
              Sumar servicios
            </button>
            <button className='button2' onClick={handleOpenModal}>
              Contactanos
            </button>
          </div>
        </div>
      ))}
      <ReactModal
        className='ModalContacto'
        ariaHideApp={false}
        isOpen={isModalOpen}
        contentLabel='Ventana Modal de Contacto'
        onRequestClose={handleCloseModal}
      >
        {/* Contenido de la ventana modal */}
        <form onSubmit={handleSubmit}>
		<h2>Contacto</h2>
          <div className='formulario-modal'>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
			  required
            />
          </div>
          <div className='formulario-modal'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
			  required
            />
          </div>
          <div className='formulario-modal'>
            <label htmlFor='message'>Mensaje:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
			  required
            />
          </div>
          <button type='submit'>Enviar</button>
		  <button onClick={handleCloseModal}>Cerrar</button>
        </form>
      </ReactModal>
    </div>
  );
};
