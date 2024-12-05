<script lang="ts">
    import { Home, Users, MessageCircle, Bell } from 'lucide-svelte';
    import Header from '$lib/components/Header.svelte';
    import { getPosts, createPost } from '$lib/feed'; // Import functions
    import type { Post } from '$lib/feed'; // Import the Post type


    let activeTab = 'home';
    let posts: Post[] = [];
    let newPostContent = ''; // Holds the content for the new post
    let loading = false; // Tracks the loading state for posting
    
    let profile = {
        name: "Vincent Yzer",
        username: "@vincentyzer",
        location: "Gordon Heights, Olongapo City",
        bio: "UI/UX Designer and Front-End Developer.",
        image: "/assets/yzer.jpg",
        stats: { tweets: 5, followers: 200, following: 18 }
    };

    let suggestions = [
        { name: "OpenAI", username: "@openai" },
        { name: "Tech Company", username: "@techco" },
        { name: "Google", username: "@google" }
    ];

    let trends = [
        { topic: "#AIRevolution", tweets: "120k Tweets" },
        { topic: "#DesignTips", tweets: "85k Tweets" },
        { topic: "#Frontend2024", tweets: "40k Tweets" }
    ];
    // Fetch posts on mount
    const fetchPosts = async () => {
      posts = await getPosts();
    };
  
    // Create a new post
    const addPost = async () => {
      if (!newPostContent.trim()) return; // Avoid empty posts
      loading = true;
      const newPost = {
        user: "Vincent Yzer", // Replace with dynamic user info if available
        content: newPostContent,
        likes: 0,
        comments: 0,
        retweets: 0,
        time: "Just now",
      };
      const addedPost = await createPost(newPost);
      posts = [addedPost, ...posts]; // Update the posts array
      newPostContent = ''; // Clear the input
      loading = false;
    };
  
    // Initialize posts
    fetchPosts();
  </script>

    <Header/>

  <div class="min-h-screen flex px-6 py-4 space-x-6 bg-[#211c4a]">
    <!-- Profile Section -->
    <div class="w-1/4 p-4 bg-[#1c2e4a] text-white rounded-lg shadow-lg h-[450px]">
        <h4 class="text-lg font-bold mb-4 text-center">Profile</h4>
        <div class="text-center mb-6">
            <!-- Profile Image -->
            <div class="w-28 h-28 rounded-full mx-auto overflow-hidden bg-gray-500">
                {#if profile.image}
                    <img
                        src={profile.image}
                        alt="{profile.name}'s profile picture"
                        class="w-full h-full object-cover"/>
                {:else}
                    <div class="w-full h-full flex items-center justify-center text-gray-300">
                        No Image
                    </div>
                {/if}
            </div>
            <!-- Profile Details -->
            <h3 class="mt-4 text-xl font-bold">{profile.name}</h3>
            <p class="text-gray-300">{profile.username}</p>
            <p class="text-gray-400 mt-2">{profile.location}</p>
            <p class="mt-4 text-sm text-gray-200">{profile.bio}</p>
        </div>
        <div class="flex justify-between text-center text-sm mt-6">
            <div>
                <p class="font-bold text-lg">{profile.stats.tweets}</p>
                <p class="text-gray-300">Tweets</p>
            </div>
            <div>
                <p class="font-bold text-lg">{profile.stats.followers}</p>
                <p class="text-gray-300">Followers</p>
            </div>
            <div>
                <p class="font-bold text-lg">{profile.stats.following}</p>
                <p class="text-gray-300">Following</p>
            </div>
        </div>
    </div>

    <!-- Feed Section -->
    <div class="flex-1 space-y-6">
        <!-- Create a Post -->
        <div class="bg-[#1c2e4a] text-white rounded-lg p-4 shadow">
            <textarea
                class="w-full bg-[#243b55] border border-gray-500 p-3 rounded-lg resize-none text-gray-200 placeholder-gray-400"
                rows="4"
                placeholder="What's happening?"
                bind:value={newPostContent}
            ></textarea>
            <div class="text-right mt-2">
                <button
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    on:click={addPost}
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Tweet"}
                </button>
            </div>
        </div>

        <!-- Feed -->
        {#each posts as post}
            <div class="bg-[#1c2e4a] text-white rounded-lg p-4 shadow">
                <div class="flex justify-between items-center">
                    <h4 class="font-bold">{post.user}</h4>
                    <p class="text-sm text-gray-400">{post.time}</p>
                </div>
                <p class="mt-2">{post.content}</p>
                <div class="mt-4 flex space-x-4 text-gray-400">
                    <button class="hover:text-blue-500">👍 {post.likes}</button>
                    <button class="hover:text-blue-500">💬 {post.comments}</button>
                    <button class="hover:text-blue-500">🔁 {post.retweets}</button>
                </div>
            </div>
        {/each}
    </div>

    <!-- Right Sidebar -->
    <div class="w-1/4 space-y-6">
        <div class="bg-[#1c2e4a] text-white rounded-lg p-4 shadow-lg">
            <h4 class="text-lg font-bold mb-4">Who to follow</h4>
            {#each suggestions as suggestion}
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <p class="font-bold">{suggestion.name}</p>
                        <p class="text-sm text-gray-400">{suggestion.username}</p>
                    </div>
                    <button class="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">Follow</button>
                </div>
            {/each}
        </div>

        <div class="bg-[#1c2e4a] text-white rounded-lg p-4 shadow-lg">
            <h4 class="text-lg font-bold mb-4">Trending Topics</h4>
            {#each trends as trend}
                <div class="mb-4">
                    <p class="font-bold">{trend.topic}</p>
                    <p class="text-sm text-gray-400">{trend.tweets}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

  