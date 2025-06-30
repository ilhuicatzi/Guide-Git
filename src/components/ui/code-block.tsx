// components/ui/code-block.tsx

export const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-muted text-sm rounded-md p-3 overflow-x-auto font-mono">
    <code>{code}</code>
  </pre>
)
