/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors extracted directly from the ANAAJ logo
        'brand-green': '#4CAE19',     // Signature Leaf / Paddy Green
        'brand-green-light': '#66C433',
        'forest-green': '#246D0B',    // Rich Forest Green for primary actions & text
        'dark-forest': '#154506',     // Deep Corporate Green
        'forest-night': '#0B1E08',    // Deep Luxury Forest Slate for Footer & Hero
        'brand-orange': '#F7962B',    // Signature Harvest Saffron / Torch Flame
        'brand-orange-deep': '#E07D10',
        'golden-grain': '#D4AF37',    // Refined Gold / Rice Grain Yellow

        // Aesthetic Clean Backgrounds & Surfaces (Crisp & Fresh, not muddy)
        cream: '#FBFDF9',             // Luxury Fresh Pearl White (Primary Page Background)
        ivory: '#F3F8F1',             // Subtle Soft Sage White (Secondary Section Background)
        'rice-white': '#FFFFFF',      // Pure Clean White
        beige: '#DFEAE0',             // Pale Sage Border
        charcoal: '#172416',          // Deep Forest-tinted Charcoal for High Contrast Text
        'warm-gray': '#556653',       // Balanced Sage Gray for readable body text

        // Backward compatibility mappings
        'rice-brown': '#246D0B',      // Map legacy brown to signature forest green
        'light-brown': '#F7962B',     // Map legacy light-brown to brand saffron orange
        'dark-brown': '#154506',      // Map to deep forest
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
