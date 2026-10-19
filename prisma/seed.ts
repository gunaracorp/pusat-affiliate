import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const programs = [
  {
    slug: 'tiktok-shop-affiliate', name: 'TikTok Shop Affiliate', brand: 'TikTok', category: 'ecommerce', icon: '🎵',
    commissionMin: 5, commissionMax: 30, commissionType: 'percent',
    commissionNote: 'Komisi per produk 5-30%, viral bonus hingga 50% di periode kampanye',
    cookieDuration: 7, paymentThreshold: 10, network: 'TikTok Shop', tier: 'S+', difficulty: 'Pemula',
    avgOrderValue: 18, conversionRate: 4.8, gravity: 99, featured: true, trendingScore: 100,
    color: '#00F2EA',
    description: 'Mesin affiliate terbesar di Asia Tenggara. Promosikan jutaan produk via video pendek & live streaming, komisi langsung cair ke dompet.',
    strategy: 'Formula W.I.N: Waktu prime 19.00-22.00 WIB, Ikuti tren sound 3 hari pertama, Niche produk beauty & gadget dengan komisi >15%. Video 15-30 detik dengan hook 2 detik pertama. Live streaming 2 jam/hari = 3x konversi video biasa.',
    joinUrl: 'https://seller.tiktok.com/affiliate',
  },
  {
    slug: 'shopee-affiliate-xtra', name: 'Shopee Affiliate XTRA', brand: 'Shopee', category: 'ecommerce', icon: '🛍️',
    commissionMin: 3, commissionMax: 22, commissionType: 'percent',
    commissionNote: 'Up to 22% + bonus milestone Rp 5-15 juta/bulan untuk affiliate XTRA',
    cookieDuration: 7, paymentThreshold: 5, network: 'Shopee', tier: 'S+', difficulty: 'Pemula',
    avgOrderValue: 14, conversionRate: 6.2, gravity: 97, featured: true, trendingScore: 98,
    color: '#EE4D2D',
    description: 'Program resmi Shopee dengan komisi double saat tanggal kembar (9.9, 10.10, 11.11, 12.12). Terintegrasi Shopee Video & live.',
    strategy: 'Kunci emas: konten "produk dibawah 50rb" menjelang tanggal kembar. Gunakan Shopee Video untuk komisi tambahan 2x. Stack kode promo + komisi = conversion rate bisa 8-10%. Batch 10 video sekaligus saat mega sale approaching.',
    joinUrl: 'https://affiliate.shopee.co.id',
  },
  {
    slug: 'lazada-affiliate', name: 'Lazada Affiliate Program', brand: 'Lazada', category: 'ecommerce', icon: '🛒',
    commissionMin: 4, commissionMax: 20, commissionType: 'percent',
    commissionNote: 'Up to 20% + voucher eksklusif untuk follower kamu',
    cookieDuration: 7, paymentThreshold: 10, network: 'Lazada', tier: 'S', difficulty: 'Pemula',
    avgOrderValue: 22, conversionRate: 3.9, gravity: 88, featured: true, trendingScore: 90,
    color: '#F57224',
    description: 'Pesaing langsung Shopee dengan alat tracking canggih dan komisi boost di LazMall brand resmi.',
    strategy: 'Fokus ke LazMall (brand resmi) — AOV 2.5x lebih tinggi. Gunakan data "best selling" di aplikasi untuk pilih produk. Kombinasikan dengan traffic blog SEO untuk review produk elektronik.',
    joinUrl: 'https://lazadaaffiliate.com',
  },
  {
    slug: 'tokopedia-affiliate', name: 'Tokopedia Affiliate', brand: 'Tokopedia', category: 'ecommerce', icon: '💚',
    commissionMin: 3, commissionMax: 18, commissionType: 'percent',
    commissionNote: 'Up to 18% via Tokopedia Affiliate & TV Program',
    cookieDuration: 7, paymentThreshold: 8, network: 'Tokopedia', tier: 'S', difficulty: 'Pemula',
    avgOrderValue: 19, conversionRate: 3.5, gravity: 82, featured: false, trendingScore: 84,
    color: '#42B549',
    description: 'Integrasi penuh dengan ekosistem GoTo. Komisi tambahan dari Tokopedia TV & kategori unik seperti tiket dan voucher.',
    strategy: 'Niche emas: elektronik & voucher game (konversi tinggi dari audiens muda). Buat konten perbandingan harga vs marketplace lain. Manfaatkan program Tokopedia TV untuk komisi live streaming.',
    joinUrl: 'https://www.tokopedia.com/affiliate',
  },
  {
    slug: 'involve-asia', name: 'Involve Asia Network', brand: 'Involve Asia', category: 'network', icon: '🌏',
    commissionMin: 2, commissionMax: 35, commissionType: 'percent',
    commissionNote: 'Akses 500+ brand Asia Tenggara dalam satu dashboard',
    cookieDuration: 30, paymentThreshold: 50, network: 'Involve Asia', tier: 'S', difficulty: 'Menengah',
    avgOrderValue: 45, conversionRate: 2.8, gravity: 85, featured: true, trendingScore: 86,
    color: '#FF6B6B',
    description: 'Jaringan affiliate premium Asia: Traveloka, Agoda, Althea, Zalora, dan 500+ brand lain dengan satu akun.',
    strategy: 'Stack 3 brand komplementer per konten (contoh: hotel + flight + eSIM untuk konten travel). Gunakan coupon site strategy — halaman khusus promo berbayar iklan dengan target keyword "kode promo + brand".',
    joinUrl: 'https://involve.asia',
  },
  {
    slug: 'amazon-associates', name: 'Amazon Associates', brand: 'Amazon', category: 'ecommerce', icon: '📦',
    commissionMin: 1, commissionMax: 10, commissionType: 'percent',
    commissionNote: '1-10% per kategori + bounty program $25/daftar',
    cookieDuration: 1, paymentThreshold: 100, network: 'Amazon', tier: 'A', difficulty: 'Menengah',
    avgOrderValue: 38, conversionRate: 4.1, gravity: 95, featured: true, trendingScore: 88,
    color: '#FF9900',
    description: 'Program affiliate paling mapan di dunia. Jutaan produk, trust factor tertinggi, konversi organik sangat kuat.',
    strategy: 'Konten "best X under $50" dengan comparison table. cookie 24 jam = wajib traffic yang siap beli. Fokus kategori home & kitchen (8%) + amazon basics. Sitestripe untuk link cepat. SEO artikel review = income pasif 5 tahun.',
    joinUrl: 'https://affiliate-program.amazon.com',
  },
  {
    slug: 'clickbank', name: 'ClickBank Marketplace', brand: 'ClickBank', category: 'digital', icon: '💎',
    commissionMin: 50, commissionMax: 75, commissionType: 'percent',
    commissionNote: 'Komisi 50-75% untuk produk digital — tertinggi di dunia',
    cookieDuration: 60, paymentThreshold: 10, network: 'ClickBank', tier: 'S', difficulty: 'Mahir',
    avgOrderValue: 47, conversionRate: 2.2, gravity: 90, featured: true, trendingScore: 85,
    color: '#0048FF'.replace('0048FF', '7C3AED'),
    description: 'Marketplace produk digital dengan komisi hingga 75%. Satu sale = setara 50 sale produk fisik.',
    strategy: 'Pilih produk gravity 30-100 (sweet spot). Funnel: lead magnet gratis → email sequence 7 hari → pitch produk. Niche evergreen: health, wealth, relationship. Upsell bisa menaikkan EPC 3x.',
    joinUrl: 'https://www.clickbank.com',
  },
  {
    slug: 'semrush-affiliate', name: 'Semrush BEESWAX', brand: 'Semrush', category: 'saas', icon: '📊',
    commissionMin: 200, commissionMax: 200, commissionType: 'fixed',
    commissionNote: '$200 flat per conversion + $10 untuk trial gratis',
    cookieDuration: 30, paymentThreshold: 50, network: 'BeRush', tier: 'S', difficulty: 'Mahir',
    avgOrderValue: 130, conversionRate: 1.8, gravity: 78, featured: false, trendingScore: 80,
    color: '#FF642D',
    description: 'Tool SEO #1 dunia. $200 per sale — 5 sale/bulan = $1000 pasif.',
    strategy: 'Target audiens: blogger & agency. Konten tutorial "cara riset keyword" dengan case study nyata. Bandingkan vs Ahrefs. Bonus: free trial tracking = $10 per orang yang coba.',
    joinUrl: 'https://www.semrush.com/partners/affiliates',
  },
  {
    slug: 'nordvpn', name: 'NordVPN Affiliate', brand: 'NordVPN', category: 'saas', icon: '🔐',
    commissionMin: 40, commissionMax: 100, commissionType: 'recurring',
    commissionNote: '40-100% dari penjualan awal + 30% recurring per renewal',
    cookieDuration: 30, paymentThreshold: 10, network: 'NordVPN', tier: 'A', difficulty: 'Menengah',
    avgOrderValue: 90, conversionRate: 3.1, gravity: 80, featured: false, trendingScore: 78,
    color: '#4687FF'.replace('4687FF', '10B981'),
    description: 'VPN terpopuler dunia. Komisi hingga 100% dari penjualan pertama + recurring 30% selamanya.',
    strategy: 'Konten "apakah VPN aman" + review mendalam dengan speed test asli. Target keyword "nordvpn coupon". Video YouTube dengan demo = conversion 5x artikel.',
    joinUrl: 'https://nordvpn.com/affiliate',
  },
  {
    slug: 'booking-com', name: 'Booking.com Partner', brand: 'Booking.com', category: 'travel', icon: '🏨',
    commissionMin: 25, commissionMax: 40, commissionType: 'percent',
    commissionNote: '25-40% dari komisi Booking.com per booking terkonfirmasi',
    cookieDuration: 30, paymentThreshold: 100, network: 'Booking Partner', tier: 'A', difficulty: 'Menengah',
    avgOrderValue: 180, conversionRate: 2.4, gravity: 86, featured: true, trendingScore: 82,
    color: '#003B95'.replace('003B95', 'F59E0B'),
    description: 'Satu booking hotel = $10-40 komisi. Ideal untuk konten travel & staycation.',
    strategy: 'Konten "hotel terbaik di [kota] untuk [budget/keyword]" — intent belanja tinggi. SEO artikel destinasi + Google Discover. AOV besar: 1 booking = setara 5 sale produk fisik.',
    joinUrl: 'https://partners.booking.com',
  },
  {
    slug: 'traveloka-xperience', name: 'Traveloka XPERIENCE', brand: 'Traveloka', category: 'travel', icon: '✈️',
    commissionMin: 3, commissionMax: 12, commissionType: 'percent',
    commissionNote: '3-12% tiket & aktivitas + 5% hotel via Involve Asia',
    cookieDuration: 14, paymentThreshold: 25, network: 'Involve Asia', tier: 'A', difficulty: 'Pemula',
    avgOrderValue: 85, conversionRate: 3.2, gravity: 75, featured: false, trendingScore: 76,
    color: '#00AAE4'.replace('00AAE4', '06B6D4'),
    description: 'Giant OTA Asia Tenggara. Komisi dari flight, hotel, xperience, hingga attraction ticket.',
    strategy: 'Konten liburan lokal: "wisata murah di [kota]" dengan paket XPERIENCE. Repurpose ke TikTok slideshow. Momen musim liburan = conversion 3x lipat.',
    joinUrl: 'https://involve.asia',
  },
  {
    slug: 'getresponse', name: 'GetResponse Affiliate', brand: 'GetResponse', category: 'saas', icon: '📧',
    commissionMin: 33, commissionMax: 100, commissionType: 'recurring',
    commissionNote: '$100 flat per sale ATAU 33% recurring selamanya',
    cookieDuration: 120, paymentThreshold: 50, network: 'GetResponse', tier: 'S', difficulty: 'Mahir',
    avgOrderValue: 55, conversionRate: 2.0, gravity: 70, featured: false, trendingScore: 72,
    color: ' #00A5FF'.replace(' #00A5FF', '8B5CF6'),
    description: 'Email marketing dengan cookie 120 HARI + pilihan recurring 33% lifetime. Satu klien = $200+/tahun pasif.',
    strategy: 'Recurring > flat: 100 subscriber × 33% × $50 = $1650/bulan selamanya. Konten tutorial email marketing + lead magnet template gratis.',
    joinUrl: 'https://www.getresponse.com/affiliate-programs',
  },
  {
    slug: 'fiverr-affiliates', name: 'Fiverr Affiliates', brand: 'Fiverr', category: 'saas', icon: '🎨',
    commissionMin: 15, commissionMax: 150, commissionType: 'fixed',
    commissionNote: '$15-150 CPA + 10% revenue share 12 bulan',
    cookieDuration: 30, paymentThreshold: 100, network: 'Fiverr', tier: 'A', difficulty: 'Pemula',
    avgOrderValue: 60, conversionRate: 3.6, gravity: 79, featured: false, trendingScore: 77,
    color: '#1DBF73',
    description: 'Marketplace freelancer terbesar. CPA hingga $150 untuk Fiverr Pro, plus revenue share berkelanjutan.',
    strategy: 'Konten "cara hire desainer/logo murah" → link gig spesifik. Niche: content creator tools. Hybrid model: CPA + revshare dari Fiverr Learn.',
    joinUrl: 'https://affiliates.fiverr.com',
  },
  {
    slug: 'aliexpress', name: 'AliExpress Affiliate', brand: 'AliExpress', category: 'ecommerce', icon: '🌐',
    commissionMin: 3, commissionMax: 9, commissionType: 'percent',
    commissionNote: '3-9% + bonus tier hingga 12% untuk top affiliate',
    cookieDuration: 3, paymentThreshold: 20, network: 'AliExpress', tier: 'B', difficulty: 'Pemula',
    avgOrderValue: 25, conversionRate: 2.6, gravity: 76, featured: false, trendingScore: 70,
    color: '#E62E04'.replace('E62E04', 'EF4444'),
    description: 'Raksasa e-commerce global dengan jutaan produk murah. Cocok untuk audiens gadget & unique items.',
    strategy: 'Konten "gadget unik dibawah $10" — produk wow factor tinggi. Portals API untuk auto-generate link. Timing: sale 11.11 & 12.12 = komisi boost.',
    joinUrl: 'https://portals.aliexpress.com',
  },
  {
    slug: 'shopify-collabs', name: 'Shopify Collabs', brand: 'Shopify', category: 'saas', icon: '🛠️',
    commissionMin: 20, commissionMax: 30, commissionType: 'recurring',
    commissionNote: '$150 CPA atau 30% revenue share recurring 12 bulan',
    cookieDuration: 30, paymentThreshold: 25, network: 'Shopify', tier: 'A', difficulty: 'Menengah',
    avgOrderValue: 300, conversionRate: 1.5, gravity: 72, featured: false, trendingScore: 74,
    color: '#95BF47',
    description: 'Rujuk satu merchant = $150. Satu merchant aktif = $30-90/bulan recurring. B2B gold mine.',
    strategy: 'Target: orang yang mau mulai bisnis. Konten "cara mulai jualan online 2025". Funnel webinar gratis → rekomendasi Shopify. 1 merchant = setara 30 sale produk fisik.',
    joinUrl: 'https://collabs.shopify.com',
  },
  {
    slug: 'digistore24', name: 'Digistore24', brand: 'Digistore24', category: 'digital', icon: '🚀',
    commissionMin: 30, commissionMax: 80, commissionType: 'recurring',
    commissionNote: '30-80% + banyak produk membership recurring',
    cookieDuration: 180, paymentThreshold: 50, network: 'Digistore24', tier: 'B', difficulty: 'Mahir',
    avgOrderValue: 65, conversionRate: 1.9, gravity: 65, featured: false, trendingScore: 66,
    color: '#FF5722'.replace('FF5722', 'F97316'),
    description: 'Alternatif ClickBank dari Eropa. Cookie 180 hari — terlama di industri!',
    strategy: 'Cookie 6 bulan = sempurna untuk konten SEO long-term. Produk Jerman/spek Eropa kompetisi lebih rendah. Funnel email tetap raja.',
    joinUrl: 'https://www.digistore24.com',
  },
  {
    slug: 'impact-network', name: 'Impact.com Marketplace', brand: 'Impact', category: 'network', icon: '⚡',
    commissionMin: 5, commissionMax: 40, commissionType: 'percent',
    commissionNote: 'Akses Canva, Airbnb, Adidas, Uber + 1000 brand global',
    cookieDuration: 30, paymentThreshold: 50, network: 'Impact', tier: 'A', difficulty: 'Menengah',
    avgOrderValue: 70, conversionRate: 2.5, gravity: 81, featured: false, trendingScore: 79,
    color: '#1A73E8'.replace('1A73E8', 'EAB308'),
    description: 'Network premium global: Canva ($36/sale), Airbnb, Notion, Nike. Brand kelas dunia, payment reliable.',
    strategy: 'Canva Pro = produk termudah untuk pemula (dishonest price $120/tahun, komisi $36). Buat tutorial desain → CTA Canva Pro. Airbnb untuk konten hosting "jadi host dapat $X".',
    joinUrl: 'https://app.impact.com',
  },
  {
    slug: 'binance-referral', name: 'Binance Referral', brand: 'Binance', category: 'finance', icon: '🪙',
    commissionMin: 20, commissionMax: 40, commissionType: 'recurring',
    commissionNote: '20-40% komisi trading fee RECURRING SELAMANYA',
    cookieDuration: 90, paymentThreshold: 0, network: 'Binance', tier: 'S', difficulty: 'Menengah',
    avgOrderValue: 150, conversionRate: 4.5, gravity: 84, featured: true, trendingScore: 83,
    color: '#F0B90B',
    description: 'Komisi dari SEMUA transaksi referral — selamanya. 100 trader aktif = $2000-5000/bulan pasif.',
    strategy: 'Konten edukasi crypto (bukan sinyal!): "cara mulai trading untuk pemula". 1 user aktif trading = $5-20/bulan komisi. Kompound: 500 referral = mesin uang permanen.',
    joinUrl: 'https://accounts.binance.com/register',
  },
  {
    slug: 'canva-creators', name: 'Canva Pro Affiliate', brand: 'Canva', category: 'saas', icon: '🖌️',
    commissionMin: 25, commissionMax: 36, commissionType: 'fixed',
    commissionNote: '$36 per Canva Pro conversion via Impact',
    cookieDuration: 45, paymentThreshold: 50, network: 'Impact', tier: 'A', difficulty: 'Pemula',
    avgOrderValue: 120, conversionRate: 3.8, gravity: 77, featured: true, trendingScore: 81,
    color: '#00C4CC',
    description: 'Produk termudah dijual: semua orang butuh desain. $36 per sale dengan trial gratis sebagai magnet.',
    strategy: 'Konten tutorial: "5 desain IG dalam 5 menit dengan Canva". Target student, UMKM, content creator. Template gratis sebagai lead magnet → upsell Pro.',
    joinUrl: 'https://www.canva.com/affiliates',
  },
  {
    slug: 'hostinger', name: 'Hostinger Affiliate', brand: 'Hostinger', category: 'saas', icon: '🖥️',
    commissionMin: 60, commissionMax: 100, commissionType: 'recurring',
    commissionNote: '60-100% komisi per sale ($60-100) — hosting termudah dijual',
    cookieDuration: 45, paymentThreshold: 100, network: 'Hostinger', tier: 'S', difficulty: 'Pemula',
    avgOrderValue: 50, conversionRate: 4.2, gravity: 83, featured: true, trendingScore: 84,
    color: '#673DE6'.replace('673DE6', 'A855F7'),
    description: 'Setiap orang yang mau bikin website butuh hosting. Komisi 60-100% per sale — paling tinggi di kategori hosting.',
    strategy: 'Konten "cara bikin website blog/toko online" step-by-step. YouTube tutorial + blog = double pipeline. Hari Alexa mati, traffic konten hosting naik drastis.',
    joinUrl: 'https://www.hostinger.id/affiliate',
  },
]

