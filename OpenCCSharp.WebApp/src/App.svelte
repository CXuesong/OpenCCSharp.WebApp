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
  }
</style>

<script lang="ts">
  import { Button, Column, Dropdown, Grid, Row, TextArea } from "carbon-components-svelte";
  import { KnownVariantCode, knownVariants } from "./services/variants";
  import ArrowsHorizontal24 from "carbon-icons-svelte/lib/ArrowsHorizontal24";
  import { convertVariant } from "./services/conversion";
  const variants = knownVariants.map((e) => ({
    id: e.code,
    text: e.name,
    code: e.code,
  }));
  let inputText = "";
  let inputVariant: KnownVariantCode = "Hans";
  let outputVariant: KnownVariantCode = "Hant";
  let outputText = "";
  let pendingUpdateParams: { inputVariant: KnownVariantCode; inputText: string; outputVariant: KnownVariantCode } | undefined;
  function updateOutput(inputVariant: KnownVariantCode, inputText: string, outputVariant: KnownVariantCode): void {
    const needSpinUpUpdatePromise = pendingUpdateParams == null;
    pendingUpdateParams = { inputVariant, inputText, outputVariant };
    if (!needSpinUpUpdatePromise) return;
    (async () => {
      while (pendingUpdateParams) {
        const delay = ((len) => {
          if (len < 512) return 100;
          if (len < 4096) return 1000;
          if (len < 32 * 1024) return 3000;
          return 5000;
        })(pendingUpdateParams.inputText.length);
        await new Promise((r) => window.setTimeout(r, delay));
        const thisUpdateParams = pendingUpdateParams;
        if (inputVariant === outputVariant) {
          outputText = inputText;
          pendingUpdateParams = undefined;
          return;
        }
        const result = await convertVariant(thisUpdateParams.inputText, thisUpdateParams.inputVariant, thisUpdateParams.outputVariant);
        if (pendingUpdateParams === thisUpdateParams) {
          outputText = result;
          pendingUpdateParams = undefined;
          return;
        }
      }
    })();
  }
  $: updateOutput(inputVariant, inputText, outputVariant);
</script>

<main>
  <h1>OpenCC#</h1>
  <Grid condensed>
    <!-- See https://www.carbondesignsystem.com/guidelines/2x-grid/overview#mini-unit -->
    <Row>
      <Column lg={7} sm={4} aspectRatio="1x1">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} bind:selectedId={inputVariant} />
          <TextArea placeholder="输入文本" height="100%" bind:value={inputText} />
        </div>
      </Column>
      <Column lg={2} sm={4}>
        <div class="input-operations-cell">
          <Button kind="tertiary" icon={ArrowsHorizontal24} iconDescription="将转换结果送回输入区" />
        </div>
      </Column>
      <Column lg={7} sm={4} aspectRatio="1x1">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} bind:selectedId={outputVariant} />
          <TextArea placeholder="转换结果" height="100%" readonly value={outputText} />
        </div>
      </Column>
    </Row>
  </Grid>
</main>
