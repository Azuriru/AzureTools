<script lang="ts">
    import { Column, Row } from '.';
    import MaterialSymbol from '../MaterialSymbol.svelte';

    const sidebarItems = [
        ['dashboard', 'sidebar.dashboard']
    ] as const;
</script>

<Column name="sidebar" layout="group">
    {#each sidebarItems as item (item)}
        {@const [ name, title ] = item}
        <Row>
            <MaterialSymbol {name} />
            <Row>{title}</Row>
        </Row>

    {/each}
</Column>