import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BarChart3, Settings, 
  Bell, TrendingUp, DollarSign, Edit2, Trash2, 
  Package, CheckCircle2, Clock, Wallet, ArrowUpRight, ArrowDownRight,
  User, Lock, Shield, Globe, Save
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

// --- VERİ SETLERİ ---
const satisVerisi = [
  { name: 'Oca', gelir: 4000, gider: 2400 }, { name: 'Şub', gelir: 3000, gider: 1398 },
  { name: 'Mar', gelir: 5500, gider: 3800 }, { name: 'Nis', gelir: 8000, gider: 3908 },
  { name: 'May', gelir: 6500, gider: 4800 }, { name: 'Haz', gelir: 9500, gider: 3800 },
];
const kategoriVerisi = [
  { name: 'Donanım', value: 400 }, { name: 'Operasyon', value: 300 },
  { name: 'Pazarlama', value: 300 }, { name: 'Yazılım', value: 200 },
];
const COLORS = ['#6366f1', '#f43f5e', '#ec4899', '#8b5cf6'];

// --- BİLEŞENLER ---
const NavItem = ({ icon: Icon, label, to, isDark }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 group ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 translate-x-2' : isDark ? 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}>
      <Icon size={22} className={active ? 'text-white' : 'group-hover:text-indigo-400'} />
      <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
};

