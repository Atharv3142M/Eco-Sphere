'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Gift, Zap, Award, Store } from 'lucide-react'

const rewards = [
  {
    id: 'company-swag',
    name: 'Company Merch Bundle',
    description: 'Exclusive EcoSphere branded merchandise',
    cost: 500,
    icon: '🎁',
    rarity: 'common',
    inventory: 'In Stock',
  },
  {
    id: 'coffee-gift-card',
    name: 'Sustainable Coffee Gift Card',
    description: '$25 gift card for eco-friendly coffee shop',
    cost: 300,
    icon: '☕',
    rarity: 'common',
    inventory: 'In Stock',
  },
  {
    id: 'offline-day',
    name: 'Paid ESG Day Off',
    description: 'One day off to focus on personal sustainability',
    cost: 750,
    icon: '🌿',
    rarity: 'rare',
    inventory: 'In Stock',
  },
  {
    id: 'team-lunch',
    name: 'Team Lunch Voucher',
    description: '$50 voucher for team sustainability lunch',
    cost: 400,
    icon: '🍽️',
    rarity: 'common',
    inventory: 'In Stock',
  },
  {
    id: 'conference',
    name: 'Sustainability Conference Pass',
    description: 'All-access pass to ESG conference',
    cost: 1500,
    icon: '🎯',
    rarity: 'epic',
    inventory: 'Limited',
  },
  {
    id: 'parking-pass',
    name: 'Reserved EV Charging Spot',
    description: 'Reserved EV charging spot for 1 month',
    cost: 600,
    icon: '⚡',
    rarity: 'rare',
    inventory: 'In Stock',
  },
]

const rarityColors = {
  common: 'bg-gray-100 text-gray-900',
  rare: 'bg-blue-100 text-blue-900',
  epic: 'bg-purple-100 text-purple-900',
  legendary: 'bg-yellow-100 text-yellow-900',
}

export function Rewards() {
  const userXP = 3500
  const [loadingRewards, setLoadingRewards] = useState<string[]>([])

  const handleRedeem = async (rewardId: string, cost: number) => {
    setLoadingRewards(prev => [...prev, rewardId])
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoadingRewards(prev => prev.filter(id => id !== rewardId))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rewards Store</h1>
        <p className="text-foreground/60 mt-2">Redeem your XP for exclusive rewards</p>
      </div>

      {/* XP Balance */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Your XP Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-3">
            <p className="text-4xl font-bold text-primary">{userXP}</p>
            <p className="text-foreground/60">XP available</p>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const canAfford = userXP >= reward.cost
          const rarity = reward.rarity as keyof typeof rarityColors

          return (
            <Card key={reward.id} className={`flex flex-col ${!canAfford ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{reward.icon}</div>
                  <Badge className={rarityColors[rarity] || 'bg-gray-100 text-gray-900'}>
                    {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{reward.name}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm font-medium">Cost</span>
                    <span className="font-bold flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {reward.cost}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="outline" className="text-xs">
                      {reward.inventory}
                    </Badge>
                  </div>
                </div>
                {canAfford ? (
                  <DynamicButton
                    className="w-full"
                    isLoading={loadingRewards.includes(reward.id)}
                    loadingText="Redeeming..."
                    successText="Redeemed!"
                    successDuration={2000}
                    onClick={() => handleRedeem(reward.id, reward.cost)}
                  >
                    Redeem
                  </DynamicButton>
                ) : (
                  <DynamicButton
                    className="w-full"
                    variant="secondary"
                    disabled
                  >
                    Not Enough XP
                  </DynamicButton>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Redemptions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
          <CardDescription>Rewards you&apos;ve claimed recently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Company Merch Bundle', date: '2024-07-08', cost: 500 },
              { name: 'Sustainable Coffee Gift Card', date: '2024-07-01', cost: 300 },
              { name: 'Team Lunch Voucher', date: '2024-06-24', cost: 400 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-foreground/60">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    -{item.cost}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    Claimed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
