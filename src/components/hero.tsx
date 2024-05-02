import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="object-cover object-center h-full w-full"
          src="/videos/Football.mp4"
          title="Football Video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-75 z-10"></div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="relative pb-10 pt-32 md:pb-16 md:pt-40">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              LinkUp Tournement
            </h1>
            <p
              className="mb-8 text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Our landing page template works on all devices, so you only have
              to set it up once, and get beautiful results forever.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link
                  className="btn mb-4 w-full bg-green-500 text-white hover:bg-green-600 sm:mb-0 sm:w-auto"
                  href="/auth/signin"
                >
                  Start free trial
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a
                  className="btn w-full bg-gray-700 text-white hover:bg-gray-800 sm:ml-4 sm:w-auto"
                  href="#0"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
