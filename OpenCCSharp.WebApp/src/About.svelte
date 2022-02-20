<style lang="scss">
  .info-text {
    p {
      text-indent: 2em;

      & > :global(a) {
        text-indent: initial;
      }
    }

    h4,
    p {
      margin-block-end: 0.2em;
    }

    h4 {
      margin-block-start: 0.8em;
    }
  }
</style>

<script lang="ts">
  import { Link, Modal } from "carbon-components-svelte";

  export let open = false;
</script>

<Modal bind:open modalHeading="关于 OpenCC# 网页应用" primaryButtonText="关闭" on:click:button--primary={() => (open = false)} on:open on:close on:submit>
  <div class="info-text">
    <p>这个网页应用采用<Link href="https://github.com/CXuesong/OpenCCSharp">OpenCC#</Link>进行中文字形转换。<!--
    -->整个转换过程由浏览器执行，因此你输入的文本不会被发送到服务器，而应用对输入的文本长度也没有限制。</p>
    <p>在页面左侧的文本框输入需要进行转换的文本，然后选择一个转换对（源字形和目标字形）。稍等片刻，转换后的文本会显示在右侧的文本框中。<!--
    -->在移动设备上，文本框可能会上下而非左右排列。</p>
    <p>如果你对这个简单的网页应用有任何意见或者建议，请点击页面右侧的“帮助” -> “意见反馈”以在GitHub提交issue。</p>
    <h4>转换规则</h4>
    <p>此网页应用采用了与OpenCC预设的转换规则等价的转换配置（启用了所有地区词转换规则）。<!--
    -->如果你对现有转换规则有任何建议，请先在<Link href="https://opencc.byvoid.com/">OpenCC原版转换网站</Link>上进行确认，<!--
    -->然后前往<Link href="https://github.com/BYVoid/OpenCC">他们的存储库</Link>提交issue或者PR。<!--
    -->我们会在上游存储库更新后，更新OpenCC#的预设转换配置。</p>
    <p>目前OpenCC#内部预置的转换转换对并不完整，请参阅<!--
      --><Link href="https://github.com/CXuesong/OpenCCSharp/blob/main/OpenCCSharp.Presets/ChineseConversionPresets.cs#L36">源代码</Link><!--
      -->以了解所有可用转换对。</p>
    <h4>性能</h4>
    <p>每个转换对在初次转换时需要加载转换规则，因此初次转换时间一般都会稍长。</p>
    <h4>OpenCC#</h4>
    <p>OpenCC# 是一款仍在缓慢开发中的基于 .NET 6 的字形转换库，与 OpenCC 采用了相同的确定性中文字符串分词和字形转换方法。<!--
    -->目前库中预置了部分常见转换对，并计划在以后加入其他转换对的支持。</p>
  </div>
</Modal>
