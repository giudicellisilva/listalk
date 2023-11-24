"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PrivateRoute from '@/components/PrivateRoute'
import ProviderQuery from '@/components/ProviderQuery';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions/checkIsPublicRoute';
import ProviderRedux from '@/components/ProviderRedux';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Listalk',
//   description: 'An NextJS demo app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathName = usePathname();
  const isPlublicPage = checkIsPublicRoute(pathName)
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderQuery>
          <ProviderRedux>
            {isPlublicPage && children}
            {!isPlublicPage && (
              <PrivateRoute>
                {children}
              </PrivateRoute>
            )}
          </ProviderRedux>
        </ProviderQuery>
      </body>
    </html>
  )
}
