// tailwind.config.js
import flowbitePlugin from 'flowbite/plugin';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    // Ensure that Flowbite components are included in the content paths
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      // Extend Tailwind theme with Flowbite's customizations
      // You can add additional customizations here
    },
  },
  plugins: [
    // Include Flowbite's Tailwind plugin
    flowbitePlugin
  ],
};



