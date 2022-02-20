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
  import { knownVariants } from "./services/variants";
  import ArrowsHorizontal24 from "carbon-icons-svelte/lib/ArrowsHorizontal24";
  const variants = knownVariants.map((e) => ({
    id: e.code,
    text: e.name,
    code: e.code,
  }));
</script>

<main>
  <h1>OpenCC#</h1>
  <Grid condensed>
    <!-- See https://www.carbondesignsystem.com/guidelines/2x-grid/overview#mini-unit -->
    <Row>
      <Column lg={7} sm={4} aspectRatio="1x1">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} />
          <TextArea placeholder="输入文本" height="100%" />
        </div>
      </Column>
      <Column lg={2} sm={4}>
        <div class="input-operations-cell">
          <Button kind="tertiary" icon={ArrowsHorizontal24} iconDescription="将转换结果送回输入区" />
        </div>
      </Column>
      <Column lg={7} sm={4} aspectRatio="1x1">
        <div class="text-area-cell">
          <Dropdown hideLabel titleText="变体" items={variants} />
          <TextArea placeholder="转换结果" height="100%" />
        </div>
      </Column>
    </Row>
  </Grid>
</main>
