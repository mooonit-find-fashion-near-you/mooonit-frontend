"use client"

import Advertisments from '@/components/Advertisments';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import SectionTabs from '@/components/SectionTabs';
import ShopProductsSection from '@/components/ShopProductsSection';
import SubCategories from '@/components/SubCategories';
import TrendingShops from '@/components/TrendingShops';
import React, { useState } from 'react';

const MooonitHomepage: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState("Women");

  return (
    <>
      <Navbar />
      <SectionTabs onSelect={setSelectedSection} />
      <HeroSection activeSection={selectedSection} />
      <SubCategories activeSection={selectedSection} />
      <TrendingShops activeSection={selectedSection} />
      <Advertisments activeSection={selectedSection} />
      <ShopProductsSection activeSection={selectedSection} />
      <Footer />
    </>
  );
};

export default MooonitHomepage;
