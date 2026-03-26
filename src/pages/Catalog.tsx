import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ── Токены (те же что в Index.tsx) ── */
const BG    = "#06070F";
const SURF  = "#0D0F1C";
const SURF2 = "#141628";
const GOLD  = "#F5C842";
const GOLD2 = "#E8A020";
const GOLD3 = "#FFD966";
const CREAM = "#EDE8D5";
const MUTED = "rgba(237,232,213,0.45)";
const FAINT = "rgba(237,232,213,0.18)";

/* ── Данные ── */
const CATEGORIES = ["Все", "Салюты", "Батареи", "Ракеты", "Фонтаны", "Петарды", "Наборы", "Бенгалы"];

const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "new", label: "Новинки" },
];

const SHOTS_OPTIONS = ["Любое", "до 30", "30–99", "100–199", "200+"];

const PRODUCTS = [
  { id: 1,  name: "Звёздный дождь",      cat: "Салюты",   shots: 100, price: 3490,  old: 4200,  badge: "ХИТ",     stars: 5, rev: 234, isNew: false, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=75" },
  { id: 2,  name: "Огненный шторм",      cat: "Батареи",  shots: 200, price: 6990,  old: null,  badge: "НОВИНКА", stars: 5, rev: 89,  isNew: true,  img: "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=500&q=75" },
  { id: 3,  name: "Золотой каскад",      cat: "Салюты",   shots: 49,  price: 1890,  old: 2300,  badge: "−18%",    stars: 4, rev: 156, isNew: false, img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&q=75" },
  { id: 4,  name: "Праздничный набор",   cat: "Наборы",   shots: 0,   price: 4990,  old: 5800,  badge: "ВЫГОДА",  stars: 5, rev: 312, isNew: false, img: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&q=75" },
  { id: 5,  name: "Серебряный каскад",   cat: "Фонтаны",  shots: 0,   price: 990,   old: null,  badge: null,      stars: 4, rev: 67,  isNew: false, img: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=500&q=75" },
  { id: 6,  name: "Галактика",           cat: "Батареи",  shots: 150, price: 8990,  old: 10500, badge: "ПРЕМИУМ", stars: 5, rev: 45,  isNew: false, img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=75" },
  { id: 7,  name: "Северное сияние",     cat: "Батареи",  shots: 100, price: 5490,  old: null,  badge: null,      stars: 4, rev: 78,  isNew: true,  img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=75" },
  { id: 8,  name: "Вишнёвый взрыв",      cat: "Петарды",  shots: 0,   price: 390,   old: 490,   badge: null,      stars: 4, rev: 203, isNew: false, img: "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=500&q=75" },
  { id: 9,  name: "Фейерверк Люкс",      cat: "Наборы",   shots: 0,   price: 12900, old: 15000, badge: "ПРЕМИУМ", stars: 5, rev: 21,  isNew: false, img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&q=75" },
  { id: 10, name: "Серпантин золотой",   cat: "Бенгалы",  shots: 0,   price: 290,   old: null,  badge: null,      stars: 5, rev: 412, isNew: false, img: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&q=75" },
  { id: 11, name: "Небесный фонтан",     cat: "Фонтаны",  shots: 0,   price: 1290,  old: 1590,  badge: "−19%",    stars: 4, rev: 89,  isNew: false, img: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=500&q=75" },
  { id: 12, name: "Ракета «Кометa»",     cat: "Ракеты",   shots: 1,   price: 490,   old: null,  badge: "НОВИНКА", stars: 5, rev: 33,  isNew: true,  img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=75" },
  { id: 13, name: "Суперзалп 300",       cat: "Батареи",  shots: 300, price: 14990, old: 17500, badge: "ХИТ",     stars: 5, rev: 56,  isNew: false, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=75" },
  { id: 14, name: "Искры счастья",       cat: "Бенгалы",  shots: 0,   price: 190,   old: null,  badge: null,      stars: 4, rev: 267, isNew: false, img: "https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=500&q=75" },
  { id: 15, name: "Розовый дым",         cat: "Петарды",  shots: 0,   price: 350,   old: 420,   badge: null,      stars: 3, rev: 45,  isNew: false, img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=500&q=75" },
  { id: 16, name: "Звёздная дорожка",    cat: "Салюты",   shots: 25,  price: 890,   old: null,  badge: null,      stars: 4, rev: 122, isNew: true,  img: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&q=75" },
  { id: 17, name: "Праздник в коробке",  cat: "Наборы",   shots: 0,   price: 2490,  old: 2990,  badge: "−17%",    stars: 5, rev: 198, isNew: false, img: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=500&q=75" },
  { id: 18, name: "Ракета «Феникс»",     cat: "Ракеты",   shots: 1,   price: 890,   old: null,  badge: null,      stars: 4, rev: 41,  isNew: false, img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=75" },
];

/* ── Звёздный фон ── */
function StarsBg() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    x: `${(i * 83 + 7) % 100}%`,
    y: `${(i * 61 + 13) % 100}%`,
    r: i % 12 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1,
    dur: `${2 + (i * 0.17) % 4}s`,
    del: `${(i * 0.23) % 5}s`,
    op:  i % 8 === 0 ? 0.8 : i % 4 === 0 ? 0.5 : 0.2,
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

function StarRating({ n }: { n: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? GOLD : FAINT, fontSize: 11 }}>★</span>
      ))}
    </span>
  );
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy,         setSortBy]         = useState("popular");
  const [search,         setSearch]         = useState("");
  const [priceMin,       setPriceMin]       = useState("");
  const [priceMax,       setPriceMax]       = useState("");
  const [shotsFilter,    setShotsFilter]    = useState("Любое");
  const [onlyNew,        setOnlyNew]        = useState(false);
  const [onlySale,       setOnlySale]       = useState(false);
  const [cartCount,      setCartCount]      = useState(0);
  const [addedIds,       setAddedIds]       = useState<Set<number>>(new Set());
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [gridCols,       setGridCols]       = useState<2 | 3>(3);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (search.trim())
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    if (activeCategory !== "Все")
      list = list.filter(p => p.cat === activeCategory);

    if (priceMin) list = list.filter(p => p.price >= Number(priceMin));
    if (priceMax) list = list.filter(p => p.price <= Number(priceMax));

    if (onlyNew)  list = list.filter(p => p.isNew);
    if (onlySale) list = list.filter(p => p.old !== null);

    if (shotsFilter !== "Любое") {
      list = list.filter(p => {
        if (shotsFilter === "до 30")   return p.shots > 0 && p.shots < 30;
        if (shotsFilter === "30–99")   return p.shots >= 30 && p.shots < 100;
        if (shotsFilter === "100–199") return p.shots >= 100 && p.shots < 200;
        if (shotsFilter === "200+")    return p.shots >= 200;
        return true;
      });
    }

    switch (sortBy) {
      case "price_asc":  list.sort((a, b) => a.price - b.price); break;
      case "price_desc": list.sort((a, b) => b.price - a.price); break;
      case "new":        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default:           list.sort((a, b) => b.rev - a.rev);
    }
    return list;
  }, [search, activeCategory, priceMin, priceMax, onlyNew, onlySale, shotsFilter, sortBy]);

  const addCart = (id: number) => {
    setCartCount(c => c + 1);
    setAddedIds(s => { const n = new Set(s); n.add(id); return n; });
    setTimeout(() => setAddedIds(s => { const n = new Set(s); n.delete(id); return n; }), 1200);
  };

  const resetFilters = () => {
    setActiveCategory("Все"); setSearch(""); setPriceMin(""); setPriceMax("");
    setShotsFilter("Любое"); setOnlyNew(false); setOnlySale(false);
  };

  const hasFilters = activeCategory !== "Все" || search || priceMin || priceMax
    || shotsFilter !== "Любое" || onlyNew || onlySale;

  /* Sidebar filters content */
  const FiltersPanel = () => (
    <div className="flex flex-col gap-6">

      {/* Поиск */}
      <div>
        <label className="text-xs uppercase tracking-widest font-oswald mb-2 block" style={{ color: GOLD2 }}>Поиск</label>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Название товара..."
            className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: SURF2, border: `1px solid rgba(245,200,66,0.12)`, color: CREAM,
              fontFamily: "Roboto, sans-serif" }}
          />
        </div>
      </div>

      {/* Категории */}
      <div>
        <label className="text-xs uppercase tracking-widest font-oswald mb-2 block" style={{ color: GOLD2 }}>Категория</label>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="text-left px-3 py-2 rounded-lg text-sm transition-all"
              style={{
                background: activeCategory === cat ? "rgba(245,200,66,0.1)" : "transparent",
                color: activeCategory === cat ? GOLD : MUTED,
                border: `1px solid ${activeCategory === cat ? "rgba(245,200,66,0.25)" : "transparent"}`,
                fontWeight: activeCategory === cat ? 600 : 400,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div>
        <label className="text-xs uppercase tracking-widest font-oswald mb-2 block" style={{ color: GOLD2 }}>Цена, ₽</label>
        <div className="flex gap-2">
          <input value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="от"
            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: SURF2, border: `1px solid rgba(245,200,66,0.12)`, color: CREAM, fontFamily: "Roboto, sans-serif" }} />
          <input value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="до"
            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: SURF2, border: `1px solid rgba(245,200,66,0.12)`, color: CREAM, fontFamily: "Roboto, sans-serif" }} />
        </div>
      </div>

      {/* Количество залпов */}
      <div>
        <label className="text-xs uppercase tracking-widest font-oswald mb-2 block" style={{ color: GOLD2 }}>Залпов</label>
        <div className="flex flex-col gap-1">
          {SHOTS_OPTIONS.map(opt => (
            <button key={opt} onClick={() => setShotsFilter(opt)}
              className="text-left px-3 py-2 rounded-lg text-sm transition-all"
              style={{
                background: shotsFilter === opt ? "rgba(245,200,66,0.1)" : "transparent",
                color: shotsFilter === opt ? GOLD : MUTED,
                border: `1px solid ${shotsFilter === opt ? "rgba(245,200,66,0.25)" : "transparent"}`,
              }}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="flex flex-col gap-2">
        {[
          { label: "Только новинки", val: onlyNew,  set: setOnlyNew  },
          { label: "Только акции",   val: onlySale, set: setOnlySale },
        ].map(({ label, val, set }) => (
          <button key={label} onClick={() => set(!val)}
            className="flex items-center gap-2.5 text-sm transition-colors"
            style={{ color: val ? GOLD : MUTED }}>
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: val ? GOLD : "transparent", border: `1.5px solid ${val ? GOLD : FAINT}` }}>
              {val && <Icon name="Check" size={10} style={{ color: BG }} />}
            </div>
            {label}
          </button>
        ))}
      </div>

      {hasFilters && (
        <button onClick={resetFilters}
          className="flex items-center gap-2 text-sm transition-colors mt-1"
          style={{ color: MUTED }}
          onMouseEnter={e => (e.currentTarget.style.color = GOLD3)}
          onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
          <Icon name="X" size={13} /> Сбросить фильтры
        </button>
      )}
    </div>
  );

  return (
    <div style={{ background: BG, color: CREAM, fontFamily: "Roboto, sans-serif", minHeight: "100vh" }}>
      <StarsBg />

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50"
        style={{ background: "rgba(6,7,15,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(245,200,66,0.1)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl">🎆</span>
            <div className="leading-none">
              <div className="font-oswald font-bold text-base tracking-wide" style={{ color: GOLD }}>ПЛАНЕТА</div>
              <div className="font-oswald text-[10px] tracking-[0.22em] uppercase" style={{ color: GOLD2 }}>ФЕЙЕРВЕРКОВ</div>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8">
            {[["Главная", "/"], ["Каталог", "/catalog"], ["Акции", "/"], ["О нас", "/"], ["Контакты", "/"]].map(([n, href]) => (
              <Link key={n} to={href} className="text-sm font-medium transition-colors"
                style={{ color: n === "Каталог" ? GOLD : MUTED }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD3)}
                onMouseLeave={e => (e.currentTarget.style.color = n === "Каталог" ? GOLD : MUTED)}>
                {n}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden sm:flex items-center gap-1.5 text-sm" style={{ color: CREAM }}>
              <Icon name="Phone" size={14} style={{ color: GOLD }} />8 800 123-45-67
            </a>
            <button className="relative p-2 rounded-lg"
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

      <div className="relative pt-16" style={{ zIndex: 1 }}>

        {/* ── BREADCRUMB + TITLE ── */}
        <div style={{ background: "rgba(10,11,18,0.8)", borderBottom: `1px solid ${SURF2}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 text-xs mb-3" style={{ color: MUTED }}>
              <Link to="/" className="hover:text-white transition-colors">Главная</Link>
              <Icon name="ChevronRight" size={12} />
              <span style={{ color: GOLD }}>Каталог</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 justify-between">
              <div>
                <h1 className="font-oswald font-bold text-4xl md:text-5xl" style={{ color: CREAM }}>
                  Каталог <span style={{ color: GOLD }}>товаров</span>
                </h1>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  {filtered.length} {filtered.length === 1 ? "товар" : filtered.length < 5 ? "товара" : "товаров"}
                </p>
              </div>
              {/* Категории-таблетки (desktop горизонталь) */}
              <div className="hidden lg:flex flex-wrap gap-2">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: activeCategory === cat ? GOLD : "rgba(245,200,66,0.08)",
                      color: activeCategory === cat ? BG : MUTED,
                      border: `1px solid ${activeCategory === cat ? GOLD : "rgba(245,200,66,0.15)"}`,
                    }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">

            {/* ── SIDEBAR фильтры (desktop) ── */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <div className="sticky top-24 p-5 rounded-2xl" style={{ background: SURF, border: `1px solid ${SURF2}` }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-oswald font-semibold text-base" style={{ color: CREAM }}>Фильтры</span>
                  {hasFilters && (
                    <button onClick={resetFilters} className="text-xs transition-colors" style={{ color: MUTED }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                      Сбросить
                    </button>
                  )}
                </div>
                <FiltersPanel />
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">

              {/* Тулбар */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {/* Мобильный: кнопка фильтров */}
                <button onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: SURF, border: `1px solid ${SURF2}`, color: CREAM }}>
                  <Icon name="SlidersHorizontal" size={14} style={{ color: GOLD }} />
                  Фильтры
                  {hasFilters && <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />}
                </button>

                {/* Сортировка */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs hidden sm:block" style={{ color: MUTED }}>Сортировка:</span>
                  <div className="flex gap-1 flex-wrap">
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => setSortBy(opt.value)}
                        className="px-3 py-1.5 rounded-lg text-xs transition-all"
                        style={{
                          background: sortBy === opt.value ? "rgba(245,200,66,0.12)" : "transparent",
                          color: sortBy === opt.value ? GOLD : MUTED,
                          border: `1px solid ${sortBy === opt.value ? "rgba(245,200,66,0.3)" : "transparent"}`,
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Переключатель сетки */}
                <div className="hidden sm:flex gap-1 ml-auto">
                  {([3, 2] as const).map(cols => (
                    <button key={cols} onClick={() => setGridCols(cols)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{
                        background: gridCols === cols ? "rgba(245,200,66,0.12)" : "transparent",
                        color: gridCols === cols ? GOLD : FAINT,
                        border: `1px solid ${gridCols === cols ? "rgba(245,200,66,0.25)" : "transparent"}`,
                      }}>
                      <Icon name={cols === 3 ? "LayoutGrid" : "LayoutList"} size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Активные теги фильтров */}
              {hasFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {activeCategory !== "Все" && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                      style={{ background: "rgba(245,200,66,0.1)", border: `1px solid rgba(245,200,66,0.2)`, color: GOLD }}>
                      {activeCategory}
                      <button onClick={() => setActiveCategory("Все")}><Icon name="X" size={11} /></button>
                    </span>
                  )}
                  {search && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                      style={{ background: "rgba(245,200,66,0.1)", border: `1px solid rgba(245,200,66,0.2)`, color: GOLD }}>
                      "{search}"
                      <button onClick={() => setSearch("")}><Icon name="X" size={11} /></button>
                    </span>
                  )}
                  {onlyNew && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                      style={{ background: "rgba(245,200,66,0.1)", border: `1px solid rgba(245,200,66,0.2)`, color: GOLD }}>
                      Новинки <button onClick={() => setOnlyNew(false)}><Icon name="X" size={11} /></button>
                    </span>
                  )}
                  {onlySale && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                      style={{ background: "rgba(245,200,66,0.1)", border: `1px solid rgba(245,200,66,0.2)`, color: GOLD }}>
                      Акции <button onClick={() => setOnlySale(false)}><Icon name="X" size={11} /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Сетка товаров */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <span className="text-5xl">🔭</span>
                  <p className="font-oswald font-semibold text-xl" style={{ color: CREAM }}>Ничего не найдено</p>
                  <p className="text-sm" style={{ color: MUTED }}>Попробуйте изменить фильтры</p>
                  <button onClick={resetFilters} className="btn-gold px-6 py-2.5 rounded-xl text-sm mt-2">
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div className={`grid gap-5 ${gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {filtered.map((p, i) => (
                    <div key={p.id} className="relative rounded-2xl overflow-hidden card-glow"
                      style={{ background: SURF, border: `1px solid ${SURF2}`,
                        animation: `fade-in-up .5s ease both ${i * 0.04}s` }}>
                      {p.badge && (
                        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[11px] font-bold font-oswald tracking-wide"
                          style={{ background: GOLD, color: BG }}>{p.badge}</div>
                      )}
                      {p.isNew && !p.badge && (
                        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[11px] font-bold font-oswald tracking-wide"
                          style={{ background: "rgba(74,222,128,0.85)", color: "#06070F" }}>NEW</div>
                      )}
                      <div className="relative h-48 overflow-hidden">
                        <img src={p.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={p.name} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 55%, ${SURF} 100%)` }} />
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-medium mb-1" style={{ color: GOLD2 }}>
                          {p.cat}{p.shots > 0 ? ` · ${p.shots} залпов` : ""}
                        </div>
                        <h3 className="font-oswald font-semibold text-xl mb-2" style={{ color: CREAM }}>{p.name}</h3>
                        <div className="flex items-center gap-1.5 mb-4">
                          <StarRating n={p.stars} />
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
                              background: addedIds.has(p.id) ? "rgba(74,222,128,0.12)" : "rgba(245,200,66,0.08)",
                              border: `1px solid ${addedIds.has(p.id) ? "rgba(74,222,128,0.35)" : "rgba(245,200,66,0.22)"}`,
                              color: addedIds.has(p.id) ? "#4ade80" : GOLD,
                            }}>
                            <Icon name={addedIds.has(p.id) ? "Check" : "ShoppingCart"} size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── МОБИЛЬНЫЙ SIDEBAR ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full overflow-y-auto p-5"
            style={{ background: "#0A0B14", borderRight: `1px solid ${SURF2}` }}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-oswald font-semibold text-base" style={{ color: CREAM }}>Фильтры</span>
              <button onClick={() => setSidebarOpen(false)}>
                <Icon name="X" size={18} style={{ color: MUTED }} />
              </button>
            </div>
            <FiltersPanel />
            <button onClick={() => setSidebarOpen(false)} className="btn-gold w-full py-3 rounded-xl text-sm mt-6">
              Показать {filtered.length} товаров
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
