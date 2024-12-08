<script lang="ts">
    import { Home, Users, MessageCircle, Bell } from "lucide-svelte";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    // Icons and tabs
    let activeTab = "home";
  
    interface Notification {
      id: number;
      user: string;
      action: string;
      type: string;
      time: string;
      read: boolean;
    }
  
    // Mock data
    let notifications: Notification[] = [
      { id: 1, user: "John Doe", action: "liked your post", type: "like", time: "7h", read: false },
      { id: 2, user: "Jane Smith", action: "reacted to your post: 😂", type: "reaction", time: "1d", read: false },
      { id: 3, user: "Aaron Perez", action: "mentioned you in a post", type: "mention", time: "1d", read: true },
      { id: 4, user: "Emily Watson", action: "liked your comment", type: "like", time: "2d", read: false },
      { id: 5, user: "Chris Johnson", action: "replied to your comment", type: "reply", time: "2d", read: true },
      { id: 6, user: "Kate Lee", action: "tagged you in a photo", type: "tag", time: "3d", read: false },
    ];
  
    let showDropdown = false; // Toggles the notification dropdown
    let selectedNotification: Notification | null = null; // Stores clicked notification details
  
    // Mark a notification as read and show details
    const handleNotificationClick = (notification: Notification) => {
      notification.read = true;
      selectedNotification = notification;
    };
  
    // Add a new mock notification (for demo)
    const addNotification = () => {
      notifications = [
        ...notifications,
        {
          id: notifications.length + 1,
          user: "New User",
          action: "did something new",
          type: "new",
          time: "Just now",
          read: false,
        },
      ];
    };
  
    // Mock real-time notification arrival
    onMount(() => {
      const interval = setInterval(() => {
        addNotification();
      }, 10000); // New notification every 10 seconds
      return () => clearInterval(interval);
    });
  </script>
  
  <!-- Navigation Bar -->
  <nav class="bg-gray-900 text-white py-4 px-8 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center space-x-3">
      <svg
        class="w-8 h-8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.6-2.46.71a4.27 4.27 0 001.88-2.37 8.3 8.3 0 01-2.67 1.02A4.13 4.13 0 0016.18 4c-2.32 0-4.2 1.88-4.2 4.2 0 .33.03.66.1.96A11.72 11.72 0 013 5.35a4.2 4.2 0 001.3 5.6c-.63-.02-1.23-.19-1.76-.48v.05c0 2.08 1.48 3.81 3.45 4.2-.36.1-.74.15-1.13.15-.28 0-.55-.03-.82-.08.56 1.75 2.16 3.02 4.06 3.05A8.34 8.34 0 012 19.5a11.75 11.75 0 006.29 1.83c7.54 0 11.67-6.25 11.67-11.67 0-.18-.01-.35-.02-.52a8.14 8.14 0 002-2.08z" />
      </svg>
      <span class="text-2xl font-bold">Brand</span>
    </div>
  
    <!-- Navigation Links -->
    <div class="flex space-x-8">
      <button
        on:click={() => {
        activeTab = 'home'; 
        goto("/home"); // Navigate to the "home" route
        }}
        class="flex items-center space-x-2 text-lg font-medium hover:text-blue-400"
        class:!text-blue-500={activeTab === "home"}>
        <Home class="w-6 h-6" />
        <span>Home</span>
      </button>
  
      <button
        on:click={() => {
        activeTab = 'explore'; 
        goto("/explore"); // Navigate to the "explore" route
        }}
        class="flex items-center space-x-2 text-lg font-medium hover:text-blue-400"
        class:!text-blue-500={activeTab === "explore"}>
        <Users class="w-6 h-6" />
        <span>Explore</span>
      </button>
  
      <button
      on:click={() => {
      activeTab = 'messages'; 
      goto("/messages"); // Navigate to the "messages" route
      }}
        class="flex items-center space-x-2 text-lg font-medium hover:text-blue-400"
        class:!text-blue-500={activeTab === "messages"}>
        <MessageCircle class="w-6 h-6" />
        <span>Messages</span>
      </button>
  
      <div class="relative">
        <button
          class="flex items-center space-x-2 text-lg font-medium hover:text-blue-400"
          on:click={() => (showDropdown = !showDropdown)}>
          <Bell class="w-6 h-6" />
          <span>Notifications</span>
        </button>
  
        <!-- Notifications Dropdown -->
        {#if showDropdown}
          <div
            class="absolute right-0 mt-2 bg-secondary text-white p-6 w-96 rounded-lg shadow-lg z-50">
            <!-- Notifications List -->
            <div
              class="space-y-4 overflow-y-auto max-h-60">
              {#each notifications as notification (notification.id)}
                <div
                  class="flex items-center p-4 rounded-lg bg-primary hover:bg-accent cursor-pointer"
                  role="button"
                  tabindex="0"
                  on:click={() => handleNotificationClick(notification)}
                  on:keydown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleNotificationClick(notification);
                    }
                  }}>
                  <div class="flex-grow">
                    <p class="font-medium">
                      <span class="text-blue-400">{notification.user}</span>{" "}
                      {notification.action}
                    </p>
                    <p class="text-sm text-gray-400">{notification.time}</p>
                  </div>
                  {#if !notification.read}
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </nav>
  