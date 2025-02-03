"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { AddEntryModal } from "./AddEntryModal"; // Import the modal component

const BASE_ENTRY = {
  topic: "",
  resource: "",
  timeSpent: "",
  difficulty: "",
  notes: "",
};

export const AddEntry = ({ categoryId }) => {
  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState(BASE_ENTRY);

  const saveEntry = async () => {
    try {
      // Send the data to the server-side API route
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newEntry, categoryId }),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success (e.g., show success message, reset form)
        console.log("Entry added successfully:", result.data);
        setNewEntry(BASE_ENTRY);
        setOpen(false);
      } else {
        // Handle error
        console.error("Error adding entry:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <Button
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <PlusCircle className="h-4 w-4" />
        Add Entry
      </Button>
      <AddEntryModal
        open={open}
        onOpenChange={setOpen}
        saveEntry={saveEntry}
        newEntry={newEntry}
        setNewEntry={setNewEntry}
      />
    </>
  );
};
