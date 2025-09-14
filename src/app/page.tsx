"use client"

import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import SectionTabs from '@/components/SectionTabs';
import React, { useState } from 'react';

const MooonitHomepage: React.FC = () => {

  const [selectedSection, setSelectedSection] = useState("Women");

  return (
    <>
      <Navbar />
      <SectionTabs onSelect={setSelectedSection} />
      <HeroSection activeSection={selectedSection} />
    </>
  );
};

export default MooonitHomepage;