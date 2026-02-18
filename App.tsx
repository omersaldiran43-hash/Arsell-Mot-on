import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';
import { 
  Zap, 
  Menu, 
  X, 
  ChevronDown, 
  Wand2, 
  FolderOpen, 
  Sparkles,
  Settings,
  Download,
  LogOut,
  Move,
  Clock,
  Check,
  Star,
  Users,
  CreditCard,
  Video,
  ShoppingBag,
  Instagram,
  MonitorPlay,
  ChevronRight,
  Plus,
  LayoutGrid,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Coins,
  ArrowLeft,
  User,
  Mail,
  Save,
  Bell,
  Loader2,
  AlertCircle,
  FileText,
  Shield,
  Layers,
  Trophy,
  Cookie
} from 'lucide-react';

// --- Global Types & Variants ---

type ViewState = 'landing' | 'auth' | 'app';
type PolicyType = 'privacy' | 'terms' | 'creative-challenge' | 'cookie-notice' | 'cookie-settings' | null;

const LOGO_URL = "https://i.hizliresim.com/1mzb21q.png";

// --- Policies Content ---

const PRIVACY_TEXT = `
**GİZLİLİK POLİTİKASI (PRIVACY)**

**1. Veri Toplama ve Kullanım**
Arsell Motion AI ("Platform") olarak, hizmetlerimizi sunmak amacıyla adınız, e-posta adresiniz ve yüklediğiniz medya dosyaları gibi temel bilgileri toplarız. Yüklediğiniz videolar ve görseller, yalnızca talep ettiğiniz işlemi gerçekleştirmek (video üretimi) amacıyla işlenir ve geçici sunucularımızda barındırılır.

**2. Medya Güvenliği**
Yüklediğiniz referans videolar ve karakter görselleri, işlem tamamlandıktan sonra belirli bir süre (varsayılan 24-48 saat) sistemde tutulur ve ardından otomatik olarak güvenli bir şekilde silinir veya arşivlenir. İçerikleriniz asla üçüncü taraflarla reklam amaçlı paylaşılmaz veya izniniz olmadan umuma açık yayınlanmaz.

**3. Çerezler ve İzleme**
Kullanıcı deneyimini iyileştirmek ve oturum güvenliğini sağlamak amacıyla çerezler (cookies) kullanmaktayız. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.

**4. Üçüncü Taraf Hizmetler**
Ödeme işlemleri güvenli ödeme altyapısı sağlayıcıları (örn. PayTR, Stripe vb.) aracılığıyla gerçekleştirilir. Kredi kartı bilgileriniz sunucularımızda saklanmaz.

**5. Değişiklikler**
Bu politika zaman zaman güncellenebilir. Önemli değişiklikler e-posta veya site içi bildirim yoluyla duyurulacaktır.
`;

const TERMS_TEXT = `
**KULLANIM ŞARTLARI (TERMS)**

**1. Hizmetin Tanımı**
Arsell Motion AI, yapay zeka tabanlı video üretim ve düzenleme araçları sunan bir platformdur. Kullanıcılar kredi satın alarak video işleme hizmetlerinden yararlanabilirler.

**2. Kullanıcı Sorumlulukları**
Platformu yasa dışı, zararlı, tehditkar, müstehcen veya telif haklarını ihlal eden içerikler üretmek için kullanamazsınız. Yüklediğiniz tüm içeriklerin yasal sorumluluğu size aittir. Deepfake veya yanıltıcı içerik üretimi tespiti halinde hesabınız askıya alınabilir.

**3. Fikri Mülkiyet**
Platform üzerinde oluşturduğunuz çıktıların (output) ticari kullanım hakları, aksi belirtilmedikçe size aittir. Ancak, Arsell Motion AI altyapısının, yazılımının ve markasının tüm hakları saklıdır.

**4. Krediler ve Ödemeler**
Satın alınan krediler dijital ürün niteliğinde olup, kullanıldıktan sonra iade edilemez. Kullanılmamış krediler için yasal cayma süresi (14 gün) geçerlidir.

**5. Hizmet Sürekliliği**
Arsell Motion AI, bakım çalışmaları veya teknik zorunluluklar nedeniyle hizmete geçici olarak ara verme hakkını saklı tutar. Olası veri kayıplarına karşı kullanıcıların kendi yedeklerini almaları önerilir.
`;

const CREATIVE_CHALLENGE_TEXT = `
**CREATIVE CHALLENGE (YARATICI YARIŞMA)**

**1. Yarışma Hakkında**
Her ay düzenlenen Arsell Motion Creative Challenge, topluluğumuzun en yetenekli içerik üreticilerini ödüllendiriyor. Amacımız, yapay zeka destekli video üretiminin sınırlarını zorlamak ve yaratıcılığı teşvik etmektir.

**2. Nasıl Katılırım?**
- Arsell Motion kullanarak "Ayın Teması"na uygun minimum 5 saniyelik bir video oluşturun.
- Videonuzu Instagram veya Twitter'da #ArsellChallenge etiketiyle paylaşın.
- Profilinizden "Yarışmaya Katıl" butonuna tıklayarak gönderi linkini yapıştırın (Bu özellik panelde aktif olduğunda).

**3. Ödüller**
🥇 **1.lik Ödülü:** 5.000 Kredi + 1 Yıllık 'Scale' Paketi
🥈 **2.lik Ödülü:** 2.500 Kredi + 'Growth' Paketi
🥉 **3.lik Ödülü:** 1.000 Kredi

**4. Değerlendirme Kriterleri**
Jürimiz; yaratıcılık, teknik kalite, hikaye anlatımı ve prompt kullanımındaki ustalığı baz alarak puanlama yapar. Sonuçlar her ayın 1'inde duyurulur.

**5. Katılım Koşulları**
Yarışmaya katılan eserlerin özgün olması ve Arsell Motion altyapısı ile üretilmiş olması gerekmektedir. Topluluk kurallarına aykırı içerikler diskalifiye edilir.
`;

