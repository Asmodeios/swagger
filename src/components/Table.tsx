interface TableProps {
  headers: string[]
  children: React.ReactNode
}
export const Table = (props: TableProps) => {
  const { headers, children } = props
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              className={`font-bold text-[12px] text-left py-2 ${i === 1 ? 'w-[99%]' : 'w-auto'}`}
              key={header + i}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export const TableData = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <td className='py-[10px] text-md align-top'>
      {children}
    </td>
  )
}