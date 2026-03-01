import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, TrendingUp, Handshake, Landmark } from 'lucide-react';

const impactPillars = [
  {
    title: 'EU Market Access',
    metric: '10 countries',
    detail: 'Localized rollouts signed with ministries and educational partnerships.',
    icon: Landmark,
  },
  {
    title: 'Conversion Velocity',
    metric: '3.2x',
    detail: 'Faster move from awareness to paid licenses with personalized messaging.',
    icon: TrendingUp,
  },
  {
    title: 'Partnership Pipeline',
    metric: '€18.4M',
    detail: 'Recurring revenue forecast backed by insurers, schools, and partners.',
    icon: Handshake,
  },
];

const campaignMoments = [
  {
    title: 'Awareness lift',
    value: '+62%',
    copy: 'Interactive hero journeys convert cold traffic by showcasing parental peace-of-mind.',
  },
  {
    title: 'Sales cycle',
    value: '21 days',
    copy: 'Clear ROI checklists and transparent procurement process shorten sales cycles.',
  },
  {
    title: 'Upsell success',
    value: '4.4 products',
    copy: 'Intelligent dashboards highlight new modules precisely when admins need them.',
  },
];

export function BusinessImpact() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-eu-blue via-slate-900 to-black py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-eu-gold/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 text-center">
          <Badge className="mx-auto bg-white/10 text-white">Business Growth Narrative</Badge>
          <h2 className="text-4xl font-semibold leading-tight lg:text-5xl">
            Marketing journeys built with proven strategy
          </h2>
          <p className="text-lg text-white/70">
            DigiSafe's new site is more than a brochure—it's a conversion engine. We thread
            board-level metrics into every interaction so decision makers see tangible value
            instantly.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/5 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl text-white">Pipeline storyboard</CardTitle>
              <p className="text-white/70">
                We developed a comprehensive GTM strategy with clear market positioning,
                transparent ROI metrics, and intelligent dashboards that prioritize admin needs.
                Every claim is backed by industry standards and EU regulation compliance.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaignMoments.map((moment) => (
                <motion.div
                  key={moment.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-white/60">{moment.title}</p>
                      <p className="text-3xl font-semibold text-white">{moment.value}</p>
                    </div>
                    <LineChart className="h-10 w-10 text-eu-gold" />
                  </div>
                  <p className="mt-3 text-sm text-white/70">{moment.copy}</p>
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-eu-blue hover:bg-white/90">
                  Download enterprise deck
                </Button>
                <Button size="lg" variant="outline" className="border-white/40 text-white">
                  Schedule strategy review
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {impactPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/30 backdrop-blur"
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <pillar.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-white/60">{pillar.title}</p>
                    <p className="text-2xl font-semibold">{pillar.metric}</p>
                  </div>
                </div>
                <p className="text-white/70">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
