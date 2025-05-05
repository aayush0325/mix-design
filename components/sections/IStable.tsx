import { IS_TABLES } from "./isTablesData";

export default function RenderISTable({ content }: { content: typeof IS_TABLES[number]['content'] }) {
    return (
      <div>
        <h3 className="font-semibold text-lg mb-3">{content.title}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead>
              <tr>
                {content.headers.map((header: string, idx: number) => (
                  <th key={idx} className="border-b border-gray-200 dark:border-gray-700 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-left font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row: string[], rIdx: number) => (
                <tr key={rIdx}>
                  {row.map((cell: string, cIdx: number) => (
                    <td key={cIdx} className="border-b border-gray-200 dark:border-gray-700 px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }