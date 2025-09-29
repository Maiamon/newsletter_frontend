import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { Head } from "../../../lib/document-head";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";
import { useEffect } from "react";
import { AuthService } from "@/lib/auth-service";

const signInForm = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

type SignInFormData = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInFormData>();

  // Redireciona se já estiver logado
  useEffect(() => {
    const checkAndRedirect = async () => {
      if (await AuthService.isAuthenticated()) {
        navigate('/dashboard', { replace: true });
      }
    };
    
    checkAndRedirect();
  }, [navigate]);

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInFormData) {
    try {
      const response = await authenticate({ email: data.email, password: data.password });
      
      // Salva os dados de autenticação usando o AuthService
      // Assumindo que a resposta contenha user data também
      AuthService.setAuth(response.token, response.user);

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard'); // Redireciona para o dashboard após login
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  }

  return (
    <>
      <Head 
        title="Login"
        meta={[
          { name: "description", content: "Sign in to your newsletter account" },
          { name: "robots", content: "noindex, nofollow" }
        ]}
      />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-up" className="text-sm text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300">
            Não tem conta? <span className="text-blue-600 underline hover:text-purple-600 transition-colors">Crie uma agora</span>
          </Link>
        </Button>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8">
          <div className="w-[350px] mx-auto flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Acessar Notícias
            </h1>
            <p className="text-sm text-gray-600">Acompanhe suas newsletters de forma fácil e rápida.</p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4"> 
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" type="submit">
              Acessar Notícias
            </Button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}