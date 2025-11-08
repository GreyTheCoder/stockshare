import React from 'react';

function Pricing() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
          <h1 className='mt-2  fs-3'>Unbeatable Pricing</h1>
          <p className='text-muted'>
            We pioneered the concept of discount broking and price transparency in India.
            Flat fees and no hidden charges.
          </p>
          <a href='' style={{ textDecoration: 'none' }}>
            See Pricing <i className='fa fa-long-arrow-right' aria-hidden='true'></i>
          </a>
        </div>

        <div className='col-2'></div>

        <div className='col-6 mb-5'>
          <div className='row text-center'>
            <div className='col p-3 border'>
              <h1 className='mb-3'> ₹0</h1>
              <p>free Equity Delivery <br/> and mutual funds</p>
            </div>
            <div className='col p-3 border'>
              <h1 className='mb-3'> ₹20</h1>
              <p>intraday and F&O trades</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
