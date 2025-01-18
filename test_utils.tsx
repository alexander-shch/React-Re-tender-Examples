import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (component: ReactElement) => {
    return render(<BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>{component}</BrowserRouter>);
  };
  