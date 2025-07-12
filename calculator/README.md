# Distance Calculator

A React-based web application that calculates the straight-line distance between two locations using addresses or coordinates. Built with the OpenCage Geocoding API for address-to-coordinate conversion and the Haversine formula for distance calculation, this app features a modern, responsive UI with Material-UI components and a vibrant design.

## Features

- **Address or Coordinate Input**: Enter addresses (e.g., "New York, NY") or latitude/longitude coordinates to calculate distances.
- **Geocoding**: Converts addresses to coordinates using the OpenCage Geocoding API.
- **Reverse Geocoding**: Displays resolved addresses for entered coordinates.
- **Distance Calculation**: Computes straight-line distance in kilometers and miles using the Haversine formula.
- **Responsive Design**: Optimized for desktop and mobile with a sleek blue-cyan gradient and map background.
- **Error Handling**: Validates inputs and displays clear error messages.
- **Loading State**: Shows a loading spinner during API calls.
- **Animations**: Smooth fade-in and slide-in effects for a polished user experience.

## Live Demo

[Try the Distance Calculator](https://distance-calculator-omega.vercel.app/)

## Technologies

- **Frontend**: React, Material-UI, CSS
- **API**: OpenCage Geocoding API
- **Build Tool**: Create React App (CRA)
- **Deployment**: Vercel

## Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ConradPB/distance-calculator.git
   cd distance-calculator
   ```

2. Install Dependencies

   yarn install

3. Set Up Environment Variables
   Create a .env file in the project root.

Add your OpenCage API key:

env
Copy
Edit
REACT_APP_OPENCAGE_API_KEY=your_opencage_api_key
You can get a free API key from OpenCage (2,500 requests/day).

4. Run Locally
   bash
   Copy
   Edit
   yarn start
   Open http://localhost:3000 in your browser.

5. Build for Production
   bash
   Copy
   Edit
   yarn build
   Deployment
   Deploy on Vercel
   Install the Vercel CLI:

bash
Copy
Edit
npm install -g vercel
Deploy:

bash
Copy
Edit
vercel
Configure environment variables in Vercel’s dashboard:

vbnet
Copy
Edit
Key: REACT_APP_OPENCAGE_API_KEY
Value: Your OpenCage API key
Set build settings:

yaml
Copy
Edit
Build Command: react-scripts build
Output Directory: build
Usage
Enter addresses (e.g., "New York, NY" and "London, UK") or coordinates (e.g., 40.7128, -74.0060 for New York).

Click "Calculate Distance" to see the distance in kilometers and miles.

If coordinates are entered without addresses, the app displays reverse-geocoded addresses.

Error messages guide users for invalid inputs or API failures.

Screenshots
![Distance Calculator Screenshot](public/screenshots/Screenshot%202025-07-11%20at%206.23.34%20PM.png)

## Contributing

Feel free to submit issues or pull requests to improve the app.
Contact me at cpbmbaz57@gmail.com for feedback or collaboration.

## License

MIT License (see LICENSE)

Built by Conrad Bugingo
