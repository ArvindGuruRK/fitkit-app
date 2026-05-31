'use client';

import { useState } from 'react';
import { PostCard } from '@/components/community/post-card';
import { CreatePost } from '@/components/community/create-post';
import { MOCK_POSTS, type Post } from '@/lib/community-data';

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());

  function handleLike(postId: string) {
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  }

  function handleComment(postId: string, content: string) {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: { id: 'current', name: 'You', initials: 'YO', level: 'Gold Member', avatarColor: 'bg-primary' },
              content,
              timestamp: 'just now',
            },
          ],
        };
      })
    );
  }

  function handleCreatePost(postData: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) {
    const newPost: Post = {
      ...postData,
      id: `p-${Date.now()}`,
      likes: 0,
      comments: [],
      timestamp: 'just now',
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  return (
    <div className="space-y-4">
      <CreatePost onPost={handleCreatePost} />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          likedByMe={likedPostIds.has(post.id)}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
}
