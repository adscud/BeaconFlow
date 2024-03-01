import { config } from "@tamagui/config";
import { act } from "@testing-library/react-native";
import { router } from "expo-router";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";
import { createTamagui, TamaguiProvider } from "tamagui";

import { DatabaseService } from "../../services/DatabaseService";
import { useTransactionsStore } from "../../stores/transactions";
import Index from "../index";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("index", () => {
  function renderIndex() {
    const FakeComponent = jest.fn(() => null);
    return renderRouter(
      {
        index: Index,
        "/write-initial-balance": FakeComponent,
      },
      {
        wrapper: ({ children }) => (
          <TamaguiProvider config={createTamagui(config)}>
            {children}
          </TamaguiProvider>
        ),
      },
    );
  }

  it("should create the database on layout", () => {
    jest.spyOn(DatabaseService.shared, "init");

    renderIndex();

    fireEvent(screen.getByTestId("main"), "layout");

    expect(DatabaseService.shared.init).toHaveBeenCalled();
  });

  it("should fetch transactions on layout", () => {
    jest.spyOn(DatabaseService.shared, "fetchTransactions");

    renderIndex();

    fireEvent(screen.getByTestId("main"), "layout");

    expect(DatabaseService.shared.fetchTransactions).toHaveBeenCalled();
  });

  it("should render an empty page", () => {
    renderIndex();

    expect(screen.getByTestId("balance")).toBeTruthy();
    expect(screen.getByTestId("add-transaction-button")).toBeTruthy();
    expect(screen.getByTestId("welcome-text")).toBeTruthy();
    expect(screen.queryByTestId("transactions")).toBeFalsy();
  });

  it("should navigate to write-initial-balance", async () => {
    jest.spyOn(router, "push");

    renderIndex();

    await act(async () => {
      fireEvent.press(screen.getByTestId("add-transaction-button"));
    });

    expect(router.push).toHaveBeenCalledWith("/write-initial-balance");
  });

  it("should render a page with transactions", () => {
    act(() => {
      useTransactionsStore.setState({
        transactions: [
          {
            id: 1,
            type: "initial",
            description: "Initial balance",
            name: "Initial balance",
            amount: 1000,
            createdAt: new Date(),
          },
          {
            id: 2,
            type: "expense",
            description: "Coffee",
            name: "Coffee",
            amount: -3,
            createdAt: new Date(),
          },
        ],
      });
    });

    renderIndex();

    expect(screen.getByTestId("balance")).toBeTruthy();
    expect(screen.queryByTestId("add-transaction-button")).toBeFalsy();
    expect(screen.queryByTestId("welcome-text")).toBeFalsy();
    expect(screen.getByTestId("transactions")).toBeTruthy();
    expect(screen.getByText("997,00 €")).toBeTruthy();
  });
});
