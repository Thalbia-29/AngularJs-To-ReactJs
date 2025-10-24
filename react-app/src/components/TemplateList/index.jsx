import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from './TemplateCard';
import products from '../../data/products';
import './template.css'

// import '../../../shell/assets/css/style.css';

const TemplateList = () => {
  const navigate = useNavigate();
  const [templateDetails, setTemplateDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 // Hardcoded sample products for now — loaded when user clicks "Browse"
//   const sampleProducts = [
//     {
//       Name: 'Product 1',
//       Price: '$29',
//       Src: '/shell/assets/images/Healthcare.jpg',
//       Description: 'Description for product 1.',
//     //   Features: ['Responsive', 'Cart integration', 'SEO optimized']
//     },
//     {
//       Name: 'Product 2',
//       Price: '$19',
//       Src: '/shell/assets/images/aboutus.jpg',
//       Description: 'Description for product 2.',
//     //   Features: ['Markdown support', 'Tagging', 'Disqus ready']
//     },
//     {
//       Name: 'Product 3',
//       Price: '$39',
//       Src: '/shell/assets/images/ecommerce.png',
//       Description: 'Description for product 3.',
//     //   Features: ['Hero sections', 'Animations', 'Contact forms']
//     }
//   ];
//const getTemplateDetails = async () => {
//     try {
//       const response = await fetch('../../../assets/json/template_data.json');
//       const data = await response.json();
//       setTemplateDetails(data.template_data);
//     } catch (error) {
//       console.error('Error loading templates:', error);
//     }
//   }; 

  // NOTE: API fetch moved to `getTemplateDetails` so it only runs on user interaction

  const getTemplateDetails = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const resp = await fetch('https://localhost:7023/api/products', { headers });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      // assign a random price between $100 and $300 for each product
      const withPrices = (Array.isArray(data) ? data : []).map(item => ({
        ...item,
        price: `$${Math.floor(Math.random() * 201) + 100}`,
      }));
      setTemplateDetails(withPrices);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to load products from server. Showing local products.');
      // Fallback to local products
      const withPrices = products.map(item => ({
        ...item,
        price: `$${Math.floor(Math.random() * 201) + 100}`,
      }));
      setTemplateDetails(withPrices);
    } finally {
      setLoading(false);
    }
  };


  const handleBuyNow = (templateData) => {
    // Using React Router to navigate to payment page with template data
    navigate(`/payment/${templateData.id}`, { state: { templateData } });
  };

  return (
    <div className='container'>

      <h3 className="h3" style={{ fontWeight: 'bold' }}>
        Choose the Products
      </h3>
      
      <p className="h5" style={{ fontWeight: 'bold' }}>
        Choose the Products to Proceed to Payment
      </p>
      <br />
      <button 
        className="btnn btn-warning" 
        onClick={getTemplateDetails}
      >
        Browse our Products
      </button>

      {loading && <div style={{ marginTop: 12 }}>Loading products...</div>}
      {error && <div style={{ marginTop: 12, color: 'crimson' }}>{error}</div>}

      <div>
        <ul className="list-inline">
          {templateDetails.map((template, index) => (
            <li key={index}>
              <TemplateCard 
                data={template} 
                onBuyNow={handleBuyNow}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateList;