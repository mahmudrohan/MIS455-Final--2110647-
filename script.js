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