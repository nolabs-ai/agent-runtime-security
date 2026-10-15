import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  a({ href, children }) {
    const external = href?.startsWith("http");
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
        {children}
        {external && <span className="ext" aria-hidden="true">↗</span>}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    );
  },
};

export function Markdown({ children, inline = false }: { children: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      {...(inline ? { allowedElements: ["p", "strong", "em", "a", "code"], unwrapDisallowed: true } : {})}
    >
      {children}
    </ReactMarkdown>
  );
}
