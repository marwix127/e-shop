import React from 'react';
import Link from 'next/link';



export default function Checkout() {




    return (

        <div>
            <h1>Checkout Page</h1>
            <p>This page is not implemented yet.</p>
            <div className='mt-6 ml-6'>
            <Link
                href="/cart"
                className=" px-6 py-2 font-bold text-white bg-black border-2 border-black rounded-2xl
      hover:bg-white hover:text-black transition"
            >
                Atrás
            </Link>
            </div>
        </div>
    );
};

