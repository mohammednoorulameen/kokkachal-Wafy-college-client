// "use client"

// import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AdminLogin } from "@/Components/layout/Admin/AdminLogin"
// import { UserManagement } from "@/Components/layout/Admin/userManagement"
// import { CategoryManagement } from "@/Components/layout/Admin/categoryManagement"
// import { ProgramManagement } from "@/Components/layout/Admin/programManagement"

// import { Button } from "@/components/ui/button"
// import { LogOut, Users, FolderOpen, Award } from "lucide-react"

// export default function AdminDashboard() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     const savedToken = localStorage.getItem("adminToken")
//     if (savedToken) {
//       setToken(savedToken)
//       setIsAuthenticated(true)
//     }
//   }, [])

//   const handleLogin = (token) => {
//     localStorage.setItem("adminToken", token)
//     setToken(token)
//     setIsAuthenticated(true)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken")
//     setToken(null)
//     setIsAuthenticated(false)
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <AdminLogin onLogin={handleLogin} />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
//               <LogOut className="h-4 w-4" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Tabs defaultValue="users" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="users" className="flex items-center gap-2">
//               <Users className="h-4 w-4" />
//               Users
//             </TabsTrigger>
//             <TabsTrigger value="categories" className="flex items-center gap-2">
//               <FolderOpen className="h-4 w-4" />
//               Categories
//             </TabsTrigger>
//             <TabsTrigger value="programs" className="flex items-center gap-2">
//               <Award className="h-4 w-4" />
//               Programs
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="users">
//             <UserManagement token={token} />
//           </TabsContent>

//           <TabsContent value="categories">
//             <CategoryManagement token={token} />
//           </TabsContent>

//           <TabsContent value="programs">
//             <ProgramManagement token={token} />
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }



const AdminHomePage = () => {
  return (
    <div>AdminHomePage</div>
  )
}

export default AdminHomePage