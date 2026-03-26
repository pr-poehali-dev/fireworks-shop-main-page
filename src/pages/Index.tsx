import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_SLIDES = [
  { img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/f0a28dfa-c51e-4922-a365-4ffec22d988f.jpg" },
  { img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/e41e4a63-8f3b-421b-8d9c-8e3469b9833d.jpg" },
  { img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/1923f43f-44b9-483b-9911-7b2189b95024.jpg" },
  { img: "https://cdn.poehali.dev/projects/6954bfe6-128d-4f4d-96b0-7855acb4980b/files/2b9dd31b-601d-45e4-a55d-70e127486104.jpg" },
];

const CATEGORIES = [
  { id: 1, icon: "🎆", name: "Салюты",  desc: "Батареи залпов",     count: 87  },
  { id: 2, icon: "🚀", name: "Ракеты",  desc: "Одиночные запуски",  count: 45  },
  { id: 3, icon: "⛲", name: "Фонтаны", desc: "Наземная пиро",      count: 63  },
  { id: 4, icon: "🎉", name: "Петарды", desc: "Хлопушки, бенгалы",  count: 112 },
  { id: 5, icon: "🎊", name: "Наборы",  desc: "Готовые комплекты",  count: 28  },
  { id: 6, icon: "✨", name: "Бенгалы", desc: "Световые эффекты",   count: 34  },
];

const PRODUCTS = [
  { id: 1, name: "Звёздный дождь",    category: "Салют",   shots: "100 залпов", price: 3490, oldPrice: 4200,  badge: "ХИТ",     stars: 5, reviews: 234, emoji: "🎆" },
  { id: 2, name: "Огненный шторм",    category: "Батарея", shots: "200 залпов", price: 6990, oldPrice: null,  badge: "НОВИНКА", stars: 5, reviews: 89,  emoji: "🔥" },
  { id: 3, name: "Золотой каскад",    category: "Салют",   shots: "49 залпов",  price: 1890, oldPrice: 2300,  badge: "−18%",    stars: 4, reviews: 156, emoji: "✨" },
  { id: 4, name: "Праздничный набор", category: "Набор",   shots: "Ассорти",    price: 4990, oldPrice: 5800,  badge: "ВЫГОДА",  stars: 5, reviews: 312, emoji: "🎊" },
  { id: 5, name: "Серебряный каскад", category: "Фонтан",  shots: "60 сек",     price: 990,  oldPrice: null,  badge: null,      stars: 4, reviews: 67,  emoji: "⛲" },
  { id: 6, name: "Галактика",         category: "Батарея", shots: "150 залпов", price: 8990, oldPrice: 10500, badge: "ПРЕМИУМ", stars: 5, reviews: 45,  emoji: "🌌" },
];

const ADVANTAGES = [
  { icon: "ShieldCheck", title: "Сертифицированная продукция", desc: "Вся пиротехника прошла сертификацию и соответствует ГОСТ" },
  { icon: "Truck",       title: "Доставка по всей России",    desc: "Быстрая доставка курьером или до пункта выдачи" },
  { icon: "Package",     title: "Более 300 позиций",          desc: "Огромный выбор от петард до профессиональных шоу" },
  { icon: "Headphones",  title: "Консультация эксперта",      desc: "Поможем подобрать пиротехнику под ваш праздник" },
];

const REVIEWS = [
  { id: 1, name: "Алексей М.",    city: "Москва",        stars: 5, date: "12 января 2025",  emoji: "👨", text: "Заказывал салют «Звёздный дождь» на Новый год — зрелище потрясающее! Всё приехало вовремя, упаковка надёжная. Уже планирую следующую покупку." },
  { id: 2, name: "Елена К.",      city: "Санкт-Петербург", stars: 5, date: "3 марта 2025",   emoji: "👩", text: "Купила праздничный набор на день рождения мужа. Отдельное спасибо менеджеру — помог подобрать именно то, что нужно. Будем постоянными клиентами!" },
  { id: 3, name: "Дмитрий С.",    city: "Казань",         stars: 4, date: "20 февраля 2025", emoji: "👨", text: "Хорошее соотношение цена/качество. Фонтаны горели ровно, без сюрпризов. Единственное — хотелось бы чуть больше выбора в разделе одиночных ракет." },
  { id: 4, name: "Ольга Р.",      city: "Екатеринбург",   stars: 5, date: "5 марта 2025",   emoji: "👩", text: "Заказывала уже третий раз — всегда всё отлично. «Галактика» произвела эффект разорвавшейся бомбы на свадьбе, гости были в восторге!" },
  { id: 5, name: "Игорь В.",      city: "Новосибирск",    stars: 5, date: "8 марта 2025",   emoji: "👨", text: "Оперативная доставка, честные описания товаров. Всё как на фото и видео. Буду рекомендовать друзьям!" },
  { id: 6, name: "Марина Т.",     city: "Краснодар",      stars: 4, date: "15 марта 2025",  emoji: "👩", text: "Красивые фейерверки, хорошая упаковка. Немного задержали доставку, но служба поддержки сразу всё объяснила. Товаром довольна." },
];

/* ── Дизайн-токены ── */
const BG    = "#0B0D18";   /* ночной синий */
const BG2   = "#0E1020";   /* чуть темнее для секций */
const SURF  = "#131525";   /* карточки */
const SURF2 = "#1A1D30";   /* бордеры */
const PINK  = "#FF2D78";   /* основной акцент */
const PINK2 = "#FF5599";   /* светлее для текстов */
const WHITE = "#ECF0FF";   /* почти белый */
const MUTED = "rgba(236,240,255,0.45)";
const FAINT = "rgba(236,240,255,0.18)";
const SLOGAN = "В нашей Галактике только одна Планета фейерверков";

/* ── Компоненты ── */
function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left:  `${(i * 47 + 9)  % 100}%`,
    top:   `${(i * 59 + 17) % 100}%`,
    dur:   `${2.5 + (i * 0.3) % 2.5}s`,
    del:   `${(i * 0.25) % 3}s`,
    sz:    i % 5 === 0 ? 3 : 2,
    color: i % 3 === 0 ? PINK : i % 3 === 1 ? PINK2 : "rgba(200,180,255,0.8)",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.sz, height: p.sz,
            background: p.color, opacity: 0.4,
            animation: `float ${p.dur} ease-in-out ${p.del} infinite` }} />
      ))}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? PINK : FAINT, fontSize: 12 }}>★</span>
      ))}
    </span>
  );
}

