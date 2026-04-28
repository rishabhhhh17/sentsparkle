import { Suspense } from 'react';
import ConfirmationClient from './confirmation-client';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Thank you · Order confirmed' };

export default function Page({ params }: { params: { orderId: string } }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 md:px-10 py-24 text-smoke">Loading…</div>}>
      <ConfirmationClient orderId={params.orderId} />
    </Suspense>
  );
}
