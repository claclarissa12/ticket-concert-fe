'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EoGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (!userString) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userString);

      if (user.role !== 'event_organizer') {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthorized) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memeriksa akses...</div>;
  }

  return children;
}