'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrainCircuit, Check, Copy, Loader2, Sparkles } from 'lucide-react'
import { api, type AffiliateProgram } from '@/lib/affiliate'
import { GlowCard, SectionHeader } from '@/components/pa/shared'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type Mode = 'script' | 'caption' | 'hook' | 'strategy'

const MODES: { id: Mode; label: string; icon: string; desc: string; placeholder: string }[] = [
  { id: 'script', label: 'Script Video', icon: '🎬', desc: 'Script 30-45 detik siap rekam + 3 variasi hook', placeholder: 'contoh: serum vitamin C untuk kulit kusam' },
  { id: 'caption', label: 'Caption Killer', icon: '✍️', desc: 'Caption siap posting + hashtag riset tinggi', placeholder: 'contoh: sepatu running dibawah 300rb' },
  { id: 'hook', label: 'Hook Viral', icon: '🪝', desc: '10 hook scroll-stopper dengan skor viral', placeholder: 'contoh: gadget murah buat mahasiswa' },
  { id: 'strategy', label: 'Strategi 90 Hari', icon: '🗺️', desc: 'Blueprint personal dari analisis sampai scaling', placeholder: 'contoh: ibu rumah tangga mau mulai affiliate' },
]

const PLATFORMS = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Shopee Video', 'Blog / SEO', 'WhatsApp Status']
const TONES = ['Santai & relatable', 'Hype & energik', 'Autoritatif & data-driven', 'Lucu & menghibur', 'Storytelling emosional']

const LOADING_LINES = [
  'Menghubungi 46 dewan pakar lintas bidang...',
  'Menganalisis 2.4 juta pola konten viral...',
  'Mengoptimasi hook untuk algoritma terbaru...',
  'Menghitung proyeksi komisi maksimal...',
  'Memfinalisasi senjata cuan kamu...',
]

export function AIStudioView() {
  const [mode, setMode] = useState<Mode>('script')
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('TikTok')
  const [tone, setTone] = useState(TONES[0])
  const [program, setProgram] = useState('auto')
  const [programs, setPrograms] = useState<AffiliateProgram[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [loadIdx, setLoadIdx] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    api.getPrograms({ sort: 'trending' }).then((r) => setPrograms(r.programs)).catch(() => {})
  }, [])

  useEffect(() => {
    if (!loading) return
    const t = setInterval(() => setLoadIdx((i) => (i + 1) % LOADING_LINES.length), 2600)
    return () => clearInterval(t)
  }, [loading])

  const activeMode = MODES.find((m) => m.id === mode)!

  async function generate() {
    if (!topic.trim()) {
      toast({ title: 'Topik kosong', description: 'Tulis produk/niche dulu, nanti dewannya bingung.', variant: 'destructive' })
      return
    }
    setLoading(true)
    setResult('')
    setCopied(false)
    try {
      const res = await api.aiGenerate({
        mode,
        topic: topic.trim(),
        platform,
        tone,
        program: program === 'auto' ? undefined : programs.find((p) => p.slug === program)?.name,
      })
      setResult(res.result)
      toast({ title: '⚡ Senjata siap!', description: 'Dewan 46 pakar menyelesaikan misinya.' })
    } catch (e) {
      toast({ title: 'AI sedang sibuk', description: e instanceof Error ? e.message : 'Coba lagi sebentar', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    toast({ title: 'Tersalin ke clipboard ✅' })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        kicker="AI CORE // 46 EXPERTS"
        title="AI Studio — Dewan 46 Pakar"
        icon="🧠"
        subtitle="Mesin generasi konten & strategi affiliate tercanggih. Kamu kasih topik, AI kasih senjata siap pakai."
      />

      {/* Mode tabs */}
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id)
              setResult('')
            }}
            className={`rounded-xl border p-3 text-left transition-all sm:p-4 ${
              mode === m.id ? 'neon-border neon-border-vio scale-[1.02]' : 'glass glass-hover border-white/5'
            }`}
          >
            <span className="text-2xl">{m.icon}</span>
            <p className={`mt-1.5 text-sm font-bold ${mode === m.id ? 'text-violet-300' : ''}`}>{m.label}</p>
            <p className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* ===== FORM ===== */}
        <GlowCard variant="violet" hover={false}>
          <h3 className="font-display mb-5 flex items-center gap-2 text-lg font-bold">
            <BrainCircuit className="h-5 w-5 text-violet-400" /> Konfigurasi Misi
          </h3>
          <div className="space-y-5">
            <div>
              <Label className="text-xs tracking-wider text-muted-foreground uppercase">Produk / Niche / Topik *</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={activeMode.placeholder}
                className="mt-1.5 h-11"
                onKeyDown={(e) => e.key === 'Enter' && !loading && generate()}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs tracking-wider text-muted-foreground uppercase">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs tracking-wider text-muted-foreground uppercase">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs tracking-wider text-muted-foreground uppercase">Program Affiliate (opsional)</Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">🔮 AI pilihkan yang terbaik</SelectItem>
                  {programs.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>{p.icon} {p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="btn-neon h-12 w-full gap-2 rounded-xl text-base font-semibold">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {loading ? 'Dewan sedang berpikir...' : 'Generate Sekarang'}
            </Button>
          </div>
        </GlowCard>

        {/* ===== RESULT ===== */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[420px] flex-col items-center justify-center">
                <div className="relative">
                  <div className="orb orb-vio animate-orb h-40 w-40" />
                  <BrainCircuit className="relative h-16 w-16 animate-pulse text-violet-400" />
                </div>
                <p className="font-mono mt-6 text-sm tracking-widest text-violet-300">{LOADING_LINES[loadIdx]}</p>
                <div className="mt-4 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="h-2 w-2 rounded-full bg-violet-400" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />
                  ))}
                </div>
              </motion.div>
            ) : result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <GlowCard variant="plain" hover={false}>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <Badge className="gap-1 border-emerald-400/40 bg-emerald-400/10 text-emerald-300" variant="outline">
                      <Sparkles className="h-3 w-3" /> {activeMode.icon} {activeMode.label} — SIAP PAKAI
                    </Badge>
                    <Button size="sm" variant="secondary" className="gap-1.5 rounded-lg" onClick={copyResult}>
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Tersalin' : 'Salin'}
                    </Button>
                  </div>
                  <div className="max-h-[62vh] overflow-y-auto pr-2">
                    <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{result}</pre>
                  </div>
                </GlowCard>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
                <div className="text-5xl opacity-60">🧠</div>
                <p className="font-display mt-4 text-lg font-bold">Kanvas kosong menunggu keajaiban</p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Isi topik di kiri, tekan <b className="text-violet-300">Generate Sekarang</b>, dan lihat 46 dewan pakar merakit konten cuan untukmu.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
