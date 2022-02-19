<script lang="ts">
  export let name: string = "";
  let text = "Loading";
  (async () => {
    const { boot, OpenCCSharp } = await import("managed/dotnet");
    await boot();
    text = await OpenCCSharp.WebApp.Managed.ConvertStringVariant(
      "测试",
      "Hans",
      "Hant"
    );
  })();
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>{text}</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
