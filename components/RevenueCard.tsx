import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
interface RevenueCardProps {
    title: string;
    amount: string;
    changePercentage: string;
    trendDirection: 'up' | 'down';
    description: string;
    footerText: string;
    footerDescription: string;
    className?: string;
}
export function RevenueCard({
    title = 'Total Revenue',
    amount = '$1,250.00',
    changePercentage = '+12.5%',
    trendDirection = 'up',
    description = 'Trending up this month',
    footerText = 'Visitors for the last 6 months',
    className = '',
}: Partial<RevenueCardProps>) {
    const TrendIcon =
        trendDirection === 'up' ? TrendingUpIcon : TrendingDownIcon;
    const trendColor =
        trendDirection === 'up' ? 'text-green-500' : 'text-red-500';

    return (
        <Card className={cn('@container/card', className)}>
            <CardHeader className="relative">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {amount}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge
                        variant="outline"
                        className={`flex gap-1 rounded-lg text-xs ${trendColor}`}>
                        <TrendIcon className="size-3" />
                        {changePercentage}
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {description} <TrendIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">{footerText}</div>
            </CardFooter>
        </Card>
    );
}
