<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    goto('/');
</script>

<h1>{$page.status}: {$page.error?.message}</h1>