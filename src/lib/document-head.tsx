import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

interface DocumentHeadContextType {
  setTitle: (title: string) => void;
  setMeta: (meta: MetaTag[]) => void;
  setLink: (links: LinkTag[]) => void;
}

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
}

interface LinkTag {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
}

interface DocumentHeadState {
  title: string;
  meta: MetaTag[];
  links: LinkTag[];
}

const DocumentHeadContext = createContext<DocumentHeadContextType | undefined>(undefined);

interface DocumentHeadProviderProps {
  children: ReactNode;
  titleTemplate?: string;
}

export const DocumentHeadProvider: React.FC<DocumentHeadProviderProps> = ({ 
  children, 
  titleTemplate = "%s" 
}) => {
  const [headState, setHeadState] = useState<DocumentHeadState>({
    title: '',
    meta: [],
    links: []
  });

  const setTitle = useCallback((title: string) => {
    setHeadState(prev => ({
      ...prev,
      title: titleTemplate.includes('%s') ? titleTemplate.replace('%s', title) : title
    }));
  }, [titleTemplate]);

  const setMeta = useCallback((meta: MetaTag[]) => {
    setHeadState(prev => ({ ...prev, meta }));
  }, []);

  const setLink = useCallback((links: LinkTag[]) => {
    setHeadState(prev => ({ ...prev, links }));
  }, []);

  // Update document title
  useEffect(() => {
    if (headState.title) {
      document.title = headState.title;
    }
  }, [headState.title]);

  // Update meta tags
  useEffect(() => {
    // Remove existing meta tags added by this provider
    const existingMetas = document.querySelectorAll('meta[data-document-head]');
    existingMetas.forEach(meta => meta.remove());

    // Add new meta tags
    headState.meta.forEach(meta => {
      const metaElement = document.createElement('meta');
      metaElement.setAttribute('data-document-head', 'true');
      
      if (meta.name) metaElement.setAttribute('name', meta.name);
      if (meta.property) metaElement.setAttribute('property', meta.property);
      if (meta.httpEquiv) metaElement.setAttribute('http-equiv', meta.httpEquiv);
      metaElement.setAttribute('content', meta.content);
      
      document.head.appendChild(metaElement);
    });

    return () => {
      const metas = document.querySelectorAll('meta[data-document-head]');
      metas.forEach(meta => meta.remove());
    };
  }, [headState.meta]);

  // Update link tags
  useEffect(() => {
    // Remove existing link tags added by this provider
    const existingLinks = document.querySelectorAll('link[data-document-head]');
    existingLinks.forEach(link => link.remove());

    // Add new link tags
    headState.links.forEach(link => {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('data-document-head', 'true');
      linkElement.setAttribute('rel', link.rel);
      linkElement.setAttribute('href', link.href);
      
      if (link.type) linkElement.setAttribute('type', link.type);
      if (link.sizes) linkElement.setAttribute('sizes', link.sizes);
      
      document.head.appendChild(linkElement);
    });

    return () => {
      const links = document.querySelectorAll('link[data-document-head]');
      links.forEach(link => link.remove());
    };
  }, [headState.links]);

  return (
    <DocumentHeadContext.Provider value={{ setTitle, setMeta, setLink }}>
      {children}
    </DocumentHeadContext.Provider>
  );
};

export const useDocumentHead = () => {
  const context = useContext(DocumentHeadContext);
  if (!context) {
    throw new Error('useDocumentHead must be used within DocumentHeadProvider');
  }
  return context;
};

// Hook conveniente para definir apenas o título
export const useDocumentTitle = (title: string) => {
  const { setTitle } = useDocumentHead();
  
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
};

// Hook conveniente para definir meta tags
export const useDocumentMeta = (meta: MetaTag[]) => {
  const { setMeta } = useDocumentHead();
  
  const stableMeta = useMemo(() => meta, [JSON.stringify(meta)]);
  
  useEffect(() => {
    setMeta(stableMeta);
  }, [stableMeta, setMeta]);
};

// Componente Head para uso declarativo (similar ao Helmet)
interface HeadProps {
  title?: string;
  meta?: MetaTag[];
  links?: LinkTag[];
  children?: ReactNode;
}

export const Head: React.FC<HeadProps> = ({ title, meta = [], links = [], children }) => {
  const { setTitle, setMeta, setLink } = useDocumentHead();

  const stableMeta = useMemo(() => meta, [JSON.stringify(meta)]);
  const stableLinks = useMemo(() => links, [JSON.stringify(links)]);

  useEffect(() => {
    if (title) setTitle(title);
  }, [title, setTitle]);

  useEffect(() => {
    if (stableMeta.length > 0) setMeta(stableMeta);
  }, [stableMeta, setMeta]);

  useEffect(() => {
    if (stableLinks.length > 0) setLink(stableLinks);
  }, [stableLinks, setLink]);

  return <>{children}</>;
};