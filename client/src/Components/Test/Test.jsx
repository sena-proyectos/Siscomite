import { useState, useEffect } from 'react'
import { getRequestById } from '../../api/httpRequest'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'

export const Test = ({ cerrarModal }) => {
  const requestID = 33
  // Estados para almacenar los datos completos de aprendices y usuarios
  const [aprendices, setAprendices] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [numerales, setNumerales] = useState([])

  useEffect(() => {
    const getIdRequest = async () => {
      try {
        const response = await getRequestById(requestID)
        const res = response.data.result

        // Arrays para almacenar los datos completos de aprendices y usuarios sin duplicados
        const aprendicesData = []
        const usuariosData = []

        // Iterar sobre los datos y agregarlos a los arrays correspondientes
        res.forEach((item) => {
          /* Aprendices */
          if (item.tipo_documento_aprendiz && item.nombres_aprendices) {
            const aprendiz = {
              tipoDocumento: item.tipo_documento_aprendiz,
              nombres: item.nombres_aprendices,
              apellidos: item.apellidos_aprendices,
              numeroDocumento: item.numero_documento_aprendiz,
              emailSena: item.email_aprendiz_sena,
              emailPersonal: item.email_aprendiz_personal,
              celular: item.celular_aprendiz,
              fijo: item.fijo_aprendiz,
              numeroFicha: item.numero_ficha,
              nombreProgramaFicha: item.nombre_programa_ficha
            }
            aprendicesData.push(aprendiz)
          }

          /* Usuarios */
          if (item.tipo_documento_solicitante && item.nombre_usuario_solicitante) {
            const usuario = {
              tipoDocumento: item.tipo_documento_solicitante,
              nombre: item.nombre_usuario_solicitante,
              apellidos: item.apellidos_usuario_solicitante,
              numeroDocumento: item.numero_documento_usuario_solicitante,
              emailSena: item.email_sena_usuario_solicitante,
              emailPersonal: item.email_personal_usuario_solicitante,
              celular: item.numero_celular_usuario_solicitante,
              fijo: item.telefono_fijo_usuario_solicitante
            }
            usuariosData.push(usuario)
          }

          if (item.numero_numeral && item.descripcion_numeral) {
            const numeral = {
              numero: item.numero_numeral,
              descripcion: item.descripcion_numeral
            }
            numerales.push(numeral)
          }
        })

        // Eliminar duplicados utilizando un conjunto para cada tipo de datos
        const uniqueAprendicesData = Array.from(new Set(aprendicesData.map(JSON.stringify)), JSON.parse)
        const uniqueUsuariosData = Array.from(new Set(usuariosData.map(JSON.stringify)), JSON.parse)
        const uniqueNumerales = Array.from(new Set(numerales.map(JSON.stringify)), JSON.parse)

        // Asignar los arrays de datos a los estados correspondientes
        setAprendices(uniqueAprendicesData)
        setUsuarios(uniqueUsuariosData)
        setNumerales(uniqueNumerales)

        // Resto del procesamiento de datos y asignación de valores a otros estados...
      } catch (error) {
        console.log(error)
      }
    }

    getIdRequest()
  }, [])

  return (
    <>
      {/* Mostrar datos de aprendices en una tabla */}
      <div>
        <strong>Datos de Aprendices</strong>
        <Table aria-label="Datos de Aprendices">
          <TableHeader
            columns={[
              { key: 'tipoDocumento', label: 'Tipo de Documento' },
              { key: 'nombres', label: 'Nombres' },
              { key: 'apellidos', label: 'Apellidos' },
              { key: 'numeroDocumento', label: 'Número de Documento' },
              { key: 'emailSena', label: 'Email Sena' },
              { key: 'emailPersonal', label: 'Email Personal' },
              { key: 'celular', label: 'Celular' },
              { key: 'fijo', label: 'Teléfono Fijo' },
              { key: 'numeroFicha', label: 'Número de Ficha' },
              { key: 'nombreProgramaFicha', label: 'Nombre del Programa de Ficha' }
            ]}
          >
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={aprendices}>
            {(item) => (
              <TableRow key={item.numeroDocumento}>
                <TableCell>{item.tipoDocumento}</TableCell>
                <TableCell>{item.nombres}</TableCell>
                <TableCell>{item.apellidos}</TableCell>
                <TableCell>{item.numeroDocumento}</TableCell>
                <TableCell>{item.emailSena}</TableCell>
                <TableCell>{!item.emailPersonal ? 'No disponible' : item.emailPersonal}</TableCell>
                <TableCell>{item.celular}</TableCell>
                <TableCell>{!item.fijo ? 'No disponible' : item.fijo}</TableCell>
                <TableCell>{item.numeroFicha}</TableCell>
                <TableCell>{item.nombreProgramaFicha}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mostrar datos de usuarios en una tabla */}
      <div>
        <strong>Datos de Usuarios</strong>
        <Table aria-label="Datos de Usuarios">
          <TableHeader
            columns={[
              { key: 'tipoDocumento', label: 'Tipo de Documento' },
              { key: 'nombre', label: 'Nombre' },
              { key: 'apellidos', label: 'Apellidos' },
              { key: 'numeroDocumento', label: 'Número de Documento' },
              { key: 'emailSena', label: 'Email Sena' },
              { key: 'emailPersonal', label: 'Email Personal' },
              { key: 'celular', label: 'Celular' },
              { key: 'fijo', label: 'Teléfono Fijo' }
            ]}
          >
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={usuarios}>
            {(item) => (
              <TableRow key={item.numeroDocumento}>
                <TableCell>{item.tipoDocumento}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.apellidos}</TableCell>
                <TableCell>{item.numeroDocumento}</TableCell>
                <TableCell>{item.emailSena}</TableCell>
                <TableCell>{!item.emailPersonal ? 'No disponible' : item.emailPersonal}</TableCell>
                <TableCell>{item.celular}</TableCell>
                <TableCell>{!item.fijo ? 'No disponible' : item.fijo}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <strong>Numerales y Descripciones</strong>
      <Popover placement="right">
        <PopoverTrigger>
          <Button>Ver Numerales</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            {numerales.map((numeral) => (
              <div key={numeral.numero}>
                <strong>Número del Numeral:</strong> {numeral.numero}
                <br />
                <strong>Descripción:</strong> {numeral.descripcion}
                <hr />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Resto del código del componente... */}
    </>
  )
}
