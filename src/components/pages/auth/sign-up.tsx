import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { Head } from "../../../lib/document-head";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/sign-up";
import { useEffect } from "react";
import { AuthService } from "@/lib/auth-service";

const signUpForm = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(100),
  confirmPassword: z.string().min(6).max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpForm),
  });

  // Redireciona se já estiver logado
  useEffect(() => {
    const checkAndRedirect = async () => {
      if (await AuthService.isAuthenticated()) {
        navigate('/dashboard', { replace: true });
      }
    };
    
    checkAndRedirect();
  }, [navigate]);

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpFormData) {
    try {
      await createAccount({ 
        name: data.name, 
        email: data.email, 
        password: data.password 
      });

      toast.success('Conta criada com sucesso!');
      navigate('/sign-in');
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.');
    }
  }

  return (
    <>
      <Head 
        title="Cadastro"
        meta={[
          { name: "description", content: "Sign in to your newsletter account" },
          { name: "robots", content: "noindex, nofollow" }
        ]}
      />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in" className="text-sm text-muted-foreground hover:text-blue-600 transition-colors">
            Já tem conta? <span className="text-blue-600 underline">Fazer login</span>
          </Link>
        </Button>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-8">
          <div className="w-[350px] mx-auto flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Criar Conta
            </h1>
            <p className="text-sm text-gray-600">Comece a receber nossas novidades.</p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4"> 
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input 
                id="name" 
                type="text" 
                {...register('name')}
                placeholder="Digite seu nome completo"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input 
                id="email" 
                type="email" 
                {...register('email')}
                placeholder="Digite seu e-mail"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input 
                id="password" 
                type="password" 
                {...register('password')}
                placeholder="Digite sua senha"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                {...register('confirmPassword')}
                placeholder="Confirme sua senha"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" type="submit">
              {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}