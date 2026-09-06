export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  unit: string;
  category: string;
  description?: string;
  popular?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'flat' | 'house' | 'bath' | 'commercial';
  location: string;
  area: number;
  durationDays: number;
  cost: string;
  image: string;
  beforeImage?: string;
  description: string;
  worksDone: string[];
}

export interface DistrictInfo {
  id: string;
  name: string;
  etaMinutes: number;
  baseRadius: string;
  description: string;
  suburbs?: string[];
  popularStreets: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  workType: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface CalculatorState {
  area: number;
  propertyType: 'новостройка' | 'вторичка' | 'дом' | 'коммерция';
  renovationType: 'косметический' | 'капитальный' | 'новостройка' | 'премиум';
  includePlumbing: boolean;
  includeElectric: boolean;
  includeWelding: boolean;
  includeUnderfloorHeating: boolean;
  includeDemolition: boolean;
  includeMaterialsPurchase: boolean;
}
