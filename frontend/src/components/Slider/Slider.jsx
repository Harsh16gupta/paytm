import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'

const Slider = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4444/banks')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Error in fetching doctors data:', error));
  }, []);

  // Slider settings
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1500, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="slider-container p-4">
      <Slider {...settings} className='h-64 w-full'>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-2 pr-13 ">
            <div className="bg-gray rounded-4xl shadow-sm shadow-white overflow-hidden ">
              <img src={doctor.image} alt={doctor.name} className="m-auto rounded-full h-48 object-cover mt-3 outline-1 outline-cyan-400 shadow-md shadow-gray-600" />
              <div className="p-4">
                <h2 className="text-xl text-white font-bold">{doctor.name}</h2>
                <p className="text-white"><strong>Skills:</strong> {doctor.skills?.join(', ') || "N/A"}</p>
                <p className="text-white"><strong>Location:</strong> {doctor.location || "Unknown"}</p>
                <p className="text-white">
                  <strong>Rating:</strong> ⭐ {doctor.rating || "No Rating"} ({doctor.reviews || 0} reviews)
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slider;