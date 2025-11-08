import React from 'react';

function Hero() {
    return (
        <div className='container'> 
        <div className='row mt-5 p-5 border-bottom text-center'>
          <h2> Charges</h2>
          <p className='text-muted fs-5 mt-3'>free equity investments and flat ₹20 traday and F&O trades</p>
          </div>
        <div className='row mt-5 p-5 text-center'>
        <div className='col-4 p-4'>
          <img src='/media/images/pricing0.svg'/>
          <h2 className='fs-4'>Free equity delivery</h2>
          <p className='fs-6 p-3 text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className='col-4 p-4 text-muted'>
          <img src='/media/images/intradayTrades.svg'/>
          <h2 className='fs-3' >Intraday and F&Otrades</h2>
          <p className='fs-6 p-3'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
          </div>
           <div className='col-4 p-4 text-muted'>
          <img src='/media/images/pricing0.svg'/>
          <h2 className='fs-3' >Free direct MF</h2>
          <p className='fs-6 p-3'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          </div>
           </div>
           </div>
      );
}

export default Hero;