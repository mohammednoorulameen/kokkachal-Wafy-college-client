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
import { Plus, Edit, Award, Loader2 } from "lucide-react";
import adminInstance from "@/axios/AdminInstance";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

const TEAMS = ["GROUP-A", "GROUP-B", "GROUP-C"];

const UserManagement = ({ token }) => {
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
  // New state for program search term
  const [programSearchTerm, setProgramSearchTerm] = useState("");

  // Fetch all necessary data on component mount
  useEffect(() => {
    (async () => {
      await Promise.all([fetchUsers(), fetchCategories(), fetchPrograms()]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- API calls ---
  const fetchUsers = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUsers(data.data);
      else toast.error(data.message || "Failed to fetch users");
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setCategories(data.data);
      else toast.error(data.message || "Failed to fetch categories");
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchPrograms = async () => {
    try {
      const { data } = await adminInstance.get("/admin-get-programs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setPrograms(data.data);
      else toast.error(data.message || "Failed to fetch programs");
    } catch {
      toast.error("Failed to fetch programs");
    }
  };

  // --- Validation Schemas ---
  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    chessNumber: Yup.string().required("Chess Number is required"),
    points: Yup.number()
      .min(0, "Points cannot be negative")
      .required("Points is required"),
    team: Yup.string()
      .oneOf(TEAMS, "Invalid team")
      .required("Team is required"),
    categories: Yup.array().min(1, "Select at least one category"),
    programs: Yup.array().min(1, "Pick at least one program"),
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
        await fetchUsers();
        resetForm();
        setIsAddDialogOpen(false);
        toast.success("User added successfully!");
      } else {
        toast.error(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to add user. Check required fields or duplicates."
      );
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
        setUsers((prev) =>
          prev.map((u) => (u._id === selectedUser._id ? data.data : u))
        );
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        toast.success("User updated successfully!");
      } else {
        toast.error(data.message || "Failed to update user");
      }
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
        setUsers((prev) =>
          prev.map((u) => (u._id === selectedUser._id ? data.data : u))
        );
        setIsPointsDialogOpen(false);
        setSelectedUser(null);
        toast.success("Points added successfully!");
      } else {
        toast.error(data.message || "Failed to add points");
      }
    } catch {
      toast.error("Failed to add points");
    }
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setProgramSearchTerm(""); // Reset program search term on opening dialog
    setIsEditDialogOpen(true);
  };

  const openPointsDialog = (user) => {
    setSelectedUser(user);
    setIsPointsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.chessNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleUsers = searchTerm
    ? filteredUsers
    : users.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">
            Manage users, update info, and add points
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
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account</DialogDescription>
            </DialogHeader>

            <Formik
              initialValues={{
                name: "",
                email: "",
                chessNumber: "",
                points: 0,
                team: "",
                categories: [],
                programs: [],
              }}
              validationSchema={UserSchema}
              onSubmit={handleAddUser}
            >
              {/* {({ errors, touched, setFieldValue, values }) => {
                const availablePrograms = programs.filter((p) => {
                  const catId = typeof p.category === "object" ? p.category?._id : p.category;
                  return values.categories.includes(catId) && p.programName.toLowerCase().includes(programSearchTerm.toLowerCase());
                }); */}

              {({ values, errors, touched, setFieldValue }) => {
                const availablePrograms = programs
                  .filter((p) => {
                    const catId =
                      typeof p.category === "object"
                        ? p.category?._id
                        : p.category;

                    return (
                      values.categories.includes(catId) &&
                      p.programName
                        .toLowerCase()
                        .includes(programSearchTerm.toLowerCase())
                    );
                  })

                  .sort((a, b) => {
                    const aChecked = values.programs.includes(a._id);
                    const bChecked = values.programs.includes(b._id);

                    return aChecked === bChecked ? 0 : aChecked ? -1 : 1;
                  });

                return (
                  <Form className="space-y-4">
                    {/* ... other form fields (name, chessNumber, email, points, team) */}
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Field id="name" name="name" as={Input} />
                      {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="chessNumber">Chess Number</Label>
                      <Field id="chessNumber" name="chessNumber" as={Input} />
                      {errors.chessNumber && touched.chessNumber && (
                        <div className="text-red-500">{errors.chessNumber}</div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Field id="email" name="email" type="email" as={Input} />
                      {errors.email && touched.email && (
                        <div className="text-red-500">{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="points">Initial Points</Label>
                      <Field
                        id="points"
                        name="points"
                        type="number"
                        as={Input}
                      />
                      {errors.points && touched.points && (
                        <div className="text-red-500">{errors.points}</div>
                      )}
                    </div>
                    <div>
                      <Label>Team</Label>
                      <Field
                        as="select"
                        name="team"
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option value="">Select a team</option>
                        {TEAMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Field>
                      {errors.team && touched.team && (
                        <div className="text-red-500">{errors.team}</div>
                      )}
                    </div>

                    {/* Multiple Categories */}
                    <div>
                      <Label>Categories</Label>
                      <div className="max-h-32 overflow-y-auto border rounded p-2">
                        {categories.map((c) => (
                          <div key={c._id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={values.categories.includes(c._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("categories", [
                                    ...values.categories,
                                    c._id,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "categories",
                                    values.categories.filter(
                                      (id) => id !== c._id
                                    )
                                  );
                                  setFieldValue(
                                    "programs",
                                    values.programs.filter((pid) => {
                                      const prog = programs.find(
                                        (p) => p._id === pid
                                      );
                                      const catId =
                                        typeof prog?.category === "object"
                                          ? prog?.category?._id
                                          : prog?.category;
                                      return catId !== c._id;
                                    })
                                  );
                                }
                              }}
                            />
                            <span>{c.category}</span>
                          </div>
                        ))}
                      </div>
                      {errors.categories && touched.categories && (
                        <div className="text-red-500">{errors.categories}</div>
                      )}
                    </div>

                    {/* Programs from all selected categories */}
                    <div>
                      <Label>Programs</Label>
                      {values.categories.length > 0 && (
                        <Input
                          type="text"
                          placeholder="Search programs..."
                          value={programSearchTerm}
                          onChange={(e) => setProgramSearchTerm(e.target.value)}
                          className="mb-2"
                        />
                      )}
                      <div className="max-h-40 overflow-y-auto border rounded p-2">
                        {availablePrograms.map((p) => (
                          <div key={p._id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={values.programs.includes(p._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("programs", [
                                    ...values.programs,
                                    p._id,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "programs",
                                    values.programs.filter((id) => id !== p._id)
                                  );
                                }
                              }}
                            />
                            <span>
                              {p.programName} (
                              {
                                categories.find(
                                  (c) =>
                                    c._id ===
                                    (typeof p.category === "object"
                                      ? p.category?._id
                                      : p.category)
                                )?.category
                              }
                              )
                            </span>
                          </div>
                        ))}
                        {availablePrograms.length === 0 && (
                          <div className="text-gray-500 text-sm mt-1">
                            {values.categories.length === 0
                              ? "Select categories to see programs"
                              : "No programs found for this search/category."}
                          </div>
                        )}
                      </div>
                      {errors.programs && touched.programs && (
                        <div className="text-red-500">{errors.programs}</div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-50 hover:bg-black hover:text-white"
                    >
                      Add User
                    </Button>
                  </Form>
                );
              }}
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
          className="max-w-xs"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>All registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SNO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Chess Number</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name.toUpperCase()}</TableCell>
                  <TableCell>{user.chessNumber}</TableCell>
                  <TableCell>{user.team || "-"}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>{user.programs?.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => openEditDialog(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => openPointsDialog(user)}>
                        <Award className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!searchTerm && visibleCount < users.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setVisibleCount((c) => c + 10)}>
                View More
              </Button>
            </div>
          )}
          {/* 📊 Program Count */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <p>
              Total Programs:{" "}
              <span className="font-semibold">{users.length}</span>
            </p>
            <p>
              Showing{" "}
              <span className="font-semibold">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold">{filteredUsers.length}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Edit the user details</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <Formik
              key={selectedUser._id}
              initialValues={{
                name: selectedUser.name || "",
                email: selectedUser.email || "",
                chessNumber: selectedUser.chessNumber || "",
                points: selectedUser.points || 0,
                team: selectedUser.team || "",
                categories:
                  selectedUser.categories?.map((c) =>
                    typeof c === "object" ? c._id : c
                  ) || [],
                programs:
                  selectedUser.programs?.map((p) =>
                    typeof p === "object" ? p._id : p
                  ) || [],
              }}
              validationSchema={UserSchema}
              onSubmit={handleUpdateUser}
            >
              {/* {({ values, errors, touched, setFieldValue }) => {
                const availablePrograms = programs.filter((p) => {
                  const catId = typeof p.category === "object" ? p.category?._id : p.category;
                  return values.categories.includes(catId) && p.programName.toLowerCase().includes(programSearchTerm.toLowerCase());
                }); */}

              {({ values, errors, touched, setFieldValue }) => {
                const availablePrograms = programs
                  .filter((p) => {
                    const catId =
                      typeof p.category === "object"
                        ? p.category?._id
                        : p.category;

                    return (
                      values.categories.includes(catId) &&
                      p.programName
                        .toLowerCase()
                        .includes(programSearchTerm.toLowerCase())
                    );
                  })

                  .sort((a, b) => {
                    const aChecked = values.programs.includes(a._id);
                    const bChecked = values.programs.includes(b._id);

                    return aChecked === bChecked ? 0 : aChecked ? -1 : 1;
                  });

                return (
                  <Form className="space-y-4">
                    {/* ... other form fields (name, email, chessNumber, points, team) */}
                    <div>
                      <Label>Name</Label>
                      <Field name="name" as={Input} />
                      {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Field name="email" type="email" as={Input} />
                      {errors.email && touched.email && (
                        <div className="text-red-500">{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <Label>Chess Number</Label>
                      <Field name="chessNumber" as={Input} />
                      {errors.chessNumber && touched.chessNumber && (
                        <div className="text-red-500">{errors.chessNumber}</div>
                      )}
                    </div>
                    <div>
                      <Label>Points</Label>
                      <Field name="points" type="number" as={Input} />
                      {errors.points && touched.points && (
                        <div className="text-red-500">{errors.points}</div>
                      )}
                    </div>
                    <div>
                      <Label>Team</Label>
                      <Field
                        as="select"
                        name="team"
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option value="">Select a team</option>
                        {TEAMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Field>
                      {errors.team && touched.team && (
                        <div className="text-red-500">{errors.team}</div>
                      )}
                    </div>

                    {/* Multiple Categories */}
                    <div>
                      <Label>Categories</Label>
                      <div className="max-h-32 overflow-y-auto border rounded p-2">
                        {categories.map((c) => (
                          <div key={c._id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={values.categories.includes(c._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("categories", [
                                    ...values.categories,
                                    c._id,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "categories",
                                    values.categories.filter(
                                      (id) => id !== c._id
                                    )
                                  );
                                  setFieldValue(
                                    "programs",
                                    values.programs.filter((pid) => {
                                      const prog = programs.find(
                                        (p) => p._id === pid
                                      );
                                      const catId =
                                        typeof prog?.category === "object"
                                          ? prog?.category?._id
                                          : prog?.category;
                                      return catId !== c._id;
                                    })
                                  );
                                }
                              }}
                            />
                            <span>{c.category}</span>
                          </div>
                        ))}
                      </div>
                      {errors.categories && touched.categories && (
                        <div className="text-red-500">{errors.categories}</div>
                      )}
                    </div>

                    {/* Programs from selected categories */}
                    <div>
                      <Label>Programs</Label>
                      {values.categories.length > 0 && (
                        <Input
                          type="text"
                          placeholder="Search programs..."
                          value={programSearchTerm}
                          onChange={(e) => setProgramSearchTerm(e.target.value)}
                          className="mb-2"
                        />
                      )}
                      <div className="max-h-40 overflow-y-auto border rounded p-2">
                        {availablePrograms.map((p) => (
                          <div key={p._id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={values.programs.includes(p._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue("programs", [
                                    ...values.programs,
                                    p._id,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "programs",
                                    values.programs.filter((id) => id !== p._id)
                                  );
                                }
                              }}
                            />
                            <span>
                              {p.programName} (
                              {
                                categories.find(
                                  (c) =>
                                    c._id ===
                                    (typeof p.category === "object"
                                      ? p.category?._id
                                      : p.category)
                                )?.category
                              }
                              )
                            </span>
                          </div>
                        ))}
                        {availablePrograms.length === 0 && (
                          <div className="text-gray-500 text-sm mt-1">
                            {values.categories.length === 0
                              ? "Select categories to see programs"
                              : "No programs found for this search/category."}
                          </div>
                        )}
                      </div>
                      {errors.programs && touched.programs && (
                        <div className="text-red-500">{errors.programs}</div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white"
                    >
                      Update User
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Points Dialog */}
      <Dialog open={isPointsDialogOpen} onOpenChange={setIsPointsDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Add Points</DialogTitle>
            <DialogDescription>
              Add points to {selectedUser?.name}&apos;s account
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Formik
              initialValues={{ points: 0 }}
              validationSchema={AddPointsSchema}
              onSubmit={handleAddPoints}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <Label>Points</Label>
                  <Field name="points" type="number" as={Input} />
                  {errors.points && touched.points && (
                    <div className="text-red-500">{errors.points}</div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-white"
                  >
                    Add Points
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

UserManagement.propTypes = {
  token: PropTypes.string.isRequired,
};

export default UserManagement;
