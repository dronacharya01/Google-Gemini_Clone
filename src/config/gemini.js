// src/config/gemini.js
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

