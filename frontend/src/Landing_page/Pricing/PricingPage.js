import React from 'react';
import Brokrage from './Brokrage';
import Hero from './Hero';
import OpenAccount from "../../OpenAccount";



function PricingPage() {
    return (
        <>
            <Hero />
            <OpenAccount/>
            <Brokrage />
        </>
      );
}

export default PricingPage;