import type { Metadata } from 'next';
import { contests } from '@/lib/data';
import { notFound } from 'next/navigation';
import ContestDetailClient from '@/components/contests/ContestDetailClient';
import Script from 'next/script';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return contests.map(c => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const contest = contests.find(c => c.id === Number(params.id));
  if (!contest) return { title: '공모전을 찾을 수 없습니다' };

  return {
    title: `${contest.title} | 오늘의 대회`,
    description: `${contest.organizer} 주최 | 상금 ${contest.prizeText} | 마감 D-${contest.dday} | ${contest.description}`,
    openGraph: {
      title: contest.title,
      description: `${contest.organizer} 주최 | 상금 ${contest.prizeText} | 마감 D-${contest.dday}`,
      type: 'article',
    },
  };
}

export default function ContestDetailPage({ params }: Props) {
  const contest = contests.find(c => c.id === Number(params.id));
  if (!contest) notFound();

  const similar = contests.filter(c => c.category === contest.category && c.id !== contest.id).slice(0, 6);

  // JSON-LD Event Schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: contest.title,
    description: contest.description,
    organizer: {
      '@type': 'Organization',
      name: contest.organizer,
    },
    startDate: contest.startDate,
    endDate: contest.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: contest.officialUrl,
    },
    offers: {
      '@type': 'Offer',
      price: contest.prize,
      priceCurrency: 'KRW',
      name: '상금',
    },
    image: `/og-contest-${contest.id}.png`,
    url: `https://todaycontest.kr/contests/${contest.id}`,
  };

  return (
    <>
      <Script
        id={`event-schema-${contest.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <ContestDetailClient contest={contest} similar={similar} />
    </>
  );
}
