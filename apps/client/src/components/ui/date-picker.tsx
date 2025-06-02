import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export function DatePicker({
  value,
  onChange,
}: {
  value?: string
  onChange: (string: string) => void
}) {
  const [valueDate, setValueDate] = useState<Date | undefined>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {valueDate ? (
            format(valueDate, 'dd-MM-yyyy')
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={valueDate}
          onSelect={(date) => {
            setValueDate(date)
            onChange(format(date ?? new Date(), 'dd-MM-yyyy'))
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
