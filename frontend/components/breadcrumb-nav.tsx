"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Url } from "next/dist/shared/lib/router/router";

export function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = segments
    .map((segment, index) => {
      // Skip segments that look like parameters (example: long hexadecimal strings)
      const isLikelyId = /^[0-9a-fA-F]{10,}$/.test(segment); // Check if it's a long hexadecimal string
      if (isLikelyId) {
        return null;
      }

      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;

      const formattedSegment = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        href,
        label: formattedSegment,
        isLast,
      };
    })
    .filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}

        {breadcrumbItems.map((item) => (
          <React.Fragment key={item?.href}>
            <BreadcrumbItem>
              {item?.isLast ? (
                <BreadcrumbPage>{item?.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item?.href as Url}>{item?.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item?.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
