import { subCategoriesData } from '@/data/subCategoriesData';

interface CategoryCount {
    [key: string]: number;
}

export const getCategoryOptions = (selectedSection: string, categoryCounts: CategoryCount) => {
    const sectionCategories = subCategoriesData[selectedSection] || [];
    const totalCount = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

    const options = [{ value: 'all', label: 'All Categories', count: totalCount }];

    sectionCategories.forEach(category => {
        options.push({
            value: category.slug,
            label: category.name,
            count: categoryCounts[category.slug] || 0
        });
    });

    return options;
};

export const getSelectedCategoryName = (activeCategory: string, selectedSection: string) => {
    if (activeCategory === 'all') return 'All Categories';
    const category = subCategoriesData[selectedSection]?.find(cat => cat.slug === activeCategory);
    return category?.name || activeCategory;
};

export const getProductCount = (categorySlug: string, categoryCounts: CategoryCount) => {
    if (categorySlug === 'all') {
        return Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
    }
    return categoryCounts?.[categorySlug] || 0;
};
