import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, ThumbsUp, Share2, Plus, Search, Filter, User } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../lib/utils';

export const CommunityPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [category, setCategory] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchPosts = () => {
    fetch('/api/community')
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setIsLoading(true);

    try {
      await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: user.id,
          farmer_name: user.name,
          content: newPost,
          category: category
        })
      });
      setNewPost('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Farmer Community</h1>
            <p className="text-slate-500">Connect, share, and learn from fellow farmers</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <form onSubmit={handlePost} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none h-24"
                  placeholder="Ask a question or share your experience..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <select 
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>General</option>
                  <option>Crop Advice</option>
                  <option>Pest Control</option>
                  <option>Fertilizer Tips</option>
                  <option>Market Discussion</option>
                </select>
                <Button isLoading={isLoading} className="gap-2">
                  <Plus className="w-5 h-5" /> Post
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-6">
            {posts.map((post, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                      {post.farmer_name?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{post.farmer_name}</p>
                      <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(post.created_at))} ago • {post.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"><Share2 className="w-4 h-4" /></Button>
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {post.content}
                </p>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                    <ThumbsUp className="w-4 h-4" /> {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                    <MessageSquare className="w-4 h-4" /> 12 Comments
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {['All Posts', 'Crop Advice', 'Pest Control', 'Fertilizer Tips', 'Market Discussion', 'Success Stories'].map((cat, i) => (
                <button key={i} className={cn(
                  "w-full text-left px-4 py-2 rounded-xl text-sm transition-colors",
                  i === 0 ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50"
                )}>
                  {cat}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">#1</div>
                <p className="text-sm font-medium text-slate-700">Wheat Rust Treatment</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">#2</div>
                <p className="text-sm font-medium text-slate-700">New Subsidy Scheme 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">#3</div>
                <p className="text-sm font-medium text-slate-700">Organic Farming Tips</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
