'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 2000);
  }, [setHasMounted]);

  if (!hasMounted) return;

  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ClientOnly;