const courses = [
  {
    slug: 'fondasi-affiliate-nol-ke-hero', title: 'Fondasi Affiliate: Dari Nol ke First Commission', level: 'Pemula', track: 'Universal',
    duration: 145, lessons: 12, students: 48219, rating: 4.9, xp: 500, icon: '🌱',
    description: 'Blueprint lengkap untuk pemula: mindset, pilih niche, join program, dan raih komisi pertama dalam 14 hari.',
    modules: JSON.stringify([
      { title: 'Mindset Affiliate Jutaan Dollar', minutes: 12, summary: 'Kenapa 97% affiliate gagal dan bagaimana 3% sisanya berpikir.', keyPoints: ['Affiliate = bisnis aset, bukan side hustle', 'Rule 80/20: 20% konten = 80% komisi', 'Compound effect: traffic hari ini = income 2 tahun'] },
      { title: 'Pilih Niche Goldmine', minutes: 18, summary: 'Framework R.A.V.E untuk memilih niche yang menghasilkan.', keyPoints: ['Revenue: ada produk komisi >10%?', 'Audience: kamu bisa buat konten 100 video?', 'Volume: search demand >10k/bulan', 'Evergreen: masih relevan 5 tahun?'] },
      { title: 'Anatomi Link Affiliate', minutes: 10, summary: 'Cara kerja cookie, attribution, dan tracking.', keyPoints: ['Cookie window & last-click attribution', 'Sub-ID untuk tracking per konten', 'Cloaking link: kapan boleh & tidak'] },
      { title: 'Setup First Campaign', minutes: 25, summary: 'Join 3 program + setup link tracker + konten pertama.', keyPoints: ['TikTok Shop + Shopee + 1 network', 'Setup PusatAffiliate Tracker', 'Konten pertama: format review 30 detik'] },
      { title: '14 Hari First Commission Plan', minutes: 20, summary: 'Roadmap harian dari hari 1 sampai komisi cair.', keyPoints: ['Hari 1-3: riset 20 produk komisi tinggi', 'Hari 4-10: 2 konten/hari', 'Hari 11-14: analisa & double down'] },
    ]),
    order: 1,
  },
  {
    slug: 'tiktok-shop-mastery', title: 'TikTok Shop Mastery: Video → Viral → Komisi', level: 'Pemula', track: 'TikTok Track',
    duration: 190, lessons: 15, students: 61540, rating: 4.9, xp: 750, icon: '🎵',
    description: 'Sistem lengkap menang TikTok Shop Affiliate: hook framework, editing cepat, live streaming, dan analitik.',
    modules: JSON.stringify([
      { title: 'Hook 2-Detik Framework', minutes: 15, summary: '5 formula hook yang bikin viewers berhenti scroll.', keyPoints: ['Formula "JANGAN beli X sebelum nonton ini"', 'Pattern interrupt visual', 'Curiosity gap + consequence'] },
      { title: 'Riset Produk Komisi Tinggi', minutes: 18, summary: 'Cari produk yang LAGI naik sebelum jadi saturated.', keyPoints: ['Tab Showcase & trending products', 'Sign saturation: <50 video per produk', 'Sweet spot: komisi >15%, harga 50-150rb'] },
      { title: 'Editing Cepat 10 Menit', minutes: 22, summary: 'Workflow edit cepat: CapCut template + B-roll sistem.', keyPoints: ['Template hook-benefits-proof-CTA', 'B-roll library per niche', 'Auto-caption + sound trending'] },
      { title: 'Live Streaming = Komisi 3x', minutes: 25, summary: 'Setup live yang konversi: script, produk preview, CTA.', keyPoints: ['Script live 2 jam terstruktur', 'Flash sale manipulation (etis)', 'Replay value & pin produk'] },
      { title: 'Analitik & Scaling', minutes: 20, summary: 'Baca data, temukan winner, kalikan 10x.', keyPoints: ['Metric utama: watch time >50%', 'Winner detection: >2% CTR produk', 'Scale: 3 variasi hook per winner'] },
    ]),
    order: 2,
  },
  {
    slug: 'shopee-xtra-sultan', title: 'Shopee XTRA Sultan: Tanggal Kembar Jackpot', level: 'Pemula', track: 'Shopee Track',
    duration: 120, lessons: 10, students: 39870, rating: 4.8, xp: 600, icon: '🛍️',
    description: 'Kuasai siklus mega sale Shopee, konten cepat, dan bonus milestone hingga Rp 15 juta/bulan.',
    modules: JSON.stringify([
      { title: 'Kalender Komisi Shopee', minutes: 12, summary: 'Peta 12 mega sale per tahun dan cara persiapan 7 hari sebelumnya.', keyPoints: ['Tanggal kembar = komisi double', 'Persiapan batch konten H-7', 'Flash sale jam 00.00 & 20.00'] },
      { title: 'Shopee Video Secrets', minutes: 15, summary: 'Fitur Shopee Video = komisi tambahan yang 90% affiliate abaikan.', keyPoints: ['Upload langsung di aplikasi = 2x komisi channel', 'Repost konten TikTok (tanpa watermark!)', 'Niche murah <50rb = volume game'] },
      { title: 'Bonus Milestone System', minutes: 14, summary: 'Strategi mengejar bonus Rp 5-15 juta dengan target mingguan.', keyPoints: ['Tier bonus & persyaratannya', 'Push strategy akhir bulan', 'Gabung komisi + bonus = EPC 3x'] },
      { title: 'Kode Promo Stacking', minutes: 16, summary: 'Teknik menggabungkan voucher + cashback + komisi.', keyPoints: ['Voucher toko + voucher gratis ongkir', 'Cashback ShopeePay stack', 'Timing checkout malam'] },
    ]),
    order: 3,
  },
  {
    slug: 'konten-viral-sejarah', title: 'Konten Viral: Framework 10M Views', level: 'Menengah', track: 'Konten Track',
    duration: 165, lessons: 13, students: 52310, rating: 4.9, xp: 800, icon: '🔥',
    description: 'Ilmu di balik konten viral: psikologi hook, storytelling, dan retensi. Berlaku untuk semua platform.',
    modules: JSON.stringify([
      { title: 'Psikologi Scroll-Stopper', minutes: 18, summary: '3 sistem saraf yang memicu watch time dan share.', keyPoints: ['Dopamine loop: open loop + payoff', 'Social currency: konten yang bikin pintar', 'Emotion spectrum: awe > laugh > anger'] },
      { title: 'Storytelling PAS & AIDA', minutes: 20, summary: 'Framework copywriting klasik untuk video script.', keyPoints: ['Problem-Agitate-Solution untuk review', 'AIDA untuk produk baru', 'Hero journey untuk testimoni'] },
      { title: 'Retention Editing', minutes: 22, summary: 'Teknik editing yang bikin 60% viewers tonton sampai habis.', keyPoints: ['Cut setiap 2-3 detik', 'Progress bar mental: numbered lists', 'Cliffhanger di detik 15'] },
      { title: 'Slideshow & Carousel Hacks', minutes: 15, summary: 'Format termurah dengan konversi tertinggi 2025.', keyPoints: ['Foto + teks + sound trending', 'CTA swipe-up pada slide 3', 'Batch 20 carousel per sesi'] },
    ]),
    order: 4,
  },
  {
    slug: 'seo-blog-mesin-pasif', title: 'SEO & Blog: Mesin Komisi Pasif 5 Tahun', level: 'Menengah', track: 'SEO Track',
    duration: 240, lessons: 18, students: 28450, rating: 4.8, xp: 1000, icon: '📈',
    description: 'Bangun aset website yang menghasilkan komisi sambil tidur. Keyword research sampai link building.',
    modules: JSON.stringify([
      { title: 'Keyword Gold Rush', minutes: 25, summary: 'Temukan keyword komisi tinggi dengan kompetisi rendah.', keyPoints: ['Formula: KD<20 + CPC>$0.5 = gold', '"Best X for Y" intent mapping', 'Reverse engineer kompetitor kecil'] },
      { title: 'Artikel Review yang Konversi', minutes: 30, summary: 'Struktur artikel yang bikin pembaca klik link kamu.', keyPoints: ['TL;DR verdict di atas', 'Comparison table wajib', 'CTA box setiap 300 kata'] },
      { title: 'Topical Authority Blueprint', minutes: 28, summary: 'Bangun cluster konten yang didominasi Google.', keyPoints: ['Pillar + cluster model', 'Internal linking silo', 'Publish 3x/minggu konsisten 6 bulan'] },
      { title: 'Link Building Tanpa Budget', minutes: 25, summary: 'White-hat link building yang masih work 2025.', keyPoints: ['HARO & digital PR', 'Guest post niche relevan', 'Broken link building'] },
    ]),
    order: 5,
  },
  {
    slug: 'email-marketing-mesin-otomatis', title: 'Email Marketing: Mesin Komisi Otomatis', level: 'Mahir', track: 'Scaling Track',
    duration: 150, lessons: 11, students: 19230, rating: 4.7, xp: 900, icon: '📧',
    description: 'Bangun list email yang menghasilkan komisi otomatis setiap hari — aset yang tidak bisa di-godam algoritma.',
    modules: JSON.stringify([
      { title: 'Lead Magnet Factory', minutes: 20, summary: 'Ciptakan freebie yang bikin orang rela kasih email.', keyPoints: ['Cheat sheet & template = konversi tertinggi', 'Landing page 1 CTA 1 promise', 'Target opt-in rate >30%'] },
      { title: 'Sequence 7 Hari yang Menjual', minutes: 25, summary: 'Email automation yang menjual tanpa terasa jualan.', keyPoints: ['Day 1: welcome + deliver', 'Day 2-3: value + story', 'Day 4-7: pitch + deadline'] },
      { title: 'Blast & Broadcast System', minutes: 18, summary: 'Email promo yang dibuka 40%+ subscriber.', keyPoints: ['Subject line curiosity + personal', 'Kirim jam 07.00 & 19.00', 'Segmentasi: pembuka vs non-pembuka'] },
      { title: 'Hybrid Funnel Sosmed + Email', minutes: 22, summary: 'Gabungkan TikTok/IG traffic dengan email untuk komisi maksimal.', keyPoints: ['Video → linkin.bio → opt-in → sequence', 'Retarget list dengan konten baru', 'EPC naik 4x vs link langsung'] },
    ]),
    order: 6,
  },
  {
    slug: 'paid-ads-scaling-10x', title: 'Paid Ads: Scaling Komisi 10x Lipat', level: 'Mahir', track: 'Scaling Track',
    duration: 210, lessons: 14, students: 15870, rating: 4.8, xp: 1200, icon: '🎯',
    description: 'Gunakan iklan berbayar untuk mempercepat semua sistem affiliate. Dari $5/hari sampai ROAS 5x.',
    modules: JSON.stringify([
      { title: 'Struktur Campaign Affiliate', minutes: 25, summary: 'Setup Meta & TikTok Ads yang aman untuk link affiliate.', keyPoints: ['Bridge page wajib (bukan link langsung)', 'Pixel + Conversion API setup', 'Budget test: $5/hari × 5 adset'] },
      { title: 'Creative Testing Sprint', minutes: 22, summary: 'Sistem test 20 kreatif/hari tanpa buang budget.', keyPoints: ['Winner kill rule: CPL naik 30%', 'UGC style kalahkan studio 3x', 'Hook variation > image variation'] },
      { title: 'ROAS & Scaling Math', minutes: 20, summary: 'Kalkulasi kapan scaling dan kapan stop.', keyPoints: ['Breakeven ROAS = 1/EPC margin', 'Scale 20% per 48 jam', 'Vertical + horizontal scaling'] },
      { title: 'Compliance & Safety', minutes: 15, summary: 'Hindari ban: aturan iklan untuk produk affiliate.', keyPoints: ['Dilarang: before-after ekstrem', 'Land page quality score', 'Multi-akas safety protocol'] },
    ]),
    order: 7,
  },
  {
    slug: 'affiliate-legenda-agency', title: 'Level Legenda: Bangun Affiliate Agency', level: 'Legenda', track: 'Empire Track',
    duration: 180, lessons: 12, students: 8940, rating: 5.0, xp: 2000, icon: '👑',
    description: 'Dari solo affiliate ke agency: bangun tim, sistem, dan portfolio brand yang menghasilkan jutaan dollar.',
    modules: JSON.stringify([
      { title: 'Dari Creator ke CEO', minutes: 20, summary: 'Mindset & sistem operasi agency affiliate.', keyPoints: ['Hire: editor → researcher → copywriter', 'SOP semua proses konten', 'Revenue share vs flat salary'] },
      { title: 'Deal Eksklusif dengan Brand', minutes: 22, summary: 'Negosiasi komisi custom & bonus eksklusif.', keyPoints: ['Data proof = leverage negosiasi', 'Hybrid: base commission + performance bonus', 'Exclusivity = komisi +5-10%'] },
      { title: 'Multiple Portfolio Income', minutes: 25, summary: 'Struktur 7 aliran komisi yang saling menguatkan.', keyPoints: ['Core: TikTok + Shopee (cash flow harian)', 'Growth: SEO blog (aset 5 tahun)', 'Empire: recurring SaaS + agency deals'] },
      { title: 'Roadmap $100K/Bulan', minutes: 18, summary: 'Angka konkret: berapa konten, tim, dan budget untuk $100K/bulan.', keyPoints: ['Fase 1 ($0-10K): solo + 3 program', 'Fase 2 ($10-40K): tim 5 orang + paid ads', 'Fase 3 ($40-100K): agency + portfolio 20 brand'] },
    ]),
    order: 8,
  },
]

