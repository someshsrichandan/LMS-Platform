import { buttonVariants } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import {ReactNode} from 'react'
import Image from 'next/image'

export default function Authlayout({children}:{children: ReactNode}) {
  return (
    <div className='relative flex min-h-svh flex-col items-center  justify-center '>
        <Link href={'/'} className={buttonVariants({
            variant: 'outline',
            className: 'absolute top-4 left-4'
        })}>
            <ArrowLeftIcon className=' h-4 w-4' />
            Back
        </Link>
       
         
        <div className='flex w-full max-w-sm flex-col gap-6'>
            <Link className='flex items-center gap-2 self-center font-medium' href={'/'}>
            <Image src={Logo} alt="Logo" height={32} width={32} />
            LMS PLatform
            </Link>
            {children}
            <div className='text-balance text-center text-xs text-muted-foreground'>
                By clicking continue , you agree to our <Link href={'/terms'} className='underline underline-offset-4'>Terms of Service</Link> and <Link href={'/privacy'} className='underline underline-offset-4'>Privacy Policy</Link>.
            </div>
        </div>
    </div>
  )
}
