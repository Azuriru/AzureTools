<script lang="ts">
    import { Wallets, Tokens, Market, Multisend, Analytics } from '$lib/client';
    import { Row } from '$lib/components/layout';
    import { currentUser } from '$lib/util/client/user';
</script>

<!-- Set a width smaller than the size you want to account for gap because flex will grow the rest of it -->
<Row name="tools" layout="flex-wrap rounded gap-2 *:w-full *:lg:w-1/3 *:2xl:w-1/4 overflow-auto p-2 bg-slate-950">
    {#if $currentUser}
        {#if $currentUser.pinned.wallets}
            <Wallets compact={1} dashboard={1} />
        {/if}
        {#if $currentUser.pinned.tokens}
            <Tokens dashboard={1} />
        {/if}
        {#if $currentUser.pinned.send}
            <Multisend />
        {/if}
        {#if $currentUser.pinned.market}
            <Market />
        {/if}
        {#if $currentUser.pinned.analytics}
            <Analytics  />
        {/if}
    {/if}
</Row>