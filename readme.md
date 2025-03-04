# Online Store - Frontend Developer Internship Assignment

This project is a responsive online store built as part of a Frontend Developer Internship assignment. The application allows users to browse products across multiple categories, view product varieties with different prices, filter and sort products, and add product varieties to a shopping cart with dynamic total calculations. The cart functionality also includes features like quantity modification, item removal, and checkout simulation, with cart data persisted using Local Storage.

## Features

- **Responsive Design:** Built with Bootstrap to ensure the layout works well on both desktop and mobile devices.
- **Product Browsing:** View a list of products with multiple varieties and associated prices (displayed in rupees).
- **Filtering and Sorting:** 
  - Filter products by category.
  - Search products by name.
  - Sort products by price (Low to High and High to Low).
- **Cart Functionality:**
  - Add product varieties to the cart.
  - Increase or decrease item quantities.
  - Remove items from the cart.
  - View the total price, which updates dynamically.
  - Persist cart data across sessions using Local Storage.
- **Checkout Simulation:** A checkout button that shows the final total in an alert message.

## Project Structure

- **index.html**: Contains the HTML markup for the Online store . It includes the layout for the navigation, filters, product list, and cart sections.
- **style.css**: Contains custom styles to complement Bootstrap and provide specific styling for product cards and cart items.
- **script.js**: Implements all the interactive functionality:
  - Fetching product data from an API (or using sample data as a fallback).
  - Dynamically rendering products and cart items.
  - Filtering, sorting, and searching.
  - Cart management and checkout functionality.

## Setup & Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/TejasSurse/Online-Store.git
   cd Online-Store
