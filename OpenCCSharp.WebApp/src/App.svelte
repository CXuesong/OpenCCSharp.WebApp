<style lang="scss">
</style>

<script lang="ts">
  import {
    Content,
    Header,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    SkipToContent,
  } from "carbon-components-svelte";
  import LogoGithub20 from "carbon-icons-svelte/lib/LogoGithub20";
  import Help20 from "carbon-icons-svelte/lib/Help20";
  import Conversion from "src/pages/Conversion.svelte";
</script>

<Header platformName="OpenCC#">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderAction icon={LogoGithub20} text="GitHub">
      <HeaderPanelLinks>
        <HeaderPanelDivider>OpenCC#</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp">CXuesong/OpenCCSharp</HeaderPanelLink>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp.WebApp">CXuesong/OpenCCSharp.WebApp</HeaderPanelLink>
        <HeaderPanelDivider>OpenCC （原版）</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/BYVoid/OpenCC">BYVoid/OpenCC</HeaderPanelLink>
        <HeaderPanelLink href="https://github.com/BYVoid/opencc-web">BYVoid/opencc-web</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction icon={Help20} text="帮助">
      <HeaderPanelLinks>
        <HeaderPanelDivider>OpenCC# 网页应用</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp.WebApp/issues">意见反馈</HeaderPanelLink>
        <HeaderPanelDivider>OpenCC （原版）网页应用</HeaderPanelDivider>
        <HeaderPanelLink href="http://opencc.byvoid.com/">開放中文轉換 (Open Chinese Convert)</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<Content>
  <Conversion />
</Content>
