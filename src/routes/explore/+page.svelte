<script lang="ts">
 import Header from '$lib/components/Header.svelte';
interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: number;
  category: string;
  date: string;
}
    // Mock data
    let categories = [
      { id: 1, name: "Crypto", threads: 124, icon: "💰" },
      { id: 2, name: "NFTs", threads: 80, icon: "🖼️" },
      { id: 3, name: "Houses", threads: 67, icon: "🏠" },
      { id: 4, name: "Trading", threads: 48, icon: "📈" },
      { id: 5, name: "Finance", threads: 24, icon: "💳" },
      { id: 6, name: "Wall Street", threads: 22, icon: "🏦" },
      { id: 7, name: "Sport Cars", threads: 16, icon: "🚗" }
    ];
  
    let posts = [
      { id: 1, author: "Elon Musk", content: "Shiba Inu to the moon 🚀🌕", likes: 954, replies: 115, category: "Crypto", date: "Today, 4:45 PM" },
      { id: 2, author: "Andrew Tate", content: "That's right my friend", likes: 42, replies: 12, category: "Crypto", date: "Today, 4:45 PM" },
      { id: 3, author: "Morpheus", content: "Can someone explain crypto and NFTs in 4 words?", likes: 954, replies: 115, category: "NFTs", date: "Yesterday, 1:13 PM" }
    ];
  
    let filteredPosts = posts; // Posts filtered by category
    let searchQuery = ""; // Search input
  
    // Fetch categories (mock GET function)
    const fetchCategories = async () => {
      return categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };
  
    // Fetch posts by category (mock GET function)
    const fetchPostsByCategory = async (categoryName: string): Promise<Post[]> => {
    return posts.filter((post) => post.category === categoryName);
        };
  
    // Handle search input change
    const handleSearch = async () => {
      categories = await fetchCategories();
    };
  
    // Handle category click
    const handleCategoryClick = async (categoryName: string): Promise<void> => {
  filteredPosts = await fetchPostsByCategory(categoryName);
};
  </script>
  
  <Header/>

  <div class="p-6 space-y-6 bg-accent text-white min-h-screen">
    <!-- Search Bar -->
    <div>
      <input
        type="text"
        bind:value={searchQuery}
        on:input={handleSearch}
        placeholder="Search categories..."
        class="w-full p-3 rounded-lg bg-primary text-white focus:outline-none placeholder-gray-400"/>
    </div>
  
    <!-- Categories -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each categories as { id, name, threads, icon }}
        <button
          on:click={() => handleCategoryClick(name)}
          class="flex flex-col items-center justify-center p-4 space-y-2 rounded-lg bg-secondary hover:bg-primary focus:ring focus:ring-blue-500">
          <div class="text-4xl">{icon}</div>
          <div class="text-lg font-semibold">{name}</div>
          <div class="text-sm text-gray-300">{threads} threads</div>
        </button>
      {/each}
    </div>
  
    <!-- Popular Threads -->
    <div>
      <h2 class="text-xl font-bold mb-4">Popular Threads</h2>
      {#if filteredPosts.length > 0}
        {#each filteredPosts as { id, author, content, likes, replies, category, date }}
          <div class="p-4 rounded-lg bg-[#1c2e4a] mb-4">
            <div class="flex justify-between items-center mb-2">
              <div class="font-bold">{author}</div>
              <div class="text-sm text-gray-400">{date}</div>
            </div>
            <p class="mb-2">{content}</p>
            <div class="flex justify-between items-center text-sm text-gray-300">
              <div>❤️ {likes} likes</div>
              <div>💬 {replies} replies</div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="text-gray-300">No posts available for this category.</div>
      {/if}
    </div>
  </div>
  