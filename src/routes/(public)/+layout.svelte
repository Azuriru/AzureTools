<script lang="ts">
    import { Column, Row } from '$lib/components/layout';
    import { Divider } from '$lib/components';
    import { users } from '$lib/util/users';
</script>

<Column align={1} justify={1} layout="overflow-y-auto bg-slate-950">
    <slot />
</Column>