const leaderboard = [
  { name: 'Rizky Pratama', tier: 'Diamond', earnings: 1284500, clicks: 2840000, conversions: 142000, specialty: 'TikTok Shop Beauty', country: '🇮🇩 Indonesia', growth: 23.4 },
  { name: 'Sarah Chen', tier: 'Diamond', earnings: 986200, clicks: 3100000, conversions: 118000, specialty: 'SEO Review Blog', country: '🇸🇬 Singapura', growth: 18.2 },
  { name: 'Budi Santoso', tier: 'Diamond', earnings: 743800, clicks: 1950000, conversions: 98000, specialty: 'Shopee XTRA Mega Sale', country: '🇮🇩 Indonesia', growth: 31.7 },
  { name: 'Amelia Wijaya', tier: 'Platinum', earnings: 512900, clicks: 1420000, conversions: 67000, specialty: 'Traveloka & Booking.com', country: '🇮🇩 Indonesia', growth: 15.8 },
  { name: 'Kevin Tanaka', tier: 'Platinum', earnings: 487300, clicks: 1650000, conversions: 61000, specialty: 'SaaS Recurring Empire', country: '🇯🇵 Jepang', growth: 27.3 },
  { name: 'Dewi Lestari', tier: 'Platinum', earnings: 398100, clicks: 1240000, conversions: 55000, specialty: 'Live Streaming Komersial', country: '🇮🇩 Indonesia', growth: 22.1 },
  { name: 'Andi Kurniawan', tier: 'Gold', earnings: 267500, clicks: 890000, conversions: 39000, specialty: 'YouTube Gadget Review', country: '🇮🇩 Indonesia', growth: 19.5 },
  { name: 'Maya Putri', tier: 'Gold', earnings: 234800, clicks: 760000, conversions: 34000, specialty: 'Instagram Fashion', country: '🇮🇩 Indonesia', growth: 25.9 },
]

