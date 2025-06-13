import { Check, Pencil, X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import type { StudentWithForm } from '@/types/student'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateStudent } from '@/services/student'
import { toast } from 'sonner'
import { DatePicker } from '../ui/date-picker'
import { ScrollArea } from '../ui/scroll-area'
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../ui/select'
import { SESSIONS } from '@/constants/sessions'
import { COURSES } from '@/constants/course'

const optionsGender = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
]

export function SheetUpdate({
  data: student,
  onRefresh,
  idStudend,
}: {
  data: StudentWithForm
  idStudend: string
  onRefresh: () => void
}) {
  const [values, setValues] = useState(student)
  const { mutate } = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      toast.success('Datos actualizados exitosamente')
      onRefresh()
    },
  })

  const handleSubmit = () => {
    mutate({
      id: idStudend,
      data: {
        ...values,
      },
    })
    setValues(student)
  }

  const handleChange =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') {
        setValues((prev) => ({ ...prev, [key]: e }))
        return
      }
      setValues((prev) => ({ ...prev, [key]: e.target.value }))
    }

  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Pencil className='size-4' />
          Editar Datos
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Editar Datos personales</SheetTitle>
          <SheetDescription>
            Esta acción no se puede deshacer. y no volverá a cambios anteriores
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className='h-[60%]'>
          <div className='px-5 flex flex-col gap-y-2'>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='names'>Nombres</Label>
              <Input
                id='names'
                value={values.names}
                onChange={handleChange('names')}
                placeholder='John Doe'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='lastnames'>Lastnames</Label>
              <Input
                id='lastnames'
                value={values.lastnames}
                onChange={handleChange('lastnames')}
                placeholder='John Doe'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='CI'>CI</Label>
              <Input
                id='CI'
                type='number'
                value={values.ci}
                onChange={handleChange('ci')}
                placeholder='John Doe'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='lastnames'>Dia de nacimiento</Label>
              <DatePicker
                onChange={handleChange('birthday')}
                value={values.birthday}
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='email'>Correo Electrónico</Label>
              <Input
                id='CI'
                type='email'
                value={values.email}
                onChange={handleChange('email')}
                placeholder='john.doe@gmail.com'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='placeofbirth'>Lugar de nacimiento</Label>
              <Input
                id='placeofbirth'
                type='text'
                value={values.placeOfBirth}
                onChange={handleChange('placeOfBirth')}
                placeholder='Calle Sierra, Punto Fijo'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='namesParent'>Nombres del representante</Label>
              <Input
                id='namesParent'
                type='text'
                value={values.namesParent}
                onChange={handleChange('namesParent')}
                placeholder='Carla'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='lastnamesParent'>
                Apellido del representante
              </Label>
              <Input
                id='lastnamesParent'
                type='text'
                value={values.lastnamesParent}
                onChange={handleChange('lastnamesParent')}
                placeholder='Santana'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='ciParent'>CI del representante</Label>
              <Input
                id='ciParent'
                type='text'
                value={values.ciParent}
                onChange={handleChange('ciParent')}
                placeholder='Santana'
                required
              />
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='session'>Genero</Label>
              <Select
                value={values.gender}
                onValueChange={handleChange('gender')}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Seleciona un Genero' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {optionsGender.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='session'>Sección</Label>
              <Select
                value={values.currentSession}
                onValueChange={handleChange('currentSession')}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Seleciona una Sección' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SESSIONS.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='gap-y-1 flex flex-col'>
              <Label htmlFor='course'>Curso</Label>
              <Select
                value={values.currentCourse.toString()}
                onValueChange={handleChange('currentCourse')}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Seleciona un Curso' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COURSES.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className='mx-auto w-full flex flex-row justify-between gap-x-2'>
          <Button className='w-[50%]' onClick={() => handleSubmit()}>
            <Check />
            Guardar
          </Button>
          <SheetClose className='w-[50%]'>
            <Button className='w-full' variant={'outline'}>
              <X />
              Cerrar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
