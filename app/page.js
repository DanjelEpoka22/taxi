import ScrollProgress from '../components/ScrollProgress';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BookingWizard from '../components/BookingWizard';
import FareEstimator from '../components/FareEstimator';
import BookingTimeline from '../components/BookingTimeline';
import FlightTracking from '../components/FlightTracking';
import DestinationsPricing from '../components/DestinationsPricing';
import LocationSection from '../components/LocationSection';
import TrustSection from '../components/TrustSection';
import Gallery from '../components/Gallery';
import FaqChat, { ChatWidget } from '../components/FaqChat';
import SOSSection from '../components/SOSSection';
import Newsletter from '../components/Newsletter';
import PaymentContact from '../components/PaymentContact';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import QuickBookingBar from '../components/QuickBookingBar';

function SectionTitle({ eyebrow, children }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">{eyebrow}</p>
      )}
      <h2 className="font-display font-bold text-2xl md:text-4xl tracking-tight">{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Hero />

      {/* the booking card floats up over the hero's bottom fade, so the
          video background visually flows straight into the booking section */}
      <section id="booking" className="relative z-10 max-w-6xl mx-auto px-5 -mt-16 md:-mt-24 scroll-mt-16">
        <div className="gradient-border shadow-2xl">
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <SectionTitle eyebrow="Rezervim i Menjëhershëm">Rezervo Udhëtimin Tënd</SectionTitle>
            <div className="grid lg:grid-cols-5 gap-6 items-start">
              <div className="lg:col-span-3">
                <BookingWizard />
              </div>
              <div className="lg:col-span-2 flex flex-col gap-6">
                <FareEstimator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <BookingTimeline />
          <FlightTracking />
        </div>
      </section>

      <div className="bg-[var(--surface)]/50 border-y border-[var(--border)]">
        <section id="destinations" className="max-w-6xl mx-auto px-5 py-16 md:py-24 scroll-mt-16">
          <SectionTitle eyebrow="Ku Të Çojmë">Destinacione &amp; Çmime</SectionTitle>
          <div id="pricing" className="scroll-mt-16">
            <DestinationsPricing />
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
        <SectionTitle eyebrow="Zona e Shërbimit">Ku Ndodhemi</SectionTitle>
        <LocationSection />
      </section>

      <section id="reviews" className="relative overflow-hidden max-w-6xl mx-auto px-5 py-16 md:py-24 scroll-mt-16">
        <div className="glow glow-accent w-80 h-80 top-0 left-1/4" />
        <div className="relative">
          <SectionTitle eyebrow="Besimi i Klientëve">{'Çfarë Thonë Për Ne'}</SectionTitle>
          <TrustSection />
        </div>
      </section>

      <div className="bg-[var(--surface)]/50 border-y border-[var(--border)]">
        <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
          <SectionTitle eyebrow="Flota">Galeria</SectionTitle>
          <Gallery />
        </section>
      </div>

      <section id="faq" className="max-w-6xl mx-auto px-5 py-16 md:py-24 scroll-mt-16">
        <SectionTitle eyebrow="Ndihmë">Pyetje të Shpeshta</SectionTitle>
        <FaqChat />
      </section>

      <section className="max-w-6xl mx-auto px-5 py-4 md:py-8">
        <SOSSection />
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <Newsletter />
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-5 py-16 md:py-24 scroll-mt-16">
        <SectionTitle eyebrow="Na Shkruaj">Kontakt</SectionTitle>
        <PaymentContact />
      </section>

      <Footer />

      <FloatingWhatsApp />
      <ChatWidget />
      <QuickBookingBar />
    </>
  );
}
