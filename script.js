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
async function fetchStockData(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`);
        const data = await response.json();
        if (!data['Time Series (Daily)']) {
            throw new Error(`No data found for ${stockSymbol}`);
        }
        return data['Time Series (Daily)'];
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

// Populate the dropdown with predefined stock symbols
function initializeDropdown(stocks) {
    stocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        stockSelector.appendChild(option);
    });
}

// Display stock details in the details section
function renderStockDetails(stockData, symbol) {
    const [latestDate, previousDate] = Object.keys(stockData).slice(0, 2);
    const latestData = stockData[latestDate];
    const previousData = stockData[previousDate];

    const price = parseFloat(latestData['4. close']).toFixed(2);
    const previousClose = parseFloat(previousData['4. close']).toFixed(2);
    const change = (price - previousClose).toFixed(2);
    const volume = parseInt(latestData['5. volume']).toLocaleString();

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
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${symbol}</td>
        <td>$${price}</td>
        <td>${change}</td>
        <td>${volume}</td>
    `;
    comparisonTableBody.appendChild(newRow);
}

// Display stock price chart
function renderStockChart(stockData) {
    const labels = Object.keys(stockData).slice(0, 30).reverse();
    const data = labels.map(date => parseFloat(stockData[date]['4. close']));

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(priceChartCanvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Stock Price',
                data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.2,
                fill: false,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Price (USD)' } },
            },
        },
    });
}

// Handle stock search or selection
async function handleStockAction(stockSymbol) {
    if (!stockSymbol) {
        alert('Please provide a stock symbol.');
        return;
    }

    const stockData = await fetchStockData(stockSymbol);
    if (stockData) {
        renderStockDetails(stockData, stockSymbol);
        renderStockChart(stockData);
    } else {
        detailsCard.innerHTML = `<p>Data not available for ${stockSymbol}. Please try another stock.</p>`;
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const stockSymbol = stockInput.value.trim().toUpperCase();
    handleStockAction(stockSymbol);
});

stockLoadBtn.addEventListener('click', () => {
    const stockSymbol = stockSelector.value;
    handleStockAction(stockSymbol);
});

// Initialize
initializeDropdown(['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'BABA', 'INTC']);
