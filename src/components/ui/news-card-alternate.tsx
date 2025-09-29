import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, User } from "lucide-react";
import type { News } from "@/api/news";

interface NewsCardAlternateProps {
  news: News;
  index: number;
}

export function NewsCardAlternate({ news, index }: NewsCardAlternateProps) {
  const isEven = index % 2 === 0;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getSummary = () => {
    if (news.summary) {
      return news.summary.length > 200 ? news.summary.substring(0, 200) + '...' : news.summary;
    }
    return news.content?.substring(0, 200) + '...';
  };

  const hasMoreContent = () => {
    const summary = news.summary || news.content?.substring(0, 200) || '';
    const fullContent = news.content || '';
    return fullContent.length > summary.length;
  };

  return (
    <article 
      className={`w-full border-b border-gray-200 transition-all duration-300 hover:shadow-md ${
        isEven 
          ? 'bg-gradient-to-r from-white to-blue-50/30' 
          : 'bg-gradient-to-r from-purple-50/30 to-white'
      }`}
    >
      <div className="container mx-auto px-6 py-8">
        <div className={`flex flex-col lg:flex-row gap-8 items-start ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}>
          
          {/* Seção do título e metadados */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <Badge 
                variant="secondary" 
                className={`text-xs font-medium ${
                  isEven 
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {news.categories?.[0]?.name || 'Geral'}
              </Badge>
              
              <h2 className={`text-2xl lg:text-3xl font-bold leading-tight ${
                isEven 
                  ? 'text-gray-900' 
                  : 'text-gray-800'
              } hover:${isEven ? 'text-blue-700' : 'text-purple-700'} transition-colors cursor-pointer`}>
                {news.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="font-medium">{news.source || 'Newsletter'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(news.publishedAt.toString())}</span>
              </div>
            </div>
          </div>

          {/* Seção do conteúdo/resumo */}
          <div className="flex-1">
            <div className={`p-6 rounded-xl border ${
              isEven 
                ? 'bg-white/80 border-blue-200/50' 
                : 'bg-white/80 border-purple-200/50'
            } backdrop-blur-sm`}>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                {getSummary()}
              </p>
              
              {hasMoreContent() ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="content" className="border-none">
                    <AccordionTrigger className="hover:no-underline justify-end p-0 [&[data-state=open]>span]:hidden">
                      <span className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isEven
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      } transform hover:-translate-y-0.5`}>
                        Ler mais
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-0">
                      <div className={`p-4 rounded-lg border-l-4 ${
                        isEven 
                          ? 'bg-blue-50/50 border-blue-300' 
                          : 'bg-purple-50/50 border-purple-300'
                      }`}>
                        <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                          {news.content}
                        </p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                          isEven
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 hover:border-purple-300'
                        } transform hover:-translate-y-0.5`}>
                          Recolher
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div className="flex justify-end mt-4">
                  <span className="text-sm text-gray-400 italic">Conteúdo completo exibido</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}