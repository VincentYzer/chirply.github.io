export interface Post {
    id: string;
    user: string;
    content: string;
    likes?: number;
    comments?: number;
    retweets?: number;
    mediaUrl: string;
    time: string;
    categories: string[];  // Add this field to store the categories
  }
  
  
  // In-memory store for mock posts with categories
  const mockPosts: Post[] = [
    {
      id: '1',
      user: 'Vincent Yzer',
      content: 'Welcome to my feed! This is my first post.',
      likes: 10,
      comments: 2,
      retweets: 1,
      mediaUrl: '',
      time: new Date().toLocaleString(),
      categories: [], // No categories in the first post
    },
  ];
  
  // Function to fetch posts from the mock API
  export const fetchRedditMedia = async (): Promise<Post[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockPosts]; // Return a copy of the mock posts
  };
  
  // Function to create a new post with extracted categories
  export const createRedditPost = async (content: string, categories: string[]): Promise<Post | null> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      // Create a new post
      const newPost: Post = {
        id: (mockPosts.length + 1).toString(),
        user: 'Vincent Yzer', // Assuming the user is always "Vincent Yzer"
        content,
        likes: 0,
        comments: 0,
        retweets: 0,
        mediaUrl: '', // Add logic for media URLs if necessary
        time: new Date().toLocaleString(),
        categories: categories, // Assign the categories to the new post
      };
  
      // Add to the mock store
      mockPosts.unshift(newPost);
  
      return newPost;
    } catch (error: unknown) {
      console.error('Error creating a post:', error);
      return null;
    }
  };