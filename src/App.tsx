import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react'

const phoneNumber = '(860) 350-3249'
const phoneLink = 'tel:+18603503249'
const emailLink = 'mailto:client.inquiry@amuddypaw.com'

const addOns = [
  ['Nail clipping', '$15'],
  ['Nail filing', '$20'],
  ['Pawdicure', '$30'],
  ['Cat nail trim', '$20'],
  ['Teeth brushing', '$5'],
]

const gallery = [
  {
    image: 'photo-1552053831-71594a27632d',
    alt: 'Freshly groomed golden retriever enjoying a sunny day',
    label: 'The golden-hour glow',
    size: 'gallery-tall',
  },
  {
    image: 'photo-1517849845537-4d257902454a',
    alt: 'Happy little dog with a fresh, fluffy coat',
    label: 'Teddy-cut sweetness',
    size: '',
  },
  {
    image: 'photo-1537151625747-768eb6cf92b2',
    alt: 'Fluffy white dog after a fresh bath and brush',
    label: 'Fresh from the fluff',
    size: '',
  },
  {
    image: 'photo-1516734212186-a967f81ad0d7',
    alt: 'Dog enjoying a calm grooming session',
    label: 'A little spa-day calm',
    size: '',
  },
  {
    image: 'photo-1548199973-03cce0bbc87b',
    alt: 'Two happy dogs out for a walk together',
    label: 'Good hair, happy tails',
    size: 'gallery-wide',
  },
  {
    image: 'photo-1587300003388-59208cc962cb',
    alt: 'Adorable puppy looking bright-eyed after a bath',
    label: 'Puppy’s first freshen-up',
    size: '',
  },
]

