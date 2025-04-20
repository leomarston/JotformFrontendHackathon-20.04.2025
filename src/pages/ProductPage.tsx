import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/hooks/useProduct";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share, Minus, Plus, Truck, RefreshCw, Shield } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "@/components/ui/use-toast";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);
  const { data: products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Get related products (products from the same category)
  const relatedProducts = !isLoading && product && products
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  // Calculate discounted price
  const calculatePrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to Cart",
        description: `${product.name} (${quantity} ${quantity > 1 ? 'items' : 'item'}) has been added to your cart.`,
      });
    }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-shop-light">
        <Header />
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-4">
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-shop-light">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shop-light">
      <Header />
      
      <div className="container py-12">
        {/* Breadcrumbs */}
        <div className="text-sm mb-6 text-muted-foreground">
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>Home</span>
          {" > "}
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/products")}>Products</span>
          {" > "}
          <span className="hover:underline cursor-pointer" onClick={() => navigate(`/products?category=${product.category}`)}>{product.category}</span>
          {" > "}
          <span className="font-medium text-foreground">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl overflow-hidden p-6 border border-gray-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-shop-primary">
                    ${calculatePrice(product.price, product.discount).toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-shop-secondary">{product.discount}% OFF</Badge>
                </>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
                  <Minus size={16} />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 mb-8">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={() => toast({
                title: "Added to Wishlist",
                description: `${product.name} has been added to your wishlist.`,
              })}>
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Product Meta */}
            <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
              <div>
                <span className="font-medium text-foreground">Category: </span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Brand: </span>
                <span>{product.brand}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">SKU: </span>
                <span>{product.sku || `SKU-${product.id}`}</span>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-shop-primary" />
                <span className="text-sm">Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-shop-primary" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-shop-primary" />
                <span className="text-sm">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 bg-white rounded-b-lg border border-t-0">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Versatile design</li>
                  <li>Easy to maintain</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="p-6 bg-white rounded-b-lg border border-t-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="font-medium">Brand:</span> {product.brand}
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Model:</span> {product.model || "Standard"}
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Weight:</span> {product.weight || "1.2"} kg
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Dimensions:</span> {product.dimensions || "10 x 20 x 5"} cm
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Material:</span> {product.material || "Various"}
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Color:</span> {product.color || "Various"}
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Warranty:</span> 2 Years
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">In Box:</span> Product, Manual, Warranty Card
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-white rounded-b-lg border border-t-0">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to review this product</p>
                <Button>Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage;