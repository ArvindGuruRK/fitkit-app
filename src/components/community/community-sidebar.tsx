import { Flame } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  ACTIVE_MEMBERS,
  CURRENT_USER,
  CURRENT_USER_STATS,
  TRENDING_TAGS,
} from '@/lib/community-data';

export function CommunitySidebar() {
  return (
    <div className="space-y-4">
      {/* Current User Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-16 w-16 mb-3">
              <AvatarFallback
                className={cn('text-white font-bold text-lg', CURRENT_USER.avatarColor)}
              >
                {CURRENT_USER.initials}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-foreground font-headline">{CURRENT_USER.name}</p>
            <p className="text-xs text-primary font-medium mt-0.5">{CURRENT_USER.level}</p>
          </div>

          <Separator className="my-3" />

          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Posts', value: CURRENT_USER_STATS.posts },
              { label: 'Followers', value: CURRENT_USER_STATS.followers },
              { label: 'Following', value: CURRENT_USER_STATS.following },
              { label: 'Workouts', value: CURRENT_USER_STATS.workouts },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-sm font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Active Members */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-headline uppercase tracking-wider flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" />
            Most Active
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          {ACTIVE_MEMBERS.map((member, index) => (
            <div key={member.id} className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground w-4 text-right flex-shrink-0">
                {index + 1}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className={cn('text-white text-xs font-semibold', member.avatarColor)}>
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{member.name}</p>
                <p className="text-[10px] text-muted-foreground">{member.level}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Flame className="h-3 w-3 text-orange-400" />
                <span className="text-[10px] text-muted-foreground">{member.workoutsThisWeek}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-headline uppercase tracking-wider">
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {TRENDING_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary/20 hover:border-primary/50 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
