'use server'

import { revalidateTag } from 'next/cache'

// Activity actions
export async function addActivity(formData: FormData) {
  const activity = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    timestamp: new Date(),
  }

  // In production, save to database
  console.log('Activity added:', activity)
  revalidateTag('activities')
  
  return { success: true, message: 'Activity added successfully' }
}

// Challenge actions
export async function acceptChallenge(challengeId: string) {
  console.log('Challenge accepted:', challengeId)
  revalidateTag('challenges')
  
  return { success: true, message: 'Challenge accepted' }
}

// Reward redemption
export async function redeemReward(rewardId: string, xpCost: number) {
  console.log('Reward redeemed:', rewardId, 'Cost:', xpCost)
  revalidateTag('rewards')
  
  return { success: true, message: 'Reward redeemed successfully' }
}

// Team quest actions
export async function joinTeamQuest(questId: string) {
  console.log('Joined team quest:', questId)
  revalidateTag('quests')
  
  return { success: true, message: 'Joined team quest' }
}

// Achievement unlock
export async function unlockAchievement(achievementId: string) {
  console.log('Achievement unlocked:', achievementId)
  revalidateTag('achievements')
  
  return { success: true, message: 'Achievement unlocked' }
}
