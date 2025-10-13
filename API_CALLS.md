| File | Client | Method | Endpoint | Data |
| --- | --- | --- | --- | --- |
| src/app/cart/page.tsx | apiClient | GET | /api/products | { params: { limit: 10 } } |
| src/app/cart/page.tsx | — | GET | /api/products | — |
| src/app/products/[id]/page.tsx | apiClient | GET | /api/products/${id} | — |
| src/app/products/[id]/page.tsx | apiClient | GET | /api/products | — |
| src/app/products/[id]/page.tsx | — | GET | /api/products/${id} | — |
| src/app/products/[id]/page.tsx | — | GET | /api/products | — |
| src/app/search/page.tsx | apiClient | GET | /api/mock-search | { params: { q: query, category }, } |
| src/app/search/page.tsx | — | GET | /api/mock-search | — |
| src/components/landing/main/Advertisments.tsx | apiClient | GET | /api/advertisements?section=${activeSection} | { signal: abortController.signal } |
| src/components/landing/main/Advertisments.tsx | — | GET | /api/advertisements?section=${activeSection} | — |
| src/components/landing/main/ShopsProductsSection.tsx | apiClient | GET | /api/shops?section=${activeSection}&category=${selectedCategory.slug} | — |
| src/components/landing/main/ShopsProductsSection.tsx | apiClient | GET | /api/products?section=${activeSection}&category=${selectedCategory.slug} | — |
| src/components/landing/main/ShopsProductsSection.tsx | — | GET | /api/shops?section=${activeSection}&category=${selectedCategory.slug} | — |
| src/components/landing/main/ShopsProductsSection.tsx | — | GET | /api/products?section=${activeSection}&category=${selectedCategory.slug} | — |
| src/components/landing/main/TrendingShops.tsx | apiClient | GET | /api/trending-shops?section=${activeSection} | — |
| src/components/landing/main/TrendingShops.tsx | — | GET | /api/trending-shops?section=${activeSection} | — |
| src/components/login/GenderPopup.tsx | fetch | POST | /api/user/gender | { // method: 'POST', // headers: { 'Content-Type': 'application/json' }, // body: JSON.stringify({ /... |
| src/components/login/GenderPopup.tsx | — | GET | /api/user/gender | — |
| src/components/login/OTPForm.tsx | fetch | POST | /api/verify-otp | { // method: 'POST', // headers: { 'Content-Type': 'application/json' }, // body: JSON.stringify({ /... |
| src/components/login/OTPForm.tsx | — | GET | /api/verify-otp | — |
| src/components/product/CustomerReviews.tsx | apiClient | GET | /api/products/${productId}/reviews | — |
| src/components/product/CustomerReviews.tsx | — | GET | /api/products/${productId}/reviews | — |
| src/services/cartService.ts | — | GET | /api/cart | — |
| src/services/productService.ts | apiClient | GET | /api/products | { params } |
| src/services/productService.ts | fetch | GET | /api/products?shopId=${shopId}&section=${section} | — |
| src/services/productService.ts | — | GET | /api/products | — |
| src/services/productService.ts | — | GET | /api/products?shopId=${shopId}&section=${section} | — |