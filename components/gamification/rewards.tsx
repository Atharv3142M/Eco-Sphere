'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Gift, Zap } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { addRedemption, getRedemptions, formatAppDate, APP_DATE } from '@/lib/store/app-store'
import { toast } from 'sonner'

const REWARDS = [
  { id: 'company-swag', name: 'Company Merch Bundle', description: 'Exclusive EcoSphere branded merchandise', cost: 500, icon: '🎁', rarity: 'common', inventory: 'In Stock' },
  { id: 'coffee-gift-card', name: 'Sustainable Coffee Gift Card', description: '$25 gift card for eco-friendly coffee shop', cost: 300, icon: '☕', rarity: 'common', inventory: 'In Stock' },
  { id: 'offline-day', name: 'Paid ESG Day Off', description: 'One day off to focus on personal sustainability', cost: 750, icon: '🌿', rarity: 'rare', inventory: 'In Stock' },
  { id: 'team-lunch', name: 'Team Lunch Voucher', description: '$50 voucher for team sustainability lunch', cost: 400, icon: '🍽️', rarity: 'common', inventory: 'In Stock' },
  { id: 'conference', name: 'Sustainability Conference Pass', description: 'All-access pass to ESG conference', cost: 1500, icon: '🎯', rarity: 'epic', inventory: 'Limited' },
  { id: 'parking-pass', name: 'Reserved EV Charging Spot', description: 'Reserved EV charging spot for 1 month', cost: 600, icon: '⚡', rarity: 'rare', inventory: 'In Stock' },
]

const rarityColors: Record<string, string> = {
  common: 'bg-muted text-foreground border border-border',
  rare: 'bg-info/15 text-info border border-info/30',
  epic: 'bg-gov/15 text-gov border border-gov/30',
  legendary: 'bg-warning/15 text-warning border border-warning/30',
}

export function Rewards() {
  const { user, deductXp } = useAuth()
  const userXP = user?.xp ?? 0
  const [redemptions, setRedemptions] = useState<ReturnType<typeof getRedemptions>>([])

  useEffect(() => {
    if (user?.id) setRedemptions(getRedemptions(user.id))
  }, [user?.id])

  const handleRedeem = async (rewardId: string, cost: number, rewardName: string) => {
    if (!user) {
      toast.error('Please sign in to redeem rewards')
      throw new Error('Not authenticated')
    }
    if (userXP < cost) {
      toast.error('Not enough XP')
      throw new Error('Insufficient XP')
    }

    await deductXp(cost)
    const redemption = {
      id: `r-${Date.now()}`,
      rewardId,
      rewardName,
      cost,
      date: APP_DATE.toISOString().slice(0, 10),
    }
    addRedemption(user.id, redemption)
    setRedemptions((prev) => [redemption, ...prev])
    toast.success(`Redeemed ${rewardName}!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rewards Store</h1>
        <p className="mt-2 text-muted-foreground">Redeem your XP for exclusive rewards</p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            Your XP Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-3">
            <p className="font-numeric text-4xl font-bold text-primary">{userXP.toLocaleString()}</p>
            <p className="text-muted-foreground">XP available</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REWARDS.map((reward) => {
          const canAfford = userXP >= reward.cost
          return (
            <Card key={reward.id} className={`flex flex-col ${!canAfford ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="mb-3 flex items-start justify-between">
                  <div className="text-4xl">{reward.icon}</div>
                  <Badge className={rarityColors[reward.rarity]}>
                    {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{reward.name}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <div className="mb-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                    <span className="text-sm font-medium">Cost</span>
                    <span className="flex items-center gap-1 font-bold">
                      <Zap className="size-4 text-primary" />
                      {reward.cost}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="outline">{reward.inventory}</Badge>
                  </div>
                </div>
                {canAfford ? (
                  <DynamicButton
                    className="w-full"
                    loadingText="Redeeming..."
                    successText="Redeemed!"
                    onClick={() => handleRedeem(reward.id, reward.cost, reward.name)}
                  >
                    <Gift className="mr-2 size-4" />
                    Redeem
                  </DynamicButton>
                ) : (
                  <DynamicButton className="w-full" variant="secondary" disabled>
                    Not Enough XP
                  </DynamicButton>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
          <CardDescription>Rewards you&apos;ve claimed recently</CardDescription>
        </CardHeader>
        <CardContent>
          {redemptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No redemptions yet. Start earning XP!</p>
          ) : (
            <div className="space-y-3">
              {redemptions.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-medium">{item.rewardName}</p>
                    <p className="text-xs text-muted-foreground">{formatAppDate(item.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center justify-end gap-1 font-bold text-destructive">
                      <Zap className="size-4" />-{item.cost}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">Claimed</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
