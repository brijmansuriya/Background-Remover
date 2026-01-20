
import React from 'react';
import Navbar from './components/Navbar';
import UploadTool from './components/UploadTool';
import ComparisonSlider from './components/ComparisonSlider';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase animate-in fade-in slide-in-from-top-4 duration-1000">
            ✨ Advanced AI Processing Enabled
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
            Remove Backgrounds <span className="text-blue-600">Instantly</span> with AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed animate-in fade-in duration-1000 delay-300">
            Upload an image and get a clean, transparent background in seconds. Professional precision for your products and portraits.
          </p>
          
          <div className="animate-in fade-in zoom-in duration-1000 delay-500">
            <UploadTool />
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { label: "100% Automatic", icon: "🤖" },
              { label: "HD Quality", icon: "💎" },
              { label: "No Skills Required", icon: "🎨" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center space-x-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="font-bold text-slate-800 tracking-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Simple as 1, 2, 3</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Skip the hours in Photoshop. Our intelligent neural network handles the complexity for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload your image", desc: "Select a photo from your device or take a fresh one using your camera." },
              { step: "02", title: "Wait for the magic", desc: "Our AI identifies the subject and isolates it from the background in real-time." },
              { step: "03", title: "Download transparent", desc: "Save your result as a high-quality PNG with true transparency." }
            ].map((item, i) => (
              <div key={i} className="group relative p-10 bg-white rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="text-7xl font-black text-blue-50/50 absolute -top-2 -right-2 transition-transform group-hover:scale-110">{item.step}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Preview */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <ComparisonSlider 
                before="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" 
                after="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop&sepia=1" 
              />
              <p className="mt-4 text-center text-slate-400 text-sm italic">Drag the slider to see the precision</p>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">Pixel-perfect <span className="text-blue-600">precision</span> for every pixel</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Whether it's the fine strands of a portrait or the complex edges of a product, ClearCut AI ensures your cutouts look professional every time.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "Intelligent edge smoothing",
                  "Preserves hair and fur details",
                  "Optimized for e-commerce products",
                  "Bulk processing ready"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-800 font-bold text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Try Free Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Professionals</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">Everything you need to scale your content production.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: "✨", title: "Instant Removal", desc: "No waiting around. Most images process in under 3 seconds." },
              { icon: "🔍", title: "Edge Detection", desc: "Our advanced models handle hair, shadows, and glass perfectly." },
              { icon: "📦", title: "API Access", desc: "Integrate our background removal directly into your own app or site." },
              { icon: "🎨", title: "E-commerce Ready", desc: "Export images that meet major marketplace requirements instantly." },
              { icon: "⚡", title: "Batch Editing", desc: "Upload folders of images and let our AI handle the rest in the background." },
              { icon: "💻", title: "Privacy First", desc: "Your images are processed securely and never shared with third parties." }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">Perfect for every industry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Products", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", tag: "E-commerce" },
              { title: "Portraits", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", tag: "Profiles" },
              { title: "Social Media", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop", tag: "Marketing" },
              { title: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop", tag: "Creatives" }
            ].map((item, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl transition-all hover:scale-[1.02]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-left">
                  <span className="text-xs uppercase tracking-[0.2em] font-black bg-blue-600 px-3 py-1 rounded-md mb-3 inline-block text-white shadow-lg">{item.tag}</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Choose your plan</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">Whether you're an individual or a large enterprise, we have a plan that scales with your needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "Free", sub: "Forever", features: ["5 images / month", "Standard resolution", "Transparent PNG", "Community support"], button: "Start for Free", popular: false },
              { name: "Pro", price: "$19", sub: "per month", features: ["100 images / month", "HD Resolution", "Priority processing", "Batch upload tools", "No watermarks"], button: "Choose Pro", popular: true },
              { name: "Scale", price: "$49", sub: "per month", features: ["Unlimited images", "API Access", "4K High-Res", "Dedicated account mgr", "24/7 Priority support"], button: "Talk to Sales", popular: false }
            ].map((plan, i) => (
              <div key={i} className={`relative p-10 rounded-[2.5rem] bg-white border-2 transition-all duration-500 hover:shadow-2xl ${plan.popular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-white shadow-sm'}`}>
                {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-200">Recommended</div>}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-8">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                  <span className="text-slate-400 font-medium">{plan.sub}</span>
                </div>
                <ul className="text-left space-y-5 mb-10">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-center text-slate-600 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10 leading-tight">Join the future of image processing.</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">Trusted by over 50,000 creators, marketers, and developers worldwide. Start your free trial today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/40 transform hover:-translate-y-1">
                Upload Image Now
              </button>
              <button className="bg-white/10 text-white backdrop-blur-xl px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all border border-white/10">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-extrabold text-slate-900 tracking-tighter">ClearCut AI</span>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm">The world's most accurate AI background removal tool. Built with love by creators, for creators.</p>
              <div className="flex space-x-5">
                {['T', 'I', 'L', 'Y'].map((s, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                    <div className="w-6 h-6 bg-current rounded-md opacity-20"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:ml-auto">
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Background Remover</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API for Developers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Bulk Upload</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Tools</h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Chrome Extension</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Photoshop Plugin</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Web SDK</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Affiliate Program</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-sm font-medium">© 2024 ClearCut AI. Handcrafted with precision.</p>
            <div className="flex items-center space-x-8 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Trust Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
