import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    // Mock Login
    if (data.email === 'admin@lady2.com') {
        setAuth({ id: '1', name: 'Admin User', email: data.email, role: 'ADMIN' }, 'mock-token');
        navigate('/admin');
    } else {
        setAuth({ id: '2', name: 'Jane Doe', email: data.email, role: 'CUSTOMER' }, 'mock-token');
        navigate('/');
    }
  };

  return (
    <div className="container py-24 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input {...register('email')} placeholder="Email" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register('password')} placeholder="Password" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" size="lg">Login</Button>

        <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
