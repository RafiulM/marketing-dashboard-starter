import { readFileSync } from 'fs'
import { join } from 'path'

export interface OverviewMetrics {
  totalVisitors: number
  conversionRate: number
  totalRevenue: number
  avgOrderValue: number
  pageViews: number
  bounceRate: number
  sessionsPerUser: number
  avgSessionDuration: string
}

export interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversionRate: number
  revenue: number
}

export interface Campaign {
  id: number
  name: string
  type: string
  status: 'Active' | 'Completed' | 'Scheduled' | 'Paused'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  conversionRate: number
  revenue: number
  roas: number
}

export interface AgeGroup {
  range: string
  visitors: number
  percentage: number
}

export interface Gender {
  gender: string
  visitors: number
  percentage: number
}

export interface Country {
  country: string
  visitors: number
  percentage: number
}

export interface Demographics {
  ageGroups: AgeGroup[]
  genders: Gender[]
  topCountries: Country[]
}

export interface MonthlyData {
  month: string
  visitors: number
  revenue: number
  orders: number
  conversionRate: number
}

export interface TopPage {
  path: string
  title: string
  pageViews: number
  uniqueViews: number
  avgTimeOnPage: string
  bounceRate: number
}

export interface Device {
  type: string
  visitors: number
  percentage: number
}

export interface MarketingDashboardData {
  overview: OverviewMetrics
  trafficSources: TrafficSource[]
  campaigns: Campaign[]
  demographics: Demographics
  monthlyData: MonthlyData[]
  topPages: TopPage[]
  devices: Device[]
}

class DashboardDataLoader {
  private static instance: DashboardDataLoader
  private data: MarketingDashboardData | null = null

  private constructor() {}

  static getInstance(): DashboardDataLoader {
    if (!DashboardDataLoader.instance) {
      DashboardDataLoader.instance = new DashboardDataLoader()
    }
    return DashboardDataLoader.instance
  }

  async loadData(): Promise<MarketingDashboardData> {
    if (this.data) {
      return this.data
    }

    try {
      const dataPath = join(process.cwd(), 'app', 'dashboard', 'data.json')
      const fileContent = readFileSync(dataPath, 'utf8')
      this.data = JSON.parse(fileContent) as MarketingDashboardData
      return this.data
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      throw new Error('Failed to load dashboard data')
    }
  }

  getOverview(): OverviewMetrics | null {
    return this.data?.overview || null
  }

  getTrafficSources(): TrafficSource[] {
    return this.data?.trafficSources || []
  }

  getCampaigns(): Campaign[] {
    return this.data?.campaigns || []
  }

  getActiveCampaigns(): Campaign[] {
    return this.getCampaigns().filter(campaign => campaign.status === 'Active')
  }

  getDemographics(): Demographics | null {
    return this.data?.demographics || null
  }

  getMonthlyData(): MonthlyData[] {
    return this.data?.monthlyData || []
  }

  getTopPages(): TopPage[] {
    return this.data?.topPages || []
  }

  getDevices(): Device[] {
    return this.data?.devices || []
  }

  getTopTrafficSources(limit: number = 3): TrafficSource[] {
    return this.getTrafficSources()
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, limit)
  }

  getTopPerformingCampaigns(limit: number = 3): Campaign[] {
    return this.getCampaigns()
      .filter(campaign => campaign.status === 'Active' || campaign.status === 'Completed')
      .sort((a, b) => b.roas - a.roas)
      .slice(0, limit)
  }

  calculateTotalBudget(): number {
    return this.getCampaigns().reduce((total, campaign) => total + campaign.budget, 0)
  }

  calculateTotalSpent(): number {
    return this.getCampaigns().reduce((total, campaign) => total + campaign.spent, 0)
  }

  calculateTotalCampaignRevenue(): number {
    return this.getCampaigns().reduce((total, campaign) => total + campaign.revenue, 0)
  }
}

export const dashboardDataLoader = DashboardDataLoader.getInstance()

export async function getDashboardData(): Promise<MarketingDashboardData> {
  return await dashboardDataLoader.loadData()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`
}