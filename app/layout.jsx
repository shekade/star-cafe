import './globals.css';

export const metadata = {
  title: 'Sunday Crumb Bakery | A little crust, a lot of joy',
  description: 'A playful, bold neighborhood bakery and cafe website with buttery pastries, slow-fermented bread, and joyful morning vibes.',
  openGraph: {
    title: 'Sunday Crumb Bakery | A little crust, a lot of joy',
    description: 'A playful, bold neighborhood bakery and cafe website with buttery pastries, slow-fermented bread, and joyful morning vibes.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Lilita+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FFF8E7] text-[#0B3FBF] selection:bg-[#E6F55A] selection:text-[#0B3FBF] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
