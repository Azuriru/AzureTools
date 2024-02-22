<script lang="ts">
    import { t } from '$lib/i18n';
    import { persistible } from '$lib/util/store';
    import { Column, Row } from '.';
    import { Link, Button, MaterialSymbol } from '../.';

    const sidebarItems = [
        ['dashboard', 'sidebar.dashboard'],
        ['wallet', 'sidebar.wallets']
    ] as const;

    const pinned = persistible('pinned', {
        wallets: true
    });
</script>

<Column name="sidebar" grow={0} shrink={0} layout="group max-w-16 h-full py-2 bg-slate-800 hover:max-w-64 shadow-md z-10 transition-all overflow-hidden">
    <Row name="sidebar-item sidebar-logo" grow={0} layout="min-w-60 h-14 opacity-60 hover:opacity-100 transition-opacity">
        <Row
            name="sidebar-icon"
            grow={0}
            shrink={0}
            justify={1}
            layout="w-16 text-4xl"
        >
            <img src="/logo.png" alt="logo" class="w-12" />
        </Row>
        <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">AZTools</Row>
    </Row>
    {#each sidebarItems as item (item)}
        {@const [ name, title ] = item}
        {@const href = title.slice(8)}
        <Link {href} layout="sidebar-item flex items-center min-w-60 h-14 pr-3 py-2 opacity-60 hover:opacity-100 transition-opacity select-none">
            <Row
                name="sidebar-icon"
                grow={0}
                shrink={0}
                justify={1}
                layout="w-16 text-4xl"
            >
                <MaterialSymbol {name} />
            </Row>
            <Row name="sidebar-content" layout="opacity-0 group-hover:opacity-100 transition-opacity">
                <Row name="sidebar-title">{$t(title)}</Row>
                {#if href !== 'dashboard'}
                    <Button
                        type={0}
                        layout="pinned text-4xl rotate-45"
                        bg=""
                        onClick={(e) => {
                            e.preventDefault();
                            $pinned[href] = !$pinned[href];
                        }}
                    >
                        <MaterialSymbol name="push_pin" fill={$pinned[href]} />
                    </Button>
                {/if}
            </Row>
        </Link>
    {/each}
</Column>