const COOKIE_NOTICE_TEXT = `
**ÇEREZ BİLDİRİMİ (COOKIE NOTICE)**

**1. Çerez Nedir?**
Çerezler (Cookies), web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza, tabletinize veya mobil cihazınıza depolanan küçük metin dosyalarıdır. Bu dosyalar, site tercihlerinizin hatırlanması ve daha iyi bir deneyim sunulması için kullanılır.

**2. Neden Çerez Kullanıyoruz?**
- **Zorunlu Fonksiyonlar:** Sitemizin düzgün çalışmasını sağlamak (Örn: Oturum açma, sepet işlemleri).
- **Performans Analizi:** Ziyaretçi sayılarını ve trafik kaynaklarını analiz ederek sitemizin performansını artırmak.
- **Kişiselleştirme:** Size özel içerik ve öneriler sunmak.
- **Pazarlama:** İlgi alanlarınıza uygun reklamlar göstermek.

**3. Çerez Türleri**
- **Oturum Çerezleri:** Tarayıcınızı kapattığınızda otomatik olarak silinir.
- **Kalıcı Çerezler:** Silinene kadar veya süreleri dolana kadar cihazınızda kalır.
- **Üçüncü Taraf Çerezleri:** İş ortaklarımız (Google Analytics, Facebook Pixel vb.) tarafından yerleştirilir.

Bu bildirim, çerez kullanımı hakkındaki şeffaflık taahhüdümüzün bir parçasıdır.
`;

const COOKIE_SETTINGS_TEXT = `
**ÇEREZ AYARLARI (COOKIE SETTINGS)**

Web sitemizdeki çerez tercihlerinizi aşağıdan yönetebilirsiniz.

**✅ Zorunlu Çerezler (Her Zaman Açık)**
Bu çerezler, web sitesinin güvenli bir şekilde çalışması, oturum açmanız ve temel fonksiyonları kullanabilmeniz için gereklidir. Bu çerezler sistemlerimizden kapatılamaz.

**🔲 Analitik ve Performans Çerezleri**
Sitemizi nasıl kullandığınızı analiz etmemize ve performansı artırmamıza yardımcı olur. Hangi sayfaların en çok ve en az ziyaret edildiğini anlamamızı sağlar. 
*(Şu an: Aktif)*

**🔲 Pazarlama ve Hedefleme Çerezleri**
Reklam ortaklarımız tarafından ilgi alanlarınıza uygun profiller oluşturmak ve diğer sitelerde alakalı reklamlar göstermek için kullanılabilir. Bu çerezlere izin vermezseniz, daha az hedeflenmiş reklamlarla karşılaşırsınız.
*(Şu an: Aktif)*

*Not: Tarayıcı ayarlarınızı kullanarak da çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz.*
`;

// --- Shared Components ---

const Logo = ({ className = "h-8" }: { className?: string }) => (
  <img src={LOGO_URL} alt="Arsell Motion" className={`${className} object-contain`} />
);

