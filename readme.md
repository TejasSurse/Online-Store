# Online Store - Frontend Developer Internship Assignment

This project is a responsive online store developed as part of a Frontend Developer Internship assignment. It enables users to browse various products, view detailed product varieties (with prices displayed in rupees), filter and sort products, and manage a shopping cart with dynamic total calculations. The cart supports quantity adjustments, item removal, and a checkout simulation, with data persisted using Local Storage.

## Live Preview

Check out the live demo on GitHub Pages:  
[Online Store Live Preview](https://TejasSurse.github.io/Online-Store/)

## Features

- **Responsive Design:** Utilizes Bootstrap for an optimal experience on desktops, tablets, and mobile devices.
- **Product Browsing:** View a range of products, each offering multiple varieties with individual prices.
- **Filtering & Sorting:**
  - Filter products by category.
  - Search for products by name.
  - Sort products by price (Low to High and High to Low).
- **Shopping Cart Functionality:**
  - Add product varieties to the cart.
  - Adjust item quantities using increase/decrease controls.
  - Remove items from the cart.
  - Real-time total price calculations.
  - Cart data is persisted across sessions using Local Storage.
- **Checkout Simulation:** A checkout button that simulates the final purchase process by displaying the total amount.

## Project Structure

- **index.html:**  
  Contains the HTML markup for the online store, including the navigation bar, filters, product list, and cart sections.

- **style.css:**  
  Provides custom styles that complement Bootstrap, with specific emphasis on styling product cards and cart items.

- **script.js:**  
  Implements the interactive functionality, including:
  - Fetching product data from an API (with sample data as a fallback).
  - Dynamically rendering products and cart items.
  - Filtering, searching, and sorting products.
  - Managing the shopping cart and simulating checkout.

## Setup & Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/TejasSurse/Online-Store.git
   cd Online-Store
