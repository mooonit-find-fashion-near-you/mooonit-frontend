"use client"

import React, { useState } from 'react';

import SectionTabs from '@/components/landing/main/SectionTabs';
import HeroSection from '@/components/landing/main/HeroSection';
import SubCategories from '@/components/landing/main/SubCategories';
import TrendingShops from '@/components/landing/main/TrendingShops';
import Advertisments from '@/components/landing/main/Advertisments';
import ShopProductsSection from '@/components/landing/main/ShopProductsSection';

const MooonitHomepage: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState("Women");

  return (
    <>
      <SectionTabs onSelect={setSelectedSection} />
      <HeroSection activeSection={selectedSection} />
      <SubCategories activeSection={selectedSection} />
      <TrendingShops activeSection={selectedSection} />
      <Advertisments activeSection={selectedSection} />
      <ShopProductsSection activeSection={selectedSection} />
    </>
  );
};

export default MooonitHomepage;
