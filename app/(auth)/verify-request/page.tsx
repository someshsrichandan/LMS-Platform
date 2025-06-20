"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { authClient } from '@/lib/auth-client'
import { Loader, Router } from 'lucide-react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import { toast } from 'sonner'

export default function VerifyRequest() {
    const router = useRouter(); 
    const [otp, setOtp] = React.useState('');
    const [emailPending , setTrasnsition] = useTransition();
    const params = useSearchParams();
    const email = params.get('email');

    function verifyOtp(){
        setTrasnsition(async () => {
           await authClient.signIn.emailOtp({
            email: email || '',
            otp: otp,
            fetchOptions: {
                onSuccess: () => {
                   toast.success('Verification successful! You are now logged in.');
                   router.push('/'); 
                },
                onError: (error) => {
                   toast.error(`Verification failed: Please try again.`);
                }
            }
           })
        });
    }
  useEffect(() => {
  if (!email) {
    toast.error('Email is required.');
    router.push('/login');
  }
}, [email, router]);

  return (
    <Card  className='w-full mx-auto'>
        <CardHeader  className='text-center'>
            <CardTitle className='text-2xl'>PLease Check your email</CardTitle>
            <CardDescription>We have sent a verification email code to your email addres. Please open the email and paste the code below</CardDescription>
        </CardHeader>
        <CardContent >
            <div className='flex flex-col items-center  justify-center space-y-2'>
                <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6} className='gap-2'>
                <InputOTPGroup>
                <InputOTPSlot index={0}/>
                 <InputOTPSlot index={1}/>
                  <InputOTPSlot index={2}/>
                </InputOTPGroup>
                <InputOTPGroup>
                <InputOTPSlot index={3}/>
                 <InputOTPSlot index={4}/>
                  <InputOTPSlot index={5}/>
                </InputOTPGroup>
                </InputOTP>
                <p className='text-sm text-muted-foreground'>Enter the 6-digit code sent to your email</p>
            </div>
            <Button className='w-full mt-4' onClick={verifyOtp} disabled={emailPending} >
                {emailPending ? <>
                <Loader className='size-4 animate-spin' />
                    <span className='ml-2'>Loding...</span>
                </> : <>
                    Verify Account
                </>}
                
            </Button>
        </CardContent>
    </Card>
  )
}
