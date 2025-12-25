
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Lock, 
  ArrowRight, 
  Zap, 
  Quote, 
  Star, 
  Building2, 
  Layers, 
  Trophy,
  Activity,
  Globe,
  Radio,
  SearchCheck,
  Server,
  PackageCheck,
  Cpu,
  Users,
  CheckCircle2,
  History
} from 'lucide-react';
import { db } from '../services/db';

const ZomatoPartner: React.FC = () => {
  const [partnerId, setPartnerId] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [stats, setStats] = useState({ partners: 0, sla: '0%', dispatch: '0h', activeLoad: '0%' });

  useEffect(() => {
    db.getPartnerStats().then(setStats);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId) return;
    setIsVerifying(true);
    const isValid = await db.verifyPartnerID(partnerId);
    setIsVerifying(false);
    if (!isValid) {
      alert("Verification Failed: Invalid Partner ID. Must start with 'ZM-' (e.g. ZM-101)");
    } else {
      alert("Access Granted. Secure tunnel established to Z-Wing dashboard.");
    }
  };

  const benefits = [
    {
      title: "Dedicated Interface",
      description: "A high-performance environment engineered for zero latency. Optimized for bulk procurement and real-time inventory sync.",
      icon: Layers,
      accent: "text-blue-600",
      bg: "bg-blue-50",
      featureList: ["Bulk Reordering", "Inventory Sync", "Custom Catalog"]
    },
    {
      title: "Secure Verification",
      description: "Secure, credential-gate access protecting exclusive B2B pricing, trade secrets, and proprietary material specs.",
      icon: ShieldCheck,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      featureList: ["AES-256 Security", "MFA Enabled", "Exclusive Pricing"]
    },
    {
      title: "Advanced Analytics",
      description: "Data visualization for supply chain transparency, quality benchmarking, and SLA compliance tracking.",
      icon: BarChart3,
      accent: "text-[#990000]",
      bg: "bg-red-50",
      featureList: ["Predictive Demand", "Quality Scoring", "SLA Dashboards"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Kumar Garments",
      text: "Priority treatment and the dedicated Z-Wing ecosystem has completely transformed our production velocity. Their textile precision is unmatched.",
      impact: "35% Faster Sourcing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Anita Desai",
      company: "Modern Bags & Tents",
      text: "The real-time telemetry means we never guess when materials arrive. Logistics support from the Singhara Chowk team is truly world-class.",
      impact: "99.9% Quality Pass",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Vikram Singh",
      company: "Industrial Gear Co.",
      text: "Having a secure, professional environment with ID-based entry gives us immense confidence for large-scale enterprise contracts.",
      impact: "Zero Bottlenecks",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const scrollToLogin = () => {
    document.getElementById('partner-login-panel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Hero Section - Fully Responsive */}
      <section className="relative pt-12 md:pt-24 pb-20 md:pb-32 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-[0.05] pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#990000] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 left-0 w-72 h-72 bg-blue-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#990000]"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em]">Verified Partner Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-6 md:mb-8 leading-[1.05]">
              Strategic Sourcing <br className="hidden md:block" />
              <span className="text-[#990000]">Redefined.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-10 md:mb-12 font-light mx-auto lg:mx-0">
              A precision-engineered platform for Zomato’s elite manufacturing network. Experience industrial procurement with unprecedented scale and security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToLogin}
                className="bg-[#990000] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-3 group text-base md:text-lg"
              >
                Access Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm text-base md:text-lg">
                Request Onboarding
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-8 text-slate-400 justify-center lg:justify-start">
               <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> ISO 9001 Certified</div>
               <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> 24/7 Ops Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - Responsive Columns */}
      <section className="py-16 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Enterprise Capabilities</h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">Specifically designed to reduce friction and maximize manufacturing throughput for verified partners.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden h-full flex flex-col">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${benefit.bg} ${benefit.accent} flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <benefit.icon size={28} className="md:size-32" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 flex-1">
                  {benefit.description}
                </p>
                <div className="space-y-2 md:space-y-3 pt-6 border-t border-slate-50">
                  {benefit.featureList.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      <Zap size={10} className="md:size-12 text-[#990000]" fill="currentColor" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 h-1 md:h-1.5 w-0 bg-[#990000] group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Z-Wing Operational Visibility - Advanced UI */}
      <section className="py-20 md:py-32 px-4 bg-[#0a0f1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-5 md:opacity-10 pointer-events-none">
          <Globe size={600} className="text-white -mr-48 md:-mr-96 -mt-32" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#990000] px-4 py-1.5 rounded-full mb-6">
                <Building2 size={16} />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Global Ops: Singhara Chowk</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
                The Z-Wing <br /> Mission Control
              </h2>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 md:mb-12 font-light">
                Our 4,000 sq. ft. precision facility operates 24/7 to guarantee verified material delivery within ultra-tight windows.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                    <SearchCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">ISO Integrity</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Automated 4-point inspection system ensuring zero-defect output.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                    <Radio size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Live Telemetry</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Real-time GPS and environmental sensor tracking for all cargo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Status Card - Mobile Responsive */}
            <div className="w-full lg:w-1/2">
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 space-y-8 md:space-y-12">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 md:pb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-black text-lg md:text-xl tracking-tight uppercase">Z-Wing Live Status</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] md:text-xs font-bold border border-emerald-500/20">Operational</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl text-center border border-white/5">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1">{stats.partners}+</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Partners</p>
                    </div>
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl text-center border border-white/5">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1">{stats.sla}</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">SLA Compliance</p>
                    </div>
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl text-center border border-white/5 col-span-2 sm:col-span-1">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1">{stats.dispatch}</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Express SLA</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] md:text-xs text-slate-400 font-black uppercase">
                      <span>Logistics Utilization</span>
                      <span>{stats.activeLoad} Load</span>
                    </div>
                    <div className="w-full h-2.5 md:h-3 bg-white/5 rounded-full overflow-hidden">
                      <div style={{ width: stats.activeLoad }} className="h-full bg-gradient-to-r from-red-600 to-[#990000] shadow-[0_0_15px_rgba(153,0,0,0.4)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Proper Image Layout */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Partner Success</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light">Join the manufacturers who have redefined their efficiency standards through the platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] relative group border border-slate-100 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-500">
                <Quote size={40} className="absolute top-6 right-8 md:top-10 md:right-10 opacity-5 text-slate-900 md:size-60" />
                <div className="mb-6 md:mb-8 p-3 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl w-fit font-black text-[10px] md:text-xs uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                   <Star size={12} fill="currentColor" /> {t.impact}
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed text-slate-700 mb-8 md:mb-10">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-5 border-t border-slate-200 pt-8 md:pt-10 mt-auto">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#990000]/20 shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base md:text-lg">{t.name}</h4>
                    <p className="text-[10px] md:text-sm text-[#990000] font-bold uppercase tracking-widest">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Panel - Mobile Optimized Form */}
      <section id="partner-login-panel" className="py-20 md:py-32 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-stretch">
            <div className="w-full lg:w-[500px]">
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-16 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-[#990000]"><Lock size={80} className="md:size-[120px]" /></div>
                <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck size={24} className="md:size-28" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">Partner Auth</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enterprise Console v2.5</p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 md:space-y-8 relative z-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 md:mb-3">Partner Identity ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g., ZM-XXXX-ID"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 focus:outline-none focus:border-[#990000] focus:ring-4 focus:ring-red-500/5 transition-all text-base md:text-lg font-medium"
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 md:mb-3">Access Security Key</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 focus:outline-none focus:border-[#990000] focus:ring-4 focus:ring-red-500/5 transition-all text-base md:text-lg font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <button 
                    disabled={isVerifying}
                    className="w-full bg-slate-900 text-white font-black py-5 md:py-6 rounded-xl md:rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 md:gap-3 group disabled:bg-slate-400 text-lg md:text-xl"
                  >
                    {isVerifying ? 'Verifying...' : 'Authorize Entry'}
                    {!isVerifying && <Zap size={18} className="text-[#990000]" fill="currentColor" />}
                  </button>
                  <div className="pt-2 flex flex-col items-center">
                    <p className="text-[8px] md:text-[10px] text-center text-slate-400 uppercase tracking-widest font-black flex items-center gap-2">
                       <History size={10} /> Encryption: Active (AES-256)
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tight">
                  Seamless <br /> Operational Integrity
                </h2>
                <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-10 md:mb-12 font-light">
                  Upgrade your manufacturing chain with our high-frequency, high-precision fulfillment unit. End-to-end tracking from raw material sourcing to factory floor delivery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
                  <div className="flex items-start gap-4 md:gap-5 p-6 md:p-8 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy size={24} className="md:size-28" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 text-sm md:text-base">Elite Sourcing</h4>
                      <p className="text-[12px] md:text-sm text-slate-500 leading-relaxed">ISO-certified quality inspection on every single batch.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 md:gap-5 p-6 md:p-8 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                      <PackageCheck size={24} className="md:size-28" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 text-sm md:text-base">Rapid Fulfillment</h4>
                      <p className="text-[12px] md:text-sm text-slate-500 leading-relaxed">24h turnaround for high-priority inventory requests.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Call To Action */}
      <section className="py-20 md:py-32 px-4 mb-10 md:mb-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#990000] to-red-950 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-10 leading-tight tracking-tighter">
              Power Your <br /> Factory Floor
            </h2>
            <p className="text-red-100 text-base md:text-2xl max-w-3xl mb-12 md:mb-16 font-light leading-relaxed">
              Join 180+ verified manufacturers who have optimized their supply chains with Fabrima’s specialized ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              <button className="bg-white text-[#990000] px-10 py-5 md:px-14 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-xl w-full sm:w-auto">
                Register as Partner
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 md:px-14 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-white/10 transition-all w-full sm:w-auto">
                Speak to Account Wing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZomatoPartner;
