"use client";

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  PageTransition, 
  StaggerContainer, 
  StaggerItem,
  FadeInUp,
  CountUp,
} from "@/components/motion";
import { AnimatedCard, StatCard } from "@/components/interactive";

// ============================================
// STATS CARDS
// ============================================
function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: 45231,
      prefix: "$",
      change: 20.1,
      isPositive: true,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Active Users",
      value: 2350,
      change: 10.5,
      isPositive: true,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Conversion Rate",
      value: 3.2,
      suffix: "%",
      change: -2.4,
      isPositive: false,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Avg. Order Value",
      value: 89,
      prefix: "$",
      change: 5.7,
      isPositive: true,
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  return (
    <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StaggerItem key={index}>
          <AnimatedCard>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </span>
              <div className="text-muted-foreground">{stat.icon}</div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">
                {stat.prefix}
                <CountUp end={stat.value} />
                {stat.suffix}
              </span>
              <span className={`flex items-center text-sm font-medium ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              }`}>
                {stat.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              from last month
            </p>
          </AnimatedCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

// ============================================
// CHART PLACEHOLDER
// ============================================
function ChartPlaceholder({ title }: { title: string }) {
  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
        <span className="text-muted-foreground">Chart goes here</span>
      </div>
    </AnimatedCard>
  );
}

// ============================================
// RECENT ACTIVITY
// ============================================
function RecentActivity() {
  const activities = [
    { id: 1, user: "John Doe", action: "Created new project", time: "2 min ago" },
    { id: 2, user: "Jane Smith", action: "Updated settings", time: "1 hour ago" },
    { id: 3, user: "Bob Johnson", action: "Completed task", time: "3 hours ago" },
    { id: 4, user: "Alice Brown", action: "Added new member", time: "5 hours ago" },
    { id: 5, user: "Charlie Wilson", action: "Exported data", time: "1 day ago" },
  ];

  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <StaggerContainer className="space-y-4">
        {activities.map((activity) => (
          <StaggerItem 
            key={activity.id}
            className="flex items-center gap-4"
          >
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">
                {activity.user.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.user}</p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.action}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedCard>
  );
}

// ============================================
// TOP ITEMS TABLE
// ============================================
function TopItemsTable() {
  const items = [
    { name: "Product A", sales: 1234, revenue: 12340, change: 12.5 },
    { name: "Product B", sales: 987, revenue: 9870, change: -5.2 },
    { name: "Product C", sales: 756, revenue: 7560, change: 8.1 },
    { name: "Product D", sales: 543, revenue: 5430, change: 15.7 },
    { name: "Product E", sales: 321, revenue: 3210, change: -2.3 },
  ];

  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Top Products</h3>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                Product
              </th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                Sales
              </th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                Revenue
              </th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-3 text-sm font-medium">{item.name}</td>
                <td className="py-3 text-sm text-right">
                  {item.sales.toLocaleString()}
                </td>
                <td className="py-3 text-sm text-right">
                  ${item.revenue.toLocaleString()}
                </td>
                <td className={`py-3 text-sm text-right ${
                  item.change > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {item.change > 0 ? "+" : ""}{item.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnimatedCard>
  );
}

// ============================================
// FULL DASHBOARD PAGE
// ============================================
export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-6 p-6">
        {/* Header */}
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here&apos;s an overview of your business.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export</Button>
              <Button>Add New</Button>
            </div>
          </div>
        </FadeInUp>

        {/* Stats */}
        <DashboardStats />

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <FadeInUp delay={0.1}>
            <ChartPlaceholder title="Revenue Over Time" />
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <ChartPlaceholder title="User Growth" />
          </FadeInUp>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <FadeInUp delay={0.3}>
            <RecentActivity />
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <TopItemsTable />
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
}
