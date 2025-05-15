"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createMockRouter } from "./createMockRouter";

import "../app/globals.css";

export function TestProviders({
  children,
  locale = "uz",
  messages = {},
}: {
  children: ReactNode;
  locale?: string;
  messages?: Record<string, string>;
}) {
  return (
    <AppRouterContext.Provider value={createMockRouter().value}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AppRouterContext.Provider>
  );
}
