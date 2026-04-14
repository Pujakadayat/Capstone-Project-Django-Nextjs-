"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

// const slides = [
//   {
//     id: 1,
//     title: "Summer Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "Winter Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },
// ];

const slides = [
  {
    id: 1,
    title: "Level Up Your Setup",
    description: "Precision-engineered accessories for modern creators",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Yqth1PKrFqcza9jGlgAsI3c3NSyWLngylPoZFVoXI0T_byx-ztJG0-dhjmabVXx6DukcOVqGR3d2_eba2vFBI38Cks8_DVGJTIK7PJ-snwgDQR7uJpXZkoI8zdoZBhOSQycz2kKC6EGsCLZQwlp3XKzrBjrQrN96_6klRKYVJkIppC9EnLnq5PKU-nLrCEssG82IV_UKPe68nAUIm68uGaplJVpGKOUDjfS-oNG6VUPN6AN9ISuU3IhqXXLn0ctnqRPFcD6fw0E",
    url: "/shop",
    bg: "bg-gradient-to-r from-gray-900 to-gray-700",
  },
  {
    id: 2,
    title: "Acoustic Architect Pro",
    description: "Premium noise-cancelling headphones",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjJVIiRZaOnBmj6SFcE0BNhQFTBSpXtZINxFSJWZFDRm2P9pZPX-wJ4NPy_82gG8k-id9rDKKd4hOLtVj_QSkQ4QT0-WPrafsgn5f9NoZjPHxHNQeh2qFcWBFg8kw8XsW-FadlT3CSszoUwh0N31KIMi_9g4vH0Xtz50mHkq1yyEVPL-F36A--4qgp7I_CPoU8ntfAuGaiWj2RVu3AfHOSrpwLHZ-VYK6g7jWXC87G6sXX-xcT-CfZ86iNYDNAeV-W0dyNvtfgtTQ",
    url: "/product/headphones",
    bg: "bg-gradient-to-r from-slate-800 to-slate-600",
  },
  {
    id: 3,
    title: "Precision Arc Mouse",
    description: "High-performance ergonomic control",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-9J6ErSMxdMVJo9ry6agxCVyTvnvYaMNHI_WnrfOkPd4e-vfHfKSvAYgjyhmCBn8zS5pQReMOaliRzcHruNRE2eqDQM16DI4xPFPaqGwb64T1X2TTs3vi5xAS5ZWRI55UdW75LgEcr6ohFoSOV1ePE6p19g0Hyjz4ywcCgplwkHYLEm9Nmi11Dj8Bg-rxMNGsju5F2QoKxvYUNYIKwfwdNP2E6tOAgH-4uSAFoGVdGOcc3yCNjWVveJ25TQ9Yzn9pNJioHInKO0E",
    url: "/product/mouse",
    bg: "bg-gradient-to-r from-gray-100 to-gray-300",
  },
  {
    id: 4,
    title: "Sonic Edge Monitors",
    description: "Studio-grade sound precision",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Xg79wejSi_Rg_7HaIhwXO-_Fy1mdK6DhjSgSloEpnXaWDUkQSxqm21r9bX0WRmE2en6GfHYIxx_TBxKeOVBAVX7Ke4vHKp1uAmy6rB4uZ1XZtFLt3UUVec7WQ457Yq-ae9H1FP45T_6PzyGaXr7-n0vvPkyaUgBsdSSy1gv3ejRXk1iKDLJOWOqx-3IDV_k11rEzFyVOSnc78tNBMwWIZ9jWyK3_OO0YCPrbrp1QeMwhQHYlAiiEr2X9jNg5sAjLzlwNbAgoAdM",
    url: "/product/speakers",
    bg: "bg-gradient-to-r from-neutral-900 to-neutral-700",
  },
  {
    id: 5,
    title: "Volt-Drive 2TB SSD",
    description: "Ultra-fast storage for professionals",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdozKsYeuYPC-d8JT8Uy2V2R1IIFUkk-4OQZ-p1nLWUAPE4wQO9OdQ-t68hbDdbyOxALsQuWku9KVtuqbuFzX86AQrrA33y_biSl7aHm-jiJCkYN_9sobGpPNkhOXL2WsPcHK5vxZ1hYA65JYh7grKY6-5R2w_9hp2v-RW8OkCOkf_8Uia3J97osJLjpag_g-m6_sZHLyZq95Vcwng2FOZ0dARpYduPt2E2Bh5-ipL2FtZlhDCOMC0rCS5FXq0s6XdEkEt8pQ1EDs",
    url: "/product/ssd",
    bg: "bg-gradient-to-r from-blue-900 to-indigo-700",
  },
];
const Slider = () => {
  const [current, setCurrent] = useState(0);

  //     useEffect(() =>{
  //       const interval = setInterval(()=>{
  // setCurrent(prev => (prev === slides.length -1 ? 0: prev +1));
  //       },3000);

  //       return () => clearInterval(interval)
  //     })
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: ` translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full xl:h-full flex flex-col gap:16 xl:flex-row`}
            key={slide.id}
          >
            <div className=" h-1/2 xl:w-1/2  xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5x text-gray-300">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold text-[#F8FAFC]">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  Shop
                </button>
              </Link>
            </div>
            <div className="h-1/2 xl:w-1/2  xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4 ">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""}`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
