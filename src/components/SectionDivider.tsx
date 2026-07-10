import { ArrowDown } from "lucide-react";

interface SectionDividerProps {
  eyebrow: string;
  hint?: string;
}

export function SectionDivider({ eyebrow, hint = "Continue" }: SectionDividerProps) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-12">
      <div className="flex items-center justify-between border-t border-border py-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </span>
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {hint}
          <ArrowDown className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}
