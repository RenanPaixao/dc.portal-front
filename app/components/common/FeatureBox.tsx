import React from 'react'
import { cn } from '@/lib/utils'

interface FeatureBoxProps {
  className?: string
  name: string
  description: string
  icon: React.JSX.Element
}

export function FeatureBox({description, name, className, icon}:FeatureBoxProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-5 shadow-xs transition hover:cursor-pointer hover:border-blue-600 md:p-7 xl:p-10 dark:border-gray-800 dark:bg-gray-800 dark:shadow-none dark:hover:border-blue-400", className)}>
      {icon}
      <h4 className="mb-2 text-lg font-bold">
        {name}
      </h4>
      <p className="line-clamp-6 leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
