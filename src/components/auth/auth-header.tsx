import { Subtitles } from 'lucide-react';
import React from 'react'

interface AuthHeaderProps {
    title?: string;
    subTitle?: string;
}

export function AuthHeader({title="Create Account", subTitle="Hunt your next opportunity!"}: AuthHeaderProps) {
  return (
    <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground">{subTitle}</p>
      </div>
  )
}
