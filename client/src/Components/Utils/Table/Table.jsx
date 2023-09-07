import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

export const CustomTable = ({ title1, title2, title3, title4, title6, title5, icon1, icon2, icon = false, description1, description2, description3, description4, description5 }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>{title1}</TableColumn>
        <TableColumn>{title2}</TableColumn>
        <TableColumn>{title3}</TableColumn>
        <TableColumn>{title4}</TableColumn>
        <TableColumn>{title5}</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{description1}</TableCell>
          <TableCell>{description2}</TableCell>
          <TableCell>{description3}</TableCell>
          <TableCell>{description4}</TableCell>
          <TableCell>{description5}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
