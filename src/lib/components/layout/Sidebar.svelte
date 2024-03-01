<script lang="ts">
    import { t } from '$lib/i18n';
    import { currentUser } from '$lib/util/users';
    import { Column, Row } from '.';
    import { Link, Button, MaterialSymbol } from '../.';

    const sidebarItemsStart = [
        ['dashboard', 'sidebar.dashboard'],
        ['wallet', 'sidebar.wallets'],
        ['send', 'sidebar.send'],
        ['shopping_cart', 'sidebar.market'],
        ['insert_chart', 'sidebar.analytics']
    ] as const;

    const sidebarItemsEnd = [
        ['account_circle', 'sidebar.user'],
        ['settings_account_box', 'sidebar.settings']
    ] as const;
</script>

<Column name="sidebar" grow={0} shrink={0} layout="group max-w-16 h-full py-2 bg-slate-800 hover:max-w-64 shadow-md z-10 transition-all overflow-hidden">
    <Column name="sidebar-start" grow={0}>
        <Row name="sidebar-item sidebar-logo" grow={0} layout="min-w-60 h-14 opacity-60 hover:opacity-100 transition-opacity">
            <Row
                name="sidebar-icon"
                grow={0}
                shrink={0}
                justify={1}
                layout="w-16 text-3xl"
            >
                <img src="/logo.png" alt="logo" class="w-12" />
            </Row>
            <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">AZTools</Row>
        </Row>
        {#each sidebarItemsStart as item (item)}
            {@const [ name, title ] = item}
            {@const href = `${title.slice(8)}`}
            <Link href="/{href}" layout="sidebar-item flex items-center min-w-60 h-14 pr-3 py-2 opacity-60 hover:opacity-100 transition-opacity select-none">
                <Row
                    name="sidebar-icon"
                    grow={0}
                    shrink={0}
                    justify={1}
                    layout="w-16 text-3xl"
                >
                    <MaterialSymbol {name} />
                </Row>
                <Row name="sidebar-content" layout="-ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Row name="sidebar-title">{$t(title)}</Row>
                    {#if href !== 'dashboard'}
                        <Button
                            type={0}
                            layout="pinned w-9 h-9 text-2xl rotate-45"
                            bg=""
                            onClick={(e) => {
                                e.preventDefault();

                                if ($currentUser) {
                                    $currentUser.pinned[href] = !$currentUser?.pinned[href];
                                }
                            }}
                        >
                            <MaterialSymbol name="push_pin" fill={$currentUser?.pinned[href]} />
                        </Button>
                    {/if}
                </Row>
            </Link>
        {/each}
    </Column>
    <Column />
    <Column name="sidebar-end" grow={0}>
        {#each sidebarItemsEnd as item (item)}
            {@const [ name, title ] = item}
            {@const href = title.slice(8)}
            <Link href="/{href}" layout="sidebar-item flex items-center min-w-60 h-14 pr-3 py-2 opacity-60 hover:opacity-100 transition-opacity select-none">
                <Row
                    name="sidebar-icon"
                    grow={0}
                    shrink={0}
                    justify={1}
                    layout="w-16 text-3xl"
                >
                    <MaterialSymbol {name} />
                </Row>
                <Row name="sidebar-content" layout="-ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {$t(title)}
                </Row>
            </Link>
        {/each}
    </Column>
</Column>