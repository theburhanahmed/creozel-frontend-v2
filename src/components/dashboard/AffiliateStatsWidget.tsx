import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DollarSignIcon, UsersIcon, TrendingUpIcon, ArrowUpIcon, ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const AffiliateStatsWidget: React.FC = () => {
  const stats = [{
    label: 'Total Earnings',
    value: '$2,847',
    change: '+18.2%',
    isPositive: true,
    icon: <DollarSignIcon size={18} className="text-green-400" />
  }, {
    label: 'Referrals',
    value: '156',
    change: '+12',
    isPositive: true,
    icon: <UsersIcon size={18} className="text-blue-400" />
  }, {
    label: 'Conversion',
    value: '8.4%',
    change: '+2.1%',
    isPositive: true,
    icon: <TrendingUpIcon size={18} className="text-purple-400" />
  }];
  return <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/50 dark:border-gray-700/50">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <DollarSignIcon size={20} className="text-green-500" />
            </div>
            Affiliate Stats
          </h3>
          <Link to="/affiliate">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon size={14} />} className="text-green-500 hover:text-green-600">
              Details
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {stats.map((stat, index) => <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/30 dark:to-transparent border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg ${stat.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {stat.isPositive && <ArrowUpIcon size={14} />}
              {stat.change}
            </div>
          </div>)}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <SparklesIcon size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Boost Your Earnings
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Share your unique referral link and earn up to 30% commission
                </p>
              </div>
            </div>
            <Link to="/affiliate">
              <Button variant="primary" size="sm" className="w-full justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>;
};