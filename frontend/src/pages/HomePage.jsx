import React from "react";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import TimelineSection from "../components/sections/TimelineSection";
import ProductsSection from "../components/sections/ProductsSection";
import InstructionsSection from "../components/sections/InstructionsSection";
import FaqSection from "../components/sections/FaqSection";
import ContactSection from "../components/sections/ContactSection";
import StatisticsSection from "../components/sections/StatisticsSection";
import TopServicesSection from "../components/sections/TopServicesSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import NewsSection from '../components/sections/NewsSection';
import ServicesSection from '../components/sections/ServicesSection';
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ProductsSection />
      <ServicesSection />
      <InstructionsSection />
      <FaqSection />
      {/* <TeamSection /> */}
      <StatisticsSection />
      <TopServicesSection />
      <FeaturesSection />
      <NewsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
