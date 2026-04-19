import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ClientLogos from '../components/ClientLogos';

const servicesData = {
  'digital-marketing': {
    title: 'Digital Marketing',
    icon: 'campaign',
    heroDesc: 'Strategic growth campaigns designed to capture market share and increase brand visibility.',
    features: [
      { title: 'Performance Media', desc: 'Expertly managed campaigns across Google, Meta, and LinkedIn to maximize reach.' },
      { title: 'Conversion Audit', desc: 'Deep-dive analysis of your current funnel to identify and fix leakage points.' },
      { title: 'Growth Strategy', desc: 'Tailored roadmaps that align your digital presence with long-term business goals.' }
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'We analyze your current performance and competitor landscape.' },
      { step: '02', title: 'Strategy', desc: 'Creating a custom roadmap focused on high-ROAS channels.' },
      { step: '03', title: 'Launch', desc: 'Deploying optimized campaigns with precise tracking.' },
      { step: '04', title: 'Scale', desc: 'Continuous testing and optimization to amplify results.' }
    ]
  },
  'seo': {
    title: 'SEO Optimization',
    icon: 'search',
    heroDesc: 'Technical and creative search engine optimization to place your business at the top of results.',
    features: [
      { title: 'Technical SEO', desc: 'Optimizing site architecture, speed, and schema for search engine crawlers.' },
      { title: 'Content Authority', desc: 'Developing high-quality content that ranks for high-intent keywords.' },
      { title: 'Backlink Engine', desc: 'Building high-authority links that boost your domain trust and visibility.' }
    ],
    process: [
      { step: '01', title: 'Research', desc: 'Keyword and competitor analysis to find quick wins.' },
      { step: '02', title: 'On-Page', desc: 'Optimizing every element of your site for target keywords.' },
      { step: '03', title: 'Off-Page', desc: 'Strategic link building and authority enhancement.' },
      { step: '04', title: 'Growth', desc: 'Monitoring rankings and adapting to algorithm updates.' }
    ]
  },
  'web-dev': {
    title: 'Web Development',
    icon: 'code',
    heroDesc: 'High-performance custom web applications built with modern frameworks and clean architecture.',
    features: [
      { title: 'Full-Stack Apps', desc: 'Scalable applications using React, Node.js, and modern databases.' },
      { title: 'UI/UX Excellence', desc: 'Pixel-perfect designs focused on user engagement and conversion.' },
      { title: 'Cloud Infrastructure', desc: 'Reliable hosting and deployment setups for maximum uptime.' }
    ],
    process: [
      { step: '01', title: 'Planning', desc: 'Defining requirements, user flows, and technical stack.' },
      { step: '02', title: 'Design', desc: 'Creating interactive prototypes and design systems.' },
      { step: '03', title: 'Development', desc: 'Iterative coding with regular demos and feedback loops.' },
      { step: '04', title: 'Deployment', desc: 'Rigorous testing followed by seamless cloud launch.' }
    ]
  },
  'performance-marketing': {
    title: 'Performance Marketing',
    icon: 'bar_chart',
    heroDesc: 'Data-backed advertising strategies focused on maximizing ROI and scaling customer acquisition.',
    features: [
      { title: 'Paid Search (PPC)', desc: 'High-intent keyword targeting to capture ready-to-buy customers.' },
      { title: 'Social Advertising', desc: 'Advanced audience targeting across Meta, TikTok, and LinkedIn.' },
      { title: 'ROI Optimization', desc: 'Continuous multivariate testing to lower ACQU and increase LTV.' }
    ],
    process: [
      { step: '01', title: 'Setup', desc: 'Pixel and tracking configuration for absolute data accuracy.' },
      { step: '02', title: 'Testing', desc: 'Running creative and audience tests to find winning combinations.' },
      { step: '03', title: 'Scaling', desc: 'Increasing budgets on high-performing assets.' },
      { step: '04', title: 'Profit', desc: 'Focusing on net contribution margin rather than just ROAS.' }
    ]
  },
  'social-media': {
    title: 'Social Media Management',
    icon: 'share',
    heroDesc: 'Creating viral-ready content and managing community engagement across all major platforms.',
    features: [
      { title: 'Content Creation', desc: 'Bespoke high-quality visuals and copy tailored for each platform.' },
      { title: 'Community Growth', desc: 'Active engagement and growth strategies to build a loyal fan base.' },
      { title: 'Influencer Collabs', desc: 'Managing partnerships that amplify your brand reach and trust.' }
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'Reviewing current presence and identifying opportunities.' },
      { step: '02', title: 'Calendar', desc: 'Planning a strategic content roadmap aligned with key dates.' },
      { step: '03', title: 'Engage', desc: 'Real-time community interaction and brand building.' },
      { step: '04', title: 'Analyze', desc: 'Monthly reporting on reach, engagement, and conversion.' }
    ]
  },
  'data-analysis': {
    title: 'Data Analysis',
    icon: 'analytics',
    heroDesc: 'Transforming complex data points into actionable business insights and growth opportunities.',
    features: [
      { title: 'Custom Dashboards', desc: 'Real-time visualization of your key performance indicators.' },
      { title: 'Behavioral Insights', desc: 'Understanding exactly how users interact with your digital products.' },
      { title: 'Predictive Modeling', desc: 'Forecasting future trends to stay ahead of the market curve.' }
    ],
    process: [
      { step: '01', title: 'Collection', desc: 'Ensuring clean data ingestion from all sources.' },
      { step: '02', title: 'Cleaning', desc: 'Removing noise and verifying data integrity.' },
      { step: '03', title: 'Analysis', desc: 'Applying statistical models to uncover deep insights.' },
      { step: '04', title: 'Insight', desc: 'Presenting clear recommendations for business growth.' }
    ]
  },
  'branding': {
    title: 'Branding & Identity',
    icon: 'palette',
    heroDesc: 'Crafting unique visual identities and brand stories that resonate with your target audience.',
    features: [
      { title: 'Visual Systems', desc: 'Logos, color palettes, and typography that define your market presence.' },
      { title: 'Brand Narrative', desc: 'Crafting a compelling story that builds trust and loyalty.' },
      { title: 'Design Guidelines', desc: 'A complete toolkit to ensure consistency across all touchpoints.' }
    ],
    process: [
      { step: '01', title: 'Workshop', desc: 'Deep-dive session to extract your unique brand values.' },
      { step: '02', title: 'Conceptualize', desc: 'Developing creative directions and visual metaphors.' },
      { step: '03', title: 'Design', desc: 'Fleshing out the final visual elements and assets.' },
      { step: '04', title: 'Rollout', desc: 'Launching the new brand with a comprehensive assets package.' }
    ]
  },
  'video-production': {
    title: 'Video Production',
    icon: 'movie_filter',
    heroDesc: 'Cinematic storytelling and high-quality post-production for commercials and social media.',
    features: [
      { title: 'Commercials', desc: 'High-impact video content for TV and digital advertising.' },
      { title: 'Social Content', desc: 'Fast-paced, engagement-focused short-form video (Reels/TikTok).' },
      { title: 'Post-Production', desc: 'Masterful editing, color grading, and sound design.' }
    ],
    process: [
      { step: '01', title: 'Script', desc: 'Conceptualizing and writing scripts that drive results.' },
      { step: '02', title: 'Filming', desc: 'Professional on-site or studio production with elite gear.' },
      { step: '03', title: 'Edit', desc: 'Post-production magic to bring the story to life.' },
      { step: '04', title: 'Deliver', desc: 'Final export in all required formats for multi-channel use.' }
    ]
  },
  'in-house-studio': {
    title: 'In-House Studio',
    icon: 'stadium',
    heroDesc: 'Professional photography and podcasting facilities fully equipped for your creative needs.',
    features: [
      { title: 'Studio Photo', desc: 'Premium studio for product, fashion, and portrait photography.' },
      { title: 'Podcast Setup', desc: 'Sound-isolated rooms with top-tier broadcast microphones.' },
      { title: 'Rental Services', desc: 'Access to professional lighting and camera equipment.' }
    ],
    process: [
      { step: '01', title: 'Schedule', desc: 'Booking your session in our high-tech facility.' },
      { step: '02', title: 'Technical', desc: 'Ensuring all gear is calibrated for your specific needs.' },
      { step: '03', title: 'Session', desc: 'Your creative time in a professional, sound-proof environment.' },
      { step: '04', title: 'Assets', desc: 'Immediate delivery of raw files or post-processed selects.' }
    ]
  },
  'lead-generation': {
    title: 'Lead Generation',
    icon: 'person_add',
    heroDesc: 'Automated outbound and inbound systems to keep your sales pipeline consistently full.',
    features: [
      { title: 'Automated Funnels', desc: 'End-to-end systems that qualify and convert cold traffic.' },
      { title: 'Email Outreach', desc: 'High-deliverability B2B outreach that starts conversations.' },
      { title: 'LinkedIn Growth', desc: 'Establishing authority and generating high-quality networking leads.' }
    ],
    process: [
      { step: '01', title: 'Prospect', desc: 'Defining and finding your ideal customer profiles.' },
      { step: '02', title: 'Sequence', desc: 'Building persuasive multi-channel outreach flows.' },
      { step: '03', title: 'Manage', desc: 'Daily monitoring and response management.' },
      { step: '04', title: 'Convert', desc: 'Handing over warm, qualified leads to your sales team.' }
    ]
  },
  'content-strategy': {
    title: 'Content Strategy',
    icon: 'article',
    heroDesc: 'Thought leadership and educational content that builds trust and authority in your niche.',
    features: [
      { title: 'Pillar Content', desc: 'Comprehensive guides and whitepapers that establish authority.' },
      { title: 'Blog Management', desc: 'Strategic editorial planning and high-quality writing.' },
      { title: 'Newsletter Funnels', desc: 'Building long-term relationships through value-driven email.' }
    ],
    process: [
      { step: '01', title: 'Plan', desc: 'Topic research based on user intent and search volume.' },
      { step: '02', title: 'Create', desc: 'High-quality production of articles and visual assets.' },
      { step: '03', title: 'Distribute', desc: 'Multichannel sharing to ensure maximum eyeball reach.' },
      { step: '04', title: 'Iterate', desc: 'Analyzing results to refine topics and formats.' }
    ]
  },
  'influencer-marketing': {
    title: 'Influencer Marketing',
    icon: 'group',
    heroDesc: 'Strategic partnerships with creators to authentically represent your brand to new audiences.',
    features: [
      { title: 'Vetting & Selection', desc: 'Finding creators who truly align with your brand values.' },
      { title: 'Campaign Management', desc: 'Ensuring smooth communication and high-quality deliverables.' },
      { title: 'ROI Tracking', desc: 'Measuring actual impact on brand sentiment and sales.' }
    ],
    process: [
      { step: '01', title: 'Matching', desc: 'Identifying the right voices for your brand story.' },
      { step: '02', title: 'Outreach', desc: 'Negotiating fair terms and managing contracts.' },
      { step: '03', title: 'Execute', desc: 'Guiding creators to produce high-performing content.' },
      { step: '04', title: 'Review', desc: 'Deep-dive into performance metrics and future scaling.' }
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const service = servicesData[id] || servicesData['digital-marketing']; // Fallback for safety

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <section className="relative pt-48 pb-24 lg:pt-64 lg:pb-32 hero-gradient overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-20 text-center lg:text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">Service Excellence</span>
                <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 dark:text-white lg:text-7xl leading-tight">
                  {service.title.split(' ')[0]} <span className="text-primary">{service.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {service.heroDesc}
                </p>
                <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link to={`/contact?service=${id}`} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 inline-block shadow-xl shadow-primary/20">
                    Schedule a Consultation
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-md aspect-square glass-card rounded-3xl flex items-center justify-center overflow-hidden border-primary/20 shadow-2xl shadow-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
                  <span className="material-symbols-outlined text-[120px] text-primary/80 relative z-10">{service.icon}</span>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary blur-[80px] opacity-30"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary blur-[80px] opacity-20"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <span className="w-12 h-1 bg-primary"></span>
                Key Features
              </h2>
              <ul className="space-y-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">{feature.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 rounded-[2rem] border-primary/20 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-8xl">verified</span>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">The RGDS Advantage</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We don't believe in one-size-fits-all solutions. Every client partner receives a bespoke strategy that integrates our creative depth with proprietary data insights to ensure market leadership.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm font-medium">Strategic Alignment</span>
                  <span className="text-xs font-bold text-primary uppercase">Guaranteed</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm font-medium">Technical Support</span>
                  <span className="text-xs font-bold text-primary uppercase">Priority</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium">Reporting & Analytics</span>
                  <span className="text-xs font-bold text-primary uppercase">Real-Time</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-20 py-24 bg-white/[0.01]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Our Process</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto">How we take your projects from initial concept to high-impact results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-8 rounded-2xl h-full border-white/10 hover:border-primary/50 transition-all relative"
              >
                <div className="text-primary font-black text-4xl mb-4 opacity-30">{p.step}</div>
                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{p.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <ClientLogos />

        <section className="mx-auto max-w-7xl px-6 lg:px-20 py-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-24 text-center text-white lg:px-16 shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:32px_32px] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-black leading-tight lg:text-6xl text-white">Ready for Impact?</h2>
              <p className="mx-auto mt-8 text-xl text-white/90 font-medium">Let's discuss how {service.title} can accelerate your business growth.</p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Link to={`/contact?service=${id}`} className="min-w-[200px] rounded-full bg-white px-10 py-5 font-bold text-primary transition-all hover:scale-105 hover:shadow-xl shadow-black/10">
                  Book Your Project
                </Link>
                <Link to="/portfolio" className="min-w-[200px] rounded-full border-2 border-white/30 px-10 py-5 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </AnimatePresence>
  );
};

export default ServiceDetail;
