import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss/tailwind.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllQuery } from "../redux/api/categoryApiSlice";
import { CategoryCard } from "../components/CategoryCard";

// gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const { data: categories } = useGetAllQuery();

  // Uncomment and adjust the useEffect for GSAP animations if needed
  // useEffect(() => {
  //   gsap.from(".hero-title", {
  //     duration: 1,
  //     y: -50,
  //     opacity: 0,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: ".hero-section",
  //       start: "top 80%",
  //     },
  //   });

  //   gsap.from(".hero-subtitle", {
  //     duration: 1,
  //     y: -30,
  //     opacity: 0,
  //     ease: "power3.out",
  //     delay: 0.3,
  //     scrollTrigger: {
  //       trigger: ".hero-section",
  //       start: "top 80%",
  //     },
  //   });

  //   gsap.from(".hero-buttons", {
  //     duration: 1,
  //     y: -20,
  //     opacity: 0,
  //     ease: "power3.out",
  //     delay: 0.6,
  //     scrollTrigger: {
  //       trigger: ".hero-section",
  //       start: "top 80%",
  //     },
  //   });

  //   gsap.from(".event-card", {
  //     duration: 1,
  //     y: 30,
  //     opacity: 0,
  //     ease: "power3.out",
  //     stagger: 0.3,
  //     scrollTrigger: {
  //       trigger: ".events-slider",
  //       start: "top 80%",
  //     },
  //   });
  // }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="h-[100vh] bg-hero-pattern bg-cover flex flex-center flex-col gap-4">
        <h1 className="text-6xl font-bold text-primary-100">College Fest</h1>
        <h1 className="text-white font-semibold w-3/6 h-auto text-2xl">
          Here is your chance to be a part of RVRJCCE's most awaited annual
          festival where you can participate, enjoy, and win prizes. We are
          looking forward to seeing you at this grand event.
        </h1>
      </div>
      <div className="max-h-[80vh] flex flex-col gap-4 py-4 pb-10 flex-center bg-dark-4">
        <h1 className="text-3xl text-primary-200">Event Categories</h1>
        <Slider {...settings} className="h-[60vh] w-[60vw]">
          {categories?.slice(0, 5)?.map((item, index) => (
            <div className="w-1/2 h-[60vh]" key={item._id}>
              <CategoryCard category={item} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-5">
        <div className="flex flex-col md:w-1/2 gap-4 py-3">
          <h1 className="text-2xl text-primary-500">About RVRJCCE</h1>
          <div className="text-sm justify-center">
            Established by the renowned Nagarjuna Education Society (1967) in
            the year 1985, the College drew its initial impetus from people's
            representatives, local doctors, charitable trusts and commercial
            houses of Guntur District. Today, it enjoys flagship status among
            the eight constituent institutions that are governed by Nagarjuna
            Education Society. The founder-members of Nagarjuna Education
            Society and their successors have provided abundant inputs to turn a
            mere 3 programmes -180-intake College into a 19 programmes - 1596 -
            intake by the academic year 2023-2024. The premier status of the
            institution is made possible by sticking to our core-principles of
            student-focus, Human Resource Development and emphasis on total
            quality.
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 gap-4 py-3">
          <h1 className="text-2xl text-primary-500">Contact US</h1>
          <pre className="flex flex-col">
            <span>College</span>
            <span>The Principal R.V.R. & J.C.College of Engineering</span>
            <span>Chandramoulipuram, Chowdavaram,</span>
            <span>GUNTUR-522 019 Andhra Pradesh :: India</span>
            <span>Ph: 94910 73317 & 94910 73318 (O)</span>
            <span>College E-mail: rvrjcce@hotmail.com</span>
            <span> Website: rvrjcce.ac.in</span>
          </pre>
        </div>
      </div>
    </>
  );
};
