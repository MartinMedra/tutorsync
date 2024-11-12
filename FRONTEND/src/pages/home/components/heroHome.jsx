import HeroImage from '../../../assets/svg/Calendar.png';
import LoginModal from './loginModal';
import { useState } from 'react';


export default function HeroHome() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section className="min-h-screen flex justify-center items-center text-gray-600 body-font shadow-white-glow" id="hero">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center animate-fade-up animate-duration-[1500ms] animate-delay-200 animate-ease-in">
        {/* Texto a la derecha */}
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white animate-jump animate-duration-[1500ms]">Simplificamos las tutorías</h1>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white animate-jump animate-duration-[1500ms]">para que te enfoques en aprender</h1>
          <p className="mb-8 leading-relaxed">
          Ya sea virtual o presencial, gestiona fácilmente tus citas y sigue tu progreso académico.
          </p>
          <div className="flex justify-center">
            <button onClick={() => setIsLoginOpen(true)} className="buttonHero inline-flex text-white bg-rosado border-0 py-2 px-6 focus:outline-none hover:text-rosado rounded text-lg">Da el primer paso</button>
          </div>
        </div>

        {/* Imagen a la izquierda */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img className="object-cover object-center rounded" alt="hero" src={HeroImage} />
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} closeModal={() => setIsLoginOpen(false)} />
    </section>
  );
}
