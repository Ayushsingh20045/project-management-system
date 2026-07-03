import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../services/api";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuthStore } from "../store/authStore";

interface LoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await api.post("/auth/login", data);

            login(res.data.user, res.data.token);

            toast.success("Welcome back!");

            navigate("/dashboard");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Login failed"
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
                        Welcome Back
                    </h1>

                    <p className="mb-8 text-slate-500">
                        Sign in to continue to TaskFlow.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button disabled={isSubmitting}>
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600"
                        >
                            Register
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;