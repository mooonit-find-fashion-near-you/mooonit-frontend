"use client"

import Advertisments from '@/features/landing/components/Advertisments';

import SectionTabs from '@/features/landing/components/SectionTabs';
import ShopProductsSection from '@/features/landing/components/ShopProductsSection';
import SubCategories from '@/features/landing/components/SubCategories';
import TrendingShops from '@/features/landing/components/TrendingShops';
import React, { useState } from 'react';
import HeroSection from '@/features/landing/components/HeroSection';

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
