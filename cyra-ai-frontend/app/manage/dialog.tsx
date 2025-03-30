import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


export function JobDialog() {
    const [open, setOpen] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const button = e.nativeEvent.submitter;
      button.disabled = true;
      button.textContent = "Creating...";
      
      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset button state
      button.disabled = false;
      button.textContent = "Create Job";
      
      // Close the dialog
      setOpen(false);
      
      // Handle form data here (e.g., send to API)
      const formData = new FormData(e.target);
      console.log(Object.fromEntries(formData));
    };
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <div className="font-medium">Company:</div>
                <input type="text" name="company" className="w-full rounded-md border p-2" required />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Website:</div>
                <input type="text" name="website" className="w-full rounded-md border p-2" required />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Head Count:</div>
                <input type="number" name="headCount" className="w-full rounded-md border p-2" required />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Status:</div>
                <select name="status" className="w-full rounded-md border p-2" required>
                  <option>Active</option>
                  <option>Closed</option>
                </select>
              </div>
              <div className="col-span-2 space-y-2">
                <div className="font-medium">Description:</div>
                <textarea name="description" className="w-full rounded-md border p-2" rows={4} required></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Job</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }