# 🚗 Vehicle Management Frontend

A React application for managing vehicles using **React Query, Material UI, and React Hook Form**.

## 📂 Project Structure
```
/src
 ├── api/               # API calls using Axios & React Query
 ├── components/        # Reusable UI components
 ├── pages/             # Application pages (Home, Vehicle Details, Vehicle Form)
 ├── hooks/             # Custom React hooks
 ├── assets/            # Static assets (icons, images)
 ├── theme/             # MUI theme customization
 ├── styles/            # Global styles
 ├── App.tsx            # Main application component
 ├── main.tsx           # Entry point
```

## 🛠 Setup & Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/BokiGaja/vehicle-management-frontend.git

   cd vehicle-management-frontend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the development server**
   ```sh
   npm start
   ```
4. **Build for production**
   ```sh
   npm run build
   ```

## 🌍 Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_BASE_URL=http://localhost:3500
```
Restart the server after changes:
```sh
npm start
```

## 🚀 Tech Stack
- **React 19**
- **TypeScript**
- **Material UI (MUI)**
- **React Query (TanStack)**
- **React Hook Form & Yup**
- **Axios**
- **React Router**

## 🔥 Key Features
✅ Infinite scrolling vehicle list  
✅ Add, edit, and delete vehicles  
✅ Responsive & mobile-friendly design  

## 📡 API Endpoints
| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| GET    | `/api/vehicles`       | Get all vehicles (paginated) |
| GET    | `/api/vehicles/:slug` | Get a single vehicle |
| POST   | `/api/vehicles`       | Create a new vehicle |
| PUT    | `/api/vehicles/:id`   | Update a vehicle |
| DELETE | `/api/vehicles/:id`   | Delete a vehicle |


