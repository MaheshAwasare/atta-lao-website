import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/farms.jpeg',
      title: 'Pure, Traditional Indian Flours',
      subtitle: 'Select Your Grains, We Handle the Rest',
      description: 'Fresh flour, ground on order, delivered to your doorstep'
    },
    {
      image: '/images/flour.jpeg',
      title: 'Quality You Can Trust',
      subtitle: 'Carefully Selected Grains',
      description: 'Premium grains sourced directly from trusted farmers'
    },
    {
      image: '/images/mill.jpeg',
      title: 'Traditional Milling Process',
      subtitle: 'Preserving Natural Goodness',
      description: 'Ground fresh when you order, maintaining natural nutrients'
    },
    {
      image: '/images/banner_image1.jpeg',
      title: 'Wide Range of Products',
      subtitle: 'For All Your Cooking Needs',
      description: 'Quick delivery ensuring freshness in every pack'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Carousel Slides */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative h-full w-full flex items-center">
              <div className="container mx-auto px-4 text-white">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 transform transition-all duration-1000 ease-out">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl mb-4 text-gray-100 font-semibold transform transition-all duration-1000 ease-out">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 transform transition-all duration-1000 ease-out">
                    {slide.description}
                  </p>
                  <a
                    href="#shop"
                    className="inline-flex items-center space-x-2 bg-[#4a9f45] text-white px-8 py-3 rounded-full hover:bg-[#3d8438] transition-colors text-lg"
                  >
                    <span>Order Fresh Flour</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${index === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;