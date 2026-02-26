import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin, Phone, Clock, ExternalLink, Menu, X, ChevronDown
} from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
// THEME TOKENS
// ─────────────────────────────────────────────
const THEMES = {
  A: {
    key: 'A',
    label: 'Warm Table',
    bg: '#EDE8DF',
    accent: '#C4622D',
    dark: '#3D2B1F',
    secondary: '#7A8C6E',
    muted: '#9A8B7A',
    surface: '#f7f3ed',
    surfaceDark: '#e8e0d5',
    navBg: 'rgba(237,232,223,0.85)',
    headingFont: '"Plus Jakarta Sans", sans-serif',
    dramaFont: '"Lora", serif',
    monoFont: '"Courier Prime", monospace',
    heroImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=2000&q=80',
    philoBg: '#3D2B1F',
    philoTexture: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=70',
    heroLine1: 'Baked with love,',
    heroLine2: 'Home.',
    tagline: 'Romanian recipes, Jersey heart. Fresh from the oven every morning at 33 Burrard Street.',
    accentWord: 'craft',
  },
  B: {
    key: 'B',
    label: 'Fired Earth',
    bg: '#EDE0CF',
    accent: '#D4541A',
    dark: '#1C1209',
    secondary: '#C49A2A',
    muted: '#9A8070',
    surface: '#f5ece0',
    surfaceDark: '#e3d5c0',
    navBg: 'rgba(237,224,207,0.85)',
    headingFont: '"Barlow Condensed", sans-serif',
    dramaFont: '"Zilla Slab", serif',
    monoFont: '"Source Code Pro", monospace',
    heroImage: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=2000&q=80',
    philoBg: '#1C1209',
    philoTexture: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&w=1400&q=70',
    heroLine1: 'Fresh from the oven,',
    heroLine2: 'Every day.',
    tagline: "Hand-made Romanian pastries and celebration cakes. St Helier's best-kept secret.",
    accentWord: 'craft',
  },
  C: {
    key: 'C',
    label: 'Black Marble',
    bg: '#F5F0E8',
    accent: '#A0351B',
    dark: '#111014',
    secondary: '#888080',
    muted: '#999090',
    surface: '#ffffff',
    surfaceDark: '#f0ebe3',
    navBg: 'rgba(245,240,232,0.9)',
    headingFont: '"Inter", sans-serif',
    dramaFont: '"Playfair Display", serif',
    monoFont: '"JetBrains Mono", monospace',
    heroImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=2000&q=80',
    philoBg: '#111014',
    philoTexture: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1400&q=70',
    heroLine1: "Nicoleta's Home Cakes.",
    heroLine2: 'Jersey.',
    tagline: 'Artisan cakes and pastries rooted in Romanian tradition. Baked fresh in St Helier.',
    accentWord: 'craft',
  },
  D: {
    key: 'D',
    label: 'Terracotta Coast',
    bg: '#F5F0E6',
    accent: '#C8572A',
    dark: '#2D2520',
    secondary: '#5C6B3A',
    muted: '#8A7A6A',
    surface: '#fdf8f0',
    surfaceDark: '#ede5d8',
    navBg: 'rgba(245,240,230,0.85)',
    headingFont: '"Josefin Sans", sans-serif',
    dramaFont: '"Libre Baskerville", serif',
    monoFont: '"Courier Prime", monospace',
    heroImage: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=2000&q=80',
    philoBg: '#2D2520',
    philoTexture: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1400&q=70',
    heroLine1: 'A taste of Romania',
    heroLine2: 'on the island.',
    tagline: "Jersey's home for hand-crafted cakes, flaky cheese pies and honest baking.",
    accentWord: 'craft',
  },
}

