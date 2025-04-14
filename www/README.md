# Campus Cuisine - Food Court Rating System

A web-based application for rating and reviewing campus food courts. This system allows users to browse, rate, and review different food courts and dishes across campus blocks.

## Project Structure

### Core Files
- `index.html` - Main landing page with project introduction
- `styles.css` - Main stylesheet for the project
- `script.js` - Main JavaScript file

### Authentication System
- `login.php` - User login functionality
- `signup.php` - New user registration
- `logout.php` - Session termination
- `activate.php` - Account activation via email
- `get_user.php` - Retrieves current user session info
- `connection.php` - Database connection configuration

### Data Files
- `blocks.json` - Contains information about campus blocks including:
  - Block details (name, description, capacity)
  - Number of food courts
  - Visual styling (gradient colors, icons)

- `foodCourts.json` - Contains detailed information about food courts including:
  - Food court details (name, image, cuisines)
  - Menu items with prices and descriptions
  - Specialties and categories

### Explore Interface
- `explore.html` - Single page application entry point
- `explore.css` - Styling for the explore interface including:
  - Navigation layout
  - Block cards design
  - Responsive grid system
  - Profile view styling
- `explore.js` - Main application logic including:
  - Dynamic block card generation
  - Food court navigation
  - User profile management
  - Data fetching and rendering

### Food Court Interface
- `foodCourt.html` - Food court listing page
- `foodCourt.js` - Food court functionality:
  - Dynamic loading of food courts
  - Navigation between blocks and courts
  - User profile integration
- `foodCourt.css` - Food court styling:
  - Responsive grid layout
  - Card-based design
  - Navigation sidebar

### Dish Management
- `dishes.html` - Individual dish display page
- `dishes.js` - Dish functionality:
  - Dish card generation
  - Rating system
  - Review management
  - Real-time updates
  - Modal-based review interface
- `dishes.css` - Dish styling:
  - Card layouts
  - Rating stars
  - Review modal design
  - Responsive grid system

### Database Configuration
- Server: localhost
- Port: 3307
- Database: campuscuisine
- Username: root

## Features

1. User Authentication
   - User registration with email verification
   - Secure login system
   - Session management
   - Password encryption using BCrypt

2. User Interface
   - Modern, responsive design using Tailwind CSS
   - Clean and intuitive navigation
   - Mobile-friendly layout

3. Security Features
   - Password hashing
   - Email verification
   - Session management
   - SQL injection prevention

4. Explore Interface
   - Block Navigation
     - Visual cards for each campus block
     - Dynamic loading of block information
     - Smooth transitions between views

   - Food Court Browsing
     - Detailed food court information
     - Menu item browsing
     - Price and description display

   - User Interface
     - Responsive navigation sidebar
     - Quick filters for food types
     - User profile management
     - Modern gradient-based design

5. Rating and Review System
   - Star-based rating interface
   - User reviews with timestamps
   - Real-time rating updates
   - Modal-based review submission
   - Review history display

6. User Experience
   - Responsive navigation
   - Interactive card interfaces
   - Smooth transitions
   - Profile management
   - Session-based interactions

## Dependencies

- PHP 7.4+
- MySQL/MariaDB
- XAMPP Server
- Tailwind CSS (via CDN)
- Remix Icons (via CDN)
- Google Fonts

## Database Schema

### Registration Table
- name
- username
- email
- password
- confirmPassword
- token
- status

## Setup Instructions

1. Install XAMPP
2. Clone repository to htdocs folder
3. Import database schema
4. Configure database connection in `connection.php`
5. Start Apache and MySQL services
6. Access via localhost/campusCusine/prac/task5
