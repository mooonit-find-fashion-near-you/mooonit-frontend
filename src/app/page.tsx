"use client"

import Advertisments from '@/components/Advertisments';

import HeroSection from '@/components/HeroSection';
import SectionTabs from '@/components/SectionTabs';
import ShopProductsSection from '@/components/ShopProductsSection';
import SubCategories from '@/components/SubCategories';
import TrendingShops from '@/components/TrendingShops';
import React, { useState } from 'react';

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