// ─────────────────────────────────────────────
// MENU DATA — authentic Romanian-inspired
// ─────────────────────────────────────────────
const MENU_DATA = {
  cakes: [
    { name: 'Tort Biscoff cu Alune', desc: 'Biscoff cream, roasted hazelnut praline, dark chocolate glaze', price: '£32', signature: true },
    { name: 'Tort de Ciocolată Neagră', desc: 'Valrhona dark chocolate, espresso sponge, chocolate mirror glaze', price: '£28' },
    { name: 'Tort cu Fructe de Pădure', desc: 'Vanilla sponge, mascarpone, wild berry compote', price: '£26' },
    { name: 'Tort Medovik', desc: 'Classic honey layer cake, sour cream frosting, caramel dust', price: '£24', signature: true },
    { name: 'Tort cu Lămâie și Lavandă', desc: 'Lemon curd, lavender cream, shortbread crumble', price: '£26' },
    { name: 'Tort Opéra Românesc', desc: 'Almond joconde, coffee buttercream, dark ganache', price: '£30' },
  ],
  savoury: [
    { name: 'Plăcintă cu Brânză', desc: 'Flaky pastry, fresh sheep\'s cheese, dill, warm from the oven', price: '£4.50', signature: true },
    { name: 'Plăcintă cu Cartofi', desc: 'Soft potato and herb filling in butter-layered pastry', price: '£4.00' },
    { name: 'Covrigei cu Brânză', desc: 'Soft pretzel twists baked with melted cheese and sesame', price: '£3.50' },
    { name: 'Sandwich cu Pui și Avocado', desc: 'Free-range chicken, avocado, wholegrain mustard on sourdough', price: '£6.50' },
    { name: 'Sandwich Caprese', desc: 'Buffalo mozzarella, heritage tomato, basil pesto, ciabatta', price: '£5.50' },
  ],
  pastries: [
    { name: 'Cozonac cu Nucă', desc: 'Traditional Romanian sweet bread, walnut and cocoa swirl', price: '£3.50', signature: true },
    { name: 'Papanași Prăjiți', desc: 'Fried cottage cheese doughnuts, sour cream, sour cherry jam', price: '£4.50' },
    { name: 'Cornulețe cu Gem', desc: 'Buttery crescent pastries filled with apricot or plum jam', price: '£2.50' },
    { name: 'Rulou cu Mac', desc: 'Poppy seed roll, sweet yeast dough, vanilla glaze', price: '£3.00' },
    { name: 'Éclair cu Vanilie', desc: 'Choux pastry, vanilla custard, white chocolate fondant', price: '£3.50' },
  ],
}

