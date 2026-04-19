import React from 'react';
import { Link } from 'react-router-dom';
import ClientLogos from '../components/ClientLogos';

const Services = () => {
  const services = [
    { icon: 'campaign', title: 'Digital Marketing', desc: 'Strategic growth campaigns designed to capture market share and increase brand visibility.', id: 'digital-marketing' },
    { icon: 'search', title: 'SEO', desc: 'Technical and creative search engine optimization to place your business at the top of results.', id: 'seo' },
    { icon: 'code', title: 'Web Dev', desc: 'High-performance custom web applications built with modern frameworks and clean architecture.', id: 'web-dev' },
    { icon: 'bar_chart', title: 'Performance Marketing', desc: 'Data-backed advertising strategies focused on maximizing ROI and scaling customer acquisition.', id: 'performance-marketing' },
    { icon: 'share', title: 'Social Media', desc: 'Creating viral-ready content and managing community engagement across all major platforms.', id: 'social-media' },
    { icon: 'analytics', title: 'Data Analysis', desc: 'Transforming complex data points into actionable business insights and growth opportunities.', id: 'data-analysis' },
    { icon: 'palette', title: 'Branding', desc: 'Crafting unique visual identities and brand stories that resonate with your target audience.', id: 'branding' },
    { icon: 'movie_filter', title: 'Video Production', desc: 'Cinematic storytelling and high-quality post-production for commercials and social media.', id: 'video-production' },
    { icon: 'stadium', title: 'In-House Studio', desc: 'Professional photography and podcasting facilities fully equipped for your creative needs.', id: 'in-house-studio' },
    { icon: 'person_add', title: 'Lead Generation', desc: 'Automated outbound and inbound systems to keep your sales pipeline consistently full.', id: 'lead-generation' },
    { icon: 'article', title: 'Content Strategy', desc: 'Thought leadership and educational content that builds trust and authority in your niche.', id: 'content-strategy' },
    { icon: 'group', title: 'Influencer Marketing', desc: 'Strategic partnerships with creators to authentically represent your brand to new audiences.', id: 'influencer-marketing' },
  ];

  return (
    <main className="flex-1">
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-20 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">Capabilities</span>
          <h1 className="mt-6 text-5xl font-black tracking-tight lg:text-7xl text-slate-900 dark:text-white">
            Our Expert <span className="text-primary">Solutions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            We merge creativity with cutting-edge technology to deliver bespoke digital strategies that accelerate growth and redefine market standards.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="glass-card flex flex-col p-8 rounded-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.desc}</p>
              <div className="mt-auto pt-6">
                <Link className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all" to={`/services/${service.id}`}>
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ClientLogos />
    </main>
  );
};

export default Services;
