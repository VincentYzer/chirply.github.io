<script lang="ts">
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';

    let isLogin = true; // Tracks whether the current mode is login or signup
    let email = '';
    let password = '';
    let error = '';

    const validEmail = 'yzervincent@gmail.com';
    const validPassword = '12345678';

    // Function to toggle between Login and Sign Up modes
    function toggleAuthMode() {
        isLogin = !isLogin;
        error = ''; // Clear errors when switching modes
        email = '';
        password = '';
    }

    function handleLogin(event: Event) {
        event.preventDefault();

        if (isLogin) {
            // Login logic
            if (email === validEmail && password === validPassword) {
                alert('Login Successful!');
                goto("/chirply.github.io/home"); // Redirect to /home
            } else {
                error = 'Invalid email or password. Please try again.';
            }
        } else {
            // Sign Up logic (placeholder for now)
            alert('Account Created Successfully!');
            goto("/chirply.github.io/home");
        }
    }
</script>


<div class="flex items-center justify-center min-h-screen bg-black relative">
    <!-- Authentication Card -->
    <div class="relative z-10 bg-gray-900 text-white rounded-lg shadow-xl w-[400px] p-8">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <div class="bg-gray-800 p-4 rounded-full">
                <svg class="w-10 h-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </div>
        </div>

        <!-- Header -->
        <h2 class="text-2xl font-bold text-center mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p class="text-center text-gray-400 mb-6">
            {isLogin
                ? `Don't have an account yet? `
                : `Already have an account? `}
            <button class="text-blue-500 hover:underline" on:click={toggleAuthMode}>
                {isLogin ? 'Sign up' : 'Log in'}
            </button>
        </p>

        <!-- Form -->
        <form on:submit|preventDefault={handleLogin} class="space-y-6">
            <input
                type="email"
                bind:value={email}
                placeholder="Email address"
                class="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                class="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            {#if error}
                <p class="text-red-500 text-sm">{error}</p>
            {/if}
            <button
                type="submit"
                class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
        </form>
    
        <!-- Divider -->
        <div class="my-4 text-center text-gray-400">OR</div>

        <!-- Social Login Buttons -->
        <div class="flex space-x-4">
            <button class="flex-1 bg-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12H8m0 0l4 4m-4-4l4-4"/>
                </svg>
                <span>Apple</span>
            </button>
            <button class="flex-1 bg-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path />
                </svg>
                <span>Google</span>
            </button>
        </div>
    </div>
</div>
