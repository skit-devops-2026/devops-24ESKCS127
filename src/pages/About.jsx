import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Heart,
  Users,
  Award,
  Globe,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Headphones,
  RefreshCw,
  Zap
} from 'lucide-react';

export const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users, desc: 'Across India & growing daily' },
    { label: 'Curated Products', value: '500+', icon: Sparkles, desc: 'Carefully vetted for top quality' },
    { label: 'On-Time Delivery', value: '99.8%', icon: Truck, desc: 'Fast, secure doorstep shipping' },
    { label: 'Customer Rating', value: '4.9 / 5', icon: Award, desc: 'Over 25,000+ five-star reviews' },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Uncompromising Quality',
      desc: 'Every item in our catalogue is rigorously inspected for durability, craftsmanship, and authentic materials before it reaches you.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      icon: Heart,
      title: 'Customer-Centric Care',
      desc: 'We place your happiness first with hassle-free 30-day returns, round-the-clock support, and transparent ordering.',
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      icon: Globe,
      title: 'Ethical & Mindful Sourcing',
      desc: 'We collaborate directly with verified artisans and eco-conscious manufacturers who uphold fair labor standards.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: Zap,
      title: 'Honest & Direct Pricing',
      desc: 'By eliminating unnecessary middlemen, we provide luxury-grade lifestyle goods at direct-to-consumer prices.',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'The Inception',
      desc: 'SimpleShop was founded with a tiny team and 20 handpicked daily essentials, determined to make premium shopping simple.',
    },
    {
      year: '2022',
      title: 'Rapid Nationwide Expansion',
      desc: 'Crossed 10,000 happy customers and established express logistics hubs across major metro regions.',
    },
    {
      year: '2024',
      title: 'Expanded Catalog & Smart Sourcing',
      desc: 'Grew to 8 diverse categories covering fashion, electronics, watches, home essentials, and lifestyle accessories.',
    },
    {
      year: 'Today',
      title: 'Trusted by 50K+ Shoppers',
      desc: 'Continuing our commitment to curate only the best goods with seamless shopping and unmatched support.',
    },
  ];

  const team = [
    {
      name: 'Aarav Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Passionate about simplifying modern lifestyle commerce with technology and human warmth.',
    },
    {
      name: 'Priya Patel',
      role: 'Head of Product Design & Curation',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Curates timeless design pieces with a focus on sustainable materials and ergonomic comfort.',
    },
    {
      name: 'Rohan Mehta',
      role: 'Head of Logistics & Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Ensures swift deliveries, zero-friction returns, and frictionless supply chain execution.',
    },
    {
      name: 'Ananya Iyer',
      role: 'Head of Customer Experience',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Dedicated to delighting customers and making sure every query is resolved in record time.',
    },
  ];

  const faqs = [
    {
      q: 'What is SimpleShop’s quality guarantee?',
      a: 'All our products undergo a strict 3-tier quality control protocol. If you receive an item that does not match the highest standards, we replace it or issue a full refund immediately.',
    },
    {
      q: 'How fast is shipping and delivery?',
      a: 'Orders are dispatched within 24 hours. Standard delivery takes 2–4 business days across India, with real-time tracking provided right to your phone.',
    },
    {
      q: 'What is your return policy?',
      a: 'We offer an easy 30-day return policy on all eligible products. No questions asked and no hidden restocking charges.',
    },
    {
      q: 'Are the products authentic and original?',
      a: 'Yes, 100%. We source exclusively from authorized manufacturers and verified brands with authentic warranties.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-700 to-slate-900 text-white p-8 sm:p-14 shadow-xl">
        {/* Background glow circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-indigo-200 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Our Story & Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Curating Quality Goods for Everyday Living.
          </h1>

          <p className="text-indigo-100 text-base sm:text-lg leading-relaxed font-normal">
            At <span className="font-semibold text-white">SimpleShop</span>, we believe that shopping should be delightful, straightforward, and reliable. We handpick lifestyle essentials, modern fashion, smart electronics, and home items that bring joy and long-lasting value to your daily routine.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 font-bold text-sm px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              <span>Explore Our Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#values"
              className="inline-flex items-center gap-2 bg-indigo-600/60 hover:bg-indigo-600 text-white font-medium text-sm px-6 py-3 rounded-xl border border-indigo-400/40 transition"
            >
              <span>Why SimpleShop</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex items-start gap-4"
            >
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500">
                  {stat.desc}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Brand Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600">
            Who We Are
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Born from a desire to cut through the clutter.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In a world flooded with millions of cheap, disposable products and endless scrolling, finding authentic items made with integrity felt like searching for a needle in a haystack.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            That is why we created <strong className="text-slate-900">SimpleShop</strong>. We filter through thousands of items to bring you only the ones that pass our high standards for design, reliability, and price-to-performance ratio.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Direct partnerships with verified manufacturers</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Eco-friendly packaging with biodegradable cushioning</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Comprehensive 30-day money back guarantee</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="SimpleShop Store Collection"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                ★ 4.9
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Customer Approval</p>
                <p className="text-xs text-slate-500">Over 50k+ verified orders delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Our Pillars
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Values that Guide Everything We Do
          </h2>
          <p className="text-slate-500 text-sm">
            We hold ourselves to high ethical and craftsmanship standards from concept to doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${v.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Our Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">The SimpleShop Journey</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Milestones that marked our growth from a small vision into a beloved brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-indigo-500 transition-colors"
            >
              <div className="text-indigo-400 font-extrabold text-2xl tracking-tight">
                {m.year}
              </div>
              <h3 className="text-base font-bold text-white">
                {m.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Meet the Team
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            The Passionate People Behind SimpleShop
          </h2>
          <p className="text-slate-500 text-sm">
            Dedicated professionals working every day to elevate your shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[4/4] overflow-hidden bg-slate-100 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Everything you need to know about our products, delivery, and guarantees.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-slate-800 text-sm sm:text-base hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-indigo-600 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to upgrade your everyday lifestyle?
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Explore 500+ curated items with fast shipping, transparent prices, and 30-day hassle-free returns.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping Now</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
