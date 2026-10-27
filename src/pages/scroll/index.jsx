import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Scroll() {
const router = useRouter();

useEffect(() => {
router.replace('/dashboard');
}, [router]);

return <p>Loading...</p>;
}
