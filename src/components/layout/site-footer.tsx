import { Anchor } from '../ui/text-link'

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-16 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-lg font-semibold">Contact</h2>
        <dl className="mt-4 grid gap-2 sm:grid-cols-[6rem_1fr]">
          <dt className="text-neutral-600">Email</dt>
          <dd>
            <Anchor href="mailto:rjhaytree@gmail.com">
              rjhaytree@gmail.com
            </Anchor>
          </dd>
          <dt className="text-neutral-600">GitHub</dt>
          <dd>
            <Anchor href="https://github.com/RJHaytree">
              github.com/RJHaytree
            </Anchor>
          </dd>
        </dl>
      </div>
    </footer>
  )
}