// ─────────────────────────────────────────────
// STORY PANELS
// ─────────────────────────────────────────────
const STORY_PANELS = [
  {
    num: '01',
    title: 'The Recipe',
    body: `Nicoleta learned to bake from her grandmother in the Moldovan countryside, where every cake had a name, a reason, and a story behind it. The honey layers of Medovik, the flaky folds of plăcintă, the golden cozonac at Christmas — these were not recipes from a book. They were handed down in the kitchen, through touch and repetition.\n\nWhen Nicoleta moved to Jersey, she brought those recipes with her in a battered notebook. The ingredients changed slightly. The method never did.`,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Hands kneading pastry dough on a floured surface',
  },
  {
    num: '02',
    title: 'The Kitchen',
    body: `Every morning, before St Helier wakes up, Nicoleta is already in the kitchen at 33 Burrard Street. The oven goes on at six. The first plăcinte come out at eight — hot, fragrant, crackling as they cool on the rack.\n\nThere is no shortcuts philosophy here. The dough rests when it needs to rest. The cream sets overnight. The cakes go out when they are ready, and not a moment before. Two thousand people follow along on Facebook, and the days when a batch sells out before noon have become a standing joke with the regulars.`,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Artisan cakes on a marble counter with morning light',
  },
  {
    num: '03',
    title: 'Your Table',
    body: `A slice of Biscoff cake and a coffee. A warm cheese pie wrapped in paper to eat on the walk to work. A birthday cake collected on a Saturday morning, carried home carefully on the back seat.\n\nThis is what people come back for. Not the packaging or the branding — the fact that it tastes like something a person made for another person. One hundred percent of reviewers recommend Nicoleta's. The twelfth review says the same thing as the first: "the best cake I've had outside Romania."`,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Coffee and cake slice on a wooden table',
  },
]

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar({ theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-4 left-1/2 z-50 w-[92%] max-w-4xl -translate-x-1/2 transition-all duration-300"
      style={{
        borderRadius: '9999px',
        background: scrolled ? theme.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? `1px solid rgba(0,0,0,0.08)` : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
          <span
            className="text-sm font-bold tracking-tight"
            style={{ fontFamily: theme.headingFont, color: scrolled ? theme.dark : '#fff' }}
          >
            Nicoleta's Home Cakes
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['menu', 'story', 'visit'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: theme.monoFont, color: scrolled ? theme.dark : 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {id === 'menu' ? 'MENU' : id === 'story' ? 'OUR STORY' : 'FIND US'}
            </button>
          ))}
          <a
            href="https://bite.je"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full"
            style={{ fontFamily: theme.monoFont, background: theme.accent, color: '#fff' }}
          >
            <span>Order Online</span>
            <span className="btn-fill rounded-full" style={{ background: theme.dark }} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ color: scrolled ? theme.dark : '#fff', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mx-4 mb-4 rounded-3xl p-6 flex flex-col gap-4"
          style={{ background: theme.surface, border: `1px solid rgba(0,0,0,0.06)` }}
        >
          {['menu', 'story', 'visit'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: theme.monoFont, color: theme.dark, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {id === 'menu' ? 'Menu' : id === 'story' ? 'Our Story' : 'Find Us'}
            </button>
          ))}
          <a
            href="https://bite.je"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm font-bold tracking-widest uppercase px-5 py-3 rounded-full"
            style={{ background: theme.accent, color: '#fff' }}
          >
            Order Online
          </a>
        </div>
      )}
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-el', { willChange: 'transform, opacity' })
      gsap.fromTo(
        '.hero-el',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.2,
          onComplete: () => gsap.set('.hero-el', { willChange: 'auto' }) }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [theme.key])

  return (
    <section
      ref={containerRef}
      className="relative flex items-end"
      style={{ height: '100svh', minHeight: '600px', background: theme.dark }}
    >
      {/* Hero image */}
      <img
        src={theme.heroImage}
        alt="Artisan cakes freshly baked"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.65, willChange: 'transform' }}
        fetchpriority="high"
        loading="eager"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${theme.dark} 0%, ${theme.dark}CC 30%, ${theme.dark}55 65%, transparent 100%)` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-5 md:px-16 pb-10 md:pb-24 max-w-3xl">
        {/* Status pill */}
        <div
          className="hero-el inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 md:mb-6"
          style={{ fontFamily: theme.monoFont, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-xs text-white tracking-widest">ST HELIER · OPEN TODAY</span>
        </div>

        {/* Hero line 1 */}
        <div
          className="hero-el text-white/90 leading-tight mb-1"
          style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(1.4rem, 5vw, 4rem)' }}
        >
          {theme.heroLine1}
        </div>

        {/* Hero line 2 — drama serif */}
        <div
          className="hero-el text-white leading-none mb-6"
          style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2.8rem, 13vw, 10rem)', lineHeight: 0.9 }}
        >
          {theme.heroLine2}
        </div>

        {/* Tagline */}
        <p
          className="hero-el text-white/65 mb-8 max-w-md"
          style={{ fontFamily: theme.headingFont, fontSize: 'clamp(0.82rem, 2.5vw, 1.1rem)', lineHeight: 1.6 }}
        >
          {theme.tagline}
        </p>

        {/* CTAs */}
        <div className="hero-el flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href="https://bite.je"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm tracking-wide text-white"
            style={{ fontFamily: theme.headingFont, background: theme.accent }}
          >
            <span className="flex items-center gap-2">
              Order on bite.je <ExternalLink size={14} />
            </span>
            <span className="btn-fill rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </a>
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm tracking-wide text-white"
            style={{ fontFamily: theme.headingFont, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <span>View Menu</span>
            <span className="btn-fill rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </button>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden md:flex absolute bottom-10 right-10 flex-col items-center gap-3 z-10">
        <span
          className="text-white/40 tracking-[0.3em] text-xs"
          style={{ fontFamily: theme.monoFont, writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <div className="w-px h-16 overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <div className="scroll-drop w-full h-8 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MENU SECTION
// ─────────────────────────────────────────────
const MENU_STYLES = ['A', 'B', 'C', 'D']
const MENU_STYLE_LABELS = { A: 'Café Board', B: 'Fine Dining', C: 'Tapas Cards', D: 'Chalkboard' }
const MENU_TABS = [
  { key: 'cakes', label: 'Cakes', emoji: '🎂' },
  { key: 'savoury', label: 'Savoury', emoji: '🥐' },
  { key: 'pastries', label: 'Pastries', emoji: '🍮' },
]

function MenuSection({ theme, menuStyle }) {
  const [activeTab, setActiveTab] = useState('cakes')
  const items = MENU_DATA[activeTab]

  if (menuStyle === 'A') return <MenuStyleA theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} items={items} />
  if (menuStyle === 'B') return <MenuStyleB theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} items={items} />
  if (menuStyle === 'C') return <MenuStyleC theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} items={items} />
  return <MenuStyleD theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} items={items} />
}

function MenuStyleA({ theme, activeTab, setActiveTab, items }) {
  return (
    <section id="menu" className="py-12 md:py-20 px-5 md:px-16" style={{ background: theme.bg }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: theme.monoFont, color: theme.accent }}>Our Menu</p>
          <h2 style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: theme.dark, lineHeight: 1.1 }}>
            Authentic Romanian,
          </h2>
          <p style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: theme.accent }}>
            made from the heart.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl overflow-hidden mb-8" style={{ background: theme.surfaceDark }}>
          {MENU_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex-1 py-3 text-sm font-semibold tracking-wide transition-all"
              style={{
                fontFamily: theme.headingFont,
                background: activeTab === t.key ? theme.accent : 'transparent',
                color: activeTab === t.key ? '#fff' : theme.muted,
                border: 'none', cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: theme.surface, border: `1px solid rgba(0,0,0,0.07)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.name}
              className="flex items-start justify-between px-6 py-5"
              style={{ borderBottom: i < items.length - 1 ? `1px solid rgba(0,0,0,0.07)` : 'none' }}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm" style={{ fontFamily: theme.headingFont, color: theme.dark }}>{item.name}</span>
                  {item.signature && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: theme.accent + '22', color: theme.accent, fontFamily: theme.monoFont }}>Signature</span>
                  )}
                </div>
                <p className="text-sm" style={{ fontFamily: theme.headingFont, color: theme.muted, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
              <span className="font-bold text-sm shrink-0" style={{ fontFamily: theme.monoFont, color: theme.accent }}>{item.price}</span>
            </div>
          ))}
        </div>

        <p className="text-center mt-4 text-xs" style={{ fontFamily: theme.monoFont, color: theme.muted }}>
          All bakes made fresh daily · Celebration cakes by order
        </p>
      </div>
    </section>
  )
}

