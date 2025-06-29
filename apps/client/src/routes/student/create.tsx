import { ImageUploader } from '@/components/image-uploader'
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
import { COURSES } from '@/constants/course'
import { SESSIONS } from '@/constants/sessions'
import { createNote } from '@/services/note'
import { createStudent } from '@/services/student'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/student/create')({
  component: RouteComponent,
})

const optionsGender = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
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
  placeOfBirth: '',
  photo: '',
  birthday: '',
  namesParent: '',
  lastnamesParent: '',
  ciParent: '',
}

function RouteComponent() {
  const [values, setValues] = useState(initialValues)
  const { mutate, data } = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      toast.success('Estudiante creado exitosamente')
      setValues(initialValues)
    },
  })

  const { mutate: createNoteMutation } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Notas creadas exitosamente')
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(values)
    createNoteMutation({
      idStudent: data?._id,
    })
    setValues(initialValues)
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
              value={values.names}
              onChange={handleChange('names')}
              placeholder='John Doe'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='lastname'>Apellido</Label>
            <Input
              value={values.lastnames}
              id='lastname'
              onChange={handleChange('lastnames')}
              placeholder='Smith Oxford'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='CI'>CI</Label>
            <Input
              value={values.ci}
              id='CI'
              onChange={handleChange('ci')}
              placeholder='12345678'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              value={values.email}
              id='email'
              onChange={handleChange('email')}
              placeholder='john.doe@gmail.com'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='address'>Direción</Label>
            <Input
              id='address'
              value={values.address}
              onChange={handleChange('address')}
              placeholder='Charaima, Sector 1'
              required
            />
          </div>
          <div className='grid gap-2'>
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
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='course'>Curso</Label>
            <Select
              value={values.currentCourse}
              onValueChange={handleChange('currentCourse')}
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Seleciona un Curso' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {COURSES.map((option) => (
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
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='placeOfBirth'>Lugar de nacimiento</Label>
            <Input
              value={values.placeOfBirth}
              id='placeOfBirth'
              onChange={handleChange('placeOfBirth')}
              placeholder='Calle Sierra, Punto Fijo'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='namesParent'>Nombre del representante</Label>
            <Input
              value={values.namesParent}
              id='namesParent'
              onChange={handleChange('namesParent')}
              placeholder='Carla'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='lastnamesParent'>Apellido del representante</Label>
            <Input
              value={values.lastnamesParent}
              id='lastnamesParent'
              onChange={handleChange('lastnamesParent')}
              placeholder='Santana'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='ciParent'>CI del representante</Label>
            <Input
              id='ciParent'
              value={values.ciParent}
              onChange={handleChange('ciParent')}
              placeholder='12345678'
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
