import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <div className=" space-y-4 mt-8">
      <p className=" text-center font-semibold text-2xl">Featured Products</p>
      <Swiper
        spaceBetween={20}
        breakpoints={
          // when window width is >= 320px
          {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }
        }
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide className="">
          <Link
            to="/shop/men/4"
            className=" h-[350px]  shadow-md flex flex-col-reverse items-center rounded-md text-white bg-[url('https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80')] bg-center bg-cover hover-75"
          >
            <button className=" py-2 bg-white text-black mb-8 w-fit px-16 rounded text-xl font-semibold">
              Shop
            </button>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            to="/shop/women/9"
            className=" h-[350px] shadow-md flex flex-col-reverse items-center rounded-md text-white bg-[url('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')] bg-center bg-cover hover-75"
          >
            <button className=" py-2 bg-white text-black mb-8 w-fit px-16 rounded text-xl font-semibold">
              Shop
            </button>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="">
          <Link
            to="/shop/men/8"
            className=" h-[350px] shadow-md flex flex-col-reverse items-center  rounded-md text-white bg-[url('https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')] bg-center bg-cover hover-75"
          >
            <button className=" py-2 bg-white text-black mb-8 w-fit px-16 rounded text-xl font-semibold">
              Shop
            </button>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="">
          <Link
            to="/shop/men/10"
            className=" h-[350px] shadow-md  flex flex-col-reverse items-center rounded-md text-white bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80')] bg-center bg-cover hover-75"
          >
            <button className=" py-2 bg-white text-black mb-8 w-fit px-16 rounded text-xl font-semibold">
              Shop
            </button>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
