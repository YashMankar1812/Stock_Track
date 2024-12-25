# 📈 Responsive Stock Tracker Dashboard

## Overview
The Responsive Stock Tracker Dashboard is a web application that allows users to view real-time stock data, compare stock performance, and visualize stock price trends through interactive graphs. Built with HTML, CSS, JavaScript, and external APIs, the dashboard provides a seamless experience for exploring the financial market.

## Key Features

### 1. Stock Search
- Users can search for any stock (e.g., AAPL, MSFT) by symbol.
- Retrieve detailed information like price, volume, and price changes.
- Display a graph showing the stock’s historical performance.

### 2. Trending Stocks Dropdown
- A dropdown menu lists the top 10 trending stocks.
- Users can select a stock from the list and view its current data and graph.

### 3. Stock Price Visualization
- Stock prices are visualized in a line graph, providing users with a clear view of trends over time.

### 4. Comparison Table
- A dynamic table allows users to compare selected stocks based on price, change, and volume.

## Technology Stack

### Frontend
- **HTML5**: For structuring the content.
- **Tailwindcss**: For styling and responsive design.
- **JavaScript**: For DOM manipulation, API requests, and interactivity.

### Libraries and APIs
- **Chart.js**: For displaying stock data in a graph format.
- **Alpha Vantage API**: For retrieving real-time stock information.

## Implementation Details

### User Interface
- **Responsive Design**: Ensures the interface works well on different screen sizes, from desktops to mobile devices.
- **Interactive Elements**: Includes a search bar, dropdown menu, and dynamic table for enhanced user engagement.

### API Integration
- Use the Fetch API to handle asynchronous requests to the Alpha Vantage API.
- Parse and dynamically update the webpage with stock information based on user inputs and API responses.

### Graphical Representation
- Use Chart.js to create intuitive line graphs that display stock price trends.

## Installation and Usage

### Prerequisites
- A modern web browser.
- A text editor or IDE for code customization.
- An active Alpha Vantage API key.

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd responsive-stock-tracker
   ```
3. Open `index.html` in a web browser to view the application.



## Example Features
- **Search Bar**: Type a stock symbol (e.g., "AAPL") to fetch and display its real-time data.
- **Dropdown Menu**: Select from the top 10 trending stocks.
- **Graph Visualization**: View a historical performance graph.
- **Dynamic Table**: Compare selected stocks with relevant data.

## Expected Deliverables
1. A fully functional stock dashboard with a responsive UI.
2. A dropdown for selecting trending stocks.
3. Real-time stock data displayed in tables and graphs.
4. Clean, well-organized code that is easy to understand and extend.

## License
This project is licensed under the MIT License.

## Authors
- **Yash Mankar** - Developer and Designer
