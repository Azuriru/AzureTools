<script lang="ts">
    import Row from './Row.svelte';
    import Button from '../Button.svelte';
    import MaterialSymbol from '../MaterialSymbol.svelte';
    import { unsetUser } from '$lib/util/users';
    import { goto } from '$app/navigation';

    function logout() {
        unsetUser();
        goto('/');
    }
</script>

<Row
    name="navbar"
    grow={0}
    shrink={0}
    justify={2}
    layout="w-full h-14 py-2 bg-slate-800"
>
    <Button type={0} onClick={logout} layout="text-2xl w-14 h-14">
        <MaterialSymbol name="logout" />
    </Button>
</Row>