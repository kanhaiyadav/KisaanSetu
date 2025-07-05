import { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import Header from "../../components/DashboardHeader";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { TbShoppingBagCheck } from "react-icons/tb";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    LabelList,
    YAxis,
    Bar,
    BarChart,
    PieChart,
    Pie,
    Sector,
    Label,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { selectSales } from "../../redux/product/product.selector";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

const chartData2 = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig2 = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

const desktopData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
];
const chartConfig3 = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
    },
    mobile: {
        label: "Mobile",
    },
    january: {
        label: "January",
        color: "hsl(var(--chart-1))",
    },
    february: {
        label: "February",
        color: "hsl(var(--chart-2))",
    },
    march: {
        label: "March",
        color: "hsl(var(--chart-3))",
    },
    april: {
        label: "April",
        color: "hsl(var(--chart-4))",
    },
    may: {
        label: "May",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

const Dashboard = () => {
    const id = "pie-interactive";
    const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);
    const activeIndex = React.useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    );
    const months = React.useMemo(
        () => desktopData.map((item) => item.month),
        []
    );

    const sales = useSelector(selectSales);
    const [salesByDate, setSalesByDate] = useState<
        { date: string; totalSales: number }[]
    >([]);
    useEffect(() => {
        const salesByDate = sales.reduce(
            (
                acc: { [key: string]: { date: string; totalSales: number } },
                sale
            ) => {
                const date = new Date(sale.date).toISOString().split("T")[0]; // Format date to YYYY-MM-DD
                if (!acc[date]) {
                    acc[date] = { date: date, totalSales: 0 };
                }
                acc[date].totalSales += sale.total;
                return acc;
            },
            {}
        );
        const sortedSalesByDate = Object.values(salesByDate).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setSalesByDate(Object.values(sortedSalesByDate));
    }, [sales]);
    return (
        <main
            className={`flex-1 p-4 flex flex-col
            justify-items-center items-center gap-4`}
        >
            <div className="flex justify-between w-full gap-4">
                <DashboardCard heading={"Today's Summary"}>
                    <main className="flex justify-evenly w-full g-2">
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-red-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-red-500 rounded-full grid place-items-center text-white">
                                <FaIndianRupeeSign
                                    style={{ fontSize: "1.2rem" }}
                                />
                            </div>
                            <p className="text-xs md:text-lg text-gray-600">
                                Total Revenue
                            </p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">
                                5,600
                            </span>
                        </div>
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-green-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-green-500 rounded-full grid place-items-center text-white">
                                <TbShoppingBagCheck
                                    style={{ fontSize: "1.2rem" }}
                                />
                            </div>
                            <p className="text-xs md:text-lg text-gray-600">
                                Items Sold
                            </p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">
                                122
                            </span>
                        </div>
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-blue-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-blue-500 rounded-full grid place-items-center text-white">
                                <FiUserPlus style={{ fontSize: "1.2rem" }} />
                            </div>
                            <p className="text-xs md:text-lg text-gray-600">
                                New Customer
                            </p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">
                                10
                            </span>
                        </div>
                    </main>
                </DashboardCard>
                <DashboardCard heading={"Customer Reviews"}>
                    <div className="w-full h-[50px] bg-purple-100  rounded-lg"></div>
                    <div className="w-full h-[50px] bg-yellow-100  rounded-lg"></div>
                </DashboardCard>
            </div>

            <div className="flex justify-between w-full gap-4">
                <DashboardCard>
                    <ChartContainer config={chartConfig2}>
                        <BarChart
                            accessibilityLayer
                            data={chartData2}
                            layout="vertical"
                            margin={{
                                right: 16,
                            }}
                        >
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="month"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                hide
                            />
                            <XAxis dataKey="desktop" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Bar
                                dataKey="desktop"
                                layout="vertical"
                                fill="var(--color-desktop)"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="month"
                                    position="insideLeft"
                                    offset={8}
                                    className="fill-[--color-label]"
                                    fontSize={12}
                                />
                                <LabelList
                                    dataKey="desktop"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </DashboardCard>

                <DashboardCard>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="desktop"
                                fill="var(--color-desktop)"
                                radius={8}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </DashboardCard>

                <DashboardCard className="relative">
                    <Select value={activeMonth} onValueChange={setActiveMonth}>
                        <SelectTrigger
                            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 absolute top-4 right-4"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent align="end" className="rounded-xl">
                            {months.map((key) => {
                                const config =
                                    chartConfig[
                                        key as keyof typeof chartConfig
                                    ];
                                if (!config) {
                                    return null;
                                }
                                return (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className="rounded-lg [&_span]:flex"
                                    >
                                        <div className="flex items-center gap-2 text-xs">
                                            <span
                                                className="flex h-3 w-3 shrink-0 rounded-sm"
                                                style={{
                                                    backgroundColor: `var(--color-${key})`,
                                                }}
                                            />
                                            {config?.label}
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <ChartContainer
                        id={id}
                        config={chartConfig3}
                        className="mx-auto aspect-square w-full max-w-[250px] h-full"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={desktopData}
                                dataKey="desktop"
                                nameKey="month"
                                innerRadius={60}
                                strokeWidth={5}
                                activeIndex={activeIndex}
                                activeShape={({
                                    outerRadius = 0,
                                    ...props
                                }: PieSectorDataItem) => (
                                    <g>
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 10}
                                        />
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 25}
                                            innerRadius={outerRadius + 12}
                                        />
                                    </g>
                                )}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            "cx" in viewBox &&
                                            "cy" in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {desktopData[
                                                            activeIndex
                                                        ].desktop.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </DashboardCard>
            </div>

            <DashboardCard
                heading={"Revenue Over Time"}
                subHeading="Showing total visitors for the last 6 months"
                className={"col-span-full"}
            >
                <ChartContainer
                    config={chartConfig}
                    className="max-h-[400px] w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.5}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </DashboardCard>
        </main>
    );
};

export default Dashboard;
