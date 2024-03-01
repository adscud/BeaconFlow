import { config } from "@tamagui/config";
import { act } from "@testing-library/react-native";
import { router } from "expo-router";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";
import { Button, createTamagui, TamaguiProvider } from "tamagui";

import { DatabaseService } from "../../services/DatabaseService";
import WriteInitialBalance from "../write-initial-balance";

describe("write-initial-balance", () => {
  function renderWriteInitialBalance() {
    const FakeComponent = () => (
      <Button
        testID="to-write-initial-balance"
        onPress={() => router.push("/write-initial-balance")}
      >
        To Write Initial Balance
      </Button>
    );
    renderRouter(
      {
        index: FakeComponent,
        "write-initial-balance": WriteInitialBalance,
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

  async function toWriteInitialBalance() {
    jest.spyOn(router, "push");
    renderWriteInitialBalance();

    await act(async () => {
      fireEvent.press(screen.getByTestId("to-write-initial-balance"));
    });

    expect(router.push).toHaveBeenCalledWith("/write-initial-balance");
  }

  it("should render correctly", async () => {
    jest.spyOn(DatabaseService.shared, "setInitialBalance");
    jest.spyOn(router, "back");

    await toWriteInitialBalance();

    act(() => {
      fireEvent.press(screen.getByTestId("submit-button"));
    });

    expect(screen.getByTestId("title")).toBeTruthy();
    expect(screen.getByTestId("balance-input")).toBeTruthy();
    expect(screen.getByTestId("submit-button")).toBeTruthy();
    expect(DatabaseService.shared.setInitialBalance).not.toHaveBeenCalled();
    expect(router.back).not.toHaveBeenCalled();
  });

  it("should call setInitialBalance and router.back", async () => {
    jest.spyOn(DatabaseService.shared, "setInitialBalance");
    jest.spyOn(router, "back");

    await toWriteInitialBalance();

    act(() => {
      fireEvent.changeText(screen.getByTestId("balance-input"), "1000");
    });

    await act(async () => {
      fireEvent.press(screen.getByTestId("submit-button"));
    });

    expect(DatabaseService.shared.setInitialBalance).toHaveBeenCalledWith(1000);
    expect(router.back).toHaveBeenCalled();
  });
});
