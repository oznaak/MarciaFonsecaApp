import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-20">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-6xl font-bold text-[#DEA54B] mb-8">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white hover:from-[#D27D2D]/90 hover:to-[#C06820]/80 transition-all duration-300 shadow-sm"
        >
          Voltar para Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 