import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ── Дизайн-токены ── */
const BG    = "#06070F";
const SURF  = "#0D0F1C";
const SURF2 = "#141628";
const GOLD  = "#F5C842";
const GOLD2 = "#E8A020";
const GOLD3 = "#FFD966";
const CREAM = "#EDE8D5";
const MUTED = "rgba(237,232,213,0.45)";
const FAINT = "rgba(237,232,213,0.18)";

/* ── Картинки ── */
const HERO_IMGS = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
  "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=1200&q=80",
  "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=80",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=1200&q=80",
];

const PRODUCT_IMGS = [
  "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&q=80",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80",
  "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=600&q=80",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&q=80",
];

const CATEGORIES = [
  { icon: "🎆", name: "Салюты",  desc: "Батареи залпов",    count: 87  },
  { icon: "🚀", name: "Ракеты",  desc: "Одиночные запуски", count: 45  },
  { icon: "⛲", name: "Фонтаны", desc: "Наземная пиро",     count: 63  },
  { icon: "🎉", name: "Петарды", desc: "Хлопушки, бенгалы", count: 112 },
  { icon: "🎊", name: "Наборы",  desc: "Комплекты",         count: 28  },
  { icon: "✨", name: "Бенгалы", desc: "Световые эффекты",  count: 34  },
];

const PRODUCTS = [
  { id: 1, name: "Звёздный дождь",    cat: "Салют",   shots: "100 залпов", price: 3490, old: 4200,  badge: "ХИТ",     stars: 5, rev: 234 },
  { id: 2, name: "Огненный шторм",    cat: "Батарея", shots: "200 залпов", price: 6990, old: null,  badge: "НОВИНКА", stars: 5, rev: 89  },
  { id: 3, name: "Золотой каскад",    cat: "Салют",   shots: "49 залпов",  price: 1890, old: 2300,  badge: "−18%",    stars: 4, rev: 156 },
  { id: 4, name: "Праздничный набор", cat: "Набор",   shots: "Ассорти",    price: 4990, old: 5800,  badge: "ВЫГОДА",  stars: 5, rev: 312 },
  { id: 5, name: "Серебряный каскад", cat: "Фонтан",  shots: "60 сек",     price: 990,  old: null,  badge: null,      stars: 4, rev: 67  },
  { id: 6, name: "Галактика",         cat: "Батарея", shots: "150 залпов", price: 8990, old: 10500, badge: "ПРЕМИУМ", stars: 5, rev: 45  },
];

const ADVANTAGES = [
  { icon: "ShieldCheck", title: "Сертифицированная продукция", desc: "Вся пиротехника прошла сертификацию по ГОСТ" },
  { icon: "Truck",       title: "Доставка по всей России",    desc: "Курьером или до пункта выдачи" },
  { icon: "Package",     title: "Более 300 позиций",          desc: "От петард до профессиональных шоу" },
  { icon: "Headphones",  title: "Консультация эксперта",      desc: "Поможем подобрать под ваш праздник" },
];

const REVIEWS = [
  { id: 1, name: "Алексей М.",  city: "Москва",           stars: 5, date: "12 янв 2025",  text: "Заказывал «Звёздный дождь» на Новый год — зрелище потрясающее! Всё приехало вовремя, упаковка надёжная." },
  { id: 2, name: "Елена К.",    city: "Санкт-Петербург",  stars: 5, date: "3 мар 2025",   text: "Купила праздничный набор на день рождения мужа. Менеджер помог подобрать именно то что нужно. Будем постоянными клиентами!" },
  { id: 3, name: "Дмитрий С.",  city: "Казань",           stars: 4, date: "20 фев 2025",  text: "Хорошее соотношение цена/качество. Фонтаны горели ровно, без сюрпризов. Рекомендую." },
  { id: 4, name: "Ольга Р.",    city: "Екатеринбург",     stars: 5, date: "5 мар 2025",   text: "«Галактика» произвела эффект разорвавшейся бомбы на свадьбе — гости были в восторге! Заказываю уже третий раз." },
  { id: 5, name: "Игорь В.",    city: "Новосибирск",      stars: 5, date: "8 мар 2025",   text: "Оперативная доставка, честные описания. Всё как на фото. Буду рекомендовать друзьям!" },
  { id: 6, name: "Марина Т.",   city: "Краснодар",        stars: 4, date: "15 мар 2025",  text: "Красивые фейерверки, хорошая упаковка. Служба поддержки всегда на связи. Товаром очень довольна." },
];

