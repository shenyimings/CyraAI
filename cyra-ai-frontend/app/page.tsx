"use client";
declare global {
  interface Window {
    ethereum?: any;
  }
}
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
import { useState, useEffect } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [ethereum, setEthereum] = useState<any>(null);
  useEffect(() => {
      const { ethereum } = window;
      setEthereum(ethereum);
  }, []);

  const connectWallet = async () => {
		try {
			if(!ethereum) return alert("Please install Metamask");

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

			// window.location.reload();
      window.location.href = '/manage';
		} catch (error) {
			console.log(error);
			throw new Error("No ethereum object.")
		}
	}

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[36px] row-start-2 items-center text-center relative z-10 w-full">
        {!isStarted ? (
          <>
            <div className="flex flex-col gap-[10px] max-w-[800px] mt-36">
              <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                CyraAI
              </h1>
            </div>
            <Button 
              onClick={() => setIsStarted(true)}
              className="text-lg px-9 py-6 rounded-full transition-all duration-300 hover:scale-107 active:scale-95 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 cursor-pointer"
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
                    <Label htmlFor="title">Company Name</Label>
                    <Input id="title" placeholder="Enter company name" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Website</Label>
                    <Input id="title" placeholder="Enter company website" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="Enter job title" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" placeholder="Enter job description" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Head Count</Label>
                    <Input id="count" type="number" placeholder="Enter head count" required/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={connectWallet}
                  >
                    Create Job
                  </Button>
                </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="wallet">
                <Card>
                <CardHeader>
                  <CardTitle>Login - Connect to CyraAI</CardTitle>
                  <CardDescription>
                  Choose your preferred wallet to connect
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline"
                    onClick={connectWallet}
                    className="w-full"
                  >
                    Connect Wallet
                  </Button>
                  <Image
                    src="/metamask.svg"
                    alt="MetaMask logo"
                    width={140}
                    height={140}
                    className="mt-8 mb-4 mx-auto"
                  />
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
