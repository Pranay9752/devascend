// app/components/AddCategoryModal.jsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addCategory } from "../actions/addCategory";

const AddCategoryModal = ({ onAddCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    icon: "Code", // Default value
    minTarget: 1,
  });

  const handleSubmit = async () => {
    if (!categoryData.name || categoryData.minTarget <= 0) {
      alert("Please provide a valid name and minimum target.");
      return;
    }

    // Call the API to create the category
    await addCategory(categoryData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Add New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter category name"
            />
          </div>

          {/* Category Icon Select */}
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={categoryData.icon}
              onValueChange={(value) =>
                setCategoryData((prev) => ({ ...prev, icon: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Code">Code</SelectItem>
                <SelectItem value="Brain">Brain</SelectItem>
                <SelectItem value="BookOpen">Book Open</SelectItem>
                <SelectItem value="TextSelect">Text Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimum Target Input */}
          <div className="space-y-2">
            <Label htmlFor="minTarget">Minimum Target (hours)</Label>
            <Input
              id="minTarget"
              type="number"
              value={categoryData.minTarget}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  minTarget: Math.max(1, parseInt(e.target.value || 1)),
                }))
              }
              placeholder="Minimum target in hours"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
