'use client';

import { useState } from 'react';
import { Heart, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/community-data';
import { CURRENT_USER } from '@/lib/community-data';

interface PostCardProps {
  post: Post;
  likedByMe: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export function PostCard({ post, likedByMe, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  function handleSubmitComment() {
    if (!commentText.trim()) return;
    onComment(post.id, commentText.trim());
    setCommentText('');
    setShowComments(true);
  }

  const displayedLikes = post.likes + (likedByMe ? 1 : 0);

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md',
        post.type === 'achievement' && 'border-primary/40'
      )}
    >
      {post.type === 'achievement' && post.achievement && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-2xl leading-none">{post.achievement.icon}</span>
          <div className="min-w-0">
            <span className="text-primary font-semibold text-xs uppercase tracking-widest font-headline">
              {post.achievement.title}
            </span>
            <p className="text-muted-foreground text-xs truncate">{post.achievement.description}</p>
          </div>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9">
              <AvatarFallback
                className={cn('text-white font-semibold text-xs', post.author.avatarColor)}
              >
                {post.author.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-sm leading-tight">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.level}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">{post.timestamp}</span>
        </div>

        <p className="text-sm text-foreground mb-3 whitespace-pre-line leading-relaxed">{post.content}</p>

        {post.image && (
          <div className="mb-3 rounded-md overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="Post" className="w-full object-cover max-h-56" />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-primary/20 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="mb-3" />

        <div className="flex items-center gap-5">
          <button
            onClick={() => onLike(post.id)}
            className={cn(
              'flex items-center gap-1.5 text-sm transition-colors',
              likedByMe ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
            )}
          >
            <Heart className={cn('h-4 w-4', likedByMe && 'fill-current')} />
            <span>{displayedLikes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
            {showComments ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        </div>

        {showComments && (
          <div className="mt-3 space-y-2.5">
            <Separator />
            {post.comments.length > 0 && (
              <div className="space-y-2">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarFallback
                        className={cn('text-white text-xs font-semibold', comment.author.avatarColor)}
                      >
                        {comment.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/50 rounded-lg px-3 py-2 flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="text-xs font-semibold text-foreground">{comment.author.name}</p>
                        <p className="text-[10px] text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-xs text-foreground/80 mt-0.5">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarFallback
                  className={cn('text-white text-xs font-semibold', CURRENT_USER.avatarColor)}
                >
                  {CURRENT_USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-1.5 flex-1">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmitComment();
                  }}
                  className="h-8 text-xs"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
