"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";
import { Role, User } from "@/types/user";

const schema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(Role),
  phone_number: z
    .string()
    .min(10, "Min 10 digits")
    .optional()
    .or(z.literal("")),
  password: z.string().min(5, "Min 5 characters").optional().or(z.literal("")),
});

type GenericForm = z.infer<typeof schema>;

interface UserFormProps {
  user?: User;
  onSubmit?: (data: User) => void;
  onSuccess?: () => void;
}

function UserForm({ user, onSuccess }: UserFormProps) {
  const { createUsers, updateUsers } = useUsers();
  const isEdit = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenericForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: user?.full_name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? Role.CUSTOMER,
      phone_number: user?.phone_number ?? "",
      password: "",
    },
  });

  const submitData = (data: GenericForm) => {
    const payload: Partial<GenericForm> = { ...data };
    if (!payload.password) delete payload.password;

    const mutation = isEdit
      ? updateUsers.mutate(
          { id: user!.id, data: payload },
          {
            onSuccess: () => {
              toast.success("User updated.");
              reset();
              onSuccess?.();
            },
            onError: () => toast.error("Failed to update user."),
          },
        )
      : createUsers.mutate(payload, {
          onSuccess: () => {
            toast.success("User created.");
            reset();
            onSuccess?.();
          },
          onError: () => toast.error("Failed to create user."),
        });
  };

  const isPending = createUsers.isPending || updateUsers.isPending;

  const input =
    "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black";
  const label = "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";
  const error = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <label className={label}>Full Name</label>
      <input
        type="text"
        placeholder="Jane Smith"
        {...register("full_name")}
        className={input}
      />
      {errors.full_name && <p className={error}>{errors.full_name.message}</p>}

      <label className={label}>Email</label>
      <input
        type="email"
        placeholder="test@company.com"
        {...register("email")}
        className={input}
      />
      {errors.email && <p className={error}>{errors.email.message}</p>}

      <label className={label}>
        Phone
        <span className="normal-case font-normal text-gray-400">
          (optional)
        </span>
      </label>
      <input
        type="text"
        placeholder="9812345678"
        {...register("phone_number")}
        className={input}
      />
      {errors.phone_number && (
        <p className={error}>{errors.phone_number.message}</p>
      )}

      <label className={label}>Role</label>
      <select {...register("role")} className={input}>
        <option value={Role.CUSTOMER}>Customer</option>
        <option value={Role.STAFF}>Staff</option>
        <option value={Role.ADMIN}>Admin</option>
      </select>

      <label className={label}>
        Password
        {isEdit && (
          <span className="normal-case font-normal text-gray-400">
            (blank = keep current)
          </span>
        )}
      </label>
      <input
        type="password"
        placeholder="Min 5 characters"
        {...register("password")}
        className={input}
      />
      {errors.password && <p className={error}>{errors.password.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 py-2 text-xs font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
      >
        {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create User"}
      </button>
    </form>
  );
}

export default UserForm;
