# Doubt Solver

Doubt Solver is a web application designed to help users manage and resolve their doubts efficiently. It provides features like submitting doubts, tracking their status, and categorizing them for better organization.

## Features

- Submit new doubts with detailed descriptions.
- Categorize doubts into predefined categories.
- Track the status of doubts (Pending, In Progress, Resolved).
- Edit or delete existing doubts.
- Filter and search doubts by category, status, or keywords.
- Responsive design for seamless usage across devices.

## Technologies Used

- **Vite**: Fast build tool for modern web projects.
- **React**: Component-based UI library.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn-ui**: Prebuilt UI components for React.
- **React Router**: For client-side routing.
- **date-fns**: For date manipulation and formatting.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later) and **npm** (v8 or later).  
  You can install them using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Installation

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd doubt-solver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/             # Mock data and services
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
├── index.css         # Global styles
└── main.tsx          # Application entry point
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run linting checks.

## Deployment

To deploy the project, build the production version using:
```bash
npm run build
```
Then, serve the `dist/` directory using your preferred hosting service.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.



## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.dev/)
- [date-fns](https://date-fns.org/)
