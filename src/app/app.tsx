import React from 'react';
import './app.css';
import VehicleSelectBox from '../vehicleSelectBox/vehicleSelectBox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <VehicleSelectBox />
      </div>
    </QueryClientProvider>
  );
}

export default App;
