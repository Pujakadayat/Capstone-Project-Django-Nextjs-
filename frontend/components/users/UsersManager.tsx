// // "use client";

// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { useUsers } from "@/hooks/useUsers";
// // import UserForm from "@/components/users/UserForm";
// // import { useState } from "react";

// // export default function UsersManager() {
// //   const { users, isLoading, isError } = useUsers();
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
// //         <div>
// //           <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
// //             Access
// //           </p>
// //           <h1 className="text-2xl font-bold text-slate-900">User management</h1>
// //         </div>
// //         <Dialog open={open} onOpenChange={setOpen}>
// //           <DialogTrigger asChild>
// //             <Button className="rounded-lg bg-slate-900 hover:bg-teal-900">
// //               Add user
// //             </Button>
// //           </DialogTrigger>
// //           <DialogContent className="max-w-lg rounded-xl max-h-[90vh] overflow-y-auto">
// //             <DialogHeader>
// //               <DialogTitle>Create staff / customer</DialogTitle>
// //             </DialogHeader>
// //             <UserForm
// //               onSuccess={() => {
// //                 setOpen(false);
// //               }}
// //             />
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       {isLoading && <p className="text-sm text-slate-500">Loading users…</p>}
// //       {isError && (
// //         <p className="text-sm text-red-600">Could not load directory.</p>
// //       )}

// //       {!isLoading && !isError && (
// //         <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
// //           <Table>
// //             <TableHeader>
// //               <TableRow className="bg-slate-50">
// //                 <TableHead className="text-xs uppercase">Name</TableHead>
// //                 <TableHead className="text-xs uppercase">Email</TableHead>
// //                 <TableHead className="text-xs uppercase">Phone</TableHead>
// //                 <TableHead className="text-xs uppercase">Role</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {users.map((u) => (
// //                 <TableRow key={u.id}>
// //                   <TableCell className="font-medium">{u.full_name}</TableCell>
// //                   <TableCell className="text-sm">{u.email}</TableCell>
// //                   <TableCell className="text-sm">{u.phone_number}</TableCell>
// //                   <TableCell className="text-xs font-semibold">{u.role}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useUsers } from "@/hooks/useUsers";
// import UserForm from "@/components/users/UserForm";
// import { useState } from "react";
// import { User } from "@/types/user";

// export default function UsersManager() {
//   const { users, isLoading, isError, createUsers, updateUsers, deleteUsers } =
//     useUsers();

//   const [openCreate, setOpenCreate] = useState(false);
//   const [editUser, setEditUser] = useState<User | null>(null);

//   // DELETE HANDLER
//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this user?")) {
//       deleteUsers.mutate(id);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
//         <div>
//           <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
//             Access
//           </p>
//           <h1 className="text-2xl font-bold text-slate-900">User management</h1>
//         </div>

//         {/* CREATE USER */}
//         <Dialog open={openCreate} onOpenChange={setOpenCreate}>
//           <DialogTrigger asChild>
//             <Button className="rounded-lg bg-slate-900 hover:bg-teal-900">
//               Add user
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-lg rounded-xl">
//             <DialogHeader>
//               <DialogTitle>Create User</DialogTitle>
//               <DialogDescription>
//                 Fill in the details to create a new user.
//               </DialogDescription>
//             </DialogHeader>

//             <UserForm
//               onSubmit={(data) => createUsers.mutate(data)}
//               onSuccess={() => setOpenCreate(false)}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* STATES */}
//       {isLoading && <p className="text-sm text-slate-500">Loading users…</p>}
//       {isError && (
//         <p className="text-sm text-red-600">Could not load directory.</p>
//       )}

