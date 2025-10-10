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

export const getSelectedCategoryNames = (selectedCategories: string[], selectedSection: string) => {
    if (selectedCategories.length === 0) return 'All Categories';

    const categoryNames = selectedCategories.map(categorySlug => {
        const category = subCategoriesData[selectedSection]?.find(cat => cat.slug === categorySlug);
        return category?.name || categorySlug;
    });

    if (categoryNames.length === 1) {
        return categoryNames[0];
    } else if (categoryNames.length === 2) {
        return `${categoryNames[0]} & ${categoryNames[1]}`;
    } else {
        return `${categoryNames[0]} & ${categoryNames.length - 1} more`;
    }
};

export const getProductCount = (categorySlug: string, categoryCounts: CategoryCount) => {
    if (categorySlug === 'all') {
        return Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
    }
    return categoryCounts?.[categorySlug] || 0;
};

export const getSelectedCategoriesCount = (selectedCategories: string[], categoryCounts: CategoryCount) => {
    if (selectedCategories.length === 0) {
        return Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
    }

    return selectedCategories.reduce((total, categorySlug) => {
        return total + (categoryCounts[categorySlug] || 0);
    }, 0);
};