import { Users, TrendingUp, Trophy } from 'lucide-react';
import { CommunityFeed } from '@/components/community/community-feed';
import { CommunitySidebar } from '@/components/community/community-sidebar';

export default function CommunityPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-primary/15 via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-3">
            FitKit <span className="text-primary">Community</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Share your journey. Celebrate wins. Inspire others. Grow together.
          </p>

          <div className="flex justify-center gap-10 mt-8">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <Users className="h-5 w-5 text-primary" />
                2,847
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Members</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <TrendingUp className="h-5 w-5 text-primary" />
                156
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Posts Today</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-foreground font-headline">
                <Trophy className="h-5 w-5 text-primary" />
                89
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feed + Sidebar */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <CommunityFeed />
          </div>
          <div className="hidden lg:block sticky top-24">
            <CommunitySidebar />
          </div>
        </div>
      </main>
    </>
  );
}