//       {/* TABLE */}
//       {!isLoading && !isError && (
//         <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-slate-50">
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {users.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center text-sm">
//                     No users found
//                   </TableCell>
//                 </TableRow>
//               )}

//               {users.map((u) => (
//                 <TableRow key={u.id} className="hover:bg-slate-50">
//                   <TableCell>{u.full_name ?? "—"}</TableCell>
//                   <TableCell>{u.email}</TableCell>
//                   <TableCell>{u.phone_number ?? "—"}</TableCell>
//                   <TableCell>
//                     <span className="rounded bg-slate-100 px-2 py-1 text-xs">
//                       {u.role}
//                     </span>
//                   </TableCell>

//                   {/* 🔥 ACTIONS */}
//                   <TableCell className="flex gap-2">
//                     {/* EDIT */}
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setEditUser(u)}
//                     >
//                       Edit
//                     </Button>

//                     {/* DELETE */}
//                     <Button
//                       size="sm"
//                       variant="destructive"
//                       onClick={() => {
//                         console.log("Deleting:", u.id); // DEBUG
//                         deleteUsers.mutate(u.id);
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       {/* EDIT DIALOG */}
//       <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
//         <DialogContent className="max-w-lg rounded-xl">
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//             <DialogDescription>
//               Fill in the details to create a new user.
//             </DialogDescription>
//           </DialogHeader>

//           {editUser && (
//             <UserForm
//               defaultValues={editUser}
//               onSubmit={(data) =>
//                 updateUsers.mutate({
//                   id: editUser.id,
//                   data,
//                 })
//               }
//               onSuccess={() => setEditUser(null)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserForm from "@/components/users/UserForm";
import { Edit3, Trash2 } from "lucide-react";

export default function UsersManager() {
  const { users, isLoading, isError, deleteUsers, updateUsers, createUsers } =
    useUsers();

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditOpen(true);
  };

  // const handleDelete = (user: User) => {
  //   deleteUsers.mutate(user.id, {
  //     onSuccess: () =>
  //       toast.success(`${user.full_name ?? user.email} deleted.`),
  //     onError: () => toast.error("Failed to delete user."),
  //   });
  // };

  const handleDelete = (user: User) => {
    deleteUsers.mutate(user.id, {
      onSuccess: () =>
        toast.success(`${user.full_name ?? user.email} deleted.`),
      onError: () => toast.error("Failed to delete User."),
    });
  };
  if (isLoading)
    return <p className="p-8 text-sm text-gray-500">Loading directory...</p>;
  if (isError)
    return <p className="p-8 text-sm text-red-500">Could not load users.</p>;

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
        <div>
          <p className="text-[10px] uppercase text-gray-400 mb-1">Access</p>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="rounded-none bg-black hover:bg-gray-800 text-white"
        >
          + Add User
        </Button>
      </div>

      {/* CREATE DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="rounded-none max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold">Add New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={(data) => createUsers.mutate(data)}
            onSuccess={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog
        open={editOpen}
        onOpenChange={(o) => {
          setEditOpen(o);
          if (!o) setEditUser(null);
        }}
      >
        <DialogContent className="rounded-none max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold">Edit User</DialogTitle>
          </DialogHeader>
          {editUser && (
            <UserForm
              defaultValues={editUser}
              onSubmit={(data) => updateUsers.mutate({ id: editUser.id, data })}
              onSuccess={() => {
                setEditOpen(false);
                setEditUser(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* USERS TABLE */}
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            {["Name", "Email", "Role", "Phone", "Action"].map((h) => (
              <TableHead
                key={h}
                className="text-[10px] font-bold uppercase text-slate-500"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow
                key={u.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="font-semibold text-sm py-3">
                  {u.full_name ?? "-"}
                </TableCell>
                <TableCell className="text-gray-500 text-sm py-3">
                  {u.email}
                </TableCell>
                <TableCell className="text-sm py-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {u.role}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-sm py-3">
                  {u.phone_number ?? "-"}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => handleEdit(u)}
                      className="text-[10px] font-bold uppercase border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                    >
                      Edit
                    </button> */}
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => handleEdit(u)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-bold">
                            Delete User
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm text-gray-500">
                            Are you sure you want to delete{" "}
                            <strong>{u.full_name ?? u.email}</strong>? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-none">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(u)}
                            disabled={deleteUsers.isPending}
                            className="rounded-none bg-red-500 hover:bg-red-600 text-white"
                          >
                            {deleteUsers.isPending ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
