import ImageUploader from '@/components/ImageUploader'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createStudent } from '@/services/student'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/student/create')({
  component: RouteComponent,
})

const optionsSession = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
  { value: 'e', label: 'E' },
  { value: 'f', label: 'F' },
  { value: 'g', label: 'G' },
]

const optionsGender = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
]

const optionsCourse = [
  { value: '1', label: '1er' },
  { value: '2', label: '2do' },
  { value: '3', label: '3er' },
  { value: '4', label: '4to' },
  { value: '5', label: '5to' },
]

const initialValues = {
  names: '',
  lastnames: '',
  email: '',
  ci: '',
  currentSession: '',
  currentCourse: '',
  address: '',
  gender: '',
  birthday: '',
  photo: '',
  placeOfBirth: '',
}

function RouteComponent() {
  const [values, setValues] = useState(initialValues)
  const { mutate } = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      toast.success('Estudiante creado exitosamente')
      setValues(initialValues)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(values)
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

  const navigate = useNavigate()
  return (
    <main className='px-20 py-10 flex flex-col'>
      <h1 className='text-3xl text-neutral-800 font-bold'>
        Crear nuevo estudiante
      </h1>
      <form onSubmit={handleSubmit} className='mt-10 grid grid-cols-2 gap-x-5'>
        <div className='flex flex-col gap-2'>
          <div>
            <Label htmlFor='photo'>Foto</Label>
            <ImageUploader
              onImageUpload={(files) => {
                // Convertir el archivo a una URL base64
                const reader = new FileReader()
                reader.readAsDataURL(files[0])
                reader.onloadend = () => {
                  setValues((prev) => ({
                    ...prev,
                    photo: reader.result as string,
                  }))
                }
              }}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='names'>Nombres</Label>
            <Input
              id='names'
              onChange={handleChange('names')}
              placeholder='John Doe'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='lastname'>Apellido</Label>
            <Input
              id='lastname'
              onChange={handleChange('lastnames')}
              placeholder='Smith Oxford'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='CI'>CI</Label>
            <Input
              id='CI'
              onChange={handleChange('ci')}
              placeholder='12345678'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              onChange={handleChange('email')}
              placeholder='12345678'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='address'>Direción</Label>
            <Input
              id='address'
              onChange={handleChange('address')}
              placeholder='Charaima, Sector 1'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='session'>Sección</Label>
            <Select onValueChange={handleChange('currentSession')}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Seleciona una Sección' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {optionsSession.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='course'>Curso</Label>
            <Select onValueChange={handleChange('currentCourse')}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Seleciona un Curso' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {optionsCourse.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='grid gap-2'>
            <Label htmlFor='names'>Dia de nacimiento</Label>
            <DatePicker
              value={values.birthday}
              onChange={handleChange('birthday')}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='session'>Genero</Label>
            <Select onValueChange={handleChange('gender')}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Seleciona un Genero' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {optionsGender.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='placeOfBirth'>Lugar de nacimiento</Label>
            <Input
              id='placeOfBirth'
              onChange={handleChange('placeOfBirth')}
              placeholder='Calle Sierra, Punto Fijo'
              required
            />
          </div>
        </div>
        <div className='flex flex-row gap-x-2 mt-8'>
          <Button type='submit' size={'lg'}>
            <User />
            Crear Estudiante
          </Button>
          <Button
            onClick={() =>
              navigate({
                to: '/',
              })
            }
            size={'lg'}
          >
            <X />
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  )
}
