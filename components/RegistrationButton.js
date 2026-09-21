import React from 'react';
import Link from 'next/link';

const RegistrationButton = () => {
    return (
        <section className="py-16 bg-gray-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">CMUN Connect has concluded</h2>
                <Link href="/cmun-connect" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
                    View Conference Recap
                </Link>
            </div>
        </section>
    );
};

export default RegistrationButton;
