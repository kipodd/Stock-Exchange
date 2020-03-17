async function getCompanyDetails(symbol) {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
        const data = await response.json();
        displayCompanyData(data);
    } catch (error) {
        console.error(error);
    }
}

async function getGraph(symbol) {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`);
        const data = await response.json();
        displayGraph(data.historical);
    } catch (error) {
        console.error(error);
    }
}

function displayGraph(historicalPrice) {
    const ctx = document.getElementById('myChart').getContext('2d');
    console.log(historicalPrice);
    console.log(historicalPrice[0]);
    const dates = historicalPrice.map(x => x.date);
    const prices = historicalPrice.map(x => x.close);
    console.log(dates);
    const chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: dates,
            // labels: ["1992-12-16", "1992-12-17", "1992-12-18"],
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Stock Price History',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices
                // data: [0.12, 0.12, 0.1]
                // data: [0, 10, 5, 2, 20, 30, 45]
                // data: historicalPrice
            }]
        },

        // Configuration options go here
        options: {}
    });
}

function displayCompanyData(companyData) {
    const name = companyData.profile.companyName;
    const imageUrl = companyData.profile.image;
    const description = companyData.profile.description;
    const websiteUrl = companyData.profile.website;
    const price = companyData.profile.price;
    const changesPercentage = companyData.profile.changesPercentage;
    const industry = companyData.profile.industry;

    const imageElement = document.getElementById("companyImage");
    const nameElement = document.getElementById("companyName");
    const priceElement = document.getElementById("companyPrice");
    const changesPercentageElement = document.getElementById("changesPercentage");
    const descriptionElement = document.getElementById("companyDescription");

    const nameElementText = document.createTextNode(name + " (" + industry + ")");
    const priceElementText = document.createTextNode(price);
    const changesPercentageElementText = document.createTextNode(changesPercentage);
    const descriptionElementText = document.createTextNode(description);

    imageElement.setAttribute("src", imageUrl);
    nameElement.appendChild(nameElementText);
    nameElement.setAttribute("href", websiteUrl);
    priceElement.appendChild(priceElementText);
    changesPercentageElement.appendChild(changesPercentageElementText);
    descriptionElement.appendChild(descriptionElementText);

    if (changesPercentage.includes("+")) {
        changesPercentageElement.classList.add("text-success");
    } else if (changesPercentage.includes("-")){
        changesPercentageElement.classList.add("text-danger");
    }
}

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');
getCompanyDetails(symbol);
getGraph(symbol);