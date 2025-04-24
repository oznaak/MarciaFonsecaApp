import React from 'react';
import { Link } from 'react-router-dom';
import heroDoctor from '../images/hero-doctor.jpg';
import { motion } from 'framer-motion';

const patternSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=";

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#DEA54B]/70 to-[#D27D2D]/60 text-white overflow-hidden mt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("${patternSvg}")`, opacity: 0.1 }} />
        
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="text-center md:text-left space-y-8">
              <span className="inline-block bg-white/15 backdrop-blur-sm px-6 py-2 rounded-full text-sm border border-white/10">
              Osteopata especializada em pediatria
              </span>
              
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Garanta o melhor bem estar do seu bebé
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Visite as minhas formações para aprender mais sobre a como pode ajudar o seu bebé a ter um melhor bem estar e um crescimento saudável.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/courses" className="btn btn-primary">
                  Ver Formações
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Saber Mais
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                    500+
                  </span>
                  <span className="text-sm uppercase tracking-wider opacity-90">Pais Satisfeitos</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                    20+
                  </span>
                  <span className="text-sm uppercase tracking-wider opacity-90">Formações</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                    100%
                  </span>
                  <span className="text-sm uppercase tracking-wider opacity-90">Satisfação</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] hidden md:block">
              <img 
                src={heroDoctor}
                alt="Osteopathic Doctor"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#DEA54B]/10 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gray-50 w-full">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Por Que As Minhas Formações<br/> Vão Ajudar O Seu Bebé?</h2>
            <p className="section-subtitle">
              Entenda a importância de uma educação osteopática especializada para o seu bebé.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card card-hover gradient-border">
              <div className="text-4xl mb-6">📚</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Currículo Abrangente</h3>
              <p className="text-gray-600 leading-relaxed">
                Acesse uma ampla gama de formações cobrindo todos os aspectos de osteopatia, desde princípios básicos até técnicas avançadas.
              </p>
            </div>
            
            <div className="card card-hover gradient-border">
              <div className="text-4xl mb-6">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Instrução Especializada</h3>
              <p className="text-gray-600 leading-relaxed">
                Aprenda com uma Osteopata Pediátrica experiente que é lider na área e apaixonada por educação.
              </p>
            </div>
            
            <div className="card card-hover gradient-border">
              <div className="text-4xl mb-6">⏱️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Aprendizado Flexível</h3>
              <p className="text-gray-600 leading-relaxed">
                Estude no seu próprio ritmo com as nossas formações que podem ser feitas em qualquer lugar e em qualquer momento.
              </p>
            </div>
            
            <div className="card card-hover gradient-border">
              <div className="text-4xl mb-6">💡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Conhecimento Prático</h3>
              <p className="text-gray-600 leading-relaxed">
                Adquira experiência prática através de módulos interativos e estudos de caso do mundo real.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white w-full">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">O Que Acham Os Pais?</h2>
            <p className="section-subtitle">
              Ouça o relato de pais que já tiveram a oportunidade de conhecer o meu trabalho.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card card-hover">
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "Os cursos melhoraram significativamente minhas habilidades de diagnóstico e abordagens de tratamento. As demonstrações práticas são inestimáveis."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                <div className="text-gray-600">Osteopathic Physician</div>
              </div>
            </div>
            
            <div className="card card-hover">
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "A flexibilidade da plataforma me permitiu equilibrar minha prática enquanto avançava minha educação. O suporte da comunidade é excepcional."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. Michael Chen</div>
                <div className="text-gray-600">Physical Therapist</div>
              </div>
            </div>
            
            <div className="card card-hover">
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "A profundidade do conhecimento compartilhado nestes cursos é notável. Implementei novas técnicas que transformaram minha prática."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. Emily Rodriguez</div>
                <div className="text-gray-600">Sports Medicine Specialist</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white overflow-hidden w-full">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("${patternSvg}")`, opacity: 0.1 }} />
        
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.6 }} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6">Ainda não está convencido?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
           Contacte-me para saber mais sobre o meu trabalho e como posso ajudar o seu bebé.
          </p>
          <Link to="/signup" className="btn btn-primary inline-block">
            Contactar
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage; 