/**
 * Documentação das rotas atualizadas do backend
 * 
 * === ROTAS DE AUTENTICAÇÃO ===
 * 
 * POST /auth/register
 * - Registro de usuário
 * - Body: { name: string, email: string, password: string }
 * - Response: { id, name, email, token? }
 * 
 * POST /auth/login  
 * - Login de usuário
 * - Body: { email: string, password: string }
 * - Response: { token: string, user?: { id, name, email } }
 * 
 * === ROTAS DE NOTÍCIAS (protegidas) ===
 * 
 * GET /news
 * - Buscar notícias (requer autenticação)
 * - Query params: { page: number, limit: number, period?: 'day'|'week'|'month', category?: string }
 * - Response: { news: News[], totalPages: number, totalItems: number, currentPage: number }
 * 
 * PERÍODOS (baseado em "últimos X dias"):
 * - 'day': últimas 24 horas (desde agora - 24h)
 * - 'week': últimos 7 dias (desde agora - 7 dias)  
 * - 'month': últimos 30 dias (desde agora - 30 dias)
 * 
 * GET /news/:id
 * - Obter detalhes de uma notícia específica
 * - Response: News (single object)
 * 
 * === ROTAS DE CATEGORIAS (protegidas) ===
 * 
 * GET /categories
 * - Buscar todas as categorias disponíveis
 * - Response: { categories: Category[], totalCount: number } onde Category = { id: number, name: string }
 * 
 * === MIDDLEWARE DE AUTENTICAÇÃO ===
 * 
 * // Exemplo Fastify
 * const authMiddleware = async (request, reply) => {
 *   try {
 *     const token = request.headers.authorization?.replace('Bearer ', '');
 *     if (!token) throw new Error('Token não fornecido');
 *     
 *     const decoded = jwt.verify(token, process.env.JWT_SECRET);
 *     request.user = decoded;
 *   } catch (error) {
 *     reply.status(401).send({ error: 'Token inválido' });
 *   }
 * };
 * 
 * // Aplicar middleware
 * app.register(async function (fastify) {
 *   fastify.addHook('preHandler', authMiddleware);
 *   
 *   fastify.get('/news', searchNews);
 *   fastify.get('/news/:id', getNewsDetail);
 *   fastify.get('/categories', getCategories);
 * });
 * 
 * === EXEMPLO DE IMPLEMENTAÇÃO DOS PERÍODOS ===
 * 
 * // Função para calcular data de início baseada no período
 * const getPeriodStartDate = (period) => {
 *   const now = new Date();
 *   
 *   switch (period) {
 *     case 'day':
 *       // Últimas 24 horas
 *       return new Date(now.getTime() - 24 * 60 * 60 * 1000);
 *     
 *     case 'week':
 *       // Últimos 7 dias
 *       return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 *     
 *     case 'month':
 *       // Últimos 30 dias
 *       return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
 *     
 *     default:
 *       return null; // Sem filtro de período
 *   }
 * };
 * 
 * // Exemplo de uso na rota /news
 * app.get('/news', async (request, reply) => {
 *   const { page = 1, limit = 10, period, category } = request.query;
 *   
 *   const whereConditions = [];
 *   
 *   // Filtro por período
 *   if (period) {
 *     const startDate = getPeriodStartDate(period);
 *     if (startDate) {
 *       whereConditions.push(`published_at >= '${startDate.toISOString()}'`);
 *     }
 *   }
 *   
 *   // Filtro por categoria
 *   if (category) {
 *     whereConditions.push(`category = '${category}'`);
 *   }
 *   
 *   // Sua query do banco de dados aqui...
 * });
 * 
 * === TIPOS TypeScript ===
 * 
 * interface News {
 *   id: number;
 *   title: string;
 *   summary: string;
 *   content: string;
 *   author: string;
 *   publishedAt: string;
 *   categoryId: number;
 *   category?: string;
 *   imageUrl?: string;
 * }
 * 
 * interface Category {
 *   id: number;
 *   name: string;
 * }
 * 
 * interface CategoriesResponse {
 *   categories: Category[];
 *   totalCount: number;
 * }
 * 
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;  
 * }
 * 
 * interface AuthResponse {
 *   token: string;
 *   user?: User;
 * }
 * 
 * interface NewsSearchParams {
 *   page?: number;
 *   limit?: number;
 *   period?: 'day' | 'week' | 'month'; // 'day' = 24h, 'week' = 7 dias, 'month' = 30 dias
 *   category?: string;
 * }
 * 
 * interface NewsResponse {
 *   news: News[];
 *   totalPages: number;
 *   totalItems: number;
 *   currentPage: number;
 * }
 */