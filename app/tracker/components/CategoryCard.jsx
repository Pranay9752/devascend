import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddEntry } from "./AddEntry";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Link as LinkIcon, BarChart2 } from 'lucide-react';

const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    hard: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return colors[difficulty] || "bg-slate-50 text-slate-700 border-slate-200";
};

const getTotalTime = (category) => {
  const dailyEntries = category?.entries || [];
  return dailyEntries.reduce(
    (total, entry) => total + parseFloat(entry.timespent || 0),
    0
  );
};
export const CategoryCard = ({ category }) => {
  
  const totalTime = getTotalTime(category);
  const targetProgress = (totalTime / category.min_target) * 100;

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-white border-b border-slate-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {category.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Daily Target: {category.min_target} hours
            </p>
          </div>
          <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Entry
          </button>
        </div>
        <div className="mt-4">
          <Progress value={targetProgress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>{totalTime} hours completed</span>
            <span>{Math.round(targetProgress)}% of daily goal</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="bg-white p-6">
        <div className="space-y-4">
          {category.entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-50 rounded-lg p-4 border border-slate-100"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-slate-900">{entry.topic}</h3>
                <Badge
                  className={`${getDifficultyColor(entry.difficulty)} border`}
                >
                  {entry.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{entry.timespent} hours</span>
                </div>
                {entry.resource && (
                  <a
                    href={entry.resource}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Resource</span>
                  </a>
                )}
              </div>

              {entry.notes && (
                <p className="text-sm text-slate-600 bg-white p-3 rounded-md border border-slate-100">
                  {entry.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
