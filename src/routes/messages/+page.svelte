<script lang="ts">
    import Header from '$lib/components/Header.svelte';

   let messages = [
     { id: 1, name: "George Paul", preview: "Hey Erşad! 👋 How is...", isActive: true },
     { id: 2, name: "Zaire Siphron", preview: "I can help 👍", isActive: false },
     { id: 3, name: "Giana Press", preview: "I have a new project! 🌟", isActive: false },
     { id: 4, name: "Zain Bator", preview: "Need to fix this place...", isActive: false },
     { id: 5, name: "Ann Herwitz", preview: "I understood, okay 👌", isActive: false },
     { id: 6, name: "Wilson Carder", preview: "As you wish 🦾", isActive: false },
     { id: 7, name: "Paityn Lipshutz", preview: "Thank you! ✨", isActive: false },
   ];
 </script>
 
 <Header/>

 <div class="flex h-screen">
   <!-- Sidebar -->
   <div class="w-1/4 bg-primary text-white p-4">
     <input
       type="text"
       placeholder="Search messages..."
       class="w-full p-2 rounded bg-secondary text-white focus:outline-none mb-4"
     />
     <ul>
       {#each messages as { id, name, preview, isActive }}
         <li
           class="flex items-center gap-2 p-3 rounded-lg cursor-pointer 
           {isActive ? 'bg-accent' : 'hover:bg-secondary'}"
         >
           <div class="w-10 h-10 bg-gray-500 rounded-full"></div>
           <div>
             <h3 class="font-bold">{name}</h3>
             <p class="text-sm text-gray-300">{preview}</p>
           </div>
         </li>
       {/each}
     </ul>
   </div>
 
   <!-- Chat Window -->
   <div class="flex-1 bg-secondary text-white p-4">
     <div class="flex items-center gap-4 border-b border-gray-700 pb-2">
       <div class="w-12 h-12 bg-gray-500 rounded-full"></div>
       <div>
         <h2 class="font-bold text-lg">George Paul</h2>
         <p class="text-sm text-gray-400">Development Manager at Talentswide</p>
       </div>
     </div>
 
     <div class="flex-1 overflow-y-auto py-4">
       <div class="text-right">
         <p class="bg-accent p-3 rounded-lg inline-block text-left">
           Hey George 👋 Thanks!
         </p>
       </div>
       <div class="text-left">
         <p class="bg-gray-700 p-3 rounded-lg inline-block">
           I saw your references. They are very good!
         </p>
       </div>
       <div class="text-left">
         <p class="bg-gray-700 p-3 rounded-lg inline-block">
           Congratulations! How is your job position? I have a very good offer for you 😎
         </p>
       </div>
       <div class="text-right">
         <p class="bg-accent p-3 rounded-lg inline-block text-left">
           Yes, I'm ready for new adventures! ⚡
         </p>
       </div>
     </div>
 
     <div class="border-t border-gray-700 pt-2">
       <input
         type="text"
         placeholder="Type a message..."
         class="w-full p-3 rounded bg-accent text-white focus:outline-none"
       />
     </div>
   </div>
 </div>
 