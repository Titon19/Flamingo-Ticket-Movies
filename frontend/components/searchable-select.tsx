"use client";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SearchableSelectProps<T> = {
  items: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  onSelect?: (value: string) => void;
};

export default function SearchableSelect<T>({
  items,
  valueKey,
  labelKey,
  placeholder = "Select an option",
  onSelect,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    onSelect?.(value);
  };

  const selectedLabel = items.find(
    (item) => String(item[valueKey]) === selected
  )?.[labelKey];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedLabel ? String(selectedLabel) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] w-full p-0">
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item, index) => (
                <CommandItem
                  key={index}
                  value={String(item[labelKey])}
                  onSelect={() => handleSelect(String(item[valueKey]))}
                >
                  {String(item[labelKey])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
