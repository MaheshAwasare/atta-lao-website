import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ChevronDown, X } from 'lucide-react';
import RegisterModal from './RegistrationModal';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Wheat Atta',
    description: 'Fresh stone-ground whole wheat flour',
    price: 199,
    image: './images/wheat_flour_grains.jpeg',
  },
  {
    id: 2,
    name: 'Jowar Atta',
    description: 'Nutritious sorghum flour for healthy alternatives',
    price: 249,
    image: './images/jowar_flour.jpeg',
  },
  {
    id: 3,
    name: 'Bajra Atta',
    description: 'Pearl millet flour rich in minerals',
    price: 229,
    image: './images/bajra_flour.jpeg',
  },
  {
    id: 4,
    name: 'Ragi Atta',
    description: 'Finger millet flour for traditional recipes',
    price: 279,
    image: './images/ragi_flour.jpeg',
  },
];

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="shop" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#4a9f45]">
                      ₹{product.price}
                    </span>
                    <div className="relative">
                      <select className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg cursor-pointer">
                        <option>1kg</option>
                        <option>5kg</option>
                        <option>10kg</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-[#4a9f45] text-white py-2 rounded-lg hover:bg-[#3d8438] transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {isModalOpen && (
        <RegisterModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default Shop;