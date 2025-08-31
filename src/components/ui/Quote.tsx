import { cn } from '../../lib/utils';

interface QuoteProps {
  text: string;
  author?: string;
}

export const Quote = ({ text, author }: QuoteProps) => {
  return (
    <blockquote className={cn(
      "text-center mt-8 mb-12",
      "max-w-3xl mx-auto px-6"
    )}>
      <p className={cn(
        "text-xl md:text-2xl font-serif italic",
        "text-[var(--muted-foreground)] leading-relaxed",
        "mb-4"
      )}>
        "{text}"
      </p>
      {author && (
        <cite className={cn(
          "text-lg font-sans not-italic",
          "text-[var(--muted-foreground)]/80"
        )}>
          — {author}
        </cite>
      )}
    </blockquote>
  );
};

export default Quote;
