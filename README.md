# JotForm Shop Vista

## Overview
JotForm Shop Vista is a modern e-commerce platform showcasing the integration capabilities of JotForm with a React-based frontend application. This project demonstrates how effectively JotForm's form data can be utilized to build a complete shopping experience.

## Features
- **Product Browsing**: View all products with filtering and search capabilities
- **Product Details**: Detailed product pages with specifications and images
- **Shopping Cart**: Add, remove, and adjust quantities of products
- **Checkout Process**: Multi-step checkout with form validation
- **Responsive Design**: Optimized for all device sizes

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: JotForm API for product data

## Installation

```bash
# Clone the repository
git clone https://github.com/leomarston/jotform-shop-vista.git

# Navigate to the project directory
cd jotform-shop-vista

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context for state management
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── pages/          # Main page components
├── services/       # API services and data fetching
└── types/          # TypeScript type definitions
```

## Usage

1. **Browse Products**: Navigate through the product catalog on the homepage
2. **View Details**: Click on any product to see detailed information
3. **Add to Cart**: Add products to your cart from the product page or catalog
4. **Checkout**: Complete the purchase through the multi-step checkout process

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Credits
Built using JotForm API for the Jotform Frontend Hackathon.