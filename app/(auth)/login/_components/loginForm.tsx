"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { GithubIcon, Loader, Send, Target } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { set } from 'zod'

export default function LoginForm() {
    const router = useRouter();
    const [githubPending, setGithubPending] = useTransition();
    const [emailPending, setEmailPending] = useTransition();
    const [email , setEmail] = useState('');
    async function signInWithGithub() {
        setGithubPending(async () => {
             await authClient.signIn.social({
            provider: 'github',
            callbackURL: '/',
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Successfully signed in with GitHub!')

                },
                onError: (error) => {
                    toast.error(`Indernal Server Error: ${error.error?.message}`)
                }
            }
        })
        });
    }
     function signInWithEmail() {
        setEmailPending(async () => {
           await authClient.emailOtp.sendVerificationOtp({
            email: email,
            type: 'sign-in',
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Verification email sent! Please check your inbox.')
                    router.push(`/verify-request?email=${email}`)
                },
                onError: (error) => {
                    toast.error(`Error sending verification email`)
                }
            }
           })
           
        })
    }
  return (
    <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Welcom Back!</CardTitle>
                <CardDescription>Login with your github Email account</CardDescription>
            </CardHeader>
            <CardContent>

                <Button disabled={githubPending} onClick={signInWithGithub} className='w-full' variant='outline'>
                    {githubPending ? 
                    <>
                    <Loader className='size-4 animate-spin' />
                    <span className='ml-2'>Loding...</span>
                    </>: 
                    <>
                    <GithubIcon className='size-4' />
                    Sign in with GitHub
                    </>}
                </Button>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-sm text-gray-500">or continue with email</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="space-y-4">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter your email" className="w-full" />
                    <Button onClick={signInWithEmail} disabled={emailPending} className="w-full" variant="default">
                       {emailPending ? 
                    <>
                    <Loader className='size-4 animate-spin' />
                    <span className='ml-2'>Loding...</span>
                    </>: 
                    <>
                    <Send className='size-4' />
                    <span className='ml-2'>Continue with Email</span>
                    </>}
                    </Button>
                </div>
            </CardContent>
        </Card>
  )
}