export default function Index() {
  const [cartCount, setCartCount] = useState(0);
  const [addedId,   setAddedId]   = useState<number | null>(null);
  const [slide,     setSlide]     = useState(0);
  const [typed,     setTyped]     = useState("");
  const [visible,   setVisible]   = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    let i = 0; setTyped("");
    const t = setInterval(() => {
      if (i < SLOGAN.length) setTyped(SLOGAN.slice(0, ++i)); else clearInterval(t);
    }, 48);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => new Set([...v, e.target.id])); });
    }, { threshold: 0.1 });
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
    <div style={{ background: BG, color: WHITE, fontFamily: "Roboto, sans-serif", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50"
        style={{ background: "rgba(11,13,24,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${SURF2}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎆</span>
            <div className="leading-none">
              <div className="font-oswald font-bold text-base tracking-wide" style={{ color: PINK }}> ПЛАНЕТА</div>
              <div className="font-oswald text-[10px] tracking-[0.22em] uppercase" style={{ color: PINK2 }}>ФЕЙЕРВЕРКОВ</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-7">
            {["Каталог","Акции","О нас","Доставка","Контакты"].map(n => (
              <a key={n} href="#" className="text-sm font-medium transition-colors"
                style={{ color: MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = PINK2)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden sm:flex items-center gap-1.5 text-sm font-medium font-oswald"
              style={{ color: WHITE }}>
              <Icon name="Phone" size={14} style={{ color: PINK }} />
              8 800 123-45-67
            </a>
            <button className="relative p-2 rounded-lg transition-all hover:scale-110"
              style={{ background: `rgba(255,45,120,0.1)`, border: `1px solid rgba(255,45,120,0.22)` }}>
              <Icon name="ShoppingCart" size={19} style={{ color: PINK }} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center"
                  style={{ background: PINK, color: "#fff" }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: slide === i ? 1 : 0 }}>
            <img src={s.img} className="w-full h-full object-cover" style={{ opacity: 0.38 }} alt="" />
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(11,13,24,0.97) 0%, rgba(11,13,24,0.65) 55%, rgba(11,13,24,0.35) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(11,13,24,0.95) 0%, transparent 45%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 10% 60%, rgba(255,45,120,0.08) 0%, transparent 50%)` }} />

        <Particles />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div style={{ maxWidth: 580 }}>
            {/* Бренд над заголовком */}
            <div className="mb-3 animate-fade-in" style={{ opacity: 0, animationDelay: "0s" }}>
              <span className="font-oswald font-semibold tracking-[0.2em] uppercase text-sm"
                style={{ color: PINK2 }}>
                🎆 Планета Фейерверков
              </span>
            </div>

            {/* Заголовок */}
            <h1 className="font-oswald font-bold leading-[0.93] mb-5 animate-fade-in"
              style={{ fontSize: "clamp(3rem, 8.5vw, 6rem)", opacity: 0, animationDelay: "0.12s" }}>
              <span style={{ color: WHITE }}>ВЗОРВИ</span>
              <br />
              <span className="text-gradient-pink">ПРАЗДНИК</span>
            </h1>

            {/* Слоган */}
            <p className="text-base md:text-lg leading-relaxed mb-9 animate-fade-in"
              style={{ color: MUTED, maxWidth: 500, opacity: 0, animationDelay: "0.28s" }}>
              {typed}
              <span className="inline-block w-px h-4 ml-0.5 align-middle animate-pulse"
                style={{ background: PINK, opacity: typed.length < SLOGAN.length ? 1 : 0 }} />
            </p>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in"
              style={{ opacity: 0, animationDelay: "0.44s" }}>
              <button className="btn-primary px-8 py-3.5 rounded-xl text-sm">
                🎆 Смотреть каталог
              </button>
              <button className="btn-outline px-8 py-3.5 rounded-xl text-sm">
                Акции и скидки
              </button>
            </div>

            {/* Статистика */}
            <div className="flex flex-wrap gap-10 animate-fade-in"
              style={{ opacity: 0, animationDelay: "0.58s" }}>
              {[{ v: "300+", l: "товаров" }, { v: "15 000+", l: "клиентов" }, { v: "10 лет", l: "на рынке" }].map(s => (
                <div key={s.l}>
                  <div className="font-oswald font-bold text-2xl" style={{ color: PINK }}>{s.v}</div>
                  <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: FAINT }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Точки слайдера */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{ height: 6, width: slide === i ? 24 : 6, background: slide === i ? PINK : FAINT }} />
          ))}
        </div>

        <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1.5 animate-float">
          <span style={{ color: FAINT, fontSize: 9, letterSpacing: "0.2em", writingMode: "vertical-rl" }}>SCROLL</span>
          <Icon name="ChevronDown" size={14} style={{ color: FAINT }} />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="cats" ref={setRef("cats")} className="py-20" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${vis("cats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: PINK2 }}>Что мы предлагаем</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: WHITE }}>
              Категории <span className="text-gradient-pink">товаров</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <button key={cat.id}
                className={`group p-5 rounded-2xl text-center card-hover ${vis("cats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`,
                  transition: `opacity .6s ${i*0.07}s, transform .6s ${i*0.07}s` }}>
                <div className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl icon-box group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="font-oswald font-semibold text-sm mb-0.5" style={{ color: WHITE }}>{cat.name}</div>
                <div className="text-xs mb-1" style={{ color: MUTED }}>{cat.desc}</div>
                <div className="text-xs font-semibold" style={{ color: PINK2 }}>{cat.count} шт.</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6"
            style={{ background: `linear-gradient(120deg, #130820 0%, #1C0D2E 50%, #130820 100%)`,
              border: `1px solid rgba(255,45,120,0.2)` }}>
            <div className="absolute -right-8 -top-8 w-56 h-56 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(255,45,120,0.07)" }} />
            <div className="text-6xl animate-float">🎆</div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.25em] mb-1.5 font-oswald" style={{ color: PINK2 }}>Акция недели</div>
              <h3 className="font-oswald font-bold text-2xl md:text-3xl mb-1.5" style={{ color: WHITE }}>
                Скидка <span style={{ color: PINK }}>20%</span> на все наборы
              </h3>
              <p className="text-sm" style={{ color: MUTED }}>Только до конца месяца — успей заказать праздничный комплект!</p>
            </div>
            <button className="btn-primary px-7 py-3 rounded-xl text-sm whitespace-nowrap">Получить скидку</button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="prods" ref={setRef("prods")} className="py-20" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between mb-10 transition-all duration-700 ${vis("prods") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: PINK2 }}>Наши товары</div>
              <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: WHITE }}>
                Популярные <span className="text-gradient-pink">позиции</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = PINK2)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
              Все товары <Icon name="ArrowRight" size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <div key={p.id}
                className={`relative rounded-2xl overflow-hidden card-hover ${vis("prods") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`,
                  transition: `opacity .6s ${i*0.08}s, transform .6s ${i*0.08}s` }}>
                {p.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[11px] font-bold font-oswald tracking-wide"
                    style={{ background: PINK, color: "#fff" }}>{p.badge}</div>
                )}
                <div className="h-44 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, #0F1020, #181A2E)` }}>
                  <span className="text-6xl animate-float" style={{ animationDelay: `${i*0.28}s` }}>{p.emoji}</span>
                  <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, rgba(255,45,120,0.35) 0%, transparent 65%)` }} />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium mb-1" style={{ color: PINK2 }}>{p.category} · {p.shots}</div>
                  <h3 className="font-oswald font-semibold text-xl mb-2" style={{ color: WHITE }}>{p.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Stars n={p.stars} />
                    <span className="text-xs" style={{ color: FAINT }}>{p.reviews} отзывов</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-oswald font-bold text-xl" style={{ color: PINK }}>
                        {p.price.toLocaleString("ru-RU")} ₽
                      </span>
                      {p.oldPrice && (
                        <span className="ml-2 text-sm line-through" style={{ color: FAINT }}>
                          {p.oldPrice.toLocaleString("ru-RU")} ₽
                        </span>
                      )}
                    </div>
                    <button onClick={() => addCart(p.id)}
                      className="p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: addedId === p.id ? "rgba(74,222,128,0.12)" : "rgba(255,45,120,0.1)",
                        border: `1px solid ${addedId === p.id ? "rgba(74,222,128,0.35)" : "rgba(255,45,120,0.25)"}`,
                        color: addedId === p.id ? "#4ade80" : PINK,
                      }}>
                      <Icon name={addedId === p.id ? "Check" : "ShoppingCart"} size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-primary px-10 py-3.5 rounded-xl text-sm">Показать все товары</button>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="adv" ref={setRef("adv")} className="py-20" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${vis("adv") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: PINK2 }}>Почему мы</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: WHITE }}>
              Наши <span className="text-gradient-pink">преимущества</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a, i) => (
              <div key={a.title}
                className={`p-6 rounded-2xl card-hover ${vis("adv") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`,
                  transition: `opacity .6s ${i*0.1}s, transform .6s ${i*0.1}s` }}>
                <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center icon-box">
                  <Icon name={a.icon} size={20} style={{ color: PINK }} />
                </div>
                <h3 className="font-oswald font-semibold text-lg mb-2" style={{ color: WHITE }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" ref={setRef("reviews")} className="py-20" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${vis("reviews") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-xs uppercase tracking-[0.28em] mb-2 font-oswald" style={{ color: PINK2 }}>Что говорят клиенты</div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: WHITE }}>
              Отзывы <span className="text-gradient-pink">покупателей</span>
            </h2>
            {/* Суммарный рейтинг */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: PINK, fontSize: 22 }}>★</span>
                ))}
              </div>
              <span className="font-oswald font-bold text-3xl" style={{ color: WHITE }}>4.9</span>
              <span className="text-sm" style={{ color: MUTED }}>на основе 1 200+ отзывов</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.id}
                className={`p-6 rounded-2xl card-hover flex flex-col gap-4 ${vis("reviews") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ background: SURF, border: `1px solid ${SURF2}`,
                  transition: `opacity .6s ${i*0.08}s, transform .6s ${i*0.08}s` }}>
                {/* Шапка */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "rgba(255,45,120,0.1)", border: `1px solid rgba(255,45,120,0.2)` }}>
                      {r.emoji}
                    </div>
                    <div>
                      <div className="font-oswald font-semibold text-sm leading-none mb-0.5" style={{ color: WHITE }}>{r.name}</div>
                      <div className="text-xs" style={{ color: MUTED }}>{r.city}</div>
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: FAINT }}>{r.date}</div>
                </div>

                {/* Звёзды */}
                <Stars n={r.stars} />

                {/* Текст */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                  "{r.text}"
                </p>

                {/* Верифицировано */}
                <div className="flex items-center gap-1.5">
                  <Icon name="BadgeCheck" size={13} style={{ color: PINK }} />
                  <span className="text-xs" style={{ color: FAINT }}>Подтверждённая покупка</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline px-8 py-3.5 rounded-xl text-sm">Читать все отзывы</button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" ref={setRef("cta")} className="py-24 relative overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%)" }} />
        </div>
        <div className={`max-w-2xl mx-auto px-4 text-center transition-all duration-700 ${vis("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-5xl mb-6 animate-float">🎆</div>
          <h2 className="font-oswald font-bold text-4xl md:text-5xl mb-4" style={{ color: WHITE }}>
            Готов устроить<br /><span className="text-gradient-pink">незабываемое шоу?</span>
          </h2>
          <p className="text-base mb-8" style={{ color: MUTED }}>
            Свяжитесь с нами — поможем подобрать пиротехнику под ваш бюджет и подарим промокод на первый заказ!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn-primary px-8 py-3.5 rounded-xl text-sm">📞 Заказать консультацию</button>
            <button className="btn-outline px-8 py-3.5 rounded-xl text-sm">Написать в WhatsApp</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080910", borderTop: `1px solid ${SURF2}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-2xl">🎆</span>
                <div>
                  <div className="font-oswald font-bold text-base" style={{ color: PINK }}>ПЛАНЕТА</div>
                  <div className="font-oswald text-[10px] tracking-widest" style={{ color: PINK2 }}>ФЕЙЕРВЕРКОВ</div>
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
                <h4 className="font-oswald font-semibold text-sm uppercase tracking-wider mb-4"
                  style={{ color: PINK }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors" style={{ color: MUTED }}
                        onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                        {l}
                      </a>
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