const Button = ({ children, variant = 'primary', className = '', onClick, disabled = false }: { children?: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'google', className?: string, onClick?: () => void, disabled?: boolean }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]",
    secondary: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-md border border-white/10",
    outline: "border border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00]",
    google: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const PolicyModal = ({ type, onClose }: { type: PolicyType, onClose: () => void }) => {
  if (!type) return null;
  
  let title = '';
  let content = '';
  let Icon = FileText;

  switch (type) {
    case 'privacy':
      title = 'Gizlilik Politikası';
      content = PRIVACY_TEXT;
      Icon = Shield;
      break;
    case 'terms':
      title = 'Kullanım Şartları';
      content = TERMS_TEXT;
      Icon = FileText;
      break;
    case 'creative-challenge':
      title = 'Creative Challenge';
      content = CREATIVE_CHALLENGE_TEXT;
      Icon = Trophy;
      break;
    case 'cookie-notice':
      title = 'Çerez Bildirimi';
      content = COOKIE_NOTICE_TEXT;
      Icon = Cookie;
      break;
    case 'cookie-settings':
      title = 'Çerez Ayarları';
      content = COOKIE_SETTINGS_TEXT;
      Icon = Settings;
      break;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#ccff00]/10 rounded-lg text-[#ccff00]">
                <Icon size={20} />
             </div>
             <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
           {content}
        </div>
        <div className="p-6 border-t border-white/10 bg-[#111] flex justify-end">
           <button onClick={onClose} className="bg-white text-black font-bold px-6 py-2 rounded-xl hover:bg-gray-200 transition-colors">
             Anladım
           </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- NEW PROFESSIONAL BACKGROUND COMPONENT ---
const BackgroundEffects = ({ variant = 'default' }: { variant?: 'default' | 'auth' | 'dashboard' }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-[#020202]"></div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
        }}
      ></div>

      {/* Ambient Glows based on variant */}
      {variant === 'default' && (
        <>
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#ccff00]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[4000ms]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ccff00]/5 blur-[100px] rounded-full mix-blend-screen"></div>
        </>
      )}

      {variant === 'auth' && (
        <>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#ccff00]/10 to-transparent blur-[60px] opacity-40"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </>
      )}

      {variant === 'dashboard' && (
        <>
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-b from-[#ccff00]/5 to-transparent blur-[100px] opacity-30"></div>
        </>
      )}
    </div>
  );
};

// --- AUTH SCREEN ---

const AuthScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
        if (error) throw error;
      }
      onLoginSuccess();
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`, 
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
      <BackgroundEffects variant="auth" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-6">
            <Logo className="h-12" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            {isLogin ? 'Tekrar Hoşgeldiniz' : 'Hesap Oluştur'}
          </h2>
          <p className="text-gray-400">
            {isLogin ? 'Arsell Motion dünyasına giriş yapın.' : 'Yaratıcılığınızı serbest bırakmak için katılın.'}
          </p>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-50"></div>
           
           <div className="flex bg-black/40 p-1 rounded-xl mb-6 border border-white/5 relative z-10">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-[#1a1a1a] text-white shadow-lg ring-1 ring-white/10' : 'text-gray-500 hover:text-white'}`}
              >
                Giriş Yap
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-[#1a1a1a] text-white shadow-lg ring-1 ring-white/10' : 'text-gray-500 hover:text-white'}`}
              >
                Kayıt Ol
              </button>
           </div>

           <Button 
             variant="google" 
             className="w-full relative group hover:bg-gray-50 transition-colors"
             onClick={handleGoogleLogin}
             disabled={loading}
           >
             <svg className="w-5 h-5 absolute left-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
             {loading ? 'Yönlendiriliyor...' : 'Google ile Devam Et'}
           </Button>
           
           <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-gray-600 text-xs uppercase font-bold tracking-wider">veya</span>
              <div className="flex-grow border-t border-white/10"></div>
           </div>

           <form className="space-y-4 relative z-10" onSubmit={handleAuth}>
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">AD</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-3.5 text-gray-500" />
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ad" className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-gray-700" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">SOYAD</label>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Soyad" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-gray-700" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">E-POSTA ADRESİ</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-3.5 text-gray-500" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@arsell.com" className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-gray-700" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">ŞİFRE</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/50 transition-all placeholder:text-gray-700" />
              </div>

              {errorMsg && (
                <div className="text-red-500 text-xs text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                  {errorMsg}
                </div>
              )}

              <Button disabled={loading} className="w-full mt-2">
                {loading ? <Loader2 size={16} className="animate-spin" /> : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
              </Button>
           </form>
        </div>
        
        <p className="text-center text-gray-600 text-xs mt-8">
          Devam ederek <a href="#" className="text-gray-400 hover:text-white underline">Hizmet Şartları</a>'nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
};

// --- DASHBOARD COMPONENTS ---

interface GeneratedResult {
  id: string;
  output_video_url: string;
  created_at: string;
  status: string;
}

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface CreditPackage {
  id: number;
  name: string;
  credits: number;
  price: number;
  description: string;
  features: string[];
  is_popular: boolean;
}

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'pricing' | 'settings'>('generate');
  const [quality, setQuality] = useState("1080p");
  const [extraPrompt, setExtraPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<GeneratedResult[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ first_name: '', last_name: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Layout Refs & File State
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchPackages();
    fetchGenerations();

    // Subscribe to realtime changes for credits and generations
    const creditsSub = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_balances' }, (payload) => {
        fetchUserData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'generations' }, (payload) => {
        fetchGenerations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(creditsSub);
    }
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      const { data: balanceData } = await supabase.from('user_balances').select('credits').eq('user_id', user.id).single();
      
      setProfile(profileData);
      setCredits(balanceData?.credits || 0);
      
      if (profileData) {
        setSettingsForm({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || ''
        });
      }
    }
  };

  const fetchPackages = async () => {
    const { data } = await supabase.from('credit_packages').select('*').order('price');
    if (data && data.length > 0) setPackages(data);
  };

  const fetchGenerations = async () => {
    const { data } = await supabase.from('generations').select('*').order('created_at', { ascending: false });
    if (data) setGeneratedResults(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'video') {
        // Load video metadata to check duration
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        
        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src);
          const duration = videoElement.duration;
          
          if (duration > 30) {
            alert('Video süresi maksimum 30 saniye olabilir. Lütfen daha kısa bir video yükleyin.');
            e.target.value = ''; // Reset input
            setUploadedVideo(null);
            setVideoFile(null);
            setVideoDuration(null);
          } else {
            setUploadedVideo(url);
            setVideoFile(file);
            setVideoDuration(duration);
          }
        };
        
        videoElement.src = URL.createObjectURL(file);

      } else {
        setUploadedImage(url);
        setImageFile(file);
      }
    }
  };

  const uploadFileToStorage = async (file: File, bucket: string, path: string) => {
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) {
        throw new Error(`Upload failed for ${file.name}: ${error.message}`);
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
  };

  // Cost multipliers for resolutions
  const QUALITY_MULTIPLIERS: Record<string, number> = {
    "720p": 1,
    "1080p": 1,
    "2K": 1.5,
    "4K": 2
  };

  const handleGenerate = async () => {
    // Calculate cost based on duration (1 sec = 1 credit), min 5 credits
    const baseCost = videoDuration ? Math.ceil(videoDuration) : 5;
    const multiplier = QUALITY_MULTIPLIERS[quality] || 1;
    const totalCost = Math.ceil(baseCost * multiplier);

    if (credits === null || credits < totalCost) {
      alert(`Yetersiz kredi! Bu işlem (${quality}) için ${totalCost} kredi gerekiyor.`);
      setActiveTab('pricing');
      return;
    }
    if (!videoFile || !imageFile) {
      alert("Lütfen bir referans video ve karakter görseli yükleyin.");
      return;
    }
    
    setIsGenerating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if(!user) return;

      // 1. Spend Credits (Server-side secure function)
      const { data: success, error: spendError } = await supabase.rpc('spend_credits', { 
        amount: totalCost, 
        description: `Motion Transfer ${quality} (${Math.ceil(videoDuration || 0)}s)` 
      });

      if (spendError || !success) {
        throw new Error("Kredi düşülemedi veya yetersiz bakiye.");
      }

      // 2. Upload files to Supabase Storage
      const timestamp = Date.now();
      const videoPath = `${user.id}/${timestamp}_video_${videoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const imagePath = `${user.id}/${timestamp}_image_${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

      const publicVideoUrl = await uploadFileToStorage(videoFile, 'uploads', videoPath);
      const publicImageUrl = await uploadFileToStorage(imageFile, 'uploads', imagePath);

      // 3. Call External Webhook
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 900000);

      try {
        const webhookResponse = await fetch('https://kt4mv7v1.rpcld.com/webhook/motion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: extraPrompt,
                image: publicImageUrl,
                video: publicVideoUrl,
                quality: quality // Sending quality to webhook if supported
            }),
            signal: controller.signal
        });

        if (!webhookResponse.ok) {
            throw new Error('Video oluşturma servisine erişilemedi.');
        }

        const resultData = await webhookResponse.json();
        const outputVideoUrl = resultData.video_url;

        if (!outputVideoUrl) {
            throw new Error('Servis geçerli bir video URL döndürmedi.');
        }

        // 4. Insert Generation Record
        const { error: genError } = await supabase.from('generations').insert({
          user_id: user.id,
          prompt: extraPrompt,
          input_video_url: publicVideoUrl,
          input_image_url: publicImageUrl,
          output_video_url: outputVideoUrl,
          status: 'completed'
        });

        if (genError) throw genError;

        // Refresh list
        await fetchGenerations();

        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      } finally {
        clearTimeout(timeoutId);
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert("İşlem zaman aşımına uğradı (15 dakika). Lütfen daha sonra tekrar deneyiniz veya destek ile iletişime geçiniz.");
      } else {
        alert("İşlem başarısız: " + error.message);
      }
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBuyCredits = async (amount: number, description: string) => {
    const confirm = window.confirm(`${amount} kredi satın almak istiyor musunuz?`);
    if(confirm) {
      try {
        const { error } = await supabase.rpc('add_credits', { amount, description: `Satın alma: ${description}` });
        if(error) throw error;
        alert("Krediler başarıyla eklendi!");
        setActiveTab('generate');
      } catch (e:any) {
        alert("Yükleme hatası: " + e.message);
      }
    }
  };
  
  const handleSaveSettings = async () => {
    setIsUpdatingProfile(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if(!user) return;

        const { error } = await supabase.from('profiles').update({
            first_name: settingsForm.first_name,
            last_name: settingsForm.last_name
        }).eq('id', user.id);

        if(error) throw error;
        
        alert("Profil bilgileri başarıyla güncellendi.");
        await fetchUserData();
    } catch (error: any) {
        alert("Profil güncellenirken hata oluştu: " + error.message);
    } finally {
        setIsUpdatingProfile(false);
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `Arsell_Motion_Result_${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const calculatedBaseCost = videoDuration ? Math.ceil(videoDuration) : 0;
  const calculatedTotalCost = Math.ceil(calculatedBaseCost * (QUALITY_MULTIPLIERS[quality] || 1));

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-[#ccff00] selection:text-black">
      <BackgroundEffects variant="dashboard" />
      
      {/* Left Sidebar - Glass Effect */}
      <div className="w-20 lg:w-64 bg-[#050505]/90 backdrop-blur-xl border-r border-white/5 flex flex-col flex-shrink-0 z-30 transition-all duration-300">
         <div className="h-20 flex items-center px-6 border-b border-white/5">
            <Logo className="h-6" />
         </div>

         <div className="p-4 space-y-1">
            <div className="mb-6 px-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden lg:block">MENÜ</div>
            <button 
                onClick={() => setActiveTab('generate')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'generate' ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
               <Move size={18} /> <span className="hidden lg:inline">Hareket Kontrolü</span>
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-[#1a1a1a] text-white border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
               <Settings size={18} /> <span className="hidden lg:inline">Ayarlar</span>
            </button>
            
            <div className="mt-8 mb-2 px-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden lg:block">HESABIM</div>
            <div className="hidden lg:flex items-center gap-3 p-3 rounded-xl bg-[#111] border border-white/5 text-white mx-1">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#ccff00]">
                 <Coins size={16} />
               </div>
               <div>
                 <div className="text-xs text-gray-400">Krediler</div>
                 <div className="text-sm font-bold">{credits !== null ? credits : '...'} Cr</div>
               </div>
               <button 
                  onClick={() => setActiveTab('pricing')}
                  className="ml-auto text-[#ccff00] hover:text-white hover:bg-white/10 transition-colors text-xs font-bold px-2 py-1 bg-white/5 rounded"
               >
                  <Plus size={14} />
               </button>
            </div>
            {/* Mobile credits view */}
            <div className="lg:hidden flex flex-col items-center gap-1 py-4 cursor-pointer" onClick={() => setActiveTab('pricing')}>
               <Coins size={20} className="text-[#ccff00]"/>
               <span className="text-[10px] font-bold">{credits !== null ? credits : '...'}</span>
            </div>
         </div>

         <div className="mt-auto p-4 border-t border-white/5 bg-[#080808]">
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ccff00] to-green-600 flex items-center justify-center font-bold text-black text-xs shadow-lg shadow-[#ccff00]/10 shrink-0 uppercase">
                  {profile?.first_name?.[0] || 'U'}
               </div>
               <div className="hidden lg:block flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate text-white">{profile?.first_name || 'Kullanıcı'}</p>
                  <p className="text-[10px] text-[#ccff00]">Creator Paketi</p>
               </div>
               <button onClick={handleSignOut} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><LogOut size={16}/></button>
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative overflow-y-auto custom-scrollbar z-20">
         
         {/* Top Header */}
         <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-xl border-b border-white/5 px-8 pt-6 pb-0">
             <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
                <div className={`pb-4 cursor-pointer hover:text-white transition-colors ${activeTab === 'generate' ? 'text-white border-b-2 border-[#ccff00] relative text-lg font-bold' : ''}`} onClick={() => setActiveTab('generate')}>
                   Motion Control
                   {activeTab === 'generate' && <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#ccff00] rounded-full"></span>}
                </div>
                <div className={`pb-4 cursor-pointer hover:text-white transition-colors ${activeTab === 'pricing' ? 'text-white border-b-2 border-[#ccff00] relative text-lg font-bold' : ''}`} onClick={() => setActiveTab('pricing')}>
                   Kredi Yükle
                   {activeTab === 'pricing' && <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#ccff00] rounded-full"></span>}
                </div>
                <div className={`pb-4 cursor-pointer hover:text-white transition-colors ${activeTab === 'settings' ? 'text-white border-b-2 border-[#ccff00] relative text-lg font-bold' : ''}`} onClick={() => setActiveTab('settings')}>
                   Ayarlar
                   {activeTab === 'settings' && <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#ccff00] rounded-full"></span>}
                </div>
             </div>
         </div>

         {/* Content Switcher */}
         <div className="flex-1 p-6 pb-24">
            {activeTab === 'generate' && (
              <div className="max-w-5xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
                 {/* Banner */}
                 <div className="relative w-full h-48 rounded-2xl overflow-hidden group border border-white/10 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Banner" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Yeni Özellik</span>
                       </div>
                       <h1 className="text-3xl font-black text-white mb-1 uppercase tracking-tight text-[#ccff00]">MOTION CONTROL</h1>
                       <p className="text-gray-300 text-sm mb-4">Video referansları ile hareketi kontrol et</p>
                    </div>
                 </div>

                 {/* Upload Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative group hover:border-[#ccff00]/30 transition-colors h-[300px] flex flex-col shadow-lg">
                       <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                       <div className="flex-1 bg-[#0a0a0a]/50 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 group-hover:border-[#ccff00]/20 transition-colors overflow-hidden relative">
                          {uploadedVideo ? (
                             <video src={uploadedVideo} className="w-full h-full object-cover rounded-lg" autoPlay muted loop />
                          ) : (
                             <>
                                <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 text-[#ccff00] shadow-lg shadow-[#ccff00]/5 group-hover:scale-110 transition-transform">
                                   <Video size={24} />
                                </div>
                                <h3 className="text-white font-bold mb-2">Referans Video Ekle</h3>
                                <p className="text-gray-500 text-xs">Maksimum 30 saniye</p>
                             </>
                          )}
                       </div>
                       {uploadedVideo && (
                          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                             <div className="bg-black/50 p-1 rounded-full"><Check size={14} className="text-[#ccff00]"/></div>
                             {videoDuration && (
                                <div className="bg-black/80 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-[#ccff00] border border-white/10">
                                   {Math.ceil(videoDuration)}sn
                                </div>
                             )}
                          </div>
                       )}
                    </div>

                    <div className="bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative group hover:border-[#ccff00]/30 transition-colors h-[300px] flex flex-col shadow-lg">
                       <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                       <div className="flex-1 bg-[#0a0a0a]/50 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 group-hover:border-[#ccff00]/20 transition-colors overflow-hidden relative">
                          {uploadedImage ? (
                             <img src={uploadedImage} className="w-full h-full object-cover rounded-lg" alt="Character" />
                          ) : (
                             <>
                                <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 text-[#ccff00] shadow-lg shadow-[#ccff00]/5 group-hover:scale-110 transition-transform">
                                   <Plus size={24} />
                                </div>
                                <h3 className="text-white font-bold mb-2">Karakterini Ekle</h3>
                                <p className="text-gray-500 text-xs">Net yüz ve vücut içeren görsel</p>
                             </>
                          )}
                       </div>
                       {uploadedImage && <div className="absolute top-4 right-4 z-20 bg-black/50 p-1 rounded-full"><Check size={14} className="text-[#ccff00]"/></div>}
                    </div>
                 </div>

                 {/* Settings */}
                 <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       <div className="bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-lg">
                          <div>
                             <span className="text-xs text-gray-500 block mb-1">Model</span>
                             <span className="text-white font-bold flex items-center gap-2">
                                Arsell Motion 3.0 <Zap size={14} className="text-[#ccff00] fill-current" />
                             </span>
                          </div>
                       </div>
                       
                       <div className="bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-xl p-2 flex items-center shadow-lg relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
                             <Layers size={18} />
                          </div>
                          <select 
                             value={quality} 
                             onChange={(e) => setQuality(e.target.value)}
                             className="w-full bg-transparent text-white font-bold text-sm pl-12 pr-4 py-2 focus:outline-none cursor-pointer appearance-none"
                          >
                             <option value="720p" className="bg-[#111] text-gray-300">720p HD (1x Kredi)</option>
                             <option value="1080p" className="bg-[#111] text-gray-300">1080p FHD (1x Kredi)</option>
                             <option value="2K" className="bg-[#111] text-[#ccff00] font-bold">2K QHD (1.5x Kredi)</option>
                             <option value="4K" className="bg-[#111] text-[#ccff00] font-bold">4K UHD (2x Kredi)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                             <ChevronDown size={16} />
                          </div>
                       </div>
                    </div>
                    
                    {/* Duration & Credit Info Box */}
                    {videoDuration && (
                       <div className="bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-xl p-4 flex items-center gap-3">
                          <AlertCircle size={20} className="text-[#ccff00]" />
                          <div className="flex-1">
                             <p className="text-white text-sm font-bold">Hesaplanan Maliyet</p>
                             <div className="flex items-center justify-between mt-1">
                                <p className="text-gray-400 text-xs">Video: {Math.ceil(videoDuration)}sn</p>
                                <p className="text-[#ccff00] text-xs font-bold bg-[#ccff00]/10 px-2 py-0.5 rounded border border-[#ccff00]/20">
                                   Toplam: {calculatedTotalCost} Kredi
                                </p>
                             </div>
                          </div>
                       </div>
                    )}

                    <div className="bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-lg">
                       <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-white font-bold">
                             <Sparkles size={16} className="text-[#ccff00]" /> Ekstra İstekler (Prompt)
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase">Opsiyonel</span>
                       </div>
                       <textarea 
                          value={extraPrompt}
                          onChange={(e) => setExtraPrompt(e.target.value)}
                          placeholder="Işıklandırma, arka plan veya ruh hali gibi detayları buraya yazabilirsiniz..."
                          className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ccff00]/50 min-h-[80px] resize-none"
                       />
                    </div>
                 </div>

                 <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.2)] hover:shadow-[0_0_50px_rgba(204,255,0,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isGenerating ? (
                       <>Oluşturuluyor (Bu işlem zaman alabilir)...</>
                    ) : (
                       <>Oluştur <Sparkles size={20} className="fill-black" /> {calculatedTotalCost > 0 ? calculatedTotalCost : '5+'} Kredi</>
                    )}
                 </button>

                 {/* Results Section */}
                 <div id="results-section" className="pt-8 border-t border-white/5">
                     <div className="flex items-center gap-3 mb-6">
                         <div className="w-6 h-6 bg-[#111] rounded flex items-center justify-center border border-white/10 text-[#ccff00]">
                             <CheckCircle2 size={14} />
                         </div>
                         <h3 className="text-lg font-bold text-white">Oluşturulan Sonuçlar</h3>
                     </div>

                     {generatedResults.length === 0 ? (
                         <div className="bg-[#0a0a0a]/50 border border-dashed border-white/10 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
                             <div className="w-12 h-12 bg-[#111] rounded-xl flex items-center justify-center mb-6 text-gray-600">
                                <LayoutGrid size={24} />
                             </div>
                             <p className="text-gray-400 font-medium mb-1">Henüz video oluşturulmadı</p>
                             <p className="text-gray-600 text-xs max-w-xs">Referanslarını yükle ve sonuçları görmek için oluştur butonuna tıkla.</p>
                         </div>
                     ) : (
                         <div className="grid gap-6">
                             <AnimatePresence>
                                 {generatedResults.map((result) => (
                                     <motion.div 
                                         key={result.id}
                                         initial={{ opacity: 0, y: 20 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden p-4 group hover:border-[#ccff00]/20 transition-all shadow-lg"
                                     >
                                         <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 relative">
                                             <video src={result.output_video_url} controls className="w-full h-full object-contain" />
                                             <div className="absolute top-3 left-3 bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase">
                                                 {result.status}
                                             </div>
                                         </div>
                                         
                                         <div className="flex items-center justify-between">
                                             <div>
                                                 <p className="text-white font-bold text-sm">Motion Transfer Sonucu</p>
                                                 <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                                                     <Clock size={12} /> {new Date(result.created_at).toLocaleString()} • {quality}
                                                 </p>
                                             </div>
                                             <button 
                                                 onClick={() => handleDownload(result.output_video_url)}
                                                 className="bg-white text-black hover:bg-[#ccff00] font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                                             >
                                                 <Download size={14} /> İndir
                                             </button>
                                         </div>
                                     </motion.div>
                                 ))}
                             </AnimatePresence>
                         </div>
                     )}
                 </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center">
                     <h2 className="text-3xl font-black text-white mb-2">Bakiyenizi Yükleyin</h2>
                     <p className="text-gray-400">Kesintisiz üretim için kredi paketlerinden size uygun olanı seçin.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Using manual packages to reflect prompt request immediately without waiting for DB sync if needed */}
                      {[
                        {
                          id: 1,
                          name: "Starter",
                          credits: 35,
                          price: 350,
                          description: "Başlangıç için ideal.",
                          features: ["35 Kredi", "35 Saniye Video", "Standart Hız"],
                          is_popular: false
                        },
                        {
                          id: 2,
                          name: "Growth",
                          credits: 75,
                          price: 750,
                          description: "İçerik üreticileri için.",
                          features: ["75 Kredi", "75 Saniye Video", "Yüksek Hız"],
                          is_popular: true
                        },
                        {
                          id: 3,
                          name: "Scale",
                          credits: 125,
                          price: 1250,
                          description: "Profesyoneller için.",
                          features: ["125 Kredi", "125 Saniye Video", "Öncelikli Render"],
                          is_popular: false
                        }
                      ].map((pack) => (
                          <div key={pack.id} className={`rounded-3xl p-6 border border-white/10 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-xl ${pack.is_popular ? 'bg-[#0f0f0f] border-[#ccff00]' : 'bg-[#0f0f0f]'}`}>
                             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-[#ccff00]">
                                <Coins size={24} />
                             </div>
                             <h3 className="font-bold text-white mb-1">{pack.name}</h3>
                             <div className="text-3xl font-black text-[#ccff00] mb-4">{pack.credits} <span className="text-xs text-gray-400 font-normal">Kredi</span></div>
                             <div className="text-xl font-bold text-white mb-6">{pack.price} TL</div>
                             <button 
                                onClick={() => handleBuyCredits(pack.credits, pack.name)}
                                className="w-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white font-bold py-3 rounded-xl transition-all"
                             >
                                Satın Al
                             </button>
                          </div>
                      ))}
                  </div>
                  
                  <div className="bg-[#0f0f0f] rounded-2xl p-6 flex items-start gap-4 border border-white/5 shadow-lg">
                     <div className="p-2 bg-[#ccff00]/10 rounded-lg text-[#ccff00]"><CheckCircle2 size={20} /></div>
                     <div>
                        <h4 className="font-bold text-white text-sm mb-1">Güvenli Ödeme & Anında Teslimat</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">Ödemeniz 256-bit SSL ile korunmaktadır. Satın aldığınız krediler hesabınıza anında tanımlanır ve hemen kullanmaya başlayabilirsiniz.</p>
                     </div>
                  </div>
              </div>
            )}

            {activeTab === 'settings' && (
               <div className="max-w-3xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Hesap Ayarları</h2>
                  
                  <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 space-y-6 shadow-lg">
                     <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#ccff00] to-green-600 flex items-center justify-center font-bold text-black text-2xl uppercase">
                           {profile?.first_name?.[0] || 'U'}
                        </div>
                        <div>
                           <button className="text-[#ccff00] text-sm hover:underline font-bold" onClick={() => alert("Yakında eklenecek!")}>Profil Fotoğrafını Değiştir</button>
                           <p className="text-gray-500 text-xs mt-1">JPG, GIF veya PNG. Max 2MB.</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-bold text-gray-500 mb-2">AD</label>
                           <input 
                                type="text" 
                                value={settingsForm.first_name} 
                                onChange={(e) => setSettingsForm({...settingsForm, first_name: e.target.value})} 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ccff00] focus:outline-none" 
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 mb-2">SOYAD</label>
                           <input 
                                type="text" 
                                value={settingsForm.last_name} 
                                onChange={(e) => setSettingsForm({...settingsForm, last_name: e.target.value})} 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ccff00] focus:outline-none" 
                           />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-xs font-bold text-gray-500 mb-2">E-POSTA</label>
                           <div className="relative">
                              <Mail size={16} className="absolute left-4 top-3.5 text-gray-500" />
                              <input type="email" defaultValue={profile?.email || ''} disabled className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed focus:border-[#ccff00] focus:outline-none" />
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end pt-4">
                        <button 
                            onClick={handleSaveSettings}
                            disabled={isUpdatingProfile}
                            className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-[#ccff00] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {isUpdatingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                           {isUpdatingProfile ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                        </button>
                     </div>
                  </div>

                  <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 flex items-center justify-between shadow-lg">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400">
                           <Bell size={20} />
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-sm">E-posta Bildirimleri</h4>
                           <p className="text-gray-500 text-xs">Kampanyalar ve yeniliklerden haberdar ol.</p>
                        </div>
                     </div>
                     <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-800 cursor-pointer"></label>
                     </div>
                     <style>{`
                        .toggle-checkbox:checked { right: 0; border-color: #ccff00; }
                        .toggle-checkbox:checked + .toggle-label { background-color: #ccff00; }
                     `}</style>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- LANDING PAGE COMPONENTS ---

const Navbar = ({ onLogin }: { onLogin: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 h-20 shadow-lg shadow-black/50' : 'bg-transparent h-24 md:h-28'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full relative z-50">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
             <Logo className="h-8 md:h-10" />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-12 flex items-center space-x-1">
              {['Özellikler', 'Nasıl Çalışır', 'Fiyatlandırma'].map((item, i) => (
                <a key={item} href={`#${['features', 'how-it-works', 'pricing'][i]}`} className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={onLogin} className="text-white hover:text-[#ccff00] text-sm font-semibold transition-colors px-4">Giriş Yap</button>
            <Button onClick={onLogin} className="py-2 px-5 text-sm">Ücretsiz Dene</Button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-gray-800 overflow-hidden relative z-40"
          >
            <div className="px-6 pt-6 pb-10 space-y-4">
               <button onClick={onLogin} className="w-full text-center bg-[#ccff00] text-black font-bold py-4 rounded-2xl shadow-lg shadow-[#ccff00]/20">Platformu Aç</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AiInterfaceMockup = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto bg-[#090909] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5 group perspective-1000 transform transition-transform duration-700 hover:scale-[1.01]">
       {/* Fake Browser Header */}
       <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-[#0c0c0c]">
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-white/10"></div>
             <div className="w-3 h-3 rounded-full bg-white/10"></div>
             <div className="w-3 h-3 rounded-full bg-white/10"></div>
          </div>
          <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2 opacity-50">
             MOTION STUDIO v3.0
          </div>
       </div>

       <div className="flex flex-1 min-h-[500px] md:min-h-[600px] relative">
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

          {/* Left Sidebar: Tools (Visual Only) */}
          <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 gap-6 bg-[#0a0a0a]">
             <div className="p-3 rounded-xl bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]"><Wand2 size={24} /></div>
             <div className="p-3 rounded-xl text-gray-600"><FolderOpen size={24} /></div>
             <div className="p-3 rounded-xl text-gray-600"><Settings size={24} /></div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-[#050505] relative">
             <div className="flex-1 p-6 flex items-center justify-center relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90">
                <motion.div 
                   className="relative w-full max-w-4xl aspect-video bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                >
                   <video 
                      src="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-12066-large.mp4" 
                      className="w-full h-full object-cover opacity-80"
                      autoPlay muted loop
                   />
                   <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">Oluşturuluyor... 84%</div>
                   
                   {/* Scanning Effect */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-[#ccff00] shadow-[0_0_20px_#ccff00] animate-[scan_3s_ease-in-out_infinite]"></div>
                   <style>{`@keyframes scan { 0%,100% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
                </motion.div>
             </div>

             <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
                <div className="flex gap-4 items-end max-w-5xl mx-auto opacity-50 blur-[1px]">
                   <div className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-xl p-4 h-24"></div>
                   <div className="bg-[#ccff00] w-32 h-24 rounded-xl"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const BentoGridFeatures = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">SINIRSIZ <span className="text-[#ccff00]">YETENEK</span></h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Tek bir platformda video üretiminin tüm aşamaları. Karmaşık render süreçlerini unutun.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-500 shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
               <div className="p-8 md:p-12 h-full flex flex-col justify-between relative z-20 pointer-events-none">
                  <div>
                     <div className="w-12 h-12 bg-[#ccff00] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#ccff00]/20">
                        <Move className="text-black" size={24} />
                     </div>
                     <h3 className="text-3xl font-bold text-white mb-4">Herhangi bir hareketi kendi görüntünüzle yeniden yaratın</h3>
                     <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Herhangi bir videodan hareketi kopyalayın ve karakterinizi aynı harekete yerleştirin.
                     </p>
                  </div>
                  <div className="mt-8 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl h-64 md:h-80 pointer-events-auto">
                     <iframe 
                        src="https://player.vimeo.com/video/1165347552?background=1&autoplay=1&loop=1&badge=0&autopause=0" 
                        className="absolute top-0 left-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        title="Motion Transfer Demo"
                     />
                     <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-xs border border-white/10 text-white z-10">
                        Motion Transfer Active
                     </div>
                  </div>
               </div>
            </div>

            <div className="md:col-span-1 relative bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-500 shadow-xl">
               <div className="p-8 h-full flex flex-col">
                  <div className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center mb-4 text-[#ccff00]">
                     <Cpu size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">4K Upscaling</h3>
                  <p className="text-sm text-gray-400">Videolarınızı yapay zeka ile 4K çözünürlüğe yükseltin ve en yüksek kalitede indirin.</p>
                  <div className="mt-auto pt-6 flex items-center gap-2">
                     <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ccff00] w-[100%] animate-pulse"></div>
                     </div>
                     <span className="text-xs text-[#ccff00] font-mono">4K READY</span>
                  </div>
               </div>
            </div>

            <div className="md:col-span-1 relative bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-500 shadow-xl">
               <div className="p-8 h-full flex flex-col">
                  <div className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center mb-4 text-[#ccff00]">
                     <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Arsell Motion AI</h3>
                  <p className="text-sm text-gray-400">Dilediğiniz karaktere dönüşebileceksiniz. Yapay zeka ile sınırsız dönüşüm.</p>
                  <div className="mt-auto pt-6 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full bg-gray-700 border border-black overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-full h-full object-cover" alt="User 1" /></div>
                         <div className="w-8 h-8 rounded-full bg-gray-600 border border-black overflow-hidden"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" className="w-full h-full object-cover" alt="User 2" /></div>
                      </div>
                      <div className="text-xs font-bold text-white">Transforming...</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
   const steps = [
      { 
         icon: Video, 
         title: "1. Videonu Çek & Prompt Gir", 
         desc: "İstediğin şekilde videonu çek veya mevcut bir videoyu yükle. İstersen prompt girerek detayları belirle." 
      },
      { 
         icon: Users, 
         title: "2. Karakterini Seç", 
         desc: "Geniş kütüphanemizden istediğin karakteri seç veya kendi karakterini yarat." 
      },
      { 
         icon: Download, 
         title: "3. 4K Büyüsünü İzle", 
         desc: "Arsell Motion saniyeler içinde videonuzu işlesin ve 4K kalitesinde indirmeye hazır hale getirsin." 
      }
   ];

   return (
      <section id="how-it-works" className="py-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <span className="text-[#ccff00] text-xs font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Basit Akış</span>
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">NASIL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-green-400">ÇALIŞIR?</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent border-t border-dashed border-white/10 z-0"></div>

               {steps.map((step, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.2, duration: 0.6 }}
                     className="relative z-10 flex flex-col items-center text-center group"
                  >
                     <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-3xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#ccff00] group-hover:shadow-[0_0_40px_rgba(204,255,0,0.15)] transition-all duration-500 rotate-3 group-hover:rotate-0">
                           <step.icon size={40} className="text-gray-500 group-hover:text-[#ccff00] transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center border-4 border-black text-sm">
                           {i + 1}
                        </div>
                     </div>
                     
                     <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ccff00] transition-colors">{step.title}</h3>
                     <p className="text-gray-400 text-base leading-relaxed max-w-xs">{step.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
};

const PricingSection = ({ onPlanSelect }: { onPlanSelect: () => void }) => {
  const plans = [
    {
      name: "Starter",
      credits: 35,
      price: 350,
      description: "Başlangıç için ideal.",
      features: ["35 Kredi", "35 Saniye Video", "Standart Hız", "Temel Modeller"],
      highlight: false
    },
    {
      name: "Growth",
      credits: 75,
      price: 750,
      description: "İçerik üreticileri için.",
      features: ["75 Kredi", "75 Saniye Video", "Yüksek Hız", "Öncelikli Sıra"],
      highlight: true
    },
    {
      name: "Scale",
      credits: 125,
      price: 1250,
      description: "Profesyoneller için.",
      features: ["125 Kredi", "125 Saniye Video", "Ultra Hızlı Render", "VIP Destek"],
      highlight: false
    }
  ];

  return (
    <section className="py-32 relative border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-bold uppercase tracking-wider mb-6">
              <CreditCard size={14} /> Taahhüt Yok, Abonelik Yok
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white mb-6">KREDİ PAKETLERİ</h2>
           <p className="text-gray-400 text-xl max-w-2xl mx-auto">Sadece ihtiyacınız kadar alın. Kredilerinizin son kullanma tarihi yoktur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
           {plans.map((plan, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className={`relative p-8 rounded-3xl border flex flex-col h-full ${
                 plan.highlight 
                   ? 'bg-[#0f0f0f] border-[#ccff00] shadow-[0_0_50px_rgba(204,255,0,0.15)] scale-105 z-10' 
                   : 'bg-[#0a0a0a] border-white/10 hover:border-white/20'
               }`}
             >
                {plan.highlight && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                      En Çok Tercih Edilen
                   </div>
                )}

                <div className="mb-6">
                   <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">{plan.name}</h3>
                   <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl md:text-5xl font-black text-white">{plan.price} TL</span>
                      <span className="text-gray-500 text-lg font-normal">/tek seferlik</span>
                   </div>
                   <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                </div>
                
                <div className="w-full h-px bg-white/10 mb-6"></div>

                <ul className="space-y-4 mb-10 flex-1">
                   {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                         <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-[#ccff00] text-black' : 'bg-white/10 text-gray-400'}`}>
                            <Check size={12} strokeWidth={3} />
                         </div>
                         {feat}
                      </li>
                   ))}
                </ul>

                <button 
                  onClick={onPlanSelect}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.highlight 
                      ? 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'
                  }`}
                >
                   Satın Al
                </button>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
   const reviews = [
      { 
         name: "Mert Yılmaz", 
         role: "E-Ticaret & Dropshipping", 
         text: "Dropshipping reklamlarım için kullanıyorum. Kreatif süreçlerimde inanılmaz işe yarıyor, dönüşüm oranlarım ciddi şekilde arttı. Saniyeler içinde varyasyonlar üretebilmek harika.",
         icon: ShoppingBag
      },
      { 
         name: "Selin Demir", 
         role: "Sosyal Medya Fenomeni", 
         text: "İçerik üretim hızım arttı, bu sayede sosyal medyada çok kısa sürede yüksek takipçi sayılarına ulaştım. Trendleri yakalamak artık çok kolay.",
         icon: Instagram
      },
      { 
         name: "Can K.", 
         role: "Profesyonel Video Editörü", 
         text: "30 saniyeye kadar 4K kalitede video üretebiliyorum. Özellikle yüz hatları, saç ve göz detaylarındaki kusursuzluk beni çok etkiledi. Render kalitesi muazzam.",
         icon: MonitorPlay
      }
   ];

   return (
      <section className="py-24 bg-[#020202] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Üreticiler Ne Diyor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {reviews.map((r, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-[#ccff00]/20 transition-all group flex flex-col h-full shadow-lg">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                           <r.icon size={24} />
                        </div>
                        <div className="flex gap-1 text-[#ccff00]">
                           {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                     </div>
                     
                     <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-1 font-light">"{r.text}"</p>
                     
                     <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white text-xs border border-white/10">
                           {r.name[0]}
                        </div>
                        <div>
                           <div className="text-white text-sm font-bold">{r.name}</div>
                           <div className="text-gray-600 text-xs">{r.role}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

const FAQItem: React.FC<{question: string, answer: string}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <span className={`text-base md:text-lg font-medium transition-all duration-300 ${isOpen ? 'text-[#ccff00]' : 'text-white'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#ccff00]' : 'text-gray-500'}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
               <p className="text-gray-400 leading-relaxed text-sm font-light border-t border-white/5 pt-4">
                 {answer}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Satın aldığım kredilerin son kullanma tarihi var mı?",
      answer: "Hayır. Arsell Motion'da satın aldığınız kredi paketleri asla silinmez. İster bugün, ister 1 yıl sonra kullanabilirsiniz."
    },
    {
      question: "Ortalama bir video kaç kredi harcar?",
      answer: "Video süresi saniye bazında hesaplanır. Örneğin 5 saniyelik bir video oluşturmak 5 kredi harcar. Minimum işlem bedeli 5 kredidir."
    },
    {
      question: "Ticari haklar nelerdir?",
      answer: "Tüm paketlerle oluşturduğunuz içeriklerin ticari kullanım hakları %100 size aittir. Youtube'da para kazanabilir, reklamlarınızda kullanabilirsiniz."
    },
    {
      question: "İade politikanız nedir?",
      answer: "Dijital ürünlerde iade politikamız gereği, harcanmamış krediler için 14 gün içinde iade talep edebilirsiniz. Kullanılmış kredilerin iadesi yapılmamaktadır."
    }
  ];

  return (
    <section className="py-24 border-t border-white/5" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center text-white mb-12">Sıkça Sorulan Sorular</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [session, setSession] = useState(null);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('app');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setView('app');
      } else {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (view === 'auth') {
    return (
      <>
        <AuthScreen onLoginSuccess={() => setView('app')} />
        <AnimatePresence>
          {activePolicy && <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />}
        </AnimatePresence>
      </>
    );
  }

  if (view === 'app') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#ccff00] selection:text-black font-sans relative">
       <BackgroundEffects variant="default" />
       
       <Navbar onLogin={() => setView('auth')} />
       
       <main className="relative z-10">
         {/* Hero Section */}
         <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
                  <span className="py-2 px-4 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00] font-mono text-sm tracking-widest uppercase">
                     v3.0 Şimdi Yayında
                  </span>
               </motion.div>
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
               >
                  HAYAL GÜCÜNÜ <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ccff00] to-green-600">HAREKETE GEÇİR.</span>
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: 0.2 }}
                 className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
               >
                  Profesyonel video üretimi artık herkes için erişilebilir. 
                  Referans videonu yükle, karakterini seç ve yapay zekanın büyüsünü izle.
               </motion.p>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: 0.3 }}
                 className="flex flex-col md:flex-row items-center justify-center gap-4"
               >
                  <Button onClick={() => setView('auth')} className="w-full md:w-auto text-lg px-10 py-4">Hemen Başla</Button>
                  <Button variant="secondary" className="w-full md:w-auto text-lg px-10 py-4" onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>Keşfet</Button>
               </motion.div>
            </div>
         </header>

         <div className="px-6 pb-24 relative z-10">
            <AiInterfaceMockup onLogin={() => setView('auth')} />
         </div>

         <BentoGridFeatures />
         
         <HowItWorks />
         
         <Testimonials />
         
         <PricingSection onPlanSelect={() => setView('auth')} />
         
         <FAQSection />
       </main>

       <footer className="py-12 border-t border-white/5 bg-[#0a0a0a] relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-2">
                <Logo className="h-6" />
                <span className="text-gray-500 text-sm">© 2026 Arsell Motion AI</span>
             </div>
             <div className="flex gap-6 text-sm text-gray-500">
                <button onClick={() => setActivePolicy('creative-challenge')} className="hover:text-white transition-colors">Creative Challenge</button>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-white transition-colors">Privacy</button>
                <button onClick={() => setActivePolicy('terms')} className="hover:text-white transition-colors">Terms</button>
                <button onClick={() => setActivePolicy('cookie-notice')} className="hover:text-white transition-colors">Cookie Notice</button>
                <button onClick={() => setActivePolicy('cookie-settings')} className="hover:text-white transition-colors">Cookie Settings</button>
             </div>
          </div>
       </footer>

       <AnimatePresence>
         {activePolicy && <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />}
       </AnimatePresence>
    </div>
  );
};

export default App;