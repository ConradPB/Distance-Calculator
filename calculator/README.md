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
