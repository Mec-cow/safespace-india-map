// Sample NCRB-style data. Replace with real API later.
// Counts are illustrative (rates per lakh population).

export type CrimeCategory = "women" | "child" | "overall";

export interface CityCrime {
  id: number;
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number; // in lakhs
  women: number;
  child: number;
  overall: number;
}

export const CITIES: CityCrime[] = [
  { id: 1, name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, population: 190, women: 14158, child: 7110, overall: 30000 },
  { id: 2, name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, population: 184, women: 6176, child: 3200, overall: 22000 },
  { id: 3, name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: 132, women: 3924, child: 1500, overall: 18000 },
  { id: 4, name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: 110, women: 1800, child: 900, overall: 12000 },
  { id: 5, name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: 145, women: 2100, child: 1400, overall: 14000 },
  { id: 6, name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, population: 102, women: 3850, child: 1100, overall: 13000 },
  { id: 7, name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: 71, women: 2700, child: 950, overall: 9500 },
  { id: 8, name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: 84, women: 2400, child: 1200, overall: 11000 },
  { id: 9, name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: 40, women: 3500, child: 1700, overall: 10000 },
  { id: 10, name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: 36, women: 4500, child: 2200, overall: 13500 },
  { id: 11, name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, population: 30, women: 2900, child: 1500, overall: 9000 },
  { id: 12, name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, population: 26, women: 2300, child: 800, overall: 7500 },
  { id: 13, name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, population: 22, women: 2700, child: 1100, overall: 8000 },
  { id: 14, name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: 19, women: 3000, child: 1300, overall: 8800 },
  { id: 15, name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, population: 22, women: 2200, child: 1000, overall: 9500 },
  { id: 16, name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, population: 60, women: 1700, child: 700, overall: 6800 },
  { id: 17, name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, population: 20, women: 1400, child: 600, overall: 5500 },
  { id: 18, name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, population: 21, women: 900, child: 400, overall: 4200 },
  { id: 19, name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, population: 17, women: 1100, child: 500, overall: 4800 },
  { id: 20, name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, population: 11, women: 1300, child: 600, overall: 3800 },
  { id: 21, name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: 11, women: 2900, child: 1100, overall: 6500 },
  { id: 22, name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, population: 10, women: 1500, child: 700, overall: 4500 },
  { id: 23, name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, population: 11, women: 1200, child: 600, overall: 4000 },
  { id: 24, name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, population: 7, women: 800, child: 350, overall: 2800 },
  { id: 25, name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, population: 12, women: 700, child: 300, overall: 3200 },
  { id: 26, name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, population: 21, women: 1000, child: 450, overall: 4500 },
  { id: 27, name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, population: 22, women: 1200, child: 550, overall: 5000 },
  { id: 28, name: "Ludhiana", state: "Punjab", lat: 30.9, lng: 75.8573, population: 18, women: 1400, child: 600, overall: 5200 },
  { id: 29, name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, population: 17, women: 2600, child: 1100, overall: 7800 },
  { id: 30, name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: 15, women: 2400, child: 1000, overall: 7200 },
];
