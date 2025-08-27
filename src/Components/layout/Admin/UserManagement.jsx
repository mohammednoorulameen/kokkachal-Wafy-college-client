
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Award, Loader2 } from "lucide-react";
import adminInstance from "@/axios/AdminInstance";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

export function UserManagement({ token }) {
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPointsDialogOpen, setIsPointsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchCategories();
    fetchPrograms();
  }, []);

  // --- Fetch Users ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await adminInstance.get("/admin-get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUsers(data.data);
      else toast.error(data.message);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch Categories ---
  const fetchCategories = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setCategories(data.data);
      else toast.error(data.message);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  // --- Fetch Programs ---
  const fetchPrograms = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-programs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setPrograms(data.data);
      else toast.error(data.message);
    } catch {
      toast.error("Failed to fetch programs");
    }
  };

  // --- Validation Schemas ---
  const AddUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    points: Yup.number().min(0, "Points cannot be negative"),
    category: Yup.string().required("Category is required"),
    program: Yup.string().required("Program is required"),
  });

  const EditUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    points: Yup.number().min(0, "Points cannot be negative"),
  });

  const AddPointsSchema = Yup.object().shape({
    points: Yup.number()
      .min(1, "Points must be at least 1")
      .required("Points are required"),
  });

  // --- Handlers ---
  const handleAddUser = async (values, { resetForm }) => {
    try {
      const { data } = await adminInstance.post("/adduser", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUsers([data.data, ...users]); // add new user at the top
        resetForm();
        setIsAddDialogOpen(false);
        toast.success("User added successfully!");
      } else toast.error(data.message);
    } catch {
      toast.error("Failed to add user. Email or Name might be duplicate.");
    }
  };

  const handleUpdateUser = async (values) => {
    if (!selectedUser) return;
    try {
      const { data } = await adminInstance.put(
        `/admin-edit-user/${selectedUser._id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUsers(users.map((u) => (u._id === selectedUser._id ? data.data : u)));
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        toast.success("User updated successfully!");
      } else toast.error(data.message);
    } catch {
      toast.error("Failed to update user");
    }
  };

  const handleAddPoints = async (values) => {
    if (!selectedUser) return;
    try {
      const { data } = await adminInstance.put(
        `/admin-update/${selectedUser._id}/points`,
        { points: values.points },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUsers(users.map((u) => (u._id === selectedUser._id ? data.data : u)));
        setIsPointsDialogOpen(false);
        setSelectedUser(null);
        toast.success("Points added successfully!");
      } else toast.error(data.message);
    } catch {
      toast.error("Failed to add points");
    }
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openPointsDialog = (user) => {
    setSelectedUser(user);
    setIsPointsDialogOpen(true);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  // --- Filtered Users ---
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Users to show based on "View More"
  const visibleUsers = searchTerm ? filteredUsers : users.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">
            Manage users, update information, and add points
          </p>
        </div>

        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-900 text-xl font-semibold">
                Add New User
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Create a new user account
              </DialogDescription>
            </DialogHeader>

            <Formik
              initialValues={{
                name: "",
                email: "",
                points: 0,
                category: "",
                program: "",
              }}
              validationSchema={AddUserSchema}
              onSubmit={handleAddUser}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      id="name"
                      name="name"
                      as={Input}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      as={Input}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="points">Initial Points</Label>
                    <Field
                      id="points"
                      name="points"
                      type="number"
                      as={Input}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.points && touched.points && (
                      <div className="text-red-500">{errors.points}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Field
                      as="select"
                      name="category"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.category}
                        </option>
                      ))}
                    </Field>
                    {errors.category && touched.category && (
                      <div className="text-red-500">{errors.category}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Field
                      as="select"
                      name="program"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select a program</option>
                      {programs.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.programName}
                        </option>
                      ))}
                    </Field>
                    {errors.program && touched.program && (
                      <div className="text-red-500">{errors.program}</div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 text-white">
                    Add User
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Box */}
      <div className="flex justify-start mb-4">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>All registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SNO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleUsers.map((user,index) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>{user.programs?.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPointsDialog(user)}
                      >
                        <Award className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* View More Button */}
          {!searchTerm && visibleCount < users.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setVisibleCount(visibleCount + 10)}>
                View More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Formik
              initialValues={{
                name: selectedUser.name,
                email: selectedUser.email,
                points: selectedUser.points,
              }}
              validationSchema={EditUserSchema}
              onSubmit={handleUpdateUser}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 mt-4">
                  
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Field id="name" name="name" as={Input} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Field id="email" name="email" type="email" as={Input} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="points">Points</Label>
                    <Field id="points" name="points" type="number" as={Input} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    {errors.points && touched.points && <div className="text-red-500">{errors.points}</div>}
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 text-white">Update User</Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Points Dialog */}
      <Dialog open={isPointsDialogOpen} onOpenChange={setIsPointsDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Add Points</DialogTitle>
            <DialogDescription>Add points to {selectedUser?.name}s account</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Formik
              initialValues={{ points: 0 }}
              validationSchema={AddPointsSchema}
              onSubmit={handleAddPoints}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Points to Add</Label>
                    <Field id="points" name="points" type="number" as={Input} className="w-full border border-gray-300 rounded px-3 py-2"/>
                    {errors.points && touched.points && <div className="text-red-500">{errors.points}</div>}
                  </div>
                  <Button type="submit" className="w-full bg-green-600 text-white">Add Points</Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

UserManagement.propTypes = {
  token: PropTypes.string.isRequired,
};


// "use client";

// import  { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Plus, Edit, Award, Loader2 } from "lucide-react";
// import adminInstance from "@/axios/AdminInstance";

// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { toast, Toaster } from "react-hot-toast";
// import PropTypes from "prop-types"

// export function UserManagement({ token }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isPointsDialogOpen, setIsPointsDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [programs, setPrograms] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filtered users based on search
// const filteredUsers = users.filter(
//   (user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// );

//   useEffect(() => {
//     fetchUsers();
//     fetchCategories();
//     fetchPrograms();
//   },[]);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await adminInstance.get("/admin-get-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) setUsers(data.data);
//       else toast.error(data.message);
//     } catch {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   // fetch categories

//   const fetchCategories = async () => {
//   setLoading(true)
//   try {
//     const { data } = await adminInstance.get("/admin-get-categories", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     if (data.success) {
//       setCategories(data.data)
//     } else {
//       // setError(data.message)
//       toast.error(data.message)
//     }
//   // eslint-disable-next-line no-unused-vars
//   } catch (err) {

//     toast.error("Failed to fetch categories")
//   } finally {
//     setLoading(false)
//   }
// }

//  // fetch programs

//   const fetchPrograms = async () => {
//   setLoading(true);
//   try {
//     const { data } = await adminInstance.get("/admin-get-programs", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (data.success) {
//       setPrograms(data.data); 
//     } else {

//       toast.error(data.message);
//     }
//   // eslint-disable-next-line no-unused-vars
//   } catch (err) {
//     toast.error("Failed to fetch programs");
//   } finally {
//     setLoading(false);
//   }
// };

//   // --- Validation Schemas ---
//   const AddUserSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     points: Yup.number().min(0, "Points cannot be negative"),
//     category: Yup.string().required("Category is required"),
//     program: Yup.string().required("Program is required"),
//   });

//   const EditUserSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     points: Yup.number().min(0, "Points cannot be negative"),
//   });

//   const AddPointsSchema = Yup.object().shape({
//     points: Yup.number()
//       .min(1, "Points must be at least 1")
//       .required("Points are required"),
//   });

//   // --- Handlers ---
//   const handleAddUser = async (values, { resetForm }) => {

//     try {
//       const { data } = await adminInstance.post("/adduser", values, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setUsers([...users, data.data]);
//         resetForm();
//         setIsAddDialogOpen(false);
//         toast.success("User added successfully!");
//       } else toast.error(data.message);
//     } catch {
//       toast.error("Failed to add user check email is unique");
//     }
//   };

//   const handleUpdateUser = async (values) => {
//     if (!selectedUser) return;
//     try {
//       const { data } = await adminInstance.put(
//         `/admin-edit-user/${selectedUser._id}`,
//         values,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         setUsers(
//           users.map((u) => (u._id === selectedUser._id ? data.data : u))
//         );
//         setIsEditDialogOpen(false);
//         setSelectedUser(null);
//         toast.success("User updated successfully!");
//       } else toast.error(data.message);
//     } catch {
//       toast.error("Failed to update user");
//     }
//   };

//   const handleAddPoints = async (values) => {
//     if (!selectedUser) return;
//     try {
//       const { data } = await adminInstance.put(
//         `/admin-update/${selectedUser._id}/points`,
//         { points: values.points },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         setUsers(
//           users.map((u) => (u._id === selectedUser._id ? data.data : u))
//         );
//         setIsPointsDialogOpen(false);
//         setSelectedUser(null);
//         toast.success("Points added successfully!");
//       } else toast.error(data.message);
//     } catch {
//       toast.error("Failed to add points");
//     }
//   };

//   const openEditDialog = (user) => {
//     setSelectedUser(user);
//     setIsEditDialogOpen(true);
//   };

//   const openPointsDialog = (user) => {
//     setSelectedUser(user);
//     setIsPointsDialogOpen(true);
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center py-8">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">User Management</h2>
//           <p className="text-gray-600">
//             Manage users, update information, and add points
//           </p>
//         </div>

//         {/* Add User Dialog */}
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus className="h-4 w-4" /> Add User
//             </Button>
            
//           </DialogTrigger>
//           <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <DialogHeader>
//               <DialogTitle className="text-gray-900 text-xl font-semibold">Add New User</DialogTitle>
//               <DialogDescription className="text-gray-500 text-sm">
//                 Create a new user account
//               </DialogDescription>
//             </DialogHeader>

//             <Formik
//               initialValues={{
//                 name: "",
//                 email: "",
//                 points: 0,
//                 category: "",
//                 program: "",
//               }}
//               validationSchema={AddUserSchema}
//               onSubmit={handleAddUser}
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Field
//                       id="name"
//                       name="name"
//                       as={Input}
//                       // className="bg-white text-gray-900 placeholder-gray-400"
//                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.name && touched.name && (
//                       <div className="text-red-500">{errors.name}</div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Field
//                       id="email"
//                       name="email"
//                       type="email"
//                       as={Input}
//                       // className="bg-white text-gray-900 placeholder-gray-400"
//                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.email && touched.email && (
//                       <div className="text-red-500">{errors.email}</div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="points">Initial Points</Label>
//                     <Field
//                       id="points"
//                       name="points"
//                       type="number"
//                       as={Input}
//                       // className="bg-white text-gray-900 placeholder-gray-400"
//                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.points && touched.points && (
//                       <div className="text-red-500">{errors.points}</div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Field
//                       as="select"
//                       name="category"
//                       // className="w-full bg-white text-gray-900 border border-gray-300 rounded p-2"
//                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.category}
//                         </option>
//                       ))}
//                     </Field>
//                     {errors.category && touched.category && (
//                       <div className="text-red-500">{errors.category}</div>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="program">Program</Label>
//                     <Field
//                       as="select"
//                       name="program"
//                       className="w-full bg-white text-gray-900 border border-gray-300 rounded p-2"
//                     >
//                       <option value="">Select a program</option>
//                       {programs.map((p) => (
//                         <option key={p._id} value={p._id}>
//                           {p.programName}
//                         </option>
//                       ))}
//                     </Field>
//                     {errors.program && touched.program && (
//                       <div className="text-red-500">{errors.program}</div>
//                     )}
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white hover:bg-blue-700"
//                   >
//                     Add User
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Users List</CardTitle>
//           <CardDescription>All registered users in the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Points</TableHead>
//                 <TableHead>Programs</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user._id}>
//                   <TableCell className="font-medium">{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.points}</TableCell>
//                   <TableCell>{user.programs?.length || 0}</TableCell>
//                   <TableCell>
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => openEditDialog(user)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => openPointsDialog(user)}
//                       >
//                         <Award className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Edit User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-gray-900 text-xl font-semibold">
//               Edit User
//             </DialogTitle>
//             <DialogDescription className="text-gray-500 text-sm">
//               Update user information
//             </DialogDescription>
//           </DialogHeader>

//           {selectedUser && (
//             <Formik
//               initialValues={{
//                 name: selectedUser.name,
//                 email: selectedUser.email,
//                 points: selectedUser.points,
//               }}
//               validationSchema={EditUserSchema}
//               onSubmit={handleUpdateUser}
//               enableReinitialize
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4 mt-4">
//                   {/* Name */}
//                   <div className="space-y-1">
//                     <Label htmlFor="name" className="text-gray-700 font-medium">
//                       Name
//                     </Label>
//                     <Field
//                       id="name"
//                       name="name"
//                       as={Input}
//                       className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.name && touched.name && (
//                       <div className="text-red-500 text-sm">{errors.name}</div>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="space-y-1">
//                     <Label
//                       htmlFor="email"
//                       className="text-gray-700 font-medium"
//                     >
//                       Email
//                     </Label>
//                     <Field
//                       id="email"
//                       name="email"
//                       type="email"
//                       as={Input}
//                       className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.email && touched.email && (
//                       <div className="text-red-500 text-sm">{errors.email}</div>
//                     )}
//                   </div>

//                   {/* Points */}
//                   <div className="space-y-1">
//                     <Label
//                       htmlFor="points"
//                       className="text-gray-700 font-medium"
//                     >
//                       Points
//                     </Label>
//                     <Field
//                       id="points"
//                       name="points"
//                       type="number"
//                       as={Input}
//                       className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.points && touched.points && (
//                       <div className="text-red-500 text-sm">
//                         {errors.points}
//                       </div>
//                     )}
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 rounded py-2 mt-2"
//                   >
//                     Update User
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Add Points Dialog */}
//       <Dialog open={isPointsDialogOpen} onOpenChange={setIsPointsDialogOpen}>
//         <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add Points</DialogTitle>
//             <DialogDescription className="text-gray-500 text-sm">
//               Add points to {selectedUser?.name}s account
//             </DialogDescription>
//           </DialogHeader>

//           {selectedUser && (
//             <Formik
//               initialValues={{ points: 0 }}
//               validationSchema={AddPointsSchema}
//               onSubmit={handleAddPoints}
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="points">Points to Add</Label>
//                     <Field id="points" name="points" type="number" as={Input}  
//                       className="w-full bg-white text-gray-900 border border-gray-300 rounded p-2"
                    
//                     />
//                     {errors.points && touched.points && (
//                       <div className="text-red-500">{errors.points}</div>
//                     )}
//                   </div>

//                   <Button type="submit" className="w-full">
//                     Add Points
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
// // Add prop types validation
// UserManagement.propTypes = {
//   token: PropTypes.string.isRequired,
// }