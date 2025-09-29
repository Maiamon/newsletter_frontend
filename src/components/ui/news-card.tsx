import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { News } from "@/api/news";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDisplayContent = () => {
    if (news.summary) {
      return news.summary;
    }
    // Se não há resumo, mostra os primeiros 150 caracteres do conteúdo
    if (news.content.length > 200) {
      return news.content.substring(0, 200) + '...';
    }
    return news.content;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
          {news.source && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {news.source}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {getDisplayContent()}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {news.categories.map((category) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {formatDate(news.publishedAt)}
        </div>
      </CardContent>
    </Card>
  );
}