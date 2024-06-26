import { AppOptionTarget } from "./Enums.ts";

export const reverseAppOptionTarget = (value: string): string => {
  return (
    Object.keys(AppOptionTarget).find(
      (key) => AppOptionTarget[key as keyof typeof AppOptionTarget] === value,
    ) || ""
  );
};
