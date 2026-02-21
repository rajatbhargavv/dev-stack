📌 DevStack — Content Publishing Platform
DevStack is a scalable blog-style content platform inspired by Twitter and Medium. It allows users to create, edit, publish, and manage content with clear lifecycle transitions (draft → published → private) while enforcing ownership and access control rules.

The project focuses heavily on clean architecture, predictable state management, and separation of domain logic from UI logic.
    🚀 Key Features
    🔐 Mock authentication system
    📝 Draft, private, and public content states
    📤 Controlled publish workflow
    🔎 Search with dynamic filtering
    📊 Dashboard with tab-based filtering and sorting
    🗑 Secure delete with ownership validation
    🎯 Derived state approach (single source of truth)
    🎨 Responsive UI using Material UI
    ✨ Smooth animations with Framer Motion
    ⚡ Immutable updates for predictable state transitions
    🧠 Architecture Highlights
    
Domain layer handles business logic (create, update, publish, delete).

Context layer manages global state.

UI layer remains presentation-focused.

All derived views (dashboard tabs, home feed, profile view) are computed from a single content array to avoid state duplication.

Strict ownership and visibility checks prevent unauthorized access.

Edge cases like hydration and direct URL manipulation are handled safely.

🛠 Tech Stack
      React
      Context API
      Material UI
      Framer Motion
      LocalStorage (for persistence)
      
🎯 Why This Project?
This project was built to practice:
      Clean state architecture
      Access control logic
      Content lifecycle management
      Separation of concerns
      Scalable frontend design

The architecture is backend-ready and can be easily extended with Node.js, Express, and MongoDB.
