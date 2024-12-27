import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const testimonialData = [
  {
    id: 1,
    name: "Amelia",
    text: "Stroberi ini sangat manis dan segar! Cocok untuk dijadikan bahan smoothie atau dimakan langsung. Saya sangat suka!",
    place: "Bandung, Indonesia",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Brian",
    text: "Kualitas stroberi ini luar biasa. Rasanya seimbang antara manis dan asam, sangat menyegarkan.",
    place: "California, Amerika Serikat",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Chiharu",
    text: "Stroberi yang saya coba ini sangat enak dan juicy. Saya sering menggunakannya untuk membuat dessert.",
    place: "Tokyo, Jepang",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Daniel",
    text: "Saya suka bagaimana stroberi ini tetap segar dalam waktu yang lama. Sangat cocok untuk camilan sehat.",
    place: "London, Inggris",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Elina",
    text: "Rasa stroberinya begitu kuat dan lezat. Anak-anak saya sangat menyukainya. Pasti akan beli lagi.",
    place: "Helsinki, Finlandia",
    img: "https://picsum.photos/105/105",
  },
  {
    id: 6,
    name: "Farhan",
    text: "Stroberi ini benar-benar manis dan tidak terlalu asam. Paling enak dimakan saat sarapan pagi.",
    place: "Yogyakarta, Indonesia",
    img: "https://picsum.photos/106/106",
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <h1 className="text-3xl font-bold text-secondary">Testimonial</h1>
            <p className="text-4xs">
              Berikut adalah beberapa pengalaman dan pendapat dari orang yang sudah sering makan strawberries.
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[600px] mx-auto gap-6"
          >
            <Slider {...settings}>
              {testimonialData.map((data) => {
                return (
                  <div className="my-6" key={data.id}>
                    <div
                      className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl bg-primaryDark text-white relative"
                    >
                      <img
                        className="rounded-full block mx-auto"
                        src={data.img}
                        alt={data.name}
                      />
                      <p className="text-sm">{data.text}</p>
                      <h1 className="text-xl font-bold">{data.name}</h1>
                      <p className="text-sm text-white/70">{data.place}</p>
                      <p className="text-white/20 text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
