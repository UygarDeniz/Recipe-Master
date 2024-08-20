'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      easing: 'ease-in-sine',
      duration: 600,
    });
  }, []);

  return null;
};
