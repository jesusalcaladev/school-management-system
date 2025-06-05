import type { Student } from '@/types/student'
import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  {
    accessorKey: 'currentSession',
    header: 'Sesión',
  },
  {
    accessorKey: 'currentCourse',
    header: 'Curso',
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
      return new Date(date).toLocaleDateString('es-ES', options)
    },
  },
  {
    id: 'actions',
    cell: () => {
      const id = '1231312'
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copiar ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
