
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
  Mic,
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
  const [stats, setStats] = useState({ partners: 0, sla: '0%', dispatch: '0h' });

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
      alert("Invalid Partner ID. Must start with 'ZM-'");
    } else {
      alert("Access Granted. Redirecting to Enterprise Dashboard...");
    }
  };

  const benefits = [
    {
      title: "Dedicated Interface",
      description: "A high-performance environment engineered for zero latency. Optimized for bulk procurement and real-time inventory synchronization.",
      icon: Layers,
      accent: "text-blue-600",
      bg: "bg-blue-50",
      featureList: ["Bulk Reordering", "Inventory Sync", "Custom Catalog"]
    },
    {
      title: "ID-Based Verification",
      description: "Secure, credential-gate access protecting exclusive B2B pricing, trade secrets, and proprietary material specifications.",
      icon: ShieldCheck,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      featureList: ["AES-256 Security", "MFA Enabled", "Exclusive Pricing"]
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive data visualization for supply chain transparency, quality benchmarking, and SLA compliance tracking.",
      icon: BarChart3,
      accent: "text-[#E23744]",
      bg: "bg-red-50",
      featureList: ["Predictive Demand", "Quality Scoring", "SLA Dashboards"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Kumar Garments (Zomato Partner)",
      text: "The specialized access to Fabrima's premium textiles has completely transformed our production quality. The dedicated ecosystem provides priority treatment usually reserved for large-scale corporations.",
      image: "https://i.pravatar.cc/150?u=rajesh",
      impact: "35% Increase in Production Speed"
    },
    {
      name: "Anita Desai",
      company: "Modern Bags & Tents",
      text: "Having a secure, professional environment with ID-based entry gives us immense confidence. The logistics support from the Singhara Chowk team is consistently world-class.",
      image: "https://i.pravatar.cc/150?u=anita",
      impact: "99.9% Material Quality Pass Rate"
    },
    {
      name: "Vikram Singh",
      company: "Industrial Gear Co.",
      text: "Z-Wing has been a game-changer for our technical textile needs. The real-time telemetry means we never have to guess when our raw materials will arrive at the factory floor.",
      image: "https://i.pravatar.cc/150?u=vikram",
      impact: "Zero Supply Chain Bottlenecks"
    }
  ];

  const scrollToLogin = () => {
    const loginSection = document.getElementById('partner-login-panel');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* --- Premium Hero Section - Mobile Scaled Fonts --- */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-[0.05] pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#E23744] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 left-0 w-72 h-72 bg-blue-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E23744]"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em]">Exclusive Partner Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-6 md:mb-8 leading-[1.05]">
              Enterprise Sourcing <br />
              <span className="text-[#E23744]">Simplified.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-10 md:mb-12 font-light">
              We’ve engineered a high-performance specialized platform tailored for Zomato’s elite manufacturing network. Experience industrial procurement with unprecedented precision and scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#E23744] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 group text-base md:text-lg">
                Join Network <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToLogin}
                className="bg-white text-slate-900 border border-slate-200 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3 text-base md:text-lg"
              >
                Partner Login <Lock size={18} className="text-slate-400" />
              </button>
            </div>
            
            <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-8 text-slate-400 justify-center lg:justify-start">
               <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> ISO 9001 Certified</div>
               <div className="flex items-center gap-2 text-xs md:text-sm font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> 24/7 Priority Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Specialized Benefits Section - Mobile Grid --- */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Built for Scale</h2>
            <p className="text-slate-500 text-base md:text-lg">Every feature is designed to reduce operational friction and maximize manufacturing throughput.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${benefit.bg} ${benefit.accent} flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <benefit.icon size={28} className="md:size-32" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6">{benefit.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  {benefit.description}
                </p>
                <div className="space-y-2 md:space-y-3">
                  {benefit.featureList.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[12px] md:text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      <Zap size={10} className="md:size-12 text-[#E23744]" fill="currentColor" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 h-1 md:h-1.5 w-0 bg-[#E23744] group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Detailed Operational Transparency: Z-Wing Focus - Enhanced Visuals --- */}
      <section className="py-20 md:py-32 px-4 bg-[#0a0f1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-5 md:opacity-10 pointer-events-none">
          <Globe size={600} className="text-white -mr-48 md:-mr-96 -mt-32 md:size-[800px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E23744] px-4 py-1.5 rounded-full mb-6">
                <Building2 size={16} />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Singhara Chowk HQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
                The Z-Wing <br /> Facility Operations
              </h2>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 md:mb-12 font-light">
                Our 4,000 sq. ft. precision facility, the **Z-Wing**, operates 24/7 to guarantee Zomato Partners receive verified material within ultra-tight fulfillment windows.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 text-left">
                <div className="space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                    <SearchCheck size={20} className="md:size-24" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">Global Standards</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Every roll is subjected to our proprietary 4-point inspection system. Meeting ISO 9001:2015 protocols.</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                    <Radio size={20} className="md:size-24" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">Real-time Telemetry</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Active GPS and environmental sensor integration. Track humidity levels directly from your partner console.</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-400 border border-white/10">
                    <Cpu size={20} className="md:size-24" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">Precision Picking</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Automated WMS ensures 99.9% accuracy, virtually eliminating production bottlenecks.</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                    <Users size={20} className="md:size-24" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">Dedicated Wing</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Strategic handlers assigned to each partner, ensuring specific requirements are met every time.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy size={150} className="text-white md:size-[200px]" />
                </div>
                
                <div className="relative z-10 space-y-10 md:space-y-12">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 md:pb-8">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-white font-black text-lg md:text-xl tracking-tight uppercase">Z-Wing Live</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-emerald-500/20">Operational</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:bg-white/10 transition-colors text-center">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1 md:mb-2">{stats.partners}+</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Partners</p>
                    </div>
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:bg-white/10 transition-colors text-center">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1 md:mb-2">{stats.sla}</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Compliance</p>
                    </div>
                    <div className="bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:bg-white/10 transition-colors text-center col-span-2 sm:col-span-1">
                      <p className="text-white text-2xl md:text-4xl font-black mb-1 md:mb-2">{stats.dispatch}</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Express</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] md:text-xs text-slate-400 mb-1 font-black uppercase tracking-widest">
                      <span>Logistics Utilization</span>
                      <span>84% Active Load</span>
                    </div>
                    <div className="w-full h-2.5 md:h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="w-[84%] h-full bg-gradient-to-r from-red-600 to-[#E23744] shadow-[0_0_15px_rgba(226,55,68,0.4)]"></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 md:pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <div className="flex -space-x-2 md:-space-x-3">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-900 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E23744] border-2 border-slate-900 flex items-center justify-center text-[8px] md:text-[10px] font-black">+{stats.partners - 5}</div>
                     </div>
                     <span className="text-[10px] md:text-xs text-slate-400 font-bold">Trusted by Industry Leaders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Partner Success Stories - Mobile Card Styling --- */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Partner Success</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light">Join the manufacturers who have redefined their efficiency standards through the platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] relative group border border-slate-100 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-500">
                <Quote size={40} className="absolute top-6 right-8 md:top-10 md:right-10 opacity-5 text-slate-900 md:size-60" />
                <div className="mb-6 md:mb-8 p-3 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl w-fit font-black text-[10px] md:text-xs uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                   <Star size={12} className="md:size-14" fill="currentColor" /> {t.impact}
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed text-slate-700 mb-8 md:mb-10">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-5 border-t border-slate-200 pt-8 md:pt-10 mt-auto">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#E23744]/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base md:text-lg">{t.name}</h4>
                    <p className="text-[10px] md:text-sm text-[#E23744] font-bold uppercase tracking-widest">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Partner Access Panel - Mobile Optimized Form --- */}
      <section id="partner-login-panel" className="py-20 md:py-32 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-stretch">
            <div className="w-full lg:w-[500px]">
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-16 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-[#E23744]"><Lock size={80} className="md:size-[120px]" /></div>
                <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck size={24} className="md:size-28" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">Secure Access</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enterprise Console v2.5</p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 md:space-y-8 relative z-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 md:mb-3 group-focus-within:text-[#E23744] transition-colors">Identity Identifier</label>
                    <input 
                      type="text" 
                      placeholder="ZM-XXXX-ID"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 focus:outline-none focus:border-[#E23744] focus:ring-4 focus:ring-red-500/5 transition-all disabled:opacity-50 text-base md:text-lg font-medium"
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 md:mb-3 group-focus-within:text-[#E23744] transition-colors">Credential Passphrase</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl py-4 md:py-5 px-5 md:px-6 focus:outline-none focus:border-[#E23744] focus:ring-4 focus:ring-red-500/5 transition-all disabled:opacity-50 text-base md:text-lg font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isVerifying}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember-enterprise" className="rounded border-slate-200 text-[#E23744] focus:ring-[#E23744]" />
                        <label htmlFor="remember-enterprise" className="text-[10px] md:text-xs font-bold text-slate-500">Persistent Session</label>
                     </div>
                     <button type="button" className="text-[10px] md:text-xs font-bold text-[#E23744] hover:underline">Reset Gateway</button>
                  </div>
                  <button 
                    disabled={isVerifying}
                    className="w-full bg-slate-900 text-white font-black py-5 md:py-6 rounded-xl md:rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 md:gap-3 group disabled:bg-slate-400 text-lg md:text-xl"
                  >
                    {isVerifying ? 'Establishing Link...' : 'Authorize Entry'}
                    {!isVerifying && <Zap size={18} className="md:size-20 text-[#E23744]" fill="currentColor" />}
                  </button>
                  <div className="pt-2 flex flex-col items-center">
                    <p className="text-[8px] md:text-[10px] text-center text-slate-400 uppercase tracking-widest font-black flex items-center gap-2">
                       <History size={10} /> Secure Channel Active
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tight">
                  Seamless <br /> Operational Clarity
                </h2>
                <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-10 md:mb-12 font-light">
                  Our Singhara Chowk facility has been upgraded with a specialized unit focusing exclusively on high-frequency, high-precision fulfillment for the Zomato manufacturing base. We provide end-to-end tracking from sourcing to factory delivery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
                  <div className="flex items-start gap-4 md:gap-5 p-6 md:p-8 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy size={24} className="md:size-28" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 text-sm md:text-base">Elite Sourcing</h4>
                      <p className="text-[12px] md:text-sm text-slate-500 font-medium leading-relaxed">ISO-certified quality inspection on every single material batch.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 md:gap-5 p-6 md:p-8 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                      <PackageCheck size={24} className="md:size-28" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 text-sm md:text-base">Precision Fulfillment</h4>
                      <p className="text-[12px] md:text-sm text-slate-500 font-medium leading-relaxed">24h turnaround for high-priority inventory requests.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Global Call To Action - High Impact Mobile Layout --- */}
      <section className="py-20 md:py-32 px-4 mb-10 md:mb-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#E23744] to-red-900 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(226,55,68,0.4)]">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-10 leading-tight tracking-tighter">
              Power Your <br /> Production
            </h2>
            <p className="text-red-100 text-base md:text-2xl max-w-3xl mb-12 md:mb-16 font-light leading-relaxed">
              Join the verified Zomato Partner network and unlock a supply chain built for industrial excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              <button className="bg-white text-[#E23744] px-10 py-5 md:px-14 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl w-full sm:w-auto">
                Register as Partner
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 md:px-14 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-white/10 transition-all w-full sm:w-auto">
                Speak to Account Team
              </button>
            </div>

            <div className="mt-12 md:mt-20 pt-12 md:pt-20 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 w-full max-w-5xl">
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">{stats.partners}+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-red-200">Active Partners</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">{stats.sla}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-red-200">Delivery Accuracy</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tighter">{stats.dispatch}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-red-200">Avg Lead Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZomatoPartner;
