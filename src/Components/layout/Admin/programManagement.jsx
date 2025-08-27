"use client"

import  { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Loader2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import adminInstance from "@/axios/AdminInstance"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"

export function ProgramManagement({ token }) {
  const [programs, setPrograms] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  console.log(programs)
  useEffect(() => {
    fetchPrograms()
    fetchCategories()
  }, [])
  
const fetchPrograms = async () => {
  setLoading(true);
  try {
    const { data } = await adminInstance.get("/admin-get-programs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setPrograms(data.data); // now data.data exists
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
      })
      if (data.success) {
        setCategories(data.data)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error("Failed to fetch categories")
    }
  }

  // Formik validation schema
  const ProgramSchema = Yup.object().shape({
    programName: Yup.string().required("Program name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  })

  const handleAddProgram = async (values, { resetForm }) => {
    try {
      const { data } = await adminInstance.post("/addprogram", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (data.success) {
        toast.success("Program added successfully")
        setPrograms([...programs, data.data])
        resetForm()
        setIsAddDialogOpen(false)
      } else {
        toast.error(data.message)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to add program")
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
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
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

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Program"}
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

      <Card>
        <CardHeader>
          <CardTitle>Programs List</CardTitle>
          <CardDescription>All programs in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program._id}>
                  <TableCell className="font-medium">{program.programName}</TableCell>
                  <TableCell>{program.description}</TableCell>
                  <TableCell>
                    {categories.find((c) => c._id === program.category)?.category || "N/A"}
                  </TableCell>
                  <TableCell>{new Date(program.createdAt).toLocaleDateString()}</TableCell>
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
 ProgramManagement.propTypes = {
   token: PropTypes.string.isRequired,
 }