import { ComingSoon } from '@/components/coming-soon'

function titleize(segment: string) {
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const title = slug.map(titleize).join(' · ')
  return <ComingSoon title={title || 'Coming Soon'} />
}
