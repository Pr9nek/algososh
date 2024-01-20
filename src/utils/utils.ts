export const performDelay = async (ms: number): Promise<void> => await new Promise<void>(resolve => setTimeout(resolve, ms));
export const swap = async <T>(arr: T[], fst: number, snd: number) => {
    const tmp = arr[fst];
    arr[fst] = arr[snd];
    arr[snd] = tmp;
}