"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Plus, Loader2, Search, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import adminInstance from "@/axios/AdminInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const Programmanagement = ({ token }) => {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProgram, setEditProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetchPrograms();
    fetchCategories();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data } = await adminInstance.get("/admin-get-programs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setPrograms(data.data);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch programs");
      toast.error("Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCategories(data.data);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  const ProgramSchema = Yup.object().shape({
    programName: Yup.string().required("Program name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  });

  // Add Program
  const handleAddProgram = async (values, { resetForm }) => {
    try {
      const { data } = await adminInstance.post("/addprogram", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success("Program added successfully");
        resetForm();
        setIsAddDialogOpen(false);
        fetchPrograms();
      } else {
        toast.error(data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to add program");
    }
  };

  // Edit Program
  const handleEditProgram = async (values) => {
    try {
      const { data } = await adminInstance.put(
        `/admin-edit-prgram/${editProgram._id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Program updated successfully");
        setIsEditDialogOpen(false);
        setEditProgram(null);
        fetchPrograms();
      } else {
        toast.error(data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to update program");
    }
  };

  // Filter programs
  const filteredPrograms = programs.filter(
    (program) =>
      program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visiblePrograms = filteredPrograms.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Program Management</h2>
          <p className="text-gray-600">Manage programs and their categories</p>
        </div>

        {/* Add Program Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Program</DialogTitle>
              <DialogDescription>Create a new program</DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{ programName: "", description: "", category: "" }}
              validationSchema={ProgramSchema}
              onSubmit={handleAddProgram}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="programName">Program Name</Label>
                    <Field
                      as={Input}
                      id="programName"
                      name="programName"
                      placeholder="Enter program name"
                    />
                    <ErrorMessage
                      name="programName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Enter program description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={values.category}
                      onValueChange={(value) => setFieldValue("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-100">
                        {categories.map((category) => (
                          <SelectItem
                            className="hover:bg-blue-200 focus:bg-blue-300 cursor-pointer"
                            key={category._id}
                            value={category._id}
                          >
                            {category.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-50 hover:bg-black hover:text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Program"}
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Program Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>Update program details</DialogDescription>
          </DialogHeader>
          {editProgram && (
            <Formik
              initialValues={{
                programName: editProgram.programName,
                description: editProgram.description,
                category: editProgram.category?._id || "",
              }}
              validationSchema={ProgramSchema}
              onSubmit={handleEditProgram}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="programName">Program Name</Label>
                    <Field
                      as={Input}
                      id="programName"
                      name="programName"
                    />
                    <ErrorMessage
                      name="programName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={values.category}
                      onValueChange={(value) => setFieldValue("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-100">
                        {categories.map((category) => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                          >
                            {category.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-50 hover:bg-black hover:text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Program"}
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(10);
          }}
          className="max-w-sm"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Programs List</CardTitle>
          <CardDescription>All programs in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SNo</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visiblePrograms.length > 0 ? (
                visiblePrograms.map((program, index) => (
                  <TableRow key={program._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{program.programName}</TableCell>
                    <TableCell>{program.description}</TableCell>
                    <TableCell>{program.category?.category || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(program.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditProgram(program);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No programs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {filteredPrograms.length > visibleCount && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setVisibleCount((prev) => prev + 10)}>
                View More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

Programmanagement.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Programmanagement;


// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/Components/ui/card";
// import { Button } from "@/Components/ui/button";
// import { Input } from "@/Components/ui/input";
// import { Label } from "@/Components/ui/label";
// import { Textarea } from "@/Components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/Components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/Components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/Components/ui/dialog";
// import { Alert, AlertDescription } from "@/Components/ui/alert";
// import { Plus, Loader2, Search } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import adminInstance from "@/axios/AdminInstance";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import PropTypes from "prop-types";

// const Programmanagement = ({ token }) => {
//   const [programs, setPrograms] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [visibleCount, setVisibleCount] = useState(10); 

//   useEffect(() => {
//     fetchPrograms();
//     fetchCategories();
//   }, []);

//   const fetchPrograms = async () => {
//     setLoading(true);
//     try {
//       const { data } = await adminInstance.get("/admin-get-programs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setPrograms(data.data);
//       } else {
//         setError(data.message);
//         toast.error(data.message);
//       }
//       // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError("Failed to fetch programs");
//       toast.error("Failed to fetch programs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const { data } = await adminInstance.get("/admin-get-categories", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setCategories(data.data);
//       }
//       // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       console.error("Failed to fetch categories");
//     }
//   };

//   // Formik validation schema
//   const ProgramSchema = Yup.object().shape({
//     programName: Yup.string().required("Program name is required"),
//     description: Yup.string().required("Description is required"),
//     category: Yup.string().required("Category is required"),
//   });

//   const handleAddProgram = async (values, { resetForm }) => {
//     try {
//       const { data } = await adminInstance.post("/addprogram", values, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         toast.success("Program added successfully");
//         resetForm();
//         setIsAddDialogOpen(false);
//         fetchPrograms(); // 🔄 Refetch programs after adding
//       } else {
//         toast.error(data.message);
//       }
//       // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       toast.error("Failed to add program");
//     }
//   };

//   // 🔍 Filtered programs based on search
//   const filteredPrograms = programs.filter(
//     (program) =>
//       program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       program.category?.category
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   // Show only limited number
//   const visiblePrograms = filteredPrograms.slice(0, visibleCount);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-8">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">Program Management</h2>
//           <p className="text-gray-600">Manage programs and their categories</p>
//         </div>

//         {/* Add Program Dialog */}
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus className="h-4 w-4" />
//               Add Program
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <DialogHeader>
//               <DialogTitle>Add New Program</DialogTitle>
//               <DialogDescription>Create a new program</DialogDescription>
//             </DialogHeader>

//             <Formik
//               initialValues={{ programName: "", description: "", category: "" }}
//               validationSchema={ProgramSchema}
//               onSubmit={handleAddProgram}
//             >
//               {({ isSubmitting, values, setFieldValue }) => (
//                 <Form className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="programName">Program Name</Label>
//                     <Field
//                       as={Input}
//                       id="programName"
//                       name="programName"
//                       placeholder="Enter program name"
//                     />
//                     <ErrorMessage
//                       name="programName"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Field
//                       as={Textarea}
//                       id="description"
//                       name="description"
//                       placeholder="Enter program description"
//                     />
//                     <ErrorMessage
//                       name="description"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Select
//                       value={values.category}
//                       onValueChange={(value) =>
//                         setFieldValue("category", value)
//                       }
//                       required
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-blue-100">
//                         {categories.map((category) => (
//                           <SelectItem
//                             className="hover:bg-blue-200 focus:bg-blue-300 cursor-pointer"
//                             key={category._id}
//                             value={category._id}
//                           >
//                             {category.category}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <ErrorMessage
//                       name="category"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-blue-50  hover:bg-black hover:text-white"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Adding..." : "Add Program"}
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* 🔍 Search bar */}
//       <div className="flex items-center gap-2">
//         <Search className="h-5 w-5 text-gray-500" />
//         <Input
//           type="text"
//           placeholder="Search programs..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setVisibleCount(10); // reset count on search
//           }}
//           className="max-w-sm"
//         />
//       </div>

//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <Card>
//         <CardHeader>
//           <CardTitle>Programs List</CardTitle>
//           <CardDescription>All programs in the system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="font-extrabold">SNo</TableHead>
//                 <TableHead className="font-extrabold">
//                   Program Name
//                 </TableHead>
//                 <TableHead className="font-extrabold ">Description</TableHead>
//                 <TableHead className="font-extrabold ">Category</TableHead>
//                 <TableHead className="font-extrabold">Created At</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {visiblePrograms.length > 0 ? (
//                 visiblePrograms.map((program, index) => (
//                   <TableRow key={program._id}>
//                     <TableCell className="font-medium">{index + 1}</TableCell>
//                     <TableCell className="font-medium">
//                       {program.programName.toUpperCase()}
//                     </TableCell>
//                     <TableCell>{program.description.toLowerCase()}</TableCell>
//                     <TableCell>{program.category?.category || "N/A"}</TableCell>
//                     <TableCell>
//                       {new Date(program.createdAt).toLocaleDateString()}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} className="text-center text-gray-500">
//                     No programs found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>

//           {/* 👇 View More button with fallback text */}
//           {filteredPrograms.length > 0 && (
//             <div className="flex justify-center mt-4">
//               {visibleCount < filteredPrograms.length ? (
//                 <Button onClick={() => setVisibleCount((prev) => prev + 10)}>
//                   View More
//                 </Button>
//               ) : (
//                 <p className="text-gray-500 text-sm">
//                   No more programs to show
//                 </p>
//               )}
//             </div>
//           )}
//           {/* 📊 Program Count */}
//           <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
//             <p>
//               Total Programs:{" "}
//               <span className="font-semibold">{programs.length}</span>
//             </p>
//             <p>
//               Showing{" "}
//               <span className="font-semibold">{visiblePrograms.length}</span> of{" "}
//               <span className="font-semibold">{filteredPrograms.length}</span>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// Programmanagement.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default Programmanagement;
