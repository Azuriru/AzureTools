<script lang="ts">
    import { ImportWallets, Wallets, Market, Multisend, Analytics } from '$lib/client';
    import { Row } from '$lib/components/layout';
    import { currentUser } from '$lib/util/users';
</script>

<Row name="tools" layout="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-[500px] rounded gap-2">
    {#if $currentUser}
        {#if $currentUser.pinned.wallets}
            <Wallets compact={0} dashboard={1} />
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

<ImportWallets />