import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss/tailwind.css";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  useEffect(() => {
    gsap.from(".hero-title", {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
    });

    gsap.from(".hero-subtitle", {
      duration: 1,
      y: -30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
    });

    gsap.from(".hero-buttons", {
      duration: 1,
      y: -20,
      opacity: 0,
      ease: "power3.out",
      delay: 0.6,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
    });

    gsap.from(".event-card", {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".events-slider",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="bg-bg-100 text-text-100">
      <header className="hero-section bg-bg-200 text-center py-20">
        <div className="container mx-auto">
          <h1 className="hero-title text-5xl mb-5 text-primary-200">
            JOIN THE CELSIUS FEST🔥
          </h1>
          <p className="hero-subtitle text-xl mb-8">
            Here is your chance to be a part of CIEM's most awaited annual
            festival where you can participate, enjoy, and win prizes. We are
            looking forward to seeing you at this grand event.
          </p>
          <div className="hero-buttons">
            <a
              href="#"
              className="btn btn-primary bg-primary-100 text-text-100 px-4 py-2 rounded mx-2"
            >
              Register to events
            </a>
            <a
              href="#"
              className="btn btn-secondary bg-accent-200 text-text-100 px-4 py-2 rounded mx-2"
            >
              Know more
            </a>
          </div>
        </div>
      </header>

      <section className="events-section py-20">
        <div className="container mx-auto">
          <h2 className="section-title text-center text-4xl mb-10">
            Celsius Events
          </h2>
          <div className="events-slider flex space-x-6 overflow-x-auto px-6">
            <div className="event-card bg-bg-300 p-6 rounded-lg min-w-[300px] text-center">
              <h3 className="text-2xl mb-3">Technical</h3>
              <p>Gripper, Nitrocharge, Line of Control</p>
            </div>
            <div className="event-card bg-bg-300 p-6 rounded-lg min-w-[300px] text-center">
              <h3 className="text-2xl mb-3">Cultural</h3>
              <p>Dance, Singing, Band performance</p>
            </div>
            {/* More cards as needed */}
          </div>
        </div>
      </section>

      <section className="about-section py-20 bg-bg-200">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-4xl mb-6">About CIEM</h2>
          <p className="max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </p>
        </div>
      </section>

      <footer className="footer-section py-10 bg-bg-200 text-text-200 text-center">
        <div className="container mx-auto">
          <div className="contact-info mb-6">
            <h3 className="text-2xl mb-4">Contact</h3>
            <p>Amartya Dhar - +91 72788 07767</p>
            <p>Biswajit - +91 86373 36559</p>
            <p>Sougata Das - +91 80164 48905</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
