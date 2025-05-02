"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { DateRange, isDateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerRange({
  className,
  handleFilterChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  handleFilterChange: (
    page: number,
    pageSize: number,
    startDate: string,
    endDate: string
  ) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const onApply = () => {
    if (date?.from && date?.to) {
      const start_date = format(date.from, "yyyy-MM-dd");
      const end_date = format(date.to, "yyyy-MM-dd");
      handleFilterChange(1, 10, start_date, end_date);
    }
  };

  React.useEffect(() => {
    onApply();
  }, [date]);

  const handleReset = () => {
    setDate({ from: undefined, to: undefined });
    handleFilterChange(1, 10, "", "");
  };

  return (
    <div className={cn("grid gap-2 mb-4", className)}>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Range Date Filter</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        handleDateChange();
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}

      <div className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild className="rounded-full">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(DateRange) => {
                if (isDateRange(DateRange)) {
                  setDate(DateRange);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button
          type="reset"
          onClick={handleReset}
          size={"icon"}
          className="rounded-full"
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