function MenuStyleB({ theme, activeTab, setActiveTab, items }) {
  return (
    <section id="menu" className="py-12 md:py-20 px-5 md:px-16" style={{ background: theme.bg }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: theme.dark, lineHeight: 1.1 }}>
            Authentic Romanian,
          </h2>
          <p style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: theme.accent }}>
            made from the heart.
          </p>
        </div>

        {/* Tabs — italic serif underline */}
        <div className="flex justify-center gap-8 mb-12">
          {MENU_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="pb-1 text-sm transition-all"
              style={{
                fontFamily: theme.dramaFont,
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: activeTab === t.key ? theme.accent : theme.muted,
                borderBottom: activeTab === t.key ? `2px solid ${theme.accent}` : '2px solid transparent',
                background: 'none', border: 'none',
                borderBottomStyle: 'solid',
                borderBottomWidth: 2,
                borderBottomColor: activeTab === t.key ? theme.accent : 'transparent',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <span style={{ fontFamily: theme.monoFont, color: theme.muted, fontSize: '0.75rem', letterSpacing: '0.3em' }}>
            ─────── {activeTab.toUpperCase()} ───────
          </span>
        </div>

        {items.map((item) => (
          <div key={item.name} className="mb-6">
            <div className="flex items-end gap-0">
              <span style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: '1.2rem', color: theme.dark }}>{item.name}</span>
              <span className="dot-leader" style={{ color: theme.muted }} />
              <span style={{ fontFamily: theme.monoFont, color: theme.accent, fontSize: '1rem', fontWeight: 700 }}>{item.price}</span>
            </div>
            <p className="mt-1 text-sm italic" style={{ fontFamily: theme.dramaFont, color: theme.muted }}>{item.desc}</p>
          </div>
        ))}

        <p className="text-center mt-10 text-xs" style={{ fontFamily: theme.monoFont, color: theme.muted }}>All bakes made fresh daily · Celebration cakes by order</p>
      </div>
    </section>
  )
}

