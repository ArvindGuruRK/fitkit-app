'use client';

import { useState } from 'react';
import { ImagePlus, Trophy, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ACHIEVEMENTS, CURRENT_USER, type Post, type PostType } from '@/lib/community-data';

interface CreatePostProps {
  onPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<PostType>('text');
  const [selectedAchievementId, setSelectedAchievementId] = useState<string>('');
  const [tagsInput, setTagsInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit() {
    if (!content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const achievement =
      postType === 'achievement'
        ? ACHIEVEMENTS.find((a) => a.id === selectedAchievementId)
        : undefined;

    onPost({
      author: CURRENT_USER,
      content: content.trim(),
      type: postType,
      achievement,
      tags,
    });

    setContent('');
    setPostType('text');
    setSelectedAchievementId('');
    setTagsInput('');
    setIsFocused(false);
  }

  const canSubmit = content.trim().length > 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className={cn('text-white font-semibold text-xs', CURRENT_USER.avatarColor)}>
              {CURRENT_USER.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <Textarea
              placeholder="Share your workout, progress, or thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              rows={isFocused ? 3 : 1}
              className="resize-none text-sm transition-all duration-200"
            />

            {isFocused && (
              <div className="mt-3 space-y-3">
                {/* Post type toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setPostType('text')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                      postType === 'text'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    )}
                  >
                    <ImagePlus className="h-3.5 w-3.5" />
                    Post
                  </button>
                  <button
                    onClick={() => setPostType('achievement')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                      postType === 'achievement'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    )}
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    Achievement
                  </button>
                </div>

                {/* Achievement picker */}
                {postType === 'achievement' && (
                  <Select value={selectedAchievementId} onValueChange={setSelectedAchievementId}>
                    <SelectTrigger className="text-sm h-9">
                      <SelectValue placeholder="Select your achievement..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ACHIEVEMENTS.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          <span className="flex items-center gap-2">
                            <span>{a.icon}</span>
                            <span>{a.title}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Tags */}
                <input
                  type="text"
                  placeholder="Tags (comma-separated, e.g. HIIT, Strength)"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full text-xs bg-muted/50 border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsFocused(false);
                      setContent('');
                      setPostType('text');
                      setSelectedAchievementId('');
                      setTagsInput('');
                    }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                  <Button size="sm" onClick={handleSubmit} disabled={!canSubmit} className="h-8 px-5">
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
