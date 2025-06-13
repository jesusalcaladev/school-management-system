import type { Student } from '@/types/student'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { parserCourse } from '@/lib/utils'

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'photo',
    header: 'Foto',
    cell: ({ getValue }) => {
      const photo = getValue() as Blob | string | undefined | null
      if (!photo) {
        return (
          <div className='size-10 rounded-lg bg-gray-200 flex items-center justify-center'>
            <span className='text-xs text-gray-400'>Sin foto</span>
          </div>
        )
      }
      let url = ''
      if (photo instanceof Blob) {
        url = URL.createObjectURL(photo)
      } else if (typeof photo === 'string') {
        url = photo
      }
      return (
        <div className='relative w-full h-full'>
          <img
            src={url}
            alt='Foto'
            className='rounded-lg size-12 object-cover'
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'names',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombres
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: 'lastnames',
    header: 'Apellidos',
  },
  {
    accessorKey: 'ci',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          CI
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: 'currentSession',
    header: 'Sesión',
    cell: ({ getValue }) => {
      const value = getValue() as string
      return value.toUpperCase()
    },
  },
  {
    accessorKey: 'currentCourse',
    header: 'Curso',
    cell: ({ getValue }) => {
      const value = getValue() as string
      return parserCourse(value)
    },
  },
  {
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    accessorKey: 'gender',
    header: 'Género',
  },
  {
    accessorKey: 'birthday',
    header: 'Fecha de nacimiento',
    cell: ({ getValue }) => {
      const date = getValue()
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(date as string | number).toLocaleDateString(
        'es-ES',
        options
      )
    },
  },
  {
    id: '_id',
    accessorKey: '_id',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('_id') as string
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => console.log('eliminar')}>
              <Trash2 className='size-5' />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className='size-5' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(id ?? '').then(() => {
                  toast.success('Copiado el ID')
                })
              }
            >
              Copiar ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const columnsStudent: ColumnDef<Student>[] = [
  {
    accessorKey: 'possition',
    header: 'Posición',
  },
  {
    accessorKey: 'photo',
    header: 'Foto',
    cell: ({ getValue }) => {
      const photo = getValue() as Blob | string | undefined | null
      if (!photo) {
        return (
          <div className='size-10 rounded-lg bg-gray-200 flex items-center justify-center'>
            <span className='text-xs text-gray-400'>Sin foto</span>
          </div>
        )
      }
      let url = ''
      if (photo instanceof Blob) {
        url = URL.createObjectURL(photo)
      } else if (typeof photo === 'string') {
        url = photo
      }
      return (
        <div className='relative w-full h-full'>
          <img
            src={url}
            alt='Foto'
            className='rounded-lg size-12 object-cover'
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'names',
    header: 'Nombres',
  },
  {
    accessorKey: 'lastnames',
    header: 'Apellidos',
  },
  {
    accessorKey: 'ci',
    header: 'CI',
  },
]
