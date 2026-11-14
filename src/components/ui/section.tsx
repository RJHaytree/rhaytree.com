import { createContext, use, useId } from 'react'

import { cn } from '../../lib/cn'

interface SectionContextValue {
  titleId: string
}

const SectionContext = createContext<SectionContextValue | null>(null)

function useSection() {
  const context = use(SectionContext)
  if (!context) {
    throw new Error('Section parts must be rendered inside <Section.Root>')
  }
  return context
}

function SectionRoot({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const titleId = useId()

  return (
    <SectionContext value={{ titleId }}>
      <section id={id} aria-labelledby={titleId} className={className}>
        {children}
      </section>
    </SectionContext>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  const { titleId } = useSection()

  return (
    <h2 id={titleId} className="text-2xl font-semibold">
      {children}
    </h2>
  )
}

function SectionBody({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mt-4 max-w-prose', className)}>{children}</div>
}

/** A titled page section; the title labels the section for assistive tech. */
export const Section = {
  Root: SectionRoot,
  Title: SectionTitle,
  Body: SectionBody,
}