// --- SAYFALAR ---
const DashboardHome = ({ isDark }) => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Yıllık Kazanç", val: "$84,200", trend: "+12.4%" },
        { title: "Yeni Kullanıcı", val: "1,840", trend: "+5.2%" },
        { title: "Satış Oranı", val: "14.2%", trend: "+2.8%" }
      ].map((card, i) => (
        <div key={i} className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-6 rounded-[2rem] border transition-all`}>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{card.title}</p>
          <h3 className={`text-3xl font-black mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.val}</h3>
          <div className="text-emerald-500 flex items-center gap-1 mt-2 font-bold text-sm"><TrendingUp size={14}/> {card.trend}</div>
        </div>
      ))}
    </div>
    <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 lg:p-10 rounded-[2.5rem] border transition-all`}>
      <h3 className={`text-2xl font-black mb-8 italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Performans Analitiği</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={satisVerisi}>
            <defs><linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{backgroundColor: isDark ? '#0b1120' : '#fff', border: 'none', borderRadius: '15px'}} />
            <Area type="monotone" dataKey="gelir" stroke="#6366f1" strokeWidth={4} fill="url(#colorGelir)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const CustomersPage = ({ liste, setListe, isDark }) => {
  const handleSil = (id) => { if(window.confirm("Müşteri silinsin mi?")) setListe(liste.filter(m => m.id !== id)); };
  const handleEkle = () => {
    const isim = prompt("Yeni Müşteri Adı:");
    if(isim) setListe([{ id: Date.now(), isim, email: isim.toLowerCase().replace(/\s+/g, '') + "@mail.com", durum: "Aktif", harcama: "$0" }, ...liste]);
  };
  const handleDuzenle = (id) => {
    const m = liste.find(x => x.id === id);
    const yeniIsim = prompt("İsmi düzenle:", m.isim);
    if(yeniIsim) setListe(liste.map(x => x.id === id ? { ...x, isim: yeniIsim, email: yeniIsim.toLowerCase().replace(/\s+/g, '') + "@mail.com" } : x));
  };

  return (
    <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} rounded-[2.5rem] border overflow-hidden animate-in fade-in duration-500`}>
      <div className={`p-8 border-b ${isDark ? 'border-slate-700/50 bg-slate-800/20' : 'border-slate-100 bg-slate-50/50'} flex justify-between items-center`}>
        <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Müşteri Veritabanı</h3>
        <button onClick={handleEkle} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer">+ Ekle</button>
      </div>
      <table className="w-full text-left">
        <thead className={`${isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-50 text-slate-500'} uppercase text-[10px] font-black tracking-widest`}>
          <tr><th className="px-8 py-5">Müşteri</th><th className="px-8 py-5">Durum</th><th className="px-8 py-5">Harcama</th><th className="px-8 py-5 text-right">İşlem</th></tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-slate-700/30' : 'divide-slate-100'}`}>
          {liste.map((m) => (
            <tr key={m.id} className={`${isDark ? 'hover:bg-slate-700/20' : 'hover:bg-slate-50'} transition-colors group`}>
              <td className="px-8 py-6 flex items-center gap-3 font-bold">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">{m.isim[0]}</div>
                <div className={isDark ? 'text-white' : 'text-slate-900'}><p>{m.isim}</p><p className="text-slate-500 text-xs font-normal">{m.email}</p></div>
              </td>
              <td className="px-8 py-6"><span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">{m.durum}</span></td>
              <td className={`px-8 py-6 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{m.harcama}</td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDuzenle(m.id)} className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"><Edit2 size={16}/></button>
                  <button onClick={() => handleSil(m.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FinancePage = ({ bakiye, setBakiye, isDark }) => {
  const handleParaCek = () => { if (window.confirm("Bakiye çekilsin mi?")) setBakiye(0); };
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <Wallet className="absolute -right-4 -bottom-4 size-32 opacity-10 group-hover:scale-110 transition-transform" />
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Kullanılabilir Bakiye</p>
          <h3 className="text-4xl font-black mt-2 tracking-tighter">${bakiye.toLocaleString()}</h3>
          <button onClick={handleParaCek} className="mt-6 bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">Para Çek</button>
        </div>
        {[ { t: "Aylık Gider", v: "$4,200", tr: "-2.1%", c: "text-rose-500" }, { t: "Net Kar", v: "$8,200", tr: "+14.2%", c: "text-emerald-500" } ].map((card, i) => (
          <div key={i} className={`${isDark ? 'bg-[#1e293b]/40 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{card.t}</p>
            <h3 className={`text-3xl font-black mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.v}</h3>
            <div className={`${card.c} flex items-center gap-1 mt-2 font-bold`}>{card.tr}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
            <h3 className={`text-xl font-black mb-8 italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Gelir / Gider Analizi</h3>
            <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={satisVerisi}><CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} /><XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} /><Tooltip contentStyle={{backgroundColor: isDark ? '#0b1120' : '#fff', border: 'none', borderRadius: '12px'}} /><Bar dataKey="gelir" fill="#6366f1" radius={[6, 6, 0, 0]} /><Bar dataKey="gider" fill="#f43f5e" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
            <h3 className={`text-xl font-black mb-8 italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Harcama Dağılımı</h3>
            <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={kategoriVerisi} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">{kategoriVerisi.map((e, i) => (<Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />))}</Pie><Tooltip contentStyle={{backgroundColor: isDark ? '#0b1120' : '#fff', border: 'none', borderRadius: '12px'}} /><Legend verticalAlign="bottom" height={36}/></PieChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ isDark, setIsDark }) => {
  const [userName, setUserName] = useState("Rubina Erin");
  const [is2FA, setIs2FA] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
        <h3 className={`text-2xl font-black mb-8 italic uppercase tracking-tighter flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}><User className="text-indigo-500" /> Profil Bilgileri</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">Kullanıcı Adı</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'} border rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all font-bold ${isDark ? 'text-white' : 'text-slate-900'}`} /></div>
            <div className="space-y-2"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">E-Posta Adresi</label><input type="email" value="rubinaerin@nexus.com" className={`w-full ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-100 border-slate-200'} border rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed`} disabled /></div>
          </div>
          <button onClick={() => alert("Profil güncellendi!")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20"><Save size={18} /> Kaydet</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
          <h3 className={`text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}><Shield /> Güvenlik</h3>
          <div className={`flex justify-between items-center p-4 ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-100'} rounded-2xl border`}>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>İki Faktörlü Doğrulama</span>
            <button onClick={() => setIs2FA(!is2FA)} className={`w-12 h-6 rounded-full relative transition-colors ${is2FA ? 'bg-emerald-500' : 'bg-slate-300'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FA ? 'right-1' : 'left-1'}`}></div></button>
          </div>
        </div>
        <div className={`${isDark ? 'bg-[#1e293b]/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-[2.5rem] border transition-all`}>
          <h3 className={`text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}><Globe /> Tercihler</h3>
          <div className={`flex justify-between items-center p-4 ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-100'} rounded-2xl border`}>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Karanlık Mod</span>
            <button onClick={() => setIsDark(!isDark)} className={`w-12 h-6 rounded-full relative transition-colors ${isDark ? 'bg-indigo-500' : 'bg-slate-300'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDark ? 'right-1' : 'left-1'}`}></div></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ANA UYGULAMA ---
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [bakiye, setBakiye] = useState(142350);
  const [liste, setListe] = useState([
    { id: 1, isim: "Ahmet Yılmaz", email: "ahmet@mail.com", durum: "Aktif", harcama: "$4,200" },
    { id: 2, isim: "Ayşe Demir", email: "ayse@mail.com", durum: "Beklemede", harcama: "$1,850" },
    { id: 3, isim: "Mehmet Kaya", email: "mehmet@mail.com", durum: "Aktif", harcama: "$12,400" },
  ]);

  const handleBildirim = () => alert("Sistemde 3 yeni bildiriminiz var! 🔔");

  return (
    <Router>
      <div className={`min-h-screen flex font-sans transition-colors duration-500 ${isDark ? 'bg-[#0b1120]' : 'bg-slate-50'}`}>
        <aside className={`w-80 border-r ${isDark ? 'border-slate-800/40 bg-[#0b1120]' : 'border-slate-200 bg-white'} p-8 flex flex-col hidden lg:flex sticky top-0 h-screen transition-all`}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-indigo-500/20">N</div>
            <h1 className={`text-2xl font-black tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}>Nexus<span className="text-indigo-500">.</span></h1>
          </div>
          <nav className="space-y-2 flex-1"><NavItem icon={LayoutDashboard} label="Genel Bakış" to="/" isDark={isDark} /><NavItem icon={Users} label="Müşteri Paneli" to="/musteriler" isDark={isDark} /><NavItem icon={BarChart3} label="Finansal Analiz" to="/finans" isDark={isDark} /><NavItem icon={Settings} label="Ayarlar" to="/ayarlar" isDark={isDark} /></nav>
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800/40 border-slate-700/30' : 'bg-slate-100 border-slate-200'}`}>
            <p className={`text-sm font-bold uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Rubina Erin</p>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Pro Developer</p>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <header className="flex justify-between items-center mb-12">
            <div className={isDark ? 'text-white' : 'text-slate-900'}><h2 className="text-4xl font-black tracking-tight italic uppercase tracking-tighter">Nexus OS</h2><p className="text-slate-500 text-xs font-bold uppercase mt-1">Durum: <span className="text-emerald-500">Çevrimiçi</span></p></div>
            <button onClick={handleBildirim} className={`p-3.5 rounded-2xl border transition-all shadow-sm cursor-pointer ${isDark ? 'bg-slate-800/30 border-slate-700/50 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}><Bell size={20} /></button>
          </header>
          <Routes>
            <Route path="/" element={<DashboardHome isDark={isDark} />} />
            <Route path="/musteriler" element={<CustomersPage liste={liste} setListe={setListe} isDark={isDark} />} />
            <Route path="/finans" element={<FinancePage bakiye={bakiye} setBakiye={setBakiye} isDark={isDark} />} />
            <Route path="/ayarlar" element={<SettingsPage isDark={isDark} setIsDark={setIsDark} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}