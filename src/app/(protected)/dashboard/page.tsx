import {
  getDaySales,
  getMonthSales,
  getmostDemandedProductCombos,
  getmostDemandedProducts,
  getWeekSales,
  getYearSales,
} from "@/lib/services/reports";
import { SearchParams } from "@/lib/types/pagination";
import ProductsSalesContainer from "@/sections/reports/products-metrics-container";
import SalesContainer from "@/sections/reports/sales-container";
import React from "react";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const mostDemandedItemsPromise = Promise.all([
    getmostDemandedProducts(params),
    getmostDemandedProductCombos(params),
  ]);
  const salesPromise = Promise.all([
    getDaySales(),
    getWeekSales(),
    getMonthSales(),
    getYearSales(),
  ]);

  return (
    <>
      <ProductsSalesContainer promise={mostDemandedItemsPromise} />
      <SalesContainer promise={salesPromise} />;
    </>
  );
}

export const dynamic = "force-dynamic";
