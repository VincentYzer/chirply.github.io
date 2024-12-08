<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
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
  
    interface Category {
      id: number;
      name: string;
      icon: string;
    }
  
    // Categories initialization
    let categories: Category[] = [
      { id: 1, name: "Crypto", icon: "💰" },
      { id: 2, name: "NFTs", icon: "🖼️" },
      { id: 3, name: "Houses", icon: "🏠" },
      { id: 4, name: "Trading", icon: "📈" },
      { id: 5, name: "Finance", icon: "💳" },
      { id: 6, name: "Wall Street", icon: "🏦" },
      { id: 7, name: "Sport Cars", icon: "🚗" },
      { id: 8, name: "Gaming", icon: "🎮" },
    ];
  
    // Generate mock posts
    let posts: Post[] = Array.from({ length: 35 }, (_, i) => {
      const categoriesArray = [
        "Crypto",
        "NFTs",
        "Houses",
        "Trading",
        "Finance",
        "Wall Street",
        "Sport Cars",
        "Gaming",
      ];
      const category = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
      return {
        id: i + 1,
        author: `User${i + 1}`,
        content: `This is a post about ${category} #${category.toLowerCase()}`,
        likes: Math.floor(Math.random() * 500),
        replies: Math.floor(Math.random() * 100),
        category,
        date: new Date().toLocaleString(),
      };
    });
  
    // Initial state variables
    let popularThreads: Post[] = []; // Holds the popular threads to display
    let searchQuery = ""; // Holds the search query input
    let selectedCategory = "All"; // Category selected by the user
  
    // Function to load saved state from localStorage (only runs in client)
    const loadSavedState = () => {
      if (typeof window !== 'undefined') {  // Check if window exists (client-side)
        const savedThreads = localStorage.getItem("savedThreads");
        if (savedThreads) {
          posts = JSON.parse(savedThreads);
        }
      }
    };
  
    // Function to save the state of posts to localStorage (only runs in client)
    const saveState = () => {
      if (typeof window !== 'undefined') {  // Check if window exists (client-side)
        localStorage.setItem("savedThreads", JSON.stringify(posts));
      }
    };
  
    // Fetch the top 5 threads based on likes/replies for a category or all threads
    const fetchPopularThreads = (categoryName: string): Post[] => {
      const filteredPosts = categoryName === "All"
        ? posts
        : posts.filter((post) => post.category === categoryName);
  
      return filteredPosts
        .sort((a, b) => b.likes + b.replies - (a.likes + b.replies))
        .slice(0, 5);
    };
  
    // Handle category click (reset if same category clicked)
    const handleCategoryClick = (categoryName: string): void => {
      if (categoryName === selectedCategory) {
        selectedCategory = "All";
        popularThreads = fetchPopularThreads("All");
      } else {
        selectedCategory = categoryName;
        popularThreads = fetchPopularThreads(categoryName);
      }
    };
  
    const getThreadCount = (categoryName: string): number => {
      return posts.filter((post) => post.category === categoryName).length;
    };
  
    // Handle search input changes
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        selectedCategory = "All";
        popularThreads = fetchPopularThreads("All");
      } else {
        categories = categories.filter((cat: Category) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    };
  
    // On Mount: Load saved state and initialize popular threads
    onMount(() => {
      loadSavedState();
      popularThreads = fetchPopularThreads("All");
  
      // Save the state before unloading the page
      window.addEventListener('beforeunload', saveState);
    });
  
    // Cleanup: Remove the event listener when the component is destroyed
    onDestroy(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', saveState);
      }
    });
  </script>
  
  <Header />
  
  <div class="p-6 space-y-6 bg-accent text-white min-h-screen">
    <!-- Search Bar -->
    <div>
      <input
        type="text"
        bind:value={searchQuery}
        on:input={handleSearch}
        placeholder="Search categories..."
        class="w-full p-3 rounded-lg bg-primary text-white focus:outline-none placeholder-gray-400"
      />
    </div>
  
    <!-- Categories -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center">
      {#each categories as { id, name, icon }}
        <button
          on:click={() => handleCategoryClick(name)}
          class="flex flex-col items-center justify-center p-3 space-y-2 rounded-md bg-secondary hover:bg-primary focus:ring focus:ring-blue-500"
          style="height: 120px;">
          <div class="text-3xl">{icon}</div>
          <div class="text-sm font-semibold">{name}</div>
          <div class="text-xs text-gray-300">{getThreadCount(name)} threads</div>
        </button>
      {/each}
    </div>
  
    <!-- Popular Threads -->
    <div>
      <h2 class="text-xl font-bold mb-4">
        {selectedCategory === "All"
          ? "Popular Threads"
          : `Threads in ${selectedCategory}`}
      </h2>
      <div class="space-y-4">
        {#each popularThreads as { id, author, content, likes, replies, category, date }}
          <div class="p-4 rounded-lg bg-[#1c2e4a]">
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
      </div>
    </div>
  </div>
  