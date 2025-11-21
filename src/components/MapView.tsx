import { MapPin, Navigation } from 'lucide-react';

interface Stop {
  id: string;
  city: string;
  address: string;
  event: string;
  date: string;
}

interface MapViewProps {
  stops: Stop[];
}

export function MapView({ stops }: MapViewProps) {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Route Visualization */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full h-full">
          {stops.map((stop, index) => {
            // Distribute stops across the map
            const x = 10 + (index * 70) / Math.max(stops.length - 1, 1);
            const y = 20 + Math.sin(index * 0.5) * 30 + Math.random() * 20;

            return (
              <div key={stop.id}>
                {/* Route Line */}
                {index < stops.length - 1 && (
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                  >
                    <line
                      x1={`${x}%`}
                      y1={`${y}%`}
                      x2={`${10 + ((index + 1) * 70) / Math.max(stops.length - 1, 1)}%`}
                      y2={`${20 + Math.sin((index + 1) * 0.5) * 30 + Math.random() * 20}%`}
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}

                {/* Stop Marker */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="relative group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                        index === 0
                          ? 'bg-green-500'
                          : index === stops.length - 1
                          ? 'bg-red-500'
                          : 'bg-blue-600'
                      }`}
                    >
                      {index === 0 ? (
                        <Navigation className="w-5 h-5 text-white" />
                      ) : (
                        <MapPin className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                        <p className="font-medium">{stop.city}</p>
                        <p className="text-sm text-gray-300">{stop.event || 'Stop'}</p>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-gray-700">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-gray-700">−</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-700">Start</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full" />
          <span className="text-gray-700">Stop</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-gray-700">Ziel</span>
        </div>
      </div>
    </div>
  );
}
