import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'

interface Props {
  items: any
  columns?: columns[]
}

interface columns {
  name: string
  uid: string
}

export const ResultTable = ({ items, columns = [] }: Props) => {
  const [page, setPage] = React.useState(1)
  const pagesTotal = Math.ceil(items.length / 10)

  if (columns.length === 0) {
    columns = Object.keys(items[0]).map((key) => {
      return { name: key, uid: key }
    })
  }

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * 5
    const end = start + 5
    return items.slice(start, end)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, page])

  return (
    <div>
      <Table
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={pagesTotal}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        //className='h-[60rem]'
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedItems}>
          {(item: any) => (
            <TableRow key={item.name}>
              {(columnKey: any) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