const benefits = [
  { icon: Heart, title: 'Low-stress care', detail: 'A gentler pace, guided by your pet.' },
  { icon: Sparkles, title: 'No cages or unattended pets', detail: 'Your best friend stays in caring hands.' },
  { icon: CheckCircle2, title: 'Skin-kind shampoos', detail: 'Thoughtful products for sensitive skin.' },
  { icon: Scissors, title: 'Certified breed stylists', detail: 'Experienced groomers, precise finishes.' },
]

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
  .paw-site {
    --sage: #647b68;
    --sage-dark: #405749;
    --sage-light: #e9eee6;
    --paper: #fbfaf6;
    --cream: #f2f0e8;
    --ink: #26322c;
    --muted: #69716a;
    --amber: #bd7d42;
    --line: #e6e5dd;
    color: var(--ink);
    background: var(--paper);
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
    min-height: 100vh;
  }
  .paw-site *, .paw-site *::before, .paw-site *::after { box-sizing: border-box; }
  .paw-site button, .paw-site input, .paw-site select, .paw-site textarea { font: inherit; }
  .paw-site button, .paw-site a { -webkit-tap-highlight-color: transparent; }
  .paw-site a { color: inherit; text-decoration: none; }
  .paw-site button { color: inherit; }
  .paw-site img { display: block; width: 100%; object-fit: cover; }
  .paw-wrap { width: min(1160px, calc(100% - 48px)); margin: 0 auto; }
  .paw-header { position: sticky; top: 0; z-index: 20; background: rgba(251,250,246,.94); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(38,50,44,.08); }
  .paw-nav { min-height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 28px; }
  .paw-brand { display: inline-flex; gap: 11px; align-items: center; flex-shrink: 0; }
  .paw-mark { display: grid; place-items: center; width: 39px; height: 39px; color: white; background: var(--sage); border-radius: 50%; }
  .paw-brand-name { font: 800 14px/1.05 'Manrope', sans-serif; letter-spacing: .03em; }
  .paw-brand-name span { display: block; margin-top: 4px; color: var(--muted); font: 600 9px/1 'DM Sans', sans-serif; letter-spacing: .16em; }
  .paw-links { display: flex; align-items: center; justify-content: center; gap: clamp(15px, 2.5vw, 32px); }
  .paw-links a { color: #505b53; font-size: 13px; font-weight: 600; transition: color .2s; }
  .paw-links a:hover { color: var(--amber); }
  .paw-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; padding: 0 21px; border: 0; border-radius: 999px; background: var(--sage-dark); color: white !important; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .2s, transform .2s; }
  .paw-btn:hover { background: #304638; transform: translateY(-1px); }
  .paw-btn-light { background: white; color: var(--ink) !important; border: 1px solid var(--line); }
  .paw-btn-light:hover { background: var(--sage-light); }
  .paw-menu { display: none; width: 42px; height: 42px; border: 1px solid var(--line); background: transparent; border-radius: 50%; cursor: pointer; }
  .paw-hero { padding: 48px 0 76px; }
  .paw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 535px; align-items: center; gap: 44px; }
  .paw-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: var(--sage-dark); font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
  .paw-eyebrow::before { width: 21px; height: 1px; background: var(--amber); content: ''; }
  .paw-hero h1 { max-width: 620px; margin: 20px 0 17px; font: 700 clamp(42px, 5.1vw, 68px)/1.06 'Manrope', sans-serif; letter-spacing: -.045em; }
  .paw-hero h1 em { color: var(--sage); font-style: normal; }
  .paw-hero-copy { max-width: 460px; color: var(--muted); font-size: 16px; line-height: 1.8; }
  .paw-actions { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 28px; }
  .paw-local-note { display: flex; align-items: center; gap: 8px; margin-top: 27px; color: #687168; font-size: 12px; }
  .paw-local-note svg { color: var(--amber); }
  .paw-hero-image { position: relative; min-height: 490px; overflow: hidden; border-radius: 48% 48% 20px 20px; background: #d9dfd2; }
  .paw-hero-image img { position: absolute; inset: 0; height: 100%; object-position: 52% center; }
  .paw-image-note { position: absolute; left: 20px; bottom: 20px; display: flex; align-items: center; gap: 12px; max-width: calc(100% - 40px); padding: 13px 17px; border-radius: 15px; background: rgba(251,250,246,.94); box-shadow: 0 12px 35px #26322c1c; }
  .paw-image-note-icon { display: grid; place-items: center; width: 37px; height: 37px; flex: 0 0 auto; border-radius: 50%; background: var(--sage-light); color: var(--sage-dark); }
  .paw-image-note strong { display: block; font: 700 12px 'Manrope', sans-serif; }
  .paw-image-note span { display: block; color: var(--muted); font-size: 11px; }
  .paw-benefits { padding: 30px 0; background: var(--sage-dark); color: #fff; }
  .paw-benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .paw-benefit { display: flex; gap: 13px; align-items: flex-start; }
  .paw-benefit-icon { flex: 0 0 auto; color: #e6bd87; }
  .paw-benefit strong { display: block; font: 700 13px 'Manrope', sans-serif; }
  .paw-benefit span { display: block; margin-top: 4px; color: #d1d9d0; font-size: 11px; }
  .paw-section { padding: 96px 0; }
  .paw-section-head { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 35px; }
  .paw-section h2 { margin: 10px 0 0; font: 700 clamp(32px, 4vw, 45px)/1.12 'Manrope', sans-serif; letter-spacing: -.035em; }
  .paw-section-intro { max-width: 380px; margin: 0 0 3px; color: var(--muted); font-size: 14px; line-height: 1.75; }
  .paw-services { background: #f3f1e9; }
  .paw-service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .paw-service { padding: 29px; border: 1px solid #e2e2d8; border-radius: 8px; background: rgba(255,255,255,.58); }
  .paw-service-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .paw-service h3 { margin: 0; font: 700 21px 'Manrope', sans-serif; }
  .paw-service-price { color: var(--sage-dark); font-size: 12px; font-weight: 700; text-align: right; }
  .paw-service-price small { display: block; color: var(--muted); font-size: 10px; font-weight: 500; }
  .paw-service p { margin: 14px 0 20px; color: var(--muted); font-size: 13px; line-height: 1.8; }
  .paw-service-link { display: inline-flex; align-items: center; gap: 7px; color: var(--sage-dark) !important; font-size: 12px; font-weight: 700; }
  .paw-addon-wrap { display: grid; grid-template-columns: .8fr 1.2fr; gap: 38px; margin-top: 25px; padding: 28px 31px; border-radius: 8px; background: var(--sage-dark); color: white; }
  .paw-addon-wrap h3 { margin: 0; font: 700 20px 'Manrope', sans-serif; }
  .paw-addon-wrap p { margin: 7px 0 0; color: #d4ddd3; font-size: 12px; }
  .paw-addon-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0 26px; }
  .paw-addon { display: flex; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px solid #ffffff2b; color: #f5f4ee; font-size: 12px; }
  .paw-addon strong { color: #e6bd87; }
  .paw-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 230px; gap: 14px; }
  .paw-gallery-item { position: relative; overflow: hidden; border-radius: 7px; background: var(--cream); }
  .paw-gallery-item img { height: 100%; transition: transform .5s; }
  .paw-gallery-item:hover img { transform: scale(1.04); }
  .paw-gallery-item::after { position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(24,33,27,.62)); content: ''; }
  .paw-gallery-tag { position: absolute; z-index: 1; left: 14px; bottom: 13px; padding: 7px 12px; border: 1px solid #ffffff55; border-radius: 999px; background: #fbfaf6ed; color: var(--ink); font-size: 11px; font-weight: 700; }
  .gallery-tall { grid-row: span 2; }
  .gallery-wide { grid-column: span 1; }
  .paw-quote { padding: 0 0 92px; }
  .paw-quote-inner { display: flex; align-items: center; justify-content: space-between; gap: 26px; padding: 31px 37px; border-radius: 8px; background: var(--sage-light); }
  .paw-quote-inner p { max-width: 640px; margin: 0; color: var(--sage-dark); font: 600 clamp(18px, 2.5vw, 25px)/1.45 'Manrope', sans-serif; }
  .paw-location { background: var(--cream); }
  .paw-location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .paw-location-art { position: relative; display: grid; place-items: center; min-height: 340px; overflow: hidden; border-radius: 8px; background: radial-gradient(ellipse at 70% 25%, #dae0d2 0 9%, transparent 9.5%), radial-gradient(ellipse at 25% 80%, #e2ddcb 0 17%, transparent 17.5%), linear-gradient(135deg, #e5e8df, #d3dccf); }
  .paw-location-art::before, .paw-location-art::after { position: absolute; width: 140%; height: 26px; border: 1px solid #aebaa9; border-width: 1px 0; content: ''; transform: rotate(-23deg); }
  .paw-location-art::after { transform: rotate(38deg); border-color: #c0c8b9; }
  .paw-map-pin { z-index: 1; display: grid; place-items: center; width: 65px; height: 65px; border: 6px solid #fbfaf6b3; border-radius: 50%; background: var(--sage-dark); color: white; box-shadow: 0 9px 25px #26322c35; }
  .paw-map-label { position: absolute; z-index: 1; right: 17px; bottom: 17px; padding: 9px 13px; border-radius: 6px; background: #fbfaf6eF; color: var(--sage-dark); font-size: 11px; font-weight: 700; }
  .paw-location h2 { margin: 11px 0 20px; font: 700 clamp(32px, 4vw, 43px)/1.12 'Manrope', sans-serif; letter-spacing: -.035em; }
  .paw-detail { display: flex; gap: 13px; align-items: flex-start; margin: 17px 0; }
  .paw-detail svg { flex: 0 0 auto; margin-top: 3px; color: var(--sage); }
  .paw-detail strong { display: block; font-size: 13px; }
  .paw-detail span { display: block; margin-top: 3px; color: var(--muted); font-size: 12px; }
  .paw-location .paw-btn { margin-top: 10px; }
  .paw-footer { padding: 28px 0; background: #293a30; color: #fff; }
  .paw-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .paw-footer .paw-brand-name span { color: #c9d0c8; }
  .paw-footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 20px; color: #e1e6df; font-size: 11px; }
  .paw-footer-links a:hover { color: #e6bd87; }
  .paw-copyright { width: 100%; margin-top: 3px; color: #b9c3ba; font-size: 10px; text-align: right; }
  .paw-modal-backdrop { position: fixed; z-index: 50; inset: 0; display: grid; place-items: center; padding: 18px; background: #1c2821a8; backdrop-filter: blur(5px); }
  .paw-modal { position: relative; width: min(620px, 100%); max-height: min(92vh, 850px); overflow-y: auto; padding: 34px; border-radius: 12px; background: var(--paper); box-shadow: 0 25px 90px #10161055; animation: paw-enter .2s ease-out; }
  @keyframes paw-enter { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
  .paw-modal-close { position: absolute; top: 17px; right: 17px; display: grid; place-items: center; width: 39px; height: 39px; border: 1px solid var(--line); border-radius: 50%; background: transparent; cursor: pointer; }
  .paw-modal h2 { margin: 10px 45px 7px 0; font: 700 29px/1.2 'Manrope', sans-serif; }
  .paw-modal-intro { margin: 0 0 23px; color: var(--muted); font-size: 13px; }
  .paw-form { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .paw-field { display: flex; flex-direction: column; gap: 6px; }
  .paw-field-full { grid-column: 1 / -1; }
  .paw-field label { font-size: 11px; font-weight: 700; }
  .paw-field input, .paw-field select, .paw-field textarea { width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid #dcded5; border-radius: 5px; outline: none; background: white; color: var(--ink); font-size: 13px; }
  .paw-field textarea { min-height: 72px; resize: vertical; }
  .paw-field input:focus, .paw-field select:focus, .paw-field textarea:focus { border-color: var(--sage); box-shadow: 0 0 0 3px #647b6820; }
  .paw-form .paw-btn { grid-column: 1 / -1; margin-top: 3px; }
  .paw-success { padding: 20px 0 5px; text-align: center; }
  .paw-success-mark { display: grid; place-items: center; width: 66px; height: 66px; margin: 0 auto 18px; border-radius: 50%; background: var(--sage-light); color: var(--sage-dark); }
  .paw-success h2 { margin: 0 auto 10px; }
  .paw-success p { max-width: 390px; margin: 0 auto 23px; color: var(--muted); font-size: 14px; }
  @media (max-width: 850px) {
    .paw-links { gap: 14px; }
    .paw-links a { font-size: 12px; }
    .paw-nav > .paw-btn { padding: 0 15px; }
    .paw-hero-grid { gap: 28px; min-height: 465px; }
    .paw-hero-image { min-height: 420px; }
    .paw-benefit-grid { grid-template-columns: repeat(2, 1fr); row-gap: 23px; }
    .paw-section { padding: 76px 0; }
  }
  @media (max-width: 640px) {
    .paw-wrap { width: min(100% - 36px, 480px); }
    .paw-nav { min-height: 67px; gap: 10px; }
    .paw-links { position: absolute; top: 66px; left: 0; right: 0; display: none; padding: 10px 18px 18px; border-bottom: 1px solid var(--line); background: var(--paper); }
    .paw-links.paw-links-open { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .paw-links a { padding: 12px 8px; }
    .paw-links a:last-child { display: block; }
    .paw-nav > .paw-btn { min-height: 41px; margin-left: auto; padding: 0 13px; font-size: 11px; }
    .paw-menu { display: grid; place-items: center; flex: 0 0 auto; }
    .paw-hero { padding: 34px 0 43px; }
    .paw-hero-grid { grid-template-columns: 1fr; gap: 28px; }
    .paw-hero h1 { max-width: 470px; margin-top: 15px; font-size: clamp(42px, 11vw, 57px); }
    .paw-hero-copy { font-size: 14px; }
    .paw-hero-image { min-height: 370px; border-radius: 48% 48% 14px 14px; }
    .paw-benefit-grid { grid-template-columns: 1fr 1fr; gap: 20px 12px; }
    .paw-benefit { gap: 9px; }
    .paw-benefit strong { font-size: 11px; }
    .paw-benefit span { font-size: 10px; line-height: 1.5; }
    .paw-section { padding: 65px 0; }
    .paw-section-head { align-items: flex-start; flex-direction: column; gap: 10px; margin-bottom: 25px; }
    .paw-section-intro { font-size: 13px; }
    .paw-service-grid { grid-template-columns: 1fr; gap: 12px; }
    .paw-service { padding: 22px; }
    .paw-addon-wrap { grid-template-columns: 1fr; gap: 15px; padding: 22px; }
    .paw-addon-list { gap: 0 16px; }
    .paw-addon { font-size: 11px; }
    .paw-gallery-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 180px; gap: 9px; }
    .gallery-tall { grid-row: span 2; }
    .paw-gallery-tag { left: 8px; bottom: 8px; padding: 6px 9px; font-size: 9px; }
    .paw-quote { padding-bottom: 65px; }
    .paw-quote-inner { align-items: flex-start; flex-direction: column; padding: 24px; }
    .paw-location-grid { grid-template-columns: 1fr; gap: 28px; }
    .paw-location-art { min-height: 255px; }
    .paw-footer-inner { align-items: flex-start; flex-direction: column; }
    .paw-footer-links { justify-content: flex-start; gap: 14px; }
    .paw-copyright { text-align: left; }
    .paw-modal { padding: 27px 21px; }
    .paw-form { grid-template-columns: 1fr; gap: 12px; }
    .paw-field-full, .paw-form .paw-btn { grid-column: auto; }
  }
  @media (prefers-reduced-motion: reduce) {
    .paw-site *, .paw-site *::before, .paw-site *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!isBookingOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsBookingOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isBookingOpen])

  const openBooking = () => {
    setIsSubmitted(false)
    setIsBookingOpen(true)
    setIsMenuOpen(false)
  }

  const closeBooking = () => setIsBookingOpen(false)

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="paw-site">
      <style>{styles}</style>
      <header className="paw-header">
        <div className="paw-wrap paw-nav">
          <a className="paw-brand" href="#top" aria-label="A Muddy Paw Pet Salon home">
            <span className="paw-mark"><Heart size={20} fill="currentColor" /></span>
            <span className="paw-brand-name">A MUDDY PAW<span>PET SALON · NEW MILFORD, CT</span></span>
          </a>
          <nav className={`paw-links${isMenuOpen ? ' paw-links-open' : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a>
          </nav>
          <button className="paw-btn" type="button" onClick={openBooking}>
            <CalendarDays size={16} /> Book appointment
          </button>
          <button className="paw-menu" type="button" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="paw-hero">
          <div className="paw-wrap paw-hero-grid">
            <div>
              <span className="paw-eyebrow">A little more love in every visit</span>
              <h1>Gentle Care.<br />Precision Cuts.<br /><em>Happier Pups.</em></h1>
              <p className="paw-hero-copy">Litchfield County’s premier low-stress pet spa. Experienced local groomers, thoughtful handling, and breed-aware styling for the four-legged family you love.</p>
              <div className="paw-actions">
                <button className="paw-btn" type="button" onClick={openBooking}>Request an appointment <ArrowRight size={16} /></button>
                <a className="paw-btn paw-btn-light" href={phoneLink}><Phone size={15} /> Call {phoneNumber}</a>
              </div>
              <div className="paw-local-note"><MapPin size={15} /> Right on Route 7 in New Milford, Connecticut</div>
            </div>
            <div className="paw-hero-image">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1100&q=85" alt="Freshly groomed golden retriever with a soft, shiny coat" />
              <div className="paw-image-note">
                <span className="paw-image-note-icon"><Heart size={18} /></span>
                <span><strong>Good grooming feels good.</strong><span>Patient, personal care for every pup.</span></span>
              </div>
            </div>
          </div>
        </section>

        <section className="paw-benefits" aria-label="The Muddy Paw difference">
          <div className="paw-wrap paw-benefit-grid">
            {benefits.map(({ icon: Icon, title, detail }) => (
              <div className="paw-benefit" key={title}>
                <Icon className="paw-benefit-icon" size={21} />
                <div><strong>{title}</strong><span>{detail}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="paw-section paw-services" id="services">
          <div className="paw-wrap">
            <div className="paw-section-head">
              <div><span className="paw-eyebrow">A fresh start, head to tail</span><h2>Care that fits<br />your best friend.</h2></div>
              <p className="paw-section-intro">Every coat has its own needs. We take the time to understand yours and make each visit feel comfortable, unhurried, and just right.</p>
            </div>
            <div className="paw-service-grid">
              <article className="paw-service">
                <div className="paw-service-top"><h3>Full Groom</h3><span className="paw-service-price">Custom quote<small>Based on breed, coat & size</small></span></div>
                <p>Bath, blowout, brush, sanitary trim, nail clip and file, ear cleaning, and a precision breed haircut, all finished with the details that make them unmistakably yours.</p>
                <button className="paw-service-link" type="button" onClick={openBooking}>Ask about a full groom <ArrowRight size={14} /></button>
              </article>
              <article className="paw-service">
                <div className="paw-service-top"><h3>Bath &amp; Tidy</h3><span className="paw-service-price">Custom quote<small>Based on breed, coat & size</small></span></div>
                <p>A full bath, blowout, brush, nails, and ears, finished with a neat face and paw trim. Just the refresh for a coat that needs a little extra love.</p>
                <button className="paw-service-link" type="button" onClick={openBooking}>Ask about a bath & tidy <ArrowRight size={14} /></button>
              </article>
            </div>
            <div className="paw-addon-wrap" id="pricing">
              <div><h3>Walk-in &amp; add-on bar</h3><p>A little extra care, with clear pricing.</p></div>
              <div className="paw-addon-list">
                {addOns.map(([name, price]) => <div className="paw-addon" key={name}><span>{name}</span><strong>{price}</strong></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="paw-section" id="gallery">
          <div className="paw-wrap">
            <div className="paw-section-head">
              <div><span className="paw-eyebrow">The after-bath wiggle</span><h2>Fresh cuts. Full hearts.</h2></div>
              <p className="paw-section-intro">A few happy faces and fresh-from-the-spa moments. Every pup brings a little something special to the salon.</p>
            </div>
            <div className="paw-gallery-grid">
              {gallery.map(({ image, alt, label, size }) => (
                <div className={`paw-gallery-item ${size}`} key={image}>
                  <img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`} alt={alt} loading="lazy" />
                  <span className="paw-gallery-tag">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="paw-quote">
          <div className="paw-wrap paw-quote-inner">
            <p>“The best kind of fresh is a clean pup who still feels like themselves.”</p>
            <button className="paw-btn" type="button" onClick={openBooking}>Let’s meet your pup <ArrowDownRight size={16} /></button>
          </div>
        </section>

        <section className="paw-section paw-location" id="location">
          <div className="paw-wrap paw-location-grid">
            <div className="paw-location-art" role="img" aria-label="Map illustration marking A Muddy Paw on Route 7 in New Milford">
              <span className="paw-map-pin"><MapPin size={27} /></span>
              <span className="paw-map-label">Route 7 · New Milford</span>
            </div>
            <div>
              <span className="paw-eyebrow">Your neighborhood pet spa</span>
              <h2>A happy place<br />for local pups.</h2>
              <div className="paw-detail"><MapPin size={19} /><div><strong>259 Danbury Road</strong><span>New Milford, CT 06776 · Route 7, across from Lore’s Plaza area</span></div></div>
              <div className="paw-detail"><Clock3 size={19} /><div><strong>Tuesday – Saturday</strong><span>8:00 AM – 3:00 PM · Appointment based</span></div></div>
              <div className="paw-detail"><Phone size={19} /><div><strong>Questions? We’re happy to help.</strong><span><a href={phoneLink}>{phoneNumber}</a> · <a href={emailLink}>Email the salon</a></span></div></div>
              <a className="paw-btn" href="https://www.google.com/maps/search/?api=1&query=259+Danbury+Road%2C+New+Milford%2C+CT+06776" target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="paw-footer">
        <div className="paw-wrap paw-footer-inner">
          <a className="paw-brand" href="#top" aria-label="A Muddy Paw Pet Salon home">
            <span className="paw-mark"><Heart size={19} fill="currentColor" /></span>
            <span className="paw-brand-name">A MUDDY PAW<span>SHANNON POWELL &amp; TEAM</span></span>
          </a>
          <div className="paw-footer-links">
            <span>259 Danbury Rd · Route 7, across from Lore’s Plaza area</span>
            <a href={phoneLink}>{phoneNumber}</a>
            <a href={emailLink}>Email us</a>
            <span className="paw-copyright">© {new Date().getFullYear()} A Muddy Paw Pet Salon</span>
          </div>
        </div>
      </footer>

      {isBookingOpen && (
        <div className="paw-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeBooking() }}>
          <section className="paw-modal" role="dialog" aria-modal="true" aria-labelledby="paw-modal-title">
            <button className="paw-modal-close" type="button" onClick={closeBooking} aria-label="Close appointment request"><X size={19} /></button>
            {isSubmitted ? (
              <div className="paw-success">
                <span className="paw-success-mark"><Check size={32} /></span>
                <h2 id="paw-modal-title">Request received!</h2>
                <p>Shannon and the team will text or call you within 24 hours to confirm your slot. We can’t wait to meet your pup.</p>
                <button className="paw-btn" type="button" onClick={closeBooking}>Sounds good</button>
              </div>
            ) : (
              <>
                <span className="paw-eyebrow">Let’s find a good time</span>
                <h2 id="paw-modal-title">Request an appointment</h2>
                <p className="paw-modal-intro">Tell us a little about your pet. Our team will be in touch to confirm a time.</p>
                <form className="paw-form" onSubmit={submitRequest}>
                  <div className="paw-field"><label htmlFor="pet-name">Pet name</label><input id="pet-name" name="petName" autoComplete="off" required /></div>
                  <div className="paw-field"><label htmlFor="pet-breed">Breed</label><input id="pet-breed" name="breed" required /></div>
                  <div className="paw-field"><label htmlFor="pet-weight">Weight range</label><select id="pet-weight" name="weight" defaultValue="" required><option value="" disabled>Select size</option><option>Small · under 20 lbs</option><option>Medium · 20–50 lbs</option><option>Large · 50–80 lbs</option><option>Giant · 80+ lbs</option></select></div>
                  <div className="paw-field"><label htmlFor="pet-service">Service needed</label><select id="pet-service" name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Full Groom</option><option>Bath &amp; Tidy</option><option>Nail clipping</option><option>Nail filing</option><option>Pawdicure</option><option>Cat nail trim</option><option>Teeth brushing</option><option>Not sure yet</option></select></div>
                  <div className="paw-field paw-field-full"><label htmlFor="preferred-time">Preferred days / times</label><input id="preferred-time" name="preferredTime" placeholder="For example, Thursday morning" required /></div>
                  <div className="paw-field"><label htmlFor="owner-name">Your name</label><input id="owner-name" name="ownerName" autoComplete="name" required /></div>
                  <div className="paw-field"><label htmlFor="owner-phone">Phone number</label><input id="owner-phone" name="phone" type="tel" autoComplete="tel" required /></div>
                  <button className="paw-btn" type="submit">Send appointment request <ArrowRight size={16} /></button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