/* ── Звёздное небо ── */
function StarsBg() {
  const stars = Array.from({ length: 130 }, (_, i) => ({
    x:  `${(i * 83 + 7)  % 100}%`,
    y:  `${(i * 61 + 13) % 100}%`,
    r:  i % 12 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1,
    dur: `${2 + (i * 0.17) % 4}s`,
    del: `${(i * 0.23) % 5}s`,
    op:  i % 8 === 0 ? 0.9 : i % 4 === 0 ? 0.6 : 0.25,
    col: i % 6 === 0 ? GOLD3 : i % 7 === 0 ? GOLD : "#fff",
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.col} opacity={s.op}
            style={{ animation: `twinkle ${s.dur} ease-in-out ${s.del} infinite` }} />
        ))}
      </svg>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? GOLD : FAINT, fontSize: 12 }}>★</span>
      ))}
    </span>
  );
}

export default function Index() {
  const [cartCount, setCartCount] = useState(0);
  const [addedId,   setAddedId]   = useState<number | null>(null);
  const [slide,     setSlide]     = useState(0);
  const [visible,   setVisible]   = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_IMGS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => new Set([...v, e.target.id])); });
    }, { threshold: 0.08 });
    Object.values(refs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };
  const vis    = (id: string) => visible.has(id);

  const addCart = (id: number) => {
    setCartCount(c => c + 1); setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div style={{ background: BG, color: CREAM, fontFamily: "Roboto, sans-serif", minHeight: "100vh", position: "relative" }}>
      <StarsBg />

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50"
        style={{ background: "rgba(6,7,15,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(245,200,66,0.1)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎆</span>
            <div className="leading-none">
              <div className="font-oswald font-bold text-base tracking-wide" style={{ color: GOLD }}>ПЛАНЕТА</div>
              <div className="font-oswald text-[10px] tracking-[0.22em] uppercase" style={{ color: GOLD2 }}>ФЕЙЕРВЕРКОВ</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            {["Каталог","Акции","О нас","Доставка","Контакты"].map(n => (
              <a key={n} href="#" className="text-sm font-medium transition-colors" style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD3)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: CREAM }}>
              <Icon name="Phone" size={14} style={{ color: GOLD }} />8 800 123-45-67
            </a>
            <button className="relative p-2 rounded-lg transition-all hover:scale-110"
              style={{ background: "rgba(245,200,66,0.08)", border: `1px solid rgba(245,200,66,0.2)` }}>
              <Icon name="ShoppingCart" size={19} style={{ color: GOLD }} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center"
                  style={{ background: GOLD, color: BG }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO — две колонки ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ zIndex: 1 }}>
        {HERO_IMGS.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: slide === i ? 1 : 0 }}>
            <img src={src} className="w-full h-full object-cover" style={{ opacity: 0.22 }} alt="" />
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(6,7,15,0.98) 0%, rgba(6,7,15,0.75) 55%, rgba(6,7,15,0.45) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(6,7,15,1) 0%, transparent 40%)" }} />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Левая: текст */}
            <div>
              <div className="animate-fade-in mb-3" style={{ animationDelay: "0s" }}>
                <span className="text-xs uppercase tracking-[0.28em] font-oswald" style={{ color: GOLD2 }}>
                  ✦ Профессиональная пиротехника
                </span>
              </div>
              <h1 className="font-oswald font-bold leading-[0.9] mb-6 animate-fade-in"
                style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)", animationDelay: "0.1s" }}>
                <span style={{ color: CREAM }}>ПЛАНЕТА</span>
                <br />
                <span style={{
                  background: `linear-gradient(115deg, ${GOLD3} 0%, ${GOLD} 45%, ${GOLD3} 100%)`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s linear infinite",
                }}>ФЕЙЕРВЕРКОВ</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 animate-fade-in"
                style={{ color: MUTED, maxWidth: 460, animationDelay: "0.22s" }}>
                Более 300 видов сертифицированной пиротехники. Доставляем по всей России — превратим любой праздник в незабываемое шоу.
              </p>
              <div className="flex flex-wrap gap-3 mb-12 animate-fade-in" style={{ animationDelay: "0.34s" }}>
                <button className="btn-gold px-8 py-3.5 rounded-xl text-sm">🎆 Смотреть каталог</button>
                <button className="btn-ghost px-8 py-3.5 rounded-xl text-sm">Акции и скидки</button>
              </div>
              <div className="flex gap-10 animate-fade-in" style={{ animationDelay: "0.46s" }}>
                {[{ v: "300+", l: "товаров" }, { v: "15 000+", l: "клиентов" }, { v: "10 лет", l: "на рынке" }].map(s => (
                  <div key={s.l}>
                    <div className="font-oswald font-bold text-2xl" style={{ color: GOLD }}>{s.v}</div>
                    <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: FAINT }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая: фото-коллаж */}
            <div className="hidden lg:grid grid-cols-2 gap-3 animate-fade-in relative" style={{ animationDelay: "0.3s" }}>
              <div className="rounded-2xl overflow-hidden" style={{ height: 290 }}>
                <img src={HERO_IMGS[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
              </div>
              <div className="rounded-2xl overflow-hidden mt-10" style={{ height: 290 }}>
                <img src={HERO_IMGS[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ height: 210 }}>
                <img src={HERO_IMGS[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
              </div>
              <div className="rounded-2xl overflow-hidden mt-4" style={{ height: 210 }}>
                <img src={HERO_IMGS[3]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
              </div>
              <div className="absolute -z-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(245,200,66,0.06)", right: "-5%", top: "20%" }} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className="rounded-full transition-all duration-300"
              style={{ height: 5, width: slide === i ? 22 : 5, background: slide === i ? GOLD : FAINT }} />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="cats" ref={setRef("cats")} className="py-20 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${vis("cats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: GOLD2 }}>Ассортимент</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: CREAM }}>
              Категории <span style={{ color: GOLD }}>товаров</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <button key={cat.name}
                className={`group p-5 rounded-2xl text-center card-glow ${vis("cats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`, transition: `opacity .6s ${i*0.07}s, transform .6s ${i*0.07}s` }}>
                <div className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl icon-box-gold group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="font-oswald font-semibold text-sm mb-0.5" style={{ color: CREAM }}>{cat.name}</div>
                <div className="text-xs mb-1" style={{ color: MUTED }}>{cat.desc}</div>
                <div className="text-xs font-semibold" style={{ color: GOLD }}>{cat.count} шт.</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-4 px-4 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6"
            style={{ background: "linear-gradient(120deg, #100D04 0%, #1C1500 50%, #100D04 100%)", border: `1px solid rgba(245,200,66,0.2)` }}>
            <div className="absolute -right-8 -top-8 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(245,200,66,0.07)" }} />
            <div className="text-5xl animate-float">🎆</div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.25em] mb-1.5 font-oswald" style={{ color: GOLD2 }}>Акция недели</div>
              <h3 className="font-oswald font-bold text-2xl md:text-3xl mb-1.5" style={{ color: CREAM }}>
                Скидка <span style={{ color: GOLD }}>20%</span> на все наборы
              </h3>
              <p className="text-sm" style={{ color: MUTED }}>Только до конца месяца — успей заказать праздничный комплект!</p>
            </div>
            <button className="btn-gold px-7 py-3 rounded-xl text-sm whitespace-nowrap">Получить скидку</button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="prods" ref={setRef("prods")} className="py-20 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between mb-10 transition-all duration-700 ${vis("prods") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: GOLD2 }}>Наши товары</div>
              <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: CREAM }}>
                Популярные <span style={{ color: GOLD }}>позиции</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD3)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
              Все товары <Icon name="ArrowRight" size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <div key={p.id}
                className={`relative rounded-2xl overflow-hidden card-glow ${vis("prods") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`, transition: `opacity .6s ${i*0.08}s, transform .6s ${i*0.08}s` }}>
                {p.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[11px] font-bold font-oswald tracking-wide"
                    style={{ background: GOLD, color: BG }}>{p.badge}</div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img src={PRODUCT_IMGS[i]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={p.name} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 55%, ${SURF} 100%)` }} />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium mb-1" style={{ color: GOLD2 }}>{p.cat} · {p.shots}</div>
                  <h3 className="font-oswald font-semibold text-xl mb-2" style={{ color: CREAM }}>{p.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Stars n={p.stars} />
                    <span className="text-xs" style={{ color: FAINT }}>{p.rev} отзывов</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-oswald font-bold text-xl" style={{ color: GOLD }}>
                        {p.price.toLocaleString("ru-RU")} ₽
                      </span>
                      {p.old && (
                        <span className="ml-2 text-sm line-through" style={{ color: FAINT }}>
                          {p.old.toLocaleString("ru-RU")} ₽
                        </span>
                      )}
                    </div>
                    <button onClick={() => addCart(p.id)}
                      className="p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: addedId === p.id ? "rgba(74,222,128,0.12)" : "rgba(245,200,66,0.08)",
                        border: `1px solid ${addedId === p.id ? "rgba(74,222,128,0.35)" : "rgba(245,200,66,0.22)"}`,
                        color: addedId === p.id ? "#4ade80" : GOLD,
                      }}>
                      <Icon name={addedId === p.id ? "Check" : "ShoppingCart"} size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="btn-gold px-10 py-3.5 rounded-xl text-sm">Смотреть все товары</button>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="adv" ref={setRef("adv")} className="py-20 relative" style={{ zIndex: 1, background: "rgba(10,11,18,0.7)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${vis("adv") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: GOLD2 }}>Почему мы</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: CREAM }}>
              Наши <span style={{ color: GOLD }}>преимущества</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a, i) => (
              <div key={a.title}
                className={`p-6 rounded-2xl card-glow ${vis("adv") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`, transition: `opacity .6s ${i*0.1}s, transform .6s ${i*0.1}s` }}>
                <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center icon-box-gold">
                  <Icon name={a.icon} size={20} style={{ color: GOLD }} />
                </div>
                <h3 className="font-oswald font-semibold text-lg mb-2" style={{ color: CREAM }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" ref={setRef("reviews")} className="py-20 relative" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${vis("reviews") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: GOLD2 }}>Отзывы</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: CREAM }}>
              Что говорят <span style={{ color: GOLD }}>клиенты</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: GOLD, fontSize: 22 }}>★</span>
              ))}
              <span className="font-oswald font-bold text-3xl ml-1" style={{ color: CREAM }}>4.9</span>
              <span className="text-sm" style={{ color: MUTED }}>более 1 200 отзывов</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.id}
                className={`p-6 rounded-2xl card-glow flex flex-col gap-3 ${vis("reviews") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`, transition: `opacity .6s ${i*0.08}s, transform .6s ${i*0.08}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-oswald font-bold text-sm flex-shrink-0"
                      style={{ background: "rgba(245,200,66,0.1)", border: `1px solid rgba(245,200,66,0.2)`, color: GOLD }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-oswald font-semibold text-sm" style={{ color: CREAM }}>{r.name}</div>
                      <div className="text-xs" style={{ color: MUTED }}>{r.city}</div>
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: FAINT }}>{r.date}</div>
                </div>
                <Stars n={r.stars} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>"{r.text}"</p>
                <div className="flex items-center gap-1.5">
                  <Icon name="BadgeCheck" size={13} style={{ color: GOLD }} />
                  <span className="text-xs" style={{ color: FAINT }}>Подтверждённая покупка</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="btn-ghost px-8 py-3.5 rounded-xl text-sm">Читать все отзывы</button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" ref={setRef("cta")} className="py-24 relative overflow-hidden"
        style={{ zIndex: 1, background: "rgba(10,11,18,0.7)" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)" }} />
        </div>
        <div className={`max-w-2xl mx-auto px-4 text-center transition-all duration-700 relative ${vis("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-5xl mb-6 animate-float">✨</div>
          <h2 className="font-oswald font-bold text-4xl md:text-5xl mb-4" style={{ color: CREAM }}>
            Готовы устроить<br /><span style={{ color: GOLD }}>незабываемое шоу?</span>
          </h2>
          <p className="text-base mb-8" style={{ color: MUTED }}>
            Свяжитесь с нами — поможем подобрать пиротехнику под ваш бюджет и подарим промокод на первый заказ!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn-gold px-8 py-3.5 rounded-xl text-sm">📞 Заказать консультацию</button>
            <button className="btn-ghost px-8 py-3.5 rounded-xl text-sm">Написать в WhatsApp</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#04050A", borderTop: `1px solid ${SURF2}`, position: "relative", zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-2xl">🎆</span>
                <div>
                  <div className="font-oswald font-bold text-base" style={{ color: GOLD }}>ПЛАНЕТА</div>
                  <div className="font-oswald text-[10px] tracking-widest" style={{ color: GOLD2 }}>ФЕЙЕРВЕРКОВ</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: FAINT }}>
                Профессиональная пиротехника для любого праздника. Работаем с 2014 года.
              </p>
            </div>
            {[
              { title: "Каталог",  links: ["Салюты","Ракеты","Фонтаны","Петарды","Наборы"] },
              { title: "Компания", links: ["О нас","Доставка","Оплата","Возврат","Вакансии"] },
              { title: "Контакты", links: ["8 800 123-45-67","info@planeta-fw.ru","Пн–Вс 9:00–21:00"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-oswald font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: GOLD }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors" style={{ color: MUTED }}
                        onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8"
            style={{ borderTop: `1px solid ${SURF2}` }}>
            <p className="text-xs" style={{ color: FAINT }}>© 2024 Планета Фейерверков. Все права защищены.</p>
            <p className="text-xs" style={{ color: FAINT }}>Пиротехника для лиц старше 18 лет.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
