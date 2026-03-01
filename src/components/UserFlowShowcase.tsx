import { ArrowRight, Bot, Shield, Users, Sparkles, Map } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Progress } from './ui/progress';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

const flows = [
  {
    role: 'Admin HQ',
    icon: Shield,
    badge: 'Administration',
    completion: 92,
    narrative:
      'Admins orchestrate credential rollouts, compliance reviews, and A/B experiments from a single playbook.',
    steps: [
      'Ideate – plan campaigns and course rollouts',
      'Model – design course structure and pathways',
      'Deploy – publish content to all platforms',
    ],
    gradient: 'from-eu-blue to-indigo-600',
  },
  {
    role: 'Parent Lounge',
    icon: Users,
    badge: 'Parent Support',
    completion: 88,
    narrative:
      'Parents glide through 3-step onboarding with multilingual walkthroughs, safety guides, and transparent progress tracking.',
    steps: [
      'Discover – interactive explainers answer common questions',
      'Commit – user-friendly forms complete in under 3 minutes',
      'Sustain – weekly digests convert into referrals automatically',
    ],
    gradient: 'from-eu-gold to-orange-400',
  },
  {
    role: 'Student Studio',
    icon: Sparkles,
    badge: 'Learning Experience',
    completion: 95,
    narrative:
      'Learners experience engaging course modules, dynamic progress tracking, and instant certification previews.',
    steps: [
      'Explore – interactive content map reveals learning modules',
      'Practice – interactive exercises keep learners engaged',
      'Certify – completion verification and certification delivery',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function UserFlowShowcase() {
  const { theme } = useTheme();
  const isEuropaBlue = theme === 'euBlue';

  return (
    <section
      className={cn(
        'py-24 transition-colors duration-500',
        isEuropaBlue ? 'bg-slate-950 text-white' : 'theme-section text-theme-primary'
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 text-center">
          <div
            className={cn(
              'flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em]',
              isEuropaBlue ? 'text-white/70' : 'text-theme-muted'
            )}
          >
            <Bot className="h-4 w-4" /> USER FLOWS
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-current lg:text-5xl">
            Every cohort sees a guided path that feels handcrafted
          </h2>
          <p className={cn('text-lg', isEuropaBlue ? 'text-white/75' : 'text-theme-secondary')}>
            We designed personalized experience journeys for admins, parents, and students.
            Each persona receives guided pathways, progress tracking, and success metrics that update in real time.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {flows.map((flow) => (
            <Card
              key={flow.role}
              variant={isEuropaBlue ? 'glass' : 'default'}
              className={cn(
                'transition-all duration-300',
                isEuropaBlue
                  ? 'border-white/10 bg-white/5 text-white backdrop-blur-2xl'
                  : 'theme-card'
              )}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'rounded-2xl p-3 shadow-lg',
                      `bg-gradient-to-r ${flow.gradient}`,
                      isEuropaBlue ? 'shadow-white/20' : 'shadow-eu-card'
                    )}
                  >
                    <flow.icon className={cn('h-6 w-6', isEuropaBlue ? 'text-white' : 'text-white')} />
                  </div>
                  <div>
                    <CardTitle className={cn('text-2xl', isEuropaBlue ? 'text-white' : 'text-theme-primary')}>
                      {flow.role}
                    </CardTitle>
                    <CardDescription className={cn(isEuropaBlue ? 'text-white/70' : 'text-theme-secondary')}>
                      {flow.narrative}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  className={cn(
                    'border px-3 py-1 text-xs uppercase tracking-wider',
                    isEuropaBlue
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-[var(--chip-border)] bg-[var(--chip-bg)] text-theme-primary shadow-eu-card'
                  )}
                >
                  {flow.badge}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div
                    className={cn(
                      'mb-2 flex items-center justify-between text-sm uppercase',
                      isEuropaBlue ? 'text-white/60' : 'text-theme-muted'
                    )}
                  >
                    <span>Journey health</span>
                    <span>{flow.completion}%</span>
                  </div>
                  <Progress
                    value={flow.completion}
                    className={cn(isEuropaBlue ? 'bg-white/10' : 'bg-[var(--chip-bg)]')}
                  />
                </div>
                <ul className={cn('space-y-3 text-sm', isEuropaBlue ? 'text-white/80' : 'text-theme-secondary')}>
                  {flow.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <ArrowRight
                        className={cn('mt-1 h-3.5 w-3.5', isEuropaBlue ? 'text-eu-gold' : 'text-[var(--accent-primary)]')}
                      />{' '}
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter
                className={cn(
                  'flex items-center gap-2 text-sm',
                  isEuropaBlue ? 'text-white/70' : 'text-theme-secondary'
                )}
              >
                <Map className="h-4 w-4" /> View an interactive tour
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