async function seedClicksAndLinks() {
  const linksData = [
    { code: 'pa-tiktok-rz7', name: 'Serum Glowing Viral', programSlug: 'tiktok-shop-affiliate', channel: 'TikTok', targetUrl: 'https://vt.tiktok.com/demo1', clicks: 18420, conversions: 1290, earnings: 8420 },
    { code: 'pa-shopee-k2m', name: 'Mega Sale 11.11 Compilation', programSlug: 'shopee-affiliate-xtra', channel: 'TikTok', targetUrl: 'https://s.shopee.co.id/demo2', clicks: 24310, conversions: 1980, earnings: 11640 },
    { code: 'pa-shopee-x9f', name: 'Produk Dibawah 50rb', programSlug: 'shopee-affiliate-xtra', channel: 'Instagram', targetUrl: 'https://s.shopee.co.id/demo3', clicks: 9840, conversions: 720, earnings: 4110 },
    { code: 'pa-booking-h4t', name: 'Hotel Bali Staycation', programSlug: 'booking-com', channel: 'Blog', targetUrl: 'https://booking.com/demo4', clicks: 3210, conversions: 84, earnings: 3240 },
    { code: 'pa-hostinger-g8w', name: 'Cara Bikin Website 2025', programSlug: 'hostinger', channel: 'YouTube', targetUrl: 'https://hostinger.com/demo5', clicks: 5640, conversions: 96, earnings: 7680 },
    { code: 'pa-binance-q5n', name: 'Panduan Trading Pemula', programSlug: 'binance-referral', channel: 'Telegram', targetUrl: 'https://binance.com/demo6', clicks: 4120, conversions: 388, earnings: 9480 },
    { code: 'pa-tiktok-v3j', name: 'Gadget Unik TikTok', programSlug: 'tiktok-shop-affiliate', channel: 'TikTok', targetUrl: 'https://vt.tiktok.com/demo7', clicks: 12750, conversions: 640, earnings: 3960 },
  ]
  for (const l of linksData) {
    const created = await db.trackedLink.create({ data: { ...l, earnings: l.earnings * 45 } })
    // generate click events over last 30 days
    const events = []
    for (let d = 0; d < 30; d++) {
      const base = Math.floor((l.clicks / 30) * (0.6 + Math.sin(d * 0.7) * 0.25 + Math.random() * 0.4))
      for (let i = 0; i < Math.max(1, Math.floor(base / 40)); i++) {
        const converted = Math.random() < 0.06
        events.push({
          linkId: created.id,
          createdAt: new Date(Date.now() - d * 86400000 - Math.random() * 86400000),
          converted,
          source: l.channel,
          device: Math.random() < 0.75 ? 'mobile' : 'desktop',
        })
      }
    }
    await db.clickEvent.createMany({ data: events.slice(0, 300) })
  }
}

