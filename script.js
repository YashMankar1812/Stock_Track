const apiKey = '4GCOL8C3KI7YNJ07';

const stockInput = document.getElementById('stockInput');
const searchBtn = document.getElementById('searchBtn');
const stockSelector = document.getElementById('stockSelector');
const stockLoadBtn = document.getElementById('stockLoadBtn');
const detailsCard = document.getElementById('detailsCard');
const comparisonTableBody = document.getElementById('comparisonTable').getElementsByTagName('tbody')[0];
const priceChartCanvas = document.getElementById('priceChart').getContext('2d');

let stockChart;

// Fetch stock data from Alpha Vantage API
async function getStockData(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`);
        const data = await response.json();
        return data['Time Series (Daily)'];
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

// Populate the dropdown with predefined stock symbols
function populateDropdown() {
    const trendingStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'BABA', 'INTC'];
    trendingStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        stockSelector.appendChild(option);
    });
}

// Display stock details in the details section
function displayStockDetails(stockData, symbol) {
    const latestDate = Object.keys(stockData)[0];
    const latestData = stockData[latestDate];
    const price = latestData['4. close'];
    const volume = latestData['5. volume'];
    const previousClose = stockData[Object.keys(stockData)[1]]['4. close'];
    const change = (price - previousClose).toFixed(2);

    detailsCard.innerHTML = `
        <h3>${symbol}</h3>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Change:</strong> $${change}</p>
        <p><strong>Volume:</strong> ${volume}</p>
    `;

    updateComparisonTable(symbol, price, change, volume);
}

// Update the comparison table with the latest stock data
function updateComparisonTable(symbol, price, change, volume) {
    const newRow = comparisonTableBody.insertRow();
    newRow.innerHTML = `
        <td>${symbol}</td>
        <td>$${price}</td>
        <td>${change}</td>
        <td>${volume}</td>
    `;
}

// Display stock price chart
function displayStockGraph(stockData) {
    const labels = Object.keys(stockData).slice(0, 30).reverse();
    const data = labels.map(date => stockData[date]['4. close']);

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(priceChartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const stockSymbol = stockInput.value.trim().toUpperCase();
    if (!stockSymbol) {
        alert('Please enter a stock symbol.');
        return;
    }

    const stockData = await getStockData(stockSymbol);
    if (stockData) {
        displayStockDetails(stockData, stockSymbol);
        displayStockGraph(stockData);
    } else {
        detailsCard.innerHTML = `<p>Stock symbol not found. Please try again.</p>`;
    }
});

// Event listener for load stock button
stockLoadBtn.addEventListener('click', async () => {
    const selectedStock = stockSelector.value;
    if (!selectedStock) {
        alert('Please select a stock from the dropdown.');
        return;
    }

    const stockData = await getStockData(selectedStock);
    if (stockData) {
        displayStockDetails(stockData, selectedStock);
        displayStockGraph(stockData);
    } else {
        detailsCard.innerHTML = `<p>Stock data not available for ${selectedStock}.</p>`;
    }
});

// Initialize the dropdown with predefined stocks
populateDropdown();
