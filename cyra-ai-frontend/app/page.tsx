"use client";
import Image from "next/image";
import ParticleHeader from '@/components/ParticleHeader';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[48px] row-start-2 items-center text-center relative z-10 w-full">
        {!isStarted ? (
          <>
            <div className="flex flex-col gap-[24px] max-w-[800px] mt-50">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                CyraAI
              </h1>
            </div>
            <Button 
              onClick={() => setIsStarted(true)}
              className="text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 cursor-pointer"
            >
              Start Recruiting Journey
            </Button>
            </>
          ) : (
            <div className="flex w-full justify-center">
            <div className="flex justify-center">
              <Tabs defaultValue="recruitment" className="w-[800px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recruitment">New Recruitment</TabsTrigger>
                <TabsTrigger value="wallet">Already Registered?</TabsTrigger>
              </TabsList>
              <TabsContent value="recruitment">
                <Card>
                <CardHeader>
                  <CardTitle>New Recruitment</CardTitle>
                  <CardDescription>
                  Create a new recruitment campaign
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="Enter job title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" placeholder="Enter job description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Head Count</Label>
                    <Input id="count" type="number" placeholder="Enter head count" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Hire</Button>
                </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="wallet">
                <Card>
                <CardHeader>
                  <CardTitle>Connect Wallet</CardTitle>
                  <CardDescription>
                  Choose your preferred wallet to connect
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                  Connect Wallet
                  </Button>
                  <Button variant="outline" className="w-full">
                  MetaMask
                  </Button>
                  <Button variant="outline" className="w-full">
                  WalletConnect
                  </Button>
                </CardContent>
                </Card>
              </TabsContent>
              </Tabs>
            </div>
            </div>
          )}
</main>

<div className={`${isStarted ? 'w-full fixed top-0 left-0' : 'w-full fixed top-0 left-0'} transition-all duration-500`}>
  <ParticleHeader />
</div>

<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="w-full text-center">
          <p className="text-l text-gray-600">
          Your Web3 Recruitment Intelligent AI Agent.
          </p>
        </div>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
