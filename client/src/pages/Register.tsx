import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterForm) => {
    // Mock Register
    setAuth({ id: '3', name: data.name, email: data.email, role: 'CUSTOMER' }, 'mock-token');
    navigate('/');
  };

  return (
    <div className="container py-24 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input {...register('name')} placeholder="Name" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

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

        <Button type="submit" className="w-full" size="lg">Register</Button>

        <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
