import { subCategoriesData } from "./subCategoriesData";
import { sections } from './heroData';

export type Shop = {
  id: number;
  name: string;
  image: string;
  title: string;
  rating: number;
  time: string;
  distance: string;
  location: string;
  section: string;
  category: string;
}

// Utility functions
const getRandomNum = (max: number) => Math.floor(Math.random() * max) + 1;
const getRandomRating = () => +(Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 - 5.0
const getRandomDistance = () => `${(Math.random() * 5 + 0.5).toFixed(1)} km`; // 0.5 - 5 km
const getRandomTime = () => `${Math.floor(Math.random() * 30 + 15)} min`; // 15 - 45 min
const getRandomLocation = () => {
  const locations = ["MG Road, Indore", "Palasia, Indore", "Vijay Nagar, Indore", "AB Road, Indore", "Rajwada, Indore"];
  return locations[Math.floor(Math.random() * locations.length)];
};

// Generate shop names
const adjectives = ["Elegant", "Urban", "Chic", "Grace", "Modern", "Trendy", "Radiant", "Feminine", "Classic"];
const nouns = ["Styles", "Boutique", "Threads", "Wardrobe", "Aura", "Charm", "Flair", "Tones", "Glam"];

export const generateShops = (countPerCategory = 5): Shop[] => {
  const shops: Shop[] = [];
  let idCounter = 1;

  sections.forEach((section) => {
    const categories = subCategoriesData[section.toLowerCase()];
    if (!categories) return;

    categories.forEach((cat) => {
      for (let i = 0; i < countPerCategory; i++) {
        const shop: Shop = {
          id: idCounter++,
          name: `${adjectives[getRandomNum(adjectives.length) - 1]} ${nouns[getRandomNum(nouns.length) - 1]}`,
          image: `https://picsum.photos/2048/1080?random=${getRandomNum(1000)}`,
          title: `Stylish ${cat.name}`,
          rating: getRandomRating(),
          time: getRandomTime(),
          distance: getRandomDistance(),
          location: getRandomLocation(),
          section,
          category: cat.slug
        };
        shops.push(shop);
      }
    });
  });

  return shops;
};

// Usage
export const shops = generateShops(10); // generates 5 shops per category
