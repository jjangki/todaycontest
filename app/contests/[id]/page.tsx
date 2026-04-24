import type { Metadata } from 'next'
import { CONTESTS } from '@/lib/data'
import ContestDetailClient from '@/components/contests/ContestDetailClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return CONTESTS.map(c => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const c = CONTESTS.find(c => c.id === id)
  if (!c) return { title: '대회를 찾을 수 없습니다' }
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.title, description: c.desc }
  }
}

export default async function ContestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contest = CONTESTS.find(c => c.id === id)
  if (!contest) notFound()
  const similar = CONTESTS.filter(c => c.id !== id && c.category === contest.category).slice(0, 6)
  return <ContestDetailClient contest={contest} similar={similar} />
}
