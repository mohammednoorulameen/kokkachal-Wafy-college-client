"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Plus, Loader2 } from "lucide-react"
import adminInstance from "@/axios/AdminInstance"
import toast, { Toaster } from "react-hot-toast"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"


  const Categorymanagement = ({ token }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  console.log(categories)

  // --- Fetch categories ---
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
  setLoading(true)
  try {
    const { data } = await adminInstance.get("/admin-get-categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (data.success) {
      setCategories(data.data)
    } else {
      setError(data.message)
      toast.error(data.message)
    }
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    setError("Failed to fetch categories")
    toast.error("Failed to fetch categories")
  } finally {
    setLoading(false)
  }
}
  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await adminInstance.get("/admin-get-categories", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setCategories(data);
  //   } catch {
  //     toast.error("Failed to fetch categories");
  //   }
  // };


  // --- Validation schema for Formik ---
  const CategorySchema = Yup.object().shape({
    category: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
  })

  // --- Add category handler ---
  const handleAddCategory = async (values, { resetForm }) => {
    try {
      const { data } = await adminInstance.post("/addcategory", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (data.success) {
        toast.success("Category added successfully")
        resetForm()
        setIsAddDialogOpen(false)
        fetchCategories() // Refresh after add
      } else {
        toast.error(data.message)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to add category")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-gray-600">Manage program categories</p>
        </div>

        {/* Add Category Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <DialogHeader className="text-gray-500 text-sm">
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new program category</DialogDescription>
            </DialogHeader>

            {/* Formik Form */}
            <Formik
              initialValues={{ category: "", description: "" }}
              validationSchema={CategorySchema}
              onSubmit={handleAddCategory}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category Name</Label>
                    <Field as={Input} id="category" name="category" placeholder="Enter category name" />
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Field as={Textarea} id="description" name="description" placeholder="Enter category description" />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>

                  <Button type="submit" className="w-full bg-blue-50  hover:bg-black hover:text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Category"}
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
          <CardDescription>All program categories in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium">{category.category.toUpperCase()}</TableCell>
                  <TableCell>{category.description.toLowerCase()}</TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}




// Add prop types validation
Categorymanagement.propTypes = {
  token: PropTypes.string.isRequired,
}



export default Categorymanagement