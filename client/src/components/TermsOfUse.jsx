import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="relative bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Termos de Uso</h1>
          <p className="mt-4 text-lg">Leia atentamente os nossos termos antes de utilizar o site.</p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Seções Importantes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#DEA54B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Você não deve usar este site de maneira ilegal ou prejudicial.
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#DEA54B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Todo o conteúdo deste site é protegido por direitos autorais e não pode ser reproduzido sem permissão.
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#DEA54B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Reservamo-nos o direito de modificar ou encerrar o site a qualquer momento sem aviso prévio.
          </li>
        </ul>
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-2 bg-[#DEA54B] text-white font-semibold rounded-md hover:bg-[#D27D2D] transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default TermsOfUse;