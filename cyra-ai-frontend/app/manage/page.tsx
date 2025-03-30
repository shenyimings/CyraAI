"use client";

import { useManageStore } from './store'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Mock data
const jobListings = [
    { id: 1, title: "Senior Frontend Developer", status: "Active", applications: 12 },
    { id: 2, title: "Blockchain Engineer", status: "Active", applications: 8 },
    { id: 3, title: "Product Manager", status: "Closed", applications: 24 },
];

const candidates = [
    { id: 1, name: "John Doe", role: "Frontend Developer", status: "Interviewing" },
    { id: 2, name: "Jane Smith", role: "Blockchain Engineer", status: "Pending" },
];

export default function ManagePage() {
    const { activeSection } = useManageStore()

    return (
        <div className="space-y-6">
            {activeSection === "jobs" && (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Job Listings</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>+ New Job</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Job Listing</DialogTitle>
                      <DialogDescription>
                        Fill in the details for the new job position.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <div className="font-medium">Company:</div>
                        <input type="text" className="w-full rounded-md border p-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Website:</div>
                        <input type="text" className="w-full rounded-md border p-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Head Count:</div>
                        <input type="number" className="w-full rounded-md border p-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Status:</div>
                        <select className="w-full rounded-md border p-2">
                          <option>Active</option>
                          <option>Closed</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <div className="font-medium">Description:</div>
                        <textarea className="w-full rounded-md border p-2" rows={4}></textarea>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {jobListings.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.status}</TableCell>
                            <TableCell>{job.applications}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm">View</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-2">
                                            <h4 className="font-medium">{job.title}</h4>
                                            <Separator />
                                            <div className="text-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="font-medium">Company:</div>
                                                    <div>Acme Corp</div>
                                                    <div className="font-medium">Website:</div>
                                                    <div>acme.com</div>
                                                    <div className="font-medium">Head Count:</div>
                                                    <div>5</div>
                                                    <div className="font-medium">Description:</div>
                                                </div>
                                                <p className="mt-2">We are looking for an experienced developer to join our team...</p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            )}

            {activeSection === "candidates" && (
            <Card>
                <CardHeader>
                <CardTitle>Candidate Pool</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {candidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                            <TableCell>{candidate.name}</TableCell>
                            <TableCell>{candidate.role}</TableCell>
                            <TableCell>{candidate.status}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">Profile</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            )}
        </div>
    );
}