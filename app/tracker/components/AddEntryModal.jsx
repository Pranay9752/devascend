import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const AddEntryModal = ({
  open,
  onOpenChange,
  saveEntry,
  newEntry,
  setNewEntry,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Entry</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Topic/Question</Label>
          <Input
            id="topic"
            value={newEntry.topic}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, topic: e.target.value }))
            }
            placeholder="e.g., Two Sum, Closures, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resource">Resource Link</Label>
          <Input
            id="resource"
            value={newEntry.resource}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, resource: e.target.value }))
            }
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeSpent">Time Spent (hours)</Label>
          <Input
            id="timeSpent"
            type="number"
            step="0.25"
            value={newEntry.timeSpent}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, timeSpent: e.target.value }))
            }
            placeholder="e.g., 1.5"
          />
        </div>
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={newEntry.difficulty}
            onValueChange={(value) =>
              setNewEntry((prev) => ({ ...prev, difficulty: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={newEntry.notes}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Additional notes or insights"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button  onClick={saveEntry}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
