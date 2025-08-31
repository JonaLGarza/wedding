import { Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DateDisplayProps {
  date: string;
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center gap-3 py-6",
      "text-center"
    )}>
      <Calendar className="w-8 h-8 text-[var(--accent)]" />
      <time 
        className="text-2xl font-serif font-medium text-[var(--accent)]"
        dateTime={date}
      >
        {date}
      </time>
    </div>
  );
};

export default DateDisplay;
