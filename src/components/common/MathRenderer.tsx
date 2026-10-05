import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  math,
  display = false,
  className = ''
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<span class="katex-error">${math}</span>`;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-block ${display ? 'block my-2 text-center overflow-x-auto py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
