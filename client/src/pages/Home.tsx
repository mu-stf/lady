
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-neutral-900 text-white overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="container relative h-full flex flex-col justify-center gap-8 z-10">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-9xl font-black max-w-5xl tracking-tighter leading-[0.9] text-white"
          >
            {t('hero.title', 'Pure Elegance')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-3xl max-w-xl text-neutral-300 font-light leading-relaxed"
          >
            {t('hero.subtitle', 'The pinnacle of Iraqi luxury fashion. Tailored for those who lead.')}
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex gap-6 mt-4"
          >
            <Link to="/products">
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 px-12 py-8 text-xl rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95">
                {t('common.shopNow', 'Explore Collection')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">{t('home.categories', 'Curated Collections')}</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Abayas', 'Dresses', 'Accessories'].map((cat, i) => {
             const images: Record<string, string> = {
                Abayas: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1935&auto=format&fit=crop",
                Dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop",
                Accessories: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2000&auto=format&fit=crop"
             };
             
             return (
             <Link to={`/products?category=${cat}`} key={cat} className="block">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="aspect-[3/4] group cursor-pointer relative overflow-hidden rounded-sm"
                 >
                    <img 
                        src={images[cat]} 
                        alt={cat}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white tracking-widest uppercase border-b-2 border-transparent group-hover:border-white transition-all pb-2">
                            {cat}
                        </span>
                    </div>
                 </motion.div>
             </Link>
          )})}
        </div>
      </section>

      {/* Newsletter / Brand Statement */}
      <section className="bg-neutral-900 text-white py-24">
         <div className="container text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif italic">"Elegance is not standing out, but being remembered."</h2>
            <p className="text-neutral-400">Defining modern luxury for the Iraqi woman.</p>
         </div>
      </section>
    </div>
  );
}
