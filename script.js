async function fetchCountryData() {
  // Clear previous results
  document.getElementById('countryResults').innerHTML = '';
  document.getElementById('errorMessage').innerHTML = '';

  // Get country name from input
  const countryName = document.getElementById('countryInput').value.trim();
  if (!countryName) {
    document.getElementById('errorMessage').innerHTML = 'Please enter a country name.';
    return;
  }

  try {
    // Replace spaces with %20 for proper URL formatting
    const formattedCountryName = countryName.replace(/\s+/g, '%20'); 

     // Fetch country data from API
    const response = await fetch(`https://restcountries.com/v3.1/name/${formattedCountryName}`);
    if (!response.ok) throw new Error('Country not found');

    const data = await response.json();
    displayCountryData(data[0]);
  } catch (error) {
    document.getElementById('errorMessage').innerHTML = 'Country not found. Please try again.';
  }
}

function displayCountryData(country) {
  const countryResultsDiv = document.getElementById('countryResults');
  
  const countryInfo = document.createElement('div');
  countryInfo.classList.add('country-info');

  countryInfo.innerHTML = `
    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
    <h3>${country.name.common}</h3>
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
    <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
    <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
  `;

  countryResultsDiv.appendChild(countryInfo);
}