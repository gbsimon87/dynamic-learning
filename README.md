# 🌟 Dynamic Learning App

A modern, interactive learning platform built with **React** and **Vite**.  
The app combines playful *skills-based games* with a structured *curriculum system* that helps learners progress through challenges step-by-step.

---

## 🚀 Overview

Dynamic Learning is designed for primary-level learners to explore topics like **Math**, **English**, **Geometry**, and **Geography** through two distinct learning modes:

1. **Skills Mode** — independent, interactive games that let users freely explore and practice topics.  
2. **Curriculum Mode** — a structured, progressive system where learners complete challenges in order to unlock new topics and categories.

---

## 🧠 Features

### 🎯 Skills Mode
- Fun and focused mini-games for:
  - 🧮 **Math**: Counting, Arithmetic, Number Bonds, Fractions, etc.
  - 📚 **English**: Word Builder, Sentence Builder, Synonyms, Opposites, etc.
  - 🔺 **Geometry**: Shape Explorer.
  - 🌍 **Geography**: World Map, City Spotlight, Flag Finder, Solar System.
- Each skill is accessible instantly via the Skills dashboard.

### 📘 Curriculum Mode
- Year-based structured learning system (currently **Year 2 Mathematics**).
- Learners progress through:
  - **Categories** → **Subcategories** → **Challenges**.
- Each challenge must be completed to unlock the next.
- Progress is **persisted in localStorage**:
  - Tracks completed challenges, topics, and categories.
  - Resumes progress automatically on reload.

### 🌓 Themes
- Built-in **light/dark mode** with a global `ThemeContext`.
- Smooth transitions and accessibility-friendly colors.

### 💾 Persistent Progress
- Curriculum completion state is stored locally in the browser.
- Automatic unlocking of next challenges and categories.

### 🗺️ Educational Games & Visuals
- Geography lessons enhanced with interactive maps and city landmarks.
- Solar System 3D scenes using texture maps and static assets.

---

## 🏗️ Project Structure

The app is modular and organized by **domain** — separating curriculum logic from skills and shared UI components.

