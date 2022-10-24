/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
     extend: {
       fontFamily: {
         'concert': ["Concert One", 'cursive'],
         'cairo': ["Cairo", 'sans-serif'],
         'maven': ['Maven Pro', 'sans-serif']
       },
     },
   },
   plugins: [],
 }
