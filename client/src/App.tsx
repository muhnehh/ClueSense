import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import LaunchingSoon from "@/components/launching-soon";

function AppRouter() {
  return (
    <Switch>
      <Route path="/ClueSense" component={Home} />
      <Route path="/ClueSense/" component={Home} />
      <Route path="/ClueSense/launching-soon" component={LaunchingSoon} />
      <Route path="/" component={Home} />
      <Route path="/launching-soon" component={LaunchingSoon} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
