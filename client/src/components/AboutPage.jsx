import React from 'react';
import { Link } from 'react-router-dom';
import doctorProfile from '../images/doctor-profile.jpg';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => {
  return (
    <div className="w-full mt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#DEA54B]/10 to-[#D27D2D]/5">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Márcia Fonseca
              </h1>
              <p className="text-xl text-gray-600">
                Osteopata Pediátrica Especializada
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-20 bg-gradient-to-r from-[#DEA54B] to-[#D27D2D]"></div>
                <span className="text-gray-500">20+ Anos de Experiência</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Dedicada a transformar vidas através da osteopatia pediátrica, combinando conhecimento científico com uma abordagem humanizada no tratamento de bebês e crianças.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={doctorProfile}
                  alt="Dra. Márcia Fonseca"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-[#DEA54B]">500+</span>
                    <span className="text-sm text-gray-500">Pacientes Atendidos</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-[#DEA54B]">20+</span>
                    <span className="text-sm text-gray-500">Anos de Experiência</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-[#DEA54B]">50+</span>
                    <span className="text-sm text-gray-500">Certificações</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-white">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Jornada Acadêmica e Profissional</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[#DEA54B]">Formação Acadêmica</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">2005</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Doutorado em Osteopatia Pediátrica</h4>
                    <p className="text-gray-600">Universidade de Medicina Osteopática</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">2000</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mestrado em Fisioterapia Pediátrica</h4>
                    <p className="text-gray-600">Faculdade de Ciências Médicas</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">1998</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Graduação em Fisioterapia</h4>
                    <p className="text-gray-600">Universidade Federal de São Paulo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[#DEA54B]">Experiência Profissional</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">2015</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Diretora Clínica</h4>
                    <p className="text-gray-600">Clínica de Osteopatia Pediátrica</p>
                    <p className="text-gray-500 text-sm mt-1">Coordenação de equipe e atendimento especializado</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">2010</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Professora Convidada</h4>
                    <p className="text-gray-600">Universidade de Medicina Osteopática</p>
                    <p className="text-gray-500 text-sm mt-1">Ministrando aulas e workshops em osteopatia pediátrica</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#DEA54B]">2005</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Osteopata Sênior</h4>
                    <p className="text-gray-600">Hospital Infantil São Paulo</p>
                    <p className="text-gray-500 text-sm mt-1">Atendimento especializado em UTI neonatal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Especialidades e Áreas de Atuação</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Osteopatia Neonatal</h3>
              <p className="text-gray-600">Tratamento especializado para recém-nascidos, focando em problemas de sucção, refluxo e cólicas.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🧒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pediatria Especializada</h3>
              <p className="text-gray-600">Acompanhamento do desenvolvimento infantil e tratamento de distúrbios posturais.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">UTI Neonatal</h3>
              <p className="text-gray-600">Experiência em tratamento osteopático em ambiente hospitalar e UTI neonatal.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.6 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Parceiros Clínicos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#DEA54B] font-bold">HP</span>
              </div>
              <h3 className="font-semibold text-gray-900">Hospital Pediátrico</h3>
              <p className="text-gray-500 text-sm">São Paulo, SP</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#DEA54B] font-bold">CO</span>
              </div>
              <h3 className="font-semibold text-gray-900">Clínica Osteopática</h3>
              <p className="text-gray-500 text-sm">Rio de Janeiro, RJ</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-[#DEA54B]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#DEA54B] font-bold">UM</span>
              </div>
              <h3 className="font-semibold text-gray-900">Universidade de Medicina</h3>
              <p className="text-gray-500 text-sm">São Paulo, SP</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage; 