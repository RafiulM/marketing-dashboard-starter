import { Suspense } from "react"
import { getDashboardData, formatCurrency, formatNumber, formatPercentage } from "@/lib/dashboard-data"
import { IconTrendingUp, IconTrendingDown, IconUsers, IconMouse, IconCurrencyDollar, IconPercentage } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function DashboardContent() {
  const data = await getDashboardData()
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Visitors</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatNumber(data.overview.totalVisitors)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +{formatPercentage(12.5)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Growing steadily <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Total unique visitors this period
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatPercentage(data.overview.conversionRate)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +{formatPercentage(0.4)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Above industry average <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Percentage of visitors who convert
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatCurrency(data.overview.totalRevenue)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +{formatPercentage(18.3)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong revenue growth <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Total revenue generated this period
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Avg Order Value</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatCurrency(data.overview.avgOrderValue)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +{formatPercentage(5.2)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Increasing customer value <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Average value per order
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Traffic Sources Table */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Breakdown of visitor traffic by source
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Visitors</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                  <TableHead className="text-right">Conversion Rate</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.trafficSources.map((source) => (
                  <TableRow key={source.source}>
                    <TableCell className="font-medium">{source.source}</TableCell>
                    <TableCell className="text-right">{formatNumber(source.visitors)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(source.percentage)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(source.conversionRate)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(source.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Active Campaigns Table */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>
              Current marketing campaign performance
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Spent</TableHead>
                  <TableHead className="text-right">Conversions</TableHead>
                  <TableHead className="text-right">ROAS</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.campaigns.filter(c => c.status === 'Active').map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(campaign.budget)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(campaign.spent)}</TableCell>
                    <TableCell className="text-right">{formatNumber(campaign.conversions)}</TableCell>
                    <TableCell className="text-right">{campaign.roas.toFixed(1)}x</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{campaign.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Top Pages Performance */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited pages and their performance
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Page Views</TableHead>
                  <TableHead className="text-right">Unique Views</TableHead>
                  <TableHead className="text-right">Avg Time</TableHead>
                  <TableHead className="text-right">Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topPages.slice(0, 5).map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-right">{formatNumber(page.pageViews)}</TableCell>
                    <TableCell className="text-right">{formatNumber(page.uniqueViews)}</TableCell>
                    <TableCell className="text-right">{page.avgTimeOnPage}</TableCell>
                    <TableCell className="text-right">{formatPercentage(page.bounceRate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="@container/card">
              <CardHeader>
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-8 bg-muted rounded w-32"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}