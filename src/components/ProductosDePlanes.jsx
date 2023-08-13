import { data } from '../data/DataPlanes';
import ReactModal from 'react-modal';
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com'; // Cambiamos el import para usar el paquete emailjs-com
import toast, { Toaster } from 'react-hot-toast';


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
      .sendForm('service_72sah3s', 'template_lmquuib', e.target, '0ku9k9GZc3KaSdMBY')
      .then(
        (result) => {
          console.log(result.text);
          // Después de enviar el formulario, cerramos la ventana modal
          handleCloseModal();
		  //toast
		  toast.success('Formulario enviado correctamente!', {
			style: {
			  background: '#013D37',
			  color: '#fff',
			  padding: '12px',
			  fontFamily: 'Poppins, sans-serif',
			},
		  });
        },
        (error) => {
          console.log(error.text);
		  //toast error 
		  toast.error('Error al enviar el formulario.', {
			style: {
			  background: '#f44336',
			  color: '#fff',
			  padding: '12px',
			  fontFamily: 'Poppins, sans-serif',
			},
		  });
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
	   <Toaster
  position="bottom-right"
  reverseOrder={false} />
      <ReactModal
        className='ModalContacto'
        ariaHideApp={false}
        isOpen={isModalOpen}
        contentLabel='Ventana Modal de Contacto'
        onRequestClose={handleCloseModal}
      >
        {/* Contenido de la ventana modal */}
        <form onSubmit={handleSubmit} className='contacto-from'>
		<h2>Contacto</h2>
          <div className='formulario-modal'>
            <label htmlFor='name'>Nombre:</label>
            <input
			maxlength="20"
			className='label-style'
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
			maxlength="35"
			className='label-style'
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
			  required
            />
          </div>
          <div className='formulario-modal form-group-textarea'>
            <label htmlFor='message'>Mensaje:</label>
            <textarea
			maxlength="60"
			className='label-style'
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
			  required
            />
          </div>
		  <div className='formulario-modal'>
          <button type='submit'className='label-style button1'>Enviar</button>
		  <button onClick={handleCloseModal}className='label-style button2'>Cerrar</button>
		  </div>
        </form>
      </ReactModal>
    </div>
  );
};
