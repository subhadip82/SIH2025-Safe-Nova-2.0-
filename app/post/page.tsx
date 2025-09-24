"use client";
import React, { useState, useRef } from 'react';


const defaultPosts = [
  {
    id: 1,
    user: { name: 'Amit Kumar', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    time: '2 min ago',
    text: 'Stay safe everyone! Here’s a photo from our last fire drill.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    comments: [
      { user: 'Priya', text: 'Great job, team!' },
      { user: 'Rahul', text: 'Thanks for sharing!' }
    ]
  }
];

const PostPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(defaultPosts);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPostImage(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postText && !preview) return;
    const newPost = {
      id: Date.now(),
      user: { name: 'You', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' },
      time: 'Just now',
      text: postText,
      image: preview || '',
      comments: [] as { user: string; text: string }[]
    };
    setPosts([newPost, ...posts]);
    setShowForm(false);
    setPostText('');
    setPostImage(null);
    setPreview(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-6 md:p-10 border border-blue-100">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-700 text-center drop-shadow-sm">Community Posts</h1>
        <p className="text-center text-gray-600 mb-8">Share images, stories, and updates. Like, comment, and share posts from others!</p>
        <div className="mb-8">
          <button onClick={() => setShowForm(true)} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Create New Post</button>
        </div>

        {/* Modal Post Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
              <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl">&times;</button>
              <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Create Post</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full border border-blue-200 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  placeholder="What's on your mind?"
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                />
                {preview && (
                  <img src={preview} alt="Preview" className="rounded-lg mb-3 w-full max-h-60 object-cover" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="mb-3"
                  ref={fileInput}
                  onChange={handleImageChange}
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Post</button>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <img src={post.user.avatar} alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">{post.user.name}</div>
                  <div className="text-xs text-gray-400">{post.time}</div>
                </div>
              </div>
              {post.text && <p className="mb-2 text-gray-700">{post.text}</p>}
              {post.image && <img src={post.image} alt="Post" className="rounded-lg mb-2 w-full max-h-64 object-cover" />}
              <div className="flex items-center space-x-4 mt-2">
                <button className="text-blue-600 font-semibold hover:underline">Like</button>
                <button className="text-gray-600 font-semibold hover:underline">Comment</button>
                <button className="text-gray-600 font-semibold hover:underline">Share</button>
              </div>
              {post.comments && post.comments.length > 0 && (
                <div className="mt-3 pl-2 border-l-2 border-blue-100">
                  {post.comments.map((c, i) => (
                    <div key={i} className="text-sm text-gray-700 mb-1"><span className="font-bold">{c.user}:</span> {c.text}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostPage;
