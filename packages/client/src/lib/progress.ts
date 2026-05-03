import { Options, Preset, SingleBar } from "cli-progress";

export function progress({
  total,
  options,
  preset,
}: {
  total: number;
  options: Options;
  preset?: Preset;
}) {
  const bar = new SingleBar(options, preset);

  bar.start(total, 0);

  return {
    bar,
    [Symbol.dispose]: () => {
      bar.stop();
    },
  };
}
