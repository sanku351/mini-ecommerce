## Mini E-Commerce Platform with Two Tabs

### Frontend Setup(Next.js)
1. Clone the repository:
```bash
git clone https://github.com/sanku351/mini-ecommerce.git
cd mini-ecommerce
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env.local` file in the root directory with the following variables:
```bash
NEXT_PUBLIC_API_BASE_URL="your-frontend-connection"
```
4. Run the development server:
```shellscript
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Backend Setup (Express)
1. Navigate to the backend directory:
```shellscript
cd backend
```
2. Install dependencies:
```shellscript
npm install
```
3. Create a `.env` file with the following variables:
```plaintext
PORT=5000
DATABASE_URL="your-postgres-connection-string"
```
4. Run the server:
```shellscript
node server.js
```

### Database Setup (PostgreSQL)
1. Create a new PostgreSQL database:
```sql
CREATE DATABASE mini_ecommerce;
```
2. The application will automatically create the required tables when the backend server starts.

## Project Structure
### Frontend (Next.js)
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and types
- `public/` - Static assets
- `api/` - API route handlers
 
### Backend (Express)
- `server.js` - Main Express server file

## Features Implemented
- **Product Submission Form**: Users can submit products with name, price, description, and optional image URL
- **Product Display**: Products are displayed in a responsive card layout
- **Search Functionality**: Basic search by product name or description
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Loading States**: Skeleton loaders for better user experience
- **Error Handling**: Proper error handling for API requests
- **Toast Notifications**: User feedback for form submissions

## Deployment
### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Backend (Render, Heroku, or similar)
1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Add your environment variables
4. Deploy

## Additional Notes
- The application uses server-side rendering with Next.js for better SEO and performance
- The search functionality can be enhanced with AI-based contextual search using OpenAI embeddings
- For production, consider adding authentication to protect the product submission form
- The database schema can be extended to include categories, tags, and user information
