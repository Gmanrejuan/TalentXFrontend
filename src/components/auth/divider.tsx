import { cn } from "@/lib/utils";

interface DividerProps{
    text?: string;
    classname?: string;
};

export function Divider({text = "OR", classname} : DividerProps){
    return(
        <div className={cn("flex items-center gap-4", classname)}>
            <div className="h-px flex-1 bg-border"/>
            <span className="text-sm text-muted-foreground" >{text}</span>
            <div className="h-px flex-1 bg-border"/>
        </div>
    )
}  