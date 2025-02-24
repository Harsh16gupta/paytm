import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loanData = [
    { id: 1, title: 'Personal Loan', description: 'Get a personal loan with low interest rates.', interestRate: '8.5%' },
    { id: 2, title: 'Home Loan', description: 'Buy your dream home with our home loan offers.', interestRate: '7.2%' },
    { id: 3, title: 'Car Loan', description: 'Drive your dream car with affordable car loans.', interestRate: '9.0%' },
  ];

  const sliderImages = [
    'https://lh3.googleusercontent.com/OM4YMIedCN5_x-DN4yU7WTDfHZoTe5xv3kFIHR3FtiWneI7a4DdUIrNBnlnY5mers3fqdyadayVrd_dfo_beBqMkazwgZ-5YifpW=s0',
    'https://lh3.googleusercontent.com/1wx1s877pVwYT9NXRDn6WdADFwu03peI6ZQs4moAp9vIsjAoq6-CCfqd01tO2iYrSfsX3k1mDCDtPFh0lmFPROtfb3i4knjG3wdB=s0',
    'https://lh3.googleusercontent.com/OwIDt62oF8hnhm8r7VEzNtkegNvaCdh9w0ebti_dhQaxaHVDFSo_nRKss1VTwLgySz0TG9tGM7rGlJgzvsNKMml8-9-0--EekuhzxA=s0',
    'https://lh3.googleusercontent.com/drE9VsSSUHOCNSN72h3LIyyV56uedlpECXBwlSXVDp9WYLclsllbhv84y_ra55D0_gnHLziX-cWL6ndfMw2kqo7b7xrI-NRZfkQUrg=s0',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    alert('Logged in successfully!');
  };

  const handleSignUp = () => {
    alert('Sign up clicked!');
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-[#e8f8fd] rounded-xl flex flex-col items-center neumorphism min-h-screen">
      <div className="flex justify-end w-full mb-6 px-4">
        {!isLoggedIn ? (
          <div className="flex space-x-4">
            
          </div>
        ) : (
          <p className="text-green-600 font-semibold text-sm sm:text-base">Welcome, User!</p>
        )}
      </div>

      <div className="mb-8 w-full px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">Loan Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loanData.map((loan) => (
            <div 
              key={loan.id} 
              className="bg-white p-4 rounded-xl neumorphism hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{loan.title}</h3>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">{loan.description}</p>
              <p className="text-blue-600 font-semibold text-sm sm:text-base">
                Interest Rate: {loan.interestRate}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#e8f8fd] p-4 rounded-xl w-full neumorphism max-w-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">Our Partners</h2>
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <div key={index} className="px-2 ">
            <img 
  src={image} 
  alt={`Slide ${index + 1}`} 
  className="w-50 h-40 sm:h-48 md:h-56 object-cover rounded-xl mx-auto"
/>

            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardComponent;