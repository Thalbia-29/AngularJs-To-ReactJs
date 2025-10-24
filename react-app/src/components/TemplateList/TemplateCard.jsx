import React from 'react';
import './template.css'

const TemplateCard = ({ data, onBuyNow }) => {
  return (
    <div>
      <br />
      <br /> 
      <div className='product-card'>
        <div className='title-card'>{data.Name || data.name}</div>
      <p className="h4">{data.description}</p>
       <p className="h4" style={{textAlign:'center'}}>{data.category}</p>
        <img className="healthImg" src="/shell/assets/images/Health-Insurance.jpg" alt="Health Insurance" />
      <br />
      <br />
      <button className="btn btn-primary" onClick={() => onBuyNow(data)} >
        {'Buy - ' + (data.price || data.Price || '$150')}
      </button>
      </div>
    </div>
  );
};

export default TemplateCard;