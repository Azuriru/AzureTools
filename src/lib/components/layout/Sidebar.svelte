<script lang="ts">
    import { t } from '$lib/i18n';
    import { Column, Row } from '.';
    import { MaterialSymbol } from '../.';

    const sidebarItems = [
        ['dashboard', 'sidebar.dashboard'],
        ['wallet', 'sidebar.wallets']
    ] as const;
</script>

<Column name="sidebar" grow={0} shrink={0} layout="group max-w-16 h-full py-2 pr-4 bg-slate-800 hover:max-w-64 space-y-4 shadow-md z-10 transition-all overflow-hidden">
    <Row name="sidebar-item sidebar-logo opacity-60 hover:opacity-100 transition-opacity" grow={0} layout="h-11">
        <Row
            name="sidebar-icon"
            grow={0}
            shrink={0}
            justify={1}
            layout="w-16 text-4xl"
        >
            <img src="/logo.png" alt="logo" class="w-12" />
        </Row>
        <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">aztools</Row>
    </Row>
    {#each sidebarItems as item (item)}
        {@const [ name, title ] = item}
        {@const url = title.slice(8)}
        {@const href = url === 'dashboard' ? '/' : url}
        <a {href}>
            <Row name="sidebar-item" grow={0} layout="h-11 opacity-60 hover:opacity-100 transition-opacity">
                <Row
                    name="sidebar-icon"
                    grow={0}
                    shrink={0}
                    justify={1}
                    layout="w-16 text-4xl"
                >
                    <MaterialSymbol {name} />
                </Row>
                <Row name="sidebar-title" layout="opacity-0 group-hover:opacity-100 transition-opacity">{$t(title)}</Row>
            </Row>
        </a>
    {/each}
</Column>