function MenuStyleC({ theme, activeTab, setActiveTab, items }) {
  return (
    <section id="menu" className="py-12 md:py-20 px-5 md:px-16" style={{ background: theme.bg }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: theme.monoFont, color: theme.accent }}>Our Menu</p>
          <h2 style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: theme.dark, lineHeight: 1.1 }}>
            Authentic Romanian,
          </h2>
          <p style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: theme.accent }}>
            made from the heart.
          </p>
        </div>

        {/* Pill tabs with emoji */}
        <div className="flex flex-wrap gap-2 mb-10">
          {MENU_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                fontFamily: theme.headingFont,
                background: activeTab === t.key ? theme.accent : theme.surfaceDark,
                color: activeTab === t.key ? '#fff' : theme.dark,
                border: 'none', cursor: 'pointer',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="relative rounded-3xl p-6"
              style={{ background: theme.surface, border: `1px solid rgba(0,0,0,0.07)` }}
            >
              {item.signature && (
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: theme.accent, color: '#fff' }}
                  title="Signature dish"
                >
                  ★
                </div>
              )}
              <h3 className="font-bold text-sm mb-2 pr-8" style={{ fontFamily: theme.headingFont, color: theme.dark }}>{item.name}</h3>
              <p className="text-sm mb-4" style={{ fontFamily: theme.headingFont, color: theme.muted, lineHeight: 1.5 }}>{item.desc}</p>
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: theme.accent + '18', color: theme.accent, fontFamily: theme.monoFont }}
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs" style={{ fontFamily: theme.monoFont, color: theme.muted }}>All bakes made fresh daily · Celebration cakes by order</p>
      </div>
    </section>
  )
}

