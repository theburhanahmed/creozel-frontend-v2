import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Heading3, BodyText } from '../ui/Typography';
import { DollarSignIcon, TrendingUpIcon, UsersIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const AffiliateStatsWidget = () => {
  return <Card className="overflow-hidden border-amber-200/20 dark:border-amber-500/20">
      <CardHeader className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-200/20 dark:border-amber-500/20">
        <div className="flex items-center">
          <DollarSignIcon size={18} className="text-amber-500 mr-2" />
          <Heading3 className="text-lg">Affiliate Program</Heading3>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          Active
        </span>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center text-amber-600 dark:text-amber-400 mb-1">
              <DollarSignIcon size={14} className="mr-1" />
              <span className="text-xs font-medium">Earnings</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                $1,245
              </span>
              <span className="ml-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon size={12} className="mr-0.5" />
                +12.5%
              </span>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center text-amber-600 dark:text-amber-400 mb-1">
              <UsersIcon size={14} className="mr-1" />
              <span className="text-xs font-medium">Referrals</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                24
              </span>
              <span className="ml-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon size={12} className="mr-0.5" />
                +8.3%
              </span>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-200/20 dark:border-amber-500/20">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-2">
              <span className="text-xs font-bold">!</span>
            </div>
            <BodyText className="text-sm font-medium">Affiliate Tip</BodyText>
          </div>
          <BodyText className="text-xs text-gray-600 dark:text-gray-400">
            Share your unique referral link on social media to increase your
            earnings. Each new signup earns you $25!
          </BodyText>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-t border-amber-200/20 dark:border-amber-500/20">
        <Button variant="outline" className="w-full justify-center border-amber-300/30 dark:border-amber-500/30 hover:bg-amber-500/10" rightIcon={<ArrowRightIcon size={14} />} href="/affiliate">
          View Affiliate Dashboard
        </Button>
      </CardFooter>
    </Card>;
};