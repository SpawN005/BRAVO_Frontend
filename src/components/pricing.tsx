import React from "react";
import CardPricing from "../components/CardPricing";

export default function Princing() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h2 mb-4">Pricing</h1>
            <p className="text-xl text-gray-400">Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.</p>
          </div>

          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none ">
            <CardPricing type="Amateur" total="30Dt" duration="3 months" aos="fade-up">
              <ol>
                <li><p>Up to 8 teams</p></li>
                <li><p>Flexible format</p></li>
                <li><p>Planning tool</p> </li>
              </ol>
            </CardPricing>
            <CardPricing type="Manager" total="50DT" duration="6 months" aos="fade-up" aosDelay="200">
              <ol>
                <li><p>Up to 8 teams</p></li>
                <li><p>Flexible format</p></li>
                <li><p>Planning tool</p> </li>
              </ol>
            </CardPricing>
            <CardPricing type="Player" total="90DT" duration="1 year" aos="fade-up" aosDelay="400">
              <ol>
                <li><p>Up to 8 teams</p></li>
                <li><p>Flexible format</p></li>
                <li><p>Planning tool</p> </li>
              </ol>
            </CardPricing>
          </div>
        </div>
      </div>
    </section>
  );
}
