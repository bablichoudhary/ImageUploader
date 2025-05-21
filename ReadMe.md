# Customizable POD T-shirt Store (Lit + Vite + Three.js)

This project is a **Single Page Application (SPA)** built using **Lit Web Components**. It allows users to customize Print-on-Demand (POD) products like T-shirts, hoodies, and caps with 3D previews, image uploads, and text input.  
 **Live Demo:** [https://imageuploader-97k.pages.dev]
**Github Repo** [https://github.com/bablichoudhary/ImageUploader.git]

## Assignment Overview

### Part 1: SPA Conversion Using Lit

- The original UI inspiration was from [tympanus.net's RepeatingImageTransition](https://tympanus.net/Development/RepeatingImageTransition/).
- This was converted into a **SPA** using Lit and Vite.
- All features like image upload, product selection, and previews are handled without page reloads.
- **Routing** was configured using `@vaadin/router`, though the app is currently single-page.
- **State management** was handled via reactive properties in Lit components.

---

### Part 2: Customizable UI

- Based on UI ideas from:
  - [UI Base](https://codepen.io/jkantner/full/OPJrMbp)
  - [Dropdown Components](https://codepen.io/jh3y/pen/QWPGwOr)
  - [Top Menu](https://codepen.io/jh3y/pen/GRapZqO)

#### Features:

1. **User Input:** Height, Weight, and Build options using dropdowns (default: 180cm, 80kg, Athletic).
2. **Product Options:** T-shirt, hoodie, sleevie, cap via top menu.
3. **3D Preview:** Integrated from [threejs-t-shirt repo](https://github.com/Starklord17/threejs-t-shirt/tree/main). User image is displayed large and also inside 3D product.
4. **Drag & Drop Upload:** Users can upload their own image or type custom text (max 3 lines).
5. **Themes:** Created 3 different themes. Use `Alt + Q` to toggle between them.
6. **Styling:** Uses CSS with custom design.

## 📁 Tech Stack

- **Lit 3.x**
- **Vite**
- **Three.js**
- **css**
- **Cloudflare Pages**
- **Storybook**
- `@vaadin/router` for routing

Thank you for reviewing my submission!
