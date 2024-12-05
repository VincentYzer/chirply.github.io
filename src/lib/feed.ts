export interface Post {
    id: number;
    user: string;
    content: string;
    likes: number;
    comments: number;
    retweets: number;
    time: string;
  }
  
  let posts: Post[] = [
    {
      id: 1,
      user: "Jane Smith",
      content: "Just launched a new design project. Feedback appreciated!",
      likes: 120,
      comments: 15,
      retweets: 30,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "TechWorld",
      content: "The future of AI is exciting and unpredictable. Stay tuned!",
      likes: 240,
      comments: 50,
      retweets: 70,
      time: "4 hours ago",
    },
  ];
  
  // Simulate an API GET request to fetch posts
  export const getPosts = async (): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(posts), 500); // Simulate network delay
    });
  };
  
  // Simulate an API POST request to add a new post
  export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = {
          ...newPost,
          id: posts.length + 1, // Assign a new unique ID
        };
        posts = [post, ...posts]; // Add to the beginning of the feed
        resolve(post);
      }, 500);
    });
  };
  