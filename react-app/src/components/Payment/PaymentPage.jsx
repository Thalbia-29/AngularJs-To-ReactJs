import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

function validateExpiry(expiry) {
  // Accept MM/YY or MM/YYYY
  const mmyy = expiry.trim();
  const regex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
  if (!regex.test(mmyy)) return false;
  const parts = mmyy.split('/');
  const month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);
  if (parts[1].length === 2) {
    // convert 2-digit year to 4-digit (assume 2000-2099)
    year += 2000;
  }
  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  // card valid through the end of expiry month
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  expiryDate.setDate(0); // last day of previous month
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

const PaymentPage = () => {
  const { templateId } = useParams();
  const { state } = useLocation();
  const templateData = state?.templateData;
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!templateData) {
    return <div>No template data found</div>;
  }

  const validate = () => {
    const e = {};
    const sanitizedCard = cardNumber.replace(/[^0-9]/g, '');
    if (!sanitizedCard) {
      e.cardNumber = 'Card number is required';
    } else if (!/^[0-9]{13,19}$/.test(sanitizedCard)) {
      e.cardNumber = 'Card number must be 13 to 19 digits';
    }

    if (!expiry) {
      e.expiry = 'Expiry date is required';
    } else if (!validateExpiry(expiry)) {
      e.expiry = 'Expiry date is invalid or expired (MM/YY)';
    }

    if (!cvv) {
      e.cvv = 'CVV is required';
    } else if (!/^[0-9]{3,4}$/.test(cvv)) {
      e.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    try {
      const paymentData = {
        cardNumber: cardNumber.replace(/[^0-9]/g, ''),
        expiryDate: expiry,
        cvv: cvv,
        amount: templateData.price,
        currency: 'USD',
        description: `Payment for ${templateData.name}`
      };

      // MOCK MODE: set this to true to hardcode payment success locally
      const MOCK_PAYMENT_SUCCESS = true;

      if (MOCK_PAYMENT_SUCCESS) {
        // simulate a short network delay
        await new Promise(resolve => setTimeout(resolve, 400));
        alert('Payment successful! ');
        navigate('/templates');
      } else {
        // attach token if available
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        // ensure amount is numeric (strip $ or other non-numeric characters)
        const numericAmount = Number(String(paymentData.amount).replace(/[^0-9.-]+/g, '')) || 0;
        const payload = { ...paymentData, amount: numericAmount };

        const response = await fetch('https://localhost:7023/api/Payment/CreatePayment', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          // try to read error text from the response to provide more context
          const errText = await response.text().catch(() => null);
          throw new Error(`Payment failed${errText ? ': ' + errText : ''}`);
        }

        const result = await response.json();
        alert('Payment successful!');
        navigate('/templates');
      }
      // You can add navigation to a success page here if needed
    } catch (error) {
      console.error('Payment error:', error);
     // alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
     <div className="container">
       <div className="payment-details">
        <h3>{templateData.name}</h3>
        <p>Price: {templateData.price}</p>
        <p>{templateData.description}</p>
          <div className="panel panel-default">
            <div className="col-xs-12 col-md-4">
              <div className="panel panel-default credit-card-box">
                <div className="panel-heading display-table">
                  <div className="row display-tr">
                    <h3 className="panel-title display-td">Payment Details</h3>
                    <div className="display-td">
                      <img className="img-responsive pull-right" src="/shell/assets/images/card.png" alt="cards" />
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <form name="form" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="form-group">
                          <label htmlFor="cardNumber">CARD NUMBER</label>
                          <div className="input-group">
                            <input
                              id="cardNumber"
                              type="tel"
                              name="cardNumber"
                              className={`form-control ${errors.cardNumber && submitted ? 'is-invalid' : ''}`}
                              placeholder="4xxx xxxx xxxx xxxx"
                              autoComplete="cc-number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              onBlur={() => submitted && validate()}
                              inputMode="numeric"
                            />
                            <span className="input-group-addon" />
                          </div>
                          {(errors.cardNumber && submitted) && (
                            <div className="err-style">
                              <div className="err-style">{errors.cardNumber}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-7 col-md-7">
                        <div className="form-group">
                          <label htmlFor="cardExpiry"><span className="hidden-xs">EXPIRATION</span><span className="visible-xs-inline">EXP</span> DATE</label>
                          <input
                            id="cardExpiry"
                            type="tel"
                            name="cardExpiry"
                            className={`form-control ${errors.expiry && submitted ? 'is-invalid' : ''}`}
                            placeholder="MM / YYYY"
                            autoComplete="cc-exp"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            onBlur={() => submitted && validate()}
                          />
                        </div>
                        {(errors.expiry && submitted) && (
                          <div className="err-style">
                            <div className="err-style">{errors.expiry}</div>
                          </div>
                        )}
                      </div>
                      <div className="col-xs-5 col-md-5 pull-right">
                        <div className="form-group">
                          <label htmlFor="cardCVC">CVV CODE</label>
                          <input
                            id="cardCVC"
                            type="tel"
                            name="cardCVC"
                            className={`form-control ${errors.cvv && submitted ? 'is-invalid' : ''}`}
                            placeholder="CVV"
                            autoComplete="cc-csc"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            onBlur={() => submitted && validate()}
                            inputMode="numeric"
                            maxLength={4}
                          />
                        </div>
                        {(errors.cvv && submitted) && (
                          <div className="err-style">
                            <div className="err-style">{errors.cvv}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-12">
                        <button className="subscribe btn btn-success btn-lg btn-block" disabled={!submitted ? false : Object.keys(errors).length > 0} type="submit">Pay Now</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;