async function main() {
  console.log('🌱 Seeding PUSATAFFILIATE database...')
  await db.clickEvent.deleteMany()
  await db.trackedLink.deleteMany()
  await db.affiliateProgram.deleteMany()
  await db.course.deleteMany()
  await db.affiliateUser.deleteMany()
  await db.platformStat.deleteMany()
  await db.activityLog.deleteMany()

  for (const p of programs) await db.affiliateProgram.create({ data: p })
  console.log(`✓ ${programs.length} program affiliate`)

  for (const c of courses) await db.course.create({ data: c })
  console.log(`✓ ${courses.length} courses`)

  for (const u of leaderboard) await db.affiliateUser.create({ data: u })
  console.log(`✓ ${leaderboard.length} leaderboard entries`)

  await seedClicksAndLinks()
  console.log('✓ tracked links + click events')

  const stats = [
    { key: 'total_affiliate', label: 'Affiliate Aktif', value: 148230, unit: 'user', delta: 12.4 },
    { key: 'total_komisi', label: 'Komisi Dibayarkan', value: 84200000, unit: 'USD', delta: 18.7 },
    { key: 'total_gmv', label: 'GMV Anggota', value: 412000000, unit: 'USD', delta: 24.3 },
    { key: 'total_program', label: 'Program Terkurasi', value: 20, unit: 'program', delta: 8.1 },
    { key: 'total_klik', label: 'Klik Terproses', value: 21400000, unit: 'click', delta: 31.2 },
    { key: 'avg_epc', label: 'Rata-rata EPC', value: 3.94, unit: 'USD', delta: 6.8 },
  ]
  for (const s of stats) await db.platformStat.create({ data: s })
  console.log('✓ platform stats')

  const activities = [
    { type: 'payout', message: 'Payout batch #2847 diproses ke 1,240 affiliate', amount: 342000 },
    { type: 'user_join', message: '1,847 affiliate baru bergabung minggu ini' },
    { type: 'program_added', message: 'Program Canva Pro Affiliate dikurasi masuk Tier A', amount: 36 },
    { type: 'payout', message: 'Top performer Rizky P. menerima payout bulanan', amount: 128400 },
    { type: 'ai_generated', message: 'AI Studio menghasilkan 12,480 konten minggu ini' },
    { type: 'user_join', message: 'Affiliate Diamond baru terdeteksi: @dewi.live' },
  ]
  for (const a of activities) await db.activityLog.create({ data: a })
  console.log('✓ activity logs')
  console.log('🎉 Seed selesai!')
}

main().catch(console.error).finally(() => db.$disconnect())
