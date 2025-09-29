import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Head } from '@/lib/document-head';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Settings, Mail, Tag } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '@/api/profile';
import { updateUserPreferences } from '@/api/preferences';
import { CategorySelectionModal } from '@/components/ui/category-selection-modal';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function Profile() {
  const queryClient = useQueryClient();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Queries
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
  });

  // Debug: Vamos ver o que está chegando do backend
  useEffect(() => {
    if (profileData) {
      console.log('📊 Profile Data:', profileData);
      console.log('👤 User:', profileData.user);
      console.log('🏷️ Preferences:', profileData.preferences);
      console.log('📝 Preferences length:', profileData.preferences?.length);
    }
  }, [profileData]);

  // Form setup
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Update profile mutation
  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar perfil. Tente novamente.');
    },
  });

  // Update preferences mutation
  const { mutateAsync: updatePreferences, isPending: isUpdatingPreferences } = useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast.success('Preferências atualizadas com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar preferências. Tente novamente.');
    },
  });

  // Set form values when profile loads
  useEffect(() => {
    if (profileData?.user) {
      setValue('name', profileData.user.name);
    }
  }, [profileData, setValue]);

  // Set selected categories when profile loads
  useEffect(() => {
    if (profileData?.preferences) {
      const selected = profileData.preferences.map(pref => parseInt(pref.id));
      setSelectedCategories(selected);
    }
  }, [profileData]);

  // Handle profile form submission
  async function handleProfileSubmit(data: ProfileFormData) {
    try {
      await updateProfile(data);
    } catch (error) {
      // Error handling is done in the mutation
    }
  }

  // Handle category selection
  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Handle preferences update
  const handlePreferencesUpdate = async () => {
    if (!profileData?.user?.id) return;
    
    try {
      await updatePreferences({ 
        userId: profileData.user.id,
        categoryIds: selectedCategories 
      });
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  // Handle category modal save
  const handleCategoryModalSave = async (newSelectedCategories: number[]) => {
    if (!profileData?.user?.id) return;
    
    setSelectedCategories(newSelectedCategories);
    try {
      await updatePreferences({ 
        userId: profileData.user.id,
        categoryIds: newSelectedCategories 
      });
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <>
      <Head 
        title="Perfil do Usuário"
        meta={[
          { name: "description", content: "Gerencie seu perfil e preferências" },
          { name: "robots", content: "noindex, nofollow" }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Meu Perfil
            </h1>
            <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Profile Information Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                </div>
                <CardDescription>
                  Atualize seus dados pessoais
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {isLoadingProfile ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    {/* Email (read-only) */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        E-mail
                      </Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <span className="text-gray-700">{profileData?.user?.email}</span>
                      </div>
                      <p className="text-xs text-gray-500">O e-mail não pode ser alterado</p>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          type="text"
                          {...register('name')}
                          className="focus:ring-blue-500"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                      </Button>
                    </form>

                    {/* Account Info */}
                    {profileData?.user && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Conta criada em: {formatDate(profileData.user.createdAt)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Preferences Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-xl">Preferências de Categorias</CardTitle>
                </div>
                <CardDescription>
                  Escolha as categorias de notícias que mais te interessam
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {isLoadingProfile ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Lista de categorias atuais */}
                    {profileData?.preferences && profileData.preferences.length > 0 && (
                      <>
                        <div className="border border-gray-200 rounded-lg bg-gray-50/50">
                          <ScrollArea className="h-80 w-full p-4">
                            <div className="space-y-3 pr-4">
                              {profileData.preferences.map((preference) => {
                                const categoryId = parseInt(preference.id);
                                const isSelected = selectedCategories.includes(categoryId);
                                return (
                                  <div
                                    key={preference.id}
                                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Checkbox
                                        id={`preference-${preference.id}`}
                                        checked={isSelected}
                                        onCheckedChange={() => handleCategoryToggle(categoryId)}
                                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-transparent"
                                      />
                                      <div className="flex items-center gap-2 flex-1">
                                        <Tag className="h-4 w-4 text-gray-500" />
                                        <Label
                                          htmlFor={`preference-${preference.id}`}
                                          className="text-sm font-medium cursor-pointer flex-1"
                                        >
                                          {preference.name}
                                        </Label>
                                      </div>
                                    </div>
                                    {preference.description && (
                                      <p className="text-sm text-gray-500 mt-2 ml-8">
                                        {preference.description}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </div>

                        <Separator />
                      </>
                    )}

                    {/* Sem preferências */}
                    {profileData?.preferences && profileData.preferences.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Você ainda não selecionou nenhuma categoria.</p>
                        <p className="text-xs mt-2">Clique em "Selecionar Categorias" para começar!</p>
                      </div>
                    )}

                    {/* Botões sempre visíveis */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{selectedCategories.length}</span> de{' '}
                        <span className="font-medium">{profileData?.preferences?.length || 0}</span> categorias selecionadas
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsCategoryModalOpen(true)}
                          variant="outline"
                        >
                          {profileData?.preferences && profileData.preferences.length > 0 ? 'Alterar Categorias' : 'Selecionar Categorias'}
                        </Button>
                        
                        {profileData?.preferences && profileData.preferences.length > 0 && (
                          <Button
                            onClick={handlePreferencesUpdate}
                            disabled={isUpdatingPreferences}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            {isUpdatingPreferences ? 'Salvando...' : 'Salvar Preferências'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleCategoryModalSave}
        currentPreferences={selectedCategories}
        isLoading={isUpdatingPreferences}
      />
    </>
  );
}