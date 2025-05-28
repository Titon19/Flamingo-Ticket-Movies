import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../ui/calendar";
import { format } from "date-fns";
import { walletFilterDate } from "../../../services/transactions/wallets/wallet.service";
import { UseFormReturn } from "react-hook-form";
type WalletTransactionFilterProps = {
  form: UseFormReturn<walletFilterDate>;
  onSubmit: (data: walletFilterDate) => void;
  isFilterLoading: boolean;
  handleReset: () => void;
};
const index = ({
  form,
  onSubmit,
  isFilterLoading,
  handleReset,
}: WalletTransactionFilterProps) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-3 md:flex-row flex-col md:items-end">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mulai Tanggal</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Mulai Tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field?.value as Date}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selesai Tanggal</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selesai Tanggal</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field?.value as Date}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button isLoading={isFilterLoading} type="submit">
                <SearchIcon />
              </Button>
              <Button variant="outline" type="reset" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default index;
