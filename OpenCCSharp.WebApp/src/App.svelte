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
  import LogoGithub from "carbon-icons-svelte/lib/LogoGithub.svelte";
  import Help from "carbon-icons-svelte/lib/Help.svelte";
  import Conversion from "src/pages/Conversion.svelte";
  import About from "./About.svelte";

  let isHelpMenuOpen = false;
  let isAboutDialogOpen = false;
</script>

<Header company="OpenCC#" platformName="WebApp">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderAction icon={LogoGithub} text="GitHub">
      <HeaderPanelLinks>
        <HeaderPanelDivider>您在此处</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp.WebApp">CXuesong/OpenCCSharp.WebApp</HeaderPanelLink>
        <HeaderPanelDivider>OpenCC#</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp">CXuesong/OpenCCSharp</HeaderPanelLink>
        <HeaderPanelDivider>OpenCC （原版）</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/BYVoid/OpenCC">BYVoid/OpenCC</HeaderPanelLink>
        <HeaderPanelLink href="https://github.com/BYVoid/opencc-web">BYVoid/opencc-web</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction icon={Help} text="帮助" bind:isOpen={isHelpMenuOpen}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>OpenCC# 网页应用</HeaderPanelDivider>
        <HeaderPanelLink href="https://github.com/CXuesong/OpenCCSharp.WebApp/issues">意见反馈</HeaderPanelLink>
        <HeaderPanelLink on:click={() => {
          isAboutDialogOpen = true;
          isHelpMenuOpen = false;
        }}>关于此应用</HeaderPanelLink>
        <HeaderPanelDivider>OpenCC （原版）网页应用</HeaderPanelDivider>
        <HeaderPanelLink href="https://opencc.byvoid.com/">開放中文轉換 (Open Chinese Convert)</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<Content>
  <Conversion />
</Content>

<About bind:open={isAboutDialogOpen} />
