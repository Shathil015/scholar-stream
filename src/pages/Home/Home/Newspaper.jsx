import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import news1 from "../../../assets/newspaperLogo/1.png";
import news2 from "../../../assets/newspaperLogo/2.png";
import news3 from "../../../assets/newspaperLogo/3.png";
import news4 from "../../../assets/newspaperLogo/4.png";
import news5 from "../../../assets/newspaperLogo/5.png";
import news6 from "../../../assets/newspaperLogo/6.png";
import news7 from "../../../assets/newspaperLogo/7.png";
import news8 from "../../../assets/newspaperLogo/8.png";

const newsLogos = [news1, news2, news3, news4, news5, news6, news7, news8];

const Newspaper = () => {
  return (
    <Swiper
      loop={true}
      slidesPerView={5}
      spaceBetween={20}
      centeredSlides={true}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      {newsLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center items-center w-full mt-10">
            <img
              src={logo}
              alt="newspaper logo"
              className="w-28 h-16 object-contain opacity-80 hover:opacity-100 transition"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Newspaper;
