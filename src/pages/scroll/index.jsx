import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Scroll() {
const router = useRouter();

useEffect(() => {
if (router.isReady) {
router.replace('/dashboard');
}
}, [router.isReady, router]);

return <p>Loading Home...</p>;
}

