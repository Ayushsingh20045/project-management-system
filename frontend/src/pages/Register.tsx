import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../services/api";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuthStore } from "../store/authStore";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>();

    const onSubmit = async (data: RegisterForm) => {
        try {
            const res = await api.post("/auth/register", data);

            login(res.data.user, res.data.token);

            toast.success("Registration successful!");

            navigate("/dashboard");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <Card>
                    <h1 className="mb-2 text-3xl font-bold text-slate-800">
                        Create Account
                    </h1>

                    <p className="mb-8 text-slate-500">
                        Start managing your projects today.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <Input
                            label="Name"
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                        />

                        <Button disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;