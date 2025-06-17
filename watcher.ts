// watcher.ts

const cleanInit = new Deno.Command("deno", {
  args: ["run", "-A", "clean.ts"],
  stdout: "inherit",
  stderr: "inherit",
});
await cleanInit.output();

const watcherCmd = new Deno.Command("deno", {
  args: ["run", "-A", "--watch=routes/,static/", "dev.ts"],
  stdout: "piped",
  stderr: "piped"
});
const watcher = watcherCmd.spawn();

const encoder = new TextEncoder();

const output = watcher.stdout.pipeThrough(new TextDecoderStream());
const error = watcher.stderr.pipeThrough(new TextDecoderStream());

const watchAndClean = async (stream: ReadableStream<string>) => {
  const reader = stream.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    Deno.stdout.write(encoder.encode(value));

    if (value.includes("Restarting on file change")) {
      const cleanCmd = new Deno.Command("deno", {
        args: ["run", "-A", "clean.ts"],
        stdout: "inherit",
        stderr: "inherit",
      });
      await cleanCmd.output();
    }
  }
};

watchAndClean(output);
watchAndClean(error);