function MenuStyleD({ theme, activeTab, setActiveTab, items }) {
  return (
    <section id="menu" className="py-12 md:py-20 px-5 md:px-16" style={{ background: '#2d2b26' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <p style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
            Nicoleta's Home Cakes
          </p>
        </div>
        <div className="text-center mb-8">
          <span style={{ fontFamily: theme.monoFont, color: '#F5E6A3', fontSize: '0.75rem', letterSpacing: '0.4em' }}>
            ── DAILY MENU ──
          </span>
        </div>
        <div className="text-center mb-3">
          <h2 style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff' }}>
            Authentic Romanian,
          </h2>
          <p style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: theme.accent }}>
            made from the heart.
          </p>
        </div>

        {/* Chalk tabs */}
        <div className="flex justify-center gap-6 mb-10 mt-8">
          {MENU_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="text-sm font-semibold tracking-widest uppercase pb-1 transition-all"
              style={{
                fontFamily: theme.monoFont,
                color: activeTab === t.key ? '#F5E6A3' : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === t.key ? '2px solid #F5E6A3' : '2px solid transparent',
                background: 'none', border: 'none',
                borderBottomStyle: 'solid', borderBottomWidth: 2,
                borderBottomColor: activeTab === t.key ? '#F5E6A3' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        {items.map((item, i) => (
          <div key={item.name}>
            <div className="flex items-end py-4">
              <span style={{ fontFamily: theme.monoFont, color: '#fff', fontSize: '0.95rem' }}>{item.name}</span>
              <span className="dot-leader" style={{ color: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: theme.monoFont, color: '#F5E6A3', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{item.price}</span>
            </div>
            <p className="text-sm pb-3" style={{ fontFamily: theme.monoFont, color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
            {i < items.length - 1 && <hr className="chalk-divider" />}
          </div>
        ))}

        <p className="text-center mt-10 text-xs tracking-widest" style={{ fontFamily: theme.monoFont, color: 'rgba(255,255,255,0.3)' }}>
          ALL BAKES MADE FRESH DAILY · CELEBRATION CAKES BY ORDER
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────
function Philosophy({ theme }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax texture
      gsap.to('.philo-texture', {
        y: '-15%',
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
      // Word-by-word fade-up
      gsap.fromTo(
        '.philo-word',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: '.philo-hero', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [theme.key])

  const heroWords = ['We', 'focus', 'on', 'the', 'kind', 'of']
  const accentWords = [theme.accentWord]
  const trailingWords = ['that', 'takes', 'twenty', 'years', 'to', 'perfect.']

  return (
    <section ref={sectionRef} className="relative py-16 md:py-28 px-5 md:px-16 overflow-hidden" style={{ background: theme.philoBg }}>
      {/* Texture */}
      <div className="philo-texture absolute inset-0 w-full h-[130%] -top-[15%]" style={{ opacity: 0.07 }}>
        <img src={theme.philoTexture} alt="" className="w-full h-full object-cover" aria-hidden />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Neutral statement */}
        <p
          className="text-white/45 mb-10"
          style={{ fontFamily: theme.headingFont, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          Most bakeries focus on: volume and velocity.
        </p>

        {/* Hero statement */}
        <div
          className="philo-hero"
          style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.9rem, 7vw, 6rem)', lineHeight: 1.15, color: '#fff' }}
        >
          {heroWords.map((w, i) => (
            <span key={i} className="philo-word inline-block mr-[0.25em]">{w}</span>
          ))}
          {accentWords.map((w, i) => (
            <span key={`a${i}`} className="philo-word inline-block mr-[0.25em]" style={{ color: theme.accent }}>{w}</span>
          ))}
          {trailingWords.map((w, i) => (
            <span key={`t${i}`} className="philo-word inline-block mr-[0.25em]">{w}</span>
          ))}
        </div>

        {/* Attribution */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: theme.accent, color: '#fff' }}>N</div>
            <p className="text-sm text-white/50" style={{ fontFamily: theme.monoFont }}>
              Nicoleta · Proprietor · Est. 2022
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// OUR STORY
// ─────────────────────────────────────────────
function OurStory({ theme }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      STORY_PANELS.forEach((_, i) => {
        // Image parallax
        gsap.fromTo(
          `.story-img-${i}`,
          { scale: 1.08, y: 30 },
          {
            scale: 1, y: -30, ease: 'none',
            scrollTrigger: { trigger: `.story-panel-${i}`, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          }
        )
        // Text fade up
        gsap.fromTo(
          `.story-text-${i}`,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: `.story-panel-${i}`, start: 'top 75%' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [theme.key])

  return (
    <section ref={sectionRef} id="story" className="py-12 md:py-20 px-5 md:px-16" style={{ background: theme.bg }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: theme.monoFont, color: theme.accent }}>Our Story</p>
          <h2 style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: theme.dark, lineHeight: 1.1 }}>
            Three moments
          </h2>
        </div>

        {STORY_PANELS.map((panel, i) => (
          <div key={i}>
            <div className={`story-panel-${i} flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-8 md:py-12`}>
              {/* Image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-4xl" style={{ aspectRatio: '4/3' }}>
                <img
                  src={panel.image}
                  alt={panel.imageAlt}
                  className={`story-img-${i} w-full h-full object-cover`}
                />
              </div>
              {/* Text */}
              <div className={`story-text-${i} w-full md:w-1/2`}>
                <span className="block text-xs font-bold tracking-widest mb-3" style={{ fontFamily: theme.monoFont, color: theme.accent }}>{panel.num}</span>
                <h3 className="mb-4" style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: theme.dark }}>{panel.title}</h3>
                {panel.body.split('\n\n').map((para, j) => (
                  <p key={j} className={j > 0 ? 'mt-4' : ''} style={{ fontFamily: theme.headingFont, color: theme.muted, fontSize: '0.95rem', lineHeight: 1.75 }}>{para}</p>
                ))}
                {i === STORY_PANELS.length - 1 && (
                  <a
                    href="https://bite.je"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full font-bold text-sm text-white"
                    style={{ fontFamily: theme.headingFont, background: theme.accent }}
                  >
                    <span className="flex items-center gap-2">Order on bite.je <ExternalLink size={14} /></span>
                    <span className="btn-fill rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  </a>
                )}
              </div>
            </div>
            {i < STORY_PANELS.length - 1 && (
              <div className="w-full h-px" style={{ background: `${theme.muted}33` }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ORDER CTA
// ─────────────────────────────────────────────
function OrderCTA({ theme }) {
  return (
    <section className="py-12 md:py-20 px-5 md:px-16" style={{ background: theme.bg }}>
      <div
        className="relative max-w-3xl mx-auto rounded-4xl p-8 md:p-16 overflow-hidden text-center"
        style={{ background: theme.dark }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
          style={{ background: theme.accent, opacity: 0.1, filter: 'blur(60px)' }}
        />
        <p className="text-xs tracking-widest uppercase mb-6" style={{ fontFamily: theme.monoFont, color: theme.accent }}>
          Order Online · Collection Available
        </p>
        <h2
          className="text-white mb-4"
          style={{ fontFamily: theme.dramaFont, fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
        >
          Ready when you are.
        </h2>
        <p className="text-white/60 mb-10 max-w-md mx-auto" style={{ fontFamily: theme.headingFont, fontSize: '0.95rem', lineHeight: 1.7 }}>
          Order cakes, pastries and savouries on bite.je for same-day collection from 33 Burrard Street, St Helier. Celebration cakes by advance order — call or message to discuss.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://bite.je"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white"
            style={{ fontFamily: theme.headingFont, background: theme.accent }}
          >
            <span className="flex items-center gap-2">Order on bite.je <ExternalLink size={14} /></span>
            <span className="btn-fill rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer({ theme }) {
  return (
    <footer
      id="visit"
      className="rounded-t-5xl pt-12 md:pt-16 pb-8 px-5 md:px-16"
      style={{ background: theme.dark }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
              <span className="text-white font-bold text-sm" style={{ fontFamily: theme.headingFont }}>Nicoleta's Home Cakes</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: theme.headingFont }}>
              Romanian-inspired artisan cakes, cheese pies and pastries.<br />Baked fresh every morning in St Helier, Jersey.
            </p>
          </div>

          {/* Find Us */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5 text-white/40" style={{ fontFamily: theme.monoFont }}>Find Us</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=33+Burrard+Street+St+Helier+Jersey"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex items-start gap-3 text-sm text-white/65"
                style={{ fontFamily: theme.headingFont }}
              >
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: theme.accent }} />
                33 Burrard Street, St Helier, Jersey
              </a>
              <a href="tel:+441534625477" className="nav-link flex items-center gap-3 text-sm text-white/65" style={{ fontFamily: theme.headingFont }}>
                <Phone size={14} className="shrink-0" style={{ color: theme.accent }} />
                +44 1534 625477
              </a>
              <div className="flex items-start gap-3 text-sm text-white/65" style={{ fontFamily: theme.headingFont }}>
                <Clock size={14} className="mt-0.5 shrink-0" style={{ color: theme.accent }} />
                <span>Tuesday – Saturday<br />Fresh bakes from 9am until sold out</span>
              </div>
            </div>
          </div>

          {/* Order */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5 text-white/40" style={{ fontFamily: theme.monoFont }}>Order & Reserve</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://bite.je"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex items-center gap-3 text-sm text-white/65"
                style={{ fontFamily: theme.headingFont }}
              >
                <ExternalLink size={14} style={{ color: theme.accent }} />
                Order online — bite.je
              </a>
              <a
                href="https://www.facebook.com/p/Nicoletas-Home-Cakes-100083213978195/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex items-center gap-3 text-sm text-white/65"
                style={{ fontFamily: theme.headingFont }}
              >
                <Phone size={14} style={{ color: theme.accent }} />
                Message on Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2">
            <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span className="text-xs tracking-widest text-white/35" style={{ fontFamily: theme.monoFont }}>
              OPEN TODAY · FRESH BAKES AVAILABLE
            </span>
          </div>
          <p className="text-xs text-white/25" style={{ fontFamily: theme.monoFont }}>
            © {new Date().getFullYear()} Nicoleta's Home Cakes. St Helier, Jersey.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// THEME SWITCHER (bottom right)
// ─────────────────────────────────────────────
function ThemeSwitcher({ current, onChange }) {
  const [open, setOpen] = useState(false)
  const theme = THEMES[current]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="flex flex-col gap-2 p-3 rounded-3xl"
          style={{ background: theme.dark, border: `1px solid rgba(255,255,255,0.1)`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
        >
          {Object.values(THEMES).map((t) => (
            <button
              key={t.key}
              onClick={() => { onChange(t.key); setOpen(false) }}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl text-sm font-semibold transition-all text-left"
              style={{
                fontFamily: theme.monoFont,
                background: current === t.key ? theme.accent : 'rgba(255,255,255,0.06)',
                color: current === t.key ? '#fff' : 'rgba(255,255,255,0.6)',
                border: 'none', cursor: 'pointer', minWidth: 130,
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.accent }} />
              {t.key} · {t.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-magnetic flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs font-bold text-white"
        style={{ fontFamily: theme.monoFont, background: theme.dark, boxShadow: '0 4px 20px rgba(0,0,0,0.25)', border: `1px solid rgba(255,255,255,0.1)` }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
        <span className="hidden sm:inline">THEME </span><span>{current}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        <span className="btn-fill rounded-full" style={{ background: theme.accent + '33' }} />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// MENU STYLE PICKER (bottom left)
// ─────────────────────────────────────────────
function MenuStylePicker({ current, onChange, theme }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open && (
        <div
          className="flex flex-col gap-2 p-3 rounded-3xl"
          style={{ background: theme.dark, border: `1px solid rgba(255,255,255,0.1)`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
        >
          {MENU_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false) }}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl text-sm font-semibold transition-all text-left"
              style={{
                fontFamily: theme.monoFont,
                background: current === s ? theme.accent : 'rgba(255,255,255,0.06)',
                color: current === s ? '#fff' : 'rgba(255,255,255,0.6)',
                border: 'none', cursor: 'pointer', minWidth: 130,
              }}
            >
              {s} · {MENU_STYLE_LABELS[s]}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-magnetic flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs font-bold text-white"
        style={{ fontFamily: theme.monoFont, background: theme.dark, boxShadow: '0 4px 20px rgba(0,0,0,0.25)', border: `1px solid rgba(255,255,255,0.1)` }}
      >
        <span>MENU {current}</span><span className="hidden sm:inline"> · {MENU_STYLE_LABELS[current]}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        <span className="btn-fill rounded-full" style={{ background: theme.accent + '33' }} />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [themeKey, setThemeKey] = useState('C')
  const [menuStyle, setMenuStyle] = useState('A')
  const theme = THEMES[themeKey]

  const handleThemeChange = (key) => {
    setThemeKey(key)
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <div key={themeKey} style={{ background: theme.bg }}>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden />

      <Navbar theme={theme} />
      <Hero theme={theme} />
      <MenuSection theme={theme} menuStyle={menuStyle} />
      <Philosophy theme={theme} />
      <OurStory theme={theme} />
      <OrderCTA theme={theme} />
      <Footer theme={theme} />

      <ThemeSwitcher current={themeKey} onChange={handleThemeChange} />
      <MenuStylePicker current={menuStyle} onChange={setMenuStyle} theme={theme} />
    </div>
  )
}
