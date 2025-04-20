import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "@/components/ProductCard";
import SaleCountdown from "@/components/SaleCountdown";
import CategoryCard from "@/components/CategoryCard";
import { useProducts } from "@/hooks/useProducts";

const IndexPage = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  
  // Get featured products (first 6)
  const featuredProducts = products?.slice(0, 6) || [];
  
  // Get new arrivals (random 4)
  const newArrivals = products
    ? [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
    : [];
    
  // Get sale products (products with discount)
  const saleProducts = products
    ? products
        .filter((product) => product.discount && product.discount > 0)
        .slice(0, 6)
    : [];

  // Categories
  const categories = [
    { id: 1, name: "Electronics", image: "/categories/electronics.webp", slug: "electronics" },
    { id: 2, name: "Fashion", image: "/categories/fashion.webp", slug: "fashion" },
    { id: 3, name: "Home & Garden", image: "/categories/home.webp", slug: "home-garden" },
    { id: 4, name: "Beauty", image: "/categories/beauty.webp", slug: "beauty" },
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-shop-light">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-shop-primary h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-shop-dark/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center transform scale-105 opacity-50"></div>
        
        <div className="container h-full flex items-center relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Spring Collection <br/>Now Available</h1>
            <p className="text-xl mb-8 opacity-90">Discover the latest trends and elevate your style with our exclusive spring collection.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/products")} className="bg-white text-shop-primary hover:bg-white/90 hover:text-shop-primary font-medium">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => navigate(`/products?category=${category.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" onClick={() => navigate("/products")}>
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-[300px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Sale Banner */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-shop-primary/10">
          <div className="container">
            <div className="bg-gradient-to-r from-shop-primary to-shop-secondary rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="p-8 lg:p-12">
                  <span className="inline-block bg-white px-4 py-1 rounded-full text-shop-primary font-medium text-sm mb-4">
                    Limited Time Offer
                  </span>
                  <h2 className="text-4xl text-white font-bold mb-4">End of Season Sale</h2>
                  <p className="text-white/80 text-lg mb-6">Get up to 50% off on selected items.</p>
                  
                  <div className="mb-8">
                    <SaleCountdown />
                  </div>
                  
                  <Button size="lg" onClick={() => navigate("/products")} className="bg-white text-shop-primary hover:bg-white/90">
                    Shop the Sale
                  </Button>
                </div>
                
                <div className="p-8 lg:p-0 hidden lg:block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-l-2xl">
                    <img 
                      src="/sale-banner.webp" 
                      alt="Sale Banner" 
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sale Products Carousel */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">On Sale Now</h3>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg p-4 border border-gray-200 bg-white">
                <div className="flex space-x-6 pb-2">
                  {saleProducts.map((product) => (
                    <div key={product.id} className="w-[300px] shrink-0">
                      <ProductCard product={product} variant="horizontal" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>
      )}
      
      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-[350px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/products")}
              className="border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default IndexPage;