<style lang="scss">
  .text-area-cell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    :global(.bx--text-area__wrapper) {
      height: 100%;
    }
  }

  .input-operations-cell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  .conversion-status {
    vertical-align: middle;
  }
</style>

<script lang="ts">
  import { Button, Column, Dropdown, Grid, InlineLoading, InlineNotification, Row, TextArea, TooltipDefinition } from "carbon-components-svelte";
  import ArrowsHorizontal24 from "carbon-icons-svelte/lib/ArrowsHorizontal24";
  import ErrorOutline16 from "carbon-icons-svelte/lib/ErrorOutline16";
  import Timer16 from "carbon-icons-svelte/lib/Timer16";
  import { KnownVariantCode, knownVariants } from "./services/variants";
  import { onMount } from "svelte";

  const variants = knownVariants.map((e) => ({
    id: e.code,
    text: e.name,
    code: e.code,
  }));
  let inputText = "";
  let inputVariant: KnownVariantCode = "Hans";
  let outputVariant: KnownVariantCode = "Hant";
  let outputText = "";
  type SettledCovnersionState = { elapsed: number; error?: string };
  let conversionState: "converting" | SettledCovnersionState | undefined;

  let pendingUpdateParams: { inputVariant: KnownVariantCode; inputText: string; outputVariant: KnownVariantCode } | undefined;
  function updateOutput(inputVariant: KnownVariantCode, inputText: string, outputVariant: KnownVariantCode): void {
    const needSpinUpUpdatePromise = pendingUpdateParams == null;
    pendingUpdateParams = { inputVariant, inputText, outputVariant };
    if (!needSpinUpUpdatePromise) return;
    void (async () => {
      while (pendingUpdateParams) {
        const delay = ((len) => {
          if (len < 512) return 500;
          if (len < 4096) return 1000;
          if (len < 32 * 1024) return 3000;
          return 5000;
        })(pendingUpdateParams.inputText.length);
        await new Promise((r) => window.setTimeout(r, delay));
        const thisUpdateParams = pendingUpdateParams;
        conversionState = "converting";
        const localConversionState: SettledCovnersionState = { elapsed: 0 };
        const startTime = performance.now();
        try {
          if (!inputText) {
            outputText = "";
            return;
          }
          if (inputVariant === outputVariant) {
            outputText = inputText;
            return;
          }
          const { convertVariant } = await import("./services/conversion");
          outputText = await convertVariant(thisUpdateParams.inputText, thisUpdateParams.inputVariant, thisUpdateParams.outputVariant);
        } catch (err) {
          localConversionState.error = err && (err as Error).stack ? String((err as Error).stack) : String(err);
        } finally {
          localConversionState.elapsed = Math.round(performance.now() - startTime);
          conversionState = localConversionState;
          if (pendingUpdateParams === thisUpdateParams) {
            pendingUpdateParams = undefined;
          }
        }
      }
    })();
  }

  $: updateOutput(inputVariant, inputText, outputVariant);

  onMount(async () => {
    const { ensureInitialized } = await import("./services/conversion");
    await ensureInitialized();
  });

  function onSwapInput() {
    inputText = outputText;
    [inputVariant, outputVariant] = [outputVariant, inputVariant];
  }
</script>

<main>
  <h1>OpenCC#</h1>
  <Grid condensed>
    <!-- See https://www.carbondesignsystem.com/guidelines/2x-grid/overview#mini-unit -->
    <Row>
      <Column lg={7} sm={4} aspectRatio="4x3">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} bind:selectedId={inputVariant} />
          <TextArea placeholder="输入文本" height="100%" bind:value={inputText} />
        </div>
      </Column>
      <Column lg={2} sm={4}>
        <div class="input-operations-cell">
          <Button kind="tertiary" icon={ArrowsHorizontal24} iconDescription="将转换结果送回输入区" on:click={onSwapInput} />
          <div class="conversion-status">
            {#if conversionState === "converting"}
              <InlineLoading description="转换中" />
            {:else if conversionState}
              {#if conversionState.error}
                <ErrorOutline16 />
              {:else}
                <Timer16 />
              {/if}
              <TooltipDefinition tooltipText="转换用时">{conversionState.elapsed}ms</TooltipDefinition>
            {/if}
          </div>
        </div></Column>
      <Column lg={7} sm={4} aspectRatio="4x3">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} bind:selectedId={outputVariant} />
          {#if typeof conversionState === "object" && conversionState.error}
            <InlineNotification kind="error" title="转换失败" subtitle={conversionState.error} />
          {/if}
          <TextArea placeholder="转换结果" height="100%" readonly value={outputText} />
        </div>
      </Column>
    </Row>
  </Grid>
</main>
